import { motion } from "framer-motion";
import { fadeSlide } from "./Motion";

export default function Pill({ children, delay = 0, className = "" }) {
  return (
    <motion.span
      {...fadeSlide(delay, 8, 0.5)}
      className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white ${className}`}
    >
      {children}
    </motion.span>
  );
}
