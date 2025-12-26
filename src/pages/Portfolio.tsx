import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
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
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "Modern e-commerce solution with advanced filtering and seamless checkout experience.",
    tags: ["React", "TypeScript", "E-commerce"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    featured: true,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Brand Identity Design",
    category: "Brand Building",
    description: "Complete brand transformation with modern visual identity and brand guidelines.",
    tags: ["Branding", "Design", "Identity"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    featured: true,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    category: "Web Development",
    description: "Analytics dashboard with real-time data visualization and interactive charts.",
    tags: ["React", "Dashboard", "Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    featured: false,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "Growth Strategy Campaign",
    category: "Growth Strategy",
    description: "Multi-channel marketing campaign that increased user acquisition by 300%.",
    tags: ["Marketing", "Strategy", "Growth"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    featured: false,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    title: "Mobile App Design",
    category: "Brand Building",
    description: "User-centered mobile app design with intuitive navigation and beautiful UI.",
    tags: ["UI/UX", "Mobile", "Design"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    featured: true,
    gradient: "from-rose-500 to-red-500",
  },
  {
    id: 6,
    title: "Corporate Website",
    category: "Web Development",
    description: "High-performance corporate website with CMS integration and SEO optimization.",
    tags: ["Next.js", "CMS", "SEO"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    featured: false,
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: 7,
    title: "Social Media Strategy",
    category: "Growth Strategy",
    description: "Comprehensive social media strategy that boosted engagement by 250%.",
    tags: ["Social Media", "Content", "Strategy"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    featured: false,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: 8,
    title: "Product Launch Campaign",
    category: "Brand Building",
    description: "Full-scale product launch with integrated marketing and PR strategy.",
    tags: ["Launch", "PR", "Marketing"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: true,
    gradient: "from-orange-500 to-amber-500",
  },
];

const categories = ["All", "Web Development", "Brand Building", "Growth Strategy"];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30" />
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
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-violet-200/30 to-fuchsia-200/20 blur-[100px]"
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32"
      >
        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
          }}
          className="container mx-auto px-5 md:px-6 relative z-20"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-6"
            >
              <BackToHome />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 mb-6 text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-full text-amber-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Our Work
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-bold tracking-tight leading-[1.05] mb-6 md:mb-8"
            >
              <span className="block">Portfolio</span>
              <span className="block gradient-text">Showcase</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Discover the projects that define our expertise and creativity
            </motion.p>
          </div>
        </motion.div>

        {/* Floating particles */}
        {!isMobile && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-amber-400/30"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}
      </section>

      {/* Category Filter */}
      <section className="py-8 md:py-12 sticky top-20 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={containerRef} className="py-12 md:py-20 relative">
        <div className="container mx-auto px-5 md:px-6">
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-16 md:mb-24"
            >
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}

                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-8 md:mb-12"
              >
                Featured Projects
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard
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
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}

                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold mb-8 md:mb-12"
              >
                All Projects
              </motion.h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                  {regularProjects.map((project, index) => (
                    <ProjectCard
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
              Ready to Start
              <span className="block gradient-text">Your Project?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 md:mb-12 max-w-2xl mx-auto">
              Let's bring your vision to life with our expertise and creativity
            </p>
            <MagneticButton>
              <motion.a
                href="/book"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 text-lg px-10 py-5 btn-glow text-white rounded-2xl font-semibold group"
              >
                <span>Get Started</span>
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
              </motion.a>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isMobile: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  featured: boolean;
}

function ProjectCard({
  project,
  index,
  isMobile,
  isHovered,
  onHover,
  onLeave,
  featured,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const rotateX = useTransform(
    useSpring(mousePosition.y, { stiffness: 300, damping: 30 }),
    [0, featured ? 600 : 400],
    featured ? [10, -10] : [8, -8]
  );
  const rotateY = useTransform(
    useSpring(mousePosition.x, { stiffness: 300, damping: 30 }),
    [0, featured ? 800 : 500],
    featured ? [-10, 10] : [-8, 8]
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={
        !isMobile && isHovered
          ? {
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }
          : {}
      }
      className={`group relative ${featured ? "md:col-span-1" : ""}`}
    >
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10`}
        />

        {/* Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
              {project.category}
            </span>
          </div>

          {/* Hover effect overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: isHovered
                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245, 158, 11, 0.3), transparent 70%)`
                : undefined,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 relative z-20">
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-amber-600 transition-colors duration-300"
            layout
          >
            {project.title}
          </motion.h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
                whileHover={{ scale: 1.05, backgroundColor: "#fef3c7" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-amber-600 transition-colors duration-300"
            whileHover={{ x: 5 }}
          >
            <span>View Project</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
          </motion.div>
        </div>

        {/* Shine effect */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transform: "skewX(-20deg)" }}
          />
        )}
      </div>
    </motion.div>
  );
}



