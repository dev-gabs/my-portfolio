import React, { useMemo, useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';
import './ConstellationSphere.css';

interface OrbitalNodeProps {
  position: THREE.Vector3;
  label: string;
}

const OrbitalNode: React.FC<OrbitalNodeProps> = ({ position, label }) => {
  const [hovered, setHovered] = useState(false);
  const color = hovered ? '#38bdf8' : '#e2e8f0';
  const FONT_URL = "https://cdn.jsdelivr.net/npm/@fontsource/outfit@5.0.8/files/outfit-latin-500-normal.woff";

  const groupRef = useRef<THREE.Group>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.getWorldPosition(vec);
      const dist = state.camera.position.distanceTo(vec);
      // Scale proportionally to distance (7 is base camera Z)
      const baseScale = dist / 7;
      const finalScale = hovered ? baseScale * 1.3 : baseScale;
      groupRef.current.scale.set(finalScale, finalScale, finalScale);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.07, 32, 32]} />
        <meshBasicMaterial color="#704b2a" /> {/* Warm/different color to stand out */}
      </mesh>
      <Billboard>
        <Text
          position={[0, -0.25, 0]}
          font={FONT_URL}
          fontSize={0.22}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#0f172a"
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            setHovered(false);
            document.body.style.cursor = 'grab'; // Fallback to container default
          }}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
};

const SphereContent: React.FC = () => {
  const { t } = useLanguage();
  const labels = t.hero.sphereLabels || [];

  const numPoints = 80;
  const radius = 2.5;
  const textRadius = radius * 1.15;
  const maxDistance = 1.25;

  const { points, linesGeometry, pointPositions, textNodes } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    // Generate inner points
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }

    const nTexts = labels.length;
    const txtNodePts: { pos: THREE.Vector3; label: string }[] = [];
    if (nTexts > 0) {
      for (let i = 0; i < nTexts; i++) {
        // Distribute text nodes uniformly on an outer shell
        const y = 1 - (i / (nTexts - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        txtNodePts.push({
          pos: new THREE.Vector3(x * textRadius, y * textRadius, z * textRadius),
          label: labels[i]
        });
      }
    }

    const lineVertices: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      if (i % 12 === 0) {
        lineVertices.push(0, 0, 0, pts[i].x, pts[i].y, pts[i].z);
      }
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDistance) {
          lineVertices.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    // Connect the new anchor points back to the center as well
    for (let i = 0; i < txtNodePts.length; i++) {
      lineVertices.push(0, 0, 0, txtNodePts[i].pos.x, txtNodePts[i].pos.y, txtNodePts[i].pos.z);
    }

    const positions = new Float32Array(pts.length * 3);
    for (let i = 0; i < pts.length; i++) {
      positions[i * 3] = pts[i].x;
      positions[i * 3 + 1] = pts[i].y;
      positions[i * 3 + 2] = pts[i].z;
    }

    return { 
      points: pts, 
      linesGeometry: new Float32Array(lineVertices),
      pointPositions: positions,
      textNodes: txtNodePts
    };
  }, [labels, textRadius]);

  const [centerHover, setCenterHover] = useState(false);
  const centerScale = centerHover ? 1.2 : 1.0;

  return (
    <group>
      {/* Central Node highlight */}
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={centerHover ? 0.5 : 0.15} />
      </mesh>
      
      <Billboard>
        <Text
          position={[0, -0.5, 0]}
          font="https://cdn.jsdelivr.net/npm/@fontsource/outfit@5.0.8/files/outfit-latin-700-normal.woff"
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.025}
          outlineColor="#000000"
          scale={[centerScale, centerScale, centerScale]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setCenterHover(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setCenterHover(false);
            document.body.style.cursor = 'grab';
          }}
        >
          {t.hero.centerText}
        </Text>
      </Billboard>

      {/* Sphere points */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={pointPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#cbd5e1" size={0.05} transparent opacity={0.6} />
      </points>

      {/* Sphere connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linesGeometry.length / 3}
            array={linesGeometry}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#94a3b8" transparent opacity={0.2} />
      </lineSegments>

      {/* Orbital text nodes */}
      {textNodes.map((node, i) => (
        <OrbitalNode key={i} position={node.pos} label={node.label} />
      ))}
    </group>
  );
};

const ConstellationSphere: React.FC = () => {
  return (
    <div className="sphere-container">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <Suspense fallback={null}>
          <SphereContent />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default ConstellationSphere;
