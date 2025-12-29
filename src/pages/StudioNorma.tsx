import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#f8f8f8";
const INK = "#111111";
const MUTED = "#6b7280";

function NormaWordmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 560 120" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="square">
      {/* N */}
      <path d="M10 110V10h20l40 60V10h20v100h-20l-40-60v60z" fill={INK} stroke="none" />
      {/* O */}
      <rect x="120" y="10" width="80" height="100" fill="none" />
      {/* R */}
      <path d="M230 110V10h60c20 0 30 10 30 30 0 18-9 28-25 30l30 40h-26l-26-38h-21v38z" fill={INK} stroke="none" />
      {/* M */}
      <path d="M350 110V10h18l32 48 32-48h18v100h-20V44l-30 42h-2l-30-42v66z" fill={INK} stroke="none" />
      {/* A */}
      <path d="M500 110l40-100h20l40 100h-22l-8-22h-40l-8 22zM542 70h26l-13-36z" fill={INK} stroke="none" />
    </svg>
  );
}

function NormaFrame({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const scale = useTransform(progress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.99, 1, 0.99]);
  const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [12, -12]);
  const frameSpring = useSpring(y, { stiffness: 120, damping: 24 });

  const stateA = {
    opacity: useTransform(progress, [0, 0.3, 0.36], [1, 1, 0]),
    y: useTransform(progress, [0, 0.36], [0, -16]),
  };
  const stateB = {
    opacity: useTransform(progress, [0.32, 0.46, 0.66, 0.72], [0, 1, 1, 0]),
    y: useTransform(progress, [0.32, 0.66], [20, -20]),
  };
  const stateC = {
    opacity: useTransform(progress, [0.68, 0.8, 1], [0, 1, 1]),
    y: useTransform(progress, [0.68, 1], [20, 0]),
  };

  return (
    <motion.div
      style={{
        scale: reduceMotion ? 1 : scale,
        y: reduceMotion ? 0 : frameSpring,
        borderColor: "#e5e7eb",
        background: "#ffffff",
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
      className="rounded-[28px] border overflow-hidden shadow-2xl"
    >
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b text-xs uppercase tracking-[0.3em]" style={{ borderColor: "#e5e7eb", color: INK }}>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#111111", opacity: 0.4 }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#111111", opacity: 0.25 }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#111111", opacity: 0.15 }} />
        </div>
        <span>studionorma.studio</span>
        <span className="opacity-60">Portfolio</span>
      </div>

      <div className="relative h-[520px] md:h-[640px] lg:h-[700px] overflow-hidden">
        {!reduceMotion && (
          <>
            <motion.div style={{ opacity: stateA.opacity, y: stateA.y }} className="absolute inset-0 px-10 md:px-16 py-12 space-y-8">
              <div className="text-4xl md:text-6xl font-bold" style={{ color: INK }}>
                STUDIO NORMA
              </div>
              <div className="text-base md:text-lg" style={{ color: MUTED }}>
                Architecture, design, and spatial thinking.
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {["Projects", "About", "Contact"].map((label) => (
                  <div key={label} className="rounded-xl border px-4 py-3 text-xs uppercase tracking-widest" style={{ borderColor: "#e5e7eb", color: INK }}>
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div style={{ opacity: stateB.opacity, y: stateB.y }} className="absolute inset-0 px-10 md:px-16 py-12">
              <div className="grid md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-2xl border p-6" style={{ borderColor: "#e5e7eb" }}>
                    <div className="h-24 rounded-xl" style={{ background: "#f3f4f6" }} />
                    <div className="mt-4 h-2 w-1/2 rounded-full" style={{ background: "#111111", opacity: 0.15 }} />
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div style={{ opacity: stateC.opacity, y: stateC.y }} className="absolute inset-0 px-10 md:px-16 py-12 space-y-8">
              <div className="rounded-2xl border p-8" style={{ borderColor: "#e5e7eb" }}>
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: INK }}>
                  Project detail
                </div>
                <div className="mt-4 text-2xl font-semibold" style={{ color: INK }}>
                  Spatial grid, material palette, quiet typography.
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["Grid", "Type", "Rhythm"].map((label) => (
                  <div key={label} className="rounded-xl border px-4 py-3 text-xs uppercase tracking-widest" style={{ borderColor: "#e5e7eb", color: INK }}>
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
        {reduceMotion && (
          <div className="absolute inset-0 px-10 md:px-16 py-12 space-y-6">
            <div className="text-4xl md:text-6xl font-bold" style={{ color: INK }}>
              STUDIO NORMA
            </div>
            <div className="text-base md:text-lg" style={{ color: MUTED }}>
              Architecture, design, and spatial thinking.
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function StudioNorma() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const systemInView = useInView(systemRef, { once: true, margin: "-50px" });
  const wallInView = useInView(wallRef, { once: true, margin: "-50px" });
  const experienceInView = useInView(experienceRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end start"],
  });

  const systemItems = useMemo(() => ["Wordmark", "Typographic grid", "Layout logic"], []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.7, ease: "easeOut" }}
          >
            <span className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              {t("studio.concept")}
            </span>
            <div className="mt-6 flex items-end justify-between gap-10">
              <NormaWordmark className="w-[280px] md:w-[520px]" />
              <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                NORMA GRID
              </div>
            </div>
            <p className="mt-6 text-base md:text-lg max-w-2xl" style={{ color: MUTED }}>
              {t("norma.story")}
            </p>
            <p className="mt-3 text-sm md:text-base" style={{ color: INK }}>
              {t("norma.scope")}
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
            {systemItems.map((item) => (
              <motion.div
                key={item}
                className="rounded-2xl border p-6 md:p-8"
                style={{ borderColor: "#e5e7eb" }}
                whileHover={!reduceMotion ? { scale: 1.02, y: -4 } : undefined}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: MUTED }}>
                  Identity system
                </div>
                <div className="text-lg font-semibold" style={{ color: INK }}>
                  {item}
                </div>
                <div className="mt-4 h-1 w-16 rounded-full" style={{ background: "#111111", opacity: 0.2 }} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={systemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.7, delay: reduceMotion ? 0 : 0.1 }}
            className="mt-10 rounded-3xl border p-8 md:p-10"
            style={{ borderColor: "#e5e7eb" }}
          >
            <div className="text-xs uppercase tracking-[0.4em] mb-6" style={{ color: MUTED }}>
              Grid discipline
            </div>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="h-16 rounded-lg border" style={{ borderColor: "#e5e7eb" }} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={wallRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={wallInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.7 }}
            className="grid md:grid-cols-2 gap-6 md:gap-8"
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="rounded-3xl border p-8 md:p-10"
                style={{ borderColor: "#e5e7eb" }}
                whileHover={!reduceMotion ? { scale: 1.02, y: -6 } : undefined}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                  Project {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-6 h-40 md:h-48 rounded-2xl bg-[#f3f4f6]" />
                <div className="mt-5 h-3 w-2/3 rounded-full" style={{ background: "#111111", opacity: 0.2 }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={experienceRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
          >
            <NormaFrame progress={scrollYProgress} reduceMotion={reduceMotion} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
