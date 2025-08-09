import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import NoisePlane from "../components/BackgroundNoise";

import BackgroundFX from "../components/HomeComponents/BackgroundFX";
import Pill from "../components/HomeComponents/Pill";
import CTA from "../components/HomeComponents/CTA";
import Stat from "../components/HomeComponents/Stat";
import { MotionInView, fadeSlide } from "../components/HomeComponents/Motion";

import { SKILLS, STATS, CTAS_TOP, FEATURED } from "../data/homeInformation";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <BackgroundFX />

      <Navbar />

      {/* Canvas */}
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

      {/* Overlay */}
      <main className="pointer-events-auto absolute inset-0 z-10 overflow-y-auto">
        {/* HERO */}
        <section className="pt-28 pb-14">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <div className="flex flex-wrap items-center gap-2">
              <Pill delay={0.05}>Full-Stack Developer</Pill>
              <Pill delay={0.1}>Systems Engineering Student</Pill>
              <Pill delay={0.15}>MD (Medical Doctor)</Pill>
            </div>

            <motion.h1
              {...fadeSlide(0, 18, 0.7)}
              className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight text-white"
            >
              Building clear systems. <br className="hidden md:block" />
              Teaching what matters.
            </motion.h1>

            <motion.p
              {...fadeSlide(0.05, 16, 0.6)}
              className="mt-4 max-w-2xl text-white"
            >
              I design and ship end-to-end solutions across databases, data
              pipeline, backend architecture, and interaction-focused UIs.
              I also create classes and resources that make complex topics
              feel simple.
            </motion.p>

            <div className="mt-7 flex flex-wrap gap-3">
              {CTAS_TOP.map((c) => (
                <CTA
                  key={c.label}
                  href={c.href}
                  primary={c.primary}
                  delay={c.delay}
                >
                  {c.label}
                </CTA>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s, i) => (
                <Stat key={s.k} k={s.k} v={s.v} delay={0.05 * (i + 1)} />
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="pb-12">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <MotionInView as="h2" className="text-sm uppercase tracking-wider text-white ">
              Core Stack
            </MotionInView>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKILLS.map((t, i) => (
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
            {/* Si prefieres, reemplaza el bloque por <FeaturedCard {...FEATURED} /> */}
            <MotionInView className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(700px 300px at 20% 20%, rgba(88,113,255,0.12), transparent 60%), radial-gradient(600px 280px at 80% 30%, rgba(255,88,168,0.10), transparent 55%), radial-gradient(600px 280px at 50% 90%, rgba(0,255,200,0.08), transparent 55%)",
                  mixBlendMode: "screen",
                }}
                aria-hidden
              />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 relative z-[1]">
                <div className="flex-1">
                  <div className="text-xs text-white uppercase tracking-wider">
                    Featured Project
                  </div>
                  <h3 className="mt-1 text-2xl md:text-3xl font-extrabold text-white">
                    {FEATURED.title}
                  </h3>
                  <p className="mt-2 text-white">
                    {FEATURED.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {FEATURED.tags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
                
                <div className="aspect-[16/10] rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
                    {FEATURED.image ? (
                        <img
                        src={FEATURED.image}
                        alt={`Preview of ${FEATURED.title}`}
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="grid place-items-center text-white h-full w-full">
                        Preview / thumbnail
                        </div>
                    )}
                </div>
            </div>
            </MotionInView>
          </div>
        </section>

        {/* MINI CTA */}
        <section className="pb-24">
          <div className="mx-auto w-[min(1100px,92vw)] text-center">
            <MotionInView as="h3" className="text-xl md:text-2xl font-extrabold text-white">
              Looking for clarity and speed?
            </MotionInView>
            <MotionInView as="p" className="mt-2 text-white max-w-2xl mx-auto">
              I’m happy to walk through relevant projects or share materials tailored to your team.
            </MotionInView>
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
