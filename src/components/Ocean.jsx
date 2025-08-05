export default function Ocean() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
      <planeGeometry args={[120, 120, 1, 1]} />
      <meshStandardMaterial
        color="#77c9ff"
        flatShading
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}
