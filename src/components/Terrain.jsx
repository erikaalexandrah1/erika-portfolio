import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export default function Terrain() {
  const terrainRef = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(60, 60, 40, 40)
    geo.rotateX(-Math.PI / 2)

    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      const y =
        Math.sin(x * 0.2) * 0.2 +
        Math.cos(z * 0.2) * 0.2 +
        Math.random() * 0.1
      pos.setY(i, y)
    }

    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  return (
    <mesh ref={terrainRef} geometry={geometry} receiveShadow>
      <meshStandardMaterial
        color="#f9e4b7"
        flatShading
        roughness={1}
        metalness={0}
      />
    </mesh>
  )
}
