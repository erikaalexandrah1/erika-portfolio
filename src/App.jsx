import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Carga perezosa: cada escena se descarga en su propio chunk, solo al visitarla.
const Home = lazy(() => import("./scenes/Home"));
const Projects = lazy(() => import("./scenes/Projects"));
const About = lazy(() => import("./scenes/About"));
const Resources = lazy(() => import("./scenes/Resources"));
const Contact = lazy(() => import("./scenes/Contact"));

// Fallback mientras se descarga el chunk de la ruta.
function RouteFallback() {
  return (
    <div className="grid place-items-center w-full h-screen bg-black">
      <div className="h-8 w-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
