import { NextRequest, NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendBookingConfirmation } from "@/lib/email";

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

  try {
    await createBookingEvent({
      serviceName: params.item_name,
      startISO: params.custom_str2,
      durationMin: parseInt(params.custom_str4, 10),
      customerName: params.custom_str5,
      customerEmail: params.email_address,
      customerPhone: params.custom_str3,
      paymentId: params.m_payment_id,
    });

    await sendBookingConfirmation({
      customerName: params.custom_str5,
      customerEmail: params.email_address,
      serviceName: params.item_name,
      startISO: params.custom_str2,
      durationMin: parseInt(params.custom_str4, 10),
      priceZar: parseFloat(params.amount),
      payLater: false,
    });
  } catch (err) {
    console.error("PayFast: post-payment processing error", err);
  }

  return new NextResponse("OK");
}
