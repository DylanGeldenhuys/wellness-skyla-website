import { ChevronDown, Clock } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { formatDuration, formatPrice } from "@/lib/format";
import { fetchServices, type Service } from "@/lib/services";

function TreatmentRow({ service }: { service: Service }) {
  return (
    <details className="group border-b border-line last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center gap-4 py-4 outline-none transition-colors hover:text-primary focus-visible:ring-1 focus-visible:ring-primary sm:py-5 [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-lg leading-tight text-ink transition-colors group-hover:text-primary sm:text-xl">
            {service.name}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs font-medium text-ink-soft">
            <span className="inline-flex items-center gap-1">
              <Clock size={13} aria-hidden="true" />
              {formatDuration(service.durationMin)}
            </span>
            <span>{formatPrice(service.priceZar)}</span>
          </span>
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-primary transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="pb-5 pr-2 sm:pr-10">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{service.description}</p>
      </div>
    </details>
  );
}

function TreatmentGroup({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow: string;
  items: Service[];
}) {
  return (
    <div className="rounded-lg border border-line bg-surface/70 px-5 py-5 shadow-sm sm:px-6">
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl text-ink">{title}</h3>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-clay">
          {eyebrow}
        </span>
      </div>
      <div>
        {items.map((service) => (
          <TreatmentRow key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default async function Treatments() {
  const services = await fetchServices();
  const rituals = services.filter((s) => !s.isPackage);
  const packages = services.filter((s) => s.isPackage);

  return (
    <section id="treatments" className="bg-bg py-14 lg:py-20" aria-label="Treatments">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8 max-w-2xl fade-up sm:mb-10">
          <Eyebrow className="mb-3">Treatments</Eyebrow>
          <h2 className="font-serif text-h2 text-ink">Treatments</h2>
          <p className="mt-3 font-serif text-base leading-relaxed text-ink-soft">
            Simple, tailored sessions for the body and face. Tap a treatment to see what it includes.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <TreatmentGroup title="Treatments" eyebrow="Line items" items={rituals} />
          {packages.length > 0 && (
            <TreatmentGroup title="Specials" eyebrow="Combinations" items={packages} />
          )}
        </div>

        <div className="mt-8 flex items-center gap-4">
          <a
            href="#book"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-primary-deep"
          >
            Book a session →
          </a>
          <p className="font-sans text-xs text-ink-soft">Prices in South African Rand.</p>
        </div>
      </div>
    </section>
  );
}
