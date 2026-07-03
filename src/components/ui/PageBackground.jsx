/**
 * Fondo compartido del design system: base fría con grid sutil (look SaaS)
 * y glows azul/morado, coherente con el hero de Home. Úsalo en cualquier
 * vista para heredar la misma paleta y atmósfera.
 */
export default function PageBackground() {
  return (
    <>
      {/* Base profunda con leve tinte frío */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% -10%, #14162b 0%, transparent 60%), linear-gradient(180deg, #0a0a0f, #050506)",
        }}
        aria-hidden
      />

      {/* Grid sutil, difuminado hacia los bordes (look SaaS) */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 80%)",
        }}
        aria-hidden
      />

      {/* Glow de acento azul/morado */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 300px at 18% 12%, rgba(91,108,255,0.16), transparent 60%), radial-gradient(560px 300px at 82% 8%, rgba(194,91,255,0.12), transparent 60%), radial-gradient(700px 340px at 50% 108%, rgba(0,200,180,0.08), transparent 55%)",
          mixBlendMode: "screen",
        }}
        aria-hidden
      />

      {/* Grano muy sutil */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-40"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 160 160\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence baseFrequency=\\'.65\\' numOctaves=\\'2\\'/%3E%3CfeColorMatrix values=\\'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .06 0\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')",
        }}
        aria-hidden
      />
    </>
  );
}
