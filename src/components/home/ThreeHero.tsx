"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/** Institutional white/grey floating particles */
const AeroParticles = ({ count = 3000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = radius * Math.cos(phi);

      // Monochrome: grey → white gradient
      const t = Math.random();
      colors[i * 3] = 0.5 + t * 0.5;     // R
      colors[i * 3 + 1] = 0.5 + t * 0.5; // G
      colors[i * 3 + 2] = 0.5 + t * 0.5; // B
    }
    return { positions: p, colors };
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0004;
      ref.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.positions.length / 3}
          array={points.positions}
          itemSize={3}
          args={[points.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={points.colors.length / 3}
          array={points.colors}
          itemSize={3}
          args={[points.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
};

/** Wireframe torus knot — monochrome structural element */
const AeroStructure = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.08;
      meshRef.current.rotation.y = t * 0.12;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.06;
      innerRef.current.rotation.z = t * 0.09;
    }
  });

  return (
    <group position={[1.2, 0, -2]}>
      {/* Outer torus knot - white wireframe */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.1, 0.28, 120, 24, 2, 3]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#888888"
          emissiveIntensity={0.2}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      {/* Inner ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[1.7, 0.015, 8, 80]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export const ThreeHero = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />
        <AeroParticles count={2500} />
        <AeroStructure />
      </Canvas>
      {/* Radial fade to black at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000_90%)]" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#000000] to-transparent" />
    </div>
  );
};
