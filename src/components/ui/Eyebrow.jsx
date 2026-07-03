import { motion } from "framer-motion";

/**
 * Etiqueta pequeña ("eyebrow") para encabezar secciones o el hero.
 * Estilo SaaS: borde sutil, punto de acento y texto en mayúsculas espaciadas.
 */
export default function Eyebrow({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ y: 8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={
        "inline-flex items-center gap-2 rounded-full border border-white/10 " +
        "bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] " +
        "text-white/70 backdrop-blur " +
        className
      }
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[linear-gradient(100deg,#5b6cff,#ff5fa8)]" />
      {children}
    </motion.div>
  );
}
