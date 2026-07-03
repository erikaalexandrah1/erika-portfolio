// src/components/SceneTransition.jsx
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Starfield: campo de estrellas con desplazamiento en Z.
 * Cada estrella se dibuja con un shader (núcleo brillante + halo redondo),
 * con tamaño y parpadeo (twinkle) propios y un ligero tinte de la paleta.
 * La velocidad tiene una rampa de entrada suave (ease-in) para que el
 * "salto" al warp se sienta orgánico en vez de arrancar a velocidad plena.
 */
function Starfield({ speed = 2.4, count = 4200, spread = 12, depth = 15, color = "#eaf2ff", rampInSec = 0.5 }) {
  const startRef = useRef(null);

  const { geometry, material, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count);

    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#bcd0ff"), // azul suave
      new THREE.Color("#e3c9ff"), // morado suave
      new THREE.Color("#c9fff2"), // cyan suave
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = Math.random() * -depth;
      velocities[i] = 0.02 + Math.random() * 0.02;
      sizes[i] = 0.25 + Math.random() * 0.75; // tamaños variados y sutiles
      phases[i] = Math.random() * Math.PI * 2; // fase de twinkle
      // ~70% blancas, ~30% con tinte de la paleta
      const c = Math.random() < 0.7 ? palette[0] : palette[1 + Math.floor(Math.random() * 3)];
      colors[i3 + 0] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScale: { value: 130 },
        uPixelRatio: { value: 1 },
        uOpacity: { value: 0.85 },
        uBase: { value: new THREE.Color(color) },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        attribute vec3 aColor;
        uniform float uTime;
        uniform float uScale;
        uniform float uPixelRatio;
        varying float vTw;
        varying vec3 vColor;
        void main() {
          vColor = aColor;
          // parpadeo suave e individual
          vTw = 0.55 + 0.45 * sin(uTime * 2.0 + aPhase);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float dist = max(-mv.z, 0.1);
          gl_PointSize = clamp(aSize * uScale * uPixelRatio / dist, 1.0, 42.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uOpacity;
        uniform vec3 uBase;
        varying float vTw;
        varying vec3 vColor;
        void main() {
          vec2 p = gl_PointCoord - 0.5;
          float d = length(p);
          if (d > 0.5) discard;          // recorte circular (no cuadrados)
          float core = smoothstep(0.5, 0.0, d);
          float glow = pow(core, 3.0);   // núcleo brillante + halo suave
          float alpha = glow * uOpacity * vTw;
          vec3 col = mix(uBase, vColor, 0.6) * (0.6 + 0.6 * vTw);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    return { geometry, material, velocities };
  }, [count, spread, depth, color]);

  // Liberar recursos GPU al desmontar (la transición monta/desmonta)
  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame((state, delta) => {
    if (startRef.current === null) startRef.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startRef.current;

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();

    // Ease-in cúbico: arranca lento y acelera hasta la velocidad de crucero,
    // como si el warp "prendiera motores" en vez de arrancar de golpe.
    const t = Math.min(1, elapsed / rampInSec);
    const eased = t * t * (3 - 2 * t);
    const currentSpeed = speed * (0.15 + 0.85 * eased);

    const positions = geometry.attributes.position.array;
    // normalizado a ~60fps para velocidad constante en cualquier pantalla
    const step = currentSpeed * delta * 60;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 2] += velocities[i] * step;
      if (positions[i3 + 2] > 1) {
        positions[i3 + 0] = (Math.random() - 0.5) * spread;
        positions[i3 + 1] = (Math.random() - 0.5) * spread;
        positions[i3 + 2] = -depth;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  });

  return <points geometry={geometry} material={material} />;
}

/** Sliding bar indeterminada: refuerza que algo está cargando detrás del overlay. */
function ProgressSliver() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden bg-white/5">
      <motion.div
        className="h-full w-1/3"
        style={{
          background: "linear-gradient(90deg, transparent, #5b6cff, #a25bff, #ff5fa8, transparent)",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "300%" }}
        transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], repeat: Infinity }}
      />
    </div>
  );
}

export default function SceneTransition({
  active,
  onFinish,
  // duración total del overlay (ms)
  duration = 2000,
  // paleta por defecto (tu paleta base)
  a = "#0a0a0f",
  b = "#050506",
  r1 = "rgba(91,108,255,0.16)",
  r2 = "rgba(194,91,255,0.12)",
  r3 = "rgba(0,200,180,0.08)",
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

          {/* ===== Capa 1: base fría, coherente con PageBackground ===== */}
          <div
            className="absolute inset-0 -z-30 pointer-events-none"
            style={{
              background: `radial-gradient(1200px 700px at 50% -10%, #14162b 0%, transparent 60%), linear-gradient(180deg, ${a}, ${b})`,
            }}
          />

          {/* ===== Capa 2: grid sutil, mismo look SaaS del resto del sitio ===== */}
          <div
            className="absolute inset-0 -z-20 pointer-events-none opacity-[0.4]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 80%)",
            }}
          />

          {/* ===== Capa 3: glows azul/morado, misma forma que PageBackground ===== */}
          <div
            className="absolute inset-0 -z-20 pointer-events-none"
            style={{
              background: `
                radial-gradient(600px 300px at 18% 12%, ${r1}, transparent 60%),
                radial-gradient(560px 300px at 82% 8%, ${r2}, transparent 60%),
                radial-gradient(700px 340px at 50% 108%, ${r3}, transparent 55%)
              `,
              mixBlendMode: "screen",
            }}
          />

          {/* ===== Capa 4: grain suave ===== */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none mix-blend-soft-light opacity-45"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1.2px)",
              backgroundSize: "8px 8px",
            }}
          />

          {/* ===== Capa 5: vignette (legibilidad) ===== */}
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

          {/* ===== Marca central: ancla visual con pulso de marca ===== */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.img
              src="/logo.svg"
              alt=""
              aria-hidden="true"
              className="h-12 w-12 md:h-14 md:w-14"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.9, 0.6, 0.9],
                scale: [0.8, 1, 0.96, 1],
              }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{
                opacity: { duration: 1.6, times: [0, 0.25, 0.6, 1], repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 1.6, times: [0, 0.25, 0.6, 1], repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ filter: "drop-shadow(0 0 18px rgba(160,110,255,0.55))" }}
            />
          </div>

          <ProgressSliver />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
