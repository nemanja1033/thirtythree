import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProcessItem {
  id: string;
  index: string;
  title: string;
  description: string;
  tag: string;
}

const processItems: ProcessItem[] = [
  {
    id: "strategy",
    index: "01",
    title: "Strategy",
    description:
      "We dive deep into your brand, market, and goals to build a solid foundation. Research-driven insights shape every decision we make.",
    tag: "Research",
  },
  {
    id: "concept",
    index: "02",
    title: "Concept",
    description:
      "Ideas take form through creative exploration. We craft compelling narratives and visual directions that resonate with your audience.",
    tag: "Direction",
  },
  {
    id: "creation",
    index: "03",
    title: "Creation",
    description:
      "Design meets development. Every pixel, interaction, and line of code is crafted with precision and purpose.",
    tag: "Design & Dev",
  },
  {
    id: "production",
    index: "04",
    title: "Production",
    description:
      "Launch with confidence. We ensure flawless execution, optimization, and ongoing support for lasting impact.",
    tag: "Delivery",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-2xl mb-16 md:mb-20"
        >
          <motion.span
            variants={headerVariants}
            className="inline-block mb-4 text-xs md:text-sm px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium uppercase tracking-wider"
          >
            Our Process
          </motion.span>

          <motion.h2
            variants={headerVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
          >
            From strategy
            <span className="block bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              to creation
            </span>
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="text-base md:text-lg text-slate-600 leading-relaxed"
          >
            We follow a proven methodology that transforms ideas into impactful
            digital experiences. Each phase builds upon the last, ensuring
            nothing is left to chance.
          </motion.p>
        </motion.div>

        {/* Process Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {processItems.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group relative"
            >
              <div className="h-full p-6 md:p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-amber-200/60 transition-all duration-300 ease-out">
                {/* Step Index */}
                <span className="inline-block text-5xl md:text-6xl font-bold text-slate-100 group-hover:text-amber-100 transition-colors duration-300 leading-none mb-4">
                  {item.index}
                </span>

                {/* Tag */}
                <span className="inline-block mb-4 text-[10px] md:text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600 font-medium uppercase tracking-wide transition-colors duration-300">
                  {item.tag}
                </span>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-500" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


