'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

function HelixStrand() {
  const groupRef = useRef<THREE.Group>(null);

  const spheres = useMemo(() => {
    const items = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 6;
      const y = (t - 0.5) * 8;

      // Strand A
      items.push({
        id: `a-${i}`,
        position: [Math.cos(angle) * 1.2, y, Math.sin(angle) * 1.2] as [number, number, number],
        color: i % 3 === 0 ? '#FF6B35' : i % 3 === 1 ? '#FFD700' : '#FF85A1',
        size: 0.15,
      });

      // Strand B
      items.push({
        id: `b-${i}`,
        position: [Math.cos(angle + Math.PI) * 1.2, y, Math.sin(angle + Math.PI) * 1.2] as [number, number, number],
        color: i % 3 === 0 ? '#00A86B' : i % 3 === 1 ? '#00BCD4' : '#7B2D8B',
        size: 0.15,
      });

      // Connector
      if (i % 4 === 0) {
        const cx = (Math.cos(angle) + Math.cos(angle + Math.PI)) * 0.6;
        const cz = (Math.sin(angle) + Math.sin(angle + Math.PI)) * 0.6;
        items.push({
          id: `c-${i}`,
          position: [cx, y, cz] as [number, number, number],
          color: '#FFFFFF',
          size: 0.07,
        });
      }
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s) => (
        <Sphere key={s.id} args={[s.size, 8, 8]} position={s.position}>
          <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.6} />
        </Sphere>
      ))}
    </group>
  );
}

export default function DNAHelix() {
  return (
    <div className="w-full h-80">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#FFD700" />
        <pointLight position={[-5, -5, 5]} intensity={1.5} color="#00A86B" />
        <HelixStrand />
      </Canvas>
    </div>
  );
}
