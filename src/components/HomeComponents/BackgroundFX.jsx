export default function BackgroundFX() {
  return (
    <>
      <div
        className="
          absolute inset-0 -z-10 pointer-events-none
          [background-image:radial-gradient(circle_at_20%_20%,rgba(88,113,255,0.12),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(255,88,168,0.1),transparent_55%),radial-gradient(circle_at_50%_80%,rgba(0,255,200,0.08),transparent_50%),linear-gradient(180deg,#0b0b0b,#050505)]
          [background-blend-mode:screen]
        "
        aria-hidden
      />
      <div
        className="
          absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45
          [background-image:url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 160 160\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence baseFrequency=\\'.65\\' numOctaves=\\'2\\'/%3E%3CfeColorMatrix values=\\'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .08 0\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')]
        "
        aria-hidden
      />
    </>
  );
}
