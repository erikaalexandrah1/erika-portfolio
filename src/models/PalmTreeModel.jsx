import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

export default function PalmTreeModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) {
  const { scene } = useGLTF('/models/PalmTree.glb')

  const clonedScene = useMemo(() => scene.clone(), [scene])

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

useGLTF.preload('/models/PalmTree.glb')
