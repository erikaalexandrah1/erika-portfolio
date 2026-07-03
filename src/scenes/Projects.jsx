import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import ProjectCard from "../components/ProjectsComponents/ProjectCard";
import Button from "../components/ui/Button";
import Eyebrow from "../components/ui/Eyebrow";
import { CATEGORIES, PROJECTS } from "../data/projectsInformation";

const EASE = [0.2, 0.65, 0.3, 0.9];
const fadeUp = (delay = 0) => ({
  initial: { y: 16, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { amount: 0.6, once: true },
  transition: { duration: 0.6, ease: EASE, delay },
});

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
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none
          [background-image:radial-gradient(circle_at_20%_20%,rgba(88,113,255,0.12),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(255,88,168,0.10),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(0,255,200,0.08),transparent_50%),linear-gradient(180deg,#0b0b0b,#050505)]
          [background-blend-mode:screen]"
      />
      <div
        className="absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45
          [background-image:radial-gradient(rgba(255,255,255,.08)_1px,transparent_1.2px)]
          [background-size:8px_8px]"
      />

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

          {/* Filters */}
          <motion.div className="mt-8 flex flex-wrap items-center gap-2" {...fadeUp(0.1)}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full text-sm uppercase tracking-wide border transition-colors
                  ${filter === c
                    ? "bg-white/15 border-white/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10"}`}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CARD GRID */}
      <section className="relative pb-20">
        <div className="mx-auto w-[min(1100px,92vw)] grid grid-cols-1 sm:grid-cols-2 gap-8">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} item={p} onClick={() => {}} />
          ))}
        </div>
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
