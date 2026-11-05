import { Resend } from "resend";
import { EMAIL } from "@/lib/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Wellness with Skyla <bookings@goldenhilltreatments.com>";

/**
 * Inbox for new-booking alerts.
 * Set BOOKING_NOTIFY_EMAIL in Vercel (Production) to override.
 * When unset, alerts go to the studio address in src/lib/contact.ts.
 */
export function bookingNotifyEmail(): string {
  const configured = process.env.BOOKING_NOTIFY_EMAIL?.trim();
  return configured || EMAIL;
}

async function sendEmail(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const { error } = await resend.emails.send(payload);
  if (error) throw new Error(error.message);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function sendBookingConfirmation(params: {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  startISO: string;
  durationMin: number;
  priceZar: number;
  payLater: boolean;
}) {
  const date = formatDate(params.startISO);
  const time = formatTime(params.startISO);
  const price = `R ${(params.priceZar ?? 0).toLocaleString("en-ZA")}`;

  await sendEmail({
    from: FROM,
    to: params.customerEmail,
    subject: `Booking confirmed — ${params.serviceName}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#241914;padding:32px 16px;">
        <p style="font-size:22px;margin-bottom:4px;">Hi ${params.customerName},</p>
        <p style="color:#574239;margin-top:0;">Your booking with Skyla is confirmed.</p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Treatment</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${params.serviceName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Date</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${date}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Time</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${time}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Duration</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${params.durationMin} min</td></tr>
          <tr><td style="padding:10px 0;color:#574239;font-size:13px;font-weight:bold;">Total</td><td style="padding:10px 0;text-align:right;font-size:14px;font-weight:bold;">${price}${params.payLater ? " (pay on the day)" : " (paid)"}</td></tr>
        </table>

        ${params.payLater ? `<p style="background:#fff1eb;border-left:3px solid #9c3f00;padding:12px 16px;font-size:13px;color:#574239;margin:0 0 24px;">Please bring cash or card payment on the day of your appointment.</p>` : ""}

        <p style="color:#574239;font-size:13px;line-height:1.6;">We look forward to seeing you. To reschedule please reply to this email.</p>

        <p style="margin-top:32px;font-size:13px;color:#574239;border-top:1px solid #dec0b4;padding-top:24px;">
          Warm regards,<br/>
          <strong>Skyla</strong><br/>
          Wellness with Skyla<br/>
          Goldenhill Close, Somerset West
        </p>
      </div>
    `,
  });
}

export async function sendOwnerBookingNotification(params: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  startISO: string;
  durationMin: number;
  priceZar: number;
  payLater: boolean;
  paymentId?: string;
  notes?: string;
}) {
  const to = bookingNotifyEmail();
  const date = formatDate(params.startISO);
  const time = formatTime(params.startISO);
  const price = `R ${(Number.isFinite(params.priceZar) ? params.priceZar : 0).toLocaleString("en-ZA")}`;
  const notes = params.notes?.trim();
  const notesHtml = notes ? escapeHtml(notes).replace(/\n/g, "<br/>") : "None";
  const payment = params.payLater ? "Pay on the day" : "Paid online";

  await sendEmail({
    from: FROM,
    to,
    replyTo: params.customerEmail,
    subject: `New booking — ${params.customerName} — ${params.serviceName}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#241914;padding:32px 16px;">
        <p style="font-size:22px;margin-bottom:4px;">New booking</p>
        <p style="color:#574239;margin-top:0;">A client just booked with Wellness with Skyla.</p>

        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${escapeHtml(params.customerName)}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${escapeHtml(params.customerEmail)}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${escapeHtml(params.customerPhone)}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Treatment</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${escapeHtml(params.serviceName)}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Date</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${escapeHtml(date)}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Time</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${escapeHtml(time)}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Duration</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${params.durationMin} min</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;">Total</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${price} (${payment})</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #dec0b4;color:#574239;font-size:13px;vertical-align:top;">Notes</td><td style="padding:10px 0;border-bottom:1px solid #dec0b4;text-align:right;font-size:14px;">${notesHtml}</td></tr>
          <tr><td style="padding:10px 0;color:#574239;font-size:13px;">Reference</td><td style="padding:10px 0;text-align:right;font-size:14px;">${escapeHtml(params.paymentId || "—")}</td></tr>
        </table>

        <p style="color:#574239;font-size:13px;line-height:1.6;">Reply to this email to reach the client.</p>
      </div>
    `,
  });
}
