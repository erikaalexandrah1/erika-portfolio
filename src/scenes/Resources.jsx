import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import "../resources.css";
import { SECTIONS } from "../data/resourcesSections";

const EASE = "easeOut", DUR = 0.6;
const anim = (y = 16, d = 0) => ({
  initial: { y, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { amount: 0.6, once: false },
  transition: { duration: DUR, ease: EASE, delay: d },
});
const enter = {
  initial: { opacity: 0, y: 36, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { amount: 0.6, once: false },
  transition: { duration: DUR, ease: EASE },
};
const enterCard = (d = 0) => ({
  initial: { y: 28, opacity: 0, scale: 0.96 },
  animate: { y: 0, opacity: 1, scale: 1 },
  transition: { duration: DUR, ease: EASE, delay: d },
});
const ytId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  } catch {}
  return null;
};

export default function Resources() {
  const viewportRef = useRef(null);
  const sectionRefs = useRef(Array.from({ length: SECTIONS.length + 1 }, () => null));
  const scrollTo = useCallback(
    (i) => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" }),
    []
  );

  const PillarCard = ({ title, subtitle, onClick, delay = 0 }) => (
    <motion.button
      {...enterCard(delay)}
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

  const VideoMiniCard = ({ title, url, length, delay = 0 }) => {
    const id = ytId(url);
    const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;
    return (
      <motion.a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="video"
        {...anim(18, 0.06 * delay)}
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
  };

  const ScrollHint = ({ label = "Keep scrolling" }) => (
    <motion.div
      className="scroll-hint"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.85, y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      {label} ↓
    </motion.div>
  );

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const noop = () => {};
    el.addEventListener("touchmove", noop, { passive: true });
    return () => el.removeEventListener("touchmove", noop);
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <div className="resources">
        <div className="resources__navbar">
          <Navbar />
        </div>
        <div className="resources__bg" aria-hidden />
        <div ref={viewportRef} className="resources__viewport">
          {/* Overview */}
          <section
            ref={(el) => (sectionRefs.current[0] = el)}
            className="section section--intro snap-start"
          >
            <div className="intro">
              <motion.div
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <h1 className="intro__eyebrow">2/4 – PDFs and tutorials I teach</h1>
                <h2 className="intro__title">Resources</h2>
                <p className="intro__subtitle">
                  Essential resources to master the 4 pillars of software engineering:
                  Databases, Data Analysis, Backend, and Frontend.
                </p>
              </motion.div>
              <div className="intro__grid">
                {SECTIONS.map((s, i) => (
                  <PillarCard
                    key={s.key}
                    title={s.title}
                    subtitle={s.subtitle}
                    onClick={() => scrollTo(i + 1)}
                    delay={0.12 * i}
                  />
                ))}
              </div>
              <ScrollHint />
            </div>
          </section>

          {/* Sections */}
          {SECTIONS.map((s, i) => (
            <section
              key={s.key}
              ref={(el) => (sectionRefs.current[i + 1] = el)}
              className="section snap-start"
            >
              <motion.div className="panel" {...enter}>
                <motion.h2 className="panel__title" {...anim(16, 0.05)}>
                  {s.title}
                </motion.h2>
                <motion.h3 className="panel__subtitle" {...anim(14, 0.1)}>
                  {s.subtitle}
                </motion.h3>
                <motion.p className="panel__description" {...anim(12, 0.15)}>
                  {s.description}
                </motion.p>
                <div className="panel__videos">
                  {s.videos.map((v, idx) => (
                    <VideoMiniCard
                      key={v.url}
                      title={v.title}
                      url={v.url}
                      length={v.length}
                      delay={idx}
                    />
                  ))}
                </div>
                <div className="panel__nav">
                  {i > 0 ? (
                    <button className="panel__btn" onClick={() => scrollTo(i)}>
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  {i < SECTIONS.length - 1 && (
                    <button className="panel__btn" onClick={() => scrollTo(i + 2)}>
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