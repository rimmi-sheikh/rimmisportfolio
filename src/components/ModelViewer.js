'use client'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

export default function ModelViewer() {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.8} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls 
        enableZoom={false} 
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  )
}

function Model() {
  const { scene } = useGLTF('/models/enchanting_table.glb')
  return <primitive object={scene} scale={1.8} position={[0, -1.2, 0]} />
}