import { useState } from "react";
import FullscreenMenu from "./FullScreenMenu";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center text-white">
        {/* Logo + nombre */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-6" />
          <span className="text-lg font-bold tracking-wide uppercase">
            Erika Hernández Zurilla
          </span>
        </div>

        {/* Botón menú (hamburger / close) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
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
