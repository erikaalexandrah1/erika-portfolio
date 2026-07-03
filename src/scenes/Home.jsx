import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import useDeferredMount from "../hooks/useDeferredMount";

import PageBackground from "../components/ui/PageBackground";
const HomeCanvas = lazy(() => import("../components/HomeComponents/HomeCanvas"));

import Button from "../components/ui/Button";
import Pill from "../components/ui/Pill";
import Eyebrow from "../components/ui/Eyebrow";
import Stat from "../components/ui/Stat";
import { MotionInView } from "../components/HomeComponents/Motion";

import { ROLES, TRUST, SKILLS, STATS, FEATURED } from "../data/homeInformation";

const fade = (delay = 0, y = 18) => ({
  initial: { y, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Home() {
  const show3D = useDeferredMount();

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Seo path="/" />
      <PageBackground />

      <Navbar />

      {/* Canvas 3D diferido: entra tras el primer pintado, no bloquea la carga */}
      {show3D && (
        <div className="absolute inset-0 pointer-events-none">
          <Suspense fallback={null}>
            <HomeCanvas />
          </Suspense>
        </div>
      )}

      {/* Overlay */}
      <main className="pointer-events-auto absolute inset-0 z-10 overflow-y-auto">
        {/* HERO */}
        <section className="pt-28 md:pt-32 pb-16">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <motion.div {...fade(0)}>
              <Eyebrow>M.D. → Software Engineer</Eyebrow>
            </motion.div>

            <motion.h1
              {...fade(0.05, 20)}
              className="mt-5 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
            >
              Building{" "}
              <span className="bg-[linear-gradient(100deg,#7c8cff,#c07bff,#ff7bbf)] bg-clip-text text-transparent">
                clear systems
              </span>
              . <br className="hidden md:block" />
              Teaching what matters.
            </motion.h1>

            <motion.p
              {...fade(0.12, 16)}
              className="mt-5 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed"
            >
              Full-stack developer with a doctor's eye for detail. I design
              end-to-end products across data, backend and interfaces — and turn
              complex topics into simple, teachable ideas.
            </motion.p>

            {/* Role pills */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {ROLES.map((r, i) => (
                <Pill key={r} delay={0.18 + i * 0.05} dot>
                  {r}
                </Pill>
              ))}
            </div>

            {/* CTAs con jerarquía */}
            <motion.div {...fade(0.28)} className="mt-8 flex flex-wrap items-center gap-3">
              <Button to="/projects" variant="primary" size="lg">
                View my work →
              </Button>
              <Button href="/cv.pdf" download="Erika-Hernandez-CV.pdf" variant="secondary" size="lg">
                Download CV
              </Button>
              <Button to="/contact" variant="ghost" size="lg">
                Get in touch
              </Button>
            </motion.div>

            {/* Fila de confianza */}
            <motion.div
              {...fade(0.36)}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/45"
            >
              {TRUST.map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && <span className="text-white/20">·</span>}
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s, i) => (
                <Stat key={s.k} k={s.k} v={s.v} delay={0.05 * (i + 1)} />
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="pb-14">
          <div className="mx-auto w-[min(1100px,92vw)]">
            <MotionInView>
              <Eyebrow>Core Stack</Eyebrow>
            </MotionInView>
            <div className="mt-4 flex flex-wrap gap-2">
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
            <MotionInView className="group relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-6 md:p-8 overflow-hidden transition-colors hover:border-white/20">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(700px 300px at 20% 20%, rgba(91,108,255,0.16), transparent 60%), radial-gradient(600px 280px at 80% 30%, rgba(194,91,255,0.14), transparent 55%), radial-gradient(600px 280px at 50% 90%, rgba(0,200,180,0.08), transparent 55%)",
                  mixBlendMode: "screen",
                }}
                aria-hidden
              />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 relative z-[1]">
                <div className="flex-1">
                  <Eyebrow>Featured Project</Eyebrow>
                  <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-white">
                    {FEATURED.title}
                  </h3>
                  <p className="mt-2 text-white/70 leading-relaxed">
                    {FEATURED.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {FEATURED.tags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button href={FEATURED.liveHref} variant="secondary">
                      Visit live site →
                    </Button>
                  </div>
                </div>

                <div className="w-full md:w-[42%] aspect-[16/10] rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
                  <img
                    src={FEATURED.image}
                    alt={`Preview of ${FEATURED.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </div>
            </MotionInView>
          </div>
        </section>

        {/* MINI CTA */}
        <section className="pb-24">
          <div className="mx-auto w-[min(1100px,92vw)] text-center">
            <MotionInView as="h3" className="text-2xl md:text-3xl font-extrabold text-white">
              Looking for clarity and speed?
            </MotionInView>
            <MotionInView as="p" className="mt-2 text-white/60 max-w-2xl mx-auto">
              I'm happy to walk through relevant projects or share materials tailored to your team.
            </MotionInView>
            <div className="mt-7 flex justify-center gap-3">
              <Button to="/contact" variant="primary" size="lg">
                Get in touch →
              </Button>
              <Button to="/resources" variant="secondary" size="lg">
                See classes
              </Button>
            </div>
          </div>
        </section>

        <div className="h-8" />
      </main>
    </div>
  );
}
