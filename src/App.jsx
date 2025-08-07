import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Projects from "./scenes/Projects";
import About from "./scenes/About";
import Resources from "./scenes/Resources";
import Contact from "./scenes/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
