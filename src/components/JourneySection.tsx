import { motion, useInView, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/I18nProvider";

interface JourneyStep {
  id: string;
  coordinates: string;
  titleKey: string;
  descKey: string;
  number: string;
}

const journeySteps: JourneyStep[] = [
  { id: "explore", coordinates: "44.8176° N, 20.4633° E", titleKey: "journey.step.1.title", descKey: "journey.step.1.desc", number: "01" },
  { id: "strategy", coordinates: "48.2082° N, 16.3738° E", titleKey: "journey.step.2.title", descKey: "journey.step.2.desc", number: "02" },
  { id: "concept", coordinates: "52.5200° N, 13.4050° E", titleKey: "journey.step.3.title", descKey: "journey.step.3.desc", number: "03" },
  { id: "design", coordinates: "45.4642° N, 9.1900° E", titleKey: "journey.step.4.title", descKey: "journey.step.4.desc", number: "04" },
  { id: "production", coordinates: "41.9028° N, 12.4964° E", titleKey: "journey.step.5.title", descKey: "journey.step.5.desc", number: "05" },
  { id: "growth", coordinates: "40.4168° N, 3.7038° W", titleKey: "journey.step.6.title", descKey: "journey.step.6.desc", number: "06" },
];

function JourneyCard({ step, index, isInView, isMobile, isDark, t }: { step: JourneyStep; index: number; isInView: boolean; isMobile: boolean; isDark: boolean; t: (key: string) => string }) {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  // Use either the parent isInView OR the card's own inView check
  const shouldAnimate = isInView || cardInView;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: isMobile ? 15 : 25 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: isMobile ? 0.5 : 0.8, 
        delay: isMobile ? index * 0.05 : index * 0.1, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={`relative flex items-start gap-4 md:gap-8 ${!isMobile && !isEven ? "flex-row-reverse text-right" : ""}`}
    >
      <motion.div 
        className={`flex-1 ${!isMobile && !isEven ? "md:pr-8" : "md:pl-8"}`}
        whileHover={!isMobile ? { y: -3 } : undefined}
        transition={{ duration: isMobile ? 0.2 : 0.4, ease: "easeOut" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full font-mono text-xs transition-all duration-700 ease-out ${
            isDark 
              ? "bg-indigo-950/50 border border-indigo-500/20 text-indigo-400" 
              : "bg-amber-50 border border-amber-200/50 text-amber-700"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-700 ease-out ${isDark ? "bg-indigo-400" : "bg-amber-500"}`} />
          {step.coordinates}
        </motion.span>

        <div className={`p-5 md:p-6 rounded-2xl border shadow-md transition-all duration-700 ease-out ${
          isDark 
            ? "bg-gray-900/80 border-gray-800" 
            : "bg-white border-gray-100"
        }`}>
          <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-700 ease-out ${isDark ? "text-white" : "text-gray-900"}`}>
            {t(step.titleKey)}
          </h3>
          <p className={`text-sm md:text-base leading-relaxed transition-colors duration-700 ease-out ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            {t(step.descKey)}
          </p>
        </div>
      </motion.div>

      <div className="relative flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={shouldAnimate ? { scale: 1 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1, 
            type: "spring", 
            stiffness: 150,
            damping: 20
          }}
          className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg flex items-center justify-center z-10 transition-all duration-700 ease-out ${
            isDark 
              ? "bg-gradient-to-br from-indigo-500 to-violet-600" 
              : "bg-gradient-to-br from-amber-400 to-orange-500"
          }`}
        >
          <span className="text-white font-bold text-sm">{step.number}</span>
        </motion.div>
      </div>

      {!isMobile && <div className="flex-1 hidden md:block" />}
    </motion.div>
  );
}

export default function JourneySection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  
  const headerInView = useInView(headerRef, { once: true, margin: "0px" });
  const pathInView = useInView(pathRef, { once: true, margin: "0px" });
  
  const [isMobile, setIsMobile] = useState(false);
  const [darkProgress, setDarkProgress] = useState(0);
  const [showExplosion, setShowExplosion] = useState(false);
  const [explosionTriggered, setExplosionTriggered] = useState(false);

  // Dark mode works on both mobile and desktop
  const isDark = darkProgress > 0.5;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Much smoother springs - lower stiffness = more responsive to fast scrolling
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 30,
    restDelta: 0.001
  });
  
  const pathHeight = useTransform(smoothProgress, [0.1, 0.6], ["0%", "100%"]);
  
  // Smoother dark transition - faster response
  const darkTransition = useSpring(
    useTransform(scrollYProgress, [0.42, 0.58], [0, 1]),
    { stiffness: 60, damping: 25 }
  );

  useMotionValueEvent(darkTransition, "change", (latest) => {
    setDarkProgress(latest);
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest >= 0.55 && !explosionTriggered) {
      setExplosionTriggered(true);
      setShowExplosion(true);
      setTimeout(() => setShowExplosion(false), 2500);
    } else if (latest < 0.42 && explosionTriggered) {
      setExplosionTriggered(false);
    }
  });

  // Interpolated background color for ultra-smooth transition
  const bgLight = { r: 248, g: 250, b: 252 };
  const bgDark = { r: 10, g: 10, b: 15 };
  const bgColor = `rgb(${Math.round(bgLight.r + (bgDark.r - bgLight.r) * darkProgress)}, ${Math.round(bgLight.g + (bgDark.g - bgLight.g) * darkProgress)}, ${Math.round(bgLight.b + (bgDark.b - bgLight.b) * darkProgress)})`;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      <div 
        className="py-16 md:py-32 relative"
        style={{ 
          backgroundColor: bgColor,
          transition: "background-color 0.1s linear"
        }}
      >
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.015 + darkProgress * 0.015,
            backgroundImage: `linear-gradient(rgba(${isDark ? '255,255,255' : '0,0,0'},0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(${isDark ? '255,255,255' : '0,0,0'},0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transition: "opacity 0.3s ease-out"
          }}
        />

        {/* Premium ambient lighting - desktop only */}
        {!isMobile && (
          <>
            <div
              className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/30 blur-[200px] pointer-events-none"
              style={{ 
                opacity: darkProgress * 0.25,
                transition: "opacity 0.3s ease-out"
              }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/30 blur-[200px] pointer-events-none"
              style={{ 
                opacity: darkProgress * 0.2,
                transition: "opacity 0.3s ease-out"
              }}
            />
          </>
        )}

        {/* Smooth explosion particles */}
        <AnimatePresence>
          {showExplosion && !isMobile && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)" }}
              />

              {[0, 0.25, 0.5].map((delay, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0.5 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, delay, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border"
                  style={{ borderColor: `rgba(99, 102, 241, ${0.4 - i * 0.1})` }}
                />
              ))}

              {[...Array(16)].map((_, i) => {
                const angle = (i / 16) * Math.PI * 2;
                const distance = 180 + Math.random() * 120;
                return (
                  <motion.div
                    key={i}
                    initial={{ 
                      left: "50%", 
                      bottom: "25%",
                      x: "-50%",
                      scale: 1, 
                      opacity: 0.7 
                    }}
                    animate={{ 
                      x: `calc(-50% + ${Math.cos(angle) * distance}px)`,
                      y: Math.sin(angle) * distance,
                      scale: 0,
                      opacity: 0 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      duration: 1.5 + Math.random() * 0.5, 
                      ease: [0.25, 0.1, 0.25, 1], 
                      delay: Math.random() * 0.3 
                    }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400"
                  />
                );
              })}
            </div>
          )}
        </AnimatePresence>

        <div className="max-w-5xl mx-auto px-5 md:px-8 relative z-10">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 25 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span 
                className="w-12 h-px"
                style={{ 
                  background: `linear-gradient(to right, transparent, rgb(${Math.round(251 - 122 * darkProgress)}, ${Math.round(191 - 51 * darkProgress)}, ${Math.round(36 + 212 * darkProgress)}))`,
                  transition: "background 0.3s ease-out"
                }}
              />
              <span 
                className="text-xs font-medium uppercase tracking-[0.2em]"
                style={{ 
                  color: `rgb(${Math.round(180 - 51 * darkProgress)}, ${Math.round(83 + 57 * darkProgress)}, ${Math.round(9 + 239 * darkProgress)})`,
                  transition: "color 0.3s ease-out"
                }}
              >
                {t("journey.badge")}
              </span>
              <span 
                className="w-12 h-px"
                style={{ 
                  background: `linear-gradient(to left, transparent, rgb(${Math.round(251 - 122 * darkProgress)}, ${Math.round(191 - 51 * darkProgress)}, ${Math.round(36 + 212 * darkProgress)}))`,
                  transition: "background 0.3s ease-out"
                }}
              />
            </div>

            <h2 
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ 
                color: `rgb(${Math.round(17 + 238 * darkProgress)}, ${Math.round(24 + 231 * darkProgress)}, ${Math.round(39 + 216 * darkProgress)})`,
                transition: "color 0.3s ease-out"
              }}
            >
              {t("journey.title.1")}
              <span 
                className="block bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: isDark 
                    ? "linear-gradient(to right, rgb(129, 140, 248), rgb(167, 139, 250), rgb(192, 132, 252))" 
                    : "linear-gradient(to right, rgb(245, 158, 11), rgb(249, 115, 22))",
                  transition: "all 0.5s ease-out"
                }}
              >
                {t("journey.title.2")}
              </span>
            </h2>

            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ 
                color: `rgb(${Math.round(75 + 81 * darkProgress)}, ${Math.round(85 + 78 * darkProgress)}, ${Math.round(99 + 76 * darkProgress)})`,
                transition: "color 0.3s ease-out"
              }}
            >
              {t("journey.subtitle")}
            </p>
          </motion.div>

          {/* Journey Path */}
          <div ref={containerRef} className="relative">
            <div ref={pathRef} className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: `rgb(${Math.round(229 - 198 * darkProgress)}, ${Math.round(231 - 190 * darkProgress)}, ${Math.round(235 - 180 * darkProgress)})`,
                  transition: "background-color 0.3s ease-out"
                }}
              />
              <motion.div
                style={{ 
                  height: pathHeight,
                  backgroundImage: isDark 
                    ? "linear-gradient(to bottom, rgb(99, 102, 241), rgb(139, 92, 246), rgb(168, 85, 247))" 
                    : "linear-gradient(to bottom, rgb(251, 191, 36), rgb(249, 115, 22), rgb(244, 63, 94))"
                }}
                className="absolute top-0 left-0 right-0"
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="relative space-y-14 md:space-y-20 pl-12 md:pl-0">
              {journeySteps.map((step, index) => (
                <JourneyCard key={step.id} step={step} index={index} isInView={pathInView} isMobile={isMobile} isDark={isDark} t={t} />
              ))}
            </div>
          </div>

          {/* PREMIUM CTA */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-24 md:mt-40 relative"
          >
            <div className="absolute left-5 md:left-1/2 -top-24 md:-top-40 w-px h-24 md:h-40 md:-translate-x-1/2 overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={isDark ? { height: "100%" } : { height: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-gradient-to-b from-orange-500 via-rose-500 to-indigo-500"
              />
            </div>

            <motion.div
              animate={{
                boxShadow: isDark 
                  ? "0 50px 100px -20px rgba(99,102,241,0.35)" 
                  : "0 25px 50px -12px rgba(0,0,0,0.12)",
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`relative rounded-[2rem] md:rounded-[3rem] overflow-hidden transition-all duration-700 ease-out ${
                isDark 
                  ? "bg-gradient-to-br from-indigo-950 via-[#0f0f1a] to-[#0a0a12]" 
                  : "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950"
              }`}
            >
              <div 
                className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] p-px"
                style={{ opacity: darkProgress }}
              >
                <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-indigo-500/20 via-transparent to-violet-500/20" />
              </div>

              {isDark && !isMobile && (
                <>
                  <motion.div
                    animate={{ opacity: [0.1, 0.18, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-indigo-500/30 blur-[100px]"
                  />
                  <motion.div
                    animate={{ opacity: [0.12, 0.08, 0.12] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-violet-500/30 blur-[100px]"
                  />
                </>
              )}

              <div className="relative z-10 p-10 md:p-16 lg:p-20">
                <div className="max-w-3xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="inline-flex items-center gap-2 mb-8"
                  >
                    <span 
                      className="w-2 h-2 rounded-full transition-colors duration-700 ease-out"
                      style={{ backgroundColor: isDark ? "rgb(52, 211, 153)" : "rgb(251, 191, 36)" }}
                    />
                    <span 
                      className="text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-700 ease-out"
                      style={{ color: isDark ? "rgba(52, 211, 153, 0.8)" : "rgba(251, 191, 36, 0.8)" }}
                    >
                      {isDark ? t("journey.cta.badge.dark") : t("journey.cta.badge.light")}
                    </span>
                  </motion.div>

                  <motion.h3
                    animate={isDark ? { scale: [1, 1.008, 1] } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                  >
                    {isDark ? (
                      <>
                        {t("journey.cta.title.dark.1")}
                        <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                          {t("journey.cta.title.dark.2")}
                        </span>
                      </>
                    ) : (
                      <>
                        {t("journey.cta.title.light.1")}
                        <span className="block mt-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                          {t("journey.cta.title.light.2")}
                        </span>
                      </>
                    )}
                  </motion.h3>

                  <p className="text-base md:text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed transition-all duration-500">
                    {isDark 
                      ? t("journey.cta.desc.dark")
                      : t("journey.cta.desc.light")
                    }
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
                    <motion.div 
                      whileHover={{ scale: 1.015 }} 
                      whileTap={{ scale: 0.985 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <Link
                        to="/book"
                        className={`group inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-semibold rounded-xl transition-all duration-500 ease-out ${
                          isDark
                            ? "bg-white text-gray-900 hover:bg-gray-50"
                            : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400"
                        }`}
                      >
                        <span>{t("journey.cta.button")}</span>
                        <svg className="w-4 h-4 transition-transform duration-400 ease-out group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </motion.div>

                    <a href="mailto:hello@thirtythree.rs" className="text-gray-500 hover:text-white transition-colors duration-400 text-sm">
                      hello@thirtythree.rs
                    </a>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-gray-500 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        <span>{t("journey.cta.stat.1")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-amber-500" />
                        <span>{t("journey.cta.stat.2")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-violet-500" />
                        <span>{t("journey.cta.stat.3")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
