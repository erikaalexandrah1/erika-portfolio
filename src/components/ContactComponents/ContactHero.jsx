import React from "react";
import { motion } from "framer-motion";

const EASE = [0.2, 0.65, 0.3, 0.9];
const fade = (d = 0) => ({
  initial: { y: 18, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.6, ease: EASE, delay: d },
});

export default function ContactHero() {
  return (
    <section className="pt-28 ">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <motion.div {...fade(0)}>
          <div className="text-xs text-white/60 uppercase tracking-wider">Contact</div>
          <h1 className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight">Let’s talk</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Classes, collaborations, or ideas — I read everything. Short and clear works best.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
