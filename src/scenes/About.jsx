import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

/* ====== Data (ajusta a tu historia real) ====== */
const TIMELINE = [
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
  },
  {
    year: "2020",
    title: "Medical Doctor (Cum Laude) • UCV",
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
const fadeIn = (d = 0) => ({
  initial: { y: 16, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.6, ease: EASE, delay: d },
});

/* Color tags (azul/rosa/cian de tu paleta) */
const TAG_STYLES = {
  Role: "border-white/15 bg-white/5",
  Teaching: "border-[rgba(255,88,168,0.25)] bg-[rgba(255,88,168,0.10)]",
  Project: "border-[rgba(88,113,255,0.25)] bg-[rgba(88,113,255,0.12)]",
  Certification: "border-[rgba(0,255,220,0.25)] bg-[rgba(0,255,200,0.08)]",
  Backend: "border-[rgba(88,113,255,0.25)] bg-[rgba(88,113,255,0.12)]",
  Data: "border-[rgba(0,255,220,0.25)] bg-[rgba(0,255,200,0.08)]",
};

export default function About() {
  return (
    <div className="relative min-h-screen text-white">
      {/* ===== Fondo con tu misma estética ===== */}
      <div
        className="
          absolute inset-0 -z-10 pointer-events-none
          [background-image:radial-gradient(circle_at_20%_20%,rgba(88,113,255,0.12),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(255,88,168,0.1),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(0,255,200,0.08),transparent_50%),linear-gradient(180deg,#0b0b0b,#050505)]
          [background-blend-mode:screen]
        "
      />
      <div
        className="
          absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45
          [background-image:radial-gradient(rgba(255,255,255,.08)_1px,transparent_1.2px)]
          [background-size:8px_8px]
        "
      />

      <Navbar />

      {/* ===== Contenido ===== */}
      <main className="relative z-10">
        {/* HERO */}
        <section className="pt-28 pb-12">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <motion.div {...fadeIn(0)}>
              <div className="text-xs text-white/60 uppercase tracking-wider">
                About me
              </div>
              <h1 className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight">
                I build systems that feel clear.
              </h1>
              <p className="mt-4 max-w-2xl text-white/75">
                Systems Engineering student and Software Developer specializing in backend clarity and data pipelines. 
                Teaching assistant in Databases and Software Engineering, recognized for academic excellence. 
                With a background as a physician (Cum Laude), I bring precision, empathy, and rigor to building reliable, human-centered software systems.
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

            {/* Línea central */}
            <div className="relative mt-6">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/10" />

              <div className="flex flex-col gap-10">
                {TIMELINE.map((item, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={item.year + item.title}
                      className="grid grid-cols-1 md:grid-cols-3 items-stretch"
                      initial={{ opacity: 0, y: 20, x: isLeft ? -16 : 16 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.02 * i }}
                    >
                      <div className="md:pr-2 max-w-[460px] lg:w-[460px] ml-auto">
                        {isLeft && <div className="md:pr-6"><Card item={item} /></div>}
                      </div>

                      <div className="hidden md:flex md:col-span-1 justify-center">
                        <Node year={item.year} tag={item.tag} />
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
              <a
                href="/projects"
                className="rounded-full px-4 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-sm uppercase tracking-wide"
              >
                View projects →
              </a>
              <a
                href="/contact"
                className="rounded-full px-4 py-2.5 border border-white/10 bg-white/15 hover:bg-white/20 text-sm uppercase tracking-wide"
              >
                Contact
              </a>
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
  const tagStyle =
    TAG_STYLES[item.tag] || "border-white/15 bg-white/5";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wide border ${tagStyle}`}
        >
          {item.tag}
        </span>
        <span className="text-xs text-white/60">{item.year}</span>
      </div>
      <h3 className="mt-1 text-lg md:text-xl font-extrabold">{item.title}</h3>
      <p className="mt-1.5 text-sm text-white/70 leading-relaxed">
        {item.blurb}
      </p>
    </div>
  );
}

function Node({ year, tag }) {
  // color del nodo según tag
  const color =
    tag === "Project"
      ? "rgba(88,113,255,0.9)"
      : tag === "Certification"
      ? "rgba(0,255,200,0.9)"
      : tag === "Teaching"
      ? "rgba(255,88,168,0.95)"
      : "rgba(255,255,255,0.9)";

  return (
    <div className="relative flex flex-col items-center">
      {/* punto */}
      <div
        className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20"
        style={{ backgroundColor: color }}
        title={`${year} – ${tag}`}
      />
      {/* año */}
      <div className="mt-2 text-xs text-white/60">{year}</div>
    </div>
  );
}
