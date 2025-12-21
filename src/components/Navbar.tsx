import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../i18n/I18nProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const navItems: Array<{ label: string; id?: string; to?: string }> = [
    { label: t("nav.services"), id: "services" },
    { label: t("nav.strategy"), id: "strategy" },
    { label: "Portfolio", to: "/portfolio" },
    { label: t("nav.about"), id: "about" },
    { label: t("nav.contact"), id: "contact" },
  ];

  const faqLabel = t("nav.faq");

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const go = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(go, 50);
    } else {
      go();
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 md:py-4 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
            : "py-4 md:py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-5 md:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                thirtythree
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                item.to ? (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="relative px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id!)}
                    className="relative px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                )
              ))}
              <Link
                to="/faq"
                className="relative px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                {faqLabel}
              </Link>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden md:flex items-center rounded-lg overflow-hidden border border-gray-200 bg-white/50">
                <button
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                    lang === "en"
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                      : "text-gray-600"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang("sr")}
                  className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                    lang === "sr"
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                      : "text-gray-600"
                  }`}
                >
                  SR
                </button>
              </div>

              <Link
                to="/book"
                className="hidden md:flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium text-sm"
              >
                {t("nav.book")}
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col gap-1.5 p-2"
                aria-label="Menu"
              >
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-5 h-0.5 bg-gray-900 rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="w-5 h-0.5 bg-gray-900 rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-5 h-0.5 bg-gray-900 rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 md:hidden pt-20 bg-white"
          >
            <div className="container mx-auto px-5 py-6">
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  item.to ? (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Link
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-left px-3 py-4 text-xl font-semibold text-gray-900 active:text-amber-500 border-b border-gray-100"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.id!)}
                      className="text-left px-3 py-4 text-xl font-semibold text-gray-900 active:text-amber-500 border-b border-gray-100"
                    >
                      {item.label}
                    </motion.button>
                  )
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
                >
                  <Link
                    to="/faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-4 text-xl font-semibold text-gray-900 active:text-amber-500 border-b border-gray-100"
                  >
                    {faqLabel}
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.25 }}
                className="mt-6 flex items-center gap-3"
              >
                <button
                  onClick={() => setLang("en")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${
                    lang === "en"
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLang("sr")}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${
                    lang === "sr"
                      ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Srpski
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                className="mt-6"
              >
                <Link
                  to="/book"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-semibold"
                >
                  {t("nav.book")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
