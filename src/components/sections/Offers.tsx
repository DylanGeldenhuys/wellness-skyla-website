import Eyebrow from "@/components/ui/Eyebrow";

export default function Offers() {
  return (
    <section
      id="offers"
      className="border-y border-line bg-surface py-16 lg:py-20"
      aria-label="Mobile treatment offers"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center fade-up">
          <Eyebrow>Mobile Treatments</Eyebrow>
          <h2 className="mt-3 font-serif text-h2 text-ink">I come to you</h2>
        </div>

        <div className="mx-auto max-w-sm rounded-lg border border-line bg-surface-warm p-8 text-center">
          <p className="font-sans text-label font-semibold uppercase tracking-[0.1em] text-ink-soft">
            Call-out fee
          </p>
          <p className="mt-3 font-serif text-5xl font-bold text-primary">R50</p>
          <p className="mt-1 font-sans text-sm text-ink-soft">starting from</p>
        </div>

        <p className="mt-8 text-center font-sans text-xs text-ink-soft/70">
          Mobile sessions available Monday, Thursday &amp; Friday. Call-out fee added to treatment cost.
        </p>
      </div>
    </section>
  );
}
