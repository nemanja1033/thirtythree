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
    <svg className={className} viewBox="0 0 580 120" fill={fill}>
      <rect x="0" y="0" width="18" height="120" rx="4" />
      <rect x="0" y="0" width="74" height="18" rx="4" />
      <rect x="0" y="51" width="58" height="18" rx="4" />
      <rect x="0" y="102" width="74" height="18" rx="4" />
      <rect x="112" y="0" width="18" height="120" rx="4" />
      <rect x="194" y="0" width="18" height="120" rx="4" />
      <polygon points="130,0 150,0 176,62 156,62" />
      <polygon points="176,62 196,0 216,0 196,62" />
      <rect x="252" y="0" width="18" height="120" rx="4" />
      <rect x="252" y="0" width="72" height="18" rx="4" />
      <rect x="252" y="51" width="72" height="18" rx="4" />
      <rect x="252" y="102" width="72" height="18" rx="4" />
      <rect x="304" y="18" width="18" height="33" rx="4" />
      <rect x="304" y="69" width="18" height="33" rx="4" />
      <rect x="350" y="0" width="18" height="120" rx="4" />
      <rect x="350" y="0" width="74" height="18" rx="4" />
      <rect x="350" y="51" width="58" height="18" rx="4" />
      <rect x="350" y="102" width="74" height="18" rx="4" />
      <rect x="460" y="0" width="18" height="120" rx="4" />
      <rect x="460" y="0" width="72" height="18" rx="4" />
      <rect x="460" y="51" width="72" height="18" rx="4" />
      <rect x="514" y="18" width="18" height="33" rx="4" />
      <polygon points="478,74 534,120 506,120 462,86" />
    </svg>
  );
}

function CupMock({ label, tone }: { label: string; tone: "light" | "dark" }) {
  return (
    <div className="relative w-full">
      <div
        className="mx-auto w-40 h-52 rounded-b-[38px] rounded-t-[28px] border relative"
        style={{
          borderColor: tone === "light" ? SOFT : "#3b2f2a",
          background:
            tone === "light"
              ? "linear-gradient(180deg, #fbf4ec 0%, #f0e1d2 100%)"
              : "linear-gradient(180deg, #3b2f2a 0%, #1f1714 100%)",
        }}
      >
        <div
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full border"
          style={{ borderColor: tone === "light" ? SOFT : "#4b3a33", background: tone === "light" ? "#f7efe6" : "#2c211d" }}
        />
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-16 rounded-full"
          style={{ background: tone === "light" ? "#f4e7da" : "#2c211d" }}
        />
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-28 h-14 rounded-xl border"
          style={{ borderColor: tone === "light" ? SOFT : "#4b3a33", background: tone === "light" ? "#efe2d6" : "#3a2b25" }}
        >
          <div className="mt-3 flex items-center justify-center">
            <EmberWordmark className="w-20" fill={tone === "light" ? INK : "#f5efe8"} />
          </div>
        </div>
        <div
          className="absolute top-3 right-6 w-10 h-10 rounded-full"
          style={{ background: tone === "light" ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)" }}
        />
      </div>
      <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-center" style={{ color: MUTED }}>
        {label}
      </div>
    </div>
  );
}

function BagMock() {
  return (
    <div className="relative rounded-[28px] border p-6" style={{ borderColor: SOFT, background: "#efe2d6" }}>
      <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
        Coffee bag
      </div>
      <div className="mt-5 relative h-44 rounded-2xl border" style={{ borderColor: SOFT, background: "#f6efe6" }}>
        <div className="absolute -top-5 left-6 right-6 h-6 rounded-full" style={{ background: "#e6d5c5" }} />
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl border"
          style={{ borderColor: SOFT, background: "#f1e1d2" }}
        >
          <div className="mt-3 flex items-center justify-center">
            <EmberMark className="w-10 h-10" />
          </div>
          <div className="mt-2 text-[9px] uppercase tracking-[0.4em] text-center" style={{ color: MUTED }}>
            Lot 09
          </div>
        </div>
        <div className="absolute bottom-4 left-6 text-[11px]" style={{ color: MUTED }}>
          Notes: cacao, toasted almond, burnt sugar.
        </div>
      </div>
    </div>
  );
}

function LabelSheet() {
  const labels = ["Ritual", "Slow Pour", "House Blend", "Seasonal", "Ember", "Calm"];
  return (
    <div className="rounded-[28px] border p-6" style={{ borderColor: SOFT, background: "#f6efe6" }}>
      <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
        Label sheet
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {labels.map((label) => (
          <div key={label} className="rounded-full border px-3 py-4" style={{ borderColor: SOFT, background: "#f1e1d2" }}>
            <div className="text-[9px] uppercase tracking-[0.35em] text-center" style={{ color: INK }}>
              {label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-[11px]" style={{ color: MUTED }}>
        Uncoated paper, matte ink, tactile emboss.
      </div>
    </div>
  );
}

function MenuSpread() {
  const espresso = [
    ["Ritual Espresso", "2.40"],
    ["Ember Latte", "3.60"],
    ["Oat Flat", "3.40"],
    ["Warm Spice", "3.80"],
  ];
  const filter = [
    ["Kalita", "3.40"],
    ["Chemex", "3.60"],
    ["V60", "3.20"],
  ];
  const specials = [
    ["Golden Milk", "4.10"],
    ["Cacao Tonic", "4.40"],
  ];
  return (
    <div className="rounded-[30px] border p-8" style={{ borderColor: SOFT, background: "#f8f1e8" }}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
            Menu
          </div>
          <div className="mt-2 text-2xl font-semibold" style={{ color: INK }}>
            Quiet Morning Menu
          </div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
          Winter 24
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-8 text-sm" style={{ color: INK }}>
        <div>
          <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            Espresso
          </div>
          <div className="mt-4 space-y-3">
            {espresso.map(([name, price]) => (
              <div key={name} className="flex items-center justify-between">
                <span>{name}</span>
                <span style={{ color: MUTED }}>{price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[11px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            Filter
          </div>
          <div className="mt-4 space-y-3">
            {filter.map(([name, price]) => (
              <div key={name} className="flex items-center justify-between">
                <span>{name}</span>
                <span style={{ color: MUTED }}>{price}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            Seasonal
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
              Notes
            </div>
            <div className="mt-3 text-[13px]" style={{ color: INK }}>
              Milk options: oat, almond, whole. Single origin rotation every week.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Poster({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[28px] border p-8 h-full" style={{ borderColor: SOFT, background: "#efe2d6" }}>
      <div className="text-[10px] uppercase tracking-[0.6em]" style={{ color: MUTED }}>
        Ember
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

function SignagePanel() {
  return (
    <div className="rounded-[28px] border p-10" style={{ borderColor: "#3a2a25", background: ESPRESSO }}>
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: "#d6c7bb" }}>
          Signage
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#d6c7bb" }}>
          Window decal
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center rounded-2xl border py-10" style={{ borderColor: "#3b2f2a" }}>
        <EmberWordmark className="w-[240px]" fill="#f5efe8" />
      </div>
      <div className="mt-6 text-sm" style={{ color: "#d6c7bb" }}>
        Exterior plaque and etched glass mark for a quiet night glow.
      </div>
    </div>
  );
}

function BrandSheet() {
  return (
    <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: "#f8f1e8" }}>
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
          Logo system
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
          Primary / Secondary
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-8">
        <div className="flex items-center justify-between gap-6">
          <EmberWordmark className="w-[260px]" />
          <div className="flex items-center gap-6">
            <EmberMark className="w-14 h-14" />
            <div className="text-xs uppercase tracking-[0.35em]" style={{ color: MUTED }}>
              Ritual mark
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-2xl border px-6 py-6" style={{ borderColor: SOFT, background: "#f1e1d2" }}>
            <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: MUTED }}>
              Secondary lockup
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                EMBER
              </div>
              <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                COFFEE HOUSE
              </div>
            </div>
          </div>
          <div className="rounded-2xl border px-6 py-6" style={{ borderColor: SOFT, background: "#f1e1d2" }}>
            <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: MUTED }}>
              Safe space
            </div>
            <div className="mt-6 relative h-16">
              <div className="absolute inset-0 border border-dashed" style={{ borderColor: "#d5c6ba" }} />
              <div className="absolute inset-4 border" style={{ borderColor: SOFT }} />
              <div className="absolute inset-6 flex items-center justify-center">
                <EmberMark className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypeSystem() {
  return (
    <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: "#efe2d6" }}>
      <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
        Typography
      </div>
      <div className="mt-8 space-y-4">
        <div className="text-5xl md:text-6xl font-semibold leading-[1.05]" style={{ color: INK }}>
          Ritual over rush.
        </div>
        <div className="text-2xl md:text-3xl" style={{ color: INK }}>
          Warmth in the details.
        </div>
        <div className="text-sm md:text-base leading-relaxed max-w-xl" style={{ color: MUTED }}>
          The type system leans into calm contrast: expressive headlines and soft body copy that reads like a quiet
          invitation.
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm" style={{ color: INK }}>
        <div>
          <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            Headline
          </div>
          <div className="mt-3 text-3xl font-semibold">Slow mornings. Golden light.</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
            Body
          </div>
          <div className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
            EMBER is the pause before the day accelerates. The tone stays warm, tactile, and human in every line.
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorSpread() {
  const swatches = [
    { name: "Off White", hex: "#f5efe8" },
    { name: "Ember", hex: "#c97c4b" },
    { name: "Warm Stone", hex: "#b3886b" },
    { name: "Deep Brown", hex: "#3b2f2a" },
  ];
  return (
    <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: PAPER }}>
      <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
        Color in use
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {swatches.map((swatch) => (
          <div key={swatch.name} className="rounded-2xl border p-4" style={{ borderColor: SOFT, background: "#f8f1e8" }}>
            <div className="h-12 rounded-xl" style={{ background: swatch.hex }} />
            <div className="mt-3 text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              {swatch.name}
            </div>
            <div className="mt-2 text-[11px]" style={{ color: INK }}>
              Used on menus, packaging, and warm lighting cues.
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border px-6 py-5" style={{ borderColor: SOFT, background: "#3b2f2a" }}>
        <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: "#e6d8cb" }}>
          Espresso contrast
        </div>
        <div className="mt-3 text-sm" style={{ color: "#f5efe8" }}>
          Dark surfaces add depth and spotlight the warm accent tones.
        </div>
      </div>
    </div>
  );
}

function DigitalScreen({ title, subtitle, body }: { title: string; subtitle: string; body: string }) {
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
        {["Visit", "Menu", "Story"].map((label) => (
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
  const digitalY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [30, -40]);
  const digitalScale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1, 1, 1] : [0.98, 1, 0.96]);
  const digitalSpring = useSpring(digitalY, { stiffness: 70, damping: 28 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 20%, #fff7ef 0%, #f4e7da 38%, #d9c0ab 70%, #b07b5c 100%)" }} />
        <div className="absolute inset-0 opacity-[0.22]" style={{ backgroundImage: grainBg }} />
        <div className="container mx-auto px-6 md:px-8 relative">
          <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 md:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 0.9, ease: "easeOut" }}
            >
              <span className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("studio.concept")}
              </span>
              <div className="mt-8 overflow-hidden">
                <motion.div
                  initial={{ y: reduceMotion ? 0 : 90 }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: reduceMotion ? 0.1 : 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <EmberWordmark className="w-[320px] md:w-[560px]" />
                </motion.div>
              </div>
              <p className="mt-8 text-lg md:text-xl leading-relaxed max-w-2xl" style={{ color: MUTED }}>
                {t("ember.story")}
              </p>
              <p className="mt-4 text-sm md:text-base" style={{ color: INK }}>
                {t("ember.scope")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: reduceMotion ? 0.1 : 0.9, delay: reduceMotion ? 0 : 0.1 }}
              className="rounded-[36px] border p-10 relative overflow-hidden"
              style={{ borderColor: SOFT, background: "linear-gradient(160deg, #fdf6ee 0%, #f1e1d2 60%, #d6b79c 100%)" }}
            >
              <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: grainBg }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 20%, rgba(255,255,255,0.45) 0%, rgba(0,0,0,0.15) 65%)" }} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <EmberMark className="w-20 h-20" />
                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      Ritual mark
                    </div>
                    <div className="text-lg font-semibold" style={{ color: INK }}>
                      Heat halo + cutline
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                    EMBER
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                    COFFEE HOUSE
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-3">
                  {[
                    "Warm ritual",
                    "Slow pace",
                    "Tactile detail",
                  ].map((label) => (
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
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={conceptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.9 }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 md:gap-16 items-start"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                Concept
              </div>
              <div className="mt-6 text-4xl md:text-5xl font-semibold leading-[1.05]" style={{ color: INK }}>
                A coffee house built around quiet moments, ritual, and the glow of slow mornings.
              </div>
              <div className="mt-8 text-sm md:text-base leading-relaxed max-w-xl" style={{ color: MUTED }}>
                EMBER pushes against fast coffee culture. The brand is warm, grounded, and tactile—designed to make the
                space feel lived in and human, from the first pour to the last sip.
              </div>
            </div>
            <div className="rounded-[32px] border p-8" style={{ borderColor: SOFT, background: PAPER }}>
              <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                Brand idea
              </div>
              <div className="mt-6 space-y-6 text-sm" style={{ color: INK }}>
                <div>
                  <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                    Ritual over rush
                  </div>
                  <div className="mt-3">
                    Every detail is designed to feel like a pause, not a transaction.
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                    Warmth in the room
                  </div>
                  <div className="mt-3">
                    Materials and tone stay soft, tactile, and quietly premium.
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                    Slow craft
                  </div>
                  <div className="mt-3">Designed to hold up to daily use and still feel intimate.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={identityRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={identityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.9 }}
            className="grid lg:grid-cols-2 gap-8 md:gap-10"
          >
            <BrandSheet />
            <TypeSystem />
            <ColorSpread />
            <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: "#f1e1d2" }}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                Materials
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  "Uncoated paper",
                  "Embossed stamp",
                  "Raw cotton",
                  "Matte ink",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border px-5 py-6 text-[11px] uppercase tracking-[0.3em]"
                    style={{ borderColor: SOFT, color: MUTED, background: "#f8f1e8" }}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-sm" style={{ color: MUTED }}>
                Warm surfaces and tactile printing bring the identity into the room.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={appsRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={appsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.9 }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 md:gap-10"
          >
            <div className="space-y-8">
              <div className="rounded-[32px] border p-10" style={{ borderColor: SOFT, background: PAPER }}>
                <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                  Packaging
                </div>
                <div className="mt-8 grid grid-cols-2 gap-6 items-end">
                  <CupMock label="Takeaway" tone="light" />
                  <CupMock label="Night bar" tone="dark" />
                  <div className="col-span-2">
                    <BagMock />
                  </div>
                </div>
              </div>
              <MenuSpread />
            </div>
            <div className="space-y-8">
              <div className="grid gap-6">
                <Poster title="Ritual over rush." detail="Slow coffee, warm light, and a quiet table to reset." />
                <Poster title="Golden hour brews." detail="Seasonal pours with soft spice and toasted sugar." />
              </div>
              <SignagePanel />
              <LabelSheet />
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={digitalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.9 }}
            className="rounded-[36px] border p-10 relative overflow-hidden"
            style={{ borderColor: SOFT, background: PAPER }}
          >
            <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: grainBg }} />
            <div className="relative">
              <div className="text-xs uppercase tracking-[0.5em] mb-6" style={{ color: MUTED }}>
                Digital experience
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
                    subtitle="Homepage"
                    title="EMBER COFFEE HOUSE"
                    body="A quiet place to slow down. Ritual, warmth, and the soft glow of morning light."
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <DigitalScreen
                      subtitle="Menu"
                      title="Seasonal ritual menu"
                      body="Espresso, filter, and warm seasonal pours presented with calm typographic rhythm."
                    />
                    <DigitalScreen
                      subtitle="Story"
                      title="A place built on slowness"
                      body="Origin rotation, daily bake, and the craft behind every pour — presented with softness."
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
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={closeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 0.9 }}
            className="rounded-[36px] border p-12 md:p-16 relative overflow-hidden"
            style={{ borderColor: "#3b2f2a", background: ESPRESSO }}
          >
            <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: grainBg }} />
            <div className="relative">
              <EmberWordmark className="w-[240px] md:w-[360px]" fill="#f5efe8" />
              <div className="mt-6 text-lg md:text-xl" style={{ color: "#d6c7bb" }}>
                A brand designed to feel warm, lived-in, and quietly unforgettable.
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
