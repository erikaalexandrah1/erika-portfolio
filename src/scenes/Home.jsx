import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import NoisePlane from "../components/BackgroundNoise";

function Pill({ children, delay = 0 }) {
  return (
    <motion.span
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
    >
      {children}
    </motion.span>
  );
}

function Stat({ k, v, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
    >
      <div className="text-2xl md:text-3xl font-extrabold">{v}</div>
      <div className="text-xs text-white/60 mt-1">{k}</div>
    </motion.div>
  );
}

function CTA({ href = "#", children, primary = false, delay = 0 }) {
  return (
    <motion.a
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      href={href}
      className={`rounded-full px-5 py-2.5 text-sm uppercase tracking-wide border transition-colors ${
        primary
          ? "bg-white/15 hover:bg-white/20 border-white/20 text-white"
          : "bg-white/5 hover:bg-white/10 border-white/10 text-white/90"
      }`}
    >
      {children}
    </motion.a>
  );
}

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo (NO tocar) */}
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
          [background-image:url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 160 160\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence baseFrequency=\\'.65\\' numOctaves=\\'2\\'/%3E%3CfeColorMatrix values=\\'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .08 0\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')]
        "
      />

      <Navbar />

      {/* Canvas (NO tocar) */}
      <Canvas
        gl={{ alpha: true }}
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#ff00ff" />
        <pointLight position={[-4, -2, -5]} intensity={1.2} color="#00ffff" />
        <NoisePlane />
      </Canvas>

      {/* ===== Overlay de la Landing (scrollable) ===== */}
      <main className="pointer-events-auto absolute inset-0 z-10 overflow-y-auto">
        {/* HERO */}
        <section className="pt-28 pb-14">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <div className="flex flex-wrap items-center gap-2">
              <Pill delay={0.05}>Software Engineer</Pill>
              <Pill delay={0.1}>Data • Backend • Frontend</Pill>
              <Pill delay={0.15}>Teaching & Mentoring</Pill>
            </div>

            <motion.h1
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight text-white"
            >
              Building clear systems. <br className="hidden md:block" />
              Teaching what matters.
            </motion.h1>

            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 max-w-2xl text-white/75"
            >
              I design and ship end‑to‑end solutions across databases, data
              pipelines, backend architecture, and interaction‑focused UIs.
              I also create classes and resources that make complex topics
              feel simple.
            </motion.p>

            <div className="mt-7 flex flex-wrap gap-3">
              <CTA href="/projects" primary delay={0.05}>
                View Projects →
              </CTA>
              <CTA href="/resources" delay={0.08}>
                Resources
              </CTA>
              <CTA href="/cv.pdf" delay={0.11}>
                Download CV
              </CTA>
              <CTA href="/contact" delay={0.14}>
                Contact
              </CTA>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat k="Shipped Projects" v="35+" delay={0.05} />
              <Stat k="Classes & Workshops" v="50+" delay={0.1} />
              <Stat k="Students Impacted" v="1.5k+" delay={0.15} />
              <Stat k="Talks / Panels" v="20+" delay={0.2} />
            </div>
          </div>
        </section>

        {/* SKILLS / STACK */}
        <section className="pb-12">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <motion.h2
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-sm uppercase tracking-wider text-white/70"
            >
              Core Stack
            </motion.h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "PostgreSQL",
                "MongoDB",
                "Neo4j",
                "ETL / BI",
                "Python",
                "NestJS",
                "Node.js",
                "GraphQL",
                "Auth / JWT",
                "Testing",
                "React / Next",
                "Framer Motion",
                "Accessibility",
                "Design Systems",
              ].map((t, i) => (
                <Pill key={t} delay={0.02 * i}>
                  {t}
                </Pill>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECT */}
        <section className="pb-16">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 overflow-hidden"
            >
              {/* Glow sutil */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(700px 300px at 20% 20%, rgba(88,113,255,0.12), transparent 60%), radial-gradient(600px 280px at 80% 30%, rgba(255,88,168,0.10), transparent 55%), radial-gradient(600px 280px at 50% 90%, rgba(0,255,200,0.08), transparent 55%)",
                  mixBlendMode: "screen",
                }}
              />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 relative z-[1]">
                <div className="flex-1">
                  <div className="text-xs text-white/60 uppercase tracking-wider">
                    Featured Project
                  </div>
                  <h3 className="mt-1 text-2xl md:text-3xl font-extrabold">
                    Real‑time Analytics Edge
                  </h3>
                  <p className="mt-2 text-white/75">
                    Stream processing + dimensional modeling + interaction‑first
                    UI, delivering sub‑second feedback on key KPIs.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Pill>PostgreSQL</Pill>
                    <Pill>NestJS</Pill>
                    <Pill>React</Pill>
                    <Pill>Framer Motion</Pill>
                  </div>
                </div>
                <div className="shrink-0 w-full md:w-[360px]">
                  <div className="aspect-[16/10] rounded-2xl border border-white/10 bg-black/30 overflow-hidden grid place-items-center text-white/60">
                    Preview / thumbnail
                  </div>
                  <div className="mt-3 flex gap-2">
                    <CTA href="/projects#featured" primary>
                      Read Case →
                    </CTA>
                    <CTA href="https://github.com/erika" >
                      Repo
                    </CTA>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MINI-CTA FINAL */}
        <section className="pb-24">
          <div className="mx-auto w-[min(1100px,92vw)] text-center">
            <motion.h3
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="text-xl md:text-2xl font-extrabold"
            >
              Looking for clarity and speed?
            </motion.h3>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-2 text-white/70 max-w-2xl mx-auto"
            >
              I’m happy to walk through relevant projects or share materials
              tailored to your team.
            </motion.p>
            <div className="mt-6 flex justify-center gap-3">
              <CTA href="/contact" primary>
                Get in touch →
              </CTA>
              <CTA href="/resources">See classes</CTA>
            </div>
          </div>
        </section>

        <div className="h-8" />
      </main>
    </div>
  );
}
