import ServiceCard from "@/components/ui/ServiceCard";
import Eyebrow from "@/components/ui/Eyebrow";
import { rituals } from "@/lib/services";

export default function Rituals() {
  return (
    <section id="rituals" className="bg-bg py-16 lg:py-24" aria-label="Individual treatments">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center fade-up">
          <Eyebrow className="mb-4">Individual Rituals</Eyebrow>
          <h2 className="font-serif text-h2 text-ink">Choose your treatment</h2>
          <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-ink-soft">
            Each session is tailored to your body&apos;s needs on the day. All prices are in South
            African Rand — first-visit discounts apply.
          </p>
          <div className="mt-8 h-px w-16 bg-clay opacity-50" aria-hidden="true" />
        </div>

        {/* Card grid: 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rituals.map((service) => (
            <ServiceCard key={service.id} service={service} showSelect />
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-10 text-center font-sans text-xs text-ink-soft">
          Therapi-inclusive sessions add ~5 min for equipment setup.
        </p>
      </div>
    </section>
  );
}
