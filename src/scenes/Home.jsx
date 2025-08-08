import { Canvas } from '@react-three/fiber'
import Navbar from '../components/Navbar'
import NoisePlane from '../components/BackgroundNoise'

function Home() {
  return (
    <div className="w-full h-screen overflow-hidden bg-gradient-to-br from-[#0b1622] via-[#0e2233] to-[#01111d]">
      <Navbar />    
      <Canvas 
        style={{ width: '100vw', height: '100vh' }}
        camera={{ position: [0, 0, 6], fov: 50 }}>
        
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#ff00ff" />
        <pointLight position={[-4, -2, -5]} intensity={1.2} color="#00ffff" />
        <NoisePlane/>
      </Canvas>
    </div>
  )
}

export default Home
