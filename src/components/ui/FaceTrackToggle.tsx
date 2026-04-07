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
          flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-full
          backdrop-blur-xl transition-all duration-300
          border shadow-lg
          ${isEnabled
            ? 'bg-[#818CF8]/15 border-[#818CF8]/30 text-[#818CF8] glow-blue'
            : 'bg-white/[0.04] border-white/[0.08] text-[#94A3B8] hover:text-white hover:border-white/[0.15]'
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-xs"
          >
            {isTracking && faceDetected && (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[#94A3B8]">Face detected</span>
              </>
            )}
            {isTracking && !faceDetected && (
              <>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[#94A3B8]">Searching...</span>
              </>
            )}
            {!isTracking && (
              <>
                <div className="w-2 h-2 rounded-full bg-[#818CF8] animate-pulse" />
                <span className="text-[#94A3B8]">Initializing...</span>
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
            className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 max-w-xs"
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
            className="px-3 py-1.5 rounded-lg bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-xs text-[#64748B] max-w-xs text-right"
          >
            Camera data stays local & private
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
