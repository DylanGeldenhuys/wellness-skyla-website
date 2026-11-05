import { NextRequest, NextResponse } from "next/server";
import { createBookingEvent } from "@/lib/google-calendar";
import {
  bookingNotifyEmail,
  sendBookingConfirmation,
  sendOwnerBookingNotification,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  const { serviceName, durationMin, priceZar, startISO, firstName, lastName, email, phone, notes } =
    await req.json();
  const customerName = `${firstName} ${lastName}`;

  try {
    await createBookingEvent({
      serviceName,
      startISO,
      durationMin,
      customerName,
      customerEmail: email,
      customerPhone: phone,
      paymentId: "PAY-LATER",
      tentative: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Pay later booking error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  try {
    await sendBookingConfirmation({
      customerName,
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

  try {
    await sendOwnerBookingNotification({
      customerName,
      customerEmail: email,
      customerPhone: phone,
      serviceName,
      startISO,
      durationMin,
      priceZar,
      payLater: true,
      paymentId: "PAY-LATER",
      notes: typeof notes === "string" ? notes : undefined,
    });
    console.log("Owner booking notification sent to", bookingNotifyEmail());
  } catch (emailErr) {
    console.error("Failed to send owner booking notification:", emailErr);
  }

  return NextResponse.json({ ok: true });
}
