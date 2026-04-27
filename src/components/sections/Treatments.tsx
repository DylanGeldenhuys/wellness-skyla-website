import { ChevronDown, Clock, MessageCircle } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { getWhatsAppUrl } from "@/lib/contact";
import { formatDuration, formatPrice } from "@/lib/format";
import { packages, rituals, type Service } from "@/lib/services";

function TreatmentRow({ service }: { service: Service }) {
  const bookingUrl = getWhatsAppUrl(
    `Hi Skyla! I'd like to book a ${service.name} (${formatDuration(
      service.durationMin
    )}, ${formatPrice(service.priceZar)}). When would you be available?`
  );

  return (
    <div className="group/row flex items-start gap-3 border-b border-line last:border-b-0">
      <details className="group min-w-0 flex-1">
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
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary text-white shadow-sm transition-all hover:bg-primary-deep hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:mt-5"
        aria-label={`Book ${service.name} via WhatsApp`}
      >
        <MessageCircle size={17} aria-hidden="true" />
      </a>
    </div>
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

export default function Treatments() {
  return (
    <section id="treatments" className="bg-bg py-14 lg:py-20" aria-label="Treatments">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8 max-w-2xl fade-up sm:mb-10">
          <Eyebrow className="mb-3">Treatments</Eyebrow>
          <h2 className="font-serif text-h2 text-ink">Treatments</h2>
          <p className="mt-3 font-serif text-base leading-relaxed text-ink-soft">
            Simple, tailored sessions for the body and face, including massage and frequency
            therapy. Tap a treatment to see what it includes.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <TreatmentGroup title="Treatments" eyebrow="Line items" items={rituals} />
          <TreatmentGroup title="Bundled" eyebrow="Combinations" items={packages} />
        </div>

        <p className="mt-6 font-sans text-xs leading-relaxed text-ink-soft">
          Prices are in South African Rand. Theraphi-inclusive sessions include setup time.
        </p>
      </div>
    </section>
  );
}
