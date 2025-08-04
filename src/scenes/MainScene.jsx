import { useRef, useMemo } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function DesertScene() {
  const terrainRef = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 40, 40) 
    geo.rotateX(-Math.PI / 2)

    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const y =
        Math.sin(x * 0.2) * 0.8 +
        Math.cos(z * 0.2) * 0.6 +
        Math.random() * 0.3
      pos.setY(i, y)
    }

    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <>
      {/* Cielo y niebla */}
      <color attach="background" args={['#b2966d']} />
      <fog attach="fog" args={['#b2966d', 10, 50]} />

      {/* Terreno */}
      <mesh ref={terrainRef} geometry={geometry} receiveShadow>
        <meshStandardMaterial color="#a96e42" flatShading />
      </mesh>

      {/* Pirámides */}
      {[...Array(10)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.random() * 50 - 25,
            0.5,
            Math.random() * 50 - 25,
          ]}
          rotation={[0, Math.random() * Math.PI * 2, 0]}
        >
          <coneGeometry args={[1, 2, 4]} />
          <meshStandardMaterial color="#5c3b22" flatShading />
        </mesh>
      ))}

      {/* Sol */}
      <mesh position={[-20, 5, -30]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ffb3b3" />
      </mesh>

      {/* Luces */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Cámara */}
      <OrbitControls
        target={[0, 2, 0]}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      />
    </>
  )
}
