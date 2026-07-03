import React, { useRef } from "react";
import { motion } from "framer-motion";
import { tagColor } from "../../data/projectsInformation";

const SPRING = { type: "spring", stiffness: 260, damping: 24 };

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function ProjectCard({ item, index = 0 }) {
  const cardRef = useRef(null);

  // Tilt 3D sutil siguiendo el cursor (perspectiva CSS vía variables custom)
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${py * -4}deg`);
    el.style.setProperty("--ry", `${px * 4}deg`);
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
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ ...SPRING, delay: 0.05 * index }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden will-change-transform"
      style={{ transform: "perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
    >
      {/* Borde con glow de marca, solo visible en hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow:
            "0 0 0 1px rgba(160,110,255,0.35), 0 20px 60px -20px rgba(91,108,255,0.45)",
        }}
      />

      {/* ===== Captura real dentro de un frame de navegador ===== */}
      <div className="relative aspect-[16/10] overflow-hidden bg-black/40 border-b border-white/10">
        <div className="absolute top-0 inset-x-0 h-7 flex items-center gap-1.5 px-3 bg-white/[0.05] z-10">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-2 text-[10px] text-white/40 truncate">{getDomain(item.href)}</span>
        </div>
        {item.image ? (
          <motion.img
            src={item.image}
            alt={`${item.title} — screenshot`}
            loading="lazy"
            className="absolute inset-x-0 bottom-0 top-7 w-full h-[calc(100%-1.75rem)] object-cover object-top"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
          />
        ) : (
          <div className="absolute inset-x-0 bottom-0 top-7 grid place-items-center text-white/30 text-xs uppercase tracking-wide">
            Preview coming soon
          </div>
        )}
      </div>

      {/* ===== Contenido ===== */}
      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wide border"
            style={{ borderColor: tagColor(item.tag, 0.3), backgroundColor: tagColor(item.tag, 0.1) }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tagColor(item.tag, 1) }} />
            {item.tag}
          </span>
          <span className="text-[11px] text-white/45 truncate">{item.meta}</span>
        </div>

        <h3 className="mt-2 text-lg md:text-xl font-extrabold">{item.title}</h3>
        <p className="mt-1 text-sm text-white/65 leading-relaxed flex-1">{item.blurb}</p>

        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white/80">
          View live
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </motion.a>
  );
}

export default ProjectCard;
