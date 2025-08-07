// src/components/NoisePlane.jsx
import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import glsl from "glslify";

// Definición del material personalizado con GLSL
const NoiseMaterial = shaderMaterial(
  { uTime: 0 },
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  glsl`
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;

    vec4 permute(vec4 x) {
      return mod(((x * 34.0) + 1.0) * x, 289.0);
    }

    float noise(vec2 v) {
      const vec4 C = vec4(0.211324865405187,
                          0.366025403784439,
                         -0.577350269189626,
                          0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);

      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;

      vec3 p0 = vec3(x0.x, x0.y, 0.0);
      vec3 p1 = vec3(x12.x, x12.y, 0.0);
      vec3 p2 = vec3(x12.z, x12.w, 0.0);

      vec3 m = max(0.5 - vec3(dot(p0,p0), dot(p1,p1), dot(p2,p2)), 0.0);
      m = m * m;
      m = m * m;

      vec3 x = 2.0 * fract(vec3(i.x, i.x + i1.x, i.x + 1.0) *
                           vec3(i.y, i.y + i1.y, i.y + 1.0) *
                           C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;

      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

      vec3 g;
      g.x  = a0.x * p0.x + h.x * p0.y;
      g.yz = a0.yz * p1.xy + h.yz * p1.yx;

      return 130.0 * dot(m, g);
    }

    void main() {
      float n = noise(vUv * 4.0 + uTime * 0.05);
      vec3 color = vec3(0.07 + n * 0.05);
      gl_FragColor = vec4(color, 0.08);  // muy tenue
    }
  `
);

extend({ NoiseMaterial });

export default function NoisePlane() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) ref.current.uTime = clock.getElapsedTime();
  });

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[20, 20]} />
      <noiseMaterial ref={ref} />
    </mesh>
  );
}
