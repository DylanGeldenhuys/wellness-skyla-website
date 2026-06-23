import { NextRequest, NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { serviceName, durationMin, priceZar, startISO, firstName, lastName, email, phone } = await req.json();

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

    try {
      await sendBookingConfirmation({
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
        serviceName,
        startISO,
        durationMin,
        priceZar,
        payLater: true,
      });
      console.log("Confirmation email sent to", email);
    } catch (emailErr) {
      console.error("Failed to send confirmation email:", emailErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Pay later booking error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
