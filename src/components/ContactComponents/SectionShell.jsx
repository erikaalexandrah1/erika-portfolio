import React from "react";

export default function SectionShell({ children, className = "" }) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="mx-auto w-[min(1100px,92vw)]">{children}</div>
    </section>
  );
}
