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
      <NoisePlane />
    </Canvas>
  );
}
