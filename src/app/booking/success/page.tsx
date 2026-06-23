import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function BookingSuccess({
  searchParams,
}: {
  searchParams: { later?: string };
}) {
  const isPayLater = searchParams.later === "1";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <CheckCircle size={52} className="text-primary mb-6" />
      <h1 className="font-serif text-3xl text-ink">
        {isPayLater ? "Booking confirmed" : "Booking confirmed"}
      </h1>
      <p className="mt-4 max-w-sm font-serif text-base text-ink-soft">
        {isPayLater
          ? "Your appointment is reserved. Please bring payment on the day. A calendar invite has been sent to your email."
          : "Your payment was successful and your appointment is confirmed. A calendar invite has been sent to your email."}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-primary-deep"
      >
        Back to home
      </Link>
    </main>
  );
}
