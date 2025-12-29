import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

function ProjectRow({ title, meta, body }: { title: string; meta: string; body: string }) {
  return (
    <motion.div
      whileHover={{ x: 6 }}
      transition={{ duration: 0.4 }}
      className="border-b py-6"
      style={{ borderColor: LINE }}
    >
      <div className="flex items-baseline justify-between gap-6">
        <div className="text-lg font-semibold" style={{ color: INK }}>
          {title}
        </div>
        <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
          {meta}
        </div>
      </div>
      <div className="mt-3 text-sm" style={{ color: MUTED }}>
        {body}
      </div>
    </motion.div>
  );
}

function DigitalPanel({ label, title, body, tags }: { label: string; title: string; body: string; tags: string[] }) {
  return (
    <div className="border px-8 py-8" style={{ borderColor: LINE, background: "#ffffff" }}>
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

  const openingRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const digitalRef = useRef<HTMLDivElement>(null);

  const openingInView = useInView(openingRef, { once: true, margin: "-60px" });
  const philosophyInView = useInView(philosophyRef, { once: true, margin: "-60px" });
  const identityInView = useInView(identityRef, { once: true, margin: "-60px" });
  const workInView = useInView(workRef, { once: true, margin: "-60px" });
  const digitalInView = useInView(digitalRef, { once: true, margin: "-60px" });

  const digitalScroll = useScroll({ target: digitalRef, offset: ["start end", "end start"] });
  const digitalShift = useTransform(digitalScroll.scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [12, -12]);

  const stagger = reduceMotion ? 0 : 0.12;

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      <section ref={openingRef} className="pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate={openingInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: stagger } } }}
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-start"
          >
            <motion.div variants={reveal}>
              <span className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                {t("studio.concept")}
              </span>
              <div className="mt-6">
                <NormaWordmark className="w-[260px] md:w-[480px]" />
              </div>
              <div className="mt-8 text-4xl md:text-5xl font-semibold leading-[1.05]" style={{ color: INK }}>
                {t("norma.opening.title")}
              </div>
              <div className="mt-6 text-sm md:text-base" style={{ color: MUTED }}>
                {t("norma.opening.body")}
              </div>
              <div className="mt-5 text-xs uppercase tracking-[0.4em]" style={{ color: INK }}>
                {t("norma.scope")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="border px-10 py-10" style={{ borderColor: LINE, background: "#ffffff" }}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.opening.sheetLabel")}
              </div>
              <div className="mt-8 text-3xl font-semibold" style={{ color: INK }}>
                {t("norma.opening.sheetTitle")}
              </div>
              <div className="mt-6 text-sm" style={{ color: MUTED }}>
                {t("norma.opening.sheetBody")}
              </div>
              <div className="mt-10 border-t pt-6" style={{ borderColor: LINE }}>
                <div className="text-xs uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                  {t("norma.opening.signature")}
                </div>
                <div className="mt-3 text-sm" style={{ color: INK }}>
                  {t("norma.opening.signatureBody")}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={philosophyRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate={philosophyInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: stagger } } }}
            className="grid lg:grid-cols-[0.9fr,1.1fr] gap-12"
          >
            <motion.div variants={reveal}>
              <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                {t("norma.philosophy.label")}
              </div>
              <div className="mt-6 text-3xl md:text-4xl font-semibold leading-[1.1]" style={{ color: INK }}>
                {t("norma.philosophy.title")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="space-y-6 text-sm md:text-base" style={{ color: MUTED }}>
              <p>{t("norma.philosophy.body1")}</p>
              <p>{t("norma.philosophy.body2")}</p>
              <p>{t("norma.philosophy.body3")}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={identityRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate={identityInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: stagger } } }}
            className="grid lg:grid-cols-[0.95fr,1.05fr] gap-12"
          >
            <motion.div variants={reveal} className="space-y-8">
              <div className="text-xs uppercase tracking-[0.4em]" style={{ color: MUTED }}>
                {t("norma.identity.label")}
              </div>
              <NormaWordmark className="w-[240px]" />
              <div className="border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTED }}>
                {t("norma.identity.body")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="space-y-8">
              {[
                {
                  label: t("norma.identity.lockupLabel"),
                  title: t("norma.identity.lockupTitle"),
                  body: t("norma.identity.lockupBody"),
                },
                {
                  label: t("norma.identity.signageLabel"),
                  title: t("norma.identity.signageTitle"),
                  body: t("norma.identity.signageBody"),
                },
              ].map((item) => (
                <div key={item.title} className="border px-10 py-10" style={{ borderColor: LINE, background: "#ffffff" }}>
                  <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                    {item.label}
                  </div>
                  <div className="mt-6 text-2xl font-semibold" style={{ color: INK }}>
                    {item.title}
                  </div>
                  <div className="mt-4 text-sm" style={{ color: MUTED }}>
                    {item.body}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={workRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate={workInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: stagger } } }}
          >
            <motion.div variants={reveal}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.work.label")}
              </div>
              <div className="mt-6 border" style={{ borderColor: LINE, background: "#ffffff" }}>
                <div className="px-10 py-8 border-b" style={{ borderColor: LINE }}>
                  <div className="text-2xl font-semibold" style={{ color: INK }}>
                    {t("norma.work.title")}
                  </div>
                  <div className="mt-3 text-sm" style={{ color: MUTED }}>
                    {t("norma.work.body")}
                  </div>
                </div>
                <div className="px-10 py-6">
                  {["one", "two", "three", "four"].map((key) => (
                    <ProjectRow
                      key={key}
                      title={t(`norma.work.project.${key}.title`)}
                      meta={t(`norma.work.project.${key}.meta`)}
                      body={t(`norma.work.project.${key}.body`)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={digitalRef} className="py-16 md:py-24 border-t" style={{ borderColor: LINE }}>
        <div className="container mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate={digitalInView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: stagger } } }}
            className="space-y-10"
          >
            <motion.div variants={reveal}>
              <div className="text-xs uppercase tracking-[0.5em]" style={{ color: MUTED }}>
                {t("norma.digital.title")}
              </div>
            </motion.div>
            <motion.div variants={reveal} className="border" style={{ borderColor: LINE, background: "#ffffff" }}>
              <div className="border-b px-10 py-8" style={{ borderColor: LINE }}>
                <div className="text-sm uppercase tracking-[0.45em]" style={{ color: MUTED }}>
                  {t("norma.digital.heroLabel")}
                </div>
                <div className="mt-4 text-3xl font-semibold" style={{ color: INK }}>
                  {t("norma.digital.heroTitle")}
                </div>
              </div>
              <motion.div style={{ y: digitalShift }} className="px-10 py-8">
                {["one", "two", "three", "four"].map((key) => (
                  <ProjectRow
                    key={key}
                    title={t(`norma.digital.project.${key}.title`)}
                    meta={t(`norma.digital.project.${key}.meta`)}
                    body={t(`norma.digital.project.${key}.body`)}
                  />
                ))}
              </motion.div>
            </motion.div>
            <motion.div variants={reveal} className="grid lg:grid-cols-2 gap-6">
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
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
