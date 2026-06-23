import { createSign } from "crypto";
import fs from "fs";
import path from "path";

interface Credentials {
  client_email: string;
  private_key: string;
}

let cachedToken: { value: string; expiry: number } | null = null;

function loadCredentials(): Credentials {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  }
  // Local dev fallback: read from file
  const keyPath = path.join(process.cwd(), "service-account.json");
  return JSON.parse(fs.readFileSync(keyPath, "utf-8"));
}

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiry) return cachedToken.value;

  const { client_email, private_key } = loadCredentials();
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({
    iss: client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })).toString("base64url");

  const sig = createSign("RSA-SHA256");
  sig.update(`${header}.${payload}`);
  const signature = sig.sign(private_key, "base64url");

  const abort = new AbortController();
  const t = setTimeout(() => abort.abort(), 8000);
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: `${header}.${payload}.${signature}`,
      }),
      signal: abort.signal,
    });
    const data = await res.json();
    if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`);
    cachedToken = { value: data.access_token, expiry: Date.now() + 55 * 60 * 1000 };
    return data.access_token;
  } finally {
    clearTimeout(t);
  }
}

export async function getBusyTimes(date: string): Promise<{ start: string; end: string }[]> {
  const token = await getToken();
  const id = process.env.GOOGLE_CALENDAR_ID!;

  const abort = new AbortController();
  const t = setTimeout(() => abort.abort(), 8000);
  try {
    const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        timeMin: new Date(`${date}T00:00:00+02:00`).toISOString(),
        timeMax: new Date(`${date}T23:59:59+02:00`).toISOString(),
        items: [{ id }],
      }),
      signal: abort.signal,
      cache: "no-store",
    });
    const data = await res.json();
    return (data.calendars?.[id]?.busy ?? []) as { start: string; end: string }[];
  } finally {
    clearTimeout(t);
  }
}

export async function createBookingEvent(params: {
  serviceName: string;
  startISO: string;
  durationMin: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentId: string;
  tentative?: boolean;
}) {
  const token = await getToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;
  const start = new Date(params.startISO);
  const end = new Date(start.getTime() + params.durationMin * 60_000);

  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: `${params.serviceName} — ${params.customerName}`,
        description: [
          `Phone: ${params.customerPhone}`,
          `Email: ${params.customerEmail}`,
          params.tentative ? "⚠️ Payment due at appointment" : `PayFast ID: ${params.paymentId}`,
        ].join("\n"),
        status: params.tentative ? "tentative" : "confirmed",
        start: { dateTime: start.toISOString(), timeZone: "Africa/Johannesburg" },
        end: { dateTime: end.toISOString(), timeZone: "Africa/Johannesburg" },
        attendees: [{ email: params.customerEmail, displayName: params.customerName }],
      }),
    }
  );
}
