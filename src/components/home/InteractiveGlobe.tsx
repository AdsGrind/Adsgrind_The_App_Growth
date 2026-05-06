"use client";

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Html, Stars, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Coordinates for the markers
const MARKERS = [
  { id: 'in', name: 'India', lat: 20.5937, lng: 78.9629, reach: '95%', color: '#FFFFFF' },
  { id: 'us', name: 'United States', lat: 37.0902, lng: -95.7129, reach: '90%', color: '#FFFFFF' },
  { id: 'eu', name: 'Europe', lat: 54.5260, lng: 15.2551, reach: '80%', color: '#FFFFFF' },
  { id: 'sea', name: 'Southeast Asia', lat: 13.41, lng: 103.52, reach: '70%', color: '#FFFFFF' },
  { id: 'me', name: 'Middle East', lat: 29.2985, lng: 42.5510, reach: '75%', color: '#FFFFFF' },
  { id: 'la', name: 'Latin America', lat: -14.2350, lng: -51.9253, reach: '85%', color: '#FFFFFF' },
];

// Arcs to draw between regions
const ARCS = [
  { from: 'us', to: 'in', color: '#FFFFFF' },
  { from: 'eu', to: 'in', color: '#FFFFFF' },
  { from: 'sea', to: 'in', color: '#FFFFFF' },
  { from: 'us', to: 'eu', color: '#FFFFFF' },
  { from: 'la', to: 'us', color: '#FFFFFF' },
  { from: 'me', to: 'in', color: '#FFFFFF' },
];

const convertLatLongToSphere = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Component for connecting arcs with moving pulses
const Arc = ({ from, to, color }: { from: THREE.Vector3, to: THREE.Vector3, color: string }) => {
  const lineRef = useRef<THREE.Line>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  
  const curve = new THREE.QuadraticBezierCurve3(
    from, 
    new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5).normalize().multiplyScalar(2.1 + from.distanceTo(to) * 0.4), 
    to
  );

  const points = curve.getPoints(64);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (lineRef.current) {
        const m = lineRef.current.material as THREE.LineBasicMaterial;
        m.opacity = 0.1 + Math.sin(time * 1.5) * 0.05;
    }
    if (pulseRef.current) {
        const t = (time * 0.3) % 1; // Pulse speed
        const pos = curve.getPointAt(t);
        pulseRef.current.position.set(pos.x, pos.y, pos.z);
        const s = 1 + Math.sin(time * 10) * 0.3;
        pulseRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
        <line ref={lineRef as any}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={color} transparent opacity={0.15} linewidth={1} blending={THREE.AdditiveBlending} />
        </line>
        
        {/* Data Pulse Dot */}
        <mesh ref={pulseRef}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} />
        </mesh>
    </group>
  );
};

// Component for vertical light beams
const LightBeam = ({ position, color }: { position: THREE.Vector3, color: string }) => {
    const beamRef = useRef<THREE.Mesh>(null);
    const height = 1.0;

    useFrame((state) => {
        if (beamRef.current) {
            const s = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
            beamRef.current.scale.set(s, 1, s);
            const m = beamRef.current.material as THREE.MeshBasicMaterial;
            m.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
        }
    });

    return (
        <mesh ref={beamRef} position={[0, height / 2, 0]}>
            <cylinderGeometry args={[0.002, 0.02, height, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.05} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};


const GlobeMarker = ({ position, label, reach }: { position: THREE.Vector3, label: string, reach: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orientation = new THREE.Quaternion();
  orientation.setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().normalize());

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const s = 1 + Math.sin(time * 4) * 0.2;
      meshRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group position={position} quaternion={orientation}>
      {/* Outer Glow Ring */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.07, 32]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Center Point */}
      <mesh>
        <sphereGeometry args={[0.015, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Label */}
      <Html 
        distanceFactor={10} 
        position={[0, 0.08, 0]} 
        center 
        occlude 
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center">
          <div className="bg-black/90 backdrop-blur-xl px-2 py-0.5 border border-white/10 text-[7px] font-bold text-white uppercase tracking-[0.3em] mb-1 whitespace-nowrap">
            {label}
          </div>
          <div className="text-[9px] font-bold text-white/40 tracking-[0.1em]">{reach}</div>
        </div>
      </Html>

      {/* Vertical Data Stream */}
      <LightBeam position={new THREE.Vector3(0, 0, 0)} color="#FFFFFF" />
    </group>
  );
};

const GlobeCore = () => {
  const globeRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  // Use night map for a dark, monochrome city-lights look
  const nightMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-night.jpg');

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0008; 
    }
    if (atmosphereRef.current) {
        atmosphereRef.current.scale.setScalar(1.02 + Math.sin(time * 0.5) * 0.005);
    }
  });

  const markerPositions = useMemo(() => {
    return MARKERS.reduce((acc, m) => {
        acc[m.id] = convertLatLongToSphere(m.lat, m.lng, 2.1);
        return acc;
    }, {} as Record<string, THREE.Vector3>);
  }, []);

  return (
    <group ref={globeRef} position={[0, 0, 0]}>
      {/* Base Earth Layer - Institutional Dark */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[2.1, 128, 128]} />
        <meshStandardMaterial 
          color="#050505"
          roughness={0.9}
          metalness={0.1}
          emissiveMap={nightMap}
          emissive={new THREE.Color('#FFFFFF')} 
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Atmospheric Glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.15, 64, 64]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Connections Layer */}
      {ARCS.map((arc, i) => (
          <Arc 
            key={i} 
            from={markerPositions[arc.from]} 
            to={markerPositions[arc.to]} 
            color={arc.color} 
          />
      ))}

      {/* Regional Anchors */}
      {MARKERS.map((m, i) => (
        <GlobeMarker 
          key={i} 
          position={markerPositions[m.id]} 
          label={m.name} 
          reach={m.reach}
        />
      ))}
    </group>
  );
};

export const InteractiveGlobe = () => {
  return (
    <div className="w-full h-full min-h-[450px] relative">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneController />
        <React.Suspense fallback={null}>
          <GlobeCore />
        </React.Suspense>
      </Canvas>
    </div>
  );
};

const SceneController = () => {
    const { camera, viewport } = useThree();
    
    useFrame(() => {
        const isMobile = viewport.width < 10; 
        const targetZ = isMobile ? 10 : 8;
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    });

    return (
        <>
            <PerspectiveCamera makeDefault />
            <OrbitControls 
                enablePan={false} 
                enableZoom={false} 
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI / 1.5} 
                autoRotate={false}
                enableDamping={true}
                dampingFactor={0.05}
                rotateSpeed={0.5}
            />
            
            <ambientLight intensity={0.1} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFFFFF" castShadow />
            <pointLight position={[-10, -5, -10]} intensity={0.5} color="#FFFFFF" />
            <directionalLight position={[5, 3, 5]} intensity={1} color="#FFFFFF" />
            
            <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.2} />
        </>
    );
}
