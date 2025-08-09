import { motion } from "framer-motion";

export const fadeSlide = (delay = 0, y = 12, duration = 0.55) => ({
  initial: { y, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration, delay },
});

export const inViewFadeSlide = (delay = 0, y = 12, duration = 0.55) => ({
  initial: { y, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration, delay },
});

export function MotionInView({
  children,
  delay = 0,
  y = 12,
  as = "div",
  className,
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      {...inViewFadeSlide(delay, y)}
      className={className}
    >
      {children}
    </Comp>
  );
}
