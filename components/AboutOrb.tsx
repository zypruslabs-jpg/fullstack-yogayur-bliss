'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

function MorphingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  const chakraColors = [
    new THREE.Color('#FF6B35'),
    new THREE.Color('#FFD700'),
    new THREE.Color('#00A86B'),
    new THREE.Color('#00BCD4'),
    new THREE.Color('#7B2D8B'),
    new THREE.Color('#FF85A1'),
  ];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const colorIndex = Math.floor(t * 0.5) % chakraColors.length;
    const nextColorIndex = (colorIndex + 1) % chakraColors.length;
    const progress = (t * 0.5) % 1;

    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.color.lerpColors(chakraColors[colorIndex], chakraColors[nextColorIndex], progress);
    mat.emissive.lerpColors(chakraColors[colorIndex], chakraColors[nextColorIndex], progress);

    // Breathing pulse
    const scale = 1 + Math.sin(t * 0.8) * 0.1;
    meshRef.current.scale.setScalar(scale);

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.5;
      ring1Ref.current.rotation.x = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.4;
      ring2Ref.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={3} color="#FFD700" />
      <pointLight position={[-5, -5, 5]} intensity={2} color="#FF6B35" />

      <Sphere ref={meshRef} args={[1.8, 64, 64]}>
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.3}
        />
      </Sphere>

      <Torus ref={ring1Ref} args={[2.5, 0.05, 16, 100]}>
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1} />
      </Torus>

      <Torus ref={ring2Ref} args={[3, 0.04, 16, 100]}>
        <meshStandardMaterial color="#FF6B35" emissive="#FF6B35" emissiveIntensity={0.8} />
      </Torus>
    </group>
  );
}

export default function AboutOrb() {
  return (
    <div className="w-full h-80 lg:h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <MorphingOrb />
      </Canvas>
    </div>
  );
}
