import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#0b0b14";
const OFF_WHITE = "#f8fafc";
const MUTED = "#cbd5f5";

export default function Pulse() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const kitRef = useRef<HTMLDivElement>(null);
  const deliverRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const kitInView = useInView(kitRef, { once: true, margin: "-50px" });
  const deliverInView = useInView(deliverRef, { once: true, margin: "-50px" });

  const tiles = useMemo(
    () => [
      "#f43f5e",
      "#f97316",
      "#22c55e",
      "#3b82f6",
      "#0ea5e9",
      "#6366f1",
      "#a855f7",
      "#ec4899",
      "#facc15",
      "#14b8a6",
      "#38bdf8",
      "#f472b6",
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
              className="mt-6 text-5xl md:text-7xl font-black tracking-[0.2em]"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              PULSE
            </h1>
            <p className="mt-4 text-base md:text-lg" style={{ color: MUTED }}>
              {t("pulse.one")}
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={kitRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={kitInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
            className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-6"
          >
            {tiles.map((color, index) => (
              <motion.div
                key={`${color}-${index}`}
                className="aspect-square rounded-2xl"
                style={{ background: color }}
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
                    : {
                        duration: 4 + index * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                whileHover={!reduceMotion ? { scale: 1.04 } : undefined}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={deliverRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={deliverInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {["1:1", "4:5", "9:16"].map((format, index) => (
              <motion.div
                key={format}
                className="rounded-2xl border p-6 md:p-8"
                style={{ borderColor: "#2b2b40" }}
                whileHover={!reduceMotion ? { scale: 1.02, y: -4 } : undefined}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                  Format {format}
                </div>
                <div
                  className={`w-full rounded-xl bg-[#121226] ${index === 2 ? "h-40" : "h-28"}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
