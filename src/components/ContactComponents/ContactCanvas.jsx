import { Canvas } from "@react-three/fiber";
import OrbitalArcs from "../OrbitalArcs";

// Fondo 3D de Contact (arcos orbitales). En su propio módulo para cargarse
// en un chunk aparte (Three.js) y de forma diferida tras el primer pintado.
export default function ContactCanvas() {
  return (
    <Canvas
      gl={{ alpha: true }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.08} />
      <pointLight position={[0, 0, 5]} intensity={1.2} color="#ff00ff" />
      <pointLight position={[-4, -2, -5]} intensity={1.0} color="#00ffff" />
      <OrbitalArcs />
    </Canvas>
  );
}
