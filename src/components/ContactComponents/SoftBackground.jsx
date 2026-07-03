import React, { useMemo } from "react";

export default function SoftBackground({
  baseA = "#0a0a0f",
  baseB = "#050506",
  r1 = "rgba(91,108,255,0.16)",
  r2 = "rgba(194,91,255,0.12)",
  r3 = "rgba(0,200,180,0.08)",
}) {
  const bgStyle = useMemo(
    () => ({
      background: `
        radial-gradient(600px 300px at 18% 12%, ${r1}, transparent 60%),
        radial-gradient(560px 300px at 82% 8%, ${r2}, transparent 60%),
        radial-gradient(700px 340px at 50% 108%, ${r3}, transparent 55%),
        linear-gradient(180deg, ${baseA}, ${baseB})
      `,
      mixBlendMode: "screen",
    }),
    [baseA, baseB, r1, r2, r3]
  );

  return (
    <>
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `radial-gradient(1200px 700px at 50% -10%, #14162b 0%, transparent 60%), linear-gradient(180deg, ${baseA}, ${baseB})`,
        }}
      />
      <div
        className="absolute inset-0 -z-20 pointer-events-none opacity-[0.5]
                   [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
                   [background-size:56px_56px]
                   [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_30%,transparent_80%)]"
      />
      <div className="absolute inset-0 -z-10 pointer-events-none" style={bgStyle} />
      <div
        className="absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45
                   [background-image:radial-gradient(rgba(255,255,255,.08)_1px,transparent_1.2px)]
                   [background-size:8px_8px]"
      />
    </>
  );
}
