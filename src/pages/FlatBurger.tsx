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

// Flat Burger Logo - Clean SVG with dynamic color
function FlatBurgerLogo({ 
  size = 120, 
  className = "",
  color = FLAT_BLUE,
}: { 
  size?: number; 
  className?: string;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ display: 'block' }}
      fill={color}
    >
      {/* Top Bun */}
      <rect x="10" y="10" width="80" height="18" rx="9" />
      {/* Wavy Patty */}
      <path d="M10 42 Q25 35 40 42 T70 42 T90 42 L90 52 Q75 59 60 52 T30 52 T10 52 Z" />
      {/* Cheese/Middle */}
      <rect x="10" y="58" width="80" height="10" rx="5" />
      {/* Bottom Bun */}
      <rect x="10" y="74" width="80" height="18" rx="9" />
    </svg>
  );
}

// Urban Hero Section
function UrbanHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  
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
      {/* Subtle grid background */}
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
      
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
        style={{ background: FLAT_BLUE, top: "-15%", right: "-5%" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full">
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
                    initial={{ y: 100, opacity: 0 }}
                    animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="text-[16vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw] font-black leading-[0.85] tracking-[-0.03em]"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    FLAT
                  </motion.h1>
                </div>
                
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="text-[16vw] md:text-[12vw] lg:text-[9vw] xl:text-[8vw] font-black leading-[0.85] tracking-[-0.03em]"
                    style={{
                      fontFamily: '"Bricolage Grotesque", sans-serif',
                      WebkitTextStroke: `2px ${FLAT_BLUE}`,
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    BURGER
                  </motion.h1>
                </div>
              </div>
              
              {/* Logo - Always visible, bigger on desktop */}
              <motion.div
                className="flex items-center justify-center relative flex-shrink-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
              >
                {/* Glow effect behind logo */}
                <div 
                  className="absolute inset-0 blur-3xl opacity-30 scale-150"
                  style={{ background: FLAT_BLUE }}
                />
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-[120px] h-[120px] lg:w-[280px] lg:h-[280px]"
                  style={{ 
                    filter: `drop-shadow(0 0 20px ${FLAT_BLUE}60)` 
                  }}
                >
                  {/* Clean burger icon SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full" fill={OFF_WHITE}>
                    {/* Top Bun */}
                    <rect x="10" y="10" width="80" height="18" rx="9" />
                    {/* Wavy Patty */}
                    <path d="M10 42 Q25 35 40 42 T70 42 T90 42 L90 52 Q75 59 60 52 T30 52 T10 52 Z" />
                    {/* Cheese/Middle */}
                    <rect x="10" y="58" width="80" height="10" rx="5" />
                    {/* Bottom Bun */}
                    <rect x="10" y="74" width="80" height="18" rx="9" />
                  </svg>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden" style={{ background: FLAT_BEIGE }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${FLAT_BLUE} 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.a
            href="https://www.journal.rs/lifestyle/gastro/flat-burger-street-food-beograd/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block group"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Featured In Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="shrink-0"
              >
                <div 
                  className="w-40 h-40 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-105"
                  style={{ background: FLAT_BLUE }}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-80" style={{ color: FLAT_BEIGE }}>
                    Featured In
                  </span>
                  <span 
                    className="text-3xl md:text-4xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Journal.rs
                  </span>
                  <span className="text-xs mt-2 opacity-60" style={{ color: OFF_WHITE }}>
                    Aug 2024
                  </span>
                </div>
              </motion.div>
              
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  <span 
                    className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6 font-medium"
                    style={{ background: `${FLAT_BLUE}15`, color: FLAT_BLUE }}
                  >
                    Press Feature
                  </span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-6"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
                >
                  "Street-food mapa Beograda dobila je novog igrača [i to kakvog] – 
                  <span style={{ color: FLAT_BLUE }}> Flat Burger je stigao u grad</span>"
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  className="text-base md:text-lg opacity-70 mb-8 max-w-2xl mx-auto lg:mx-0"
                  style={{ color: DARK_BG }}
                >
                  Featured as Belgrade's newest street food sensation, Flat Burger represents the new generation 
                  that will write the gastro-street history of this city.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                  className="inline-flex items-center gap-3 font-semibold transition-all group-hover:gap-5"
                  style={{ color: FLAT_BLUE }}
                >
                  <span>Read Full Article</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const variants = [
    { bg: OFF_WHITE, logoColor: FLAT_BLUE, textColor: FLAT_BLUE, label: "Light" },
    { bg: FLAT_BEIGE, logoColor: DARK_BG, textColor: DARK_BG, label: "Brand Beige" },
    { bg: FLAT_BLUE, logoColor: OFF_WHITE, textColor: OFF_WHITE, label: "Brand Blue" },
    { bg: DARK_BG, logoColor: FLAT_BEIGE, textColor: FLAT_BEIGE, label: "Dark" },
  ];
  
  return (
    <section ref={ref} className="py-32 md:py-48" style={{ background: "#e8e8e8" }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Logo System
              </span>
            </div>
            
            <h2
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Iconic in <span style={{ color: FLAT_BLUE }}>every context</span>
            </h2>
          </motion.div>
          
          {/* Logo grid - 2x2 on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {variants.map((variant, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                className="group"
              >
                <motion.div 
                  className="aspect-square rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col items-center justify-center transition-all duration-500 ease-out shadow-lg"
                  style={{ background: variant.bg }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className="mb-4"
                  >
                    <FlatBurgerLogo size={80} color={variant.logoColor} />
                  </motion.div>
                  
                  <div 
                    className="text-lg md:text-xl font-black tracking-tight text-center"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: variant.textColor }}
                  >
                    FLAT BURGER
                  </div>
                </motion.div>
                
                <p className="text-center mt-3 text-sm font-medium" style={{ color: DARK_BG }}>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 md:py-48" style={{ background: DARK_BG }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                The Process
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2
                className="text-4xl md:text-6xl font-bold"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                From concept to <span style={{ color: FLAT_BEIGE }}>street corner</span>
              </h2>
              
              <p className="text-gray-400 max-w-md text-lg">
                A comprehensive branding journey covering every touchpoint.
              </p>
            </div>
          </motion.div>
          
          {/* Process cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                className="group relative p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors duration-300"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="relative z-10">
                  <div className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: FLAT_BLUE }}>
                    Phase {step.phase}
                  </div>
                  
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-3"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-5 leading-relaxed text-sm md:text-base">
                    {step.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full text-xs font-medium"
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 md:py-48" style={{ background: OFF_WHITE }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-16 md:mb-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Brand System
              </span>
            </div>
            
            <h2
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Colors that <span style={{ color: FLAT_BLUE }}>demand attention</span>
            </h2>
          </motion.div>
          
          {/* Colors */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="transition-transform duration-300"
            >
              <div 
                className="aspect-[4/3] rounded-2xl md:rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-xl"
                style={{ background: FLAT_BEIGE }}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="text-6xl md:text-8xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BLUE }}
                  >
                    Aa
                  </div>
                  <FlatBurgerLogo size={60} color={FLAT_BLUE} />
                </div>
                <div>
                  <div 
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BLUE }}
                  >
                    Warm Beige
                  </div>
                  <div className="font-mono text-sm opacity-60" style={{ color: FLAT_BLUE }}>
                    #FEEBCB
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
              className="transition-transform duration-300"
            >
              <div 
                className="aspect-[4/3] rounded-2xl md:rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-xl"
                style={{ background: FLAT_BLUE }}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="text-6xl md:text-8xl font-black"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Aa
                  </div>
                  <FlatBurgerLogo size={60} color={OFF_WHITE} />
                </div>
                <div>
                  <div 
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
                  >
                    Bold Blue
                  </div>
                  <div className="font-mono text-sm opacity-60" style={{ color: OFF_WHITE }}>
                    #1C33C3
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="p-8 md:p-12 rounded-2xl md:rounded-3xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="text-sm uppercase tracking-wider mb-6" style={{ color: FLAT_BLUE }}>
              Primary Typeface
            </div>
            
            <div 
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-8"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
            >
              Bricolage Grotesque
            </div>
            
            <div className="space-y-4">
              {["Light", "Regular", "Medium", "Bold", "Black"].map((weight, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span 
                    className="text-xl md:text-2xl"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif', fontWeight: (i + 3) * 100, color: DARK_BG }}
                  >
                    The quick brown fox jumps
                  </span>
                  <span className="text-xs text-gray-400 hidden md:block">{weight}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Instagram Section
function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const instagramPostUrls: string[] = [
    "https://www.instagram.com/p/DSQYJtFDB96/",
    "https://www.instagram.com/p/DQxGa6FDFlT/",
    "https://www.instagram.com/p/DQPj4FLDIjj/",
    "https://www.instagram.com/p/DJebnw-Ma9F/",
    "https://www.instagram.com/p/DGgNQ3PMwcf/",
    "https://www.instagram.com/p/DFsia-DsduT/",
  ];
  
  return (
    <section ref={ref} className="py-32 md:py-48" style={{ background: OFF_WHITE }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
                <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                  Content We Created
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-bold"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: DARK_BG }}
              >
                Live from <span style={{ color: FLAT_BLUE }}>@flatburger.bg</span>
              </motion.h2>
            </div>
            
            <motion.a
              href="https://instagram.com/flatburger.bg"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-colors"
              style={{ background: FLAT_BLUE, color: OFF_WHITE }}
            >
              <span>Follow on Instagram</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"/>
                <circle cx="18.406" cy="5.594" r="1.44"/>
              </svg>
            </motion.a>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const results = [
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      metric: "Journal.rs", 
      label: "Press Feature", 
      desc: "Featured as Belgrade's hottest street food" 
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
        </svg>
      ),
      metric: "@flatburger.bg", 
      label: "Instagram", 
      desc: "Active with engaging video content" 
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <section ref={ref} className="py-32 md:py-48" style={{ background: DARK_BG }}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
              <span className="text-sm uppercase tracking-wider" style={{ color: FLAT_BLUE }}>
                Results
              </span>
              <div className="w-10 h-[1px]" style={{ background: FLAT_BLUE }} />
            </div>
            
            <h2
              className="text-4xl md:text-6xl font-bold"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              Successfully <span style={{ color: FLAT_BEIGE }}>launched</span>
            </h2>
          </motion.div>
          
          {/* Results grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: "easeOut" }}
                className="text-center p-8 md:p-10 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: `${FLAT_BLUE}20`, color: FLAT_BLUE }}>
                  {result.icon}
                </div>
                <div 
                  className="text-2xl md:text-3xl font-black mb-2"
                  style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: FLAT_BEIGE }}
                >
                  {result.metric}
                </div>
                <div className="text-xs uppercase tracking-wider mb-3" style={{ color: FLAT_BLUE }}>
                  {result.label}
                </div>
                <p className="text-gray-400 text-sm">{result.desc}</p>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="py-32 md:py-48 overflow-hidden relative" style={{ background: FLAT_BLUE }}>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${OFF_WHITE} 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }}
      />
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <FlatBurgerLogo size={100} color={OFF_WHITE} className="mx-auto mb-8" />
            
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[0.95]"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              Ready to build
              <br />
              your brand?
            </h2>
            
            <p className="text-xl md:text-2xl mb-10 opacity-70" style={{ color: FLAT_BEIGE }}>
              Let's create an identity that dominates the streets.
            </p>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/book"
                className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold uppercase tracking-wider rounded-full transition-colors shadow-xl"
                style={{ background: OFF_WHITE, color: FLAT_BLUE }}
              >
                <span>Start Your Project</span>
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Main component
export default function FlatBurger() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: DARK_BG }}>
      {/* Scroll progress */}
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
