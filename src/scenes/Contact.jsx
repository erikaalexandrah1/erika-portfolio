import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";

/** --- Config --- */
const BG = {
  baseA: "#0b0b0b",
  baseB: "#050505",
  r1: "rgba(88,113,255,0.12)",
  r2: "rgba(255,88,168,0.10)",
  r3: "rgba(0,255,200,0.08)",
};

const EASE = [0.2, 0.65, 0.3, 0.9];
const fade = (d = 0) => ({
  initial: { y: 18, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.6, ease: EASE, delay: d },
});

/** --- Mini componentes --- */
function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm text-white/70 mb-1.5">
      {label}
      {children}
    </label>
  );
}

function Input({ id, type = "text", ...props }) {
  return (
    <input
      id={id}
      type={type}
      className="w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-white/90 outline-none
                 focus:border-white/20 focus:bg-white/7 transition-colors placeholder:text-white/40"
      {...props}
    />
  );
}

function Textarea({ id, rows = 5, ...props }) {
  return (
    <textarea
      id={id}
      rows={rows}
      className="w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-white/90 outline-none
                 focus:border-white/20 focus:bg-white/7 transition-colors placeholder:text-white/40 resize-y"
      {...props}
    />
  );
}

/** --- Botón “magnético” --- */
function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, [-1, 1], ["-6px", "6px"]);
  const ty = useTransform(my, [-1, 1], ["-6px", "6px"]);

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = (e.clientX - r.left) / r.width; // 0..1
        const y = (e.clientY - r.top) / r.height;
        mx.set(x * 2 - 1);
        my.set(y * 2 - 1);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ x: tx, y: ty }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5
                  border border-white/10 bg-white/5 hover:bg-white/10 text-white/90
                  uppercase tracking-wide text-sm transition-colors ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/** --- Componente principal --- */
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const bgStyle = useMemo(
    () => ({
      background: `
        radial-gradient(circle at 20% 20%, ${BG.r1}, transparent 60%),
        radial-gradient(circle at 80% 30%, ${BG.r2}, transparent 55%),
        radial-gradient(circle at 50% 80%, ${BG.r3}, transparent 50%),
        linear-gradient(180deg, ${BG.baseA}, ${BG.baseB})
      `,
      mixBlendMode: "screen",
    }),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    // mailto sin backend
    const subject = encodeURIComponent(`Contact: ${form.topic} — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`
    );
    const href = `mailto:erika@example.com?subject=${subject}&body=${body}`;

    // Simulamos envío + abrimos mailto
    setTimeout(() => {
      setStatus("sent");
      window.location.href = href;
      setTimeout(() => setStatus("idle"), 2000);
    }, 500);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("erika@example.com");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 1500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      {/* Fondo (mismo lenguaje visual) */}
      <div className="absolute inset-0 -z-10 pointer-events-none" style={bgStyle} />
      <div
        className="absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45
                   [background-image:radial-gradient(rgba(255,255,255,.08)_1px,transparent_1.2px)]
                   [background-size:8px_8px]"
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-10">
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

      {/* Layout */}
      <section className="pb-20">
        <div className="mx-auto w-[min(1100px,92vw)] grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lado izquierdo: datos rápidos */}
          <motion.div
            className="lg:col-span-1 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8"
            {...fade(0.05)}
          >
            <h2 className="text-xl font-extrabold">Direct</h2>
            <p className="mt-1 text-white/70 text-sm">
              Prefer email? Copy it or open your client.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <code className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white/90">
                erika@example.com
              </code>
              <MagneticButton onClick={copyEmail}>Copy</MagneticButton>
              <a
                className="inline-flex items-center rounded-full px-3 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-sm"
                href="mailto:erika@example.com?subject=Hello%20Erika"
              >
                Email →
              </a>
            </div>

            <div className="mt-8 h-px bg-white/10" />

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-white/80">
              Social
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/erika" },
                { label: "GitHub", href: "https://github.com/erika" },
                { label: "YouTube", href: "https://youtube.com/@erika" },
                { label: "X / Twitter", href: "https://twitter.com/erika" },
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 text-sm"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.03 }}
                >
                  {s.label} →
                </motion.a>
              ))}
            </div>

            <div className="mt-8 h-px bg-white/10" />
            <p className="mt-6 text-xs text-white/50">
              Typical response time: within 24–48h.
            </p>
          </motion.div>

          {/* Lado derecho: formulario */}
          <motion.form
            onSubmit={handleSubmit}
            className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8"
            {...fade(0.08)}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Field label="Name" htmlFor="name" />
                <Input
                  id="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Field label="Email" htmlFor="email" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div>
                <Field label="Topic" htmlFor="topic" />
                <select
                  id="topic"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-white/90 outline-none
                             focus:border-white/20 focus:bg-white/7 transition-colors"
                  value={form.topic}
                  onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                >
                  {["General", "Classes", "Consulting", "Collaboration"].map((t) => (
                    <option key={t} value={t} className="bg-[#0b0b0b]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Field label="How can I help?" htmlFor="msg" />
                <Input
                  id="msg"
                  placeholder="Short subject"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                />
              </div>
            </div>

            <div className="mt-4">
              <Field label="Message" htmlFor="message" />
              <Textarea
                id="message"
                placeholder="Write a concise message (what, context, outcome)."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <MagneticButton type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </MagneticButton>
              {status === "sent" && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-emerald-300/80"
                >
                  Done — thanks!
                </motion.span>
              )}
              {status === "error" && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-300/80"
                >
                  Couldn’t copy — try manual.
                </motion.span>
              )}
            </div>
          </motion.form>
        </div>
      </section>

      {/* CTA final estilo “cards” */}
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
                href="mailto:erika@example.com?subject=Call%20request&body=Hi%20Erika,%0AHere%20are%20two%20times%20that%20work%20for%20me:%0A- %0A- %0A"
                className="rounded-full px-4 py-2.5 border border-white/10 bg-white/5 hover:bg-white/10 text-sm uppercase tracking-wide"
              >
                Request a call →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-8" />
    </div>
  );
}
