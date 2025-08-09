import React, { useEffect, useRef, useState } from "react";
import { menuItems } from "../data/menuItems";
import { useNavigate } from "react-router-dom";
import SceneTransition from "./SceneTransition";

function FullscreenMenu({ open, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const itemRefs = useRef([]);
  const hoverSound = useRef(null);
  const navigate = useNavigate();

  // ESC key to close
  useEffect(() => {
    if (!open) return;
    const listener = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [open, onClose]);

  // Update indicator position
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) setIndicatorTop(el.offsetTop);
  }, [activeIndex, open]);

  // Load hover sound
  useEffect(() => {
    hoverSound.current = new Audio("/sounds/hover.mp3");
    hoverSound.current.volume = 0.3;
    hoverSound.current.load();
  }, []);

  // Navigate with scene transition
  const handleNavigation = (anchor) => {
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      onClose();
      navigate(anchor);
    }, 1600); // matches SceneTransition
  };

  return (
    <>
      <div
        className={`fixed inset-0 transition-opacity duration-500 ease-in-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-40 flex flex-col justify-center px-8 md:px-20`}
      >
        {/* ===== Fondo opaco con tus gradientes ===== */}
        <div
          className="
            absolute inset-0 -z-10 pointer-events-none bg-black
            [background-image:
              radial-gradient(circle_at_20%_20%,rgba(88,113,255,0.12),transparent_60%),
              radial-gradient(circle_at_80%_30%,rgba(255,88,168,0.10),transparent_55%),
              radial-gradient(circle_at_50%_80%,rgba(0,255,200,0.08),transparent_50%),
              linear-gradient(180deg,#0b0b0b,#050505)
            ]
            [background-blend-mode:screen]
          "
        />
        {/* Grain (igual que en tus vistas) */}
        <div
          className="
            absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45
            [background-image:url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 160 160\\'%3E%3Cfilter id=\\'n\\'%3E%3CfeTurbulence baseFrequency=\\'.65\\' numOctaves=\\'2\\'/%3E%3CfeColorMatrix values=\\'0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .08 0\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23n)\\'/%3E%3C/svg%3E')]
          "
        />
        {/* Vignette para legibilidad */}
        <div
          className="
            absolute inset-0 pointer-events-none
            [background-image:radial-gradient(1600px_900px_at_center,transparent,rgba(0,0,0,0.45))]
          "
        />

        {/* Descripción dinámica */}
        <div className="text-sm text-white/60 mb-4">
          {activeIndex + 1}/{menuItems.length} — {menuItems[activeIndex].description}
        </div>

        {/* Menú vertical con indicador */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/15" />
          {/* Indicador animado */}
          <div
            className="absolute left-0 w-2 h-16 bg-white/90 rounded-sm shadow-[0_0_24px_rgba(255,255,255,0.35)] transition-all duration-300"
            style={{ top: `${indicatorTop}px` }}
          />
          {/* Ítems */}
          <nav className="flex flex-col gap-10 pl-6 text-3xl md:text-5xl font-semibold tracking-wide text-white uppercase">
            {menuItems.map((item, i) => (
              <button
                key={item.anchor}
                ref={(el) => (itemRefs.current[i] = el)}
                onMouseEnter={() => {
                  setActiveIndex(i);
                  if (hoverSound.current) {
                    hoverSound.current.currentTime = 0;
                    hoverSound.current.play().catch((e) => {
                      console.warn("Sound play prevented:", e);
                    });
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
        <div className="mt-10 text-xs text-white/55">
          Press <span className="px-1 py-0.5 rounded bg-white/10 border border-white/10">Esc</span> to close
        </div>
      </div>

      {/* Shader scene transition */}
      <SceneTransition active={transitioning} onFinish={() => {}} />
    </>
  );
}

export default FullscreenMenu;
