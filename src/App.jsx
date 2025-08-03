import './app.css' 
import { Canvas } from '@react-three/fiber'
import Navbar from './components/Navbar'
import MainScene from './scenes/MainScene'

function App() {
  return (
    <>
      <Navbar />
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#ff00ff" />
        <pointLight position={[-4, -2, -5]} intensity={1.2} color="#00ffff" />
        <MainScene />
      </Canvas>
    </>
  )
}

export default App
