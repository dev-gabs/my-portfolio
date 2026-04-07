import React, { useMemo, useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';
import './ConstellationSphere.css';

/* ==========================================
   CONFIGURAÇÃO VISUAL DA CONSTELAÇÃO (THEME)
   ==========================================
   Altere cores, tamanhos, fontes e opacidades 
   destas propriedades de forma centralizada! 
*/
export const SPHERE_THEME = {
  colors: {
    orbitTextHover: '#38bdf8', // sky-400
    orbitTextIdle: '#e2e8f0',  // slate-200
    anchorNode: '#d8ab6f',     // Dourado escuro quente
    centerText: '#ffffff',     // Branco
    centerNode: '#ffffff',     // Branco
    centerGlow: '#38bdf8',     // sky-400
    innerPoints: '#cbd5e1',    // slate-300
    connections: '#5f6976'     // slate-400
  },
  fonts: {
    medium: "https://cdn.jsdelivr.net/npm/@fontsource/outfit@5.0.8/files/outfit-latin-300-normal.woff",
    bold: "https://cdn.jsdelivr.net/npm/@fontsource/outfit@5.0.8/files/outfit-latin-500-normal.woff"
  },
  sizes: {
    orbitText: 0.22,
    anchorRadius: 0.07,
    centerText: 0.4,
    centerNodeRadius: 0.12,
    centerGlowRadius: 0.22,
    innerPoints: 0.06,
    hoverScalePoint: 1.05,
    hoverScaleCenter: 1.2
  },
  opacities: {
    centerGlowHover: 0.5,
    centerGlowIdle: 0.15,
    innerPoints: 0.6,
    connections: 0.15
  },
  geometry: {
    numPoints: 80,
    radius: 2.5,
    textRadiusMultiplier: 1.15, // Posição da órbita em relação ao raio original
    maxDistance: 1.25,
    arcSegments: 6
  },
  animation: {
    autoRotateSpeed: 0.5,
    dampingFactor: 0.05
  }
};

/* ========================================== */

interface OrbitalNodeProps {
  position: THREE.Vector3;
  label: string;
}

const OrbitalNode: React.FC<OrbitalNodeProps> = ({ position, label }) => {
  const [hovered, setHovered] = useState(false);
  const color = hovered ? SPHERE_THEME.colors.orbitTextHover : SPHERE_THEME.colors.orbitTextIdle;

  const groupRef = useRef<THREE.Group>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.getWorldPosition(vec);
      const dist = state.camera.position.distanceTo(vec);
      // Scale proportionally to distance (7 is base camera Z)
      const baseScale = dist / 7;
      const finalScale = hovered ? baseScale * SPHERE_THEME.sizes.hoverScalePoint : baseScale;
      groupRef.current.scale.set(finalScale, finalScale, finalScale);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <sphereGeometry args={[SPHERE_THEME.sizes.anchorRadius, 32, 32]} />
        <meshBasicMaterial color={SPHERE_THEME.colors.anchorNode} />
      </mesh>
      <Billboard>
        <Text
          position={[0, -0.25, 0]}
          font={SPHERE_THEME.fonts.medium}
          fontSize={SPHERE_THEME.sizes.orbitText}
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
          onPointerOut={() => {
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

  const { numPoints, radius, maxDistance, textRadiusMultiplier, arcSegments } = SPHERE_THEME.geometry;
  const textRadius = radius * textRadiusMultiplier;

  const { linesGeometry, pointPositions, textNodes } = useMemo(() => {
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

    const v1 = new THREE.Vector3();
    const v2 = new THREE.Vector3();

    const lineVertices: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      if (i % 12 === 0) {
        lineVertices.push(0, 0, 0, pts[i].x, pts[i].y, pts[i].z);
      }
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDistance) {
          const start = pts[i];
          const end = pts[j];
          // Create an arc along the surface instead of a straight chord
          for (let s = 0; s < arcSegments; s++) {
            const t1 = s / arcSegments;
            const t2 = (s + 1) / arcSegments;

            v1.copy(start).lerp(end, t1).normalize().multiplyScalar(radius);
            v2.copy(start).lerp(end, t2).normalize().multiplyScalar(radius);

            lineVertices.push(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
          }
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
      linesGeometry: new Float32Array(lineVertices),
      pointPositions: positions,
      textNodes: txtNodePts
    };
  }, [labels, textRadius, numPoints, radius, maxDistance, arcSegments]);

  const [centerHover, setCenterHover] = useState(false);
  const centerScale = centerHover ? SPHERE_THEME.sizes.hoverScaleCenter : 1.0;

  return (
    <group>
      {/* Central Node highlight */}
      <mesh>
        <sphereGeometry args={[SPHERE_THEME.sizes.centerNodeRadius, 32, 32]} />
        <meshBasicMaterial color={SPHERE_THEME.colors.centerNode} />
      </mesh>

      <mesh>
        <sphereGeometry args={[SPHERE_THEME.sizes.centerGlowRadius, 32, 32]} />
        <meshBasicMaterial
          color={SPHERE_THEME.colors.centerGlow}
          transparent
          opacity={centerHover ? SPHERE_THEME.opacities.centerGlowHover : SPHERE_THEME.opacities.centerGlowIdle}
        />
      </mesh>

      <Billboard>
        <Text
          position={[0, -0.5, 0]}
          font={SPHERE_THEME.fonts.bold}
          fontSize={SPHERE_THEME.sizes.centerText}
          color={SPHERE_THEME.colors.centerText}
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
            args={[pointPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={SPHERE_THEME.colors.innerPoints}
          size={SPHERE_THEME.sizes.innerPoints}
          transparent
          opacity={SPHERE_THEME.opacities.innerPoints}
        />
      </points>

      {/* Sphere connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linesGeometry, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={SPHERE_THEME.colors.connections}
          transparent
          opacity={SPHERE_THEME.opacities.connections}
        />
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
          autoRotateSpeed={SPHERE_THEME.animation.autoRotateSpeed}
          enableDamping={true}
          dampingFactor={SPHERE_THEME.animation.dampingFactor}
        />
      </Canvas>
    </div>
  );
};

export default ConstellationSphere;
