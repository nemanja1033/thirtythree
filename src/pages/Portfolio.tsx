import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue, useVelocity } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import BackToHome from "../components/BackToHome";
import MagneticButton from "../components/MagneticButton";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
  featured: boolean;
  gradient: string;
  color: string;
  year: string;
  client: string;
}

const projects: Project[] = [
  {
    id: 0,
    title: "Flat Burger",
    category: "Brand Building",
    description: "Complete brand transformation for Belgrade's newest street food sensation. From concept to launch, we built an identity that captures the essence of Belgrade's nightlife culture.",
    tags: ["Branding", "Identity", "Content Creation", "Video Editing"],
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=90",
    featured: true,
    gradient: "from-blue-600 to-blue-800",
    color: "#1c33c3",
    year: "2024",
    client: "Flat Burger",
    link: "/portfolio/flatburger",
  },
];

const categories = ["All", "Brand Building"];

// Optimized floating particles - reduced count and simplified animations
function FloatingParticles({ count = 10 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 5,
    }))
  );

  return (
    <>
      {particles.current.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `hsl(35, 70%, 65%)`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </>
  );
}

// Optimized morphing blob - single blob with simpler animation
function MorphingBlob({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute rounded-full blur-[120px] opacity-20 will-change-transform"
      style={{
        width: "500px",
        height: "500px",
        background: "linear-gradient(135deg, #f59e0b, #ea580c)",
      }}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        x: [0, 80, 0],
        y: [0, -40, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// 3D Card with tilt effect
function ProjectCard3D({
  project,
  index,
  isMobile,
  isHovered,
  onHover,
  onLeave,
  featured,
}: {
  project: Project;
  index: number;
  isMobile: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  featured: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Throttled mouse move handler for better performance
  const mouseMoveTimeout = useRef<NodeJS.Timeout>();
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    
    // Throttle mouse moves
    if (mouseMoveTimeout.current) return;
    
    mouseMoveTimeout.current = setTimeout(() => {
      mouseMoveTimeout.current = undefined;
    }, 16); // ~60fps
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    mouseX.set(x);
    mouseY.set(y);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (mouseMoveTimeout.current) {
        clearTimeout(mouseMoveTimeout.current);
      }
    };
  }, []);

  // Simplified transforms with less aggressive values
  const rotateX = useTransform(mouseY, [0, featured ? 600 : 400], featured ? [-8, 8] : [-6, 6]);
  const rotateY = useTransform(mouseX, [0, featured ? 800 : 500], featured ? [8, -8] : [6, -6]);

  const cardX = useSpring(rotateY, { stiffness: 200, damping: 25 });
  const cardY = useSpring(rotateX, { stiffness: 200, damping: 25 });

  // Simplified image transforms
  const imageScale = useTransform(mouseX, [0, featured ? 800 : 500], [1, 1.05]);
  const imageX = useTransform(mouseX, [0, featured ? 800 : 500], [0, 10]);
  const imageY = useTransform(mouseY, [0, featured ? 600 : 400], [0, 10]);

  const cardContent = (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9, rotateZ: -5 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovering(true);
        onHover();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        onLeave();
      }}
      style={
        !isMobile && isHovering
          ? {
              rotateX: cardY,
              rotateY: cardX,
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }
          : {}
      }
      className={`group relative ${featured ? "md:col-span-1" : ""} ${project.link ? "cursor-pointer" : ""}`}
    >
      <div
        className="relative h-full overflow-hidden rounded-3xl md:rounded-[2.5rem] bg-white border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 will-change-transform"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-3xl md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Glowing orb effect */}
        <motion.div
          className="absolute -z-10 rounded-full blur-[80px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{
            width: "300px",
            height: "300px",
            background: `radial-gradient(circle, ${project.color}40, transparent 70%)`,
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
          }}
        />

        {/* Image container with parallax */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <motion.div
            style={
              !isMobile && isHovering
                ? {
                    scale: imageScale,
                    x: imageX,
                    y: imageY,
                  }
                : {}
            }
            className="w-full h-full will-change-transform"
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover will-change-transform"
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>

          {/* Simplified gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-opacity duration-300" />

          {/* Floating category badge */}
          <motion.div
            className="absolute top-6 left-6 z-20"
            animate={isHovering ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-full text-xs font-semibold text-gray-800 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              {project.category}
            </motion.span>
          </motion.div>

          {/* Year badge */}
          <motion.div
            className="absolute top-6 right-6 z-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{project.year}</span>
            </div>
          </motion.div>

          {/* Optimized particles on hover - reduced count */}
          {isHovering && !isMobile && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full will-change-transform"
                  style={{
                    background: project.color,
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 20}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.2, 0],
                    y: [0, -40],
                    x: [0, (i % 2 === 0 ? 1 : -1) * 30],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content with 3D transform */}
        <div className="p-6 md:p-8 relative z-20 bg-white">
          {/* Client name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2"
          >
            {project.client}
          </motion.div>

          <motion.h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500"
            style={{
              backgroundImage: isHovering ? `linear-gradient(135deg, ${project.color}, ${project.color}CC)` : undefined,
            }}
            layout
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {project.description}
          </motion.p>

          {/* Animated tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.6 + tagIndex * 0.05, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* CTA with magnetic effect */}
          <motion.div
            className="flex items-center gap-2 text-sm font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.7 }}
          >
            <motion.span
              className="text-gray-700 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500"
              style={{
                backgroundImage: isHovering ? `linear-gradient(135deg, ${project.color}, ${project.color}CC)` : undefined,
              }}
            >
              View Project
            </motion.span>
            <motion.svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isHovering ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Shimmer effect */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
            initial={{ x: "-100%", skewX: -20 }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}

        {/* Simplified border glow */}
        <div
          className="absolute inset-0 rounded-3xl md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
          style={{
            boxShadow: `0 0 30px ${project.color}30`,
          }}
        />
      </div>
    </motion.div>
  );

  if (project.link) {
    return (
      <Link to={project.link} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

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
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  // Optimized cursor follower for desktop
  const cursorX = useSpring(mousePosition.x, { stiffness: 100, damping: 30 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden relative">
      {/* Optimized Background - reduced animations */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30" />
        <MorphingBlob delay={0} />
        <FloatingParticles count={10} />
      </div>

      {/* Custom cursor follower */}
      {!isMobile && (
        <motion.div
          className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
          }}
        />
      )}

      <Navbar />

      {/* Hero Section with advanced animations */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32"
      >
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
          className="container mx-auto px-5 md:px-6 relative z-20"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-6"
            >
              <BackToHome />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 mb-8 text-xs md:text-sm px-5 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-full text-amber-800 font-semibold shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-amber-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Our Work
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold tracking-tight leading-[0.95] mb-8 md:mb-10"
            >
              <motion.span
                className="block mb-2"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              >
                Portfolio
              </motion.span>
              <motion.span
                className="block gradient-text"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                Showcase
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Discover the projects that define our expertise and creativity. Each project tells a unique story of innovation and excellence.
            </motion.p>

            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-12"
            >
              {[
                { value: "50+", label: "Projects" },
                { value: "98%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm md:text-base text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Optimized floating elements - reduced count */}
        {!isMobile && (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full will-change-transform"
                style={{
                  width: 80 + i * 20,
                  height: 80 + i * 20,
                  left: `${20 + i * 20}%`,
                  top: `${25 + (i % 2) * 30}%`,
                  background: `linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(234, 88, 12, 0.15))`,
                  filter: "blur(40px)",
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 10 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </>
        )}
      </section>

      {/* Category Filter with advanced animations */}
      <section className="py-10 md:py-14 sticky top-20 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 overflow-hidden ${
                  selectedCategory === category
                    ? "text-white shadow-lg shadow-amber-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {selectedCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500"
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid with 3D cards */}
      <section ref={containerRef} className="py-16 md:py-24 relative">
        <div className="container mx-auto px-5 md:px-6">
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-20 md:mb-32"
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-12 md:mb-16"
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-amber-400 to-transparent flex-1"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  Featured
                </motion.h2>
                <motion.div
                  className="h-px bg-gradient-to-l from-amber-400 to-transparent flex-1"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                <AnimatePresence mode="popLayout">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard3D
                      key={project.id}
                      project={project}
                      index={index}
                      isMobile={isMobile}
                      isHovered={hoveredProject === project.id}
                      onHover={() => setHoveredProject(project.id)}
                      onLeave={() => setHoveredProject(null)}
                      featured
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Regular Projects */}
          {regularProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4 mb-12 md:mb-16"
              >
                <motion.div
                  className="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  All Projects
                </motion.h2>
                <motion.div
                  className="h-px bg-gradient-to-l from-gray-300 to-transparent flex-1"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                <AnimatePresence mode="popLayout">
                  {regularProjects.map((project, index) => (
                    <ProjectCard3D
                      key={project.id}
                      project={project}
                      index={index}
                      isMobile={isMobile}
                      isHovered={hoveredProject === project.id}
                      onHover={() => setHoveredProject(project.id)}
                      onLeave={() => setHoveredProject(null)}
                      featured={false}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section with advanced effects */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50" />
        <div className="absolute inset-0">
          <MorphingBlob delay={0} />
          <MorphingBlob delay={15} />
        </div>
        <div className="container mx-auto px-5 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 md:mb-10"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Ready to Start
              <motion.span
                className="block gradient-text mt-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                Your Project?
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Let's bring your vision to life with our expertise and creativity
            </motion.p>
            <MagneticButton>
              <motion.a
                href="/book"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 text-lg px-12 py-6 btn-glow text-white rounded-2xl font-semibold group shadow-2xl"
              >
                <span>Get Started</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.a>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


