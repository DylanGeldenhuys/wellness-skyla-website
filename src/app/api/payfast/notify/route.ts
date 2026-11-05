import { NextRequest, NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast";
import { createBookingEvent } from "@/lib/google-calendar";
import {
  bookingNotifyEmail,
  sendBookingConfirmation,
  sendOwnerBookingNotification,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  const text = await req.text();
  const params = Object.fromEntries(new URLSearchParams(text));

  const { signature, ...data } = params;
  const expected = generateSignature(data, process.env.PAYFAST_PASSPHRASE!);

  if (signature !== expected) {
    console.error("PayFast: signature mismatch");
    return new NextResponse("Signature mismatch", { status: 400 });
  }

  if (params.payment_status !== "COMPLETE") {
    return new NextResponse("OK");
  }

  const durationMin = parseInt(params.custom_str4, 10);
  const priceZar = parseFloat(params.amount);
  const booking = {
    customerName: params.custom_str5,
    customerEmail: params.email_address,
    customerPhone: params.custom_str3,
    serviceName: params.item_name,
    startISO: params.custom_str2,
    durationMin,
    priceZar,
    paymentId: params.m_payment_id,
  };

  try {
    await createBookingEvent({
      serviceName: booking.serviceName,
      startISO: booking.startISO,
      durationMin: booking.durationMin,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      paymentId: booking.paymentId,
    });
  } catch (err) {
    console.error("PayFast: post-payment processing error", err);
    return new NextResponse("OK");
  }

  try {
    await sendBookingConfirmation({
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      serviceName: booking.serviceName,
      startISO: booking.startISO,
      durationMin: booking.durationMin,
      priceZar: booking.priceZar,
      payLater: false,
    });
  } catch (err) {
    console.error("PayFast: confirmation email error", err);
  }

  try {
    await sendOwnerBookingNotification({
      ...booking,
      payLater: false,
    });
    console.log("Owner booking notification sent to", bookingNotifyEmail());
  } catch (err) {
    console.error("PayFast: owner notification error", err);
  }

  return new NextResponse("OK");
}
