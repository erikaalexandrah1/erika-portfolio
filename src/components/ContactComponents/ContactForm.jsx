import React from "react";
import { motion } from "framer-motion";
import { Field, Input, Textarea } from "./FormControls";
import MagneticButton from "./MagneticButton";

const EASE = [0.2, 0.65, 0.3, 0.9];
const fade = (d = 0) => ({
  initial: { y: 18, opacity: 0, filter: "blur(3px)" },
  whileInView: { y: 0, opacity: 1, filter: "blur(0px)" },
  viewport: { once: false, amount: 0.5 },
  transition: { duration: 0.6, ease: EASE, delay: d },
});

export default function ContactForm({
  form,
  setForm,
  status,
  onSubmit,
  topics = ["General", "Classes", "Consulting", "Collaboration"],
}) {
  return (
    <motion.form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8"
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
            {topics.map((t) => (
              <option key={t} value={t} className="bg-[#0b0b0b]">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Field label="How can I help?" htmlFor="subject" />
          <Input
            id="subject"
            placeholder="Short subject"
            value={form.subject || ""}
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
          <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-emerald-300/80">
            Processing...
          </motion.span>
        )}
        {status === "error" && (
          <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-300/80">
            Couldn’t copy — try manual.
          </motion.span>
        )}
      </div>
    </motion.form>
  );
}
