import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";

/** ===========================
 *  Demo data (cámbialo por real)
 *  =========================== */
const CATEGORIES = ["All", "Databases", "Data", "Backend", "Frontend"];

const PROJECTS = [
  {
    id: "p1",
    title: "Graph-powered Recommender",
    blurb: "Product graph + Cypher queries for real-time recommendations.",
    tag: "Databases",
    meta: "Neo4j • AuraDB • Cypher",
    href: "#",
  },
  {
    id: "p2",
    title: "Retail ETL + BI Model",
    blurb: "End-to-end ETL with dimensional modeling and KPIs.",
    tag: "Data",
    meta: "Pentaho • Dimensional • Dashboards",
    href: "#",
  },
  {
    id: "p3",
    title: "Payments API (clean architecture)",
    blurb: "Resilient REST API with tests and Swagger docs.",
    tag: "Backend",
    meta: "NestJS • Mongoose • Swagger",
    href: "#",
  },
  {
    id: "p4",
    title: "Interaction-heavy UI",
    blurb: "Micro-interactions and accessibility-minded components.",
    tag: "Frontend",
    meta: "React • Framer Motion • A11y",
    href: "#",
  },
  {
    id: "p5",
    title: "Mongo Aggregations Lab",
    blurb: "Hands-on lab for pipeline performance and patterns.",
    tag: "Databases",
    meta: "MongoDB • Aggregations",
    href: "#",
  },
  {
    id: "p6",
    title: "EDA to Insight",
    blurb: "Exploratory analysis to actionable insights, fast.",
    tag: "Data",
    meta: "Python • Stats • Viz",
    href: "#",
  },
];

/** ===========================
 *  Motion presets (diferentes a Resources)
 *  =========================== */
const EASE = [0.2, 0.65, 0.3, 0.9];

const fadeUp = (delay = 0) => ({
  initial: { y: 16, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { amount: 0.6, once: false },
  transition: { duration: 0.6, ease: EASE, delay },
});

const pop = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96, rotate: -0.6 },
  whileInView: { opacity: 1, scale: 1, rotate: 0 },
  viewport: { amount: 0.6, once: false },
  transition: { duration: 0.5, ease: EASE, delay },
});

/** ===========================
 *  Project Card (tilt + hover)
 *  =========================== */
function ProjectCard({ item, onClick }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${py * -6}deg`);
    el.style.setProperty("--ry", `${px * 6}deg`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <motion.a
      href={item.href}
      onClick={(e) => {
        if (onClick) onClick(item);
        // e.preventDefault(); // si quieres manejar modal en vez de link
      }}
      className="
        group relative snap-start shrink-0
        w-[85vw] sm:w-[60vw] lg:w-[40vw] xl:w-[32vw]
        aspect-[16/10] rounded-2xl
        border border-white/10
        bg-[#0b0b0b]/60
        hover:bg-[#0b0b0b]/80
        backdrop-blur
        overflow-hidden
        transition-colors
        will-change-transform
      "
      style={{ transform: "perspective(800px) rotateX(var(--rx)) rotateY(var(--ry))" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      {...pop()}
    >
      {/* Glow suave */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(600px 260px at 20% 20%, rgba(88,113,255,0.12), transparent 60%), radial-gradient(520px 240px at 80% 20%, rgba(255,88,168,0.10), transparent 60%), radial-gradient(560px 280px at 50% 90%, rgba(0,255,200,0.08), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Header */}
      <div className="absolute inset-0 p-5 flex flex-col">
        <div className="text-xs tracking-wide text-white/60">{item.meta}</div>
        <h3 className="mt-1 text-xl md:text-2xl font-extrabold">{item.title}</h3>
        <p className="mt-1 text-white/70 text-sm">{item.blurb}</p>

        <div className="mt-auto flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider">
          <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
            {item.tag}
          </span>
          <span className="opacity-60">View →</span>
        </div>
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1.2px)",
          backgroundSize: "8px 8px",
        }}
      />
    </motion.a>
  );
}

/** ===========================
 *  Featured case (parallax distinto)
 *  =========================== */
function FeaturedCase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], ["-1.5deg", "1.5deg"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);

  return (
    <section ref={ref} className="relative py-24">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <motion.div
          style={{ y, rotate, scale }}
          className="
            relative rounded-3xl p-8 md:p-12
            border border-white/10 bg-[#0b0b0b]/70 backdrop-blur
            overflow-hidden
          "
          {...fadeUp(0.05)}
        >
          {/* Glow fondo */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(800px 340px at 18% 20%, rgba(88,113,255,0.10), transparent 60%), radial-gradient(640px 280px at 82% 25%, rgba(255,88,168,0.10), transparent 55%), radial-gradient(560px 300px at 50% 90%, rgba(0,255,200,0.07), transparent 55%)",
              mixBlendMode: "screen",
            }}
          />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
            <div className="flex-1">
              <div className="text-xs text-white/60 uppercase tracking-wider mb-2">
                Featured Case
              </div>
              <h3 className="text-2xl md:text-4xl font-extrabold">
                Real-time Analytics Edge
              </h3>
              <p className="mt-3 text-white/70 leading-relaxed">
                Stream processing + dimensional modeling + micro-interactions
                for a decision hub with sub-second feedback.
              </p>
            </div>
            <motion.a
              href="#"
              className="
                shrink-0 px-4 py-2 rounded-full border border-white/10
                bg-white/5 text-white/90 text-sm uppercase tracking-wide
                hover:bg-white/10 transition-colors
              "
              whileHover={{ scale: 1.05 }}
            >
              Read case →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** ===========================
 *  Main view
 *  =========================== */
export default function Projects() {
  const [filter, setFilter] = useState("All");

  // Parallax del hero
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter)),
    [filter]
  );

  return (
    <div className="relative min-h-screen text-white">
      {/* Fondo: radiales + linear + grain (solo Tailwind/arbitrary) */}
      <div
        className="
          absolute inset-0 -z-10 pointer-events-none
          [background-image:radial-gradient(circle_at_20%_20%,rgba(88,113,255,0.12),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(255,88,168,0.10),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(0,255,200,0.08),transparent_50%),linear-gradient(180deg,#0b0b0b,#050505)]
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

      {/* HERO */}
      <section ref={heroRef} className="relative pt-28 pb-16">
        <div className="mx-auto w-[min(1100px,92vw)]">
          <motion.div style={{ y: y1 }} {...fadeUp(0)}>
            <div className="text-xs text-white/60 uppercase tracking-wider flex items-center gap-2">
              <span className="inline-flex items-center justify-center px-2 py-1 rounded-full border border-white/10 bg-white/5">
                Case studies
              </span>
              <span>Selected work</span>
            </div>
            <h1 className="mt-3 text-5xl md:text-7xl font-extrabold tracking-tight">
              Projects
            </h1>
          </motion.div>

          <motion.p
            style={{ y: y2 }}
            className="mt-4 max-w-2xl text-white/70"
            {...fadeUp(0.05)}
          >
            A curated set of software projects across databases, data pipelines,
            backend design and frontend interactions — focused on clarity,
            performance and human-centred UX.
          </motion.p>

          {/* Filters */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-2"
            {...fadeUp(0.1)}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full text-sm uppercase tracking-wide border transition-colors
                  ${filter === c ? "bg-white/15 border-white/20" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CAROUSEL (HORIZONTAL) */}
      <section className="relative pb-14">
        <div className="mx-auto w-[min(1100px,92vw)]">
          <motion.div
            className="
              flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2
              [-ms-overflow-style:none] [scrollbar-width:none]
            "
            {...fadeUp(0.05)}
          >
            {/* Ocultar scrollbar nativo (webkit) */}
            <style>{`
              .snap-x::-webkit-scrollbar { display: none; }
            `}</style>

            {filtered.map((p, i) => (
              <ProjectCard key={p.id} item={p} onClick={() => {}} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED CASE con parallax distinto */}
      <FeaturedCase />

      {/* CTA final */}
      <section className="py-20">
        <div className="mx-auto w-[min(1100px,92vw)] text-center">
          <motion.h3 className="text-2xl md:text-4xl font-extrabold" {...fadeUp(0)}>
            Want the full breakdown?
          </motion.h3>
          <motion.p className="mt-2 text-white/70" {...fadeUp(0.05)}>
            I can share repos, PDFs, or a quick walkthrough upon request.
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-flex mt-6 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors uppercase tracking-wide text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Get in touch →
          </motion.a>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
}
