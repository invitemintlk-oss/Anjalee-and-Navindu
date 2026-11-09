import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, CalendarHeart } from 'lucide-react';

export const HomecomingDetails: React.FC = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const inviteType = searchParams.get('invite') || 'both';

  return (
    <section id="details" className="text-halo w-full py-24 relative overflow-hidden">

      {/* Subtle Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1/2 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex flex-col items-center">

        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl font-display text-[#6b4c0f]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Celebrations
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/70"></div>
            <p className="text-[10px] md:text-xs text-[#2b2115] font-sans tracking-[0.4em] uppercase">
              Join us in celebration
            </p>
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/70"></div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-6xl">
          {/* Church Ceremony Card */}
          {(inviteType === 'both' || inviteType === 'church') && (
          <motion.div
            className="relative w-full lg:w-1/2 max-w-lg bg-[#fffaf0]/85 backdrop-blur-md rounded-t-[140px] rounded-b-[40px] border border-[#b08a2e]/60 shadow-[0_20px_50px_rgba(120,90,30,0.15)] p-8 md:p-14 flex flex-col items-center text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Decorative Inner Border */}
            <div className="absolute inset-4 border-[1px] border-[#b08a2e]/40 rounded-t-[125px] rounded-b-[25px] pointer-events-none"></div>

            <h3 className="text-3xl md:text-4xl font-display text-[#6b4c0f] mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>Church Ceremony</h3>

            <CalendarHeart className="w-8 h-8 md:w-10 md:h-10 text-[#6b4c0f] mb-4 opacity-90" strokeWidth={1} />

            <div className="space-y-2 mb-10">
              <p className="text-[11px] md:text-xs text-[#3f3220] tracking-[0.3em] uppercase">Thursday</p>
              <p className="text-lg md:text-2xl font-serif text-[#6b4c0f] tracking-widest uppercase">
                10th December 2026
              </p>
            </div>

            <div className="w-full max-w-sm mx-auto space-y-6 mb-12 flex-1">
              <div className="flex items-center justify-between text-[#2b2115] border-b border-[#b08a2e]/40 pb-4">
                <span className="font-sans text-sm md:text-base tracking-widest uppercase opacity-90">Holy Matrimony</span>
                <span className="font-serif text-[#6b4c0f] text-lg md:text-xl">8:30 AM</span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3 mt-auto">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-[#6b4c0f] mb-2 opacity-90" strokeWidth={1} />
              <p className="text-lg md:text-xl font-serif text-[#2b2115] tracking-wide">St. Lucia's Cathedral</p>
              <p className="text-[11px] md:text-sm text-[#3f3220] tracking-widest uppercase mb-2">Kotahena, Colombo 13</p>
              <a 
                href="https://maps.app.goo.gl/6tHE4zhj8jBma8rE7?g_st=ic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-2 md:px-8 md:py-2.5 mt-2 bg-transparent border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] rounded-full text-[#6b4c0f] transition-all duration-300 group"
              >
                <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase">Live Location</span>
              </a>
            </div>
          </motion.div>
          )}

          {/* Poruwa & Reception Card */}
          {(inviteType === 'both' || inviteType === 'reception') && (
          <motion.div
            className="relative w-full lg:w-1/2 max-w-lg bg-[#fffaf0]/85 backdrop-blur-md rounded-t-[140px] rounded-b-[40px] border border-[#b08a2e]/60 shadow-[0_20px_50px_rgba(120,90,30,0.15)] p-8 md:p-14 flex flex-col items-center text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Decorative Inner Border */}
            <div className="absolute inset-4 border-[1px] border-[#b08a2e]/40 rounded-t-[125px] rounded-b-[25px] pointer-events-none"></div>

            <h3 className="text-3xl md:text-4xl font-display text-[#6b4c0f] mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>Poruwa &amp; Reception</h3>

            <CalendarHeart className="w-8 h-8 md:w-10 md:h-10 text-[#6b4c0f] mb-4 opacity-90" strokeWidth={1} />

            <div className="space-y-2 mb-10">
              <p className="text-[11px] md:text-xs text-[#3f3220] tracking-[0.3em] uppercase">Thursday</p>
              <p className="text-lg md:text-2xl font-serif text-[#6b4c0f] tracking-widest uppercase">
                10th December 2026
              </p>
            </div>

            <div className="w-full max-w-sm mx-auto space-y-6 mb-12 flex-1">
              <div className="flex items-center justify-between text-[#2b2115] border-b border-[#b08a2e]/40 pb-4">
                <span className="font-sans text-sm md:text-base tracking-widest uppercase opacity-90">Celebration</span>
                <span className="font-serif text-[#6b4c0f] text-lg md:text-xl text-right">10:45 AM - 3:30 PM</span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3 mt-auto">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-[#6b4c0f] mb-2 opacity-90" strokeWidth={1} />
              <p className="text-lg md:text-xl font-serif text-[#2b2115] tracking-wide">Cinnamon Grand Colombo</p>
              <p className="text-[11px] md:text-sm text-[#3f3220] tracking-widest uppercase mb-2">Mahogany Ballroom</p>
              <a 
                href="https://maps.app.goo.gl/t2MyZpkv8jSYFeFU9?g_st=ic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-2 md:px-8 md:py-2.5 mt-2 bg-transparent border border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] rounded-full text-[#6b4c0f] transition-all duration-300 group"
              >
                <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase">Live Location</span>
              </a>
            </div>
          </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
