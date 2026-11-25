import type { Metadata } from "next";
import { LegalPage, Section, PolicyLink, ContactLine } from "@/components/legal/LegalPage";
import { BUSINESS_NAME } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Delivery Policy",
  description: `How and where treatments booked with ${BUSINESS_NAME} are delivered.`,
  alternates: { canonical: "/delivery-policy" },
};

export default function DeliveryPolicyPage() {
  return (
    <LegalPage
      current="/delivery-policy"
      title="Delivery Policy"
      intro={
        <p>
          {BUSINESS_NAME} sells treatment services only. No physical goods are sold or shipped.
          This policy explains how your treatment is delivered once you have booked and paid.
        </p>
      }
    >
      <Section id="what" number={1} title="What you are buying">
        <p>
          Each booking is for one in-person treatment (or bundled treatment) of the type and
          length shown on this website, given by Skyla on the date and at the time you choose.
        </p>
      </Section>

      <Section id="confirmation" number={2} title="Booking confirmation">
        <p>
          After you book, you receive a confirmation by email with your treatment, date and time.
          Skyla may also contact you by WhatsApp or phone to confirm. If you don&apos;t receive a
          confirmation, please check your spam folder or <ContactLine />.
        </p>
      </Section>

      <Section id="where" number={3} title="Where treatments are delivered">
        <ul>
          <li>
            <strong>In studio:</strong> at Goldenhill Treatments in Somerset West, Western Cape.
            The address is shown on this website and in your confirmation.
          </li>
          <li>
            <strong>Mobile treatments:</strong> at your home or chosen address on mobile days.
            Skyla brings everything needed for the treatment. A travel fee may apply depending on
            your location, and you will be told about it before your booking is confirmed.
          </li>
        </ul>
      </Section>

      <Section id="when" number={4} title="When treatments are delivered">
        <p>
          Your treatment is delivered at the date and time you booked. Treatments are available
          by appointment only, within the hours shown on this website.
        </p>
      </Section>

      <Section id="not-delivered" number={5} title="If a treatment can't be delivered">
        <p>
          If Skyla can&apos;t give your treatment as booked, you can choose a new booking or a
          full refund. If you cancel or don&apos;t arrive, our{" "}
          <PolicyLink href="/cancellation-policy">Cancellation Policy</PolicyLink> and{" "}
          <PolicyLink href="/refund-policy">Refund Policy</PolicyLink> apply.
        </p>
      </Section>
    </LegalPage>
  );
}
