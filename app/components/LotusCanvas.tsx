"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function LotusShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, 0.2, 0.4, 0.8, 0, 1.2);
    shape.bezierCurveTo(-0.4, 0.8, -0.3, 0.2, 0, 0);
    return new THREE.ShapeGeometry(shape, 12);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !innerRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.05;
    innerRef.current.rotation.y = -t * 0.5;
  });

  const outerPetals = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 1.2;
      const x = Math.cos(angle) * radius * 0.6;
      const z = Math.sin(angle) * radius * 0.6;
      return { angle, x, z };
    });
  }, []);

  const innerPetals = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 0.7;
      const x = Math.cos(angle) * radius * 0.5;
      const z = Math.sin(angle) * radius * 0.5;
      return { angle, x, z };
    });
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Outer petals */}
        {outerPetals.map(({ angle, x, z }, i) => (
          <mesh
            key={`outer-${i}`}
            geometry={petalGeometry}
            position={[x, -0.2, z]}
            rotation={[Math.PI / 2 - 0.4, 0, angle + Math.PI / 2]}
            scale={[0.7, 0.7, 0.7]}
          >
            <meshStandardMaterial
              color="#C9A84C"
              emissive="#8B6914"
              emissiveIntensity={0.3}
              metalness={0.3}
              roughness={0.4}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Inner petals */}
        <group ref={innerRef}>
          {innerPetals.map(({ angle, x, z }, i) => (
            <mesh
              key={`inner-${i}`}
              geometry={petalGeometry}
              position={[x, 0.1, z]}
              rotation={[Math.PI / 2 - 0.7, 0, angle + Math.PI / 2]}
              scale={[0.45, 0.45, 0.45]}
            >
              <meshStandardMaterial
                color="#1A7A4F"
                emissive="#0D5C3A"
                emissiveIntensity={0.4}
                metalness={0.2}
                roughness={0.3}
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>

        {/* Center sphere */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color="#E07B39"
            emissive="#C06020"
            emissiveIntensity={0.5}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>

        {/* Base disk */}
        <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.4, 64]} />
          <meshStandardMaterial
            color="#0D5C3A"
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  return (
    <Sparkles
      count={80}
      scale={6}
      size={1.5}
      speed={0.4}
      color="#C9A84C"
      opacity={0.6}
    />
  );
}

export default function LotusCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#F0D896" />
        <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#9DD0B8" />
        <pointLight position={[0, 3, 0]} intensity={0.8} color="#E07B39" />
        <LotusShape />
        <Particles />
      </Canvas>
    </div>
  );
}
