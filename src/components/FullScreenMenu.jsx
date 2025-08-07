import React, { useEffect, useRef, useState } from "react";
import { menuItems } from "../data/menuItems";

function FullscreenMenu({ open, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (!open) return;
    const listener = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [open, onClose]);

  useEffect(() => {
    // Si el ref del ítem activo existe, ajustamos su posición
    const el = itemRefs.current[activeIndex];
    if (el) {
      setIndicatorTop(el.offsetTop);
    }
  }, [activeIndex, open]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black transition-opacity duration-500 ease-in-out ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } z-40 flex flex-col justify-center px-8 md:px-20`}
    >
      <div className="text-sm text-white/50 mb-4">
        {activeIndex + 1}/{menuItems.length} - {menuItems[activeIndex].description}
      </div>

      <div className="relative">
        {/* Línea lateral animada */}
        <div
          className="absolute left-0 w-1 h-14 bg-white transition-all duration-300"
          style={{ top: `${indicatorTop}px` }}
        ></div>

        <nav className="flex flex-col gap-10 pl-6 text-3xl md:text-5xl font-semibold tracking-wide text-white uppercase">
          {menuItems.map((item, i) => (
            <a
              key={item.anchor}
              href={item.anchor}
              onMouseEnter={() => setActiveIndex(i)}
              ref={(el) => (itemRefs.current[i] = el)}
              className={`flex flex-col items-start transition-transform duration-300 origin-left ${
                activeIndex === i
                  ? "text-white scale-105"
                  : "text-white/30 hover:text-white/60"
              }`}
            >
              <div className="font-extrabold">{item.label}</div>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default FullscreenMenu;
