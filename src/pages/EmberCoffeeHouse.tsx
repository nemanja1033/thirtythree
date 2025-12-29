import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#f5efe8";
const INK = "#3b2f2a";
const MUTED = "#6b4b3e";
const ACCENT = "#c97c4b";
const SOFT = "#e0d4c7";
const DARK = "#2a201c";
const PAPER = "#f1e8dd";

const grainBg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")";

function EmberMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="34" stroke={INK} strokeWidth="7" />
      <path d="M18 56h60" stroke={INK} strokeWidth="7" strokeLinecap="round" />
      <path d="M32 32c6-8 16-10 24-6" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function EmberWordmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 580 120" fill={INK}>
      <rect x="0" y="0" width="18" height="120" rx="4" />
      <rect x="0" y="0" width="74" height="18" rx="4" />
      <rect x="0" y="51" width="58" height="18" rx="4" />
      <rect x="0" y="102" width="74" height="18" rx="4" />
      <rect x="112" y="0" width="18" height="120" rx="4" />
      <rect x="194" y="0" width="18" height="120" rx="4" />
      <polygon points="130,0 150,0 176,62 156,62" />
      <polygon points="176,62 196,0 216,0 196,62" />
      <rect x="252" y="0" width="18" height="120" rx="4" />
      <rect x="252" y="0" width="72" height="18" rx="4" />
      <rect x="252" y="51" width="72" height="18" rx="4" />
      <rect x="252" y="102" width="72" height="18" rx="4" />
      <rect x="304" y="18" width="18" height="33" rx="4" />
      <rect x="304" y="69" width="18" height="33" rx="4" />
      <rect x="350" y="0" width="18" height="120" rx="4" />
      <rect x="350" y="0" width="74" height="18" rx="4" />
      <rect x="350" y="51" width="58" height="18" rx="4" />
      <rect x="350" y="102" width="74" height="18" rx="4" />
      <rect x="460" y="0" width="18" height="120" rx="4" />
      <rect x="460" y="0" width="72" height="18" rx="4" />
      <rect x="460" y="51" width="72" height="18" rx="4" />
      <rect x="514" y="18" width="18" height="33" rx="4" />
      <polygon points="478,74 534,120 506,120 462,86" />
    </svg>
  );
}

function EmberSecondaryLockup() {
  return (
    <div className="flex items-center gap-6">
      <EmberMark className="w-10 h-10" />
      <div>
        <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
          EMBER
        </div>
        <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
          COFFEE HOUSE
        </div>
      </div>
    </div>
  );
}

function CupMock({ label }: { label: string }) {
  return (
    <div className="relative">
      <div className="mx-auto w-28 h-36 rounded-b-2xl rounded-t-md border" style={{ borderColor: SOFT, background: "#f7efe6" }}>
        <div className="mx-auto mt-5 w-12 h-12 rounded-full border" style={{ borderColor: INK }} />
        <div className="mx-auto mt-3 h-2 w-16 rounded-full" style={{ background: ACCENT }} />
      </div>
      <div className="mt-3 text-[10px] uppercase tracking-[0.4em] text-center" style={{ color: MUTED }}>
        {label}
      </div>
    </div>
  );
}

function BagMock() {
  return (
    <div className="rounded-2xl border p-6" style={{ borderColor: SOFT, background: "#f1e8dd" }}>
      <div className="h-40 rounded-xl border" style={{ borderColor: SOFT, background: "#efe2d6" }} />
      <div className="mt-6 flex items-center gap-3">
        <EmberMark className="w-8 h-8" />
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: INK }}>
          House Blend
        </div>
      </div>
      <div className="mt-3 text-[11px]" style={{ color: MUTED }}>
        Roasted for slow mornings and late golden afternoons.
      </div>
    </div>
  );
}

function MenuMock() {
  const items = [
    ["Ritual Espresso", "2.40"],
    ["Slow Pour", "3.20"],
    ["Ember Latte", "3.60"],
    ["Oat Flat", "3.40"],
    ["Warm Spice", "3.80"],
  ];
  return (
    <div className="rounded-2xl border p-6" style={{ borderColor: SOFT, background: "#f8f1e8" }}>
      <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
        Menu
      </div>
      <div className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
        {items.map(([name, price]) => (
          <div key={name} className="flex items-center justify-between">
            <span>{name}</span>
            <span style={{ color: MUTED }}>{price}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 h-px" style={{ background: SOFT }} />
      <div className="mt-4 text-[11px]" style={{ color: MUTED }}>
        Add oat milk +0.40 / Single origin +0.70
      </div>
    </div>
  );
}

function PosterMock({ headline }: { headline: string }) {
  return (
    <div className="rounded-2xl border p-6 h-full" style={{ borderColor: SOFT, background: "#efe2d6" }}>
      <div className="text-[10px] uppercase tracking-[0.6em]" style={{ color: MUTED }}>
        EMBER
      </div>
      <div className="mt-6 text-2xl font-semibold leading-tight" style={{ color: INK }}>
        {headline}
      </div>
      <div className="mt-10 h-2 w-20 rounded-full" style={{ background: ACCENT }} />
    </div>
  );
}

function SignageMock() {
  return (
    <div className="rounded-2xl border p-6" style={{ borderColor: SOFT, background: DARK }}>
      <div className="text-xs uppercase tracking-[0.4em]" style={{ color: "#d6c7bb" }}>
        Signage
      </div>
      <div className="mt-6 flex items-center justify-center h-28 rounded-xl border" style={{ borderColor: "#3b2f2a" }}>
        <EmberWordmark className="w-[200px]" />
      </div>
    </div>
  );
}

export default function EmberCoffeeHouse() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const identityInView = useInView(identityRef, { once: true, margin: "-50px" });
  const appsInView = useInView(appsRef, { once: true, margin: "-50px" });
  const digitalInView = useInView(digitalRef, { once: true, margin: "-50px" });

  const colors = useMemo(
    () => [
      { name: "Off White", hex: "#f5efe8" },
      { name: "Deep Brown", hex: "#3b2f2a" },
      { name: "Ember", hex: "#c97c4b" },
      { name: "Warm Stone", hex: "#b3886b" },
      { name: "Soft Clay", hex: "#e0d4c7" },
    ],
    []
  );

  const { scrollYProgress } = useScroll({
    target: digitalRef,
    offset: ["start end", "end start"],
  });
  const digitalY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [30, -30]);
  const digitalScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.98, 1, 0.98]);
  const digitalSpring = useSpring(digitalY, { stiffness: 70, damping: 28 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: grainBg }} />
        <div className="container mx-auto px-6 md:px-8 relative">
          <div className="grid lg:grid-cols-[1.15fr,0.85fr] gap-12 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 0.9, ease: "easeOut" }}
            >
              <span className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("studio.concept")}
              </span>
              <div className="mt-8 overflow-hidden">
                <motion.div
                  initial={{ y: reduceMotion ? 0 : 100 }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: reduceMotion ? 0.1 : 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <EmberWordmark className="w-[320px] md:w-[560px]" />
                </motion.div>
              </div>
              <p className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: MUTED }}>
                {t("ember.story")}
              </p>
              <p className="mt-4 text-sm md:text-base" style={{ color: INK }}>
                {t("ember.scope")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 0.9, delay: reduceMotion ? 0 : 0.1 }}
              className="rounded-[36px] border p-10 relative"
              style={{ borderColor: SOFT, background: PAPER }}
            >
              <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: grainBg }} />
              <div className="relative">
                <div className="flex items-center gap-6">
                  <EmberMark className="w-20 h-20" />
                  <div>
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      Ritual mark
                    </div>
                    <div className="text-lg font-semibold" style={{ color: INK }}>
                      Heat halo + cutline
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                    EMBER
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                    COFFEE HOUSE
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["Warm", "Calm", "Grounded"].map((label) => (
                    <div
                      key={label}
                      className="rounded-2xl border px-4 py-6 text-[10px] uppercase tracking-[0.3em]"
                      style={{ borderColor: SOFT, color: MUTED }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={identityRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={identityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.7 }}
            className="grid lg:grid-cols-2 gap-10 md:gap-16"
          >
            <div className="rounded-3xl border p-8" style={{ borderColor: SOFT }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Logo system
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <EmberMark className="w-14 h-14" />
                  <EmberWordmark className="w-[240px]" />
                </div>
                <EmberSecondaryLockup />
                <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: INK }} />
              </div>
            </div>

            <div className="rounded-3xl border p-8" style={{ borderColor: SOFT }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Typography
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-semibold leading-tight" style={{ color: INK }}>
                  Ritual over rush
                </div>
                <div className="text-2xl md:text-3xl" style={{ color: INK }}>
                  Warmth in the details
                </div>
                <div className="text-base" style={{ color: MUTED }}>
                  A calm hierarchy with generous breathing room and soft rhythm.
                </div>
              </div>
            </div>

            <div className="rounded-3xl border p-8" style={{ borderColor: SOFT }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Color system
              </div>
              <div className="grid grid-cols-2 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="rounded-2xl border p-4" style={{ borderColor: SOFT }}>
                    <div className="h-10 rounded-xl" style={{ background: color.hex }} />
                    <div className="mt-3 text-xs uppercase tracking-widest" style={{ color: MUTED }}>
                      {color.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border p-8" style={{ borderColor: SOFT }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Layout rhythm
              </div>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl border" style={{ borderColor: SOFT }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={appsRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={appsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.7 }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 md:gap-10"
          >
            <motion.div
              className="rounded-3xl border p-10"
              style={{ borderColor: SOFT, background: PAPER }}
              whileHover={!reduceMotion ? { scale: 1.01, y: -4 } : undefined}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                Packaging set
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6 items-end">
                <CupMock label="Takeaway" />
                <CupMock label="Dine in" />
                <div className="col-span-2">
                  <BagMock />
                </div>
              </div>
            </motion.div>

            <div className="grid gap-8">
              <MenuMock />
              <PosterMock headline="Slow mornings. Warm light." />
              <SignageMock />
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={digitalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.7 }}
            className="rounded-3xl border p-10 relative overflow-hidden"
            style={{ borderColor: SOFT, background: PAPER }}
          >
            <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: grainBg }} />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Digital experience
              </div>
              <motion.div
                style={{
                  scale: reduceMotion ? 1 : digitalScale,
                  y: reduceMotion ? 0 : digitalSpring,
                  willChange: "transform, opacity",
                  borderColor: SOFT,
                  background: "#f8f1e8",
                }}
                className="rounded-[28px] border overflow-hidden"
              >
                <div className="flex items-center gap-2 px-6 py-4 border-b" style={{ borderColor: SOFT }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: INK, opacity: 0.35 }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: INK, opacity: 0.25 }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: INK, opacity: 0.15 }} />
                </div>
                <div className="px-10 py-10 space-y-10">
                  <div className="space-y-4">
                    <div className="text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                      EMBER COFFEE HOUSE
                    </div>
                    <div className="h-2 w-24 rounded-full" style={{ background: ACCENT }} />
                    <div className="text-sm md:text-base leading-relaxed" style={{ color: MUTED }}>
                      A quiet place to slow down. Ritual, warmth, and the soft glow of morning light.
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {["Home", "Menu", "About"].map((label) => (
                      <div key={label} className="rounded-2xl border p-6" style={{ borderColor: SOFT }}>
                        <div className="text-sm" style={{ color: INK }}>
                          {label}
                        </div>
                        <div className="mt-4 h-24 rounded-xl" style={{ background: PAPER }} />
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border p-6" style={{ borderColor: SOFT }}>
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      Featured menu
                    </div>
                    <div className="mt-4 grid md:grid-cols-3 gap-4">
                      {["Ritual Espresso", "Slow Pour", "Ember Latte"].map((item) => (
                        <div key={item} className="rounded-xl border px-4 py-3" style={{ borderColor: SOFT, color: INK }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
