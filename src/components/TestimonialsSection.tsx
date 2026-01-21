import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useI18n } from "../i18n/I18nProvider";

interface Testimonial {
  id: number;
  roleKey: string;
  projectKey: string;
  quoteKey: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    roleKey: "testimonials.1.role",
    projectKey: "testimonials.1.project",
    quoteKey: "testimonials.1.quote",
  },
  {
    id: 2,
    roleKey: "testimonials.2.role",
    projectKey: "testimonials.2.project",
    quoteKey: "testimonials.2.quote",
  },
  {
    id: 3,
    roleKey: "testimonials.3.role",
    projectKey: "testimonials.3.project",
    quoteKey: "testimonials.3.quote",
  },
  {
    id: 4,
    roleKey: "testimonials.4.role",
    projectKey: "testimonials.4.project",
    quoteKey: "testimonials.4.quote",
  },
];

function TestimonialCard({ testimonial, index, isMobile, t }: { testimonial: Testimonial; index: number; isMobile: boolean; t: (key: string) => string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: isMobile ? 0.3 : 0.6,
        delay: isMobile ? 0 : index * 0.1,
        ease: "easeOut",
      }}
      whileHover={!isMobile ? { y: -6 } : undefined}
      style={{ willChange: "transform, opacity" }}
      className="flex-shrink-0 w-[calc(100vw-2rem)] max-w-[420px] sm:w-[400px] md:w-auto"
    >
      <div className="h-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/90 border border-gray-100/80 shadow-[0_12px_34px_-24px_rgba(15,23,42,0.26)] md:shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] md:hover:shadow-[0_28px_80px_-32px_rgba(15,23,42,0.5)] transition-all duration-500 relative overflow-hidden group backdrop-blur-[1.5px] md:backdrop-blur-sm">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-0 ring-1 ring-amber-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl md:rounded-3xl pointer-events-none" />
        
        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <svg className="w-12 h-12 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Quote */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 relative z-10">
          "{t(testimonial.quoteKey)}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div>
            <h4 className="font-semibold text-gray-900">{t(testimonial.projectKey)}</h4>
            <p className="text-sm text-gray-500">{t(testimonial.roleKey)}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-50px" });
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
      className="pt-12 pb-12 sm:pb-16 md:py-32 bg-gradient-to-b from-white via-amber-50/40 to-gray-50 relative overflow-x-hidden overflow-y-visible md:overflow-hidden touch-pan-y mobile-cv-visible"
    >
      {/* Background decorations */}
      <div className="absolute top-16 left-6 w-56 h-56 md:left-10 md:w-72 md:h-72 bg-amber-100/50 rounded-full blur-[70px] md:blur-[110px] pointer-events-none" />
      <div className="absolute bottom-16 right-6 w-56 h-56 md:right-10 md:w-72 md:h-72 bg-orange-100/40 rounded-full blur-[70px] md:blur-[110px] pointer-events-none" />
      <div className="absolute -top-24 right-1/3 w-[420px] h-[420px] md:-top-32 md:w-[520px] md:h-[520px] bg-gradient-to-br from-amber-200/40 via-orange-100/20 to-transparent rounded-full blur-[90px] md:blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-[460px] h-[460px] md:-bottom-40 md:w-[560px] md:h-[560px] bg-gradient-to-tr from-rose-200/30 via-amber-100/20 to-transparent rounded-full blur-[100px] md:blur-[160px] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" aria-hidden="true">
        <defs>
          <pattern id="testimonial-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#testimonial-grid)" className="text-amber-400" />
      </svg>
      <svg className="absolute inset-0 w-full h-full opacity-[0.18] mix-blend-soft-light pointer-events-none" aria-hidden="true">
        <defs>
          <radialGradient id="testimonial-glow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.16" />
            <stop offset="50%" stopColor="#fb923c" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#testimonial-glow)" />
      </svg>

      <div className="container mx-auto px-4 sm:px-5 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-[minmax(0,420px)_1fr] gap-10 lg:gap-16 items-start min-w-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="w-full max-w-2xl text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {t("testimonials.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              <span className="block gradient-text">{t("testimonials.title")}</span>
            </h2>
            <p className="text-base md:text-xl text-gray-600">
              {t("testimonials.subtitle")}
            </p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4 text-gray-500 text-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t("testimonials.trust.1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t("testimonials.trust.2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t("testimonials.trust.3")}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Testimonials */}
          <div className="relative mx-0 md:-mx-5 lg:mx-0 min-w-0">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/70 to-transparent md:hidden" />
            <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto overflow-y-hidden md:overflow-visible pb-6 md:pb-0 px-4 sm:px-5 md:px-0 snap-x snap-mandatory scrollbar-hide overscroll-x-contain scroll-px-4 sm:scroll-px-5 touch-pan-x">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="snap-center md:snap-none flex">
                  <TestimonialCard
                    testimonial={testimonial}
                    index={index}
                    isMobile={isMobile}
                    t={t}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
