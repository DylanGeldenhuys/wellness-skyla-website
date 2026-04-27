import { MapPin, Clock, Phone, Mail } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { ADDRESS, HOURS, PHONE, EMAIL, GOOGLE_MAPS_SRC } from "@/lib/contact";

const hoursList = [
  { day: "Monday", hours: HOURS.monday },
  { day: "Tuesday", hours: HOURS.tuesday },
  { day: "Wednesday", hours: HOURS.wednesday },
  { day: "Thursday", hours: HOURS.thursday },
  { day: "Friday", hours: HOURS.friday },
  { day: "Saturday", hours: HOURS.saturday },
  { day: "Sunday", hours: HOURS.sunday },
];

export default function Visit() {
  return (
    <section id="visit" className="bg-surface py-16 lg:py-24" aria-label="Location and hours">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-center text-center fade-up">
          <Eyebrow className="mb-4">Find Us</Eyebrow>
          <h2 className="font-serif text-h2 text-ink">Come as you are</h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: address + hours + contact */}
          <div className="flex flex-col gap-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-surface-warm">
                <MapPin size={18} className="text-clay" aria-hidden="true" />
              </div>
              <div>
                <p className="font-sans text-label font-semibold uppercase tracking-[0.1em] text-clay">
                  Address
                </p>
                {/* TODO: real address */}
                <address className="mt-1 not-italic font-serif text-base text-ink-soft leading-relaxed">
                  {ADDRESS.street}<br />
                  {ADDRESS.suburb}<br />
                  {ADDRESS.city}, {ADDRESS.province} {ADDRESS.postalCode}
                </address>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-surface-warm">
                <Clock size={18} className="text-clay" aria-hidden="true" />
              </div>
              <div className="w-full">
                <p className="font-sans text-label font-semibold uppercase tracking-[0.1em] text-clay">
                  Hours
                </p>
                {/* TODO: real hours */}
                <ul className="mt-2 divide-y divide-line">
                  {hoursList.map(({ day, hours }) => (
                    <li key={day} className="flex justify-between py-2 font-sans text-sm text-ink-soft">
                      <span>{day}</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-3 font-sans text-sm text-ink-soft transition-colors hover:text-primary"
              >
                <Phone size={16} className="text-clay" aria-hidden="true" />
                {/* TODO: real phone */}
                {PHONE}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 font-sans text-sm text-ink-soft transition-colors hover:text-primary"
              >
                <Mail size={16} className="text-clay" aria-hidden="true" />
                {/* TODO: real email */}
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Right: map embed */}
          <div className="h-80 lg:h-auto overflow-hidden rounded-2xl border border-line bg-surface-warm">
            {GOOGLE_MAPS_SRC ? (
              <iframe
                src={GOOGLE_MAPS_SRC}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wellness with Skyla location on Google Maps"
              />
            ) : (
              /* TODO: Replace with real Google Maps embed when address is confirmed */
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 p-8 text-center">
                <MapPin size={32} className="text-clay/40" aria-hidden="true" />
                <p className="font-serif text-base italic text-ink-soft">
                  Map coming soon
                </p>
                <p className="font-sans text-xs text-ink-soft/60">
                  TODO: Add Google Maps embed URL in lib/contact.ts
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
