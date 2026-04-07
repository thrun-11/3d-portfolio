import * as THREE from 'three';

/**
 * Converts MediaPipe face landmarks to 3D rotation (Euler angles)
 * for controlling the avatar's head movement
 */

interface FaceLandmark {
  x: number;
  y: number;
  z: number;
}

interface RotationAngles {
  pitch: number; // X-axis rotation (nodding)
  yaw: number;   // Y-axis rotation (shaking head)
  roll: number;  // Z-axis rotation (tilting head)
}

// Key landmark indices for face orientation
const LANDMARK_INDICES = {
  NOSE_TIP: 1,
  NOSE_BRIDGE: 6,
  LEFT_EYE: 33,
  RIGHT_EYE: 263,
  LEFT_MOUTH: 61,
  RIGHT_MOUTH: 291,
  CHIN: 152,
  FOREHEAD: 10,
  LEFT_CHEEK: 234,
  RIGHT_CHEEK: 454
};

/**
 * Calculate head rotation from face landmarks
 */
export function calculateHeadRotation(landmarks: FaceLandmark[]): RotationAngles {
  if (!landmarks || landmarks.length < 468) {
    return { pitch: 0, yaw: 0, roll: 0 };
  }

  // Get key points
  const noseTip = landmarks[LANDMARK_INDICES.NOSE_TIP];
  const noseBridge = landmarks[LANDMARK_INDICES.NOSE_BRIDGE];
  const leftEye = landmarks[LANDMARK_INDICES.LEFT_EYE];
  const rightEye = landmarks[LANDMARK_INDICES.RIGHT_EYE];
  const chin = landmarks[LANDMARK_INDICES.CHIN];
  const forehead = landmarks[LANDMARK_INDICES.FOREHEAD];

  // Calculate yaw (left-right rotation)
  const faceWidth = Math.abs(leftEye.x - rightEye.x);
  const noseOffset = (noseTip.x - (leftEye.x + rightEye.x) / 2);
  const yaw = -(noseOffset / faceWidth) * Math.PI * 0.8; // Set to negative to mirror user's head correctly

  // Calculate pitch (up-down rotation)
  const faceHeight = Math.abs(forehead.y - chin.y);
  const noseVerticalOffset = noseTip.y - noseBridge.y;
  const pitch = (noseVerticalOffset / faceHeight) * Math.PI * 0.6;

  // Calculate roll (tilt rotation)
  const eyeAngle = Math.atan2(
    rightEye.y - leftEye.y,
    rightEye.x - leftEye.x
  );
  const roll = eyeAngle;

  return {
    pitch: clamp(pitch, -Math.PI / 4, Math.PI / 4),
    yaw: clamp(yaw, -Math.PI / 3, Math.PI / 3),
    roll: clamp(roll, -Math.PI / 6, Math.PI / 6)
  };
}

/**
 * Smooth rotation values using linear interpolation
 */
export function smoothRotation(
  current: RotationAngles,
  target: RotationAngles,
  smoothing: number = 0.15
): RotationAngles {
  return {
    pitch: lerp(current.pitch, target.pitch, smoothing),
    yaw: lerp(current.yaw, target.yaw, smoothing),
    roll: lerp(current.roll, target.roll, smoothing)
  };
}

/**
 * Convert rotation angles to Three.js Euler
 */
export function toEuler(rotation: RotationAngles): THREE.Euler {
  return new THREE.Euler(
    rotation.pitch,
    rotation.yaw,
    rotation.roll,
    'XYZ'
  );
}

/**
 * Linear interpolation
 */
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Clamp value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate eye gaze direction (optional enhancement)
 */
export function calculateEyeGaze(landmarks: FaceLandmark[]): { x: number; y: number } {
  if (!landmarks || landmarks.length < 468) {
    return { x: 0, y: 0 };
  }

  const leftEye = landmarks[LANDMARK_INDICES.LEFT_EYE];
  const rightEye = landmarks[LANDMARK_INDICES.RIGHT_EYE];

  // This is a simplified version - full eye tracking would need iris landmarks
  const eyeCenter = {
    x: (leftEye.x + rightEye.x) / 2,
    y: (leftEye.y + rightEye.y) / 2
  };

  return {
    x: (eyeCenter.x - 0.5) * 2,
    y: (eyeCenter.y - 0.5) * 2
  };
}

/**
 * Detect if face is present and well-positioned
 */
export function isFaceValid(landmarks: FaceLandmark[]): boolean {
  if (!landmarks || landmarks.length < 468) {
    return false;
  }

  // Check if key landmarks are within frame (0-1 range with some tolerance)
  const noseTip = landmarks[LANDMARK_INDICES.NOSE_TIP];
  const leftEye = landmarks[LANDMARK_INDICES.LEFT_EYE];
  const rightEye = landmarks[LANDMARK_INDICES.RIGHT_EYE];

  const inBounds = (point: FaceLandmark) =>
    point.x > -0.1 && point.x < 1.1 &&
    point.y > -0.1 && point.y < 1.1;

  return inBounds(noseTip) && inBounds(leftEye) && inBounds(rightEye);
}

/**
 * Generate idle animation rotation (when face tracking is off)
 */
export function generateIdleRotation(time: number): RotationAngles {
  return {
    pitch: Math.sin(time * 0.5) * 0.05, // Subtle nodding
    yaw: Math.sin(time * 0.3) * 0.08,   // Gentle head turn
    roll: Math.sin(time * 0.7) * 0.03   // Slight tilt
  };
}
