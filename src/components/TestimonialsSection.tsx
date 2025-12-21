import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useI18n } from "../i18n/I18nProvider";

interface Testimonial {
  id: number;
  nameKey: string;
  roleKey: string;
  companyKey: string;
  quoteKey: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    nameKey: "testimonials.1.name",
    roleKey: "testimonials.1.role",
    companyKey: "testimonials.1.company",
    quoteKey: "testimonials.1.quote",
    avatar: "M",
    rating: 5,
  },
  {
    id: 2,
    nameKey: "testimonials.2.name",
    roleKey: "testimonials.2.role",
    companyKey: "testimonials.2.company",
    quoteKey: "testimonials.2.quote",
    avatar: "S",
    rating: 5,
  },
  {
    id: 3,
    nameKey: "testimonials.3.name",
    roleKey: "testimonials.3.role",
    companyKey: "testimonials.3.company",
    quoteKey: "testimonials.3.quote",
    avatar: "A",
    rating: 5,
  },
  {
    id: 4,
    nameKey: "testimonials.4.name",
    roleKey: "testimonials.4.role",
    companyKey: "testimonials.4.company",
    quoteKey: "testimonials.4.quote",
    avatar: "N",
    rating: 5,
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-300"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

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
      whileHover={!isMobile ? { y: -8 } : undefined}
      className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-[450px]"
    >
      <div className="h-full p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        
        {/* Quote icon */}
        <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
          <svg className="w-12 h-12 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <StarIcon filled={i < testimonial.rating} />
            </div>
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 relative z-10">
          "{t(testimonial.quoteKey)}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {testimonial.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{t(testimonial.nameKey)}</h4>
            <p className="text-sm text-gray-500">
              {t(testimonial.roleKey)} · {t(testimonial.companyKey)}
            </p>
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
      className="py-16 md:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-5 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {t("testimonials.badge")}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            <span className="block gradient-text">{t("testimonials.title")}</span>
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        {/* Testimonials horizontal scroll */}
        <div className="relative -mx-5 md:mx-0">
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 px-5 md:px-0 snap-x snap-mandatory scrollbar-hide md:justify-center md:flex-wrap">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="snap-center">
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

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-12 text-gray-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("testimonials.trust.1")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("testimonials.trust.2")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{t("testimonials.trust.3")}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

