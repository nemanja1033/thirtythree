import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useI18n } from "../i18n/I18nProvider";

const BG = "#f8f8f8";
const INK = "#111111";
const MUTED = "#6b7280";
const LINE = "#e5e7eb";

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

function ProjectLine({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between border-b py-5" style={{ borderColor: LINE }}>
      <div className="text-lg font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
        {meta}
      </div>
    </div>
  );
}

function BoardSheet({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <div className="border p-10" style={{ borderColor: LINE, background: "#ffffff" }}>
      <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
        {label}
      </div>
      <div className="mt-6 text-2xl font-semibold" style={{ color: INK }}>
        {title}
      </div>
      <div className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
        {body}
      </div>
      <div className="mt-8 h-[2px] w-20" style={{ background: INK, opacity: 0.15 }} />
    </div>
  );
}

function DigitalPanel({ label, title, body, tags }: { label: string; title: string; body: string; tags: string[] }) {
  return (
    <div className="border p-8" style={{ borderColor: LINE, background: "#ffffff" }}>
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
          <span key={tag} className="border px-4 py-2 text-[11px] uppercase tracking-[0.35em]" style={{ borderColor: LINE, color: MUTED }}>
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
  const identityRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);
  const applicationsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-60px" });
  const identityInView = useInView(identityRef, { once: true, margin: "-60px" });
  const digitalInView = useInView(digitalRef, { once: true, margin: "-60px" });
  const applicationsInView = useInView(applicationsRef, { once: true, margin: "-60px" });
  const closeInView = useInView(closeRef, { once: true, margin: "-60px" });

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={heroRef} className="pt-24 md:pt-32 pb-16 md:pb-20 relative">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.1, ease }}
            className="grid lg:grid-cols-[1.15fr,0.85fr] gap-12 items-start"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                {t("studio.concept")}
              </span>
              <div className="mt-6">
                <NormaWordmark className="w-[260px] md:w-[480px]" />
              </div>
              <div className="mt-8 text-4xl md:text-5xl font-semibold leading-[1.05]" style={{ color: INK }}>
                {t("norma.hero.headline")}
              </div>
              <div className="mt-6 text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: MUTED }}>
                {t("norma.hero.body")}
              </div>
              <div className="mt-5 text-sm uppercase tracking-[0.35em]" style={{ color: INK }}>
                {t("norma.scope")}
              </div>
            </div>
            <div className="border p-10" style={{ borderColor: LINE, background: "#ffffff" }}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.hero.sheetLabel")}
              </div>
              <div className="mt-8 text-3xl font-semibold" style={{ color: INK }}>
                {t("norma.hero.sheetTitle")}
              </div>
              <div className="mt-6 text-sm" style={{ color: MUTED }}>
                {t("norma.hero.sheetBody")}
              </div>
              <div className="mt-10 border-t pt-6" style={{ borderColor: LINE }}>
                <div className="text-xs uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                  {t("norma.hero.signature")}
                </div>
                <div className="mt-3 text-sm" style={{ color: INK }}>
                  {t("norma.hero.signatureBody")}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={identityRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={identityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="grid lg:grid-cols-[0.9fr,1.1fr] gap-12"
          >
            <div className="space-y-8">
              <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                {t("norma.identity.label")}
              </div>
              <NormaWordmark className="w-[240px]" />
              <div className="border pt-8" style={{ borderColor: LINE }}>
                <div className="text-sm" style={{ color: MUTED }}>
                  {t("norma.identity.body")}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <BoardSheet label={t("norma.identity.lockupLabel")} title={t("norma.identity.lockupTitle")} body={t("norma.identity.lockupBody")} />
              <BoardSheet label={t("norma.identity.signageLabel")} title={t("norma.identity.signageTitle")} body={t("norma.identity.signageBody")} />
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={digitalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="space-y-10"
          >
            <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
              {t("norma.digital.title")}
            </div>
            <div className="border" style={{ borderColor: LINE, background: "#ffffff" }}>
              <div className="border-b px-10 py-8" style={{ borderColor: LINE }}>
                <div className="text-sm uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                  {t("norma.digital.heroLabel")}
                </div>
                <div className="mt-4 text-3xl font-semibold" style={{ color: INK }}>
                  {t("norma.digital.heroTitle")}
                </div>
              </div>
              <div className="px-10 py-8">
                {["one", "two", "three", "four"].map((key) => (
                  <ProjectLine key={key} title={t(`norma.digital.project.${key}.title`)} meta={t(`norma.digital.project.${key}.meta`)} />
                ))}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <DigitalPanel
                label={t("norma.digital.detailLabel")}
                title={t("norma.digital.detailTitle")}
                body={t("norma.digital.detailBody")}
                tags={[t("norma.digital.tag1"), t("norma.digital.tag2"), t("norma.digital.tag3")]}
              />
              <DigitalPanel
                label={t("norma.digital.aboutLabel")}
                title={t("norma.digital.aboutTitle")}
                body={t("norma.digital.aboutBody")}
                tags={[t("norma.digital.tag4"), t("norma.digital.tag5"), t("norma.digital.tag6")]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={applicationsRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={applicationsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12"
          >
            <div>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.applications.label")}
              </div>
              <div className="mt-8 border" style={{ borderColor: LINE, background: "#ffffff" }}>
                <div className="border-b px-10 py-8" style={{ borderColor: LINE }}>
                  <div className="text-sm uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                    {t("norma.applications.boardTitle")}
                  </div>
                </div>
                <div className="px-10 py-8 space-y-6">
                  {["one", "two", "three"].map((key) => (
                    <div key={key}>
                      <div className="text-lg font-semibold" style={{ color: INK }}>
                        {t(`norma.applications.board.${key}.title`)}
                      </div>
                      <div className="mt-2 text-sm" style={{ color: MUTED }}>
                        {t(`norma.applications.board.${key}.body`)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <BoardSheet label={t("norma.applications.poster1.label")} title={t("norma.applications.poster1.title")} body={t("norma.applications.poster1.body")} />
              <BoardSheet label={t("norma.applications.poster2.label")} title={t("norma.applications.poster2.title")} body={t("norma.applications.poster2.body")} />
            </div>
          </motion.div>
        </div>
      </section>

      <section ref={closeRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={closeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0.1 : 1.05, ease }}
            className="border p-12 md:p-16"
            style={{ borderColor: LINE, background: "#ffffff" }}
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
