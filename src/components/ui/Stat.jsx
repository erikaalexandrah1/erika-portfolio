import { motion } from "framer-motion";

/**
 * Tarjeta de estadística con hover sutil (borde + leve elevación).
 */
export default function Stat({ k, v, delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur px-5 py-4
                 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
      aria-label={`${k}: ${v}`}
    >
      <div className="text-2xl md:text-3xl font-extrabold text-white">{v}</div>
      <div className="text-xs text-white/55 mt-1">{k}</div>
    </motion.div>
  );
}
