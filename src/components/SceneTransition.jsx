// src/components/SceneTransition.jsx
import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Starfield({ speed = 0.02 }) {
  const ref = useRef();
  const particles = useMemo(() => {
    const count = 4000; // Aumentamos la cantidad
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = Math.random() * -15;
      velocities[i] = 0.02 + Math.random() * 0.02;
    }

    return { positions, velocities, count };
  }, []);

  useFrame(() => {
    const positions = ref.current.geometry.attributes.position.array;
    const { velocities, count } = particles;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 2] += velocities[i] * speed;

      if (positions[i3 + 2] > 1) {
        positions[i3 + 0] = (Math.random() - 0.5) * 12;
        positions[i3 + 1] = (Math.random() - 0.5) * 12;
        positions[i3 + 2] = -15;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color("#ffffff")}
        size={0.015} // Más pequeño = más estrella
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.9}
      />
    </points>
  );
}

export default function SceneTransition({ active, onFinish }) {
  const duration = 2000; 

  useEffect(() => {
    if (active) {
      const timeout = setTimeout(() => {
        onFinish?.();
      }, duration);
      return () => clearTimeout(timeout);
    }
  }, [active, onFinish]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Starfield speed={2.2} />
      </Canvas>
    </div>
  );
}
