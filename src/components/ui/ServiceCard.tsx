import { Clock } from "lucide-react";
import Eyebrow from "./Eyebrow";
import { formatPrice, formatDuration } from "@/lib/format";
import type { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
  /** Show the "Select" CTA linking to the booking section */
  showSelect?: boolean;
  /** Warm surface variant for packages section */
  warm?: boolean;
}

export default function ServiceCard({
  service,
  showSelect = true,
  warm = false,
}: ServiceCardProps) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border border-line p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg ${
        warm ? "bg-surface-warm" : "bg-surface"
      }`}
    >
      <Eyebrow>{service.category}</Eyebrow>

      <h3 className="font-serif text-xl leading-snug text-ink">{service.name}</h3>

      <div className="flex items-center gap-1.5 text-ink-soft">
        <Clock size={13} aria-hidden="true" />
        <span className="font-sans text-xs font-medium">
          {formatDuration(service.durationMin)}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-ink-soft">{service.description}</p>

      <div className="mt-1 flex items-center justify-between border-t border-line pt-4">
        <span className="font-serif text-lg font-bold text-ink">
          {formatPrice(service.priceZar)}
        </span>
        {showSelect && (
          <a
            href="#book"
            className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors duration-300 hover:text-primary-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            aria-label={`Select ${service.name} — go to booking`}
          >
            Select →
          </a>
        )}
      </div>
    </article>
  );
}
