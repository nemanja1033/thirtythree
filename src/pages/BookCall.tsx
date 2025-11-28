import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackToHome from "../components/BackToHome";
import { useI18n } from "../i18n/I18nProvider";
import CalendlyInline from "../components/CalendlyInline";

export default function BookCall() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fadeUpItem = {
    hidden: { y: isMobile ? 20 : 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/10" />
      </div>
      
      <Navbar />

      <section ref={heroRef} className="pt-28 md:pt-40 pb-8 md:pb-10 relative">
        <div className="mx-auto w-full max-w-5xl px-5 md:px-6 relative z-10">
          <div className="mb-6">
            <BackToHome />
          </div>
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-center mb-6 md:mb-8"
          >
            <motion.div variants={fadeUpItem}>
              <span className="inline-flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-full text-amber-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Let's connect
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpItem}
              className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6"
            >
              {t("book.title")}
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {t("book.lead")}
            </motion.p>

            <motion.div
              variants={fadeUpItem}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 md:mt-10"
            >
              {["Free consultation", "30 minutes", "No commitment"].map((text) => (
                <div key={text} className="flex items-center gap-1.5 text-gray-500 text-xs md:text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="full-bleed bookacall"
      >
        <div className="w-full max-w-none px-0">
          <CalendlyInline />
        </div>
      </motion.section>

      <footer className="py-12 md:py-20 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              thirtythree
            </span>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-gray-400 text-sm">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Belgrade, Serbia
              </span>
              
              <a href="mailto:hello@thirtythree.rs" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                hello@thirtythree.rs
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} thirtythree. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
