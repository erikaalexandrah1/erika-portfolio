// src/components/SceneTransition.jsx
import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Starfield: campo de estrellas con desplazamiento en Z
 */
function Starfield({ speed = 2.2, count = 3500, spread = 12, depth = 15, size = 0.015, opacity = 0.9, color = "#ffffff" }) {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = Math.random() * -depth;
      velocities[i] = 0.02 + Math.random() * 0.02;
    }

    return { positions, velocities, count };
  }, [count, spread, depth]);

  useFrame(() => {
    const geo = ref.current.geometry;
    const positions = geo.attributes.position.array;
    const { velocities, count } = particles;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 2] += velocities[i] * speed;

      if (positions[i3 + 2] > 1) {
        positions[i3 + 0] = (Math.random() - 0.5) * spread;
        positions[i3 + 1] = (Math.random() - 0.5) * spread;
        positions[i3 + 2] = -depth;
      }
    }

    geo.attributes.position.needsUpdate = true;
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
        color={new THREE.Color(color)}
        size={size}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}


export default function SceneTransition({
  active,
  onFinish,
  // duración total del overlay (ms)
  duration = 2000,
  // paleta por defecto (tu paleta base)
  a = "#0b0b0b",
  b = "#050505",
  r1 = "rgba(88,113,255,0.12)",
  r2 = "rgba(255,88,168,0.10)",
  r3 = "rgba(0,255,200,0.08)",
  // opciones del starfield
  starColor = "#ffffff",
}) {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => onFinish?.(), duration);
    return () => clearTimeout(t);
  }, [active, duration, onFinish]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // el fade coincide con ~25% de la duración para entrada/salida
          transition={{ duration: Math.min(0.5, duration / 1000 * 0.25), ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          {/* ===== Capa 0: base negra para contraste del screen-blend ===== */}
          <div className="absolute inset-0 -z-30 bg-black" />

          {/* ===== Capa 1: radiales + linear con screen blend ===== */}
          <div
            className="absolute inset-0 -z-20 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, ${r1}, transparent 60%),
                radial-gradient(circle at 80% 30%, ${r2}, transparent 55%),
                radial-gradient(circle at 50% 80%, ${r3}, transparent 50%),
                linear-gradient(180deg, ${a}, ${b})
              `,
              mixBlendMode: "screen",
            }}
          />

          {/* ===== Capa 2: grain suave ===== */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1.2px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* ===== Capa 3: vignette (legibilidad) ===== */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(1600px 900px at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* ===== Canvas transparente con estrellas ===== */}
          <Canvas
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            dpr={[1, 1.8]}
            camera={{ position: [0, 0, 1] }}
            className="absolute inset-0"
          >
            <Starfield color={starColor} />
          </Canvas>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
