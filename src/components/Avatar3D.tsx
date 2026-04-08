import { useRef, useEffect, useCallback } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { toEuler, generateIdleRotation } from '../utils/faceToRotation';

interface Avatar3DProps {
  rotation: { pitch: number; yaw: number; roll: number };
  blendshapes: Record<string, number>;
  isTracking: boolean;
}



type ReactionType = 'surprise' | 'flinch' | 'wave' | null;

export function Avatar3D({ rotation, blendshapes, isTracking }: Avatar3DProps) {
  const group = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Bone | null>(null);
  const neckRef = useRef<THREE.Bone | null>(null);
  const spineRef = useRef<THREE.Bone | null>(null);
  const rightArmRef = useRef<THREE.Bone | null>(null);
  const rightForeArmRef = useRef<THREE.Bone | null>(null);
  const leftArmRef = useRef<THREE.Bone | null>(null);
  const leftForeArmRef = useRef<THREE.Bone | null>(null);
  const idleTimeRef = useRef(0);
  const blendshapeMeshes = useRef<THREE.SkinnedMesh[]>([]);
  const waveTimeRef = useRef(0);
  const hasWaved = useRef(false);
  const bonesFound = useRef(false);

  // Click reaction state
  const reactionRef = useRef<ReactionType>(null);
  const reactionTimeRef = useRef(0);
  const reactionCooldownRef = useRef(0);

  // Store bone rest rotations for reactions
  const boneRestRotations = useRef<Record<string, THREE.Euler>>({});

  // Load GLB model with animations
  const gltf = useGLTF('/model-9.glb');
  const { scene, animations } = gltf;
  const { actions, mixer } = useAnimations(animations, group);

  // Start idle animation
  useEffect(() => {
    const actionNames = Object.keys(actions);
    console.log('[Avatar3D] Available actions:', actionNames);

    if (actionNames.length > 0) {
      const idleAction = actions[actionNames[0]];
      if (idleAction) {
        console.log('[Avatar3D] Playing:', actionNames[0]);
        idleAction.reset().fadeIn(0.3).play();
        idleAction.setLoop(THREE.LoopRepeat, Infinity);
        idleAction.timeScale = 1;
      }
    }

    return () => {
      mixer?.stopAllAction();
    };
  }, [actions, mixer]);

  // Find bones and blendshape meshes
  useEffect(() => {
    if (!scene || bonesFound.current) return;

    scene.traverse((object) => {
      if (object instanceof THREE.Bone) {
        const name = object.name;
        if (name === 'Head' && !headRef.current) {
          headRef.current = object;
          boneRestRotations.current['Head'] = object.rotation.clone();
        }
        if (name === 'Neck' && !neckRef.current) {
          neckRef.current = object;
          boneRestRotations.current['Neck'] = object.rotation.clone();
        }
        if (name === 'Spine1' || name === 'Spine2') {
          if (!spineRef.current) {
            spineRef.current = object;
            boneRestRotations.current['Spine'] = object.rotation.clone();
          }
        }
        if (name === 'RightArm' && !rightArmRef.current) {
          rightArmRef.current = object;
          boneRestRotations.current['RightArm'] = object.rotation.clone();
        }
        if (name === 'RightForeArm' && !rightForeArmRef.current) {
          rightForeArmRef.current = object;
          boneRestRotations.current['RightForeArm'] = object.rotation.clone();
        }
        if (name === 'LeftArm' && !leftArmRef.current) {
          leftArmRef.current = object;
          boneRestRotations.current['LeftArm'] = object.rotation.clone();
        }
        if (name === 'LeftForeArm' && !leftForeArmRef.current) {
          leftForeArmRef.current = object;
          boneRestRotations.current['LeftForeArm'] = object.rotation.clone();
        }
      }
      if (object instanceof THREE.SkinnedMesh && object.morphTargetDictionary) {
        blendshapeMeshes.current.push(object);
      }
    });

    bonesFound.current = true;
    console.log('[Avatar3D] Bones found - Head:', !!headRef.current, 'Neck:', !!neckRef.current,
      'Spine:', !!spineRef.current, 'RightArm:', !!rightArmRef.current, 'LeftArm:', !!leftArmRef.current);
    console.log('[Avatar3D] Blendshape meshes:', blendshapeMeshes.current.length);

    // Log available morph target names for debugging
    if (blendshapeMeshes.current.length > 0) {
      const dict = blendshapeMeshes.current[0].morphTargetDictionary;
      if (dict) {
        console.log('[Avatar3D] Available morph targets:', Object.keys(dict).join(', '));
      }
    }
  }, [scene]);

  // Set a single blendshape
  function setBlendshape(name: string, value: number) {
    blendshapeMeshes.current.forEach((mesh) => {
      if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
        const index = mesh.morphTargetDictionary[name];
        if (index !== undefined) {
          mesh.morphTargetInfluences[index] = value;
        }
      }
    });
  }

  // Apply all blendshapes from tracking — high sensitivity, amplified values
  function applyAllBlendshapes(shapes: Record<string, number>) {
    const AMPLIFY = 1.8; // Amplify expressions for more visible results
    blendshapeMeshes.current.forEach((mesh) => {
      if (!mesh.morphTargetDictionary || !mesh.morphTargetInfluences) return;
      for (const [name, value] of Object.entries(shapes)) {
        const index = mesh.morphTargetDictionary[name];
        if (index !== undefined) {
          const amplified = Math.min(value * AMPLIFY, 1.0);
          mesh.morphTargetInfluences[index] = THREE.MathUtils.lerp(
            mesh.morphTargetInfluences[index],
            amplified,
            0.7 // High responsiveness — fast follow
          );
        }
      }
    });
  }

  // Clear all blendshapes back to neutral
  function clearAllBlendshapes() {
    blendshapeMeshes.current.forEach((mesh) => {
      if (mesh.morphTargetInfluences) {
        for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
          mesh.morphTargetInfluences[i] = THREE.MathUtils.lerp(
            mesh.morphTargetInfluences[i],
            0,
            0.1
          );
        }
      }
    });
  }



  // Handle click on avatar
  const handleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (reactionCooldownRef.current > 0 || isTracking) return;

    // Always trigger the wave greeting on click
    reactionRef.current = 'wave';
    reactionTimeRef.current = 0;
    reactionCooldownRef.current = 2.0; // 2 second cooldown
  }, [isTracking]);

  // Per-frame animation
  useFrame((state, delta) => {
    if (!group.current) return;

    // Pause the idle animation exactly when face tracking is active per user request
    const actionNames = Object.keys(actions);
    if (actionNames.length > 0) {
      const idleAction = actions[actionNames[0]];
      if (idleAction) {
        idleAction.paused = isTracking;
      }
    }

    // Update cooldown
    if (reactionCooldownRef.current > 0) {
      reactionCooldownRef.current -= delta;
    }

    // ── Wave greeting on first load ──
    if (!hasWaved.current && rightArmRef.current) {
      waveTimeRef.current += delta;
      const t = waveTimeRef.current;

      if (t < 3.0) {
        const waveProgress = Math.min(t / 0.5, 1);
        const waveDown = t > 2.5 ? Math.min((t - 2.5) / 0.5, 1) : 0;
        const armRaise = waveProgress * (1 - waveDown); // Goes 0 -> 1 -> 0

        // Raise arm using pure X axis 
        // Restore perfect upper arm base
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.x,
          0.6,
          armRaise
        );
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.z,
          -0.2,
          armRaise
        );
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(
          rightArmRef.current.rotation.y,
          0,
          armRaise
        );

        if (rightForeArmRef.current) {
          // Z is the true pitch axis for the elbow! positive Z bends UP!
          // Flip Z to negative to bend forward instead of backward
          rightForeArmRef.current.rotation.x = THREE.MathUtils.lerp(
            rightForeArmRef.current.rotation.x,
            -1.0,  // Bend RIGHT and UP
            armRaise
          );
          rightForeArmRef.current.rotation.z = THREE.MathUtils.lerp(
            rightForeArmRef.current.rotation.z,
            -1,
            armRaise
          );
          rightForeArmRef.current.rotation.y = THREE.MathUtils.lerp(
            rightForeArmRef.current.rotation.y,
            1,
            armRaise
          );
        }

        if (t > 0.5 && t < 2.5) {
          // Clean, friendly side-to-side wave
          if (rightForeArmRef.current) {
            rightForeArmRef.current.rotation.x += Math.sin(t * 8) * 0.5 * armRaise;
          }
        }

        if (t > 0.3 && t < 2.5) {
          setBlendshape('mouthSmileLeft', 0.5);
          setBlendshape('mouthSmileRight', 0.5);
        }
      }

      if (t >= 3.0) {
        hasWaved.current = true;
        setBlendshape('mouthSmileLeft', 0);
        setBlendshape('mouthSmileRight', 0);
      }
    }

    // ── Click Reactions ──
    if (reactionRef.current) {
      reactionTimeRef.current += delta;
      const t = reactionTimeRef.current;
      const duration = 1.8;

      if (t < duration) {
        const attack = Math.min(t / 0.15, 1); // Fast attack (0.15s)
        const release = t > duration * 0.5 ? Math.min((t - duration * 0.5) / (duration * 0.5), 1) : 0;
        const intensity = attack * (1 - release);

        switch (reactionRef.current) {
          case 'surprise':
            // Surprised face — eyes wide, brows up, mouth open
            setBlendshape('eyeWideLeft', 1.0 * intensity);
            setBlendshape('eyeWideRight', 1.0 * intensity);
            setBlendshape('browInnerUp', 1.0 * intensity);
            setBlendshape('browOuterUpLeft', 0.8 * intensity);
            setBlendshape('browOuterUpRight', 0.8 * intensity);
            setBlendshape('jawOpen', 0.7 * intensity);
            setBlendshape('mouthFunnel', 0.5 * intensity);

            // Slight head pull-back
            if (headRef.current) {
              headRef.current.rotation.x = THREE.MathUtils.lerp(
                headRef.current.rotation.x,
                -0.15 * intensity,
                0.1
              );
            }
            break;

          case 'flinch':
            // Body flinch — spine recoil + crouch + surprised face
            if (spineRef.current) {
              spineRef.current.rotation.x = THREE.MathUtils.lerp(
                spineRef.current.rotation.x,
                0.15 * intensity,
                0.12
              );
              spineRef.current.rotation.z = THREE.MathUtils.lerp(
                spineRef.current.rotation.z,
                0.05 * Math.sin(t * 12) * intensity,
                0.1
              );
            }
            // Protective arm raise
            if (leftArmRef.current) {
              leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
                leftArmRef.current.rotation.z,
                0.6 * intensity,
                0.1
              );
              leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
                leftArmRef.current.rotation.x,
                -0.4 * intensity,
                0.1
              );
            }
            // Flinch face
            setBlendshape('eyeSquintLeft', 1.0 * intensity);
            setBlendshape('eyeSquintRight', 1.0 * intensity);
            setBlendshape('noseSneerLeft', 0.6 * intensity);
            setBlendshape('noseSneerRight', 0.6 * intensity);
            setBlendshape('mouthFrownLeft', 0.7 * intensity);
            setBlendshape('mouthFrownRight', 0.7 * intensity);
            break;

          case 'wave':
            // Wave greeting (same as initial wave but on right arm)
            if (rightArmRef.current) {
              const waveProgress = Math.min(t / 0.4, 1);
              const waveDown = t > 1.6 ? Math.min((t - 1.6) / 0.4, 1) : 0;
              const blendWeight = waveProgress * (1 - waveDown) * intensity;

              // Perfect wave math
              rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0.6, blendWeight);
              rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.2, blendWeight);
              rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, 0, blendWeight);

              if (rightForeArmRef.current) {
                // Apply the exact forearm tuning you provided
                rightForeArmRef.current.rotation.x = THREE.MathUtils.lerp(rightForeArmRef.current.rotation.x, -1.0, blendWeight);
                rightForeArmRef.current.rotation.z = THREE.MathUtils.lerp(rightForeArmRef.current.rotation.z, -1.0, blendWeight);
                rightForeArmRef.current.rotation.y = THREE.MathUtils.lerp(rightForeArmRef.current.rotation.y, 1.0, blendWeight);
              }
              // Clean, friendly side-to-side wave
              if (t > 0.2 && t < duration * 0.8) {
                if (rightForeArmRef.current) {
                  rightForeArmRef.current.rotation.x += Math.sin(t * 8) * 0.5 * blendWeight;
                }
              }
            }
            // Happy face during wave
            setBlendshape('mouthSmileLeft', 1.0 * intensity);
            setBlendshape('mouthSmileRight', 1.0 * intensity);
            setBlendshape('cheekSquintLeft', 0.6 * intensity);
            setBlendshape('cheekSquintRight', 0.6 * intensity);
            break;
        }
      } else {
        // Reaction complete — clear
        reactionRef.current = null;
        reactionTimeRef.current = 0;
      }

      return; // Skip normal tracking during reaction
    }

    // ── Face Tracking Mode ──
    if (isTracking) {
      // Apply head rotation from tracking
      if (headRef.current && boneRestRotations.current['Head']) {
        const targetEuler = toEuler({ ...rotation });
        const targetX = boneRestRotations.current['Head'].x + targetEuler.x;
        const targetY = boneRestRotations.current['Head'].y + targetEuler.y;
        const targetZ = boneRestRotations.current['Head'].z + targetEuler.z;

        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.4);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.4);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetZ, 0.4);
      }
      if (neckRef.current && boneRestRotations.current['Neck']) {
        const targetEuler = toEuler({ ...rotation });
        const targetX = boneRestRotations.current['Neck'].x + targetEuler.x * 0.4;
        const targetY = boneRestRotations.current['Neck'].y + targetEuler.y * 0.4;
        const targetZ = boneRestRotations.current['Neck'].z + targetEuler.z * 0.3;

        neckRef.current.rotation.x = THREE.MathUtils.lerp(neckRef.current.rotation.x, targetX, 0.4);
        neckRef.current.rotation.y = THREE.MathUtils.lerp(neckRef.current.rotation.y, targetY, 0.4);
        neckRef.current.rotation.z = THREE.MathUtils.lerp(neckRef.current.rotation.z, targetZ, 0.4);
      }

      // Apply ALL blendshapes from face tracking (expression mirroring)
      if (Object.keys(blendshapes).length > 0) {
        applyAllBlendshapes(blendshapes);
      }

      idleTimeRef.current = 0;
    } else {
      // ── Idle Mode ──
      idleTimeRef.current += delta;
      const idleRotation = generateIdleRotation(idleTimeRef.current);
      const idleEuler = toEuler(idleRotation);

      const breathe = Math.sin(state.clock.elapsedTime * 1.2) * 0.008;
      const sway = Math.sin(state.clock.elapsedTime * 0.4) * 0.003;

      if (headRef.current) {
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, idleEuler.x + breathe, 0.05);
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, idleEuler.y, 0.05);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, idleEuler.z + sway, 0.05);
      }

      // Idle blinking
      const blinkCycle = state.clock.elapsedTime % 4;
      if (blinkCycle > 3.7 && blinkCycle < 3.9) {
        setBlendshape('eyeBlinkLeft', 1);
        setBlendshape('eyeBlinkRight', 1);
      } else {
        // Slowly return to neutral when not tracking
        clearAllBlendshapes();
      }

      // Subtle idle smile
      setBlendshape('mouthSmileLeft', 0.08);
      setBlendshape('mouthSmileRight', 0.08);
    }
  });

  return (
    <group ref={group} rotation={[0, 0.45, 0]} position={[0.4, -1.35, 0]} scale={1.25} onClick={handleClick}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/model-9.glb');
