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

const BG = "#0b1220";
const ACCENT = "#cbd5f5";
const MUTED = "#94a3b8";
const OFF_WHITE = "#f8fafc";

function BrowserFrame({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const scale = useTransform(progress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.98, 1, 0.98]);
  const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : [18, -18]);
  const frameSpring = useSpring(y, { stiffness: 120, damping: 26 });

  const stateA = {
    opacity: useTransform(progress, [0, 0.24, 0.3], [1, 1, 0]),
    y: useTransform(progress, [0, 0.3], [0, -20]),
  };
  const stateB = {
    opacity: useTransform(progress, [0.22, 0.32, 0.5, 0.56], [0, 1, 1, 0]),
    y: useTransform(progress, [0.22, 0.5], [20, -20]),
  };
  const stateC = {
    opacity: useTransform(progress, [0.5, 0.6, 0.78, 0.84], [0, 1, 1, 0]),
    y: useTransform(progress, [0.5, 0.78], [20, -20]),
  };
  const stateD = {
    opacity: useTransform(progress, [0.78, 0.88, 1], [0, 1, 1]),
    y: useTransform(progress, [0.78, 1], [20, 0]),
  };

  return (
    <motion.div
      style={{
        scale: reduceMotion ? 1 : scale,
        y: reduceMotion ? 0 : frameSpring,
        borderColor: `${ACCENT}25`,
        background: "#0f172a",
        willChange: "transform, opacity",
        transform: "translateZ(0)",
      }}
      className="rounded-[32px] border overflow-hidden shadow-2xl"
    >
      <div
        className="flex items-center justify-between gap-4 px-6 py-4 border-b text-xs uppercase tracking-[0.3em]"
        style={{ borderColor: `${ACCENT}20`, color: ACCENT }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT, opacity: 0.5 }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT, opacity: 0.35 }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT, opacity: 0.2 }} />
        </div>
        <span>signalworks.studio</span>
        <span className="opacity-60">Experience</span>
      </div>

      <div className="relative h-[520px] md:h-[640px] lg:h-[720px] overflow-hidden">
        {!reduceMotion && (
          <>
            <motion.div
              style={{ opacity: stateA.opacity, y: stateA.y }}
              className="absolute inset-0 px-10 md:px-16 py-12 space-y-8"
            >
              <div className="text-4xl md:text-6xl font-bold" style={{ color: OFF_WHITE }}>
                SIGNAL WORKS
              </div>
              <div className="text-base md:text-lg max-w-xl" style={{ color: MUTED }}>
                Premium digital experiences with motion-first systems.
              </div>
              <div className="flex gap-4">
                <div className="px-6 py-3 rounded-full text-xs uppercase tracking-widest" style={{ background: "#1d4ed8", color: OFF_WHITE }}>
                  Start project
                </div>
                <div className="px-6 py-3 rounded-full text-xs uppercase tracking-widest border" style={{ borderColor: `${ACCENT}30`, color: ACCENT }}>
                  View work
                </div>
              </div>
            </motion.div>
            <motion.div
              style={{ opacity: stateB.opacity, y: stateB.y }}
              className="absolute inset-0 px-10 md:px-16 py-12 space-y-8"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {["Strategy", "Design", "Build"].map((item) => (
                  <div key={item} className="rounded-2xl border p-6" style={{ borderColor: `${ACCENT}20` }}>
                    <div className="text-lg font-semibold" style={{ color: OFF_WHITE }}>
                      {item}
                    </div>
                    <div className="mt-2 h-1 w-10" style={{ background: `${ACCENT}40` }} />
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border p-6" style={{ borderColor: `${ACCENT}20` }}>
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
                  Modules
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {["Systems", "Motion", "Content", "Ops"].map((item) => (
                    <div key={item} className="rounded-xl border px-4 py-3" style={{ borderColor: `${ACCENT}20`, color: OFF_WHITE }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              style={{ opacity: stateC.opacity, y: stateC.y }}
              className="absolute inset-0 px-10 md:px-16 py-12 space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border p-6" style={{ borderColor: `${ACCENT}20` }}>
                  <div className="text-3xl font-bold" style={{ color: OFF_WHITE }}>
                    04
                  </div>
                  <div className="text-sm" style={{ color: MUTED }}>
                    Weeks delivery
                  </div>
                </div>
                <div className="rounded-2xl border p-6" style={{ borderColor: `${ACCENT}20` }}>
                  <div className="text-3xl font-bold" style={{ color: OFF_WHITE }}>
                    32
                  </div>
                  <div className="text-sm" style={{ color: MUTED }}>
                    Components
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border p-6" style={{ borderColor: `${ACCENT}20` }}>
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
                  Layout rhythm
                </div>
                <div className="mt-4 h-2 w-full rounded-full" style={{ background: `${ACCENT}20` }} />
                <div className="mt-3 h-2 w-3/4 rounded-full" style={{ background: `${ACCENT}40` }} />
              </div>
            </motion.div>
            <motion.div
              style={{ opacity: stateD.opacity, y: stateD.y }}
              className="absolute inset-0 px-10 md:px-16 py-12 space-y-8"
            >
              <div className="rounded-2xl border p-8 text-center" style={{ borderColor: `${ACCENT}20` }}>
                <div className="text-2xl md:text-4xl font-bold" style={{ color: OFF_WHITE }}>
                  Ready to launch?
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.4em]" style={{ color: ACCENT }}>
                  Contact
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {["Hero", "Modules", "Details"].map((item) => (
                  <div key={item} className="rounded-xl border px-4 py-3 text-xs uppercase tracking-widest" style={{ borderColor: `${ACCENT}20`, color: ACCENT }}>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
        {reduceMotion && (
          <div className="absolute inset-0 px-10 md:px-16 py-12 space-y-6">
            <div className="text-4xl md:text-6xl font-bold" style={{ color: OFF_WHITE }}>
              SIGNAL WORKS
            </div>
            <div className="text-base md:text-lg" style={{ color: MUTED }}>
              Premium digital experiences with motion-first systems.
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function SignalWorks() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const reelInView = useInView(reelRef, { once: true, margin: "-50px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: reelRef,
    offset: ["start end", "end start"],
  });

  const gridItems = useMemo(
    () => [
      "Navigation",
      "Buttons",
      "Cards",
      "Badges",
      "Section header",
      "Testimonial",
      "Pricing",
      "Footer",
      "Modal",
      "Form",
      "Tabs",
      "Stats",
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
            <span className="text-xs uppercase tracking-[0.4em]" style={{ color: ACCENT }}>
              {t("studio.concept")}
            </span>
            <h1
              className="mt-6 text-4xl md:text-7xl font-black"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              SIGNAL WORKS
            </h1>
            <p className="mt-4 text-base md:text-lg" style={{ color: MUTED }}>
              {t("signal.one")}
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={reelRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={reelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
          >
            <BrowserFrame progress={scrollYProgress as any} reduceMotion={reduceMotion} />
          </motion.div>
        </div>
      </section>

      <section ref={gridRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            animate={gridInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.6 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {gridItems.map((item) => (
              <motion.div
                key={item}
                className="rounded-2xl border px-5 py-6 text-sm uppercase tracking-widest"
                style={{ borderColor: `${ACCENT}20`, color: ACCENT }}
                whileHover={!reduceMotion ? { scale: 1.03, y: -4 } : undefined}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
