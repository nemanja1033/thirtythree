import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#f5efe8";
const INK = "#3b2f2a";
const MUTED = "#6b4b3e";
const ACCENT = "#c97c4b";
const SOFT = "#e0d4c7";
const PAPER = "#f1e8dd";

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

export default function EmberCoffeeHouse() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-50px" });
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
  const digitalY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [40, -40]
  );
  const digitalScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [0.98, 1, 0.98]
  );
  const digitalSpring = useSpring(digitalY, { stiffness: 80, damping: 26 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-20 md:pb-28">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 0.8, ease: "easeOut" }}
            >
              <span className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("studio.concept")}
              </span>
              <div className="mt-8 overflow-hidden">
                <motion.div
                  initial={{ y: reduceMotion ? 0 : 100 }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: reduceMotion ? 0.1 : 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <EmberWordmark className="w-[320px] md:w-[520px]" />
                </motion.div>
              </div>
              <p className="mt-8 text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: MUTED }}>
                {t("ember.story")}
              </p>
              <p className="mt-4 text-sm md:text-base" style={{ color: INK }}>
                {t("ember.scope")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 0.8, delay: reduceMotion ? 0 : 0.1 }}
              className="rounded-[36px] border p-10"
              style={{ borderColor: SOFT, background: PAPER }}
            >
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
              <div className="mt-10 space-y-6">
                <EmberSecondaryLockup />
                <div className="grid grid-cols-3 gap-3">
                  {["Warm", "Calm", "Grounded"].map((label) => (
                    <div
                      key={label}
                      className="rounded-2xl border px-4 py-6 text-xs uppercase tracking-[0.3em]"
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

      <section ref={philosophyRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.7 }}
            className="grid lg:grid-cols-[0.8fr,1.2fr] gap-10 md:gap-16 items-center"
          >
            <div className="text-sm uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              Philosophy
            </div>
            <div className="text-3xl md:text-5xl font-semibold leading-tight" style={{ color: INK }}>
              Slow moments, warm light, and the quiet before the rush. Every touchpoint is designed to feel tactile, human, and grounded.
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={identityRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={identityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
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
                <div className="flex items-center gap-6">
                  <EmberMark className="w-10 h-10" />
                  <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                    EMBER
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: INK }} />
              </div>
            </div>

            <div className="rounded-3xl border p-8" style={{ borderColor: SOFT }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Typography
              </div>
              <div className="space-y-4">
                <div className="text-4xl md:text-5xl font-semibold" style={{ color: INK }}>
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
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
            className="grid lg:grid-cols-2 gap-8 md:gap-10"
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
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="h-36 rounded-2xl border" style={{ borderColor: SOFT }} />
                <div className="h-36 rounded-2xl border" style={{ borderColor: SOFT }} />
                <div className="h-24 rounded-2xl border" style={{ borderColor: SOFT }} />
                <div className="h-24 rounded-2xl border" style={{ borderColor: SOFT }} />
              </div>
            </motion.div>

            <div className="grid gap-8">
              {["Menu layout", "In-store posters", "Signage system"].map((label) => (
                <motion.div
                  key={label}
                  className="rounded-2xl border p-6 md:p-8"
                  style={{ borderColor: SOFT, background: "#f1e8dd" }}
                  whileHover={!reduceMotion ? { scale: 1.02, y: -4 } : undefined}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                    {label}
                  </div>
                  <div className="h-28 rounded-xl border" style={{ borderColor: SOFT }} />
                  <div className="mt-4 h-3 w-2/3 rounded-full" style={{ background: SOFT }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={digitalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
            className="rounded-3xl border p-10"
            style={{ borderColor: SOFT, background: PAPER }}
          >
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
                  <div className="text-sm md:text-base" style={{ color: MUTED }}>
                    Slow mornings. Warm light. A ritual in every cup.
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
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
