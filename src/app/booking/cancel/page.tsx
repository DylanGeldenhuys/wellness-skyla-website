import Link from "next/link";
import { XCircle } from "lucide-react";

export default function BookingCancel() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center">
      <XCircle size={52} className="text-clay mb-6" />
      <h1 className="font-serif text-3xl text-ink">Payment cancelled</h1>
      <p className="mt-4 max-w-sm font-serif text-base text-ink-soft">
        No payment was taken. You can go back and try again whenever you&apos;re ready.
      </p>
      <Link
        href="/#book"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-primary-deep"
      >
        Try again
      </Link>
    </main>
  );
}
