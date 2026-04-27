import ServiceCard from "@/components/ui/ServiceCard";
import Eyebrow from "@/components/ui/Eyebrow";
import { packages } from "@/lib/services";

export default function Packages() {
  return (
    <section
      id="packages"
      className="bg-surface-warm py-16 lg:py-24"
      aria-label="Bundled experiences"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center fade-up">
          <Eyebrow className="mb-4">Curated Packages</Eyebrow>
          <h2 className="font-serif text-h2 text-ink">Bundled experiences</h2>
          <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-ink-soft">
            Pair two complementary treatments for a deeper, more complete session. These
            combinations are Skyla&apos;s most loved offerings.
          </p>
          <div className="mt-8 h-px w-16 bg-clay opacity-50" aria-hidden="true" />
        </div>

        {/* 2-col grid on tablet+, 1-col mobile */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {packages.map((service) => (
            <ServiceCard key={service.id} service={service} warm showSelect />
          ))}
        </div>

        <p className="mt-10 text-center font-sans text-xs text-ink-soft">
          All packages include Skyla&apos;s personalised consultation at the start of your session.
        </p>
      </div>
    </section>
  );
}
