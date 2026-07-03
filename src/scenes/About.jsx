import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import PageBackground from "../components/ui/PageBackground";

/* ====== Data (ajusta a tu historia real) ====== */
const TIMELINE = [
  {
    year: "2025 — Present",
    title: "Data Analyst • Intelcon System",
    blurb:
      "Turning raw business data into clear, actionable insights — building dashboards, modeling data and automating reporting pipelines to support day-to-day decisions.",
    tag: "Data",
    current: true,
  },
  {
    year: "2025",
    title: "Software Developer • Data & Backend Focus",
    blurb:
      "Designing APIs with NestJS, relational and NoSQL modeling, and pragmatic testing practices. Leading small sprints, mentoring peers, and focusing on maintainable systems.",
    tag: "Role",
  },
  {
    year: "2024",
    title: "Teaching Assistant • Databases II & Software Engineering (UNIMET)",
    blurb:
      "While studying Systems Engineering, I supported courses in NoSQL (MongoDB, Neo4j), ETL with Pentaho, backend with NestJS, and Agile (Scrum). Strengthened expertise in query design and backend clarity.",
    tag: "Teaching",
  },
  {
    year: "2024",
    title: "Project Winner • MetroTour (Unity)",
    blurb:
      "Awarded Best Project in ‘Digital Content for the Metaverse’. Built an interactive Unity experience, highlighting product sense, cross-functional teamwork, and polished UX.",
    tag: "Project",
  },
  {
    year: "2023",
    title: "Teaching Assistant • Databases I (UNIMET)",
    blurb:
      "As a Systems Engineering student, I guided peers in PostgreSQL and relational database design.",
    tag: "Teaching",
  },
  {
    year: "2023",
    title: "Diplomas • Software Development & Data Design",
    blurb:
      "Completed intensive studies in algorithms, data structures, databases, information systems, and computer architecture — building a strong CS foundation.",
    tag: "Certification",
  },
  {
    year: "2022 — Present",
    title: "Systems Engineering Student • UNIMET",
    blurb:
      "Currently pursuing a degree in Systems Engineering, focusing on backend clarity, data pipelines, and scalable systems. Balancing coursework with teaching assistantships and real-world projects.",
    tag: "Education",
    current: true,
  },
  {
    year: "2020",
    title: "Medical Doctor • UCV",
    blurb:
      "Graduated 6th out of 169 at UCV, with hands-on training in high-pressure hospital environments under resource-limited conditions. This experience honed precision, adaptability, and decision-making under uncertainty — qualities I now apply to building thoughtful, resilient software systems.",
    tag: "Background",
  },
];

const CERTS = [
  { name: "Rector’s List — UNIMET", meta: "Academic Excellence (2023)" },
  { name: "PostgreSQL — Databases I (TA)", meta: "Relational modeling & SQL" },
  { name: "MongoDB & Neo4j — Databases II (TA)", meta: "NoSQL & Graph data" },
  { name: "ETL — Pentaho Data Integration", meta: "Pipelines & dimensional thinking" },
  { name: "NestJS — Backend Engineering", meta: "Auth, testing, Swagger docs" },
  { name: "Agile — Scrum Practices", meta: "Team delivery & iteration" },
];

/* ====== Motion presets ====== */
const EASE = [0.2, 0.65, 0.3, 0.9];
const SPRING = { type: "spring", stiffness: 260, damping: 24 };
const fadeIn = (d = 0) => ({
  initial: { y: 16, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.6, ease: EASE, delay: d },
});

/* Paleta de acento por tipo de hito — azul / morado / teal de marca */
const TAG_META = {
  Data: { rgb: "0,200,180" },
  Role: { rgb: "91,108,255" },
  Teaching: { rgb: "194,91,255" },
  Project: { rgb: "91,108,255" },
  Certification: { rgb: "0,200,180" },
  Education: { rgb: "255,255,255" },
  Background: { rgb: "255,255,255" },
};
const tagColor = (tag, a = 1) => `rgba(${(TAG_META[tag] || TAG_META.Education).rgb},${a})`;

export default function About() {
  const timelineRef = useRef(null);
  // El scroll real de la app ocurre dentro de #root (ver index.css: html/body/#root
  // son overflow-y:auto con height:100%), no en `window` — hay que apuntar el
  // useScroll de Framer a ese contenedor para que el progreso se actualice.
  const scrollContainerRef = useRef(null);
  if (scrollContainerRef.current === null && typeof document !== "undefined") {
    scrollContainerRef.current = document.getElementById("root");
  }
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    container: scrollContainerRef,
    offset: ["start 0.8", "end 0.35"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative min-h-screen text-white">
      <Seo
        title="About"
        description="Systems Engineering student and Software Developer, teaching assistant, and physician — bringing precision, empathy and rigor to reliable, human-centered software."
        path="/about"
      />
      <PageBackground />

      <Navbar />

      {/* ===== Contenido ===== */}
      <main className="relative z-10">
        {/* HERO */}
        <section className="pt-28 pb-12">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <motion.div {...fadeIn(0)}>
              <Eyebrow>About me</Eyebrow>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
                I build systems that feel clear.
              </h1>
              <p className="mt-4 max-w-2xl text-white/75">
                Systems Engineering student and Software Developer specializing in backend clarity and data pipelines.
                Teaching assistant in Databases and Software Engineering, recognized for academic excellence.
                With a background as a physician, I bring precision, empathy, and rigor to building reliable, human-centered software systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="pb-16">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <motion.h2
              className="text-sm uppercase tracking-wider text-white/70"
              {...fadeIn(0.05)}
            >
              Journey
            </motion.h2>

            <div ref={timelineRef} className="relative mt-10">
              {/* Spina: riel base + riel de progreso animado con el scroll */}
              <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/10" />
              <motion.div
                className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-px h-full origin-top"
                style={{
                  scaleY: lineScale,
                  background: "linear-gradient(180deg,#5b6cff,#a25bff,#ff5fa8)",
                  boxShadow: "0 0 12px rgba(160,110,255,0.55)",
                }}
              />

              <div className="flex flex-col gap-10">
                {TIMELINE.map((item, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={item.year + item.title}
                      className="relative pl-12 md:pl-0 grid grid-cols-1 md:grid-cols-3 items-stretch"
                      initial={{ opacity: 0, y: 24, x: isLeft ? -24 : 24 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ ...SPRING, delay: 0.04 * i }}
                    >
                      <div className="md:pr-2 max-w-[460px] lg:w-[460px] ml-auto">
                        {isLeft && <div className="md:pr-6"><Card item={item} /></div>}
                      </div>

                      <div className="absolute left-4 md:static md:flex md:col-span-1 md:justify-center -translate-x-1/2 md:translate-x-0 top-1">
                        <Node item={item} />
                      </div>

                      <div className="md:col-span-1 max-w-[460px] lg:w-[460px]">
                        {!isLeft && <div className="md:pl-6"><Card item={item} /></div>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section className="pb-16">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <motion.h2
              className="text-sm uppercase tracking-wider text-white/70"
              {...fadeIn(0)}
            >
              Certifications
            </motion.h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CERTS.map((c, i) => (
                <motion.div
                  key={c.name}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.02 * i }}
                >
                  <div className="text-base md:text-lg font-extrabold">
                    {c.name}
                  </div>
                  <div className="text-xs text-white/60 mt-1">{c.meta}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="pb-24">
          <div className="mx-auto w-[min(1100px,92vw)] text-center">
            <motion.h3
              className="text-xl md:text-2xl font-extrabold"
              {...fadeIn(0)}
            >
              Let’s build something meaningful.
            </motion.h3>
            <motion.p
              className="mt-2 text-white/70 max-w-2xl mx-auto"
              {...fadeIn(0.05)}
            >
              Happy to share code, walk through a case, or tailor materials for
              your team’s context.
            </motion.p>
            <motion.div
              className="mt-6 flex justify-center gap-3"
              {...fadeIn(0.1)}
            >
              <Button to="/contact" variant="primary" size="lg">
                Contact →
              </Button>
              <Button to="/projects" variant="secondary" size="lg">
                View projects
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="h-8" />
      </main>
    </div>
  );
}

/* ====== Subcomponentes ====== */
function Card({ item }) {
  const c = tagColor(item.tag, 1);
  return (
    <motion.div
      className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 overflow-hidden"
      whileHover={{ y: -4, borderColor: tagColor(item.tag, 0.4) }}
      transition={SPRING}
    >
      {/* glow de acento en hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(240px 120px at 0% 0%, ${tagColor(item.tag, 0.14)}, transparent 70%)`,
        }}
      />
      <div className="relative flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wide border"
          style={{ borderColor: tagColor(item.tag, 0.3), backgroundColor: tagColor(item.tag, 0.1) }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />
          {item.tag}
        </span>
        <span className="text-xs text-white/60">{item.year}</span>
        {item.current && (
          <span className="ml-auto text-[10px] uppercase tracking-wide text-white/50">Ongoing</span>
        )}
      </div>
      <h3 className="relative mt-1 text-lg md:text-xl font-extrabold">{item.title}</h3>
      <p className="relative mt-1.5 text-sm text-white/70 leading-relaxed">
        {item.blurb}
      </p>
    </motion.div>
  );
}

function Node({ item }) {
  const color = tagColor(item.tag, 0.95);
  return (
    <div className="relative flex flex-col items-center">
      {/* halo pulsante para hitos vigentes ("Present") */}
      {item.current && (
        <motion.span
          className="absolute top-0 h-3.5 w-3.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {/* punto */}
      <motion.div
        className="relative h-3.5 w-3.5 rounded-full ring-2 ring-white/20"
        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
        whileHover={{ scale: 1.3 }}
        transition={SPRING}
        title={`${item.year} – ${item.tag}`}
      />
      {/* año */}
      <div className="hidden md:block mt-2 text-xs text-white/60 whitespace-nowrap">{item.year}</div>
    </div>
  );
}
