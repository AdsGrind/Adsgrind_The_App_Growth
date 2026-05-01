"use client";

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, Html, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../layout/ThemeProvider';

// Coordinates for the markers
const MARKERS = [
  { id: 'in', name: 'India', lat: 20.5937, lng: 78.9629, reach: '95%', color: '#EE1D23' },
  { id: 'us', name: 'United States', lat: 37.0902, lng: -95.7129, reach: '85%', color: '#EE1D23' },
  { id: 'eu', name: 'Europe', lat: 54.5260, lng: 15.2551, reach: '75%', color: '#EE1D23' },
  { id: 'sea', name: 'Southeast Asia', lat: 13.41, lng: 103.52, reach: '88%', color: '#EE1D23' },
  { id: 'me', name: 'Middle East', lat: 29.2985, lng: 42.5510, reach: '82%', color: '#EE1D23' },
  { id: 'la', name: 'Latin America', lat: -14.2350, lng: -51.9253, reach: '70%', color: '#EE1D23' },
];

// Arcs to draw between regions
const ARCS = [
  { from: 'us', to: 'in', color: '#EE1D23' },
  { from: 'eu', to: 'in', color: '#9D50BB' },
  { from: 'sea', to: 'in', color: '#FF5800' },
  { from: 'us', to: 'eu', color: '#9D50BB' },
  { from: 'la', to: 'us', color: '#EE1D23' },
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

// Component for connecting arcs
const Arc = ({ from, to, color }: { from: THREE.Vector3, to: THREE.Vector3, color: string }) => {
  const lineRef = useRef<THREE.Line>(null);
  
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
    const distance = from.distanceTo(to);
    mid.normalize().multiplyScalar(2.5 + distance * 0.4); // Lift the midpoint based on distance
    return new THREE.QuadraticBezierCurve3(from, mid, to);
  }, [from, to]);

  const points = useMemo(() => curve.getPoints(50), [curve]);

  useFrame((state) => {
    if (lineRef.current) {
        // Subtle pulse for the arc
        const m = lineRef.current.material as THREE.LineBasicMaterial;
        m.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <line ref={lineRef as any}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={color} transparent opacity={0.3} linewidth={1} />
    </line>
  );
};

// Component for vertical light beams
const LightBeam = ({ position, color }: { position: THREE.Vector3, color: string }) => {
    const beamRef = useRef<THREE.Mesh>(null);
    const height = 1.5;

    // Position beam exactly on top of the sphere marker
    const normalizedPos = position.clone().normalize();
    const beamPos = position.clone().add(normalizedPos.multiplyScalar(height / 2));

    useFrame((state) => {
        if (beamRef.current) {
            const s = 0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
            beamRef.current.scale.set(s, 1, s);
            const m = beamRef.current.material as THREE.MeshBasicMaterial;
            m.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    return (
        <mesh ref={beamRef} position={beamPos} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normalizedPos)}>
            <cylinderGeometry args={[0.01, 0.05, height, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
    );
};

const GlobeOrbit = ({ radius, color, rotation }: { radius: number, color: string, rotation: [number, number, number] }) => {
    return (
        <group rotation={rotation}>
            <mesh>
                <ringGeometry args={[radius, radius + 0.01, 128]} />
                <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.1} />
            </mesh>
        </group>
    );
}

const GlobeMarker = ({ position, label, reach }: { position: THREE.Vector3, label: string, reach: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const s = 1 + Math.sin(time * 3) * 0.2;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      {/* Outer Pulse */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#EE1D23" transparent opacity={0.4} />
      </mesh>
      
      {/* Inner Core */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#EE1D23" />
      </mesh>

      {/* Label */}
      <Html distanceFactor={10} position={[0, 0.15, 0]} center occlude>
        <div className="flex flex-col items-center whitespace-nowrap pointer-events-none select-none">
          <div className="bg-black/90 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[8px] font-bold text-white uppercase tracking-tighter mb-1 shadow-2xl">
            {label}
          </div>
          <div className="text-[10px] font-black text-brand-orange drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{reach}</div>
        </div>
      </Html>

      {/* Vertical Beam */}
      <LightBeam position={position} color="#EE1D23" />
    </group>
  );
};

const GlobeCore = () => {
  const globeRef = useRef<THREE.Group>(null);
  const [textureError, setTextureError] = useState(false);

  // Using a darker, high-contrast texture to allow for glowing outlines
  const textureUrl = 'https://unpkg.com/three-globe/example/img/earth-dark.jpg';
  
  const colorMap = useLoader(THREE.TextureLoader, textureUrl);


  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.0015;
    }
  });

  const markerPositions = useMemo(() => {
    return MARKERS.reduce((acc, m) => {
        acc[m.id] = convertLatLongToSphere(m.lat, m.lng, 2.5);
        return acc;
    }, {} as Record<string, THREE.Vector3>);
  }, []);

  return (
    <group ref={globeRef}>
      {/* The Globe Sphere */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          map={colorMap}
          transparent
          opacity={0.8}
          color="#0a0a2a"
          emissive="#111166"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Atmosphere Glow / Halo */}
      <mesh>
        <sphereGeometry args={[2.58, 64, 64]} />
        <meshStandardMaterial 
          color="#1e1b4b"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Glowy Outline Mask Overlay */}
      <mesh>
          <sphereGeometry args={[2.52, 64, 64]} />
          <meshStandardMaterial 
            map={colorMap}
            transparent
            opacity={0.2}
            color="#00f2ff"
            emissive="#00f2ff"
            emissiveIntensity={2}
          />
      </mesh>

      {/* Tech Grid Overlay */}
      <mesh>
        <sphereGeometry args={[2.51, 48, 48]} />
        <meshBasicMaterial 
          wireframe 
          color="#4f46e5" 
          transparent 
          opacity={0.1} 
        />
      </mesh>

      {/* Arcs Connection */}
      {ARCS.map((arc, i) => (
          <Arc 
            key={i} 
            from={markerPositions[arc.from]} 
            to={markerPositions[arc.to]} 
            color={arc.color} 
          />
      ))}

      {/* Orbits */}
      <GlobeOrbit radius={3.2} color="#4f46e5" rotation={[Math.PI / 4, 0, 0]} />
      <GlobeOrbit radius={3.5} color="#9D50BB" rotation={[-Math.PI / 3, 0.5, 0]} />

      {/* Markers & Beams */}
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
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8.5]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#9D50BB" />
        
        {/* Background Space dots */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <React.Suspense fallback={null}>
          <GlobeCore />
        </React.Suspense>
      </Canvas>
    </div>
  );
};
