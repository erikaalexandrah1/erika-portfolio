import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Navbar from "../components/Navbar";
import OrbitalArcs from "../components/OrbitalArcs";
import { SECTIONS } from "../data/resourcesSections";

// Paletas por pilar (bg dinámico)
const PALETTES = [
  { a: "#0b0b0b", b: "#050505", r1: "rgba(88,113,255,0.12)", r2: "rgba(255,88,168,0.10)", r3: "rgba(0,255,200,0.08)" },
  { a: "#0b0b0b", b: "#07070a", r1: "rgba(58,96,255,0.15)",  r2: "rgba(255,112,164,0.10)", r3: "rgba(0,220,180,0.08)" },
  { a: "#0a0b0c", b: "#050607", r1: "rgba(40,180,160,0.14)", r2: "rgba(180,140,90,0.08)",  r3: "rgba(90,110,120,0.10)" },
  { a: "#0b0a0d", b: "#06050a", r1: "rgba(120,92,255,0.13)", r2: "rgba(255,96,128,0.10)",  r3: "rgba(60,200,200,0.08)" },
  { a: "#0a0b0b", b: "#050505", r1: "rgba(88,113,255,0.14)", r2: "rgba(255,136,196,0.10)", r3: "rgba(0,255,220,0.08)" },
];

const EASE = [0.2, 0.65, 0.3, 0.9];
const DUR = 0.6;

const enterPanel = {
  initial: { opacity: 0, y: 36, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { amount: 0.6, once: false },
  transition: { duration: DUR, ease: EASE }
};

const fadeUp = (d = 0) => ({
  initial: { y: 16, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { amount: 0.6, once: false },
  transition: { duration: 0.6, ease: EASE, delay: d }
});

const enterCard = (d = 0) => ({
  initial: { y: 24, opacity: 0, scale: 0.96 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: { duration: 0.55, ease: EASE, delay: d }
});

const ytId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  } catch {}
  return null;
};

export default function ResourcesCinematic() {
  const viewportRef = useRef(null);
  const sectionRefs = useRef(Array.from({ length: SECTIONS.length + 1 }, () => null));
  const [active, setActive] = useState(0); // 0 = Intro

  const scrollTo = useCallback((i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // IntersectionObserver
  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll("[data-index]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-index") || 0);
            setActive(idx);
          }
        });
      },
      { root, threshold: [0.3, 0.5, 0.7] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [SECTIONS.length]);

  const palette = useMemo(
    () => PALETTES[Math.min(active, PALETTES.length - 1)],
    [active]
  );

  // Timeline
  const Timeline = () => (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
      {[0, ...SECTIONS.map((_, i) => i + 1)].map((i) => {
        const is = i === active;
        return (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`relative w-3 h-3 rounded-full border transition-all
              ${is ? "scale-110 border-white/50 bg-white" : "border-white/20 bg-white/10 hover:bg-white/30"}`}
            title={i === 0 ? "Overview" : SECTIONS[i - 1].title}
            aria-current={is ? "true" : "false"}
          >
            {is && <span className="absolute -inset-1 rounded-full border border-white/20 animate-pulse" />}
          </button>
        );
      })}
    </div>
  );

  const VideoMiniCard = ({ title, url, length, delay = 0 }) => {
    const id = ytId(url),
      thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="video border border-white/10 bg-[#0b0b0b]/70 hover:bg-[#0b0b0b]/85 rounded-xl overflow-hidden p-2 transition-colors"
        {...fadeUp(0.04 * delay)}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="video__thumb relative aspect-[16/9] rounded-md overflow-hidden bg-[#0e0e0e]">
          {thumb ? (
            <img src={thumb} alt={title} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" />
          )}
          <span className="video__badge absolute bottom-2 right-2 px-2 py-1 text-[11px] rounded-md border border-white/10 bg-black/50">
            {length}
          </span>
        </div>
        <div className="video__title mt-2 text-sm text-white/90 line-clamp-2">{title}</div>
      </motion.a>
    );
  };

  const SectionShell = ({ index, children }) => {
    const localRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: localRef,
      container: viewportRef,
      offset: ["start 85%", "end 15%"],
    });

    const radius = useTransform(scrollYProgress, [0, 1], [120, 1400]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
    const mask = useMotionTemplate`radial-gradient(${radius}px ${radius}px at 50% 50%, rgba(0,0,0,1) 60%, transparent 100%)`;

    return (
      <section
        ref={(el) => {
          localRef.current = el;
          sectionRefs.current[index] = el;
        }}
        data-index={index}
        className="snap-start min-h-screen grid place-items-center py-24 px-6"
      >
        <motion.div
          style={{ WebkitMaskImage: mask, maskImage: mask, opacity }}
          className="w-[min(1200px,92vw)]"
          {...enterPanel}
        >
          {children}
        </motion.div>
      </section>
    );
  };

  return (
    <div className="relative w-screen h-screen text-white overflow-hidden">
      {/* ===== Capa 0: Canvas fijo con OrbitalArcs (no interfiere con scroll) ===== */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <Canvas
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 1.8]}                  // limita DPR por rendimiento
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.08} />
          <pointLight position={[0, 0, 5]} intensity={1.2} color="#ff00ff" />
          <pointLight position={[-4, -2, -5]} intensity={1.0} color="#00ffff" />
          <OrbitalArcs />
        </Canvas>
      </div>

      {/* ===== Capa 1: background dinámico de Framer Motion (encima del canvas) ===== */}
      <motion.div
        key={active}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0.9 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${palette.r1}, transparent 60%),
            radial-gradient(circle at 80% 30%, ${palette.r2}, transparent 55%),
            radial-gradient(circle at 50% 80%, ${palette.r3}, transparent 50%),
            linear-gradient(180deg, ${palette.a}, ${palette.b})
          `,
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1.2px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-20 pointer-events-auto">
        <Navbar />
      </div>

      <Timeline />

      {/* ===== Contenedor con scroll interno (Framer Motion usa este container) ===== */}
      <div
        ref={viewportRef}
        className="relative z-10 h-screen overflow-y-auto snap-y snap-mandatory will-change-transform"
      >
        {/* Overview */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index={0}
          className="snap-start min-h-screen grid place-items-center px-6"
        >
          <div className="w-[min(1100px,92vw)]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              <div className="text-white/60 text-xs uppercase tracking-wider">Classes & Resources</div>
              <h1 className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight">What I teach</h1>
              <p className="mt-3 text-white/70 max-w-2xl">
                Materials from the four core areas I teach — Databases, Data Analysis, Backend, and Frontend.
              </p>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SECTIONS.map((s, i) => (
                <motion.button
                  key={s.key}
                  {...enterCard(0.1 * i)}
                  onClick={() => scrollTo(i + 1)}
                  className="relative border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur rounded-2xl p-4 text-left transition-colors will-change-transform"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3 className="text-lg font-extrabold">{s.title}</h3>
                  <p className="text-white/60 text-sm">{s.subtitle}</p>
                  <div className="absolute right-3 bottom-2 text-white/50">→</div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Secciones con reveal circular */}
        {SECTIONS.map((s, i) => (
          <SectionShell key={s.key} index={i + 1}>
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
              <motion.h2 className="text-3xl md:text-5xl font-extrabold tracking-tight" {...fadeUp(0.05)}>
                {s.title}
              </motion.h2>
              <motion.h3 className="text-white/70 mt-1" {...fadeUp(0.08)}>
                {s.subtitle}
              </motion.h3>
              <motion.p className="text-white/70 mt-3 max-w-3xl leading-relaxed" {...fadeUp(0.12)}>
                {s.description}
              </motion.p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {s.videos.map((v, idx) => (
                  <VideoMiniCard key={v.url} title={v.title} url={v.url} length={v.length} delay={idx} />
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                {i > 0 ? (
                  <button
                    className="border border-white/10 bg-white/5 rounded-full px-3 py-1.5 text-sm hover:bg-white/10 transition-colors"
                    onClick={() => scrollTo(i)}
                  >
                    ← Back
                  </button>
                ) : (
                  <span />
                )}

                {i < SECTIONS.length - 1 && (
                  <button
                    className="border border-white/10 bg-white/5 rounded-full px-3 py-1.5 text-sm hover:bg-white/10 transition-colors"
                    onClick={() => scrollTo(i + 2)}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </SectionShell>
        ))}

        <div className="h-[10vh]" />
      </div>
    </div>
  );
}
