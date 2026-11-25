import type { Metadata } from "next";
import { LegalPage, Section, PolicyLink, ContactLine } from "@/components/legal/LegalPage";
import { BUSINESS_NAME } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `The terms and conditions for bookings and treatments with ${BUSINESS_NAME}.`,
  alternates: { canonical: "/terms" },
};

const sections = [
  "About us",
  "Bookings and deposits",
  "Cancellations and refunds",
  "Late arrivals",
  "Your health and safety",
  "Conduct",
  "Mobile treatments",
  "Prices and payment",
  "Your privacy",
  "Liability",
  "General",
];

export default function TermsPage() {
  let n = 0;
  return (
    <LegalPage
      current="/terms"
      title="Terms and Conditions"
      intro={
        <p>
          These terms apply to every treatment booked with {BUSINESS_NAME}, whether you book
          online, by WhatsApp, by phone or in person. By making a booking, you agree to them.
        </p>
      }
    >
      <Section id="about" number={++n} title={sections[0]}>
        <p>
          Wellness with Skyla offers massage and frequency therapy treatments from Goldenhill
          Treatments in Somerset West, Western Cape, South Africa, and as mobile treatments at
          clients&apos; homes. Treatments are given by Skyla by appointment only.
        </p>
        <p>
          Contact: <ContactLine />.
        </p>
      </Section>

      <Section id="bookings" number={++n} title={sections[1]}>
        <p>
          To secure your appointment, a <strong>deposit of 50% of the treatment price</strong> is
          payable when you book. Your time slot is only reserved once the deposit has been
          received. You are also welcome to pay the full treatment price upfront. The balance is
          payable on the day, and your deposit is deducted from the treatment price.
        </p>
        <p>
          Please give accurate contact details when booking. You are responsible for checking the
          date and time in your booking confirmation.
        </p>
      </Section>

      <Section id="cancellations" number={++n} title={sections[2]}>
        <p>
          Deposits are non-refundable. If you paid in full and cancel or don&apos;t arrive, 50%
          of the treatment price is refunded. The full details are in our{" "}
          <PolicyLink href="/cancellation-policy">Cancellation Policy</PolicyLink> and{" "}
          <PolicyLink href="/refund-policy">Refund Policy</PolicyLink>, which form part of these
          terms.
        </p>
      </Section>

      <Section id="late" number={++n} title={sections[3]}>
        <p>
          Please arrive a few minutes early. If you arrive late, your treatment may be shortened
          so the next client isn&apos;t kept waiting, and the full treatment price still applies.
          If you are more than 15 minutes late without letting Skyla know, the appointment may be
          treated as a no-show.
        </p>
      </Section>

      <Section id="health" number={++n} title={sections[4]}>
        <p>
          Massage and frequency therapy are not a substitute for medical diagnosis or treatment.
          Before your treatment, please tell Skyla about any medical condition, injury, allergy
          (including to oils or fragrances), medication or pregnancy. If you are unsure whether a
          treatment is suitable for you, please check with your doctor first.
        </p>
        <p>
          Skyla may adjust or decline a treatment if she believes it is not safe for you. If you
          are unwell, contagious or have a fever, please let Skyla know as early as possible.
          Please speak up straight away during your treatment if anything feels uncomfortable,
          so the pressure or technique can be changed.
        </p>
        <p>
          Clients under 18 need the consent of a parent or guardian, who must be present for the
          treatment.
        </p>
      </Section>

      <Section id="conduct" number={++n} title={sections[5]}>
        <p>
          All treatments are strictly professional and therapeutic. Any inappropriate behaviour,
          comments or requests will end the treatment immediately, and the full treatment price
          will be charged. Skyla may refuse service to anyone who appears to be under the
          influence of alcohol or drugs.
        </p>
      </Section>

      <Section id="mobile" number={++n} title={sections[6]}>
        <p>
          For mobile treatments, please make sure there is a quiet, clean space with room to set
          up a massage table. Skyla may decline to go ahead if the space is not safe or suitable.
          See our <PolicyLink href="/delivery-policy">Delivery Policy</PolicyLink> for how mobile
          treatments work.
        </p>
      </Section>

      <Section id="pricing" number={++n} title={sections[7]}>
        <ul>
          <li>All prices are in South African Rand (ZAR) and are shown on this website.</li>
          <li>
            Prices may change from time to time, but the price confirmed when you booked is the
            price you pay for that appointment.
          </li>
          <li>
            Online payments are processed securely by PayFast. Card details are handled by
            PayFast and are never seen or stored by Wellness with Skyla.
          </li>
          <li>
            Discounts and promotions can&apos;t be combined, have no cash value, and apply only
            on the terms stated when they are offered.
          </li>
        </ul>
      </Section>

      <Section id="privacy" number={++n} title={sections[8]}>
        <p>
          Your name, contact details, booking details and any health information you share are
          used only to manage your bookings, provide your treatment safely and contact you about
          your appointments. They are kept confidential, are never sold or shared for marketing,
          and are handled in line with the Protection of Personal Information Act (POPIA). You can
          ask to see, correct or delete your information at any time.
        </p>
      </Section>

      <Section id="liability" number={++n} title={sections[9]}>
        <p>
          Treatments are given with care and skill. As far as the law allows, Wellness with Skyla
          is not liable for any reaction, injury or loss that results from health information
          that was not shared before your treatment, or from not following aftercare advice.
          Please don&apos;t bring valuables to your appointment; Wellness with Skyla is not
          responsible for personal belongings.
        </p>
        <p>Nothing in these terms limits your rights under the Consumer Protection Act.</p>
      </Section>

      <Section id="general" number={++n} title={sections[10]}>
        <p>
          These terms may be updated from time to time. The version on this website when you
          booked applies to that booking. These terms are governed by the laws of South Africa.
        </p>
        <p>
          Questions? <ContactLine />.
        </p>
      </Section>
    </LegalPage>
  );
}
