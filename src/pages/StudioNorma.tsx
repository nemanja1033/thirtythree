import { useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
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

type SpecItem = { label: string; value: string };
type PlateSize = "sm" | "md" | "lg";
type PlateConfig = {
  id: string;
  number: string;
  title: string;
  description: string;
  size: PlateSize;
  specs: SpecItem[];
  bullets: string[];
};

type RegisterItem = { label: string; tone: string };

function SpecStrip({ items }: { items: SpecItem[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={`${item.label}-${item.value}`}
          className="text-[10px] uppercase tracking-[0.3em] px-3 py-1 border transition-colors group-hover:bg-[color:var(--bg)] group-hover:border-[color:var(--accent)]"
          style={{ borderColor: "var(--line)", color: "var(--muted)" }}
        >
          {item.label}: {item.value}
        </span>
      ))}
    </div>
  );
}

function RevisionHistory({ revisions }: { revisions: string[] }) {
  return (
    <div className="mt-4 space-y-2">
      {revisions.map((revision) => (
        <div key={revision} className="flex items-center justify-between text-[11px] uppercase tracking-[0.35em]">
          <span style={{ color: "var(--muted)" }}>{revision}</span>
          <span style={{ color: "var(--accent)" }}>Approved</span>
        </div>
      ))}
    </div>
  );
}

function RegisterCard({ title, items }: { title: string; items: RegisterItem[] }) {
  return (
    <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
      <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
        {title}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="h-7 w-7 rounded-full border" style={{ background: item.tone, borderColor: "var(--line)" }} />
            <span className="text-xs" style={{ color: "var(--ink)" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 text-[11px] uppercase tracking-[0.35em]" style={{ color: "var(--muted)" }}>
        Finish spec aligned to printer profiles
      </div>
    </div>
  );
}

function PlateCard({
  plate,
  index,
  isActive,
  onToggle,
  reduceMotion,
}: {
  plate: PlateConfig;
  index: number;
  isActive: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const sizeClasses =
    plate.size === "lg"
      ? "col-span-6 md:col-span-7 row-span-2"
      : plate.size === "md"
        ? "col-span-6 md:col-span-5 row-span-2"
        : "col-span-6 md:col-span-4 row-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.04 }}
      className={`group relative border border-[color:var(--line)] hover:border-[color:var(--accent)] transition-colors ${sizeClasses} h-full`}
      style={{ background: "var(--paper)" }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,18,18,0.02) 0%, rgba(18,18,18,0.06) 100%)",
          }}
        />
      </div>
      <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
          <span>{plate.number}</span>
          <span>Deliverable</span>
        </div>
        <div className="mt-4 text-lg font-semibold" style={{ color: "var(--ink)" }}>
          {plate.title}
        </div>
        <div className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          {plate.description}
        </div>
        <SpecStrip items={plate.specs} />
        <div className="mt-auto pt-4 md:hidden">
          <button
            type="button"
            onClick={onToggle}
            className="text-[11px] uppercase tracking-[0.35em] border px-3 py-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]"
            style={{ borderColor: "var(--line)", color: "var(--ink)" }}
            aria-expanded={isActive}
          >
            {isActive ? "Hide details" : "View details"}
          </button>
        </div>
      </div>
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 ${
          isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } group-hover:opacity-100 group-hover:pointer-events-auto`}
        style={{
          background:
            "linear-gradient(180deg, rgba(243,240,233,0.0) 0%, rgba(243,240,233,0.85) 55%, rgba(243,240,233,0.95) 100%)",
        }}
      >
        <div className="text-[10px] uppercase tracking-[0.35em]" style={{ color: "var(--muted)" }}>
          Preview
        </div>
        <ul className="mt-3 space-y-2 text-xs" style={{ color: "var(--ink)" }}>
          {plate.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function VisualSystemSection({ reduceMotion }: { reduceMotion: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activePlateId, setActivePlateId] = useState<string | null>(null);

  const plates: PlateConfig[] = [
    {
      id: "plate-01",
      number: "Plate 01",
      title: "Civic facade studies",
      description: "Facade proportions and alignment rules for tender submissions.",
      size: "lg",
      specs: [
        { label: "Format", value: "A1" },
        { label: "Rev", value: "v1.0" },
        { label: "Owner", value: "Design" },
      ],
      bullets: ["Type scale 9–32 pt", "3-column measurement grid", "PDF/X-1a export preset"],
    },
    {
      id: "plate-02",
      number: "Plate 02",
      title: "Material library",
      description: "Unified register for stone, brass, and interior finish palettes.",
      size: "md",
      specs: [
        { label: "Format", value: "A3" },
        { label: "Rev", value: "v0.9" },
        { label: "Owner", value: "Studio" },
      ],
      bullets: ["Material code system", "Vendor-ready labels", "Print margin 18 mm"],
    },
    {
      id: "plate-03",
      number: "Plate 03",
      title: "Spatial sections",
      description: "Section sheets aligned to editorial grid and caption rules.",
      size: "md",
      specs: [
        { label: "Format", value: "A1" },
        { label: "Rev", value: "v1.0" },
        { label: "Owner", value: "Studio" },
      ],
      bullets: ["Section lineweight set", "Caption hierarchy", "Scale lock: 1:200"],
    },
    {
      id: "plate-04",
      number: "Plate 04",
      title: "Project summary",
      description: "One-page overview with scope, credits, and key metrics.",
      size: "sm",
      specs: [
        { label: "Format", value: "A3" },
        { label: "Rev", value: "v1.1" },
        { label: "Owner", value: "Strategy" },
      ],
      bullets: ["Structured header rules", "Fixed credit block", "Version stamping"],
    },
    {
      id: "plate-05",
      number: "Plate 05",
      title: "Document cover system",
      description: "Cover variants for internal memos and public briefings.",
      size: "sm",
      specs: [
        { label: "Format", value: "A4" },
        { label: "Rev", value: "v1.0" },
        { label: "Owner", value: "Design" },
      ],
      bullets: ["Lockup sizing rules", "Margin-safe zones", "Emboss-ready marks"],
    },
    {
      id: "plate-06",
      number: "Plate 06",
      title: "Portfolio spread",
      description: "Repeatable two-page layout for project narratives.",
      size: "lg",
      specs: [
        { label: "Format", value: "A3" },
        { label: "Rev", value: "v1.0" },
        { label: "Owner", value: "Design" },
      ],
      bullets: ["Image-to-text ratio", "Baseline grid 6 mm", "Caption rules"],
    },
    {
      id: "plate-07",
      number: "Plate 07",
      title: "Site plan notation",
      description: "Scaled maps with annotation and orientation system.",
      size: "sm",
      specs: [
        { label: "Format", value: "A2" },
        { label: "Rev", value: "v0.8" },
        { label: "Owner", value: "Studio" },
      ],
      bullets: ["North marker set", "Legend consistency", "Coordinate grid"],
    },
    {
      id: "plate-08",
      number: "Plate 08",
      title: "Signage plates",
      description: "Exterior plaques and room plates with spacing rules.",
      size: "sm",
      specs: [
        { label: "Format", value: "Custom" },
        { label: "Rev", value: "v1.0" },
        { label: "Owner", value: "Studio" },
      ],
      bullets: ["Brass finish spec", "Lettering depth", "Mounting guides"],
    },
  ];

  const registerItems: RegisterItem[] = [
    { label: "Limestone", tone: "#e6ddd1" },
    { label: "Warm white", tone: "#f4f1ea" },
    { label: "Brass", tone: "#b8925a" },
    { label: "Graphite", tone: "#2f2f2f" },
    { label: "Walnut", tone: "#8a6a4f" },
    { label: "Concrete", tone: "#cfc8be" },
  ];

  const outcomes = [
    "Standardized 18 plate types across public tenders and internal documentation.",
    "Cut layout turnaround time by 35% through template-driven pages.",
    "Zero rework on print deliveries after introducing preflight presets.",
  ];

  const testimonial = {
    quote:
      "The system finally mirrors the way we work — precise, calm, and ready for public clients.",
    name: "Milica V.",
    role: "Studio Lead, NORMA",
  };

  const scopeLine = "Client: NORMA Studio • Scope: Identity + portfolio system • Timeline: 8 weeks • Location: Belgrade";

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 border-t"
      style={
        {
          borderColor: "var(--line)",
          background: "var(--bg)",
          "--bg": "#f3f0e9",
          "--paper": "#ffffff",
          "--ink": "#121212",
          "--muted": "#5f5b54",
          "--line": "#d8d2c6",
          "--accent": "#b8925a",
          "--accent2": "#2f2f2f",
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto px-6 md:px-10">
        <motion.div
          initial="hidden"
          animate={sectionInView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-start"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="space-y-6">
            <div className="text-xs uppercase tracking-[0.5em]" style={{ color: "var(--muted)" }}>
              Client System Output
            </div>
            <div className="text-3xl md:text-4xl font-semibold" style={{ color: "var(--ink)" }}>
              Visual system plates built for public tenders and studio portfolios.
            </div>
            <div className="text-sm md:text-base" style={{ color: "var(--muted)" }}>
              We delivered a print-ready documentation system that keeps every tender, board, and portfolio page consistent. Each plate follows a shared grid, typographic scale, and export protocol — ready for internal teams and external printers.
            </div>
            <div className="text-[11px] uppercase tracking-[0.4em] border px-4 py-3" style={{ borderColor: "var(--line)", color: "var(--muted)" }}>
              {scopeLine}
            </div>
            <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
              <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
                Outcomes
              </div>
              <ul className="mt-4 space-y-3 text-sm" style={{ color: "var(--ink)" }}>
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
              <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
                Client note
              </div>
              <div className="mt-4 text-sm italic" style={{ color: "var(--ink)" }}>
                “{testimonial.quote}”
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.35em]" style={{ color: "var(--muted)" }}>
                {testimonial.name} • {testimonial.role}
              </div>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
            <div
              className="relative border p-6 md:p-8"
              style={{ borderColor: "var(--line)", background: "var(--paper)" }}
            >
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(18,18,18,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(18,18,18,0.08) 1px, transparent 1px)",
                  backgroundSize: "120px 120px",
                }}
              />
              <div className="relative z-10">
                <div className="text-[11px] uppercase tracking-[0.45em]" style={{ color: "var(--muted)" }}>
                  Plate grid
                </div>
                <div className="mt-6 grid grid-cols-6 md:grid-cols-12 auto-rows-[140px] md:auto-rows-[170px] gap-4 md:gap-6">
                  {plates.map((plate, index) => (
                    <PlateCard
                      key={plate.id}
                      plate={plate}
                      index={index}
                      isActive={activePlateId === plate.id}
                      onToggle={() => setActivePlateId(activePlateId === plate.id ? null : plate.id)}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={sectionInView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } }}
          className="mt-12 grid lg:grid-cols-[1.1fr,0.9fr] gap-8"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="space-y-6">
            <div className="border p-7" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
                <span>Competition board</span>
                <span>A1 • Print-ready</span>
              </div>
              <div className="mt-4 text-lg font-semibold" style={{ color: "var(--ink)" }}>
                Public tender board set
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                6-column grid, 18 mm margins, typographic scale locked across boards.
              </div>
              <RevisionHistory revisions={["v0.8 — internal", "v0.9 — client", "v1.0 — approved"]} />
              <div className="mt-4 text-[11px] uppercase tracking-[0.35em]" style={{ color: "var(--muted)" }}>
                14 plates • 3 registers • 1 cover system
              </div>
            </div>

            <div className="border p-7" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
                <span>Studio cover</span>
                <span>A3 • Print-ready</span>
              </div>
              <div className="mt-4 text-lg font-semibold" style={{ color: "var(--ink)" }}>
                Portfolio cover & header system
              </div>
              <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                Cover variations for competitions, internal reviews, and investor decks.
              </div>
              <RevisionHistory revisions={["v0.9 — internal", "v1.0 — approved"]} />
              <div className="mt-4 text-[11px] uppercase tracking-[0.35em]" style={{ color: "var(--muted)" }}>
                Type scale 11–34 pt • Safe area 12 mm
              </div>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="space-y-6">
            <RegisterCard title="Material register" items={registerItems} />
            <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
              <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
                Elevation notes
              </div>
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--ink)" }}>
                <li>All dimensions set in millimeters with 5 mm rounding.</li>
                <li>Section lineweights: 0.6 / 0.3 / 0.15 hierarchy.</li>
                <li>Caption baseline aligned to grid module 6 mm.</li>
              </ul>
            </div>
            <div className="border p-6" style={{ borderColor: "var(--line)", background: "var(--paper)" }}>
              <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: "var(--muted)" }}>
                Grid plates strip
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {["Plate A", "Plate B", "Plate C", "Plate D", "Plate E", "Plate F"].map((label) => (
                  <div key={label} className="border p-3" style={{ borderColor: "var(--line)", background: "var(--bg)" }}>
                    <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "var(--muted)" }}>
                      {label}
                    </div>
                    <div className="mt-2 h-10 border" style={{ borderColor: "var(--line)", background: "var(--paper)" }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
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

      <VisualSystemSection reduceMotion={reduceMotion} />

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
