import { Canvas } from "@react-three/fiber";
import NoisePlane from "../BackgroundNoise";

// Fondo 3D del Home. En su propio módulo para cargarse en un chunk aparte
// (Three.js) y de forma diferida tras el primer pintado.
export default function HomeCanvas() {
  return (
    <Canvas
      gl={{ alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#ff00ff" />
      <pointLight position={[-4, -2, -5]} intensity={1.2} color="#00ffff" />
      <NoisePlane />
    </Canvas>
  );
}
