import { motion } from "framer-motion";
import { fadeSlide } from "./Motion";

export default function CTA({
  href = "#",
  children,
  primary = false,
  delay = 0,
}) {
  return (
    <motion.a
      {...fadeSlide(delay, 10, 0.5)}
      href={href}
      className={`rounded-full px-5 py-2.5 text-sm uppercase tracking-wide border transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 ${
        primary
          ? "bg-white/15 hover:bg-white/20 border-white/20 text-white"
          : "bg-white/5 hover:bg-white/10 border-white/10 text-white"
      }`}
      aria-label={typeof children === "string" ? children : "cta"}
    >
      {children}
    </motion.a>
  );
}
