import { useState, useEffect, useRef, useCallback } from 'react';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { calculateHeadRotation, smoothRotation, isFaceValid } from '../utils/faceToRotation';

interface FaceTrackingState {
  rotation: { pitch: number; yaw: number; roll: number };
  blendshapes: Record<string, number>;
  isTracking: boolean;
  isEnabled: boolean;
  error: string | null;
  faceDetected: boolean;
}

// Smoothing factor for blendshape values (0 = no smoothing, 1 = frozen)
const BLENDSHAPE_SMOOTHING = 0.15;

export function useFaceTracking() {
  const [state, setState] = useState<FaceTrackingState>({
    rotation: { pitch: 0, yaw: 0, roll: 0 },
    blendshapes: {},
    isTracking: false,
    isEnabled: false,
    error: null,
    faceDetected: false
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastRotationRef = useRef({ pitch: 0, yaw: 0, roll: 0 });
  const lastBlendshapesRef = useRef<Record<string, number>>({});

  // Initialize MediaPipe Face Landmarker with blendshapes enabled
  const initializeFaceLandmarker = useCallback(async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      );

      const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numFaces: 1,
        outputFaceBlendshapes: true, // Enable ARKit blendshape output
        minFaceDetectionConfidence: 0.5,
        minFacePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      faceLandmarkerRef.current = faceLandmarker;
      console.log('[FaceTracking] Initialized with blendshape output enabled');
      return true;
    } catch (error) {
      console.error('Failed to initialize Face Landmarker:', error);
      setState(prev => ({ ...prev, error: 'Failed to load face tracking model' }));
      return false;
    }
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      streamRef.current = stream;
      return true;
    } catch (error) {
      console.error('Failed to access camera:', error);
      setState(prev => ({
        ...prev,
        error: 'Camera access denied. Please enable camera permissions.'
      }));
      return false;
    }
  }, []);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Smooth blendshape values to prevent jitter
  function smoothBlendshapes(
    prev: Record<string, number>,
    current: Record<string, number>,
    factor: number
  ): Record<string, number> {
    const result: Record<string, number> = {};
    for (const key in current) {
      const prevVal = prev[key] ?? 0;
      result[key] = prevVal + (current[key] - prevVal) * (1 - factor);
    }
    return result;
  }

  // Process video frame
  const processFrame = useCallback(() => {
    if (!faceLandmarkerRef.current || !videoRef.current || videoRef.current.readyState < 2) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const startTimeMs = performance.now();
    const results = faceLandmarkerRef.current.detectForVideo(videoRef.current, startTimeMs);

    if (results.faceLandmarks && results.faceLandmarks.length > 0) {
      const landmarks = results.faceLandmarks[0];

      if (isFaceValid(landmarks)) {
        // Head rotation
        const targetRotation = calculateHeadRotation(landmarks);
        const smoothedRotation = smoothRotation(lastRotationRef.current, targetRotation, 0.5);
        lastRotationRef.current = smoothedRotation;

        // Blendshapes — extract from MediaPipe's ARKit output
        let newBlendshapes: Record<string, number> = {};
        if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
          const categories = results.faceBlendshapes[0].categories;
          for (const cat of categories) {
            // Skip the "_neutral" category
            if (cat.categoryName !== '_neutral') {
              newBlendshapes[cat.categoryName] = cat.score;
            }
          }
        }

        // Smooth blendshapes
        const smoothedBlendshapes = smoothBlendshapes(
          lastBlendshapesRef.current,
          newBlendshapes,
          BLENDSHAPE_SMOOTHING
        );
        lastBlendshapesRef.current = smoothedBlendshapes;

        setState(prev => ({
          ...prev,
          rotation: smoothedRotation,
          blendshapes: smoothedBlendshapes,
          faceDetected: true,
          error: null
        }));
      } else {
        setState(prev => ({ ...prev, faceDetected: false }));
      }
    } else {
      setState(prev => ({ ...prev, faceDetected: false }));
    }

    // Continue processing at ~30 FPS
    setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(processFrame);
    }, 33);
  }, []);

  // Enable face tracking
  const enableTracking = useCallback(async () => {
    setState(prev => ({ ...prev, isEnabled: true, error: null }));

    // Create hidden video element
    if (!videoRef.current) {
      const video = document.createElement('video');
      video.style.display = 'none';
      document.body.appendChild(video);
      videoRef.current = video;
    }

    // Initialize Face Landmarker if not already done
    if (!faceLandmarkerRef.current) {
      const success = await initializeFaceLandmarker();
      if (!success) {
        setState(prev => ({ ...prev, isEnabled: false }));
        return;
      }
    }

    // Start camera
    const cameraStarted = await startCamera();
    if (!cameraStarted) {
      setState(prev => ({ ...prev, isEnabled: false }));
      return;
    }

    // Start processing
    setState(prev => ({ ...prev, isTracking: true }));
    processFrame();
  }, [initializeFaceLandmarker, startCamera, processFrame]);

  // Disable face tracking
  const disableTracking = useCallback(() => {
    setState(prev => ({
      ...prev,
      isEnabled: false,
      isTracking: false,
      faceDetected: false,
      blendshapes: {}
    }));

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    lastBlendshapesRef.current = {};
    stopCamera();
  }, [stopCamera]);

  // Toggle tracking
  const toggleTracking = useCallback(() => {
    if (state.isEnabled) {
      disableTracking();
    } else {
      enableTracking();
    }
  }, [state.isEnabled, enableTracking, disableTracking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopCamera();
      if (videoRef.current && videoRef.current.parentNode) {
        videoRef.current.parentNode.removeChild(videoRef.current);
      }
    };
  }, [stopCamera]);

  return {
    rotation: state.rotation,
    blendshapes: state.blendshapes,
    isTracking: state.isTracking,
    isEnabled: state.isEnabled,
    faceDetected: state.faceDetected,
    error: state.error,
    enableTracking,
    disableTracking,
    toggleTracking
  };
}
