"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, Float, useGLTF } from "@react-three/drei"
import type * as THREE from "three"

function MinecraftPickaxe({ scale = 0.2 }) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/minecraft_pickaxe.glb') // Update path to your GLB

  // Simple rotation animation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <group ref={group} scale={[scale, scale, scale]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  )
}

export default function PickaxeModel({ className = "h-[500px] w-[500px]" }) {
  return (
    <div className={`${className} overflow-visible`}>
      <Canvas
        camera={{
          position: [-2, 0, 8],
          fov: 35,
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[0, 0, 3]} intensity={0.5} color="#b27ee9" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <MinecraftPickaxe scale={0.9} />
        </Float>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5} 
        />
        <Environment preset="dawn" />
      </Canvas>
    </div>
  )
}