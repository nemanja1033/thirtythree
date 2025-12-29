import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#0b0b0c";
const OFF_WHITE = "#f5f5f5";
const MUTED = "#bdbdbf";

export default function NoirSupply() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const systemInView = useInView(systemRef, { once: true, margin: "-50px" });
  const appsInView = useInView(appsRef, { once: true, margin: "-50px" });

  const colors = useMemo(
    () => [
      { name: "Noir", hex: "#0b0b0c" },
      { name: "Ink", hex: "#1c1c1f" },
      { name: "Ash", hex: "#2b2b30" },
      { name: "Stone", hex: "#3a3a40" },
      { name: "Off White", hex: "#f5f5f5" },
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
            <div className="mt-6 overflow-hidden">
              <motion.h1
                initial={{ y: reduceMotion ? 0 : 80 }}
                animate={heroInView ? { y: 0 } : {}}
                transition={{ duration: reduceMotion ? 0.1 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl md:text-8xl font-black tracking-[0.2em]"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                NOIR
              </motion.h1>
            </div>
            <div className="mt-2 overflow-hidden">
              <motion.h2
                initial={{ y: reduceMotion ? 0 : 60 }}
                animate={heroInView ? { y: 0 } : {}}
                transition={{ duration: reduceMotion ? 0.1 : 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-2xl md:text-4xl tracking-[0.6em]"
                style={{ color: OFF_WHITE }}
              >
                SUPPLY
              </motion.h2>
            </div>
            <p className="mt-6 text-base md:text-lg" style={{ color: MUTED }}>
              {t("noir.one")}
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={systemRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={systemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
            className="grid lg:grid-cols-2 gap-8 md:gap-12"
          >
            <div className="rounded-3xl border p-6 md:p-8" style={{ borderColor: "#2b2b30" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Logo system
              </div>
              <div className="space-y-6">
                <div className="text-4xl md:text-6xl font-black" style={{ color: OFF_WHITE }}>
                  NOIR SUPPLY
                </div>
                <div className="text-2xl md:text-3xl tracking-[0.4em]" style={{ color: OFF_WHITE }}>
                  NS
                </div>
                <div className="w-16 h-16 border-2" style={{ borderColor: OFF_WHITE }} />
              </div>
            </div>
            <div className="rounded-3xl border p-6 md:p-8" style={{ borderColor: "#2b2b30" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Typography
              </div>
              <div className="space-y-3">
                <div className="text-4xl md:text-5xl font-black" style={{ color: OFF_WHITE }}>
                  Display / H1
                </div>
                <div className="text-2xl md:text-3xl font-semibold" style={{ color: OFF_WHITE }}>
                  Heading / H2
                </div>
                <div className="text-base" style={{ color: MUTED }}>
                  Body text / neutral hierarchy sample
                </div>
              </div>
            </div>
            <div className="rounded-3xl border p-6 md:p-8" style={{ borderColor: "#2b2b30" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Color system
              </div>
              <div className="grid grid-cols-2 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="rounded-2xl border p-4" style={{ borderColor: "#2b2b30" }}>
                    <div className="h-10 rounded-xl" style={{ background: color.hex }} />
                    <div className="mt-3 text-xs uppercase tracking-widest" style={{ color: MUTED }}>
                      {color.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border p-6 md:p-8" style={{ borderColor: "#2b2b30" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
                Layout rules
              </div>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-16 rounded-xl border" style={{ borderColor: "#2b2b30" }} />
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
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="rounded-2xl border p-6 md:p-8"
                style={{ borderColor: "#2b2b30" }}
                whileHover={!reduceMotion ? { scale: 1.02, y: -4 } : undefined}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                  Application
                </div>
                <div className="h-24 rounded-xl" style={{ background: "#121214" }} />
                <div className="mt-4 h-3 w-2/3 rounded-full" style={{ background: "#1c1c1f" }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
