"use client";

import { useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { services } from "@/lib/services";
import { formatPrice, formatDuration } from "@/lib/format";
import { WHATSAPP_NUMBER, EMAIL } from "@/lib/contact";

export default function Book() {
  const [selectedId, setSelectedId] = useState<string>(services[0].id);

  const selected = services.find((s) => s.id === selectedId) ?? services[0];

  const waMessage = encodeURIComponent(
    `Hi Skyla! I'd like to book a ${selected.name} (${formatDuration(selected.durationMin)}, ${formatPrice(selected.priceZar)}). When would you be available?`
  );

  const mailSubject = encodeURIComponent(`Booking enquiry: ${selected.name}`);
  const mailBody = encodeURIComponent(
    `Hi Skyla,\n\nI'd like to book a ${selected.name} (${formatDuration(selected.durationMin)}, ${formatPrice(selected.priceZar)}).\n\nPlease let me know your available times.\n\nThank you!`
  );

  return (
    <section id="book" className="bg-bg py-16 lg:py-24" aria-label="Book a session">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center fade-up">
          <Eyebrow className="mb-4">Booking</Eyebrow>
          <h2 className="font-serif text-h2 text-ink">Ready to begin?</h2>
          <p className="mt-4 max-w-lg font-serif text-base leading-relaxed text-ink-soft">
            Select your treatment below, then reach out via WhatsApp or email to arrange your
            session.
          </p>
          <div className="mt-8 h-px w-16 bg-clay opacity-50" aria-hidden="true" />
        </div>

        {/* Service selector — radio cards */}
        <fieldset className="mb-10">
          <legend className="mb-4 font-sans text-label font-semibold uppercase tracking-[0.1em] text-ink-soft">
            Choose a treatment
          </legend>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {services.map((service) => {
              const isSelected = service.id === selectedId;
              return (
                <label
                  key={service.id}
                  className={`relative flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-all duration-300 ease-out ${
                    isSelected
                      ? "border-primary bg-surface-warm shadow-sm"
                      : "border-line bg-surface hover:border-primary/40"
                  }`}
                >
                  {/* Hidden radio input */}
                  <input
                    type="radio"
                    name="service"
                    value={service.id}
                    checked={isSelected}
                    onChange={() => setSelectedId(service.id)}
                    className="sr-only"
                    aria-describedby={`desc-${service.id}`}
                  />

                  {/* Custom radio indicator */}
                  <div
                    aria-hidden="true"
                    className={`mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 transition-colors ${
                      isSelected ? "border-primary bg-primary" : "border-line bg-white"
                    }`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-serif text-sm font-bold text-ink leading-snug">
                        {service.name}
                      </p>
                      <p className="font-serif text-sm text-ink flex-shrink-0">
                        {formatPrice(service.priceZar)}
                      </p>
                    </div>
                    <p id={`desc-${service.id}`} className="mt-1 font-sans text-xs text-ink-soft">
                      {formatDuration(service.durationMin)}{" "}
                      {service.isPackage && "· Package"}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 font-sans text-label font-semibold uppercase tracking-[0.1em] text-white transition-all duration-500 hover:bg-[#1ebe5d] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:w-auto"
            aria-label={`Book ${selected.name} via WhatsApp`}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Book via WhatsApp
          </a>

          {/* Email fallback */}
          <a
            href={`mailto:${EMAIL}?subject=${mailSubject}&body=${mailBody}`}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-primary px-8 py-4 font-sans text-label font-semibold uppercase tracking-[0.1em] text-primary transition-all duration-500 hover:bg-primary hover:text-white hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
            aria-label={`Book ${selected.name} via email`}
          >
            <Mail size={18} aria-hidden="true" />
            Email Skyla
          </a>
        </div>

        {/* Fine print */}
        <p className="mt-8 text-center font-sans text-xs text-ink-soft">
          Skyla will confirm your appointment and share location details via return message.
        </p>
      </div>
    </section>
  );
}
