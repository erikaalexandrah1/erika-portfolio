import { useRef, useMemo } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Ocean from '../components/Ocean'
import Terrain from '../components/Terrain'
import Sun from '../components/Sun'
import Lights from '../components/Lights'
import CameraControls from '../components/CameraControls'
import PalmTreeModel from '../models/PalmTreeModel'

export default function BeachScene() {
 return (
    <>
      {/* Cielo y niebla tipo playa/desierto */}
      <color attach="background" args={['#b2e3ff']} />
      <fog attach="fog" args={['#b2e3ff', 10, 50]} />

      <Ocean />
      <Terrain />
      <Sun />
      <Lights />
      <CameraControls />

      {[...Array(10)].map((_, i) => (
        <PalmTreeModel
          key={i}
          position={[Math.random() * 17 - 10, 1.2, Math.random() * 20 - 10]}
          rotation={[0, Math.random() * Math.PI * 2, 0]}
          scale={[0.05, 0.05, 0.05]}
        />
      ))}
    </>
  )
}