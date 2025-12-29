import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import AnimatedBackground from "./components/AnimatedBackground";
import ScrollProgress from "./components/ScrollProgress";
import MagneticButton from "./components/MagneticButton";
import JourneySection from "./components/JourneySection";
import TestimonialsSection from "./components/TestimonialsSection";
import ResultsSection from "./components/ResultsSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import { useI18n } from "./i18n/I18nProvider";
import { Link } from "react-router-dom";

// Premium icon components
const BrandIcon = () => (
  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const GrowthIcon = () => (
  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const PencilIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const GearIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.6 9h16.8M3.6 15h16.8M9 3.6a15 15 0 000 16.8M15 3.6a15 15 0 010 16.8" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return localStorage.getItem("tt_preloader_seen") !== "true";
    } catch {
      return true;
    }
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useI18n();

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    try {
      localStorage.setItem("tt_preloader_seen", "true");
    } catch {
      // Ignore storage errors (e.g. private mode)
    }
  };

  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const strategyRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-50px" });
  const strategyInView = useInView(strategyRef, { once: true, margin: "-50px" });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-50px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, isMobile ? -40 : -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const smoothMouseX = useSpring(mousePosition.x, { stiffness: 80, damping: 40 });
  const smoothMouseY = useSpring(mousePosition.y, { stiffness: 80, damping: 40 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.04 : 0.1,
        delayChildren: isMobile ? 0.05 : 0.2,
      },
    },
  };

  const fadeUpItem = {
    hidden: { y: isMobile ? 15 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.35 : 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleUpItem = {
    hidden: { scale: 0.98, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.25 : 0.5,
        ease: "easeOut",
      },
    },
  };

  const services = [
    {
      icon: <BrandIcon />,
      title: t("services.0.title"),
      description: t("services.0.desc"),
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      to: "/services/brand",
    },
    {
      icon: <CodeIcon />,
      title: t("services.1.title"),
      description: t("services.1.desc"),
      gradient: "from-blue-500 to-violet-600",
      bgGradient: "from-blue-50 to-violet-50",
      to: "/services/web",
    },
    {
      icon: <GrowthIcon />,
      title: t("services.2.title"),
      description: t("services.2.desc"),
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      to: "/services/growth",
    },
  ];

  const strategyItems = [
    { icon: <SearchIcon />, title: t("strategy.0.title"), badge: t("strategy.0.badge"), description: t("strategy.0.desc"), to: "/discover", number: "01" },
    { icon: <PencilIcon />, title: t("strategy.1.title"), badge: t("strategy.1.badge"), description: t("strategy.1.desc"), to: "/design", number: "02" },
    { icon: <GearIcon />, title: t("strategy.2.title"), badge: t("strategy.2.badge"), description: t("strategy.2.desc"), to: "/develop", number: "03" },
    { icon: <RocketIcon />, title: t("strategy.3.title"), badge: t("strategy.3.badge"), description: t("strategy.3.desc"), to: "/grow", number: "04" },
  ];

  const capabilities = [
    {
      icon: <SparklesIcon />,
      title: t("capabilities.0.title"),
      description: t("capabilities.0.desc"),
      badge: t("capabilities.0.badge"),
      accent: "from-amber-500/10 to-orange-500/10",
    },
    {
      icon: <GlobeIcon />,
      title: t("capabilities.1.title"),
      description: t("capabilities.1.desc"),
      badge: t("capabilities.1.badge"),
      accent: "from-blue-500/10 to-violet-500/10",
    },
    {
      icon: <CodeIcon />,
      title: t("capabilities.2.title"),
      description: t("capabilities.2.desc"),
      badge: t("capabilities.2.badge"),
      accent: "from-emerald-500/10 to-teal-500/10",
    },
    {
      icon: <LightningIcon />,
      title: t("capabilities.3.title"),
      description: t("capabilities.3.desc"),
      badge: t("capabilities.3.badge"),
      accent: "from-rose-500/10 to-orange-500/10",
    },
  ];

  const featuredProjects = [
    {
      title: t("featured.0.title"),
      category: t("featured.0.category"),
      description: t("featured.0.desc"),
      image: "/images/flatburger-featured.svg",
      to: "/portfolio/flatburger",
      badge: t("featured.0.badge"),
    },
    {
      title: t("featured.1.title"),
      category: t("featured.1.category"),
      description: t("featured.1.desc"),
      image: "/images/zonex-featured.svg",
      to: "/portfolio/zonex",
      badge: t("featured.1.badge"),
    },
  ];

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
        <AnimatedBackground />
        <ScrollProgress />

        {!isMobile && (
          <motion.div
            className="fixed w-3 h-3 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
            style={{
              x: smoothMouseX,
              y: smoothMouseY,
              translateX: "-50%",
              translateY: "-50%",
              background: "linear-gradient(135deg, #f59e0b, #ea580c)",
            }}
          />
        )}

        <Navbar />

        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0 bg-white"
        >
          <motion.div 
            style={!isMobile ? { y: y1, opacity: heroOpacity } : undefined} 
            className="absolute top-10 md:top-20 left-0 md:left-10 pointer-events-none z-0"
          >
            <div className="w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-gradient-to-r from-amber-200/30 md:from-amber-200/40 to-orange-300/20 blur-[80px] md:blur-[120px]" />
          </motion.div>

          {!isMobile && (
            <motion.div
              style={{ opacity: heroOpacity }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/3 right-1/4 w-20 h-20 border border-amber-200/20 rounded-2xl hidden md:block pointer-events-none z-0"
            />
          )}

          <div className="container mx-auto px-5 md:px-6 relative z-20">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={heroInView && !isLoading ? "visible" : "hidden"}
              className="max-w-6xl mx-auto text-center"
            >
              <motion.div variants={fadeUpItem}>
                <span className="inline-flex items-center gap-2 mb-6 md:mb-8 text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-full text-amber-800 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {t("hero.badge")}
                </span>
              </motion.div>

              <motion.div variants={fadeUpItem} className="mb-6 md:mb-8 overflow-hidden">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-bold tracking-tight leading-[1.05]">
                  <motion.span
                    initial={{ y: isMobile ? 40 : 80, opacity: 0 }}
                    animate={heroInView && !isLoading ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.2 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="block"
                  >
                    {t("hero.title.1")}
                  </motion.span>
                  <motion.span
                    initial={{ y: isMobile ? 40 : 80, opacity: 0 }}
                    animate={heroInView && !isLoading ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.35 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="block gradient-text"
                  >
                    {t("hero.title.2")}
                  </motion.span>
                </h1>
              </motion.div>

              <motion.p
                variants={fadeUpItem}
                className="text-base md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-2"
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.div variants={scaleUpItem} className="relative z-30">
                {isMobile ? (
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 text-base px-8 py-4 btn-glow text-white rounded-xl font-semibold"
                  >
                    <span>{t("hero.cta.primary")}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <MagneticButton>
                    <Link
                      to="/book"
                      className="inline-flex items-center gap-3 text-lg px-10 py-5 btn-glow text-white rounded-2xl font-semibold group"
                    >
                      <span>{t("hero.cta.primary")}</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </MagneticButton>
                )}
              </motion.div>

              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={!isLoading ? { opacity: 1 } : {}}
                  transition={{ delay: 2, duration: 1 }}
                  className="mt-16 md:mt-20 hidden md:flex justify-center"
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-gray-400"
                  >
                    <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
                    <div className="w-5 h-8 rounded-full border border-gray-300 flex justify-center pt-1.5">
                      <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-1.5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} id="services" className="py-16 md:py-32 relative z-10 bg-white">
          <div className="container mx-auto px-5 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="max-w-4xl mx-auto text-center mb-12 md:mb-20"
            >
              <span className="inline-flex items-center gap-2 mb-3 md:mb-4 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gray-100 text-gray-600 font-medium">
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                What we do
              </span>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                {t("services.title")}
              </h2>
              <p className="text-base md:text-xl text-gray-600">{t("services.subtitle")}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <Link key={service.title} to={service.to}>
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                    animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: isMobile ? 0.4 : 0.7, delay: 0.1 + index * 0.1 }}
                    whileHover={!isMobile ? { y: -8 } : undefined}
                    whileTap={isMobile ? { scale: 0.98 } : undefined}
                    className="group h-full"
                  >
                    <div className={`h-full p-5 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br ${service.bgGradient} border border-white/50 shadow-sm hover:shadow-xl transition-all duration-500`}>
                      <div className={`w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center bg-gradient-to-br ${service.gradient} shadow-lg`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4 md:mb-6">{service.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                        <span>Learn more</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-16 md:py-28 bg-gradient-to-b from-white via-amber-50/30 to-white relative overflow-hidden">
          {!isMobile && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute -left-24 top-1/2 -translate-y-1/2 w-48 h-48 border border-amber-100 rounded-full"
            />
          )}

          <div className="container mx-auto px-5 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 25 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="max-w-4xl mx-auto text-center mb-12 md:mb-18"
            >
              <span className="inline-flex items-center gap-2 mb-3 md:mb-4 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gray-900 text-white shadow-lg shadow-amber-200/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {t("capabilities.badge")}
              </span>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                {t("capabilities.title.1")}
                <span className="gradient-text block">{t("capabilities.title.2")}</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                {t("capabilities.subtitle")}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {capabilities.map((capability, idx) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: isMobile ? 18 : 32, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: isMobile ? 0.4 : 0.7, delay: idx * 0.05 }}
                  whileHover={!isMobile ? { y: -10, rotateX: 2 } : undefined}
                  className="relative group"
                >
                  <div className={`h-full p-5 md:p-7 rounded-2xl md:rounded-3xl border border-gray-100 bg-white shadow-lg shadow-amber-50/30 overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${capability.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center shadow-lg shadow-gray-900/10">
                          {capability.icon}
                        </div>
                        <span className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                          {capability.badge}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 leading-tight">
                        {capability.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                        {capability.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        <span>{t("capabilities.more")}</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section ref={strategyRef} id="strategy" className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden z-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          
          <div className="container mx-auto px-5 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
              animate={strategyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="max-w-4xl mx-auto text-center mb-12 md:mb-20"
            >
              <span className="inline-flex items-center gap-2 mb-3 md:mb-4 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-amber-100 text-amber-700 font-medium">
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                Our Process
              </span>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">{t("strategy.title")}</h2>
              <p className="text-base md:text-xl text-gray-600">{t("strategy.subtitle")}</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto">
              {strategyItems.map((item, i) => (
                <Link key={item.title} to={item.to}>
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                    animate={strategyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.05 + i * 0.08 }}
                    whileTap={isMobile ? { scale: 0.98 } : undefined}
                    whileHover={!isMobile ? { y: -6 } : undefined}
                    className="group relative"
                  >
                    <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white border border-gray-100 hover:border-amber-200 hover:shadow-xl transition-all duration-500 relative overflow-hidden h-full">
                      <span className="absolute -top-2 md:-top-4 -right-1 md:-right-2 text-5xl md:text-8xl font-bold text-gray-100 group-hover:text-amber-100 transition-colors duration-500 pointer-events-none">
                        {item.number}
                      </span>
                      <div className="relative">
                        <div className="flex items-center justify-between mb-3 md:mb-4">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-600">
                            {item.icon}
                          </div>
                          <span className="text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200/50 font-medium">
                            {item.badge}
                          </span>
                        </div>
                        <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 group-hover:text-amber-600 transition-colors duration-500">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-xs md:text-sm hidden md:block">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <ResultsSection />

        {/* Featured Work */}
        <section className="py-16 md:py-32 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#f59e0b22,transparent_35%),radial-gradient(circle_at_bottom_right,#6366f122,transparent_35%)]" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          </div>
          <div className="container mx-auto px-5 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 25 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              className="max-w-4xl mx-auto text-center mb-12 md:mb-18"
            >
              <span className="inline-flex items-center gap-2 mb-4 text-xs md:text-sm px-4 py-2 rounded-full bg-white/10 text-white border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {t("featured.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
                {t("featured.title.1")}
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300">
                  {t("featured.title.2")}
                </span>
              </h2>
              <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto">
                {t("featured.subtitle")}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {featuredProjects.map((project, index) => (
                <Link key={project.title} to={project.to}>
                  <motion.div
                    initial={{ opacity: 0, y: isMobile ? 18 : 30, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: isMobile ? 0.4 : 0.7, delay: index * 0.1 }}
                    whileHover={!isMobile ? { y: -8 } : undefined}
                    className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl"
                  >
                    <div className="absolute inset-0">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </div>
                    <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end min-h-[320px]">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/10 text-white border border-white/10">
                          {project.badge}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-200 border border-emerald-400/20">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
                      <p className="text-gray-200 text-sm md:text-base mb-4 md:mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                        <span>{t("featured.cta")}</span>
                        <svg className="w-4 h-4 translate-y-[1px] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* Journey Section */}
        <JourneySection />

        {/* About Section */}
        <section ref={aboutRef} id="about" className="py-16 md:py-32 relative overflow-hidden z-10 bg-white">
          <div className="container mx-auto px-5 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
                  animate={aboutInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.5 : 0.8 }}
                >
                  <span className="inline-flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-gray-100 text-gray-600 font-medium">
                    <span className="w-1 h-1 rounded-full bg-gray-400" />
                    About us
                  </span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
                    {t("about.title.main")}
                    <span className="gradient-text"> {t("about.title.em")}</span>
                  </h2>
                  <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">{t("about.p1")}</p>
                  <p className="text-sm md:text-lg text-gray-500 leading-relaxed mb-8 md:mb-10">{t("about.p2")}</p>
                  
                  {isMobile ? (
                    <Link to="/book" className="inline-flex items-center gap-2 text-gray-900 font-semibold">
                      <span className="border-b-2 border-amber-400 pb-1">Get to know us</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ) : (
                    <MagneticButton>
                      <Link to="/book" className="inline-flex items-center gap-3 text-gray-900 font-semibold group">
                        <span className="border-b-2 border-amber-400 pb-1">Get to know us</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </MagneticButton>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
                  animate={aboutInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.1 : 0.2 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 p-1 shadow-xl md:shadow-2xl">
                    <div className="w-full h-full rounded-[1.8rem] md:rounded-[2.8rem] bg-white flex items-center justify-center relative overflow-hidden">
                      {!isMobile && (
                        <>
                          <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-48 h-48 rounded-full border border-amber-200"
                          />
                          <motion.div
                            animate={{ scale: [1.15, 1, 1.15], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute w-64 h-64 rounded-full border border-orange-100"
                          />
                        </>
                      )}
                      <div className="text-center relative z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={aboutInView ? { scale: 1 } : {}}
                          transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 0.2 : 0.5, type: "spring", stiffness: 100 }}
                          className="text-5xl md:text-8xl font-bold gradient-text mb-1 md:mb-2"
                        >
                          50+
                        </motion.div>
                        <div className="text-base md:text-xl font-semibold text-gray-800">{t("about.stats.projects")}</div>
                        <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">{t("about.stats.sub")}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden z-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          
          {!isMobile && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute -right-40 top-1/2 -translate-y-1/2 w-80 h-80 border border-gray-100 rounded-full hidden md:block"
            />
          )}
          
          <div className="container mx-auto px-5 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: isMobile ? 0.5 : 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 mb-6 md:mb-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg"
              >
                <ChatIcon />
              </motion.div>
              
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
                {t("contact.title.1")}
                <span className="block mt-1 md:mt-2 gradient-text">{t("contact.title.2")}</span>
              </h2>
              <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">{t("contact.subtitle")}</p>
              
              {isMobile ? (
                <Link to="/book" className="inline-flex items-center gap-2 text-base px-10 py-4 btn-glow text-white rounded-xl font-semibold">
                  <span>Schedule a Call</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ) : (
                <MagneticButton>
                  <Link to="/book" className="inline-flex items-center gap-3 text-lg px-12 py-6 btn-glow text-white rounded-2xl font-semibold group">
                    <span>Schedule a Call</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </MagneticButton>
              )}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 md:py-20 bg-[#0a0a0a] text-white relative overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
          
          <div className="container mx-auto px-5 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8"
            >
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                thirtythree
              </span>
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-gray-400 text-sm md:text-base">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Belgrade, Serbia
                </span>
                <a href="mailto:thirtythree.office@gmail.com" className="flex items-center gap-2 hover:text-amber-400 transition-colors duration-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  thirtythree.office@gmail.com
                </a>
              </div>
            </motion.div>
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800 text-center text-gray-500 text-xs md:text-sm">
              © {new Date().getFullYear()} thirtythree. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
