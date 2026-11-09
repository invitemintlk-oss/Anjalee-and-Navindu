import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

const gold = '#6b4c0f';

const Person: React.FC<{ name: string; role: string; parents: React.ReactNode; delay: number }> = ({ name, role, parents, delay }) => (
  <motion.div
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay }}
  >
    <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#6b4c0f] tracking-[0.15em] uppercase">
      {name}
    </h3>
    <div className="flex items-center gap-4 my-4">
      <div className="w-10 sm:w-16 h-[1px] bg-[#D4AF37]/70" />
      <span className="text-xs sm:text-sm text-[#2b2115] tracking-[0.35em] uppercase font-sans">{role}</span>
      <div className="w-10 sm:w-16 h-[1px] bg-[#D4AF37]/70" />
    </div>
    <p className="text-sm sm:text-base md:text-lg font-serif text-[#3a2d1b] leading-relaxed max-w-md">
      {parents}
    </p>
  </motion.div>
);

export const HappyCouple: React.FC = () => {
  return (
    <section aria-label="The happy couple" className="text-halo w-full py-24 relative overflow-hidden bg-[#f5efe3] flex items-center justify-center min-h-[100dvh]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/z.webp')` }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-3/4 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container px-4 md:px-8 mx-auto relative z-10 flex flex-col items-center max-w-3xl">
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl font-display text-[#6b4c0f] leading-tight" style={{ fontFamily: "'Great Vibes', cursive" }}>
            The Happy Couple
          </h2>
          <p className="text-[#2b2115] font-serif text-lg md:text-xl mt-4 leading-relaxed">
            What began as a moment<br />became our forever
          </p>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
            <Heart className="w-4 h-4" style={{ color: gold }} strokeWidth={1.5} />
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
          </div>
        </motion.div>

        <Person
          name="Navindu"
          role="The Groom"
          parents={<>Son of Mr. Samantha Morawatta<br />&amp; Mrs. Darshishani Morawatta</>}
          delay={0.2}
        />

        <motion.div
          className="my-12 text-[#6b4c0f] text-5xl font-serif italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          &amp;
        </motion.div>

        <Person
          name="Anjalee"
          role="The Bride"
          parents={<>Daughter of Mr. (Late) Shiral Fernando<br />&amp; Mrs. Visaka Fernando</>}
          delay={0.6}
        />
      </div>
    </section>
  );
};
