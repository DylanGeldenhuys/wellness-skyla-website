import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  await resend.emails.send({
    from: "Wellness with Skyla <bookings@goldenhilltreatments.com>",
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
