'use client'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

function Model() {
  const { scene } = useGLTF('/models/enchanting_table.glb')
  return (
    <primitive 
      object={scene} 
      scale={2} 
      position={[0, -1, 0]}
      rotation={[0.2, 0.4, 0]} // Slight initial rotation
    />
  )
}

export default function ModelViewer() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.5}
      />
    </Canvas>
  )
}