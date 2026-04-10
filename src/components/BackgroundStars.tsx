import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const StarFieldContent: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  // Create random points for a custom more "contrasty" layer
  const [positions] = useMemo(() => {
    const pos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    // Constant slow rotation for "life"
    pointsRef.current.rotation.z += 0.0004;
  });

  return (
    <group>
      {/* Base deep stars layer from Drei */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Interactive layer - custom points */}
      <Points ref={pointsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
};

const BackgroundStars: React.FC = () => {
  return (
    <div
      className="background-stars-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#06040a' // Deep black for high contrast
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <StarFieldContent />
      </Canvas>
    </div>
  );
};

export default BackgroundStars;
