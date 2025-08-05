export default function Sun() {
  return (
    <mesh position={[-20, 8, -30]}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial color="#fff1c1" />
    </mesh>
  )
}
