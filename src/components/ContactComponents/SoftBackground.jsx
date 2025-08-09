import React, { useMemo } from "react";

export default function SoftBackground({
  baseA = "#0b0b0b",
  baseB = "#050505",
  r1 = "rgba(88,113,255,0.12)",
  r2 = "rgba(255,88,168,0.10)",
  r3 = "rgba(0,255,200,0.08)",
}) {
  const bgStyle = useMemo(
    () => ({
      background: `
        radial-gradient(circle at 20% 20%, ${r1}, transparent 60%),
        radial-gradient(circle at 80% 30%, ${r2}, transparent 55%),
        radial-gradient(circle at 50% 80%, ${r3}, transparent 50%),
        linear-gradient(180deg, ${baseA}, ${baseB})
      `,
      mixBlendMode: "screen",
    }),
    [baseA, baseB, r1, r2, r3]
  );

  return (
    <>
      <div className="absolute inset-0 -z-10 pointer-events-none" style={bgStyle} />
      <div
        className="absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45
                   [background-image:radial-gradient(rgba(255,255,255,.08)_1px,transparent_1.2px)]
                   [background-size:8px_8px]"
      />
    </>
  );
}
