import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BASE = "#f3f0e9";
const INK = "#121212";
const MUTED = "#5f5b54";
const LINE = "#d8d2c6";
const ACCENT = "#b8925a";
const DEEP = "#0d0f12";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border px-6 py-5"
      style={{ borderColor: LINE, background: "#ffffff" }}
    >
      <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
        {label}
      </div>
      <div className="mt-3 text-lg font-semibold" style={{ color: INK }}>
        {value}
      </div>
    </motion.div>
  );
}

function PrincipleCard({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 18px 40px rgba(18,18,18,0.08)" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border px-7 py-7"
      style={{ borderColor: LINE, background: "#ffffff" }}
    >
      <div className="text-lg font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-3 text-sm" style={{ color: MUTED }}>
        {body}
      </div>
    </motion.div>
  );
}

function ProjectCard({
  title,
  meta,
  year,
  body,
  dark = false,
}: {
  title: string;
  meta: string;
  year: string;
  body: string;
  dark?: boolean;
}) {
  const cardStyle = dark
    ? { borderColor: "#2b2b2b", background: "#121212" }
    : { borderColor: LINE, background: "#ffffff" };
  const mutedColor = dark ? "#a9a39a" : MUTED;
  const inkColor = dark ? "#f3f0e9" : INK;

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 24px 50px rgba(18,18,18,0.08)" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="border p-8"
      style={cardStyle}
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em]" style={{ color: mutedColor }}>
        <span>{meta}</span>
        <span>{year}</span>
      </div>
      <div className="mt-6 text-2xl font-semibold" style={{ color: inkColor }}>
        {title}
      </div>
      <div className="mt-4 text-sm" style={{ color: mutedColor }}>
        {body}
      </div>
    </motion.div>
  );
}

function IdentityCard({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border px-8 py-7"
      style={{ borderColor: LINE, background: "#ffffff" }}
    >
      <div className="text-sm font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-3 text-sm" style={{ color: MUTED }}>
        {body}
      </div>
    </motion.div>
  );
}

function DigitalPanel({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border border-dashed px-6 py-5"
      style={{ borderColor: LINE, background: "#fcfbf8" }}
    >
      <div className="text-sm font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-2 text-xs" style={{ color: MUTED }}>
        {body}
      </div>
    </motion.div>
  );
}

function ArtifactTile({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border px-5 py-4"
      style={{ borderColor: LINE, background: "#ffffff" }}
    >
      <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
        {label}
      </div>
      <div className="mt-3 text-sm font-semibold" style={{ color: INK }}>
        {title}
      </div>
    </motion.div>
  );
}

function CaseStudyIntro() {
  return (
    <div className="space-y-6">
      <div className="text-xs uppercase tracking-[0.5em]" style={{ color: "var(--muted)" }}>
        INTERNAL BRAND · DESIGNED BY THIRTYTHREE
      </div>
      <div className="text-4xl md:text-5xl font-semibold" style={{ color: "var(--ink)" }}>
        NORMA
      </div>
      <div className="space-y-3 text-sm md:text-base max-w-xl" style={{ color: "var(--muted)" }}>
        <p>
          Problem: internal presentations were built from scratch, with inconsistent boards, portfolio pages, and print
          handoff files across teams.
        </p>
        <p>
          Solution: we designed a unified documentation system with templates, grid rules, typographic hierarchy, and
          export presets that keep every output aligned and production-ready.
        </p>
      </div>
      <div className="border px-4 py-3 text-[11px] uppercase tracking-[0.4em]" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
        Brand systems · Editorial layout · Documentation framework · Motion design
      </div>
      <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
        <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
          What we built
        </div>
        <div className="mt-4 grid gap-3 text-sm" style={{ color: "var(--ink)" }}>
          {[
            "Brand system",
            "Editorial layout logic",
            "Documentation framework",
            "Motion language",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
        <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
          Result
        </div>
        <div className="mt-4 text-sm" style={{ color: "var(--ink)" }}>
          The team now produces consistent boards and portfolios with a clear narrative and fewer production issues
          during print handoff.
        </div>
      </div>
      <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
        <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
          Feedback summary
        </div>
        <div className="mt-4 text-sm" style={{ color: "var(--ink)" }}>
          Internal reviews are faster and more consistent, with fewer rounds spent on formatting and file cleanup.
        </div>
      </div>
    </div>
  );
}

function HeroPlatePreview({ reduceMotion }: { reduceMotion: boolean }) {
  const boardRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);
  const zoneRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      if (reduceMotion || !boardRef.current) return;
      const ctx = gsap.context(() => {
        if (sweepRef.current) {
          gsap.set(sweepRef.current, { x: "-30%", opacity: 0 });
          gsap
            .timeline({ defaults: { ease: "power2.out" } })
            .to(sweepRef.current, { x: "30%", opacity: 0.35, duration: 1.8 })
            .to(sweepRef.current, { opacity: 0, duration: 0.6 }, "-=0.4");
        }

        lineRefs.current.forEach((line, index) => {
          if (!line) return;
          const length = line.getTotalLength();
          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 1.2,
            delay: 0.2 + index * 0.12,
            ease: "power1.out",
          });
        });
      }, boardRef);

      return () => ctx.revert();
    },
    { dependencies: [reduceMotion], scope: boardRef }
  );

  useEffect(() => {
    if (reduceMotion || !boardRef.current) return;
    const el = boardRef.current;
    const zones = zoneRefs.current.filter((zone): zone is HTMLDivElement => Boolean(zone));

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      zones.forEach((zone, index) => {
        gsap.to(zone, {
          x: dx * (index % 2 === 0 ? 4 : -4),
          y: dy * 4,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    };

    const handleLeave = () => {
      zones.forEach((zone) => {
        gsap.to(zone, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
      });
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduceMotion]);

  return (
    <motion.div
      ref={boardRef}
      whileHover={reduceMotion ? {} : { y: -4, boxShadow: "0 30px 70px rgba(18,18,18,0.12)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative border overflow-hidden transition-colors hover:border-[color:var(--accent)]"
      style={{ borderColor: "var(--line)", background: "var(--paper)" }}
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(18,18,18,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,18,0.06) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <div
        ref={sweepRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(184,146,90,0.18) 45%, transparent 70%)",
        }}
      />
      <div className="relative z-10 p-8 md:p-10 space-y-6">
        <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
          Board preview
        </div>
        <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--bg)" }}>
          <div className="grid grid-cols-[1fr,1fr] gap-6">
            <div className="space-y-3">
              <div className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
                NORMA — Studio system board
              </div>
              <div className="h-2 w-40 rounded-full" style={{ background: "var(--line)" }} />
              <div className="space-y-2" ref={(node) => (zoneRefs.current[0] = node)}>
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={`line-${idx}`} className="h-2 rounded-full" style={{ background: idx % 2 === 0 ? "var(--line)" : "#cfc7b9" }} />
                ))}
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.3em]" style={{ color: "var(--muted)" }}>
                Caption baseline aligned
              </div>
            </div>
            <div className="grid gap-4" ref={(node) => (zoneRefs.current[1] = node)}>
              <div className="border h-28" style={{ borderColor: "var(--line)", background: "var(--paper)" }} />
              <div className="border h-20" style={{ borderColor: "var(--line)", background: "var(--paper)" }} />
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--muted)" }}>
                <span className="h-px flex-1" style={{ background: "var(--line)" }} />
                <span>Annotation rules</span>
              </div>
            </div>
          </div>
          <svg className="mt-6 w-full" viewBox="0 0 520 60" fill="none">
            <line
              ref={(node) => (lineRefs.current[0] = node)}
              x1="20"
              y1="10"
              x2="500"
              y2="10"
              stroke="var(--line)"
              strokeWidth="1"
            />
            <line
              ref={(node) => (lineRefs.current[1] = node)}
              x1="20"
              y1="30"
              x2="460"
              y2="30"
              stroke="var(--line)"
              strokeWidth="1"
            />
            <line
              ref={(node) => (lineRefs.current[2] = node)}
              x1="20"
              y1="50"
              x2="420"
              y2="50"
              stroke="var(--line)"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {["Elevation zone", "Plan zone", "Section zone"].map((label) => (
            <div key={label} className="border px-4 py-3 text-[11px] uppercase tracking-[0.35em]" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SpecMiniPanel({
  title,
  children,
  reduceMotion,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  reduceMotion: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="border p-4 transition-colors hover:border-[color:var(--accent)]"
      style={{ borderColor: "var(--line)", background: "var(--paper)" }}
    >
      <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
        {title}
      </div>
      <div className="mt-3 text-xs" style={{ color: "var(--ink)" }}>
        {children}
      </div>
    </motion.div>
  );
}

function NormaCaseStudySection({ reduceMotion }: { reduceMotion: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const paletteStyles: CSSProperties = {
    borderColor: "var(--line)",
    background: "var(--bg)",
    "--bg": "#f3f0e9",
    "--paper": "#ffffff",
    "--ink": "#121212",
    "--muted": "#5f5b54",
    "--line": "#d8d2c6",
    "--accent": "#b8925a",
    "--accent2": "#2f2f2f",
  };

  const introVariant = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const gridVariant = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] } },
  };

  const heroVariant = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.985 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  const panelVariant = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 border-t" style={paletteStyles}>
      <div className="container mx-auto px-6 md:px-10">
        <div className="relative">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(18,18,18,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,18,0.08) 1px, transparent 1px)",
              backgroundSize: "120px 120px",
            }}
          />
          <motion.div
            initial="hidden"
            animate={sectionInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="relative z-10 grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-start"
          >
            <motion.div variants={introVariant}>
              <CaseStudyIntro />
            </motion.div>
            <motion.div variants={gridVariant} className="space-y-6">
              <motion.div variants={heroVariant}>
                <HeroPlatePreview reduceMotion={reduceMotion} />
              </motion.div>
              <motion.div variants={panelVariant} className="grid gap-4 sm:grid-cols-3">
                <SpecMiniPanel title="Material palette" reduceMotion={reduceMotion} delay={0.1}>
                  Warm white · Limestone · Brass · Graphite
                </SpecMiniPanel>
                <SpecMiniPanel title="Typography rules" reduceMotion={reduceMotion} delay={0.2}>
                  Type scale, spacing rhythm, and caption alignment.
                </SpecMiniPanel>
                <SpecMiniPanel title="Annotation rules" reduceMotion={reduceMotion} delay={0.3}>
                  Hierarchy for labels, notes, and measurement callouts.
                </SpecMiniPanel>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-10 border-t pt-6 text-sm max-w-3xl" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
          NORMA is maintained as an internal benchmark to refine how ThirtyThree approaches clarity, spacing, and motion across
          client systems.
        </div>
      </div>
    </section>
  );
}

export default function StudioNorma() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const outcomesRef = useRef<HTMLDivElement>(null);
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });
  const overviewInView = useInView(overviewRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const challengeInView = useInView(challengeRef, { once: true, margin: "-80px" });
  const workInView = useInView(workRef, { once: true, margin: "-80px" });
  const identityInView = useInView(identityRef, { once: true, margin: "-80px" });
  const digitalInView = useInView(digitalRef, { once: true, margin: "-80px" });
  const scopeInView = useInView(scopeRef, { once: true, margin: "-80px" });
  const outcomesInView = useInView(outcomesRef, { once: true, margin: "-80px" });
  const deliverablesInView = useInView(deliverablesRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });
  const contextInView = useInView(contextRef, { once: true, margin: "-80px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const comparisonInView = useInView(comparisonRef, { once: true, margin: "-80px" });
  const closingInView = useInView(closingRef, { once: true, margin: "-80px" });

  const heroScroll = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroShift = useTransform(
    heroScroll.scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -90]
  );
  const mediaShift = useTransform(
    heroScroll.scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 70]
  );

  const reveal = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      },
    }),
    [reduceMotion]
  );

  const stats = [
    { label: t("norma.hero.stat1.label"), value: t("norma.hero.stat1.value") },
    { label: t("norma.hero.stat2.label"), value: t("norma.hero.stat2.value") },
    { label: t("norma.hero.stat3.label"), value: t("norma.hero.stat3.value") },
    { label: t("norma.hero.stat4.label"), value: t("norma.hero.stat4.value") },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BASE }}>
      <Navbar />

      <section ref={heroRef} className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, #ffffff 0%, #f4f1ea 35%, #ece7dd 70%, #e6dfd3 100%)",
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(17,17,17,0.04) 0, rgba(17,17,17,0.04) 1px, transparent 1px, transparent 120px)",
            }}
            animate={reduceMotion ? {} : { backgroundPosition: ["0px 0px", "120px 0px", "0px 0px"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div style={{ y: heroShift }} className="relative z-10 w-full">
          <div className="container mx-auto px-6 md:px-10 pt-24 md:pt-28 pb-16 md:pb-20 flex flex-col justify-center min-h-screen">
            <motion.div
              initial="hidden"
              animate={heroInView ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              className="grid lg:grid-cols-[1.15fr,0.85fr] gap-12 items-center"
            >
              <motion.div variants={reveal} className="space-y-6">
                <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                  <span>{t("norma.hero.label")}</span>
                  <span className="h-px w-16" style={{ background: LINE }} />
                  <span style={{ color: ACCENT }}>{t("norma.hero.location")}</span>
                </div>
                <motion.div
                  className="text-[16vw] md:text-[14vw] lg:text-[11vw] leading-[0.82] font-bold"
                  style={{ color: INK }}
                  animate={reduceMotion ? {} : { letterSpacing: ["-0.02em", "0.02em", "-0.01em"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  NORMA
                </motion.div>
                <div className="text-3xl md:text-5xl font-semibold leading-[1.05]" style={{ color: INK }}>
                  {t("norma.hero.title")}
                </div>
                <div className="text-sm md:text-base max-w-xl" style={{ color: MUTED }}>
                  {t("norma.hero.body")}
                </div>
                <div className="text-xs uppercase tracking-[0.5em]" style={{ color: INK }}>
                  {t("norma.hero.scope")}
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link
                    to="/book"
                    className="px-7 py-3 text-xs uppercase tracking-[0.4em] font-semibold"
                    style={{ background: DEEP, color: "#ffffff" }}
                    >
                      {t("norma.hero.cta")}
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link
                    to="/portfolio"
                    className="px-7 py-3 text-xs uppercase tracking-[0.4em] font-semibold border"
                    style={{ borderColor: LINE, color: INK }}
                    >
                      {t("norma.hero.secondary")}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={reveal} className="relative">
                <motion.div
                  style={{ y: mediaShift }}
                  className="border p-6 md:p-8 bg-white"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                    <span>{t("norma.hero.cardLabel")}</span>
                    <span>{t("norma.hero.cardYear")}</span>
                  </div>
                  <div className="mt-6 border" style={{ borderColor: LINE, background: BASE }}>
                    <div className="h-[280px] md:h-[360px] p-6">
                      <div
                        className="h-full w-full border"
                        style={{
                          borderColor: LINE,
                          background:
                            "linear-gradient(135deg, rgba(248,246,241,0.9) 0%, rgba(232,226,214,0.9) 100%)",
                        }}
                      >
                        <div className="h-full w-full grid place-items-center">
                          <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                            Concept plate
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-sm" style={{ color: MUTED }}>
                    {t("norma.hero.cardBody")}
                  </div>
                </motion.div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border" style={{ borderColor: LINE }} />
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={heroInView ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={reveal}>
                  <StatCard label={stat.label} value={stat.value} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section ref={overviewRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={overviewInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12"
          >
            <motion.div variants={reveal} className="space-y-6">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.overview.label")}
              </div>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.overview.title")}
              </div>
              <div className="space-y-4 text-sm md:text-base" style={{ color: MUTED }}>
                <p>{t("norma.overview.body1")}</p>
                <p>{t("norma.overview.body2")}</p>
              </div>
              <div className="border-l pl-6 text-sm italic" style={{ borderColor: LINE, color: INK }}>
                {t("norma.overview.quote")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="space-y-6">
              <div className="border p-8" style={{ borderColor: LINE, background: "#ffffff" }}>
                <div className="text-[11px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                  {t("norma.overview.servicesLabel")}
                </div>
                <div className="mt-6 space-y-4 text-sm" style={{ color: MUTED }}>
                  {[
                    t("norma.overview.service1"),
                    t("norma.overview.service2"),
                    t("norma.overview.service3"),
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t pt-6 text-xs uppercase tracking-[0.45em]" style={{ borderColor: LINE, color: MUTED }}>
                  {t("norma.overview.note")}
                </div>
              </div>
              <div className="border p-6" style={{ borderColor: LINE, background: "#ffffff" }}>
                <div className="text-[11px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                  {t("norma.artifacts.label")}
                </div>
                <div className="mt-4 grid gap-3">
                  <ArtifactTile label={t("norma.artifacts.item1.label")} title={t("norma.artifacts.item1.title")} />
                  <ArtifactTile label={t("norma.artifacts.item2.label")} title={t("norma.artifacts.item2.title")} />
                  <ArtifactTile label={t("norma.artifacts.item3.label")} title={t("norma.artifacts.item3.title")} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={challengeRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={challengeInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid lg:grid-cols-[1fr,1fr] gap-10"
          >
            <motion.div variants={reveal} className="space-y-5">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.challenge.label")}
              </div>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.challenge.title")}
              </div>
              <div className="text-sm md:text-base" style={{ color: MUTED }}>
                {t("norma.challenge.body")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="border p-8" style={{ borderColor: LINE, background: "#ffffff" }}>
              <div className="text-xs uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                {t("norma.challenge.goalsLabel")}
              </div>
              <div className="mt-6 grid gap-3">
                <ArtifactTile label="01" title={t("norma.challenge.goal1")} />
                <ArtifactTile label="02" title={t("norma.challenge.goal2")} />
                <ArtifactTile label="03" title={t("norma.challenge.goal3")} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <NormaCaseStudySection reduceMotion={reduceMotion} />

      <section ref={valuesRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={valuesInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-10"
          >
            <motion.div variants={reveal} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                  {t("norma.values.label")}
                </div>
                <div className="mt-4 text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                  {t("norma.values.title")}
                </div>
              </div>
              <div className="text-sm max-w-lg" style={{ color: MUTED }}>
                {t("norma.values.body")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="grid md:grid-cols-3 gap-6">
              <PrincipleCard title={t("norma.values.one.title")} body={t("norma.values.one.body")} />
              <PrincipleCard title={t("norma.values.two.title")} body={t("norma.values.two.body")} />
              <PrincipleCard title={t("norma.values.three.title")} body={t("norma.values.three.body")} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={workRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE, background: DEEP }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={workInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-10"
          >
            <motion.div variants={reveal}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: "#c7c1b4" }}>
                {t("norma.work.label")}
              </div>
              <div className="mt-4 text-3xl md:text-4xl font-semibold" style={{ color: "#f3f0e9" }}>
                {t("norma.work.title")}
              </div>
              <div className="mt-3 text-sm max-w-2xl" style={{ color: "#c7c1b4" }}>
                {t("norma.work.body")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="grid lg:grid-cols-2 gap-6">
              {[
                "one",
                "two",
                "three",
                "four",
              ].map((key) => (
                <ProjectCard
                  key={key}
                  title={t(`norma.work.project.${key}.title`)}
                  meta={t(`norma.work.project.${key}.meta`)}
                  year={t(`norma.work.project.${key}.year`)}
                  body={t(`norma.work.project.${key}.body`)}
                  dark
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={identityRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={identityInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid lg:grid-cols-[0.95fr,1.05fr] gap-10"
          >
            <motion.div variants={reveal} className="space-y-6">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.identity.label")}
              </div>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.identity.title")}
              </div>
              <div className="text-sm md:text-base" style={{ color: MUTED }}>
                {t("norma.identity.body")}
              </div>
              <div className="border p-6" style={{ borderColor: LINE, background: "#ffffff" }}>
                <div className="text-[11px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                  {t("norma.identity.palette")}
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  {["#f3f0e9", "#d8d2c6", "#b8925a", "#121212"].map((tone) => (
                    <div key={tone} className="flex items-center gap-3">
                      <span className="h-4 w-4 rounded-full border" style={{ background: tone, borderColor: LINE }} />
                      <span className="text-xs uppercase tracking-[0.3em]" style={{ color: MUTED }}>
                        {tone}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div variants={reveal} className="grid gap-6">
              <IdentityCard title={t("norma.identity.items.one.title")} body={t("norma.identity.items.one.body")} />
              <IdentityCard title={t("norma.identity.items.two.title")} body={t("norma.identity.items.two.body")} />
              <IdentityCard title={t("norma.identity.items.three.title")} body={t("norma.identity.items.three.body")} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={digitalInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid lg:grid-cols-[1fr,1fr] gap-10"
          >
            <motion.div variants={reveal} className="space-y-6">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.digital.label")}
              </div>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.digital.title")}
              </div>
              <div className="text-sm md:text-base" style={{ color: MUTED }}>
                {t("norma.digital.body")}
              </div>
              <div className="grid gap-4">
                <DigitalPanel title={t("norma.digital.panel1.title")} body={t("norma.digital.panel1.body")} />
                <DigitalPanel title={t("norma.digital.panel2.title")} body={t("norma.digital.panel2.body")} />
                <DigitalPanel title={t("norma.digital.panel3.title")} body={t("norma.digital.panel3.body")} />
              </div>
            </motion.div>
            <motion.div variants={reveal} className="border p-6" style={{ borderColor: LINE, background: "#ffffff" }}>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />
                <span>{t("norma.digital.mockLabel")}</span>
              </div>
              <div className="mt-6 border" style={{ borderColor: LINE, background: BASE }}>
                <div className="border-b px-4 py-3 text-[11px] uppercase tracking-[0.4em]" style={{ borderColor: LINE, color: MUTED }}>
                  {t("norma.digital.mockHeader")}
                </div>
                <div className="p-6 grid gap-6">
                  <div className="border px-5 py-4" style={{ borderColor: LINE, background: "#ffffff" }}>
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      {t("norma.digital.mockCard1.label")}
                    </div>
                    <div className="mt-3 text-lg font-semibold" style={{ color: INK }}>
                      {t("norma.digital.mockCard1.title")}
                    </div>
                    <div className="mt-2 text-xs" style={{ color: MUTED }}>
                      {t("norma.digital.mockCard1.body")}
                    </div>
                  </div>
                  <div className="border px-5 py-4" style={{ borderColor: LINE, background: "#ffffff" }}>
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      {t("norma.digital.mockCard2.label")}
                    </div>
                    <div className="mt-3 text-lg font-semibold" style={{ color: INK }}>
                      {t("norma.digital.mockCard2.title")}
                    </div>
                    <div className="mt-2 text-xs" style={{ color: MUTED }}>
                      {t("norma.digital.mockCard2.body")}
                    </div>
                  </div>
                  <div className="border px-5 py-4" style={{ borderColor: LINE, background: "#ffffff" }}>
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      {t("norma.digital.mockCard3.label")}
                    </div>
                    <div className="mt-3 text-lg font-semibold" style={{ color: INK }}>
                      {t("norma.digital.mockCard3.title")}
                    </div>
                    <div className="mt-2 text-xs" style={{ color: MUTED }}>
                      {t("norma.digital.mockCard3.body")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 border-t pt-6 text-xs uppercase tracking-[0.45em]" style={{ borderColor: LINE, color: MUTED }}>
                {t("norma.digital.mockFooter")}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={scopeRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={scopeInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid lg:grid-cols-[1fr,1fr] gap-10"
          >
            <motion.div variants={reveal} className="space-y-6">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.scopeBlock.label")}
              </div>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.scopeBlock.title")}
              </div>
              <div className="text-sm md:text-base" style={{ color: MUTED }}>
                {t("norma.scopeBlock.body")}
              </div>
              <div className="grid gap-4">
                {[
                  t("norma.scopeBlock.item1"),
                  t("norma.scopeBlock.item2"),
                  t("norma.scopeBlock.item3"),
                  t("norma.scopeBlock.item4"),
                  t("norma.scopeBlock.item5"),
                  t("norma.scopeBlock.item6"),
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm" style={{ color: MUTED }}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="border p-8" style={{ borderColor: LINE, background: "#ffffff" }}>
              <div className="text-[11px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                {t("norma.scopeBlock.snapshot")}
              </div>
              <div className="mt-6 grid gap-4">
                {[
                  { label: t("norma.scopeBlock.snapshot1.label"), value: t("norma.scopeBlock.snapshot1.value") },
                  { label: t("norma.scopeBlock.snapshot2.label"), value: t("norma.scopeBlock.snapshot2.value") },
                  { label: t("norma.scopeBlock.snapshot3.label"), value: t("norma.scopeBlock.snapshot3.value") },
                  { label: t("norma.scopeBlock.snapshot4.label"), value: t("norma.scopeBlock.snapshot4.value") },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b pb-3" style={{ borderColor: LINE }}>
                    <span className="text-xs uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                      {row.label}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: INK }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t pt-4 text-xs uppercase tracking-[0.45em]" style={{ borderColor: LINE, color: MUTED }}>
                {t("norma.scopeBlock.snapshotNote")}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={contextRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={contextInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-start"
          >
            <motion.div variants={reveal} className="space-y-5">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.context.label")}
              </div>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.context.title")}
              </div>
              <div className="text-sm md:text-base" style={{ color: MUTED }}>
                {t("norma.context.body")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="border" style={{ borderColor: LINE, background: "#ffffff" }}>
              {[
                { label: t("norma.context.item1.label"), value: t("norma.context.item1.value") },
                { label: t("norma.context.item2.label"), value: t("norma.context.item2.value") },
                { label: t("norma.context.item3.label"), value: t("norma.context.item3.value") },
                { label: t("norma.context.item4.label"), value: t("norma.context.item4.value") },
                { label: t("norma.context.item5.label"), value: t("norma.context.item5.value") },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b px-6 py-5" style={{ borderColor: LINE }}>
                  <span className="text-[11px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: INK }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={outcomesRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={outcomesInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-start"
          >
            <motion.div variants={reveal} className="space-y-5">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.outcomes.label")}
              </div>
              <div className="text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.outcomes.title")}
              </div>
              <div className="text-sm md:text-base" style={{ color: MUTED }}>
                {t("norma.outcomes.body")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="grid gap-4">
              <div className="border p-6" style={{ borderColor: LINE, background: "#ffffff" }}>
                <div className="text-[11px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                  {t("norma.outcomes.artifactsLabel")}
                </div>
                <div className="mt-4 grid gap-3">
                  <ArtifactTile label={t("norma.outcomes.artifact1.label")} title={t("norma.outcomes.artifact1.title")} />
                  <ArtifactTile label={t("norma.outcomes.artifact2.label")} title={t("norma.outcomes.artifact2.title")} />
                </div>
              </div>
              {[
                { title: t("norma.outcomes.one.title"), body: t("norma.outcomes.one.body") },
                { title: t("norma.outcomes.two.title"), body: t("norma.outcomes.two.body") },
                { title: t("norma.outcomes.three.title"), body: t("norma.outcomes.three.body") },
              ].map((item) => (
                <div key={item.title} className="border px-7 py-6" style={{ borderColor: LINE, background: "#ffffff" }}>
                  <div className="text-lg font-semibold" style={{ color: INK }}>
                    {item.title}
                  </div>
                  <div className="mt-3 text-sm" style={{ color: MUTED }}>
                    {item.body}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={timelineRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={timelineInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-8"
          >
            <motion.div variants={reveal}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.timeline.label")}
              </div>
              <div className="mt-4 text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.timeline.title")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="grid md:grid-cols-4 gap-4">
              {[
                { step: "01", title: t("norma.timeline.step1.title"), body: t("norma.timeline.step1.body") },
                { step: "02", title: t("norma.timeline.step2.title"), body: t("norma.timeline.step2.body") },
                { step: "03", title: t("norma.timeline.step3.title"), body: t("norma.timeline.step3.body") },
                { step: "04", title: t("norma.timeline.step4.title"), body: t("norma.timeline.step4.body") },
              ].map((item) => (
                <div key={item.step} className="border px-6 py-6" style={{ borderColor: LINE, background: "#ffffff" }}>
                  <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                    {item.step}
                  </div>
                  <div className="mt-4 text-lg font-semibold" style={{ color: INK }}>
                    {item.title}
                  </div>
                  <div className="mt-3 text-sm" style={{ color: MUTED }}>
                    {item.body}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={deliverablesRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={deliverablesInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-8"
          >
            <motion.div variants={reveal} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                  {t("norma.deliverables.label")}
                </div>
                <div className="mt-4 text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                  {t("norma.deliverables.title")}
                </div>
              </div>
              <div className="text-sm max-w-lg" style={{ color: MUTED }}>
                {t("norma.deliverables.body")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="border" style={{ borderColor: LINE, background: "#ffffff" }}>
              <div className="grid md:grid-cols-[1.1fr,0.9fr] border-b" style={{ borderColor: LINE }}>
                <div className="px-6 py-4 text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                  {t("norma.deliverables.col1")}
                </div>
                <div className="px-6 py-4 text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                  {t("norma.deliverables.col2")}
                </div>
              </div>
              {[
                { item: t("norma.deliverables.item1"), detail: t("norma.deliverables.detail1") },
                { item: t("norma.deliverables.item2"), detail: t("norma.deliverables.detail2") },
                { item: t("norma.deliverables.item3"), detail: t("norma.deliverables.detail3") },
                { item: t("norma.deliverables.item4"), detail: t("norma.deliverables.detail4") },
              ].map((row) => (
                <div key={row.item} className="grid md:grid-cols-[1.1fr,0.9fr] border-b" style={{ borderColor: LINE }}>
                  <div className="px-6 py-5 text-sm font-semibold" style={{ color: INK }}>
                    {row.item}
                  </div>
                  <div className="px-6 py-5 text-sm" style={{ color: MUTED }}>
                    {row.detail}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={comparisonRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE, background: "#f7f3ea" }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={comparisonInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="grid lg:grid-cols-[1fr,1fr] gap-8"
          >
            <motion.div variants={reveal} className="space-y-4">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.comparison.beforeLabel")}
              </div>
              <div className="border px-6 py-6" style={{ borderColor: LINE, background: "#ffffff" }}>
                <div className="text-lg font-semibold" style={{ color: INK }}>
                  {t("norma.comparison.beforeTitle")}
                </div>
                <div className="mt-3 text-sm" style={{ color: MUTED }}>
                  {t("norma.comparison.beforeBody")}
                </div>
                <div className="mt-5 grid gap-3 text-xs uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                  <span>{t("norma.comparison.beforePoint1")}</span>
                  <span>{t("norma.comparison.beforePoint2")}</span>
                  <span>{t("norma.comparison.beforePoint3")}</span>
                </div>
              </div>
            </motion.div>
            <motion.div variants={reveal} className="space-y-4">
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.comparison.afterLabel")}
              </div>
              <div className="border px-6 py-6" style={{ borderColor: LINE, background: "#ffffff" }}>
                <div className="text-lg font-semibold" style={{ color: INK }}>
                  {t("norma.comparison.afterTitle")}
                </div>
                <div className="mt-3 text-sm" style={{ color: MUTED }}>
                  {t("norma.comparison.afterBody")}
                </div>
                <div className="mt-5 grid gap-3 text-xs uppercase tracking-[0.35em]" style={{ color: MUTED }}>
                  <span>{t("norma.comparison.afterPoint1")}</span>
                  <span>{t("norma.comparison.afterPoint2")}</span>
                  <span>{t("norma.comparison.afterPoint3")}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={processRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={processInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="space-y-8"
          >
            <motion.div variants={reveal}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.process.label")}
              </div>
              <div className="mt-4 text-3xl md:text-4xl font-semibold" style={{ color: INK }}>
                {t("norma.process.title")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="grid md:grid-cols-2 gap-6">
              {[
                { step: "01", title: t("norma.process.step1.title"), body: t("norma.process.step1.body") },
                { step: "02", title: t("norma.process.step2.title"), body: t("norma.process.step2.body") },
                { step: "03", title: t("norma.process.step3.title"), body: t("norma.process.step3.body") },
                { step: "04", title: t("norma.process.step4.title"), body: t("norma.process.step4.body") },
              ].map((item) => (
                <div key={item.step} className="border px-7 py-6" style={{ borderColor: LINE, background: "#ffffff" }}>
                  <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                    {item.step}
                  </div>
                  <div className="mt-4 text-lg font-semibold" style={{ color: INK }}>
                    {item.title}
                  </div>
                  <div className="mt-3 text-sm" style={{ color: MUTED }}>
                    {item.body}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={closingRef} className="py-20 md:py-28 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial="hidden"
            animate={closingInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={reveal} className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
              {t("norma.closing.label")}
            </motion.div>
            <motion.div variants={reveal} className="text-3xl md:text-5xl font-semibold" style={{ color: INK }}>
              {t("norma.closing.title")}
            </motion.div>
            <motion.div variants={reveal} className="text-sm md:text-base" style={{ color: MUTED }}>
              {t("norma.closing.body")}
            </motion.div>
            <motion.div variants={reveal} className="flex flex-wrap justify-center gap-4">
              <Link
                to="/book"
                className="px-8 py-4 text-xs uppercase tracking-[0.4em] font-semibold"
                style={{ background: INK, color: "#ffffff" }}
              >
                {t("norma.closing.cta")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
