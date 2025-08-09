import React, { useEffect, useRef, useState } from "react";
import { menuItems } from "../data/menuItems";
import { useNavigate } from "react-router-dom";
import SceneTransition from "./SceneTransition";
import SoftBackground from "./ContactComponents/SoftBackground";
import { Canvas } from "@react-three/fiber";
import OrbitalArcs from "./OrbitalArcs";

const FADE_MS = 500; 

function FullscreenMenu({ open, onClose }) {
  const [visible, setVisible] = useState(open); 
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const itemRefs = useRef([]);
  const hoverSound = useRef(null);
  const navigate = useNavigate();

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

  // Sonido hover
  useEffect(() => {
    hoverSound.current = new Audio("/sounds/hover.mp3");
    hoverSound.current.volume = 0.3;
    hoverSound.current.load();
  }, []);

  const handleNavigation = (anchor) => {
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      onClose();
      navigate(anchor);
    }, 1600);
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

        {/* SoftBackground */}
        <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
          <SoftBackground
            baseA="#0b0b0b"
            baseB="#050505"
            r1="rgba(88,113,255,0.12)"
            r2="rgba(255,88,168,0.10)"
            r3="rgba(0,255,200,0.08)"
          />
        </div>

        {/* Canvas con OrbitalArcs (no bloquea interacciones) */}
        <div className="absolute inset-0 -z-5 pointer-events-none" aria-hidden="true">
          <Canvas
            gl={{ alpha: true }}
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ width: "100%", height: "100%" }}
          >
            <ambientLight intensity={0.08} />
            <pointLight position={[0, 0, 5]} intensity={1.2} color="#ff00ff" />
            <pointLight position={[-4, -2, -5]} intensity={1.0} color="#00ffff" />
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
            className="absolute left-0 w-2 h-16 bg-white/90 rounded-sm shadow-[0_0_24px_rgba(255,255,255,0.35)] transition-all duration-300"
            style={{ top: `${indicatorTop}px` }}
          />
          <nav className="flex flex-col gap-10 pl-6 text-3xl md:text-5xl font-semibold tracking-wide text-white uppercase">
            {menuItems.map((item, i) => (
              <button
                key={item.anchor}
                ref={(el) => (itemRefs.current[i] = el)}
                onMouseEnter={() => {
                  setActiveIndex(i);
                  if (hoverSound.current) {
                    hoverSound.current.currentTime = 0;
                    hoverSound.current.play().catch(() => {});
                  }
                }}
                onClick={() => handleNavigation(item.anchor)}
                className="inline-flex items-center w-fit"
              >
                <div
                  className={`font-extrabold text-left transition-transform duration-300 origin-left cursor-pointer ${
                    activeIndex === i
                      ? "text-white scale-105"
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


        <SceneTransition
            active={transitioning}
            onFinish={() => {}}
            a="#0b0b0b"
            b="#07070a"
            r1="rgba(58,96,255,0.15)"
            r2="rgba(255,112,164,0.10)"
            r3="rgba(0,220,180,0.08)"
            starColor="#eef6ff"
        />
    </>
  );
}

export default FullscreenMenu;
