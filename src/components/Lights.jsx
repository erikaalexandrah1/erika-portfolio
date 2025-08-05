export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />
    </>
  )
}
