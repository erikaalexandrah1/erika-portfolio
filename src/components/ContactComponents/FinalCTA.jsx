import React from "react";
import { motion } from "framer-motion";

const EASE = [0.2, 0.65, 0.3, 0.9];
const fade = (d = 0) => ({
  initial: { y: 18, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.6, ease: EASE, delay: d },
});

export default function FinalCTA({ email }) {
  return (
    <section className="pb-16">
      <div className="mx-auto w-[min(1100px,92vw)]">
        <motion.div
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8 text-center"
          {...fade(0.1)}
        >
          <h3 className="text-xl md:text-2xl font-extrabold">Prefer a quick call?</h3>
          <p className="mt-1 text-white/70 max-w-2xl mx-auto">
            Send me two time slots and I’ll share a short video link. No obligations.
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a
              href={`mailto:${email}?subject=Call%20request&body=Hi%20Erika,%0AHere%20are%20two%20times%20that%20work%20for%20me:%0A- %0A- %0A`}
              className="rounded-full px-4 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-sm uppercase tracking-wide"
            >
              Request a call →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
