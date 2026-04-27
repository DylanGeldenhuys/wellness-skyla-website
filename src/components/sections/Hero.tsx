import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden" aria-label="Hero">

      {/* Full-bleed background image */}
      <Image
        src="/images/stock/stock-3.jpg"
        alt="Warm candlelit massage therapy — hands working on a client's back"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient: dark at top (for header legibility) + dark at bottom (for text) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"
      />

      {/* Content — bottom-left aligned */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-14 lg:px-16 lg:pb-20">

        {/* Eyebrow */}
        <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Goldenhill Treatments · Somerset West · By Appointment
        </p>

        <h1 className="font-serif italic text-white leading-[1.05] tracking-[-0.01em]
          text-[2.8rem] sm:text-[3.8rem] lg:text-[5rem] xl:text-[5.5rem]
          max-w-[14ch]">
          Feel. Breathe.<br />Release.
        </h1>

        {/* Subhead + CTA row */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <p className="font-serif text-white/80 text-base leading-relaxed max-w-sm">
            Relax and bring your body back to its state of balance. Release the buildup you have
            not been able to get to.
          </p>

          <div className="flex items-center gap-4 flex-shrink-0">
            <PrimaryButton href="#visit">
              Book a Session
            </PrimaryButton>
            <a
              href="#treatments"
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 hover:text-white transition-colors"
            >
              View treatments →
            </a>
          </div>
        </div>

        {/* First visit nudge */}
        <p className="mt-6 font-sans text-xs text-white/50">
          First visit?{" "}
          <a href="#offers" className="underline underline-offset-2 text-white/70 hover:text-white transition-colors">
            20% off your session
          </a>
        </p>
      </div>
    </section>
  );
}
