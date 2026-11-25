import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LegalPage } from "@/components/legal/LegalPage";
import { BUSINESS_NAME, POLICY_PAGES } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Policies",
  description: `Terms and Conditions, Refund Policy, Cancellation Policy and Delivery Policy for ${BUSINESS_NAME}.`,
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  return (
    <LegalPage
      title="Our policies"
      intro={
        <p>
          The policies that apply to every booking with {BUSINESS_NAME}. In short: a 50% deposit
          secures your booking and is not refunded if you cancel or don&apos;t arrive. If you paid
          in full, 50% is refunded.
        </p>
      }
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {POLICY_PAGES.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-primary hover:bg-surface-warm"
            >
              <span>
                <span className="block font-serif text-xl text-ink">{p.title}</span>
                <span className="mt-1 block font-sans text-sm text-ink-soft">{p.summary}</span>
              </span>
              <ChevronRight size={18} className="mt-1 shrink-0 text-ink-soft" />
            </Link>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
