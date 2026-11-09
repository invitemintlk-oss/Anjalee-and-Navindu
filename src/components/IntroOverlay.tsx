import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroOverlayProps {
  onEnter: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onEnter }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      setIsPlaying(true);
      videoRef.current.play().catch(e => console.error("Playback failed", e));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-black">
      <video 
        ref={videoRef}
        muted 
        playsInline 
        onEnded={onEnter}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/gemini_generated_video_1c2126fd.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      
      <AnimatePresence>
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 w-full flex flex-col justify-end items-center pb-24 h-full"
          >
            <button 
              onClick={handlePlay}
              className="font-sans px-10 py-4 bg-[#064e3b]/80 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/50 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:bg-[#D4AF37] hover:text-black hover:scale-105 transition-all duration-300 uppercase tracking-[0.3em] text-xs sm:text-sm"
            >
              Open Invitation
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
