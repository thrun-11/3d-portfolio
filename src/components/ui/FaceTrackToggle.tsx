import { useState } from 'react';
import { FaCamera, FaBan } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface FaceTrackToggleProps {
  isEnabled: boolean;
  isTracking: boolean;
  faceDetected: boolean;
  error: string | null;
  onToggle: () => void;
}

export function FaceTrackToggle({
  isEnabled,
  isTracking,
  faceDetected,
  error,
  onToggle
}: FaceTrackToggleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed top-20 right-4 z-30 flex flex-col items-end gap-2">
      <motion.button
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          flex items-center gap-2 px-3 py-2 md:px-4 md:py-2
          backdrop-blur-xl transition-all duration-300
          ${isEnabled
            ? 'bg-[#2a2a2a]/80 text-on-surface-variant'
            : 'bg-[#1c1b1b]/60 text-on-surface-variant hover:text-on-surface'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={isEnabled ? 'Disable face tracking' : 'Enable face tracking'}
      >
        {isEnabled ? (
          <>
            <FaCamera className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm font-medium hidden md:inline">Tracking On</span>
          </>
        ) : (
          <>
            <FaBan className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm font-medium hidden md:inline">Tracking Off</span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#1c1b1b]/60 backdrop-blur-xl text-xs"
          >
            {isTracking && faceDetected && (
              <>
                <div className="w-2 h-2 bg-emerald-400 animate-pulse" />
                <span className="text-on-surface-variant">Face detected</span>
              </>
            )}
            {isTracking && !faceDetected && (
              <>
                <div className="w-2 h-2 bg-amber-400 animate-pulse" />
                <span className="text-on-surface-variant">Searching...</span>
              </>
            )}
            {!isTracking && (
              <>
                <div className="w-2 h-2 bg-on-surface-variant animate-pulse" />
                <span className="text-on-surface-variant">Initializing...</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-3 py-2 bg-red-500/10 text-xs text-red-400 max-w-xs"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isEnabled && isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-3 py-1.5 bg-[#1c1b1b]/60 backdrop-blur-xl text-xs text-on-surface-variant max-w-xs text-right"
          >
            Camera data stays local & private
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
