import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroOverlayProps {
  onEnter: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onEnter }) => {
  const [videoDone, setVideoDone] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden bg-white">
      <AnimatePresence>
        {!videoDone && (
          <motion.div
            key="intro-video"
            className="absolute inset-0 z-20 bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <video
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setVideoDone(true)}
              onError={() => setVideoDone(true)}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/gemini_generated_video_1c2126fd.mp4" type="video/mp4" />
            </video>
            <button
              onClick={() => setVideoDone(true)}
              className="absolute bottom-8 right-6 font-sans px-5 py-2 bg-black/30 backdrop-blur-sm text-white/90 border border-white/40 rounded-full uppercase tracking-[0.25em] text-[10px] sm:text-xs hover:bg-white/20 transition-colors"
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <img
        src="/hero_arch.webp"
        alt="Wedding arch with chandelier"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.1)_60%,rgba(255,255,255,0)_100%)] pointer-events-none" />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 pt-[18vh] pb-[22vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={videoDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-sans font-medium text-[#2b2115] mb-6">
          Together with their families
        </p>

        <h1
          className="text-6xl sm:text-7xl text-[#2b2115] leading-tight"
          style={{ fontFamily: "'Pinyon Script', cursive" }}
        >
          Anjalee
        </h1>
        <span className="text-3xl sm:text-4xl font-serif italic text-[#6b4c0f] my-1">&amp;</span>
        <h1
          className="text-6xl sm:text-7xl text-[#2b2115] leading-tight"
          style={{ fontFamily: "'Pinyon Script', cursive" }}
        >
          Navindu
        </h1>

        <div className="w-24 h-px bg-[#b08a2e]/60 my-6" />

        <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-sans font-semibold text-[#2b2115]">
          10 . 12 . 2026
        </p>

        <button
          onClick={onEnter}
          className="mt-10 font-sans px-10 py-4 bg-[#fffaf0]/90 backdrop-blur-md text-[#6b4c0f] border border-[#b08a2e]/60 rounded-full shadow-[0_10px_30px_rgba(107,76,15,0.2)] hover:bg-[#b08a2e] hover:text-white hover:scale-105 transition-all duration-300 uppercase tracking-[0.3em] text-xs sm:text-sm"
        >
          Open Invitation
        </button>
      </motion.div>
    </div>
  );
};
