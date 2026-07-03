import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import SocialLinks from "./SocialLinks";

const EASE = [0.2, 0.65, 0.3, 0.9];
const fade = (d = 0) => ({
  initial: { y: 18, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.6, ease: EASE, delay: d },
});

export default function DirectCard({ email, socials }) {
  // Estado propio del copiado — independiente del status del formulario,
  // que vive en una card distinta y no tiene relación con esta acción.
  const [copyState, setCopyState] = useState("idle"); // idle | copied | error

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    } finally {
      setTimeout(() => setCopyState("idle"), 1800);
    }
  };

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

    <div className="mt-3 flex flex-row items-center gap-3">
        <MagneticButton onClick={handleCopy}>
          {copyState === "copied" ? "Copied ✓" : "Copy"}
        </MagneticButton>
        <AnimatePresence mode="wait">
          {copyState === "copied" && (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-emerald-300/80"
            >
              Email copied to clipboard
            </motion.span>
          )}
          {copyState === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-red-300/80"
            >
              Couldn’t copy — select the text manually.
            </motion.span>
          )}
        </AnimatePresence>
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
