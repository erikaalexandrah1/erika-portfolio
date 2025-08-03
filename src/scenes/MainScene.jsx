import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'

export default function MainScene() {
  const group = useRef()

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.05
  })

  return (
    <group ref={group}>
      {/* Estrellas como fondo retro */}
      <Stars radius={50} depth={30} count={5000} factor={4} fade speed={1} />

      {/* Esfera vaporwave flotante */}
      <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.3}>
        <Sphere args={[1.7, 64, 64]} position={[0, 0, -5]}>
          <MeshDistortMaterial
            color="#ff00ff"
            distort={0.6}
            speed={3}
            emissive="#ff00ff"
            emissiveIntensity={1}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Esferas tenues flotantes (neón glow) */}
      {[...Array(6)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.25, 32, 32]}
          position={[
            Math.sin(i) * 3,
            Math.cos(i * 2) * 2,
            -3 + i * 0.4,
          ]}
        >
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.6}
            transparent
            opacity={0.2}
          />
        </Sphere>
      ))}
    </group>
  )
}
