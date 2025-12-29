import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useI18n } from "../i18n/I18nProvider";
import { Link } from "react-router-dom";

interface Reason {
  iconPath: string;
  titleKey: string;
  descKey: string;
  gradient: string;
  bgGradient: string;
}

const reasons: Reason[] = [
  {
    iconPath: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
    titleKey: "why.reason.1.title",
    descKey: "why.reason.1.desc",
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
  },
  {
    iconPath: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    titleKey: "why.reason.2.title",
    descKey: "why.reason.2.desc",
    gradient: "from-blue-400 to-violet-500",
    bgGradient: "from-blue-50 to-violet-50",
  },
  {
    iconPath: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    titleKey: "why.reason.3.title",
    descKey: "why.reason.3.desc",
    gradient: "from-emerald-400 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
  },
  {
    iconPath: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    titleKey: "why.reason.4.title",
    descKey: "why.reason.4.desc",
    gradient: "from-rose-400 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
  },
  {
    iconPath: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z",
    titleKey: "why.reason.5.title",
    descKey: "why.reason.5.desc",
    gradient: "from-indigo-400 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50",
  },
  {
    iconPath: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
    titleKey: "why.reason.6.title",
    descKey: "why.reason.6.desc",
    gradient: "from-cyan-400 to-blue-500",
    bgGradient: "from-cyan-50 to-blue-50",
  },
];

function ReasonCard({
  reason,
  index,
  isMobile,
  t,
  variants,
}: {
  reason: Reason;
  index: number;
  isMobile: boolean;
  t: (key: string) => string;
  variants: {
    hidden: { opacity: number; y: number };
    show: { opacity: number; y: number; transition: { duration: number; ease: string } };
  };
}) {
  return (
    <motion.div
      variants={variants}
      whileHover={!isMobile ? { y: -6 } : undefined}
      className="group relative"
    >
      <div className={`h-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br ${reason.bgGradient} border border-white/70 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.4)] hover:shadow-[0_24px_70px_-30px_rgba(15,23,42,0.55)] transition-all duration-500 relative overflow-hidden`}>
        {/* Animated background shine - desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
        <div className="absolute inset-0 ring-1 ring-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-16 w-40 h-40 bg-white/50 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Icon */}
        <div className={`w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-6 rounded-xl md:rounded-2xl bg-gradient-to-br ${reason.gradient} flex items-center justify-center shadow-lg relative z-10 transition-transform duration-500 group-hover:scale-[1.02]`}>
          <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={reason.iconPath} />
          </svg>
        </div>

        {/* Content */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 relative z-10 group-hover:text-gray-800 transition-colors">
          {t(reason.titleKey)}
        </h3>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed relative z-10">
          {t(reason.descKey)}
        </p>

        {/* Decorative number */}
        <span className="absolute -bottom-2 -right-2 text-6xl md:text-8xl font-bold text-gray-900/[0.03] pointer-events-none">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const [isMobile, setIsMobile] = useState(false);

  const gridVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.04 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: isMobile ? 12 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-32 bg-gradient-to-b from-white via-slate-50/40 to-white relative overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute -top-28 left-1/4 w-[520px] h-[520px] bg-gradient-to-br from-amber-100/60 via-orange-100/30 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-[560px] h-[560px] bg-gradient-to-tr from-blue-100/50 via-indigo-100/20 to-transparent rounded-full blur-[150px] pointer-events-none" />
      {!isMobile && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            className="absolute top-24 -left-24 w-48 h-48 border border-amber-100/70 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-24 -right-28 w-64 h-64 border border-indigo-100/70 rounded-full"
          />
        </>
      )}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="why-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M36 0H0V36" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#why-grid)" className="text-slate-300" />
      </svg>

      <div className="container mx-auto px-5 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm px-4 py-2 rounded-full bg-white/80 text-gray-700 font-medium border border-gray-200/70 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
            {t("why.badge")}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            {t("why.title.1")}
            <span className="gradient-text"> {t("why.title.2")}</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("why.subtitle")}
          </p>
        </motion.div>

        {/* Reasons grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-12 md:mb-16"
        >
          {reasons.map((reason, index) => (
            <ReasonCard
              key={reason.titleKey}
              reason={reason}
              index={index}
              isMobile={isMobile}
              t={t}
              variants={cardVariants}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/book"
            className="inline-flex items-center gap-3 text-base md:text-lg px-8 py-4 md:px-10 md:py-5 btn-glow text-white rounded-xl md:rounded-2xl font-semibold group"
          >
            <span>{t("why.cta")}</span>
            <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
