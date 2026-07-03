import { lazy, Suspense, createContext, useContext, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SceneTransition from "./components/SceneTransition";
import ErrorBoundary from "./components/ErrorBoundary";

// Carga perezosa: cada escena se descarga en su propio chunk, solo al visitarla.
const Home = lazy(() => import("./scenes/Home"));
const Projects = lazy(() => import("./scenes/Projects"));
const About = lazy(() => import("./scenes/About"));
const Resources = lazy(() => import("./scenes/Resources"));
const Contact = lazy(() => import("./scenes/Contact"));
const NotFound = lazy(() => import("./scenes/NotFound"));

// Contexto para disparar la transición desde cualquier parte del árbol.
const TransitionContext = createContext(null);
export const useSceneTransition = () => useContext(TransitionContext);

// Fallback mientras se descarga el chunk de la ruta.
function RouteFallback() {
  return (
    <div className="grid place-items-center w-full h-screen bg-black">
      <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
    </div>
  );
}

// Capa de transición: vive por ENCIMA del router, de modo que el overlay
// sobrevive al cambio de ruta y cubre el hueco de carga de la página nueva.
function TransitionLayer({ children }) {
  const navigate = useNavigate();
  // `mounted` controla el montaje real (para liberar el Canvas de Three.js);
  // `active` controla la opacidad (fade-in / fade-out) del overlay.
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  const navigateWithTransition = useCallback(
    (to) => {
      setMounted(true);
      setActive(true);
      // Navegamos MIENTRAS el overlay cubre la pantalla: la página nueva
      // (y su chunk lazy) se monta por detrás sin que se vea la anterior.
      setTimeout(() => navigate(to), 1100);
      // Iniciamos el fade-out una vez la nueva página ya está montada detrás,
      // así el overlay se desvanece revelando directamente la página destino.
      setTimeout(() => setActive(false), 1600);
      // Desmontamos tras el fade-out para liberar el Canvas (no basta con
      // AnimatePresence: el Canvas de R3F puede quedar retenido en el DOM).
      setTimeout(() => setMounted(false), 2200);
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      {mounted && (
        <SceneTransition
          active={active}
          onFinish={() => {}}
          a="#0a0a0f"
          b="#050506"
          r1="rgba(91,108,255,0.16)"
          r2="rgba(194,91,255,0.12)"
          r3="rgba(0,200,180,0.08)"
          starColor="#eef6ff"
        />
      )}
    </TransitionContext.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <TransitionLayer>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TransitionLayer>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
