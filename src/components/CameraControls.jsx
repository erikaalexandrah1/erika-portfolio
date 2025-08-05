import { OrbitControls } from '@react-three/drei'

export default function CameraControls() {
  return (
    <OrbitControls
      target={[0, 1, 0]}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 3}
    />
  )
}
