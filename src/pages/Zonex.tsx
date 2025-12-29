import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const ZONEX_DARK = "#0b1220";
const ZONEX_ACCENT = "#cbd5f5";
const ZONEX_MUTED = "#94a3b8";
const OFF_WHITE = "#f8fafc";

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

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const existing = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (existing) {
      existing.setAttribute("content", description);
      return;
    }
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = description;
    document.head.appendChild(meta);
  }, [title, description]);
}

export default function Zonex() {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();

  usePageMeta(
    "Zonex — Case Study",
    "Zonex Inženjering case study: web experience, visual system, and motion direction for high-standard engineering projects."
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const overviewInView = useInView(overviewRef, { once: true, margin: "-50px" });
  const workInView = useInView(workRef, { once: true, margin: "-50px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });
  const showcaseInView = useInView(showcaseRef, { once: true, margin: "-50px" });
  const processInView = useInView(processRef, { once: true, margin: "-50px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-50px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  const fadeUp = useMemo(
    () => ({
      initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: shouldReduceMotion ? 0.1 : 0.6, ease: "easeOut" },
    }),
    [shouldReduceMotion]
  );

  const data = {
    services: [
      {
        title: t("zonex.services.rebrand"),
        badge: t("zonex.services.rebrandBadge"),
        desc: t("zonex.services.rebrandDesc"),
      },
      { title: t("zonex.services.web"), desc: t("zonex.services.webDesc") },
      { title: t("zonex.services.visual"), desc: t("zonex.services.visualDesc") },
      { title: t("zonex.services.motion"), desc: t("zonex.services.motionDesc") },
    ],
    stats: [
      { label: t("zonex.stats.founded"), value: "1993" },
      { label: t("zonex.stats.location"), value: t("zonex.stats.locationValue") },
      { label: t("zonex.stats.focus"), value: t("zonex.stats.focusValue") },
      { label: t("zonex.stats.model"), value: t("zonex.stats.modelValue") },
    ],
    process: [
      { step: "01", title: t("zonex.process.1"), desc: t("zonex.process.1.desc") },
      { step: "02", title: t("zonex.process.2"), desc: t("zonex.process.2.desc") },
      { step: "03", title: t("zonex.process.3"), desc: t("zonex.process.3.desc") },
      { step: "04", title: t("zonex.process.4"), desc: t("zonex.process.4.desc") },
    ],
    projects: [
      {
        title: "McDonald’s Zrenjanin",
        type: t("zonex.project.retail"),
        year: "2022",
        scope: "Ključ u ruke",
      },
      {
        title: "McDonald’s Ruklada",
        type: t("zonex.project.retail"),
        year: "2021",
        scope: "Završni radovi",
      },
      {
        title: "Zlatiborski konaci",
        type: t("zonex.project.hospitality"),
        year: "2020",
        scope: "Građevinski i završni radovi",
      },
      {
        title: "Knez Petrol – Šimanovci",
        type: t("zonex.project.retail"),
        status: t("zonex.project.ongoing"),
        scope: "U toku",
      },
    ],
  };

  const { scrollYProgress: showcaseProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"],
  });
  const showcaseY = useTransform(
    showcaseProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -360]
  );
  const showcaseSpring = useSpring(showcaseY, { stiffness: 120, damping: 26 });
  const signalY = useTransform(
    showcaseProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 220]
  );

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: ZONEX_DARK }}>
      <Navbar />

      <section ref={heroRef} className="relative min-h-[92svh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(${ZONEX_ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ZONEX_ACCENT} 1px, transparent 1px)`,
            backgroundSize: "120px 120px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={fadeUp.initial}
              animate={heroInView ? fadeUp.animate : {}}
              transition={fadeUp.transition}
              className="flex items-center gap-3 mb-8"
            >
              <span className="text-xs uppercase tracking-[0.35em]" style={{ color: ZONEX_ACCENT }}>
                {t("zonex.caseStudy")}
              </span>
              <span className="h-px w-16" style={{ background: ZONEX_ACCENT, opacity: 0.5 }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
            >
              {t("zonex.heroTitle")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, delay: 0.1 }}
              className="mt-6 text-base md:text-xl max-w-2xl"
              style={{ color: ZONEX_MUTED }}
            >
              {t("zonex.heroDesc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-4 text-sm"
              style={{ color: ZONEX_ACCENT }}
            >
              <span className="px-4 py-2 rounded-full border" style={{ borderColor: `${ZONEX_ACCENT}40` }}>
                {t("zonex.heroFounded")}
              </span>
              <span className="px-4 py-2 rounded-full border" style={{ borderColor: `${ZONEX_ACCENT}40` }}>
                {t("zonex.heroLocation")}
              </span>
              <Link
                to="/portfolio"
                className="px-4 py-2 rounded-full border transition-colors duration-300"
                style={{ borderColor: `${ZONEX_ACCENT}40` }}
              >
                {t("zonex.backToPortfolio")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={overviewRef} className="py-20 md:py-36" style={{ background: ZONEX_DARK }}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-[1.1fr,0.9fr] gap-10 md:gap-16">
            <motion.div
              initial={fadeUp.initial}
              animate={overviewInView ? fadeUp.animate : {}}
              transition={fadeUp.transition}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[1px]" style={{ background: ZONEX_ACCENT, opacity: 0.5 }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: ZONEX_ACCENT }}>
                  {t("zonex.overview")}
                </span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold mb-6"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                {t("zonex.positioningTitle")}
              </h2>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: ZONEX_MUTED }}>
                {t("zonex.positioningDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              animate={overviewInView ? fadeUp.animate : {}}
              transition={{ ...fadeUp.transition, delay: shouldReduceMotion ? 0 : 0.1 }}
              className="space-y-6 text-sm md:text-base"
              style={{ color: ZONEX_MUTED }}
            >
              <div className="p-6 rounded-2xl border" style={{ borderColor: `${ZONEX_ACCENT}20` }}>
                <div className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: ZONEX_ACCENT }}>
                  {t("zonex.corePromise")}
                </div>
                <p>{t("zonex.corePromiseDesc")}</p>
              </div>
              <div className="p-6 rounded-2xl border" style={{ borderColor: `${ZONEX_ACCENT}20` }}>
                <div className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: ZONEX_ACCENT }}>
                  {t("zonex.workModel")}
                </div>
                <p>{t("zonex.workModelDesc")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={workRef} className="py-20 md:py-36" style={{ background: "#0f1626" }}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={fadeUp.initial}
              animate={workInView ? fadeUp.animate : {}}
              transition={fadeUp.transition}
              className="mb-10 md:mb-14"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-[1px]" style={{ background: ZONEX_ACCENT, opacity: 0.5 }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: ZONEX_ACCENT }}>
                  {t("zonex.whatWeDid")}
                </span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                {t("zonex.whatWeDidTitle")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {data.services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={workInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                  className="p-6 md:p-8 rounded-2xl border"
                  style={{ borderColor: `${ZONEX_ACCENT}20`, background: "rgba(15, 22, 38, 0.6)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg md:text-xl font-semibold" style={{ color: OFF_WHITE }}>
                      {service.title}
                    </h3>
                    {service.badge && (
                      <span
                        className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border"
                        style={{ borderColor: `${ZONEX_ACCENT}40`, color: ZONEX_ACCENT }}
                      >
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm md:text-base" style={{ color: ZONEX_MUTED }}>
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 md:py-36" style={{ background: ZONEX_DARK }}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={fadeUp.initial}
              animate={statsInView ? fadeUp.animate : {}}
              transition={fadeUp.transition}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-[1px]" style={{ background: ZONEX_ACCENT, opacity: 0.5 }} />
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: ZONEX_ACCENT }}>
                {t("zonex.highlights")}
              </span>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {data.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                  className="p-5 md:p-7 rounded-2xl border text-left"
                  style={{ borderColor: `${ZONEX_ACCENT}20` }}
                >
                  <div className="text-xl md:text-3xl font-bold" style={{ color: OFF_WHITE }}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] md:text-xs uppercase tracking-[0.25em] mt-2" style={{ color: ZONEX_ACCENT }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={showcaseRef} className="py-20 md:py-36" style={{ background: "#0f1626" }}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={fadeUp.initial}
              animate={showcaseInView ? fadeUp.animate : {}}
              transition={fadeUp.transition}
              className="flex items-center justify-between gap-4 mb-10"
            >
              <span
                className="text-xs uppercase tracking-[0.4em]"
                style={{ color: ZONEX_ACCENT }}
              >
                {t("zonex.showcase.short")}
              </span>
              <div className="h-px flex-1" style={{ background: `${ZONEX_ACCENT}30` }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              animate={showcaseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.6, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.05 }}
              className="relative"
            >
              <div
                className="rounded-[32px] border overflow-hidden shadow-2xl"
                style={{ borderColor: `${ZONEX_ACCENT}25`, background: "#0b1220" }}
              >
                <div
                  className="flex items-center justify-between gap-4 px-6 py-4 border-b text-xs uppercase tracking-[0.3em]"
                  style={{ borderColor: `${ZONEX_ACCENT}20`, color: ZONEX_ACCENT }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: ZONEX_ACCENT, opacity: 0.5 }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: ZONEX_ACCENT, opacity: 0.35 }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: ZONEX_ACCENT, opacity: 0.2 }} />
                  </div>
                  <span>{t("zonex.showcase.url")}</span>
                  <span className="opacity-60">{t("zonex.showcase.label")}</span>
                </div>

                <div className="relative h-[520px] md:h-[640px] lg:h-[720px] overflow-hidden">
                  <motion.div
                    style={shouldReduceMotion ? {} : { y: showcaseSpring }}
                    className="absolute inset-0 px-8 md:px-16 py-12 md:py-16 space-y-14"
                  >
                    <div className="space-y-6">
                      <div className="h-2 w-24 rounded-full" style={{ background: `${ZONEX_ACCENT}60` }} />
                      <div className="text-4xl md:text-6xl font-bold" style={{ color: OFF_WHITE }}>
                        ZONEX INŽENJERING
                      </div>
                      <div className="text-base md:text-lg" style={{ color: ZONEX_MUTED }}>
                        {t("zonex.showcase.heroLine")}
                      </div>
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-2 rounded-full border" style={{ borderColor: `${ZONEX_ACCENT}30`, color: ZONEX_ACCENT }}>
                        {t("zonex.showcase.heroPill")}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                      {["1993", "Retail", "Hospitality"].map((item) => (
                        <div key={item} className="rounded-2xl p-5 border" style={{ borderColor: `${ZONEX_ACCENT}20` }}>
                          <div className="text-xl font-semibold" style={{ color: OFF_WHITE }}>
                            {item}
                          </div>
                          <div className="mt-2 h-1 w-12" style={{ background: `${ZONEX_ACCENT}40` }} />
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      {[t("zonex.showcase.visual"), t("zonex.showcase.web"), t("zonex.showcase.motion"), t("zonex.showcase.structure")].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl p-5 border flex items-center justify-between"
                          style={{ borderColor: `${ZONEX_ACCENT}20` }}
                        >
                          <span className="text-sm md:text-base" style={{ color: OFF_WHITE }}>
                            {item}
                          </span>
                          <span className="text-xs uppercase tracking-widest" style={{ color: ZONEX_ACCENT }}>
                            Active
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl p-6 border" style={{ borderColor: `${ZONEX_ACCENT}20` }}>
                      <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: ZONEX_ACCENT }}>
                        {t("zonex.showcase.projects")}
                      </div>
                      <div className="space-y-3 text-sm" style={{ color: OFF_WHITE }}>
                        <div className="flex items-center justify-between">
                          <span>McDonald’s Zrenjanin</span>
                          <span style={{ color: ZONEX_MUTED }}>2022</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Zlatiborski konaci</span>
                          <span style={{ color: ZONEX_MUTED }}>2020</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl p-6 border" style={{ borderColor: `${ZONEX_ACCENT}20` }}>
                      <div className="text-sm" style={{ color: OFF_WHITE }}>
                        {t("zonex.showcase.cta")}
                      </div>
                      <div className="text-xs uppercase tracking-[0.3em]" style={{ color: ZONEX_ACCENT }}>
                        {t("zonex.showcase.ctaButton")}
                      </div>
                    </div>
                  </motion.div>

                  <div className="absolute top-8 right-8 h-[320px] w-[2px] rounded-full" style={{ background: `${ZONEX_ACCENT}25` }} />
                  <motion.div
                    className="absolute top-8 right-8 h-12 w-[2px] rounded-full"
                    style={{ background: ZONEX_ACCENT, y: shouldReduceMotion ? 0 : signalY }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={processRef} className="py-20 md:py-36" style={{ background: "#0f1626" }}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={fadeUp.initial}
              animate={processInView ? fadeUp.animate : {}}
              transition={fadeUp.transition}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-[1px]" style={{ background: ZONEX_ACCENT, opacity: 0.5 }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: ZONEX_ACCENT }}>
                  {t("zonex.process")}
                </span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                {t("zonex.processTitle")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {data.process.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                  className="p-6 md:p-8 rounded-2xl border"
                  style={{ borderColor: `${ZONEX_ACCENT}20`, background: "rgba(11, 18, 32, 0.6)" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: `${ZONEX_ACCENT}15`, color: ZONEX_ACCENT }}
                    >
                      {step.step}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold" style={{ color: OFF_WHITE }}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base" style={{ color: ZONEX_MUTED }}>
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="py-20 md:py-36" style={{ background: ZONEX_DARK }}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1200px] mx-auto">
            <motion.div
              initial={fadeUp.initial}
              animate={projectsInView ? fadeUp.animate : {}}
              transition={fadeUp.transition}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-[1px]" style={{ background: ZONEX_ACCENT, opacity: 0.5 }} />
                <span className="text-xs uppercase tracking-[0.3em]" style={{ color: ZONEX_ACCENT }}>
                  {t("zonex.selectedProjects")}
                </span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                {t("zonex.selectedProjectsTitle")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {data.projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.5, delay: shouldReduceMotion ? 0 : index * 0.08 }}
                  className="p-6 md:p-8 rounded-2xl border"
                  style={{ borderColor: `${ZONEX_ACCENT}20` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg md:text-xl font-semibold" style={{ color: OFF_WHITE }}>
                      {project.title}
                    </h3>
                    <span className="text-xs uppercase tracking-wider" style={{ color: ZONEX_ACCENT }}>
                      {project.status ?? project.year}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: ZONEX_MUTED }}>
                    <span>{project.type}</span>
                    <span className="h-[1px] w-6" style={{ background: `${ZONEX_ACCENT}30` }} />
                    <span>{project.scope}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em]"
                style={{ color: ZONEX_ACCENT }}
              >
                {t("zonex.backToPortfolio")}
                <span className="h-[1px] w-12" style={{ background: ZONEX_ACCENT, opacity: 0.4 }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="py-20 md:py-36" style={{ background: "#0f1626" }}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-[1100px] mx-auto text-center">
            <motion.div
              initial={fadeUp.initial}
              animate={ctaInView ? fadeUp.animate : {}}
              transition={fadeUp.transition}
            >
              <h2
                className="text-3xl md:text-6xl font-black mb-6"
                style={{ fontFamily: '"Bricolage Grotesque", sans-serif', color: OFF_WHITE }}
              >
                {t("zonex.cta.title")}
              </h2>
              <p className="text-base md:text-xl mb-10" style={{ color: ZONEX_MUTED }}>
                {t("zonex.cta.desc")}
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-sm md:text-base uppercase tracking-wider"
                style={{ background: OFF_WHITE, color: ZONEX_DARK }}
              >
                {t("zonex.cta.button")}
                <span className="h-[1px] w-8" style={{ background: ZONEX_DARK, opacity: 0.4 }} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
