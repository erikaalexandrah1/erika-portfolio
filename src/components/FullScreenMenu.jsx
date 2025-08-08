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

  // Update line position
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) {
      setIndicatorTop(el.offsetTop);
    }
  }, [activeIndex, open]);

  // Load sound
  useEffect(() => {
    hoverSound.current = new Audio("/sounds/hover.mp3");
    hoverSound.current.volume = 0.3;
    hoverSound.current.load();
  }, []);

  // Handle navigation with scene transition
  const handleNavigation = (anchor) => {
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      onClose(); // Close the menu
      navigate(anchor); // Navigate after transition
    }, 1600); // Duration matches SceneTransition
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black transition-opacity duration-500 ease-in-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } z-40 flex flex-col justify-center px-8 md:px-20`}
      >
        {/* Radial background on the left */}
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_left,_rgba(0,0,0,0.6)_0%,_transparent_70%)]"></div>
        </div>

        {/* Description */}
        <div className="text-sm text-white/50 mb-4">
          {activeIndex + 1}/{menuItems.length} - {menuItems[activeIndex].description}
        </div>

        {/* Indicator + nav */}
        <div className="relative">
          {/* Animated side line */}
          <div
            className="absolute left-0 w-2 h-16 bg-white transition-all duration-300"
            style={{ top: `${indicatorTop}px` }}
          ></div>

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
                        : "text-white/30 hover:text-white/60"
                    }`}
                >
                    {item.label}
                </div>
            </button>

            ))}
          </nav>
        </div>
      </div>

      {/* Shader scene transition */}
      <SceneTransition active={transitioning} onFinish={() => {}} />
    </>
  );
}

export default FullscreenMenu;
