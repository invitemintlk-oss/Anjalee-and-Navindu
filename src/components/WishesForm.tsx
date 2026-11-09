import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { submitToGoogleSheet } from '../googleSheets';

export const WishesForm: React.FC = () => {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please enter your name');
    if (!wish.trim()) return setError('Please write a wish for the couple');

    setIsSubmitting(true);
    setError(null);
    try {
      await submitToGoogleSheet('wishes', {
        name: name.trim(),
        wish: wish.trim(),
        submittedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to send your wish. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-white/90 text-[#2b2115] border border-[#b08a2e]/60 rounded-xl px-5 py-4 font-sans focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#8a7a5e]';

  return (
    <section id="wishes" className="text-halo w-full py-24 relative overflow-hidden">

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          className="flex flex-col items-center space-y-4 text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl font-display text-[#6b4c0f]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Wishes
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
            <Heart className="w-4 h-4 text-[#6b4c0f] opacity-80" strokeWidth={1.5} />
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
          </div>
          <p className="text-[11px] md:text-sm text-[#3f3220] font-sans tracking-[0.2em] uppercase mt-6 max-w-2xl px-4 leading-relaxed">
            Share your prayers, blessings and wishes for the couple
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative bg-[#fffaf0]/85 backdrop-blur-md p-8 sm:p-12 md:p-16 rounded-[40px] shadow-[0_20px_50px_rgba(120,90,30,0.15)] border border-[#b08a2e]/50 overflow-hidden">
            <div className="absolute inset-3 sm:inset-4 border-[1px] border-[#D4AF37]/10 rounded-[30px] pointer-events-none" />

            {submitted ? (
              <div className="text-center py-10">
                <p className="text-5xl font-display text-[#6b4c0f] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>
                  Thank you!
                </p>
                <p className="text-sm md:text-base font-sans text-[#2b2115] tracking-widest uppercase">
                  Your wish means so much to us.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div>
                  <label className="block text-[#6b4c0f] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Your Name</label>
                  <input
                    type="text"
                    placeholder="Eg: Namal Perera"
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-[#6b4c0f] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Your Wish</label>
                  <textarea
                    rows={5}
                    maxLength={500}
                    placeholder="Write your blessings for Anjalee & Navindu..."
                    className={`${inputClass} resize-none`}
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {error && <p className="text-red-600 text-sm font-sans text-center tracking-wide">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group flex items-center justify-center rounded-full border border-[#D4AF37] bg-transparent transition-all duration-300 hover:bg-[#D4AF37] py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-xs sm:text-sm font-sans text-[#6b4c0f] group-hover:text-black font-semibold uppercase tracking-[0.3em] transition-colors duration-300">
                    {isSubmitting ? 'Sending...' : 'Send Your Wish'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
