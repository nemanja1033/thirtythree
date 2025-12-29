import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#f5efe8";
const INK = "#3b2f2a";
const MUTED = "#6b4b3e";
const ACCENT = "#c97c4b";
const SOFT = "#e0d4c7";
const PAPER = "#f1e8dd";
const ESPRESSO = "#221915";

const grainBg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.18'/%3E%3C/svg%3E\")";

function EmberMark({ className, stroke = INK }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" fill="none">
      <circle cx="48" cy="48" r="34" stroke={stroke} strokeWidth="7" />
      <path d="M18 56h60" stroke={stroke} strokeWidth="7" strokeLinecap="round" />
      <path d="M32 32c6-8 16-10 24-6" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function EmberWordmark({ className, fill = INK }: { className?: string; fill?: string }) {
  return (
    <svg className={className} viewBox="0 0 660 120" fill={fill}>
      <rect x="0" y="0" width="18" height="120" rx="4" />
      <rect x="0" y="0" width="78" height="18" rx="4" />
      <rect x="0" y="51" width="32" height="18" rx="4" />
      <rect x="46" y="51" width="26" height="18" rx="4" />
      <rect x="0" y="102" width="78" height="18" rx="4" />

      <rect x="116" y="0" width="18" height="120" rx="4" />
      <rect x="196" y="0" width="18" height="120" rx="4" />
      <polygon points="134,0 152,0 186,62 168,62" />
      <polygon points="186,62 204,0 222,0 204,62" />

      <rect x="256" y="0" width="18" height="120" rx="4" />
      <rect x="256" y="0" width="80" height="18" rx="4" />
      <rect x="256" y="51" width="70" height="18" rx="4" />
      <rect x="256" y="102" width="80" height="18" rx="4" />
      <rect x="314" y="18" width="18" height="33" rx="4" />
      <rect x="314" y="69" width="18" height="33" rx="4" />

      <rect x="374" y="0" width="18" height="120" rx="4" />
      <rect x="374" y="0" width="78" height="18" rx="4" />
      <rect x="374" y="51" width="32" height="18" rx="4" />
      <rect x="420" y="51" width="26" height="18" rx="4" />
      <rect x="374" y="102" width="78" height="18" rx="4" />

      <rect x="498" y="0" width="18" height="120" rx="4" />
      <rect x="498" y="0" width="76" height="18" rx="4" />
      <rect x="498" y="51" width="64" height="18" rx="4" />
      <rect x="554" y="18" width="18" height="33" rx="4" />
      <polygon points="516,74 582,120 548,120 496,86" />
    </svg>
  );
}

function MenuSpread({
  label,
  title,
  edition,
  espressoLabel,
  filterLabel,
  seasonalLabel,
  notesLabel,
  notesBody,
  items,
  filters,
  specials,
}: {
  label: string;
  title: string;
  edition: string;
  espressoLabel: string;
  filterLabel: string;
  seasonalLabel: string;
  notesLabel: string;
  notesBody: string;
  items: Array<[string, string]>;
  filters: Array<[string, string]>;
  specials: Array<[string, string]>;
}) {
  return (
    <div className="rounded-[30px] border p-8" style={{ borderColor: SOFT, background: "#f8f1e8" }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
            {label}
          </div>
          <div className="mt-2 text-2xl font-semibold" style={{ color: INK }}>
            {title}
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
          {edition}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-8 text-sm" style={{ color: INK }}>
        <div>
          <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            {espressoLabel}
          </div>
          <div className="mt-4 space-y-3">
            {items.map(([name, price]) => (
              <div key={name} className="flex items-center justify-between">
                <span>{name}</span>
                <span style={{ color: MUTED }}>{price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[11px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            {filterLabel}
          </div>
          <div className="mt-4 space-y-3">
            {filters.map(([name, price]) => (
              <div key={name} className="flex items-center justify-between">
                <span>{name}</span>
                <span style={{ color: MUTED }}>{price}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            {seasonalLabel}
          </div>
          <div className="mt-4 space-y-3">
            {specials.map(([name, price]) => (
              <div key={name} className="flex items-center justify-between">
                <span>{name}</span>
                <span style={{ color: MUTED }}>{price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border px-4 py-4" style={{ borderColor: SOFT, background: "#efe2d6" }}>
            <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              {notesLabel}
            </div>
            <div className="mt-3 text-[13px]" style={{ color: INK }}>
              {notesBody}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Poster({ title, detail, brand }: { title: string; detail: string; brand: string }) {
  return (
    <div className="rounded-[28px] border p-8 h-full" style={{ borderColor: SOFT, background: "#efe2d6" }}>
      <div className="text-[10px] uppercase tracking-[0.6em]" style={{ color: MUTED }}>
        {brand}
      </div>
      <div className="mt-8 text-3xl font-semibold leading-tight" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-6 text-sm" style={{ color: MUTED }}>
        {detail}
      </div>
      <div className="mt-10 h-2 w-24 rounded-full" style={{ background: ACCENT }} />
    </div>
  );
}

function SignagePanel({ title, subtitle, body }: { title: string; subtitle: string; body: string }) {
  return (
    <div className="rounded-[28px] border p-10" style={{ borderColor: "#3a2a25", background: ESPRESSO }}>
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: "#d6c7bb" }}>
          {title}
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#d6c7bb" }}>
          {subtitle}
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center rounded-2xl border py-10" style={{ borderColor: "#3b2f2a" }}>
        <EmberWordmark className="w-[240px]" fill="#f5efe8" />
      </div>
      <div className="mt-6 text-sm" style={{ color: "#d6c7bb" }}>
        {body}
      </div>
    </div>
  );
}

function InteriorWallPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[32px] border p-12 md:p-14" style={{ borderColor: "#3b2f2a", background: ESPRESSO }}>
      <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: "#d6c7bb" }}>
        {title}
      </div>
      <div className="mt-10 flex items-center justify-center">
        <EmberWordmark className="w-[260px] md:w-[360px]" fill="#f5efe8" />
      </div>
      <div className="mt-8 text-sm md:text-base" style={{ color: "#d6c7bb" }}>
        {body}
      </div>
    </div>
  );
}

function BrandSheet({
  title,
  subtitle,
  ritualLabel,
  secondaryLabel,
  safeSpaceLabel,
  safeSpaceNote,
  wordmark,
  wordmarkSub,
}: {
  title: string;
  subtitle: string;
  ritualLabel: string;
  secondaryLabel: string;
  safeSpaceLabel: string;
  safeSpaceNote: string;
  wordmark: string;
  wordmarkSub: string;
}) {
  return (
    <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: "#f8f1e8" }}>
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
          {title}
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
          {subtitle}
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex items-center justify-between gap-6">
          <EmberWordmark className="w-[260px]" />
          <div className="flex items-center gap-6">
            <EmberMark className="w-14 h-14" />
            <div className="text-xs uppercase tracking-[0.35em]" style={{ color: MUTED }}>
              {ritualLabel}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-2xl border px-6 py-6" style={{ borderColor: SOFT, background: "#f1e1d2" }}>
            <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: MUTED }}>
              {secondaryLabel}
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                {wordmark}
              </div>
              <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                {wordmarkSub}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border px-6 py-6" style={{ borderColor: SOFT, background: "#f1e1d2" }}>
            <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: MUTED }}>
              {safeSpaceLabel}
            </div>
            <div className="mt-6 relative h-16">
              <div className="absolute inset-0 border border-dashed" style={{ borderColor: "#d5c6ba" }} />
              <div className="absolute inset-4 border" style={{ borderColor: SOFT }} />
              <div className="absolute inset-6 flex items-center justify-center">
                <EmberMark className="w-10 h-10" />
              </div>
            </div>
            <div className="mt-4 text-[11px]" style={{ color: MUTED }}>
              {safeSpaceNote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypeSystem({
  title,
  headline,
  subhead,
  body,
  headlineLabel,
  bodyLabel,
  headlineExample,
  bodyExample,
}: {
  title: string;
  headline: string;
  subhead: string;
  body: string;
  headlineLabel: string;
  bodyLabel: string;
  headlineExample: string;
  bodyExample: string;
}) {
  return (
    <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: "#efe2d6" }}>
      <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
        {title}
      </div>
      <div className="mt-8 space-y-4">
        <div className="text-5xl md:text-6xl font-semibold leading-[1.05]" style={{ color: INK }}>
          {headline}
        </div>
        <div className="text-2xl md:text-3xl" style={{ color: INK }}>
          {subhead}
        </div>
        <div className="text-sm md:text-base leading-relaxed max-w-xl" style={{ color: MUTED }}>
          {body}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm" style={{ color: INK }}>
        <div>
          <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            {headlineLabel}
          </div>
          <div className="mt-3 text-3xl font-semibold">{headlineExample}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            {bodyLabel}
          </div>
          <div className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
            {bodyExample}
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorSpread({
  title,
  swatches,
  note,
  contrastTitle,
  contrastBody,
}: {
  title: string;
  swatches: Array<{ name: string; hex: string; desc: string }>;
  note: string;
  contrastTitle: string;
  contrastBody: string;
}) {
  return (
    <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: PAPER }}>
      <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
        {title}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {swatches.map((swatch) => (
          <div key={swatch.name} className="rounded-2xl border p-4" style={{ borderColor: SOFT, background: "#f8f1e8" }}>
            <div className="h-12 rounded-xl" style={{ background: swatch.hex }} />
            <div className="mt-3 text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              {swatch.name}
            </div>
            <div className="mt-2 text-[11px]" style={{ color: INK }}>
              {swatch.desc}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm" style={{ color: MUTED }}>
        {note}
      </div>
      <div className="mt-6 rounded-2xl border px-6 py-5" style={{ borderColor: SOFT, background: "#3b2f2a" }}>
        <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: "#e6d8cb" }}>
          {contrastTitle}
        </div>
        <div className="mt-3 text-sm" style={{ color: "#f5efe8" }}>
          {contrastBody}
        </div>
      </div>
    </div>
  );
}

function DigitalScreen({
  subtitle,
  title,
  body,
  tags,
}: {
  subtitle: string;
  title: string;
  body: string;
  tags: string[];
}) {
  return (
    <div className="rounded-[26px] border p-8" style={{ borderColor: SOFT, background: "#f8f1e8" }}>
      <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
        {subtitle}
      </div>
      <div className="mt-4 text-2xl font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
        {body}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {tags.map((label) => (
          <div
            key={label}
            className="rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.35em]"
            style={{ borderColor: SOFT, color: MUTED }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmberCoffeeHouse() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const conceptInView = useInView(conceptRef, { once: true, margin: "-60px" });
  const identityInView = useInView(identityRef, { once: true, margin: "-60px" });
  const appsInView = useInView(appsRef, { once: true, margin: "-60px" });
  const digitalInView = useInView(digitalRef, { once: true, margin: "-60px" });
  const closeInView = useInView(closeRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: digitalRef, offset: ["start end", "end start"] });
  const digitalY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [24, -32]);
  const digitalScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.99, 1, 0.97]);
  const digitalSpring = useSpring(digitalY, { stiffness: 60, damping: 26 });

  const ease = [0.16, 1, 0.3, 1] as const;
  const staggerChildren = reduceMotion ? 0 : 0.12;

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
  };

  const heroContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren, delayChildren: reduceMotion ? 0 : 0.1 },
    },
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-20 md:pb-28 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #fff7ef 0%, #f4e7da 38%, #d9c0ab 70%, #b07b5c 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: grainBg }} />
        <div className="container mx-auto px-6 md:px-8 relative">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 md:gap-16 items-start">
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate={heroInView ? "show" : "hidden"}
            >
              <motion.span
                variants={reveal}
                className="text-xs uppercase tracking-[0.5em]"
                style={{ color: MUTED }}
              >
                {t("studio.concept")}
              </motion.span>
              <div className="mt-8 overflow-hidden">
                <motion.div
                  variants={reveal}
                  className="inline-block"
                  transition={{ duration: reduceMotion ? 0.1 : 1.3, ease }}
                >
                  <EmberWordmark className="w-[320px] md:w-[560px]" />
                </motion.div>
              </div>
              <motion.p
                variants={reveal}
                className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl"
                style={{ color: MUTED }}
              >
                {t("ember.story")}
              </motion.p>
              <motion.p
                variants={reveal}
                className="mt-4 text-sm md:text-base"
                style={{ color: INK }}
              >
                {t("ember.scope")}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 1.1, ease }}
              className="rounded-[36px] border p-10 relative overflow-hidden"
              style={{
                borderColor: SOFT,
                background: "linear-gradient(160deg, #fdf6ee 0%, #f1e1d2 60%, #d6b79c 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: grainBg }} />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.45) 0%, rgba(0,0,0,0.15) 65%)",
                }}
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <EmberMark className="w-20 h-20" />
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      {t("ember.hero.ritualMark")}
                    </div>
                    <div className="text-lg font-semibold" style={{ color: INK }}>
                      {t("ember.hero.ritualMarkDesc")}
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                    {t("ember.hero.wordmark")}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                    {t("ember.hero.wordmarkSub")}
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[t("ember.hero.pill1"), t("ember.hero.pill2"), t("ember.hero.pill3")].map((label) => (
                    <div
                      key={label}
                      className="rounded-2xl border px-4 py-6 text-[10px] uppercase tracking-[0.3em]"
                      style={{ borderColor: "rgba(59,47,42,0.15)", color: MUTED, background: "rgba(255,255,255,0.4)" }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={conceptRef} className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={conceptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 md:gap-16 items-start"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                {t("ember.concept.label")}
              </div>
              <div className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05]" style={{ color: INK }}>
                {t("ember.concept.headline")}
              </div>
              <div className="mt-8 text-sm md:text-base leading-relaxed max-w-xl" style={{ color: MUTED }}>
                {t("ember.concept.body")}
              </div>
            </div>
            <div className="rounded-[32px] border p-8" style={{ borderColor: SOFT, background: PAPER }}>
              <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                {t("ember.concept.blockTitle")}
              </div>
              <div className="mt-6 space-y-6 text-sm" style={{ color: INK }}>
                {[
                  {
                    title: t("ember.concept.point1.title"),
                    body: t("ember.concept.point1.body"),
                  },
                  {
                    title: t("ember.concept.point2.title"),
                    body: t("ember.concept.point2.body"),
                  },
                  {
                    title: t("ember.concept.point3.title"),
                    body: t("ember.concept.point3.body"),
                  },
                ].map((item) => (
                  <div key={item.title}>
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      {item.title}
                    </div>
                    <div className="mt-3">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={identityRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={identityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="grid lg:grid-cols-2 gap-8 md:gap-10"
          >
            <BrandSheet
              title={t("ember.identity.logoSystem")}
              subtitle={t("ember.identity.primarySecondary")}
              ritualLabel={t("ember.identity.ritualMark")}
              secondaryLabel={t("ember.identity.secondaryLockup")}
              safeSpaceLabel={t("ember.identity.safeSpace")}
              safeSpaceNote={t("ember.identity.safeSpaceNote")}
              wordmark={t("ember.identity.wordmark")}
              wordmarkSub={t("ember.identity.wordmarkSub")}
            />
            <TypeSystem
              title={t("ember.identity.typography")}
              headline={t("ember.identity.typographyHeadline")}
              subhead={t("ember.identity.typographySubhead")}
              body={t("ember.identity.typographyBody")}
              headlineLabel={t("ember.identity.typographyHeadlineLabel")}
              bodyLabel={t("ember.identity.typographyBodyLabel")}
              headlineExample={t("ember.identity.typographyHeadlineExample")}
              bodyExample={t("ember.identity.typographyBodyExample")}
            />
            <ColorSpread
              title={t("ember.identity.colorInUse")}
              swatches={[
                { name: t("ember.identity.color1"), hex: "#f5efe8", desc: t("ember.identity.color1Desc") },
                { name: t("ember.identity.color2"), hex: "#c97c4b", desc: t("ember.identity.color2Desc") },
                { name: t("ember.identity.color3"), hex: "#b3886b", desc: t("ember.identity.color3Desc") },
                { name: t("ember.identity.color4"), hex: "#3b2f2a", desc: t("ember.identity.color4Desc") },
              ]}
              note={t("ember.identity.colorNote")}
              contrastTitle={t("ember.identity.espressoContrast")}
              contrastBody={t("ember.identity.espressoContrastDesc")}
            />
            <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: "#f1e1d2" }}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("ember.identity.materials")}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {[t("ember.identity.material1"), t("ember.identity.material2"), t("ember.identity.material3"), t("ember.identity.material4")].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-2xl border px-5 py-6 text-[11px] uppercase tracking-[0.3em]"
                      style={{ borderColor: SOFT, color: MUTED, background: "#f8f1e8" }}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
              <div className="mt-8 text-sm" style={{ color: MUTED }}>
                {t("ember.identity.materialsDesc")}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={appsRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={appsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 md:gap-10"
          >
            <div className="space-y-8">
              <MenuSpread
                label={t("ember.menu.label")}
                title={t("ember.menu.title")}
                edition={t("ember.menu.edition")}
                espressoLabel={t("ember.menu.espresso")}
                filterLabel={t("ember.menu.filter")}
                seasonalLabel={t("ember.menu.seasonal")}
                notesLabel={t("ember.menu.notesLabel")}
                notesBody={t("ember.menu.notesBody")}
                items={[
                  [t("ember.menu.item1"), t("ember.menu.item1Price")],
                  [t("ember.menu.item2"), t("ember.menu.item2Price")],
                  [t("ember.menu.item3"), t("ember.menu.item3Price")],
                  [t("ember.menu.item4"), t("ember.menu.item4Price")],
                ]}
                filters={[
                  [t("ember.menu.filter1"), t("ember.menu.filter1Price")],
                  [t("ember.menu.filter2"), t("ember.menu.filter2Price")],
                  [t("ember.menu.filter3"), t("ember.menu.filter3Price")],
                ]}
                specials={[
                  [t("ember.menu.special1"), t("ember.menu.special1Price")],
                  [t("ember.menu.special2"), t("ember.menu.special2Price")],
                ]}
              />
              <InteriorWallPanel title={t("ember.interior.title")} body={t("ember.interior.body")} />
            </div>
            <div className="space-y-8">
              <div className="grid gap-6">
                <motion.div whileHover={!reduceMotion ? { y: -3 } : undefined} transition={{ duration: 0.4 }}>
                  <Poster
                    brand={t("ember.poster.brand")}
                    title={t("ember.poster.one.title")}
                    detail={t("ember.poster.one.body")}
                  />
                </motion.div>
                <motion.div whileHover={!reduceMotion ? { y: -3 } : undefined} transition={{ duration: 0.4 }}>
                  <Poster
                    brand={t("ember.poster.brand")}
                    title={t("ember.poster.two.title")}
                    detail={t("ember.poster.two.body")}
                  />
                </motion.div>
              </div>
              <SignagePanel
                title={t("ember.signage.title")}
                subtitle={t("ember.signage.subtitle")}
                body={t("ember.signage.body")}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={digitalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="rounded-[36px] border p-10 relative overflow-hidden"
            style={{ borderColor: SOFT, background: PAPER }}
          >
            <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: grainBg }} />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.5em] mb-6" style={{ color: MUTED }}>
                {t("ember.digital.title")}
              </div>
              <motion.div
                style={{
                  scale: reduceMotion ? 1 : digitalScale,
                  y: reduceMotion ? 0 : digitalSpring,
                  willChange: "transform, opacity",
                  borderColor: SOFT,
                  background: "#f8f1e8",
                }}
                className="rounded-[28px] border overflow-hidden"
              >
                <div className="flex items-center gap-2 px-6 py-4 border-b" style={{ borderColor: SOFT }}>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: INK, opacity: 0.35 }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: INK, opacity: 0.25 }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: INK, opacity: 0.15 }} />
                </div>
                <div className="px-10 py-10 space-y-8">
                  <DigitalScreen
                    subtitle={t("ember.digital.screen1.subtitle")}
                    title={t("ember.digital.screen1.title")}
                    body={t("ember.digital.screen1.body")}
                    tags={[t("ember.digital.tag1"), t("ember.digital.tag2"), t("ember.digital.tag3")]}
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <DigitalScreen
                      subtitle={t("ember.digital.screen2.subtitle")}
                      title={t("ember.digital.screen2.title")}
                      body={t("ember.digital.screen2.body")}
                      tags={[t("ember.digital.tag4"), t("ember.digital.tag5"), t("ember.digital.tag6")]}
                    />
                    <DigitalScreen
                      subtitle={t("ember.digital.screen3.subtitle")}
                      title={t("ember.digital.screen3.title")}
                      body={t("ember.digital.screen3.body")}
                      tags={[t("ember.digital.tag7"), t("ember.digital.tag8"), t("ember.digital.tag9")]}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={closeRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={closeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="rounded-[36px] border p-12 md:p-16 relative overflow-hidden"
            style={{ borderColor: "#3b2f2a", background: ESPRESSO }}
          >
            <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: grainBg }} />
            <div className="relative">
              <EmberWordmark className="w-[240px] md:w-[360px]" fill="#f5efe8" />
              <div className="mt-6 text-lg md:text-xl" style={{ color: "#d6c7bb" }}>
                {t("ember.closing")}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
