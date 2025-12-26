import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import BackToHome from "../components/BackToHome";
import MagneticButton from "../components/MagneticButton";
import { useI18n } from "../i18n/I18nProvider";
import { Link } from "react-router-dom";

export default function FlatBurger() {
  const { t } = useI18n();
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50" />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-200/40 to-orange-200/30 blur-[120px]"
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32"
      >
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
          }}
          className="container mx-auto px-5 md:px-6 relative z-20"
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <BackToHome />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center mb-8"
            >
              <span className="inline-flex items-center gap-2 mb-6 text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-full text-amber-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                {t("flatburger.badge")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tight leading-[1.05] mb-6 md:mb-8 text-center"
            >
              <span className="block">{t("flatburger.title")}</span>
              <span className="block gradient-text">{t("flatburger.subtitle")}</span>
            </motion.h1>
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <div ref={containerRef} className="relative">
        {/* Overview Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-5 md:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {t("flatburger.overview.title")}
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {t("flatburger.overview.desc")}
                </p>
              </motion.div>

              {/* Challenge & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="p-6 md:p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl md:rounded-3xl border border-amber-200/50"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-amber-900">
                    {t("flatburger.challenge.title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("flatburger.challenge.desc")}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="p-6 md:p-8 bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl md:rounded-3xl border border-blue-200/50"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">
                    {t("flatburger.solution.title")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t("flatburger.solution.desc")}
                  </p>
                </motion.div>
              </div>

              {/* Services Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  {t("flatburger.services.title")}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: num * 0.1 }}
                      className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                        <span className="text-gray-700 font-medium">
                          {t(`flatburger.services.${num}`)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  {t("flatburger.results.title")}
                </h3>
                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  {[1, 2, 3].map((num) => (
                    <motion.div
                      key={num}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: num * 0.1 }}
                      className="p-6 md:p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl md:rounded-3xl border border-gray-200 shadow-lg text-center"
                    >
                      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                        {t(`flatburger.results.${num}.value`)}
                      </div>
                      <div className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                        {t(`flatburger.results.${num}.label`)}
                      </div>
                      <p className="text-sm md:text-base text-gray-600">
                        {t(`flatburger.results.${num}.desc`)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Technologies Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6">
                  {t("flatburger.tech.title")}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <motion.span
                      key={num}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: num * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-gray-800 font-medium border border-amber-200/50"
                    >
                      {t(`flatburger.tech.${num}`)}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50" />
          <div className="container mx-auto px-5 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
                {t("flatburger.cta.title")}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-10 md:mb-12 max-w-2xl mx-auto">
                {t("flatburger.cta.desc")}
              </p>
              <MagneticButton>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-3 text-lg px-10 py-5 btn-glow text-white rounded-2xl font-semibold group"
                >
                  <span>{t("flatburger.cta.button")}</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
