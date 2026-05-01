"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../layout/ThemeProvider';
import { cn } from '@/components/ui';

const Particles = ({ count = 5000 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 10;
        p[i * 3 + 1] = (Math.random() - 0.5) * 10;
        p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
        ref.current.rotation.y += 0.001;
        ref.current.rotation.x += 0.0005;
    }
  });

    const { theme } = useTheme();
    
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color={theme === 'dark' ? "#9333EA" : "#7C3AED"}
                transparent
                opacity={theme === 'dark' ? 0.6 : 0.4}
                sizeAttenuation
            />
        </points>
    );
};

const AnimatedSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }
    });

    const { theme } = useTheme();

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef}>
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                <meshStandardMaterial 
                    color={theme === 'dark' ? "#E100FF" : "#A855F7"} 
                    emissive={theme === 'dark' ? "#7F00FF" : "#7C3AED"} 
                    emissiveIntensity={theme === 'dark' ? 0.5 : 0.3} 
                    wireframe 
                />
            </mesh>
        </Float>
    );
}

export const ThreeHero = () => {
    const { theme } = useTheme();
  return (
    <div className={cn(
        "absolute inset-0 -z-10 transition-colors duration-700",
        "bg-[#020617]"
    )}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={theme === 'dark' ? 0.3 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Particles count={2000} />
        <AnimatedSphere />
      </Canvas>
      <div className={cn(
          "absolute inset-0 transition-all duration-700",
          theme === 'dark' 
            ? "bg-gradient-to-b from-transparent via-[#020617]/20 to-[#020617]" 
            : "bg-gradient-to-b from-transparent via-white/20 to-white"
      )} />
    </div>
  );
};
