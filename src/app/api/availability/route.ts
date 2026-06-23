import { NextRequest, NextResponse } from "next/server";
import { getBusyTimes } from "@/lib/google-calendar";

const SLOT_INTERVAL = 30;

function generateSlots(date: string, durationMin: number): Date[] {
  if (!durationMin || isNaN(durationMin) || durationMin <= 0) durationMin = 60;
  const slots: Date[] = [];
  const cursor = new Date(`${date}T09:00:00+02:00`);
  const workEnd = new Date(`${date}T17:00:00+02:00`);
  while (slots.length < 100) {
    const slotEnd = new Date(cursor.getTime() + durationMin * 60_000);
    if (slotEnd > workEnd) break;
    slots.push(new Date(cursor));
    cursor.setMinutes(cursor.getMinutes() + SLOT_INTERVAL);
  }
  return slots;
}

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  const duration = parseInt(req.nextUrl.searchParams.get("duration") ?? "60", 10);

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const dayOfWeek = new Date(`${date}T12:00:00+02:00`).getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return NextResponse.json({ slots: [] });
  }

  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Johannesburg" });
  if (date < today) {
    return NextResponse.json({ slots: [] });
  }

  const all = generateSlots(date, duration);

  let busy: { start: string; end: string }[];
  try {
    console.log("[availability] fetching busy times for", date);
    busy = await getBusyTimes(date);
    console.log("[availability] got busy times:", busy.length);
  } catch (err) {
    console.error("[availability] Calendar API error:", err);
    return NextResponse.json({ error: "Could not load availability. Please try again." }, { status: 503 });
  }

  const available = all.filter((slot) => {
    const slotEnd = new Date(slot.getTime() + duration * 60_000);
    return !busy.some((b) => {
      const bStart = new Date(b.start);
      const bEnd = new Date(b.end);
      return slot < bEnd && slotEnd > bStart;
    });
  });

  return NextResponse.json({ slots: available.map((s) => s.toISOString()) });
}
