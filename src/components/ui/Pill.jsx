import { motion } from "framer-motion";

/**
 * Chip/pill estético con micro-interacción en hover.
 * `dot` añade un punto con gradiente de acento a la izquierda.
 */
export default function Pill({ children, delay = 0, dot = false, className = "" }) {
  return (
    <motion.span
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -2 }}
      className={
        "group inline-flex items-center gap-1.5 rounded-full border border-white/10 " +
        "bg-white/[0.04] px-3 py-1 text-xs text-white/70 backdrop-blur " +
        "transition-colors hover:border-white/25 hover:bg-white/[0.08] hover:text-white " +
        className
      }
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(100deg,#5b6cff,#ff5fa8)]" />
      )}
      {children}
    </motion.span>
  );
}
