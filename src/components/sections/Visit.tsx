import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import {
  ADDRESS,
  HOURS,
  PHONE,
  PHONE_HREF,
  EMAIL,
  GOOGLE_MAPS_SRC,
  GOOGLE_MAPS_LINK,
  getWhatsAppUrl,
} from "@/lib/contact";

const hoursList = [
  { day: "Monday", hours: HOURS.monday },
  { day: "Tuesday", hours: HOURS.tuesday },
  { day: "Wednesday", hours: HOURS.wednesday },
  { day: "Thursday", hours: HOURS.thursday },
  { day: "Friday", hours: HOURS.friday },
  { day: "Saturday", hours: HOURS.saturday },
  { day: "Sunday", hours: HOURS.sunday },
];

function ContactAction({
  href,
  icon: Icon,
  label,
  value,
  external = false,
}: {
  href: string;
  icon: typeof MessageCircle;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-3 border-b border-line py-4 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-4"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-white">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-clay">
          {label}
        </span>
        <span className="mt-1 block truncate font-serif text-base text-ink sm:text-[1.05rem]">
          {value}
        </span>
      </span>
    </a>
  );
}

export default function Visit() {
  const bookingUrl = getWhatsAppUrl(
    "Hi Skyla! I'd like to book a session. When would you be available?"
  );

  return (
    <section id="visit" className="bg-surface py-12 lg:py-16" aria-label="Contact and location">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-7 fade-up">
          <Eyebrow className="mb-3">Contact</Eyebrow>
          <h2 className="font-serif text-h2 text-ink">Book your session</h2>
        </div>

        <div className="grid gap-x-10 gap-y-1 sm:grid-cols-3">
          <ContactAction
            href={bookingUrl}
            icon={MessageCircle}
            label="WhatsApp"
            value="Message Skyla"
            external
          />
          <ContactAction href={`tel:${PHONE_HREF}`} icon={Phone} label="Call" value={PHONE} />
          <ContactAction href={`mailto:${EMAIL}`} icon={Mail} label="Email" value={EMAIL} />
        </div>
        <p className="mt-3 font-sans text-xs text-ink-soft">
          WhatsApp is preferred for bookings, as Skyla may be in treatments when calls come
          through.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-warm">
                <MapPin size={18} className="text-clay" aria-hidden="true" />
              </div>
              <div>
                <p className="font-sans text-label font-semibold uppercase tracking-[0.1em] text-clay">
                  Address
                </p>
                <address className="mt-1 not-italic font-serif text-base text-ink-soft leading-relaxed">
                  {ADDRESS.street}<br />
                  {ADDRESS.suburb}, {ADDRESS.city}
                </address>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex font-sans text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:text-primary-deep"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-warm">
                <Clock size={18} className="text-clay" aria-hidden="true" />
              </div>
              <div className="w-full">
                <p className="font-sans text-label font-semibold uppercase tracking-[0.1em] text-clay">
                  Hours
                </p>
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
          </div>

          <div className="h-64 overflow-hidden rounded-lg border border-line bg-surface-warm lg:h-auto">
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
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 p-8 text-center">
                <MapPin size={32} className="text-clay/40" aria-hidden="true" />
                <p className="font-serif text-base italic text-ink-soft">
                  Goldenhill Close, Somerset West
                </p>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:text-primary-deep"
                >
                  Open in Google Maps
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
