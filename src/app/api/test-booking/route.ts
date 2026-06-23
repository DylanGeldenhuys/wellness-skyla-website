import { NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/google-calendar";

export async function GET() {
  try {
    await createBookingEvent({
      serviceName: "Test Booking",
      startISO: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      durationMin: 60,
      customerName: "Test User",
      customerEmail: "test@example.com",
      customerPhone: "+27 00 000 0000",
      paymentId: "TEST-123",
      tentative: true,
    });
    return NextResponse.json({ ok: true, message: "Calendar event created successfully" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
