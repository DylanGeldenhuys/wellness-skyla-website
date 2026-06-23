import { NextRequest, NextResponse } from "next/server";
import { generateSignature } from "@/lib/payfast";

export async function POST(req: NextRequest) {
  const { serviceId, serviceName, priceZar, durationMin, startISO, firstName, lastName, email, phone } =
    await req.json();

  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const paymentId = `SKY-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const isSandbox = process.env.PAYFAST_SANDBOX === "true";
  const payfastUrl = isSandbox
    ? "https://sandbox.payfast.co.za/eng/process"
    : "https://www.payfast.co.za/eng/process";

  const fields: Record<string, string> = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID!,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
    return_url: `${base}/booking/success`,
    cancel_url: `${base}/booking/cancel`,
    notify_url: `${base}/api/payfast/notify`,
    name_first: firstName,
    name_last: lastName,
    email_address: email,
    cell_number: phone,
    m_payment_id: paymentId,
    amount: Number(priceZar).toFixed(2),
    item_name: serviceName,
    custom_str1: serviceId,
    custom_str2: startISO,
    custom_str3: phone,
    custom_str4: String(durationMin),
    custom_str5: `${firstName} ${lastName}`,
  };

  const signature = generateSignature(fields, process.env.PAYFAST_PASSPHRASE!);

  return NextResponse.json({ url: payfastUrl, fields: { ...fields, signature } });
}
