import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { EMAIL, PHONE, PHONE_HREF, WHATSAPP_NUMBER } from "@/lib/contact";
import { POLICIES_LAST_UPDATED, POLICY_PAGES, REFUND_ROWS } from "@/lib/policies";

const linkClass = "text-primary underline-offset-2 hover:underline";

export function LegalPage({
  current,
  title,
  intro,
  children,
}: {
  current?: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-line bg-bg/95">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="font-serif text-lg italic text-ink">
            Wellness with Skyla
          </Link>
          <Link
            href="/#book"
            className="rounded-full bg-primary px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-primary-deep"
          >
            Book a Session
          </Link>
        </div>
      </header>

      <main id="top" className="bg-bg py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            href={current ? "/policies" : "/"}
            className="inline-flex items-center gap-1 font-sans text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <ChevronLeft size={16} /> {current ? "All policies" : "Back to home"}
          </Link>

          <p className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-clay">
            Wellness with Skyla
          </p>
          <h1 className="mt-3 font-serif text-4xl text-ink sm:text-h1">{title}</h1>
          <div className="mt-4 font-serif text-lead text-ink-soft">{intro}</div>
          <p className="mt-3 font-sans text-xs text-ink-soft/70">
            Last updated {POLICIES_LAST_UPDATED}
          </p>

          <div className="mt-12 space-y-12">{children}</div>

          {current && (
            <nav aria-label="Other policies" className="mt-16 border-t border-line pt-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
                Our policies
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {POLICY_PAGES.map((p) => (
                  <li key={p.href}>
                    {p.href === current ? (
                      <span className="font-sans text-sm font-semibold text-ink">{p.title}</span>
                    ) : (
                      <Link
                        href={p.href}
                        className="font-sans text-sm text-ink-soft transition-colors hover:text-primary"
                      >
                        {p.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number?: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line pt-10">
      <h2 className="flex items-baseline gap-3 font-serif text-2xl text-ink">
        {number !== undefined && (
          <span className="font-sans text-xs tabular-nums text-ink-soft/50">
            {String(number).padStart(2, "0")}
          </span>
        )}
        {title}
      </h2>
      <div className="mt-5 space-y-4 font-serif text-base leading-relaxed text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export function RefundTable() {
  return (
    <div className="-mx-1 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse overflow-hidden rounded-xl border border-line bg-white text-left font-sans text-sm">
        <thead className="bg-surface-warm text-xs uppercase tracking-wide text-ink-soft">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">When</th>
            <th scope="col" className="px-4 py-3 font-semibold">Paid a deposit</th>
            <th scope="col" className="px-4 py-3 font-semibold">Paid in full</th>
          </tr>
        </thead>
        <tbody>
          {REFUND_ROWS.map((r) => (
            <tr key={r.when} className="border-t border-line align-top">
              <th scope="row" className="px-4 py-3 font-medium text-ink">{r.when}</th>
              <td className="px-4 py-3 text-ink-soft">{r.deposit}</td>
              <td className="px-4 py-3 text-ink-soft">{r.full}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PolicyLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

/** "WhatsApp or call +27…, or email …" with working links. */
export function ContactLine() {
  return (
    <>
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
        WhatsApp
      </a>{" "}
      or call{" "}
      <a href={`tel:${PHONE_HREF}`} className={linkClass}>
        {PHONE}
      </a>
      , or email{" "}
      <a href={`mailto:${EMAIL}`} className={linkClass}>
        {EMAIL}
      </a>
    </>
  );
}
