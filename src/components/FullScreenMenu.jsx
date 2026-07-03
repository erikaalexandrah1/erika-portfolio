import React, { useEffect, useRef, useState } from "react";
import { menuItems } from "../data/menuItems";
import { useSceneTransition } from "../App";
import SoftBackground from "./ContactComponents/SoftBackground";
import { Canvas } from "@react-three/fiber";
import OrbitalArcs from "./OrbitalArcs";

const FADE_MS = 500;

function FullscreenMenu({ open, onClose }) {
  const [visible, setVisible] = useState(open);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const itemRefs = useRef([]);
  const hoverSound = useRef(null);
  const clickSound = useRef(null);
  const { navigateWithTransition } = useSceneTransition();

  // Montar/desmontar con animación
  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      // esperar fade-out y desmontar para no bloquear scroll
      const t = setTimeout(() => setVisible(false), FADE_MS);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Bloquear scroll del body solo cuando está abierto
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
  }, [open]);

  // ESC para cerrar
  useEffect(() => {
    if (!open) return;
    const listener = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [open, onClose]);

  // Indicador activo
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) setIndicatorTop(el.offsetTop);
  }, [activeIndex, open]);

  // Sonidos: hover (loop suave) y click (confirmación, tono ligeramente distinto)
  useEffect(() => {
    hoverSound.current = new Audio("/sounds/hover.mp3");
    hoverSound.current.volume = 0.3;
    hoverSound.current.load();

    clickSound.current = new Audio("/sounds/hover2.mp3");
    clickSound.current.volume = 0.45;
    clickSound.current.load();
  }, []);

  // Micro-parallax del fondo según la posición del mouse (look tipo consola)
  useEffect(() => {
    if (!open) return;
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      setParallax({ x: nx * 16, y: ny * 16 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [open]);

  const playHover = (i) => {
    const el = hoverSound.current;
    if (!el) return;
    el.currentTime = 0;
    // pitch ligeramente distinto por ítem para dar sensación de "selección" viva
    el.playbackRate = 0.94 + i * 0.05;
    el.play().catch(() => {});
  };

  const playClick = () => {
    const el = clickSound.current;
    if (!el) return;
    el.currentTime = 0;
    el.playbackRate = 1;
    el.play().catch(() => {});
  };

  const handleNavigation = (anchor) => {
    playClick();
    // El overlay vive por encima del router (ver App/TransitionLayer), así que
    // sobrevive al cambio de ruta y cubre la carga de la página destino.
    onClose();
    navigateWithTransition(anchor);
  };

  if (!visible) return null; // desmontado = no bloquea scroll

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        // pointer-events-auto solo cuando está abierto; durante fade-out sigue abierto
        className={`fixed inset-0 z-40 flex flex-col justify-center px-8 md:px-20
          transition-opacity duration-500 ease-in-out
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* Fondo base para el blend */}
        <div className="absolute inset-0 -z-20 bg-black pointer-events-none" aria-hidden="true" />

        {/* SoftBackground con micro-parallax */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
          aria-hidden="true"
        >
          <SoftBackground
            baseA="#0a0a0f"
            baseB="#050506"
            r1="rgba(91,108,255,0.16)"
            r2="rgba(194,91,255,0.12)"
            r3="rgba(0,200,180,0.08)"
          />
        </div>

        {/* Canvas con OrbitalArcs (no bloquea interacciones) */}
        <div
          className="absolute inset-0 -z-5 pointer-events-none transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${parallax.x * 0.6}px, ${parallax.y * 0.6}px, 0)` }}
          aria-hidden="true"
        >
          <Canvas
            gl={{ alpha: true }}
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            <OrbitalArcs />
          </Canvas>
        </div>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(1600px 900px at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Descripción */}
        <div className="text-sm text-white/60 mb-4 select-none">
          {activeIndex + 1}/{menuItems.length} — {menuItems[activeIndex].description}
        </div>

        {/* Menú vertical */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/15" />
          <div
            className="absolute left-0 w-2 h-16 rounded-sm transition-all duration-300"
            style={{
              top: `${indicatorTop}px`,
              background: "linear-gradient(180deg,#5b6cff,#a25bff,#ff5fa8)",
              boxShadow: "0 0 22px rgba(160,110,255,0.65), 0 0 46px rgba(91,108,255,0.35)",
            }}
          />
          <nav className="flex flex-col gap-10 pl-6 text-3xl md:text-5xl font-semibold tracking-wide text-white uppercase">
            {menuItems.map((item, i) => (
              <button
                key={item.anchor}
                ref={(el) => (itemRefs.current[i] = el)}
                onMouseEnter={() => {
                  setActiveIndex(i);
                  playHover(i);
                }}
                onClick={() => handleNavigation(item.anchor)}
                className="inline-flex items-baseline gap-4 w-fit"
              >
                <span
                  className={`text-xs md:text-sm font-mono tracking-widest transition-colors duration-300 ${
                    activeIndex === i ? "text-[#c07bff]" : "text-white/25"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={`font-extrabold text-left transition-all duration-300 origin-left cursor-pointer ${
                    activeIndex === i
                      ? "text-white scale-105 [text-shadow:0_0_28px_rgba(160,110,255,0.55)]"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {item.label}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer mini */}
        <div className="mt-10 text-xs text-white/55 select-none">
          Press <span className="px-1 py-0.5 rounded bg-white/10 border border-white/10">Esc</span> to close
        </div>
      </div>
    </>
  );
}

export default FullscreenMenu;
