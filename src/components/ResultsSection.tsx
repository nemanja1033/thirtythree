import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useI18n } from "../i18n/I18nProvider";

interface Stat {
  value: number;
  suffix: string;
  labelKey: string;
  descKey: string;
  color: string;
}

const stats: Stat[] = [
  { value: 98, suffix: "%", labelKey: "results.stat.1.label", descKey: "results.stat.1.desc", color: "from-amber-400 to-orange-500" },
  { value: 3, suffix: "x", labelKey: "results.stat.2.label", descKey: "results.stat.2.desc", color: "from-blue-400 to-violet-500" },
  { value: 150, suffix: "%", labelKey: "results.stat.3.label", descKey: "results.stat.3.desc", color: "from-emerald-400 to-teal-500" },
  { value: 24, suffix: "h", labelKey: "results.stat.4.label", descKey: "results.stat.4.desc", color: "from-rose-400 to-pink-500" },
];

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 30 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
}

function StatCard({ stat, index, isInView, isMobile, t }: { stat: Stat; index: number; isInView: boolean; isMobile: boolean; t: (key: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: isMobile ? 0.3 : 0.7,
        delay: isMobile ? index * 0.05 : index * 0.15,
        ease: "easeOut",
      }}
      whileHover={!isMobile ? { y: -10 } : undefined}
      className="relative group"
    >
      <div className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Background gradient on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Icon */}
        <div className={`w-14 h-14 md:w-20 md:h-20 mb-4 md:mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg relative overflow-hidden`}>
          {!isMobile && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-full h-full rounded-2xl border-2 border-dashed border-white/30"
            />
          )}
          <span className="text-white text-xl md:text-3xl font-bold relative z-10">
            {index + 1}
          </span>
        </div>

        {/* Counter */}
        <div className="mb-2">
          <span className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
          </span>
        </div>

        {/* Label */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          {t(stat.labelKey)}
        </h3>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
          {t(stat.descKey)}
        </p>

        {/* Corner accent */}
        <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
      </div>
    </motion.div>
  );
}

export default function ResultsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
        backgroundSize: "40px 40px"
      }} />

      <div className="container mx-auto px-5 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 font-medium border border-amber-200/50">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-amber-500"
            />
            {t("results.badge")}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            {t("results.title.1")}
            <span className="block gradient-text">{t("results.title.2")}</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("results.subtitle")}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.labelKey}
              stat={stat}
              index={index}
              isInView={isInView}
              isMobile={isMobile}
              t={t}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-gray-500 text-sm md:text-base mb-4">
            {t("results.cta.text")}
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-medium">
            <span className="flex items-center gap-2 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {t("results.cta.item.1")}
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              {t("results.cta.item.2")}
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {t("results.cta.item.3")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

