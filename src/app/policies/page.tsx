import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { EMAIL, PHONE, PHONE_HREF, WHATSAPP_NUMBER } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Policies & Terms",
  description:
    "Booking, deposit, cancellation and refund policy, plus the terms and conditions for treatments with Wellness with Skyla at Goldenhill Treatments.",
  alternates: { canonical: "/policies" },
};

const LAST_UPDATED = "25 November 2026";

const sections = [
  { id: "bookings", title: "Bookings and deposits" },
  { id: "cancellations", title: "Cancellations, no-shows and refunds" },
  { id: "late", title: "Late arrivals" },
  { id: "health", title: "Your health and safety" },
  { id: "conduct", title: "Conduct" },
  { id: "mobile", title: "Mobile treatments" },
  { id: "pricing", title: "Prices, payments and discounts" },
  { id: "privacy", title: "Your privacy" },
  { id: "liability", title: "Liability" },
  { id: "general", title: "General" },
];

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line pt-10">
      <h2 className="flex items-baseline gap-3 font-serif text-2xl text-ink">
        <span className="font-sans text-xs tabular-nums text-ink-soft/50">
          {String(number).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="mt-5 space-y-4 font-serif text-base leading-relaxed text-ink-soft [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

const refundRows = [
  {
    when: "You cancel, at any time (including on the day)",
    deposit: "Deposit is forfeited",
    full: "50% of the treatment price refunded",
  },
  {
    when: "No-show",
    deposit: "Deposit is forfeited",
    full: "50% of the treatment price refunded",
  },
  {
    when: "Skyla cancels your appointment",
    deposit: "Full refund or a new booking",
    full: "Full refund or a new booking",
  },
];

export default function PoliciesPage() {
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
            href="/"
            className="inline-flex items-center gap-1 font-sans text-sm text-ink-soft transition-colors hover:text-ink"
          >
            <ChevronLeft size={16} /> Back to home
          </Link>

          <p className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-clay">
            Policies &amp; Terms
          </p>
          <h1 className="mt-3 font-serif text-4xl text-ink sm:text-h1">
            Booking, cancellation and treatment terms
          </h1>
          <p className="mt-4 font-serif text-lead text-ink-soft">
            These terms apply to every treatment booked with Wellness with Skyla at Goldenhill
            Treatments, whether you book online, by WhatsApp, by phone or in person. By booking,
            you agree to them.
          </p>
          <p className="mt-3 font-sans text-xs text-ink-soft/70">Last updated {LAST_UPDATED}</p>

          {/* Summary card */}
          <div className="mt-10 rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <h2 className="font-serif text-xl text-ink">The short version</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 font-serif text-base text-ink-soft">
              <li>
                A <strong className="text-ink">50% deposit</strong> secures your booking.
              </li>
              <li>
                If you cancel or don&apos;t arrive, <strong className="text-ink">the deposit is not refunded</strong>.
              </li>
              <li>
                If you paid in full and cancel or don&apos;t arrive, you get{" "}
                <strong className="text-ink">half your payment back</strong>.
              </li>
              <li>
                Please give at least 24 hours&apos; notice if you need to cancel.
              </li>
            </ul>
          </div>

          {/* Contents */}
          <nav aria-label="Contents" className="mt-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
              Contents
            </p>
            <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="font-sans text-sm text-ink-soft transition-colors hover:text-primary"
                  >
                    <span className="tabular-nums text-ink-soft/50">{i + 1}.</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12">
            <Section id="bookings" number={1} title={sections[0].title}>
              <p>
                To secure your appointment, a <strong>deposit of 50% of the treatment price</strong> is
                payable when you book. Your time slot is only reserved once the deposit has been
                received. You are also welcome to pay the full treatment price upfront.
              </p>
              <p>
                The balance is payable on the day, before or straight after your treatment. Your
                deposit is deducted from the treatment price.
              </p>
              <p>
                Please give accurate contact details when booking. Skyla may contact you to confirm
                your appointment, and you are responsible for checking the date and time in your
                confirmation.
              </p>
            </Section>

            <Section id="cancellations" number={2} title={sections[1].title}>
              <p>
                A booked appointment holds time that could have gone to another client, so the
                following applies when a treatment doesn&apos;t go ahead:
              </p>
              <ul>
                <li>
                  <strong>Deposits are non-refundable.</strong> If you cancel or don&apos;t attend,
                  your deposit is forfeited, however much notice you give.
                </li>
                <li>
                  <strong>Paid in full:</strong> if you cancel, including on the day, or don&apos;t
                  arrive, you will be refunded 50% of the treatment price. The other 50% is kept as
                  the deposit.
                </li>
                <li>
                  <strong>Please give at least 24 hours&apos; notice</strong> if you need to cancel,
                  so your time slot can be offered to another client.
                </li>
              </ul>

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
                    {refundRows.map((r) => (
                      <tr key={r.when} className="border-t border-line align-top">
                        <th scope="row" className="px-4 py-3 font-medium text-ink">{r.when}</th>
                        <td className="px-4 py-3 text-ink-soft">{r.deposit}</td>
                        <td className="px-4 py-3 text-ink-soft">{r.full}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>
                <strong>How to cancel.</strong> Please cancel by WhatsApp or phone on{" "}
                <a href={`tel:${PHONE_HREF}`} className="text-primary underline-offset-2 hover:underline">
                  {PHONE}
                </a>{" "}
                or by email to{" "}
                <a href={`mailto:${EMAIL}`} className="text-primary underline-offset-2 hover:underline">
                  {EMAIL}
                </a>
                .
              </p>
              <p>
                <strong>Refunds.</strong> Approved refunds are paid back to the original payment
                method, normally within 7 to 10 working days.
              </p>
              <p>
                <strong>If Skyla has to cancel.</strong> If Skyla needs to cancel your appointment
                for illness, emergency or any other reason, you will be offered a new booking or a
                full refund of everything you paid.
              </p>
            </Section>

            <Section id="late" number={3} title={sections[2].title}>
              <p>
                Please arrive a few minutes early. If you arrive late, your treatment may need to be
                shortened so the next client isn&apos;t kept waiting, and the full treatment price
                still applies. If you are more than 15 minutes late without letting Skyla know, the
                appointment may be treated as a no-show.
              </p>
            </Section>

            <Section id="health" number={4} title={sections[3].title}>
              <p>
                Massage and frequency therapy are not a substitute for medical diagnosis or
                treatment. Before your treatment, please tell Skyla about any medical condition,
                injury, allergy (including to oils or fragrances), medication or pregnancy. If you
                are unsure whether a treatment is suitable for you, please check with your doctor
                first.
              </p>
              <p>
                Skyla may adjust or decline a treatment if she believes it is not safe for you. If
                you are unwell, contagious or have a fever, please let Skyla know as early as
                possible so a new time can be arranged.
              </p>
              <p>
                Please let Skyla know straight away during your treatment if anything feels
                uncomfortable or painful, so the pressure or technique can be changed.
              </p>
              <p>
                Clients under 18 need the written consent of a parent or guardian, and a parent or
                guardian must be present for the treatment.
              </p>
            </Section>

            <Section id="conduct" number={5} title={sections[4].title}>
              <p>
                All treatments are strictly professional and therapeutic. Any inappropriate
                behaviour, comments or requests will end the treatment immediately, and the full
                treatment price will be charged. Skyla may refuse service to anyone who appears to
                be under the influence of alcohol or drugs.
              </p>
            </Section>

            <Section id="mobile" number={6} title={sections[5].title}>
              <p>
                For mobile treatments, please make sure there is a quiet, clean space with room to
                set up a massage table, and that someone 18 or older is present at the address if
                the client is a minor. Skyla may decline to go ahead if the space is not safe or
                suitable, in which case the cancellation terms above apply. A travel fee may apply
                depending on your location, and you will be told about it before your booking is
                confirmed.
              </p>
            </Section>

            <Section id="pricing" number={7} title={sections[6].title}>
              <ul>
                <li>All prices are in South African Rand (ZAR) and are shown on this website.</li>
                <li>
                  Prices may change from time to time, but the price confirmed when you booked is
                  the price you pay for that appointment.
                </li>
                <li>
                  Online payments are processed securely by PayFast. Card details are handled by
                  PayFast and are never stored by Wellness with Skyla.
                </li>
                <li>
                  Discounts and promotions can&apos;t be combined, have no cash value, and apply
                  only on the terms stated when they are offered.
                </li>
              </ul>
            </Section>

            <Section id="privacy" number={8} title={sections[7].title}>
              <p>
                Your name, contact details, booking details and any health information you share
                are used only to manage your bookings, provide your treatment safely and contact
                you about your appointments. They are kept confidential, are not sold or shared
                with anyone for marketing, and are handled in line with the Protection of Personal
                Information Act (POPIA). You can ask to see, correct or delete your information at
                any time by contacting Skyla.
              </p>
            </Section>

            <Section id="liability" number={9} title={sections[8].title}>
              <p>
                Treatments are given with care and skill. As far as the law allows, Wellness with
                Skyla is not liable for any reaction, injury or loss that results from information
                about your health that was not shared before your treatment, or from not following
                aftercare advice. Please don&apos;t bring valuables to your appointment; Wellness
                with Skyla is not responsible for personal belongings.
              </p>
              <p>
                Nothing in these terms limits your rights under the Consumer Protection Act.
              </p>
            </Section>

            <Section id="general" number={10} title={sections[9].title}>
              <p>
                These terms may be updated from time to time. The version on this page at the time
                of your booking applies to that booking. These terms are governed by the laws of
                South Africa.
              </p>
              <p>
                Questions about any of these terms? Message Skyla on{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  WhatsApp
                </a>
                , call{" "}
                <a href={`tel:${PHONE_HREF}`} className="text-primary underline-offset-2 hover:underline">
                  {PHONE}
                </a>{" "}
                or email{" "}
                <a href={`mailto:${EMAIL}`} className="text-primary underline-offset-2 hover:underline">
                  {EMAIL}
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
