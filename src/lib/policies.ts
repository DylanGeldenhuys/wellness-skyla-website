export const POLICIES_LAST_UPDATED = "25 November 2026";

export const BUSINESS_NAME = "Wellness with Skyla at Goldenhill Treatments";

export const POLICY_PAGES = [
  {
    href: "/terms",
    title: "Terms and Conditions",
    summary: "The terms that apply to every booking and treatment.",
  },
  {
    href: "/refund-policy",
    title: "Refund Policy",
    summary: "Deposits, what is refunded and how refunds are paid.",
  },
  {
    href: "/cancellation-policy",
    title: "Cancellation Policy",
    summary: "How to cancel, notice, no-shows and late arrivals.",
  },
  {
    href: "/delivery-policy",
    title: "Delivery Policy",
    summary: "How and where your treatment is delivered.",
  },
] as const;

/** What happens to the money when a treatment doesn't go ahead. */
export const REFUND_ROWS = [
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
