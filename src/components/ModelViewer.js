'use client'
import { useGLTF, OrbitControls, Html, useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'

function Loader() {
  const { progress } = useProgress()
  return <Html center style={{ color: 'black' }}>{progress.toFixed(1)}% loaded</Html>
}

function Model() {
  // Double-check your path matches exactly
  const { scene } = useGLTF('/models/enchanting_table.glb')
  return (
    <primitive 
      object={scene} 
      scale={2} 
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI/4, 0]} // Slight initial rotation
    />
  )
}

export default function ModelViewer() {
  return (
    <div style={{
      width: '350px',
      height: '350px',
      backgroundColor: '#f0f0f0', // Visible fallback
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        {/* Increased light intensities */}
        <ambientLight intensity={2.5} color="#ffffff" />
        <spotLight 
          position={[10, 15, 10]} 
          angle={0.25} 
          intensity={3} 
          penumbra={1} 
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={1} />

        <Suspense fallback={<Loader />}>
          <Model />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  )
}