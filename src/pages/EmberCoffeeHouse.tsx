import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#f5efe8";
const INK = "#3b2f2a";
const MUTED = "#6b4b3e";
const ACCENT = "#c97c4b";
const SOFT = "#e0d4c7";

function EmberMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="34" stroke={INK} strokeWidth="8" />
      <path d="M20 56h56" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function EmberWordmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 560 120" fill={INK}>
      {/* E */}
      <rect x="0" y="0" width="18" height="120" />
      <rect x="0" y="0" width="72" height="18" />
      <rect x="0" y="51" width="60" height="18" />
      <rect x="0" y="102" width="72" height="18" />
      {/* M */}
      <rect x="110" y="0" width="18" height="120" />
      <rect x="188" y="0" width="18" height="120" />
      <polygon points="128,0 146,0 168,60 150,60" />
      <polygon points="168,60 186,0 204,0 186,60" />
      {/* B */}
      <rect x="240" y="0" width="18" height="120" />
      <rect x="240" y="0" width="70" height="18" />
      <rect x="240" y="51" width="70" height="18" />
      <rect x="240" y="102" width="70" height="18" />
      <rect x="292" y="18" width="18" height="33" />
      <rect x="292" y="69" width="18" height="33" />
      {/* E */}
      <rect x="340" y="0" width="18" height="120" />
      <rect x="340" y="0" width="72" height="18" />
      <rect x="340" y="51" width="60" height="18" />
      <rect x="340" y="102" width="72" height="18" />
      {/* R */}
      <rect x="450" y="0" width="18" height="120" />
      <rect x="450" y="0" width="70" height="18" />
      <rect x="450" y="51" width="70" height="18" />
      <rect x="502" y="18" width="18" height="33" />
      <polygon points="468,72 520,120 494,120 452,84" />
    </svg>
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
      { name: "Muted Orange", hex: "#c97c4b" },
      { name: "Warm Stone", hex: "#b3886b" },
      { name: "Soft Clay", hex: "#e0d4c7" },
    ],
    []
  );

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 0.7, ease: "easeOut" }}
            >
              <span className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                {t("studio.concept")}
              </span>
              <div className="mt-6 overflow-hidden">
                <motion.div
                  initial={{ y: reduceMotion ? 0 : 80 }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: reduceMotion ? 0.1 : 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <EmberWordmark className="w-[280px] md:w-[420px]" />
                </motion.div>
              </div>
              <p className="mt-6 text-base md:text-lg max-w-2xl" style={{ color: MUTED }}>
                {t("ember.story")}
              </p>
              <p className="mt-4 text-sm md:text-base" style={{ color: INK }}>
                {t("ember.scope")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 0.7, delay: reduceMotion ? 0 : 0.1 }}
              className="rounded-[32px] border p-8 md:p-10"
              style={{ borderColor: SOFT, background: "#f1e8dd" }}
            >
              <div className="flex items-center gap-6">
                <EmberMark className="w-20 h-20" />
                <div>
                  <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                    Ritual mark
                  </div>
                  <div className="text-lg font-semibold" style={{ color: INK }}>
                    Circle + cutline
                  </div>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
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
            </motion.div>
          </div>
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
              <div className="space-y-6">
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
              <div className="space-y-3">
                <div className="text-4xl md:text-5xl font-semibold" style={{ color: INK }}>
                  Slow mornings, warm light
                </div>
                <div className="text-2xl md:text-3xl" style={{ color: INK }}>
                  Ritual-led experience
                </div>
                <div className="text-base" style={{ color: MUTED }}>
                  Body copy uses soft rhythm and generous spacing.
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
            className="grid lg:grid-cols-3 gap-6 md:gap-8"
          >
            {["Menu", "Packaging", "Posters"].map((label) => (
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
                <div className="h-32 rounded-xl border" style={{ borderColor: SOFT }} />
                <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em]" style={{ color: MUTED }}>
                  <span>Paper</span>
                  <span>Warm ink</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={digitalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
            className="rounded-3xl border p-8 md:p-10"
            style={{ borderColor: SOFT }}
          >
            <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
              Digital experience
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {["Home", "Menu", "About"].map((label) => (
                <div key={label} className="rounded-2xl border p-6" style={{ borderColor: SOFT }}>
                  <div className="text-sm" style={{ color: INK }}>
                    {label}
                  </div>
                  <div className="mt-4 h-28 rounded-xl" style={{ background: "#f1e8dd" }} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
