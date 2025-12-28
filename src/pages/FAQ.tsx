import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useI18n } from "../i18n/I18nProvider";
import BackToHome from "../components/BackToHome";
import Navbar from "../components/Navbar";

interface FAQItem {
  questionKey: string;
  answerKey: string;
  category: string;
}

const faqItems: FAQItem[] = [
  { questionKey: "faq.q1", answerKey: "faq.a1", category: "general" },
  { questionKey: "faq.q2", answerKey: "faq.a2", category: "general" },
  { questionKey: "faq.q3", answerKey: "faq.a3", category: "process" },
  { questionKey: "faq.q4", answerKey: "faq.a4", category: "process" },
  { questionKey: "faq.q5", answerKey: "faq.a5", category: "pricing" },
  { questionKey: "faq.q6", answerKey: "faq.a6", category: "pricing" },
  { questionKey: "faq.q7", answerKey: "faq.a7", category: "support" },
  { questionKey: "faq.q8", answerKey: "faq.a8", category: "support" },
];

function AccordionItem({ item, index, isOpen, onToggle, t, isMobile }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void; t: (key: string) => string; isMobile: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? index * 0.02 : index * 0.05 }}
      className="group"
    >
      <div
        className={`border rounded-2xl overflow-hidden transition-all duration-500 ${
          isOpen
            ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg"
            : "bg-white border-gray-100 hover:border-amber-200 hover:shadow-md"
        }`}
      >
        <button
          onClick={onToggle}
          className="w-full p-5 md:p-6 flex items-center justify-between text-left gap-4"
        >
          <div className="flex items-center gap-4">
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                isOpen
                  ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                  : "bg-gray-100 text-gray-500 group-hover:bg-amber-100 group-hover:text-amber-600"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.span>
            <h3 className={`text-base md:text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-gray-900" : "text-gray-700"}`}>
              {t(item.questionKey)}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isOpen ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: contentHeight, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: isMobile ? 0.25 : 0.4, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div ref={contentRef} className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                <div className="pl-12 md:pl-14">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {t(item.answerKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <BackToHome />

      {/* Hero */}
      <section className="pt-28 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-orange-100/50 rounded-full blur-[100px] pointer-events-none" />

        {!isMobile && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-40 right-20 w-20 h-20 border border-amber-200/30 rounded-2xl"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-20 left-20 w-32 h-32 border border-orange-200/30 rounded-full"
            />
          </>
        )}

        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 text-xs md:text-sm px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("faq.badge")}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              {t("faq.title.1")}
              <span className="block gradient-text">{t("faq.title.2")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {t("faq.subtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-5 md:px-6">
          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.questionKey}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                t={t}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mt-12 md:mt-16"
          >
            <div className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {t("faq.cta.title")}
                </h3>
                <p className="text-gray-400 mb-6 text-sm md:text-base">
                  {t("faq.cta.desc")}
                </p>
                <a
                  href="mailto:thirtythree.office@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-500 hover:to-orange-600 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t("faq.cta.button")}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              thirtythree
            </span>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} thirtythree. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
