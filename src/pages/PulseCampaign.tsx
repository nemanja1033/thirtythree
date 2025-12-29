import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#0b0b14";
const OFF_WHITE = "#f8fafc";
const MUTED = "#cbd5f5";

export default function PulseCampaign() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const systemInView = useInView(systemRef, { once: true, margin: "-50px" });
  const motionInView = useInView(motionRef, { once: true, margin: "-50px" });

  const palette = useMemo(
    () => ["#f43f5e", "#f97316", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"],
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
              className="mt-6 text-5xl md:text-7xl font-black tracking-[0.2em]"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              PULSE
            </h1>
            <p className="mt-4 text-base md:text-lg max-w-2xl" style={{ color: MUTED }}>
              {t("pulse.story")}
            </p>
            <p className="mt-3 text-sm md:text-base" style={{ color: OFF_WHITE }}>
              {t("pulse.scope")}
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
            className="grid lg:grid-cols-3 gap-6 md:gap-8"
          >
            <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: "#1f2937" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                Campaign identity
              </div>
              <div className="text-3xl font-bold" style={{ color: OFF_WHITE }}>
                Typography & rhythm
              </div>
              <div className="mt-4 h-2 w-24 rounded-full" style={{ background: "#f43f5e" }} />
            </div>
            <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: "#1f2937" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                Color logic
              </div>
              <div className="grid grid-cols-3 gap-3">
                {palette.map((color) => (
                  <div key={color} className="h-10 rounded-xl" style={{ background: color }} />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: "#1f2937" }}>
              <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                Graphic elements
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 rounded-xl border" style={{ borderColor: "#374151" }} />
                <div className="h-12 rounded-xl border" style={{ borderColor: "#374151" }} />
                <div className="h-12 rounded-xl border" style={{ borderColor: "#374151" }} />
                <div className="h-12 rounded-xl border" style={{ borderColor: "#374151" }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={motionRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={motionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { label: "1:1", height: "h-40" },
              { label: "4:5", height: "h-44" },
              { label: "9:16", height: "h-52" },
            ].map((format, index) => (
              <motion.div
                key={format.label}
                className="rounded-2xl border p-6 md:p-8"
                style={{ borderColor: "#1f2937" }}
                whileHover={!reduceMotion ? { scale: 1.02, y: -4 } : undefined}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                  Format {format.label}
                </div>
                <motion.div
                  className={`w-full rounded-xl bg-[#111827] ${format.height}`}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: index % 2 === 0 ? [0, -6, 0] : [0, 6, 0],
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
