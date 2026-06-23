import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function BookingSuccess({
  searchParams,
}: {
  searchParams: Promise<{ later?: string }>;
}) {
  const { later } = await searchParams;
  const isPayLater = later === "1";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <CheckCircle size={52} className="text-primary mb-6" />
      <h1 className="font-serif text-3xl text-ink">Booking confirmed</h1>
      <p className="mt-4 max-w-sm font-serif text-base text-ink-soft">
        {isPayLater
          ? "Your appointment is reserved. Please bring payment on the day. Skyla will be in touch to confirm."
          : "Your payment was successful and your appointment is confirmed. Skyla will be in touch shortly."}
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
