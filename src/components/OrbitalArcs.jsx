// src/components/OrbitalArcs.jsx
import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "glslify";


const OrbitalArcsMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uAspect: 1.0,
    uIntensity: 1.0, 
  },
  // Vertex
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment
  glsl`
    precision highp float;

    varying vec2 vUv;
    uniform float uTime;
    uniform float uAspect;
    uniform float uIntensity;

    // Paleta (normalizada 0..1)
    const vec3 COL_BLUE = vec3(88.0/255.0, 113.0/255.0, 1.0);
    const vec3 COL_PINK = vec3(1.0, 88.0/255.0, 168.0/255.0);
    const vec3 COL_CYAN = vec3(0.0, 1.0, 200.0/255.0);

    // Suaviza bordes
    float smooth01(float x, float e0, float e1) {
      return smoothstep(e0, e1, x);
    }

    // SDF de anillo (ring). Devuelve distancia firmada al borde del anillo.
    // r = radio del anillo, w = grosor (half-width).
    float sdRing(vec2 p, float r, float w) {
      float d = abs(length(p) - r) - w;
      return d;
    }

    // Ventana angular suave entre a0 y a1 (en radianes, con wrap 0..2PI)
    float angleWindow(float ang, float a0, float a1) {
      // Normalizar angulo a [0,2PI)
      const float PI = 3.141592653589793;
      const float TWO_PI = 6.283185307179586;
      float a = mod(ang, TWO_PI);
      float s0 = a0;
      float s1 = a1;
      // Si cruza el 2PI, dividimos en dos ventanas
      if (s1 < s0) {
        float m1 = smoothstep(s0, s0 + 0.1, a) * (1.0 - smoothstep(s1, s1 + 0.1, a));
        float m2 = smoothstep(0.0, 0.1, a) * (1.0 - smoothstep(s1, s1 + 0.1, a));
        // Este enfoque puede ser brusco; mejor usar una métrica periódica:
      }
      // Métrica periódica: distancia angular mínima a [a0,a1]
      // Convertimos a punto medio y ancho
      float mid = 0.5*(a0 + a1);
      float span = abs(a1 - a0);
      if (span > TWO_PI) span = TWO_PI;
      // Distancia angular mínima al centro del arco
      float d = abs(atan(sin(a-mid), cos(a-mid)));
      float halfSpan = 0.5*span;
      // máscara suave: dentro = 1, fuera = 0
      float m = 1.0 - smoothstep(halfSpan, halfSpan + 0.2, d); // 0.2 controla suavidad del borde angular
      return m;
    }

    // Glow exponencial suave a partir de una distancia firmada
    float softGlow(float sd, float k) {
      // sd<0 dentro; usamos |sd| para un halo simétrico
      return exp(-k * abs(sd));
    }

    // Rotación 2D
    vec2 rot(vec2 p, float a) {
      float s = sin(a), c = cos(a);
      return mat2(c,-s,s,c) * p;
    }

    void main() {
      // mapeo a espacio centrado y corregido por aspecto (para que los círculos no se aplasten)
      vec2 uv = vUv * 2.0 - 1.0;
      uv.x *= uAspect;

      // Ligera rotación global muy lenta para evitar estático total
      float t = uTime;
      uv = rot(uv, 0.05 * sin(t * 0.07));

      // Parámetros base
      float baseR = 0.45;   // radio central de los arcos
      float w     = 0.015;  // grosor del arco (half-width)
      float kGlow = 22.0;   // caída del glow
      float a     = atan(uv.y, uv.x);

      // Animaciones suaves en radio y fase
      float r1 = baseR + 0.05 * sin(t * 0.35 + 1.2);
      float r2 = baseR + 0.10 * sin(t * 0.30 + 3.4);
      float r3 = baseR + 0.07 * sin(t * 0.27 - 0.8);

      float phase1 = 0.8 * sin(t * 0.20 + 0.5);
      float phase2 = 0.8 * sin(t * 0.18 + 2.1);
      float phase3 = 0.8 * sin(t * 0.22 - 1.3);

      // Longitud angular de cada arco (en rad)
      float span1 = 1.9 + 0.2 * sin(t * 0.17);
      float span2 = 1.6 + 0.25* sin(t * 0.14 + 1.0);
      float span3 = 2.1 + 0.18* sin(t * 0.16 - 0.6);

      // Máscaras angulares
      float m1 = angleWindow(a, phase1, phase1 + span1);
      float m2 = angleWindow(a, phase2, phase2 + span2);
      float m3 = angleWindow(a, phase3, phase3 + span3);

      // SDF de anillos
      float sd1 = sdRing(uv, r1, w);
      float sd2 = sdRing(uv, r2, w);
      float sd3 = sdRing(uv, r3, w);

      // Glows (máscara radial * máscara angular)
      float g1 = softGlow(sd1, kGlow) * m1;
      float g2 = softGlow(sd2, kGlow) * m2;
      float g3 = softGlow(sd3, kGlow) * m3;

      // Sutil “parpadeo” micro para vida (muy pequeño)
      float micro = 0.02 * sin(uv.x * 12.0 + uv.y * 10.0 + t * 0.8);

      // Combinamos colores con tu paleta, muy suaves y sumativos
      vec3 col =
          g1 * COL_BLUE +
          g2 * COL_PINK +
          g3 * COL_CYAN;

      // Realce mínimo central (un puntito de aura muy tenue)
      float centerGlow = exp(-18.0 * dot(uv, uv));
      col += 0.12 * centerGlow * (COL_BLUE * 0.5 + COL_CYAN * 0.5);

      // Ajuste de intensidad global + micro variación
      col *= (0.55 + 0.45 * uIntensity) + micro;

      // Límite suave para evitar “hard edges” al borde del plane
      float vignette = smoothstep(1.1, 0.6, length(uv));
      col *= vignette;

      // Muy tenue para integrarse con tu .resources__bg
      float alpha = 0.08; // puedes subir a 0.12 si lo quieres un pelín más presente
      gl_FragColor = vec4(col, alpha);
    }
  `
);

extend({ OrbitalArcsMaterial });

export default function OrbitalArcs() {
  const ref = useRef();

  useFrame(({ clock, size, viewport }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
      ref.current.uAspect = size.width / size.height;
      ref.current.uIntensity = 1.0; 
    }
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[20, 20]} />
      <orbitalArcsMaterial ref={ref} transparent depthWrite={false} />
    </mesh>
  );
}
