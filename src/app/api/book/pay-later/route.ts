import { NextRequest, NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/google-calendar";

export async function POST(req: NextRequest) {
  const { serviceName, durationMin, startISO, firstName, lastName, email, phone } = await req.json();

  try {
    await createBookingEvent({
      serviceName,
      startISO,
      durationMin,
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      customerPhone: phone,
      paymentId: "PAY-LATER",
      tentative: true,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Pay later booking error:", err);
    return NextResponse.json({ error: "Could not create booking" }, { status: 500 });
  }
}
