"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, Float, useGLTF } from "@react-three/drei"
import type * as THREE from "three"

function MinecraftPickaxe({ scale = 0.15 }) { // Reduced default scale
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/minecraft_pickaxe.glb')

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <group ref={group} scale={[scale, scale, scale]} position={[0, -0.5, 0]}> {/* Adjusted position */}
      <primitive object={scene} />
    </group>
  )
}

export default function PickaxeModel({ 
  className = "h-[80px] w-[80px] min-w-[80px]", // Added min-width
  scale = 0.15 // Smaller default scale
}) {
  return (
    <div className={`${className} overflow-visible mx-0`}> {/* Removed margin */}
      <Canvas
        camera={{
          position: [-2, 0, 8],
          fov: 25, // Narrower field of view
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.7} /> {/* Increased light */}
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <MinecraftPickaxe scale={scale} /> {/* Pass through scale prop */}
        </Float>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}