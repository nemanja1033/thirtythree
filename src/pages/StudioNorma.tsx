import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#f8f8f8";
const INK = "#111111";
const MUTED = "#6b7280";
const SOFT = "#e5e7eb";

function NormaWordmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 560 120" fill="none" stroke={INK} strokeWidth="14" strokeLinecap="square">
      <path d="M10 110V10h20l40 60V10h20v100h-20l-40-60v60z" fill={INK} stroke="none" />
      <rect x="120" y="10" width="80" height="100" fill="none" />
      <path d="M230 110V10h60c20 0 30 10 30 30 0 18-9 28-25 30l30 40h-26l-26-38h-21v38z" fill={INK} stroke="none" />
      <path d="M350 110V10h18l32 48 32-48h18v100h-20V44l-30 42h-2l-30-42v66z" fill={INK} stroke="none" />
      <path d="M500 110l40-100h20l40 100h-22l-8-22h-40l-8 22zM542 70h26l-13-36z" fill={INK} stroke="none" />
    </svg>
  );
}

function NormaPoster({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[26px] border p-8" style={{ borderColor: SOFT, background: "#ffffff" }}>
      <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
        NORMA
      </div>
      <div className="mt-6 text-3xl font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-4 text-sm" style={{ color: MUTED }}>
        {body}
      </div>
      <div className="mt-8 h-[2px] w-16" style={{ background: INK, opacity: 0.15 }} />
    </div>
  );
}

function ProjectTile({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="rounded-[22px] border p-6" style={{ borderColor: SOFT, background: "#ffffff" }}>
      <div className="text-xs uppercase tracking-[0.35em]" style={{ color: MUTED }}>
        {meta}
      </div>
      <div className="mt-4 text-lg font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-6 h-[2px] w-20" style={{ background: INK, opacity: 0.15 }} />
    </div>
  );
}

function DigitalScreen({ label, title, body, tags }: { label: string; title: string; body: string; tags: string[] }) {
  return (
    <div className="rounded-[24px] border p-8" style={{ borderColor: SOFT, background: "#ffffff" }}>
      <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
        {label}
      </div>
      <div className="mt-4 text-2xl font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-4 text-sm" style={{ color: MUTED }}>
        {body}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.35em]" style={{ borderColor: SOFT, color: MUTED }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function StudioNorma() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const conceptInView = useInView(conceptRef, { once: true, margin: "-60px" });
  const identityInView = useInView(identityRef, { once: true, margin: "-60px" });
  const applicationsInView = useInView(applicationsRef, { once: true, margin: "-60px" });
  const digitalInView = useInView(digitalRef, { once: true, margin: "-60px" });
  const closeInView = useInView(closeRef, { once: true, margin: "-60px" });

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(#111111 1px, transparent 1px), linear-gradient(90deg, #111111 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
        <div className="container mx-auto px-6 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.1, ease }}
          >
            <span className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
              {t("studio.concept")}
            </span>
            <div className="mt-6 flex items-end justify-between gap-10">
              <NormaWordmark className="w-[280px] md:w-[520px]" />
              <div className="text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                {t("norma.hero.signature")}
              </div>
            </div>
            <p className="mt-6 text-base md:text-lg max-w-2xl" style={{ color: MUTED }}>
              {t("norma.story")}
            </p>
            <p className="mt-3 text-sm md:text-base" style={{ color: INK }}>
              {t("norma.scope")}
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
                {t("norma.concept.label")}
              </div>
              <div className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05]" style={{ color: INK }}>
                {t("norma.concept.headline")}
              </div>
              <div className="mt-8 text-sm md:text-base leading-relaxed max-w-xl" style={{ color: MUTED }}>
                {t("norma.concept.body")}
              </div>
            </div>
            <div className="rounded-[32px] border p-8" style={{ borderColor: SOFT, background: "#ffffff" }}>
              <div className="text-[10px] uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                {t("norma.concept.blockTitle")}
              </div>
              <div className="mt-6 space-y-6 text-sm" style={{ color: INK }}>
                {["one", "two", "three"].map((key) => (
                  <div key={key}>
                    <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                      {t(`norma.concept.${key}.title`)}
                    </div>
                    <div className="mt-3">{t(`norma.concept.${key}.body`)}</div>
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
            <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: "#ffffff" }}>
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                  {t("norma.identity.logoSystem")}
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                  {t("norma.identity.signature")}
                </div>
              </div>
              <div className="mt-8">
                <NormaWordmark className="w-[240px]" />
              </div>
              <div className="mt-8 rounded-2xl border px-6 py-6" style={{ borderColor: SOFT, background: "#f3f4f6" }}>
                <div className="text-[10px] uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                  {t("norma.identity.lockup")}
                </div>
                <div className="mt-5 text-xs uppercase tracking-[0.6em]" style={{ color: INK }}>
                  STUDIO NORMA
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                  {t("norma.identity.studio")}
                </div>
              </div>
              <div className="mt-8 text-sm" style={{ color: MUTED }}>
                {t("norma.identity.body")}
              </div>
            </div>
            <div className="rounded-[30px] border p-10" style={{ borderColor: SOFT, background: "#ffffff" }}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.identity.typography")}
              </div>
              <div className="mt-8 text-4xl md:text-5xl font-semibold leading-[1.05]" style={{ color: INK }}>
                {t("norma.identity.headline")}
              </div>
              <div className="mt-6 text-sm leading-relaxed" style={{ color: MUTED }}>
                {t("norma.identity.bodyCopy")}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-6">
                {[t("norma.identity.detail1"), t("norma.identity.detail2")].map((item) => (
                  <div key={item} className="rounded-2xl border px-5 py-5 text-[11px] uppercase tracking-[0.35em]" style={{ borderColor: SOFT, color: MUTED, background: "#f3f4f6" }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={applicationsRef} className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={applicationsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 md:gap-10"
          >
            <div className="space-y-8">
              <div className="rounded-[32px] border p-10" style={{ borderColor: SOFT, background: "#ffffff" }}>
                <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                  {t("norma.applications.portfolio")}
                </div>
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  {["one", "two", "three", "four"].map((key) => (
                    <ProjectTile
                      key={key}
                      title={t(`norma.applications.project.${key}.title`)}
                      meta={t(`norma.applications.project.${key}.meta`)}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-[32px] border p-10" style={{ borderColor: SOFT, background: "#111111" }}>
                <div className="text-xs uppercase tracking-[0.5em]" style={{ color: "#cbd5f5" }}>
                  {t("norma.applications.wallMark")}
                </div>
                <div className="mt-10 flex items-center justify-center">
                  <NormaWordmark className="w-[240px]" />
                </div>
                <div className="mt-6 text-sm" style={{ color: "#9ca3af" }}>
                  {t("norma.applications.wallBody")}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <NormaPoster title={t("norma.poster.one.title")} body={t("norma.poster.one.body")} />
              <NormaPoster title={t("norma.poster.two.title")} body={t("norma.poster.two.body")} />
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
            style={{ borderColor: SOFT, background: "#ffffff" }}
          >
            <div className="text-xs uppercase tracking-[0.5em] mb-6" style={{ color: MUTED }}>
              {t("norma.digital.title")}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <DigitalScreen
                label={t("norma.digital.screen1.label")}
                title={t("norma.digital.screen1.title")}
                body={t("norma.digital.screen1.body")}
                tags={[t("norma.digital.tag1"), t("norma.digital.tag2"), t("norma.digital.tag3")]}
              />
              <DigitalScreen
                label={t("norma.digital.screen2.label")}
                title={t("norma.digital.screen2.title")}
                body={t("norma.digital.screen2.body")}
                tags={[t("norma.digital.tag4"), t("norma.digital.tag5"), t("norma.digital.tag6")]}
              />
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
            style={{ borderColor: SOFT, background: "#ffffff" }}
          >
            <NormaWordmark className="w-[240px] md:w-[360px]" />
            <div className="mt-6 text-lg md:text-xl" style={{ color: MUTED }}>
              {t("norma.closing")}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
