'use client'
import { useGLTF, OrbitControls, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'

function Model({ setError }) {
  try {
    const { scene } = useGLTF('/models/enchanting_table.glb')
    return <primitive object={scene} scale={2} position={[0, -1, 0]} />
  } catch (e) {
    setError(e.message)
    return null
  }
}

export default function ModelViewer() {
  const [error, setError] = useState(null)
  
  return (
    <div style={{
      width: '350px',
      height: '350px',
      border: error ? '2px solid red' : 'none',
      position: 'relative'
    }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <Suspense fallback={
          <Html center style={{ color: 'black' }}>Loading model...</Html>
        }>
          <Model setError={setError} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      {error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255,0,0,0.1)',
          color: 'red',
          padding: '1rem'
        }}>
          Error loading model: {error}
          <div style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
            Check: 1) File exists at public/models/ 2) Filename is exact 3) File is valid GLB
          </div>
        </div>
      )}
    </div>
  )
}