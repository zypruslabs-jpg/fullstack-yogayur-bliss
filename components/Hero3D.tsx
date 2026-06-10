'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Torus, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle system
function ChakraParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const chakraColors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#00FF00',
    '#00BFFF', '#4B0082', '#8B00FF',
  ];

  const { positions, colors } = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      color.set(chakraColors[Math.floor(Math.random() * chakraColors.length)]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <Points ref={pointsRef} limit={4000}>
      <PointMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
    </Points>
  );
}

// Sacred geometry ring
function SacredRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
  });

  return (
    <Torus ref={ref} args={[radius, 0.02, 8, 100]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.7} />
    </Torus>
  );
}

// Lotus petal shape
function LotusPetal({ angle, color }: { angle: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + angle) * 0.1;
  });

  const x = Math.cos(angle) * 1.2;
  const z = Math.sin(angle) * 1.2;

  return (
    <mesh ref={ref} position={[x, 0, z]} rotation={[0, -angle, Math.PI / 6]}>
      <sphereGeometry args={[0.45, 8, 8, 0, Math.PI]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.85} />
    </mesh>
  );
}

// 3D Lotus Flower
function Lotus() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  const petalColors = [
    '#FF6B35', '#FFD700', '#FF85A1', '#FF6B35',
    '#FFD700', '#FF85A1', '#FF6B35', '#FFD700',
  ];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    // Parallax
    groupRef.current.rotation.x = mouse.y * 0.2;
    groupRef.current.rotation.z = -mouse.x * 0.1;

    if (coreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Petals */}
      {petalColors.map((color, i) => (
        <LotusPetal key={i} angle={(i / petalColors.length) * Math.PI * 2} color={color} />
      ))}

      {/* Inner petals */}
      {[...Array(5)].map((_, i) => (
        <LotusPetal
          key={`inner-${i}`}
          angle={(i / 5) * Math.PI * 2 + Math.PI / 5}
          color={i % 2 === 0 ? '#FF85A1' : '#FFD700'}
        />
      ))}

      {/* Core */}
      <Sphere ref={coreRef} args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#FFD700" emissive="#FF6B35" emissiveIntensity={1} />
      </Sphere>

      {/* Sacred rings */}
      <SacredRing radius={2.5} color="#FFD700" speed={0.2} />
      <SacredRing radius={3} color="#FF6B35" speed={-0.15} />
      <SacredRing radius={3.5} color="#FF85A1" speed={0.1} />

      {/* Sparkle orbs */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 2 + Math.random() * 1;
        return (
          <SparkleOrb key={i} position={[Math.cos(angle) * r, Math.sin(angle * 0.5) * 0.5, Math.sin(angle) * r]} />
        );
      })}
    </group>
  );
}

function SparkleOrb({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => Math.random() * 2 + 1, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;
    const s = 0.5 + Math.sin(state.clock.elapsedTime * speed * 2 + offset) * 0.3;
    ref.current.scale.setScalar(s);
  });

  return (
    <Sphere ref={ref} args={[0.05, 8, 8]} position={position}>
      <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} />
    </Sphere>
  );
}

// Chakra energy orbs in background
function ChakraOrb({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => Math.random() * 0.3 + 0.1, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 2;
    ref.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.7) * 1;
  });

  return (
    <Sphere ref={ref} args={[0.3, 16, 16]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.5} />
    </Sphere>
  );
}

const chakraOrbs = [
  { position: [-8, 3, -5] as [number, number, number], color: '#FF0000' },
  { position: [8, -2, -5] as [number, number, number], color: '#FF7F00' },
  { position: [-6, -4, -3] as [number, number, number], color: '#FFFF00' },
  { position: [6, 4, -4] as [number, number, number], color: '#00FF00' },
  { position: [-10, 0, -6] as [number, number, number], color: '#00BCD4' },
  { position: [10, 2, -5] as [number, number, number], color: '#4B0082' },
  { position: [0, 6, -4] as [number, number, number], color: '#8B00FF' },
];

function Scene() {
  return (
    <>
      <color attach="background" args={['#0a0015']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#FFD700" />
      <pointLight position={[-5, -3, 3]} intensity={1} color="#FF6B35" />
      <pointLight position={[5, -3, 3]} intensity={1} color="#FF85A1" />

      <ChakraParticles />
      <Lotus />
      {chakraOrbs.map((orb, i) => (
        <ChakraOrb key={i} position={orb.position} color={orb.color} />
      ))}
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#0a0015' }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
