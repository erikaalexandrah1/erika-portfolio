import { useState, useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import Seo from "../components/Seo";
import "../resources.css";
import { PILLARS, TOPICS } from "../data/resourcesTopics";

const ytId = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
  } catch {
    /* url vacía o inválida */
  }
  return null;
};

const pillarOf = (id) => PILLARS.find((p) => p.id === id);

/* ---------- Card expandible de un tema ---------- */
function TopicCard({ topic }) {
  const [open, setOpen] = useState(false);
  const pillar = pillarOf(topic.pillar);
  const id = ytId(topic.video?.url);
  const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : undefined;

  return (
    <div
      className={`rcard ${open ? "is-open" : ""}`}
      style={{ "--accent": pillar?.color }}
    >
      <button
        className="rcard__head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="rcard__thumb">
          {thumb ? (
            <img src={thumb} alt="" loading="lazy" />
          ) : (
            <div className="rcard__thumb--empty" aria-hidden>
              ▶
            </div>
          )}
          {topic.video?.length && (
            <span className="rcard__length">{topic.video.length}</span>
          )}
        </div>
        <div className="rcard__info">
          <span className="rcard__pillar" style={{ color: pillar?.color }}>
            <span className="rcard__dot" />
            {pillar?.label}
          </span>
          <h3 className="rcard__title">{topic.title}</h3>
          <span className="rcard__meta">
            🎥 1 video · 📄 {topic.pdfs.length} guía
            {topic.pdfs.length > 1 ? "s" : ""}
          </span>
        </div>
        <span className={`rcard__chevron ${open ? "is-open" : ""}`} aria-hidden>
          ⌄
        </span>
      </button>

      {/* Expansión con grid-template-rows (0fr→1fr): anima altura con CSS puro.
          Filas tipo "cajetilla": el video abre YouTube, las guías descargan. */}
      <div className="rcard__body">
        <div className="rcard__body-inner">
          <div className="rcard__body-pad">
            {topic.video?.url ? (
              <a
                href={topic.video.url}
                target="_blank"
                rel="noreferrer"
                className="rcard__link rcard__link--video"
              >
                <span className="rcard__link-icon" aria-hidden>
                  ▶
                </span>
                <span className="rcard__link-text">Ver en YouTube</span>
                <span className="rcard__link-cta" aria-hidden>
                  ↗
                </span>
              </a>
            ) : (
              <div className="rcard__link rcard__link--empty">
                <span className="rcard__link-icon" aria-hidden>
                  ▶
                </span>
                <span className="rcard__link-text">Video pendiente</span>
              </div>
            )}

            {topic.pdfs.map((pdf) => (
              <a
                key={pdf.url}
                href={pdf.url}
                target="_blank"
                rel="noreferrer"
                className="rcard__link rcard__link--pdf"
              >
                <span className="rcard__link-icon" aria-hidden>
                  📄
                </span>
                <span className="rcard__link-text">{pdf.title}</span>
                <span className="rcard__link-cta" aria-hidden>
                  ↓
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Resources() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const scrollRef = useRef(null);

  // Parallax del hero ligado al scroll del contenedor (toque Framer).
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const filtered = useMemo(
    () => (filter === "all" ? TOPICS : TOPICS.filter((t) => t.pillar === filter)),
    [filter]
  );

  const countOf = (pid) => TOPICS.filter((t) => t.pillar === pid).length;

  return (
    <div className="resources">
      <Seo
        title="Resources"
        description="Library of video tutorials and PDF guides on the 4 pillars of software engineering: Databases, Data Analysis, Backend and Frontend."
        path="/resources"
      />
      <div className="resources__navbar">
        <Navbar />
      </div>
      <div className="resources__bg" aria-hidden />

      <div className="lib-scroll" ref={scrollRef}>
        <main className="lib">
          {/* Hero */}
          <motion.header
            className="lib__hero"
            style={reduced ? undefined : { y: heroY, opacity: heroOpacity }}
          >
            <p className="lib__eyebrow">2/4 — Resource library</p>
            <h1 className="lib__title">Resources</h1>
            <p className="lib__subtitle">
              Video tutorials and PDF guides across the 4 pillars of software
              engineering. Filter by topic and dive in.
            </p>
          </motion.header>

          {/* Filtros */}
          <div className="lib__filters" role="tablist" aria-label="Filter by pillar">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="All"
              count={TOPICS.length}
            />
            {PILLARS.map((p) => (
              <FilterChip
                key={p.id}
                active={filter === p.id}
                onClick={() => setFilter(p.id)}
                label={p.label}
                count={countOf(p.id)}
                color={p.color}
              />
            ))}
          </div>

          {/* Grid */}
          <div className="lib__grid">
            {filtered.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, label, count, color }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`chip ${active ? "is-active" : ""}`}
      style={active && color ? { "--chip": color } : undefined}
    >
      {color && <span className="chip__dot" style={{ background: color }} />}
      {label}
      <span className="chip__count">{count}</span>
    </button>
  );
}
