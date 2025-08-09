import React from "react";

export function Field({ label, htmlFor, children, hint }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm text-white/70 mb-1.5">
      {label}
      {children}
      {hint ? <span className="mt-1 block text-xs text-white/50">{hint}</span> : null}
    </label>
  );
}

export function Input({ id, type = "text", className = "", ...props }) {
  return (
    <input
      id={id}
      type={type}
      className={`w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-white/90 outline-none
                  focus:border-white/20 focus:bg-white/7 transition-colors placeholder:text-white/40 ${className}`}
      {...props}
    />
  );
}

export function Textarea({ id, rows = 5, className = "", ...props }) {
  return (
    <textarea
      id={id}
      rows={rows}
      className={`w-full rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5 text-white/90 outline-none
                  focus:border-white/20 focus:bg-white/7 transition-colors placeholder:text-white/40 resize-y ${className}`}
      {...props}
    />
  );
}
