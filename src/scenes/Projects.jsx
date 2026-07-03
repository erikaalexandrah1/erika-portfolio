import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import ProjectCard from "../components/ProjectsComponents/ProjectCard";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import PageBackground from "../components/ui/PageBackground";
import { CATEGORIES, PROJECTS, tagColor } from "../data/projectsInformation";

const EASE = [0.2, 0.65, 0.3, 0.9];
const SPRING = { type: "spring", stiffness: 300, damping: 28 };
const fadeUp = (delay = 0) => ({
  initial: { y: 16, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { amount: 0.6, once: true },
  transition: { duration: 0.6, ease: EASE, delay },
});

function FilterPill({ label, active, onClick }) {
  const color = label === "All" ? null : tagColor(label, 1);
  return (
    <button
      onClick={onClick}
      className="relative px-3 py-1.5 rounded-full text-sm uppercase tracking-wide"
    >
      {active && (
        <motion.span
          layoutId="projectFilterPill"
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: color ? tagColor(label, 0.4) : "rgba(255,255,255,0.2)",
            backgroundColor: color ? tagColor(label, 0.14) : "rgba(255,255,255,0.12)",
          }}
          transition={SPRING}
        />
      )}
      <span
        className={`relative flex items-center gap-1.5 transition-colors duration-200 ${
          active ? "text-white" : "text-white/55 hover:text-white/85"
        }`}
      >
        {color && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />}
        {label}
      </span>
    </button>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");

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
      <Seo
        title="Projects"
        description="Case studies across databases, data pipelines, backend design and frontend interactions — focused on clarity, performance and human-centred UX."
        path="/projects"
      />
      <PageBackground />

      <Navbar />

      {/* HERO */}
      <section ref={heroRef} className="relative pt-28 pb-16">
        <div className="mx-auto w-[min(1100px,92vw)]">
          <motion.div style={{ y: y1 }} {...fadeUp(0)}>
            <Eyebrow>Case studies · Selected work</Eyebrow>
            <h1 className="mt-3 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">Projects</h1>
          </motion.div>

          <motion.p className="mt-4 max-w-2xl text-white/70" style={{ y: y2 }} {...fadeUp(0.05)}>
            A curated set of software projects across databases, data pipelines, backend design
            and frontend interactions — focused on clarity, performance and human-centred UX.
          </motion.p>

          {/* Filtros con indicador deslizante (layoutId) */}
          <motion.div className="mt-8 flex flex-wrap items-center gap-1" {...fadeUp(0.1)}>
            {CATEGORIES.map((c) => (
              <FilterPill key={c} label={c} active={filter === c} onClick={() => setFilter(c)} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CARD GRID */}
      <section className="relative pb-20">
        <div className="mx-auto w-[min(1100px,92vw)] grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} item={p} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mx-auto w-[min(1100px,92vw)] text-center text-white/50 py-20">
            No projects in this category yet.
          </div>
        )}
      </section>

      {/* CTA final */}
     <section className="py-20 relative z-10">
        <div className="mx-auto w-[min(1100px,92vw)] text-center">
          <motion.h3 className="text-2xl md:text-4xl font-extrabold" {...fadeUp(0)}>
            Want the full breakdown?
          </motion.h3>
          <motion.p className="mt-2 text-white/70" {...fadeUp(0.05)}>
            I can share repos, PDFs, or a quick walkthrough upon request.
          </motion.p>
          <div className="mt-6 flex justify-center">
            <Button to="/contact" variant="primary" size="lg">
              Get in touch →
            </Button>
          </div>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
}
