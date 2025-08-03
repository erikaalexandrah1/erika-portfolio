import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import './App.css'

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight />
      <directionalLight position={[2, 2, 2]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="skyblue" />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}

export default App
