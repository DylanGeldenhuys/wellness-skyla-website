import type { Metadata } from "next";
import {
  LegalPage,
  Section,
  PolicyLink,
  ContactLine,
  RefundTable,
} from "@/components/legal/LegalPage";
import { BUSINESS_NAME } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: `How to cancel a treatment with ${BUSINESS_NAME}, and what happens to your payment.`,
  alternates: { canonical: "/cancellation-policy" },
};

export default function CancellationPolicyPage() {
  return (
    <LegalPage
      current="/cancellation-policy"
      title="Cancellation Policy"
      intro={
        <p>
          Every appointment holds time set aside just for you. This policy explains how to cancel
          and what happens to your payment if a treatment doesn&apos;t go ahead.
        </p>
      }
    >
      <Section id="how" number={1} title="How to cancel">
        <p>
          To cancel, <ContactLine />. Please give <strong>at least 24 hours&apos; notice</strong>{" "}
          so your time slot can be offered to another client.
        </p>
      </Section>

      <Section id="charges" number={2} title="What happens to your payment">
        <ul>
          <li>
            <strong>Paid a deposit:</strong> if you cancel or don&apos;t arrive, the 50% deposit
            is forfeited.
          </li>
          <li>
            <strong>Paid in full:</strong> if you cancel (including on the day) or don&apos;t
            arrive, 50% of the treatment price is refunded and the other 50% is kept as the
            deposit.
          </li>
        </ul>
        <RefundTable />
        <p>
          Refunds are paid as set out in our{" "}
          <PolicyLink href="/refund-policy">Refund Policy</PolicyLink>.
        </p>
      </Section>

      <Section id="no-shows" number={3} title="No-shows and late arrivals">
        <p>
          A no-show is treated the same as a cancellation. If you are more than 15 minutes late
          without letting Skyla know, the appointment may be treated as a no-show. If you arrive
          late but the treatment goes ahead, it may be shortened and the full price still
          applies.
        </p>
      </Section>

      <Section id="skyla-cancels" number={4} title="If Skyla cancels">
        <p>
          If Skyla needs to cancel your appointment for illness, an emergency or any other reason,
          she will let you know as soon as possible, and you can choose a new booking or a full
          refund of everything you paid.
        </p>
      </Section>
    </LegalPage>
  );
}
