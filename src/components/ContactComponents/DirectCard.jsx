import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import SocialLinks from "./SocialLinks";

const EASE = [0.2, 0.65, 0.3, 0.9];
const fade = (d = 0) => ({
  initial: { y: 18, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.6, ease: EASE, delay: d },
});

export default function DirectCard({ email, onCopy, socials }) {
  return (
    <motion.div
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8"
      {...fade(0.05)}
    >
      <h2 className="text-xl font-extrabold">Direct</h2>
      <p className="mt-1 text-white/70 text-sm">
        Prefer email? Copy it or open your client.
      </p>

     <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <code className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white/90 break-all">
            {email}
        </code>
    </div>

    <div className="mt-3 flex flex-row gap-3">
        <MagneticButton onClick={onCopy}>Copy</MagneticButton>
    </div>

      <div className="mt-8 h-px bg-white/10" />

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-white/80">
        Social
      </h3>

      <SocialLinks items={socials} />

      <div className="mt-8 h-px bg-white/10" />
      <p className="mt-6 text-xs text-white/50">Typical response time: within 24–48h.</p>
    </motion.div>
  );
}
