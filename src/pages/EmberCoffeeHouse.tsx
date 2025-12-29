import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#f5efe8";
const INK = "#3b2f2a";
const MUTED = "#6b4b3e";
const ACCENT = "#c97c4b";

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
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
          >
            <span className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              {t("studio.concept")}
            </span>
            <h1
              className="mt-6 text-4xl md:text-7xl font-black tracking-tight"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: INK }}
            >
              EMBER COFFEE HOUSE
            </h1>
            <p className="mt-4 text-base md:text-lg max-w-2xl" style={{ color: MUTED }}>
              {t("ember.story")}
            </p>
            <p className="mt-3 text-sm md:text-base" style={{ color: INK }}>
              {t("ember.scope")}
            </p>
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
            <div className="rounded-3xl border p-8" style={{ borderColor: "#e0d4c7" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Brand identity
              </div>
              <div className="text-5xl md:text-6xl font-black" style={{ color: INK }}>
                EMBER
              </div>
              <div className="mt-4 text-2xl tracking-[0.4em]" style={{ color: INK }}>
                COFFEE HOUSE
              </div>
              <div className="mt-6 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: INK }} />
                <div className="w-14 h-14 rounded-lg border-2" style={{ borderColor: INK }} />
              </div>
            </div>
            <div className="rounded-3xl border p-8" style={{ borderColor: "#e0d4c7" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Typography & tone
              </div>
              <div className="text-4xl md:text-5xl font-semibold" style={{ color: INK }}>
                Warm, calm, grounded
              </div>
              <div className="mt-4 text-base" style={{ color: MUTED }}>
                Headline hierarchy with soft rhythm and generous spacing.
              </div>
            </div>
            <div className="rounded-3xl border p-8" style={{ borderColor: "#e0d4c7" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Color palette
              </div>
              <div className="grid grid-cols-2 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="rounded-2xl border p-4" style={{ borderColor: "#e0d4c7" }}>
                    <div className="h-10 rounded-xl" style={{ background: color.hex }} />
                    <div className="mt-3 text-xs uppercase tracking-widest" style={{ color: MUTED }}>
                      {color.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border p-8" style={{ borderColor: "#e0d4c7" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Layout rhythm
              </div>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl border" style={{ borderColor: "#e0d4c7" }} />
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
                style={{ borderColor: "#e0d4c7" }}
                whileHover={!reduceMotion ? { scale: 1.02, y: -4 } : undefined}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                  {label}
                </div>
                <div className="h-28 rounded-xl" style={{ background: "#f1e8dd" }} />
                <div className="mt-4 h-3 w-2/3 rounded-full" style={{ background: "#e0d4c7" }} />
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
            style={{ borderColor: "#e0d4c7" }}
          >
            <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
              Digital experience
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {["Home", "Menu", "About"].map((label) => (
                <div key={label} className="rounded-2xl border p-6" style={{ borderColor: "#e0d4c7" }}>
                  <div className="text-sm" style={{ color: INK }}>
                    {label}
                  </div>
                  <div className="mt-4 h-24 rounded-xl" style={{ background: "#f1e8dd" }} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
