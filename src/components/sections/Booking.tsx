"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import { type Service } from "@/lib/services";
import { formatDuration, formatPrice } from "@/lib/format";

type Step = "service" | "date" | "time" | "details" | "review";

interface BookingState {
  service: Service | null;
  date: string | null;
  timeISO: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const STEPS: Step[] = ["service", "date", "time", "details", "review"];
const STEP_LABELS: Record<Step, string> = {
  service: "Service",
  date: "Date",
  time: "Time",
  details: "Your details",
  review: "Review & Pay",
};

// ── Calendar ──────────────────────────────────────────────────────────────────

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function todayStr() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Johannesburg" });
}

function MonthCalendar({ value, onChange }: { value: string | null; onChange: (d: string) => void }) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const today = todayStr();

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = [...Array(firstDayOfWeek).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const prev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const next = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button onClick={prev} className="p-1 text-ink-soft hover:text-ink transition-colors">
          <ChevronLeft size={18} />
        </button>
        <span className="font-serif text-base font-medium text-ink">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button onClick={next} className="p-1 text-ink-soft hover:text-ink transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAY_NAMES.map((d) => (
          <div key={d} className="py-1 text-center font-sans text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const mm = String(viewMonth + 1).padStart(2, "0");
          const dd = String(day).padStart(2, "0");
          const dateStr = `${viewYear}-${mm}-${dd}`;
          const dow = new Date(viewYear, viewMonth, day).getDay();
          const isWeekend = dow === 0 || dow === 6;
          const isPast = dateStr < today;
          const disabled = isWeekend || isPast;
          const selected = dateStr === value;
          const isToday = dateStr === today;

          return (
            <button
              key={dateStr}
              onClick={() => !disabled && onChange(dateStr)}
              disabled={disabled}
              className={[
                "flex h-9 w-full items-center justify-center rounded-lg font-sans text-sm transition-colors",
                disabled ? "cursor-not-allowed text-line" : "hover:bg-surface-warm",
                selected ? "!bg-primary text-white hover:!bg-primary-deep" : "",
                isToday && !selected ? "font-bold text-primary" : "",
              ].filter(Boolean).join(" ")}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatTimeSlot(iso: string) {
  return new Date(iso).toLocaleTimeString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDateLong(date: string) {
  return new Date(`${date}T12:00:00+02:00`).toLocaleDateString("en-ZA", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

// ── Step bar ──────────────────────────────────────────────────────────────────

function StepBar({ current }: { current: Step }) {
  const idx = STEPS.indexOf(current);
  return (
    <div className="mb-8 flex items-center gap-1 sm:gap-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-1 sm:gap-2">
          <div className={[
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold",
            i <= idx ? "bg-primary text-white" : "bg-line text-ink-soft",
          ].join(" ")}>
            {i < idx ? <CheckCircle size={14} /> : i + 1}
          </div>
          <span className={[
            "hidden font-sans text-xs sm:inline",
            i === idx ? "font-medium text-ink" : "text-ink-soft",
          ].join(" ")}>
            {STEP_LABELS[s]}
          </span>
          {i < STEPS.length - 1 && <div className="h-px w-3 shrink-0 bg-line sm:w-6" />}
        </div>
      ))}
    </div>
  );
}

// ── Review row ────────────────────────────────────────────────────────────────

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-sans text-xs text-ink-soft">{label}</span>
      <span className={`text-right font-sans text-sm ${bold ? "font-semibold text-ink" : "text-ink"}`}>{value}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Booking({ services }: { services: Service[] }) {
  const [step, setStep] = useState<Step>("service");
  const [booking, setBooking] = useState<BookingState>({
    service: null, date: null, timeISO: null,
    firstName: "", lastName: "", email: "", phone: "",
  });
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<"pay" | "later" | null>(null);

  useEffect(() => {
    if (!booking.date || !booking.service) return;
    setSlots([]);
    setSlotsError(null);
    setLoadingSlots(true);
    fetch(`/api/availability?date=${booking.date}&duration=${booking.service.durationMin}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setSlotsError(d.error);
        else setSlots(d.slots ?? []);
      })
      .catch(() => setSlotsError("Could not load availability. Please try again."))
      .finally(() => setLoadingSlots(false));
  }, [booking.date, booking.service]);

  const advance = (patch: Partial<BookingState> = {}) => {
    setBooking((b) => ({ ...b, ...patch }));
    setStep(STEPS[STEPS.indexOf(step) + 1] as Step);
  };

  const back = () => setStep(STEPS[STEPS.indexOf(step) - 1] as Step);

  const bookingPayload = () => ({
    serviceId: booking.service!.id,
    serviceName: booking.service!.name,
    priceZar: booking.service!.priceZar,
    durationMin: booking.service!.durationMin,
    startISO: booking.timeISO!,
    firstName: booking.firstName,
    lastName: booking.lastName,
    email: booking.email,
    phone: booking.phone,
  });

  const handlePay = async () => {
    if (!booking.service || !booking.timeISO) return;
    setSubmitting("pay");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload()),
      });
      const { url, fields } = await res.json();
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;
      Object.entries(fields).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = v as string;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch {
      setSubmitting(null);
    }
  };

  const handlePayLater = async () => {
    if (!booking.service || !booking.timeISO) return;
    setSubmitting("later");
    try {
      const res = await fetch("/api/book/pay-later", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload()),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Booking failed");
      }
      window.location.href = "/booking/success?later=1";
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not create booking. Please try again.");
      setSubmitting(null);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-line bg-white px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-soft/60 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  const backBtn = (
    <button onClick={back} className="flex items-center gap-1 font-sans text-sm text-ink-soft hover:text-ink transition-colors">
      <ChevronLeft size={16} /> Back
    </button>
  );

  const nextBtn = (disabled: boolean, label = "Next") => (
    <button
      onClick={() => advance()}
      disabled={disabled}
      className="ml-auto rounded-full bg-primary px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-primary-deep disabled:opacity-40"
    >
      {label}
    </button>
  );

  return (
    <section id="book" className="bg-bg py-14 lg:py-20" aria-label="Book a session">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-10 text-center fade-up">
          <Eyebrow>Book Online</Eyebrow>
          <h2 className="mt-3 font-serif text-h2 text-ink">Reserve your session</h2>
          <p className="mt-3 font-serif text-base text-ink-soft">
            Choose your treatment, pick a time, and you&apos;re set.
          </p>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <StepBar current={step} />

          {/* Step 1 — Service */}
          {step === "service" && (
            <div>
              <h3 className="mb-4 font-serif text-xl text-ink">Choose a treatment</h3>
              <div className="flex flex-col gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => advance({ service: s, date: null, timeISO: null })}
                    className="flex items-start justify-between rounded-xl border border-line bg-white p-4 text-left transition-colors hover:border-primary hover:bg-surface-warm"
                  >
                    <div>
                      <p className="font-serif text-base text-ink">{s.name}</p>
                      <p className="mt-0.5 line-clamp-2 font-sans text-xs text-ink-soft">{s.description}</p>
                      <div className="mt-2 flex items-center gap-3 font-sans text-xs font-medium text-clay">
                        <span className="inline-flex items-center gap-1"><Clock size={12} />{formatDuration(s.durationMin)}</span>
                        <span>{formatPrice(s.priceZar)}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="mt-1 shrink-0 text-ink-soft" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Date */}
          {step === "date" && (
            <div>
              <h3 className="mb-1 font-serif text-xl text-ink">Choose a date</h3>
              <p className="mb-5 font-sans text-xs text-ink-soft">Available Monday – Friday</p>
              <MonthCalendar
                value={booking.date}
                onChange={(d) => setBooking((b) => ({ ...b, date: d, timeISO: null }))}
              />
              <div className="mt-6 flex gap-3">
                {backBtn}
                {nextBtn(!booking.date)}
              </div>
            </div>
          )}

          {/* Step 3 — Time */}
          {step === "time" && (
            <div>
              <h3 className="mb-1 font-serif text-xl text-ink">Choose a time</h3>
              <p className="mb-5 font-sans text-xs text-ink-soft">
                {booking.date ? formatDateLong(booking.date) : ""}
              </p>
              {loadingSlots ? (
                <p className="py-10 text-center font-sans text-sm text-ink-soft">Loading available times…</p>
              ) : slotsError ? (
                <p className="py-10 text-center font-sans text-sm text-clay">{slotsError}</p>
              ) : slots.length === 0 ? (
                <p className="py-10 text-center font-sans text-sm text-ink-soft">
                  No available slots on this day — please go back and choose another date.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {slots.map((iso) => (
                    <button
                      key={iso}
                      onClick={() => setBooking((b) => ({ ...b, timeISO: iso }))}
                      className={[
                        "rounded-lg border py-2.5 font-sans text-sm transition-colors",
                        booking.timeISO === iso
                          ? "border-primary bg-primary text-white"
                          : "border-line bg-white text-ink hover:border-primary hover:bg-surface-warm",
                      ].join(" ")}
                    >
                      {formatTimeSlot(iso)}
                    </button>
                  ))}
                </div>
              )}
              <div className="mt-6 flex gap-3">
                {backBtn}
                {nextBtn(!booking.timeISO)}
              </div>
            </div>
          )}

          {/* Step 4 — Details */}
          {step === "details" && (
            <div>
              <h3 className="mb-5 font-serif text-xl text-ink">Your details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    { key: "firstName", label: "First name", placeholder: "Jane", type: "text" },
                    { key: "lastName", label: "Last name", placeholder: "Smith", type: "text" },
                    { key: "email", label: "Email", placeholder: "jane@example.com", type: "email" },
                    { key: "phone", label: "Phone", placeholder: "+27 82 000 0000", type: "tel" },
                  ] as const
                ).map(({ key, label, placeholder, type }) => (
                  <div key={key}>
                    <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wide text-ink-soft">
                      {label}
                    </label>
                    <input
                      type={type}
                      className={inputClass}
                      placeholder={placeholder}
                      value={booking[key]}
                      onChange={(e) => setBooking((b) => ({ ...b, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                {backBtn}
                {nextBtn(!booking.firstName || !booking.lastName || !booking.email || !booking.phone)}
              </div>
            </div>
          )}

          {/* Step 5 — Review & Pay */}
          {step === "review" && (
            <div>
              <h3 className="mb-5 font-serif text-xl text-ink">Review your booking</h3>
              <div className="space-y-3 rounded-xl border border-line bg-white p-5">
                <Row label="Treatment" value={booking.service?.name ?? ""} />
                <Row label="Duration" value={formatDuration(booking.service?.durationMin ?? 0)} />
                <Row label="Date" value={booking.date ? formatDateLong(booking.date) : ""} />
                <Row label="Time" value={booking.timeISO ? formatTimeSlot(booking.timeISO) : ""} />
                <div className="border-t border-line pt-3 space-y-3">
                  <Row label="Name" value={`${booking.firstName} ${booking.lastName}`} />
                  <Row label="Email" value={booking.email} />
                  <Row label="Phone" value={booking.phone} />
                </div>
                <div className="border-t border-line pt-3">
                  <Row label="Total" value={formatPrice(booking.service?.priceZar ?? 0)} bold />
                </div>
              </div>
              <p className="mt-4 font-sans text-xs text-ink-soft">
                Pay now via PayFast, or choose to pay in person at your appointment.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {backBtn}
                <button
                  onClick={handlePayLater}
                  disabled={!!submitting}
                  className="rounded-full border border-primary px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:bg-surface-warm disabled:opacity-40"
                >
                  {submitting === "later" ? "Booking…" : "Pay later"}
                </button>
                <button
                  onClick={handlePay}
                  disabled={!!submitting}
                  className="rounded-full bg-primary px-8 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-primary-deep disabled:opacity-40"
                >
                  {submitting === "pay" ? "Redirecting…" : "Pay now →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
