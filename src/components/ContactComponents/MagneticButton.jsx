import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, [-1, 1], ["-6px", "6px"]);
  const ty = useTransform(my, [-1, 1], ["-6px", "6px"]);

  // Reproducir sonido
  const playHoverSound = () => {
    const audio = new Audio("/sounds/hover.mp3");
    audio.currentTime = 0; 
    audio.play().catch(() => {
    });
  };

  return (
    <motion.button
      ref={ref}
      onMouseEnter={playHoverSound} 
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        mx.set(x * 2 - 1);
        my.set(y * 2 - 1);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ x: tx, y: ty }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5
                  border border-white/10 bg-white/5 hover:bg-white/10 text-white/90
                  uppercase tracking-wide text-sm transition-colors ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

