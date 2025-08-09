import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function SocialLinks({ items = [] }) {
  const hoverSoundRef = useRef(
    typeof Audio !== "undefined" ? new Audio("/sounds/hover.mp3") : null
  );

  const playHoverSound = () => {
    const audio = hoverSoundRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {
    });
  };

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {items.map((s, i) => (
        <motion.a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={playHoverSound}
          className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 text-sm"
          whileHover={{ scale: 1.03 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: i * 0.03,
          }}
        >
          {s.label} →
        </motion.a>
      ))}
    </div>
  );
}
