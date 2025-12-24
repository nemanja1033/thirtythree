import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import Navbar from "../components/Navbar";
import InstagramFeed from "../components/InstagramFeed";
import { Link } from "react-router-dom";

// Flat Burger brand colors
const FLAT_BEIGE = "#feebcb";
const FLAT_BLUE = "#1c33c3";
const DARK_BG = "#0a0a0a";
const OFF_WHITE = "#f8f8f8";

// Hook for mobile detection
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  return isMobile;
}

// Flat Burger Logo - Clean SVG version for reliable display
function FlatBurgerLogo({ 
  size = 120, 
  className = "",
  color = FLAT_BLUE,
}: { 
  size?: number; 
  className?: string;
  color?: string;
}) {
  // Simplified Flat Burger logo matching the brand design
  // Using stroke-based rendering for consistent visibility at all sizes
  // Wider aspect ratio (120x100) to match original stretched look
  return (
    <svg
      width={className ? "100%" : size}
      height={className ? "100%" : size}
      viewBox="0 0 120 100"
      className={`block ${className}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke={color}
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Top Bun - rounded rectangle outline */}
      <rect x="10" y="8" width="100" height="18" rx="9" />
      {/* Wavy Patty - more spacing from top bun */}
      <path d="M10 44 Q25 32, 40 44 Q55 56, 60 44 Q65 32, 80 44 Q95 56, 110 44" />
      {/* Middle Line */}
      <line x1="10" y1="62" x2="110" y2="62" />
      {/* Bottom Bun - rounded rectangle outline */}
      <rect x="10" y="74" width="100" height="18" rx="9" />
    </svg>
  );
}

// Urban Hero Section
function UrbanHero() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Reduced parallax on mobile for better performance
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 100 : 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.95 : 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -5]);
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      style={{ background: DARK_BG }}
    >
      {/* Subtle grid background - hidden on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(${FLAT_BLUE} 1px, transparent 1px),
                linear-gradient(90deg, ${FLAT_BLUE} 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px"
            }}
          />
        </div>
      )}
      
      {/* Floating gradient orbs - Simplified on mobile */}
      <div
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] opacity-20 md:opacity-25"
        style={{ background: FLAT_BLUE, top: "-15%", right: "-15%" }}
      />
      {!isMobile && (
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-15"
          style={{ background: FLAT_BEIGE, bottom: "-10%", left: "-5%" }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <motion.div 
        style={!isMobile ? { y, opacity, scale, rotate } : { opacity }} 
        className="relative z-10 w-full"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            {/* Case Study Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex items-center gap-4 mb-10"
            >
              <motion.div 
                className="w-12 h-[1px]"
                style={{ background: FLAT_BLUE }}
                initial={{ scaleX: 0 }}
                animate={isLoaded ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <span 
                className="text-xs md:text-sm uppercase tracking-[0.3em] font-medium"
                style={{ color: FLAT_BEIGE }}
              >
                Case Study
              </span>
            </motion.div>

            {/* Main Title with Logo - Desktop: Side by side, Mobile: Stacked */}
            <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-16">
              {/* Title Section */}
              <div className="text-center lg:text-left flex-1">
                <div className="overflow-hidden mb-2">
                  <motion.h1
                    initial={{ y: isMobile ? 60 : 200, opacity: 0, skewY: isMobile ? 0 : 10 }}
                    animate={isLoaded ? { y: 0, opacity: 1, skewY: 0 } : {}}
                    transition={{ duration: isMobile ? 0.6 : 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[18vw] md:text-[14vw] lg:text-[10vw] xl:text-[9vw] font-black leading-[0.82] tracking-[-0.04em]"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    FLAT
                  </motion.h1>
                </div>
                
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: isMobile ? 60 : 200, opacity: 0, skewY: isMobile ? 0 : 10 }}
                    animate={isLoaded ? { y: 0, opacity: 1, skewY: 0 } : {}}
                    transition={{ duration: isMobile ? 0.6 : 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={!isMobile ? { scale: 1.02, x: 10 } : undefined}
                    className="text-[18vw] md:text-[14vw] lg:text-[10vw] xl:text-[9vw] font-black leading-[0.82] tracking-[-0.04em] cursor-default"
                    style={{
                      fontFamily: '"Bricolage Grotesque", sans-serif',
                      color: "transparent",
                      textShadow: `
                        -2px -2px 0 ${FLAT_BLUE},
                        2px -2px 0 ${FLAT_BLUE},
                        -2px 2px 0 ${FLAT_BLUE},
                        2px 2px 0 ${FLAT_BLUE},
                        -2px 0 0 ${FLAT_BLUE},
                        2px 0 0 ${FLAT_BLUE},
                        0 -2px 0 ${FLAT_BLUE},
                        0 2px 0 ${FLAT_BLUE}
                      `,
                    }}
                  >
                    BURGER
                  </motion.h1>
                </div>
              </div>
              
              {/* Logo - Always visible, bigger on desktop */}
              <motion.div
                className="flex items-center justify-center relative flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {/* Glow effect behind logo */}
                <div 
                  className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] lg:w-[400px] lg:h-[400px] rounded-full blur-[40px] md:blur-[80px] opacity-30 md:opacity-40"
                  style={{ background: FLAT_BLUE }}
                />
                <motion.div
                  animate={!isMobile ? { 
                    y: [-8, 8, -8],
                    rotate: [-2, 2, -2],
                  } : undefined}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-[180px] h-[180px] md:w-[280px] md:h-[280px] lg:w-[400px] lg:h-[400px] flex items-center justify-center"
                  style={{ 
                    filter: isMobile 
                      ? `drop-shadow(0 0 20px ${FLAT_BLUE}60)` 
                      : `drop-shadow(0 0 40px ${FLAT_BLUE}80) drop-shadow(0 0 80px ${FLAT_BLUE}40)` 
                  }}
                >
                  <FlatBurgerLogo 
                    color={OFF_WHITE} 
                    className="w-full h-full" 
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Description & Meta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <p className="text-lg md:text-xl max-w-lg leading-relaxed opacity-60" style={{ color: OFF_WHITE }}>
                Complete brand identity for Belgrade's boldest street food experience. 
                Urban. Raw. Unapologetically delicious.
              </p>
              
              <div className="flex gap-10">
                {[
                  { label: "Year", value: "2024" },
                  { label: "Services", value: "Branding" },
                  { label: "Location", value: "Belgrade" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                    className="text-right"
                  >
                    <div className="text-xs uppercase tracking-wider mb-1 opacity-40" style={{ color: OFF_WHITE }}>
                      {item.label}
                    </div>
                    <div className="text-sm font-medium" style={{ color: FLAT_BEIGE }}>
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] opacity-40" style={{ color: OFF_WHITE }}>
            Scroll
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// Journal.rs Press Feature Section - PROMINENT
function JournalFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-16 md:py-32 relative overflow-hidden" style={{ background: FLAT_BEIGE }}>
      {/* Decorative elements - hidden on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${FLAT_BLUE} 1px, transparent 1px)`,
              backgroundSize: "30px 30px"
            }}
          />
        </div>
      )}
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.a
            href="https://www.journal.rs/lifestyle/gastro/flat-burger-street-food-beograd/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
            className="block group"
          >
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
              {/* Featured In Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.1, ease: "easeOut" }}
                className="shrink-0"
              >
                <div 
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center text-center md:group-hover:scale-105 transition-transform duration-300"
                  style={{ background: FLAT_BLUE }}
                >
                  <span className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] mb-1 md:mb-2 opacity-80" style={{ color: FLAT_BEIGE }}>
                    Featured In
                  </span>
                  <span 
                    className="text-2xl md:text-4xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Journal.rs
                  </span>
                  <span className="text-[10px] md:text-xs mt-1 md:mt-2 opacity-60" style={{ color: OFF_WHITE }}>
                    Aug 2024
                  </span>
                </div>
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  <span 
                    className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-wider mb-4 md:mb-6 font-medium"
                    style={{ background: `${FLAT_BLUE}15`, color: FLAT_BLUE }}
                  >
                    Press Feature
                  </span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 md:mb-6"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
                >
                  "Street-food mapa Beograda dobila je novog igrača – 
                  <span style={{ color: FLAT_BLUE }}> Flat Burger je stigao u grad</span>"
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.4, ease: "easeOut" }}
                  className="text-sm md:text-lg opacity-70 mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0"
                  style={{ color: DARK_BG }}
                >
                  Featured as Belgrade's newest street food sensation, Flat Burger represents the new generation 
                  that will write the gastro-street history of this city.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.5, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 md:gap-3 font-semibold transition-all md:group-hover:gap-5"
                  style={{ color: FLAT_BLUE }}
                >
                  <span className="text-sm md:text-base">Read Full Article</span>
                  <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform md:group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

// Logo Showcase Section - Fixed visibility
function LogoShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const variants = [
    { bg: OFF_WHITE, logoColor: FLAT_BLUE, textColor: FLAT_BLUE, label: "Light" },
    { bg: FLAT_BEIGE, logoColor: DARK_BG, textColor: DARK_BG, label: "Brand Beige" },
    { bg: FLAT_BLUE, logoColor: OFF_WHITE, textColor: OFF_WHITE, label: "Brand Blue" },
    { bg: DARK_BG, logoColor: FLAT_BEIGE, textColor: FLAT_BEIGE, label: "Dark" },
  ];
  
  return (
    <section ref={ref} className="py-20 md:py-48" style={{ background: "#e8e8e8" }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="mb-12 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Logo System
              </span>
            </div>
            
            <h2
              className="text-3xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Iconic in <span style={{ color: FLAT_BLUE }}>every context</span>
            </h2>
          </motion.div>
          
          {/* Logo grid - 2x2 on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {variants.map((variant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.05 * index : 0.1 + index * 0.1, ease: "easeOut" }}
                className="group"
              >
                <div 
                  className="aspect-square rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col items-center justify-center shadow-lg md:hover:scale-[1.02] md:hover:-translate-y-1 transition-transform duration-300"
                  style={{ background: variant.bg }}
                >
                  <div className="mb-3 md:mb-4 w-[80px] h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center">
                    <FlatBurgerLogo color={variant.logoColor} className="w-full h-full" />
                  </div>
                  
                  <div 
                    className="text-base md:text-xl font-black tracking-tight text-center"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: variant.textColor }}
                  >
                    FLAT BURGER
                  </div>
                </div>
                
                <p className="text-center mt-2 md:mt-3 text-xs md:text-sm font-medium" style={{ color: DARK_BG }}>
                  {variant.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Process Section
interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    phase: "01",
    title: "Discovery",
    description: "Deep dive into Belgrade's street food culture and market positioning.",
    deliverables: ["Market Research", "Competitor Analysis", "Brand Strategy"],
  },
  {
    phase: "02",
    title: "Identity",
    description: "Crafting a visual language that speaks urban and premium.",
    deliverables: ["Logo System", "Color Palette", "Typography", "Guidelines"],
  },
  {
    phase: "03",
    title: "Digital",
    description: "Building a digital presence that matches the brand's energy.",
    deliverables: ["Website Design", "Social Assets", "Digital Applications"],
  },
  {
    phase: "04",
    title: "Content",
    description: "Creating and editing visuals for maximum impact on Instagram.",
    deliverables: ["Video Editing", "Photo Content", "Reels & Stories"],
  },
  {
    phase: "05",
    title: "Launch",
    description: "Bringing the brand to life across all channels.",
    deliverables: ["Press Features", "Social Launch", "Location Branding"],
  },
];

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-20 md:py-48" style={{ background: DARK_BG }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="mb-12 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                The Process
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <h2
                className="text-3xl md:text-6xl font-bold"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                From concept to <span style={{ color: FLAT_BEIGE }}>street corner</span>
              </h2>
              
              <p className="text-gray-400 max-w-md text-base md:text-lg">
                A comprehensive branding journey covering every touchpoint.
              </p>
            </div>
          </motion.div>
          
          {/* Process cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isMobile ? 20 : 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.05 * index : 0.1 + index * 0.1, ease: "easeOut" }}
                className="group relative p-5 md:p-8 rounded-2xl border border-gray-800 md:hover:border-gray-600 md:hover:scale-[1.02] md:hover:-translate-y-2 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="relative z-10">
                  <div className="text-sm font-bold uppercase tracking-wider mb-2 md:mb-3" style={{ color: FLAT_BLUE }}>
                    Phase {step.phase}
                  </div>
                  
                  <h3 
                    className="text-xl md:text-3xl font-bold mb-2 md:mb-3"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 md:mb-5 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {step.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium"
                        style={{ 
                          background: `${FLAT_BLUE}15`,
                          color: FLAT_BEIGE,
                          border: `1px solid ${FLAT_BLUE}30`
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Color & Typography Section
function ColorTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-20 md:py-48" style={{ background: OFF_WHITE }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="mb-12 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Brand System
              </span>
            </div>
            
            <h2
              className="text-3xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Colors that <span style={{ color: FLAT_BLUE }}>demand attention</span>
            </h2>
          </motion.div>
          
          {/* Colors */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <div 
                className="aspect-[4/3] rounded-2xl md:rounded-3xl p-6 md:p-12 flex flex-col justify-between shadow-xl"
                style={{ background: FLAT_BEIGE }}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="text-5xl md:text-8xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BLUE }}
                  >
                    Aa
                  </div>
                  <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex items-center justify-center">
                    <FlatBurgerLogo color={FLAT_BLUE} className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <div 
                    className="text-xl md:text-3xl font-bold mb-1"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BLUE }}
                  >
                    Warm Beige
                  </div>
                  <div className="font-mono text-xs md:text-sm opacity-60" style={{ color: FLAT_BLUE }}>
                    #FEEBCB
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div 
                className="aspect-[4/3] rounded-2xl md:rounded-3xl p-6 md:p-12 flex flex-col justify-between shadow-xl"
                style={{ background: FLAT_BLUE }}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="text-5xl md:text-8xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Aa
                  </div>
                  <div className="w-[60px] h-[60px] md:w-[100px] md:h-[100px] flex items-center justify-center">
                    <FlatBurgerLogo color={OFF_WHITE} className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <div 
                    className="text-xl md:text-3xl font-bold mb-1"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Bold Blue
                  </div>
                  <div className="font-mono text-xs md:text-sm opacity-60" style={{ color: OFF_WHITE }}>
                    #1C33C3
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 15 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.3 : 0.6, delay: 0.3, ease: "easeOut" }}
            className="p-6 md:p-12 rounded-2xl md:rounded-3xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="text-xs md:text-sm uppercase tracking-wider mb-4 md:mb-6" style={{ color: FLAT_BLUE }}>
              Primary Typeface
            </div>
            
            <div 
              className="text-2xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Bricolage Grotesque
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {["Light", "Regular", "Medium", "Bold", "Black"].map((weight, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2 md:pb-3">
                  <span 
                    className="text-base md:text-2xl"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: (i + 3) * 100, color: DARK_BG }}
                  >
                    {isMobile ? "Quick brown fox" : "The quick brown fox jumps"}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-400">{weight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Instagram Section - Bold & Creative
function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // The exact posts provided by user
  const instagramPostUrls: string[] = [
    "https://www.instagram.com/p/DQxGa6FDFlT/",
    "https://www.instagram.com/p/DSQYJtFDB96/",
    "https://www.instagram.com/p/DRuQwnQDGNI/",
    "https://www.instagram.com/p/DIMKKCesMch/",
    "https://www.instagram.com/p/DGgNQ3PMwcf/",
    "https://www.instagram.com/p/DFsia-DsduT/",
  ];
  
  return (
    <section ref={ref} className="py-20 md:py-48 relative overflow-hidden" style={{ background: DARK_BG }}>
      {/* Background elements - static on mobile */}
      <div
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[100px] md:blur-[200px] opacity-15 md:opacity-20 -top-20 md:-top-40 -right-20 md:-right-40"
        style={{ background: FLAT_BLUE }}
      />
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-24">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: isMobile ? 0.4 : 0.8, ease: "easeOut" }}
                className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
              >
                <div className="w-10 md:w-16 h-[2px]" style={{ background: FLAT_BLUE }} />
                <span className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-semibold" style={{ color: FLAT_BLUE }}>
                  Content We Created
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: isMobile ? 30 : 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.5 : 1, delay: 0.2, ease: "easeOut" }}
                className="text-3xl md:text-6xl lg:text-7xl font-black leading-[0.95]"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                Live from
                <br />
                <span style={{ color: FLAT_BLUE }}>@flatburger.bg</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0.3, ease: "easeOut" }}
                className="text-base md:text-xl opacity-60 mt-4 md:mt-6 leading-relaxed"
                style={{ color: OFF_WHITE }}
              >
                Video content, reels, and visual stories we create for Flat Burger's Instagram presence.
              </motion.p>
            </div>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex gap-6 md:gap-8"
            >
              {[
                { value: "100+", label: "Posts" },
                { value: "Video", label: "Content" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div 
                    className="text-2xl md:text-4xl font-black"
                    style={{ color: FLAT_BEIGE }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider mt-1" style={{ color: FLAT_BLUE }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <InstagramFeed username="flatburger.bg" limit={6} postUrls={instagramPostUrls} />
        </div>
      </div>
    </section>
  );
}

// Results Section
function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const results = [
    { 
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      metric: "Journal.rs", 
      label: "Press Feature", 
      desc: "Featured as Belgrade's hottest street food" 
    },
    { 
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
        </svg>
      ),
      metric: "@flatburger.bg", 
      label: "Instagram", 
      desc: "Active with engaging video content" 
    },
    { 
      icon: (
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      metric: "Dečanska 4", 
      label: "Location", 
      desc: "Fully branded space in central Belgrade" 
    },
  ];
  
  return (
    <section ref={ref} className="py-20 md:py-48" style={{ background: DARK_BG }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="text-center mb-12 md:mb-24"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 md:w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-xs md:text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Results
              </span>
              <div className="w-8 md:w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
            </div>
            
            <h2
              className="text-3xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              Successfully <span style={{ color: FLAT_BEIGE }}>launched</span>
            </h2>
          </motion.div>
          
          {/* Results grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.05 * index : 0.1 + index * 0.1, ease: "easeOut" }}
                className="text-center p-6 md:p-10 rounded-2xl border border-gray-800 md:hover:border-gray-600 md:hover:scale-[1.02] transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full mb-4 md:mb-6" style={{ background: `${FLAT_BLUE}20`, color: FLAT_BLUE }}>
                  {result.icon}
                </div>
                <div 
                  className="text-xl md:text-3xl font-black mb-2"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BEIGE }}
                >
                  {result.metric}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-3" style={{ color: FLAT_BLUE }}>
                  {result.label}
                </div>
                <p className="text-gray-400 text-xs md:text-sm">{result.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <section ref={ref} className="py-20 md:py-48 overflow-hidden relative" style={{ background: FLAT_BLUE }}>
      {/* Background pattern - hidden on mobile */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${OFF_WHITE} 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      )}
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
          >
            <div className="w-[100px] h-[100px] md:w-[160px] md:h-[160px] mx-auto mb-6 md:mb-8 flex items-center justify-center">
              <FlatBurgerLogo color={OFF_WHITE} className="w-full h-full" />
            </div>
            
            <h2 
              className="text-3xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-[0.95]"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              Ready to build
              <br />
              your brand?
            </h2>
            
            <p className="text-base md:text-2xl mb-8 md:mb-10 opacity-70" style={{ color: FLAT_BEIGE }}>
              Let's create an identity that dominates the streets.
            </p>
            
            <Link
              to="/book"
              className="inline-flex items-center gap-2 md:gap-3 px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-bold uppercase tracking-wider rounded-full shadow-xl active:scale-95 md:hover:scale-[1.03] transition-transform duration-200"
              style={{ background: OFF_WHITE, color: FLAT_BLUE }}
            >
              <span>Start Your Project</span>
              <svg 
                className="w-4 h-4 md:w-5 md:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Main component
export default function FlatBurger() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: isMobile ? 200 : 100, 
    damping: isMobile ? 50 : 30 
  });
  
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: DARK_BG }}>
      {/* Scroll progress - simplified on mobile */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{ scaleX, background: `linear-gradient(90deg, ${FLAT_BLUE}, ${FLAT_BEIGE})` }}
      />
      
      <Navbar />
      
      <UrbanHero />
      <JournalFeature />
      <LogoShowcase />
      <ProcessSection />
      <ColorTypography />
      <InstagramSection />
      <ResultsSection />
      <CTASection />
    </div>
  );
}
