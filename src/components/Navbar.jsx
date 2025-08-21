import { useState, useEffect, useRef } from "react";
import FullscreenMenu from "./FullScreenMenu";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const clickSound = useRef(null);

  // Cargar el sonido en el montaje
  useEffect(() => {
    clickSound.current = new Audio("/sounds/hover2.mp3");
    clickSound.current.volume = 0.4;
    clickSound.current.load();
  }, []);

  const playClickSound = () => {
    if (clickSound.current) {
      clickSound.current.currentTime = 0;
      clickSound.current.play().catch((e) =>
        console.warn("Sound play prevented:", e)
      );
    }
  };

  const handleLogoClick = () => {
    playClickSound();
    window.location.href = "/";
  };

  const handleMenuToggle = () => {
    playClickSound();
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-1 flex justify-between items-center text-white shadow-[0_4px_10px_rgba(0,0,0,0.4)] backdrop-blur-sm">
        {/* Logo + nombre */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick}>
          <img src="/logo.svg" alt="Logo" className="h-6" />
          <span className="text-md font-bold tracking-wide uppercase">
            Erika Hernández 
          </span>
        </div>

        {/* Botón menú (hamburger / close) */}
        <button
          onClick={handleMenuToggle}
          className="p-3 z-50 relative text-white"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="15" x2="21" y2="15" />
              </>
            )}
          </svg>
        </button>
      </header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export default Navbar;
