import Eyebrow from "@/components/ui/Eyebrow";

export default function Offers() {
  return (
    <section
      id="offers"
      className="border-y border-line bg-surface py-16 lg:py-20"
      aria-label="First and second visit discounts"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 text-center fade-up">
          <Eyebrow>Welcome Offer</Eyebrow>
          <h2 className="mt-3 font-serif text-h2 text-ink">A gentle beginning</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          {/* First visit */}
          <div className="rounded-2xl bg-surface-warm border border-line p-8 text-center">
            <p className="font-sans text-label font-semibold uppercase tracking-[0.1em] text-ink-soft">
              First visit
            </p>
            <p className="mt-3 font-serif text-5xl font-bold text-primary">20%</p>
            <p className="mt-1 font-sans text-sm text-ink-soft">off your session</p>
          </div>

          {/* Second visit */}
          <div className="rounded-2xl bg-surface border border-line p-8 text-center">
            <p className="font-sans text-label font-semibold uppercase tracking-[0.1em] text-ink-soft">
              Second visit
            </p>
            <p className="mt-3 font-serif text-5xl font-bold text-clay">10%</p>
            <p className="mt-1 font-sans text-sm text-ink-soft">off your session</p>
          </div>
        </div>

        {/* Fine print */}
        <p className="mt-8 text-center font-sans text-xs text-ink-soft/70">
          Discounts apply to all individual rituals and packages. Therapi-inclusive sessions add
          approximately 5 minutes for equipment preparation — this is already reflected in the
          package durations listed.
        </p>
      </div>
    </section>
  );
}
