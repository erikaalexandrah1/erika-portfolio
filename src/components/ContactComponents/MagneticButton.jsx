import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { btnBase, btnSizes, btnVariants } from "../ui/Button";

/**
 * Botón con efecto magnético (sigue al cursor) + sonido, reutilizando los
 * estilos del design system (ui/Button) para verse consistente con el resto.
 */
export default function MagneticButton({
  children,
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, [-1, 1], ["-6px", "6px"]);
  const ty = useTransform(my, [-1, 1], ["-6px", "6px"]);

  // Un único objeto Audio reutilizado (antes se creaba uno por hover).
  const hoverSound = useRef(null);
  useEffect(() => {
    hoverSound.current = new Audio("/sounds/hover.mp3");
    hoverSound.current.load();
  }, []);

  const playHoverSound = () => {
    const a = hoverSound.current;
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {});
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
      className={`${btnBase} ${btnSizes[size]} ${btnVariants[variant]} ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
