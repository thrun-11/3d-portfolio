import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { Avatar3D } from './Avatar3D';
import * as THREE from 'three';

interface SceneProps {
  rotation: { pitch: number; yaw: number; roll: number };
  blendshapes: Record<string, number>;
  isTracking: boolean;
  enableOrbitControls?: boolean;
}

function Lights() {
  return (
    <>
      {/* Soft ambient fill — slightly warm */}
      <ambientLight intensity={0.6} color="#D4C5E2" />

      {/* Main key light — soft warm from upper-right (portrait style) */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.8}
        color="#F5E6D3"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Fill light — softer from the left to reduce harsh shadows */}
      <directionalLight
        position={[-3, 3, 2]}
        intensity={0.6}
        color="#E8DCFF"
      />

      {/* Rim light — subtle purple/lavender from behind */}
      <directionalLight
        position={[0, 3, -4]}
        intensity={0.5}
        color="#B8A9D4"
      />

      {/* Low accent — warm bounce from ground */}
      <pointLight position={[0, -1, 1]} intensity={0.3} color="#D4A574" distance={6} />

      {/* Subtle overhead spot for hair/shoulder highlights */}
      <spotLight
        position={[0, 6, 0]}
        intensity={0.4}
        color="#F0E4FF"
        angle={0.5}
        penumbra={0.8}
        castShadow={false}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        color: '#94A3B8',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '2px solid rgba(255,255,255,0.1)',
          borderTopColor: '#818CF8',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <span style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em' }}>Loading...</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </Html>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(new THREE.Vector3(0, 0.0, 0));
  }, [camera]);
  return null;
}

function SceneOrbitControls({ enabled }: { enabled: boolean }) {
  const controlsRef = useRef<any>(null);

  return enabled ? (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      autoRotate={false}
      minDistance={3.8}
      maxDistance={3.8}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.8}
      target={[0.4, 0.1, 0]}
      dampingFactor={0.08}
      enableDamping
    />
  ) : null;
}

export function Scene({ rotation, blendshapes, isTracking, enableOrbitControls = false }: SceneProps) {
  return (
    <Canvas
      camera={{
        position: [-0.65, 0.4, 4.4],
        fov: 38,
        near: 0.1,
        far: 1000
      }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.4
      }}
      shadows
      style={{
        background: 'transparent'
      }}
    >
      <Lights />

      {/* Sunset environment for soft ambient reflections — background=false keeps canvas transparent */}
      <Environment preset="sunset" background={false} environmentIntensity={0.6} />

      {/* Avatar */}
      <Suspense fallback={<LoadingFallback />}>
        <CameraSetup />
        <Avatar3D
          rotation={rotation}
          blendshapes={blendshapes}
          isTracking={isTracking}
        />

        {/* Subtle contact shadows — transparent, no visible ground plane */}
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.3}
          scale={12}
          blur={2.5}
          far={4}
          resolution={512}
          color="#1a1028"
        />
      </Suspense>

      <SceneOrbitControls enabled={enableOrbitControls} />
    </Canvas>
  );
}
