import { motion } from "framer-motion";
import { inViewFadeSlide } from "./Motion";

export default function Stat({ k, v, delay = 0 }) {
  return (
    <motion.div
      {...inViewFadeSlide(delay, 10, 0.55)}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
      aria-label={`${k}: ${v}`}
    >
      <div className="text-2xl md:text-3xl font-extrabold text-white">{v}</div>
      <div className="text-xs text-white mt-1">{k}</div>
    </motion.div>
  );
}
