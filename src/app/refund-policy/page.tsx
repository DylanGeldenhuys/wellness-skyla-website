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
  title: "Refund Policy",
  description: `Deposits and refunds for treatments booked with ${BUSINESS_NAME}.`,
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      current="/refund-policy"
      title="Refund Policy"
      intro={
        <p>
          This policy explains when payments for treatments with {BUSINESS_NAME} are refunded,
          and how refunds are paid.
        </p>
      }
    >
      <Section id="deposits" number={1} title="Deposits are non-refundable">
        <p>
          A <strong>deposit of 50% of the treatment price</strong> is payable to secure every
          booking. The deposit holds time that could have gone to another client, so it is{" "}
          <strong>not refunded</strong> if you cancel or don&apos;t arrive, however much notice
          you give.
        </p>
      </Section>

      <Section id="paid-in-full" number={2} title="If you paid in full">
        <p>
          If you paid the full treatment price upfront and then cancel (including on the day) or
          don&apos;t arrive, <strong>50% of the treatment price is refunded</strong>. The other
          50% is kept as the deposit.
        </p>
      </Section>

      <Section id="summary" number={3} title="Refunds at a glance">
        <RefundTable />
      </Section>

      <Section id="skyla-cancels" number={4} title="If Skyla cancels">
        <p>
          If Skyla has to cancel your appointment for illness, an emergency or any other reason,
          you can choose a new booking or a <strong>full refund of everything you paid</strong>.
        </p>
      </Section>

      <Section id="completed" number={5} title="Completed treatments">
        <p>
          Treatments that have already been given are not refundable. If you are unhappy with
          your treatment, please tell Skyla during the treatment or contact her as soon as
          possible afterwards, so she can put it right.
        </p>
      </Section>

      <Section id="how" number={6} title="How refunds are paid">
        <ul>
          <li>
            Refunds are paid back to the original payment method. Card payments made through
            PayFast are refunded to the same card.
          </li>
          <li>Approved refunds are processed within 7 to 10 working days.</li>
          <li>Refunds are paid in South African Rand (ZAR).</li>
        </ul>
        <p>
          To ask about a refund, <ContactLine />. See our{" "}
          <PolicyLink href="/cancellation-policy">Cancellation Policy</PolicyLink> for how to
          cancel.
        </p>
        <p>Nothing in this policy limits your rights under the Consumer Protection Act.</p>
      </Section>
    </LegalPage>
  );
}
