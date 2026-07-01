import { useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import "../resources.css";
import { SECTIONS } from "../data/resourcesSections";

/* Easing premium (easeOutExpo-ish) para un movimiento suave y natural */
const EASE = [0.22, 1, 0.36, 1];

/* Contenedor: orquesta la entrada escalonada de sus hijos */
const containerV = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/* Item con movimiento */
const itemV = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* Item sin movimiento (accesibilidad: prefers-reduced-motion) */
const itemReducedV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

/* Config de viewport reutilizable: anima UNA sola vez, sin re-disparos en scroll */
const VIEWPORT = { once: true, amount: 0.25 };

const ytId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  } catch {
    /* url inválida */
  }
  return null;
};

/* ---- Subcomponentes a nivel de módulo (no se recrean por render) ---- */

function PillarCard({ title, subtitle, onClick, variants }) {
  return (
    <motion.button
      variants={variants}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.25, ease: EASE }}
      onClick={onClick}
      className="pillar-card"
      aria-label={`${title}: ${subtitle}`}
    >
      <div className="pillar-card__inner">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
      <div className="pillar-card__arrow" aria-hidden>
        →
      </div>
    </motion.button>
  );
}

function VideoMiniCard({ title, url, length, variants }) {
  const id = ytId(url);
  const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
  return (
    <motion.a
      variants={variants}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: EASE }}
      href={url}
      target="_blank"
      rel="noreferrer"
      className="video"
      aria-label={`${title} (${length})`}
    >
      <div className="video__thumb">
        {thumb ? (
          <img src={thumb} alt={title} loading="lazy" />
        ) : (
          <div className="video__thumb--placeholder" />
        )}
        <span className="video__badge">{length}</span>
      </div>
      <div className="video__title" title={title}>
        {title}
      </div>
    </motion.a>
  );
}

function ScrollHint({ reduced, label = "Keep scrolling" }) {
  return (
    <motion.div
      className="scroll-hint"
      initial={{ opacity: 0 }}
      animate={reduced ? { opacity: 0.85 } : { opacity: 0.85, y: [0, 8, 0] }}
      transition={
        reduced
          ? { duration: 0.4 }
          : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
      }
      aria-hidden
    >
      {label} ↓
    </motion.div>
  );
}

export default function Resources() {
  const reduced = useReducedMotion();
  const item = reduced ? itemReducedV : itemV;

  const sectionRefs = useRef(
    Array.from({ length: SECTIONS.length + 1 }, () => null)
  );
  const scrollTo = useCallback(
    (i) =>
      sectionRefs.current[i]?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      }),
    [reduced]
  );

  return (
    <div className="w-full h-screen bg-black">
      <Seo
        title="Resources"
        description="Free PDFs and video tutorials on the 4 pillars of software engineering: Databases, Data Analysis, Backend and Frontend."
        path="/resources"
      />
      <div className="resources">
        <div className="resources__navbar">
          <Navbar />
        </div>
        <div className="resources__bg" aria-hidden />

        <div className="resources__viewport">
          {/* Overview */}
          <section
            ref={(el) => (sectionRefs.current[0] = el)}
            className="section section--intro snap-start"
          >
            <motion.div
              className="intro"
              variants={containerV}
              initial="hidden"
              animate="show"
            >
              <motion.p variants={item} className="intro__eyebrow">
                2/4 – PDFs and tutorials I teach
              </motion.p>
              <motion.h1 variants={item} className="intro__title">
                Resources
              </motion.h1>
              <motion.p variants={item} className="intro__subtitle">
                Essential resources to master the 4 pillars of software
                engineering: Databases, Data Analysis, Backend, and Frontend.
              </motion.p>

              <motion.div className="intro__grid" variants={containerV}>
                {SECTIONS.map((s, i) => (
                  <PillarCard
                    key={s.key}
                    variants={item}
                    title={s.title}
                    subtitle={s.subtitle}
                    onClick={() => scrollTo(i + 1)}
                  />
                ))}
              </motion.div>

              <ScrollHint reduced={reduced} />
            </motion.div>
          </section>

          {/* Sections */}
          {SECTIONS.map((s, i) => (
            <section
              key={s.key}
              ref={(el) => (sectionRefs.current[i + 1] = el)}
              className="section snap-start"
            >
              <motion.div
                className="panel"
                variants={containerV}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
              >
                <motion.h2 variants={item} className="panel__title">
                  {s.title}
                </motion.h2>
                <motion.h3 variants={item} className="panel__subtitle">
                  {s.subtitle}
                </motion.h3>
                <motion.p variants={item} className="panel__description">
                  {s.description}
                </motion.p>

                <motion.div className="panel__videos" variants={containerV}>
                  {s.videos.map((v) => (
                    <VideoMiniCard
                      key={v.url}
                      variants={item}
                      title={v.title}
                      url={v.url}
                      length={v.length}
                    />
                  ))}
                </motion.div>

                <div className="panel__nav">
                  {i > 0 ? (
                    <button className="panel__btn" onClick={() => scrollTo(i)}>
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  {i < SECTIONS.length - 1 && (
                    <button
                      className="panel__btn"
                      onClick={() => scrollTo(i + 2)}
                    >
                      Next →
                    </button>
                  )}
                </div>
              </motion.div>
            </section>
          ))}

          <div className="spacer-10vh" />
        </div>
      </div>
    </div>
  );
}
