import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { FloatingPetals } from './components/FloatingPetals';

import { Countdown } from './components/Countdown';
import { HappyCouple } from './components/HappyCouple';
import { HomecomingDetails } from './components/HomecomingDetails';

import { NoteFromUs } from './components/NoteFromUs';
// Removed Timeline import

import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';
import { IntroVideo } from './components/IntroVideo';
import { IntroOverlay } from './components/IntroOverlay';

import { HeroContent } from './components/HeroContent';
import { CornerFlowers } from './components/CornerFlowers';
import { WishesForm } from './components/WishesForm';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const inviteType = searchParams.get('invite') || 'both';

  const weddingDate = inviteType === 'reception'
    ? new Date('2026-12-10T10:45:00+05:30')
    : new Date('2026-12-10T08:30:00+05:30');

  const startMusic = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(err => console.log("Audio play blocked: ", err));
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Audio play blocked: ", err));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      startMusic();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isMusicPlaying]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-brand-gold selection:text-white overflow-x-hidden bg-brand-ivory">
      {/* Site-wide background (fixed div instead of background-attachment so it works on iOS) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/y.webp')" }}
      />
      <div aria-hidden="true" className="fixed inset-0 z-0 bg-[#fffaf0]/45 pointer-events-none" />
      <FloatingPetals />
      
      {/* Background Music */}
      <audio
        ref={audioRef}
        src={encodeURI("/Nothing's Gonna Change My Love For You - Music Travel Love ft. Bugoy Drilon.mp3")}
        loop
        autoPlay
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
      />

      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div 
            key="intro" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50"
          >
            <IntroOverlay onEnter={() => {
              setShowIntro(false);
              setShowMain(true);
              startMusic();
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showMain && (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative z-10"
          >
            {/* Music Toggle Button */}
            <button
              onClick={toggleMusic}
              className="fixed bottom-8 right-8 z-[60] w-14 h-14 glass rounded-full flex items-center justify-center text-brand-gold-deep hover:bg-stone-800 hover:text-brand-champagne transition-all active:scale-90 shadow-2xl group"
            >
              <div className="absolute inset-0 rounded-full border border-brand-gold/20 scale-110 group-hover:scale-125 transition-transform" />
              {isMusicPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>



            <HeroContent />

            <Countdown targetDate={weddingDate} />

            <HappyCouple />



            <HomecomingDetails />



            <NoteFromUs />

            <RSVPForm />

            <WishesForm />

            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

