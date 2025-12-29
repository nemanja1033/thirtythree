import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#0b0b14";
const OFF_WHITE = "#f8fafc";
const MUTED = "#cbd5f5";
const BORDER = "#1f2937";

function PulseMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 48" fill="none">
      <path d="M0 24h18l8-14 10 28 10-20 8 6h66" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PulseWordmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 520 120" fill={OFF_WHITE}>
      <rect x="0" y="0" width="18" height="120" />
      <rect x="0" y="0" width="70" height="18" />
      <rect x="0" y="51" width="70" height="18" />
      <rect x="52" y="18" width="18" height="33" />
      <rect x="120" y="0" width="18" height="90" />
      <rect x="172" y="0" width="18" height="90" />
      <rect x="120" y="90" width="70" height="18" />
      <rect x="240" y="0" width="18" height="120" />
      <rect x="240" y="102" width="70" height="18" />
      <rect x="340" y="0" width="70" height="18" />
      <rect x="340" y="51" width="70" height="18" />
      <rect x="340" y="102" width="70" height="18" />
      <rect x="340" y="18" width="18" height="33" />
      <rect x="392" y="69" width="18" height="33" />
      <rect x="440" y="0" width="18" height="120" />
      <rect x="440" y="0" width="70" height="18" />
      <rect x="440" y="51" width="60" height="18" />
      <rect x="440" y="102" width="70" height="18" />
    </svg>
  );
}

function CampaignTile({ label, title, body, accent }: { label: string; title: string; body: string; accent: string }) {
  return (
    <div className="rounded-[24px] border p-6" style={{ borderColor: BORDER, background: "#0f172a" }}>
      <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
        {label}
      </div>
      <div className="mt-4 text-xl font-semibold" style={{ color: OFF_WHITE }}>
        {title}
      </div>
      <div className="mt-3 text-sm" style={{ color: MUTED }}>
        {body}
      </div>
      <div className="mt-6 h-2 w-24 rounded-full" style={{ background: accent }} />
    </div>
  );
}

function FormatTile({ label, title, body, accent }: { label: string; title: string; body: string; accent: string }) {
  return (
    <div className="rounded-[24px] border p-6" style={{ borderColor: BORDER, background: "#0f172a" }}>
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
          {label}
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
          {title}
        </span>
      </div>
      <div className="mt-6 text-sm" style={{ color: OFF_WHITE }}>
        {body}
      </div>
      <div className="mt-6 h-32 rounded-2xl" style={{ background: accent, opacity: 0.2 }} />
    </div>
  );
}

function BannerStrip({ text, accent }: { text: string; accent: string }) {
  return (
    <div className="rounded-[20px] border px-6 py-5" style={{ borderColor: BORDER, background: "#0f172a" }}>
      <div className="text-sm uppercase tracking-[0.45em]" style={{ color: OFF_WHITE }}>
        {text}
      </div>
      <div className="mt-4 h-[3px] w-24" style={{ background: accent }} />
    </div>
  );
}

export default function PulseCampaign() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const formatsRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const conceptInView = useInView(conceptRef, { once: true, margin: "-60px" });
  const systemInView = useInView(systemRef, { once: true, margin: "-60px" });
  const formatsInView = useInView(formatsRef, { once: true, margin: "-60px" });
  const digitalInView = useInView(digitalRef, { once: true, margin: "-60px" });
  const closeInView = useInView(closeRef, { once: true, margin: "-60px" });

  const ease = [0.16, 1, 0.3, 1] as const;

  const accents = ["#f43f5e", "#f97316", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
          >
            <span className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              {t("studio.concept")}
            </span>
            <div className="mt-6 flex flex-col gap-4">
              <PulseWordmark className="w-[260px] md:w-[420px]" />
              <PulseMark className="w-[160px]" />
            </div>
            <p className="mt-6 text-base md:text-lg max-w-2xl" style={{ color: MUTED }}>
              {t("pulse.story")}
            </p>
            <p className="mt-3 text-sm md:text-base" style={{ color: OFF_WHITE }}>
              {t("pulse.scope")}
            </p>
          </motion.div>
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
                {t("pulse.concept.label")}
              </div>
              <div className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05]" style={{ color: OFF_WHITE }}>
                {t("pulse.concept.headline")}
              </div>
              <div className="mt-8 text-sm md:text-base leading-relaxed max-w-xl" style={{ color: MUTED }}>
                {t("pulse.concept.body")}
              </div>
            </div>
            <div className="rounded-[28px] border p-8" style={{ borderColor: BORDER, background: "#0f172a" }}>
              <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                {t("pulse.concept.blockTitle")}
              </div>
              <div className="mt-6 space-y-6 text-sm" style={{ color: OFF_WHITE }}>
                {["one", "two", "three"].map((key) => (
                  <div key={key}>
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      {t(`pulse.concept.${key}.title`)}
                    </div>
                    <div className="mt-3" style={{ color: OFF_WHITE }}>
                      {t(`pulse.concept.${key}.body`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={systemRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={systemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="grid lg:grid-cols-3 gap-6 md:gap-8"
          >
            {["one", "two", "three"].map((key, index) => (
              <CampaignTile
                key={key}
                label={t(`pulse.system.${key}.label`)}
                title={t(`pulse.system.${key}.title`)}
                body={t(`pulse.system.${key}.body`)}
                accent={accents[index % accents.length]}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={formatsRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={formatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {["one", "two", "three"].map((key, index) => (
              <FormatTile
                key={key}
                label={t(`pulse.formats.${key}.label`)}
                title={t(`pulse.formats.${key}.title`)}
                body={t(`pulse.formats.${key}.body`)}
                accent={accents[(index + 2) % accents.length]}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={formatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease, delay: reduceMotion ? 0 : 0.08 }}
            className="mt-10 grid md:grid-cols-2 gap-6"
          >
            <BannerStrip text={t("pulse.banners.one")} accent={accents[4]} />
            <BannerStrip text={t("pulse.banners.two")} accent={accents[1]} />
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={digitalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="rounded-[36px] border p-10"
            style={{ borderColor: BORDER, background: "#0f172a" }}
          >
            <div className="text-xs uppercase tracking-[0.5em] mb-6" style={{ color: MUTED }}>
              {t("pulse.digital.title")}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-[24px] border p-8" style={{ borderColor: BORDER, background: "#111827" }}>
                <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                  {t("pulse.digital.screen1.label")}
                </div>
                <div className="mt-4 text-2xl font-semibold" style={{ color: OFF_WHITE }}>
                  {t("pulse.digital.screen1.title")}
                </div>
                <div className="mt-4 text-sm" style={{ color: MUTED }}>
                  {t("pulse.digital.screen1.body")}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[t("pulse.digital.tag1"), t("pulse.digital.tag2"), t("pulse.digital.tag3")].map((tag) => (
                    <span key={tag} className="rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.35em]" style={{ borderColor: BORDER, color: MUTED }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[24px] border p-8" style={{ borderColor: BORDER, background: "#111827" }}>
                <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                  {t("pulse.digital.screen2.label")}
                </div>
                <div className="mt-4 text-2xl font-semibold" style={{ color: OFF_WHITE }}>
                  {t("pulse.digital.screen2.title")}
                </div>
                <div className="mt-4 text-sm" style={{ color: MUTED }}>
                  {t("pulse.digital.screen2.body")}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[t("pulse.digital.tag4"), t("pulse.digital.tag5"), t("pulse.digital.tag6")].map((tag) => (
                    <span key={tag} className="rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.35em]" style={{ borderColor: BORDER, color: MUTED }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
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
            className="rounded-[36px] border p-12 md:p-16"
            style={{ borderColor: BORDER, background: "#0f172a" }}
          >
            <PulseWordmark className="w-[240px] md:w-[360px]" />
            <div className="mt-6 text-lg md:text-xl" style={{ color: MUTED }}>
              {t("pulse.closing")}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
