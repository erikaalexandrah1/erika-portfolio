import React, { useRef } from "react";
import { motion } from "framer-motion";

function ProjectCard({ item, onClick }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${py * -6}deg`);
    el.style.setProperty("--ry", `${px * 6}deg`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  const EASE = [0.2, 0.65, 0.3, 0.9];
  const pop = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.96, rotate: -0.6 },
    whileInView: { opacity: 1, scale: 1, rotate: 0 },
    viewport: { amount: 0.6, once: false },
    transition: { duration: 0.5, ease: EASE, delay },
  });

  return (
    <motion.a
      href={item.href}
      onClick={(e) => {
        if (onClick) onClick(item);
      }}
      ref={cardRef}
      className="
        group relative overflow-hidden
        snap-start shrink-0
        w-full aspect-[16/10] rounded-2xl
        border border-white/10
        bg-[#0b0b0b]/60
        hover:bg-[#0b0b0b]/80
        backdrop-blur
        transition-colors
        will-change-transform
      "
      style={{
        transform: "perspective(800px) rotateX(var(--rx)) rotateY(var(--ry))",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      {...pop()}
    >
      {/* Fondo borroso decorativo */}
      {item.image && (
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1.5px) grayscale(30%)",
          }}
        />
      )}

      {/* Glow suave */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(600px 260px at 20% 20%, rgba(88,113,255,0.12), transparent 60%), radial-gradient(520px 240px at 80% 20%, rgba(255,88,168,0.10), transparent 60%), radial-gradient(560px 280px at 50% 90%, rgba(0,255,200,0.08), transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Header */}
      <div className="absolute inset-0 p-5 flex flex-col">
        <div className="text-xs tracking-wide text-white/60">{item.meta}</div>
        <h3 className="mt-1 text-xl md:text-2xl font-extrabold">{item.title}</h3>
        <p className="mt-1 text-white/70 text-sm">{item.blurb}</p>

        <div className="mt-auto flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider">
          <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
            {item.tag}
          </span>
          <span className="opacity-60">View →</span>
        </div>
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1.2px)",
          backgroundSize: "8px 8px",
        }}
      />
    </motion.a>
  );
}

export default ProjectCard;
