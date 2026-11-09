import React, { useState } from 'react';
import { submitToGoogleSheet } from '../googleSheets';
import { Calendar, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const RSVPForm: React.FC = () => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('');
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!attending) {
      setError('Please let us know if you can attend');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const inviteType = searchParams.get('invite') || 'both';

      const status = attending === 'yes' ? 'Accepts' : 'Declines';
      await submitToGoogleSheet('rsvp', { 
        name, 
        status, 
        guestCount: attending === 'yes' ? guestCount : '0',
        message,
        inviteType,
        submittedAt: new Date().toISOString() 
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="text-halo w-full py-24 relative overflow-hidden">
      {/* Section background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/xyz.jpg')" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[#fffaf0]/30 pointer-events-none" />
      
      {/* Subtle Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-3/4 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          className="flex flex-col items-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl font-display text-[#6b4c0f]" style={{ fontFamily: "'Great Vibes', cursive" }}>
            RSVP
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/70"></div>
            <Sparkles className="w-4 h-4 text-[#6b4c0f] opacity-80" />
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/70"></div>
          </div>
          <p className="text-[11px] md:text-sm text-[#3f3220] font-sans tracking-[0.2em] uppercase mt-6 max-w-2xl px-4 leading-relaxed">
            Where forever begins, and we’d love for you to be there.<br className="hidden sm:block" /> Please let us know if you'll be joining us on our special day.
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
            
            {/* Decorative Inner Border */}
            <div className="absolute inset-3 sm:inset-4 border-[1px] border-[#D4AF37]/10 rounded-[30px] pointer-events-none"></div>

            {submitted ? (
              <div className="text-center py-10">
                <p className="text-5xl font-display text-[#6b4c0f] mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>Thank you!</p>
                <p className="text-sm md:text-base font-sans text-[#2b2115] tracking-widest uppercase">Your response has been lovingly recorded.</p>
              </div>
            ) : (
              <form onSubmit={handleRSVP} className="relative z-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[#6b4c0f] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Eg: Namal Perera" 
                      className="w-full bg-white/90 text-[#2b2115] border border-[#b08a2e]/60 rounded-xl px-5 py-4 font-sans focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#8a7a5e]"
                      name="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-[#6b4c0f] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Will you attend?</label>
                    <div className="relative">
                      <select 
                        name="attending" 
                        required 
                        value={attending}
                        onChange={(e) => setAttending(e.target.value)}
                        className="w-full bg-white/90 text-[#2b2115] border border-[#b08a2e]/60 rounded-xl px-5 py-4 font-sans appearance-none pr-10 focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all"
                        disabled={isSubmitting}
                      >
                        <option value="" disabled className="bg-white text-[#5a4a32]">Select an option</option>
                        <option value="yes" className="bg-white text-[#2b2115]">Yes, I'll be there</option>
                        <option value="no" className="bg-white text-[#2b2115]">Sorry, I can't make it</option>
                      </select>
                      <svg className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6b4c0f] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {attending === 'yes' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-[#6b4c0f] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Number of Guests (including yourself)</label>
                    <div className="relative">
                      <select 
                        required={attending === 'yes'}
                        className="w-full bg-white/90 text-[#2b2115] border border-[#b08a2e]/60 rounded-xl px-5 py-4 font-sans appearance-none pr-10 focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all"
                        name="guestCount" 
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        disabled={isSubmitting}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num} className="bg-white text-[#2b2115]">
                            {num} {num === 1 ? 'Guest (Just me)' : 'Guests'}
                          </option>
                        ))}
                      </select>
                      <svg className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6b4c0f] pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </motion.div>
                )}

                <div>
                  <label className="block text-[#6b4c0f] text-xs font-semibold uppercase tracking-[0.2em] mb-3">Message (Optional)</label>
                  <textarea 
                    name="message" 
                    maxLength={250} 
                    rows={4} 
                    className="w-full bg-white/90 text-[#2b2115] border border-[#b08a2e]/60 rounded-xl px-5 py-4 font-sans focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all placeholder:text-[#8a7a5e] resize-none" 
                    placeholder="Leave the couple a beautiful note!"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {error && <p className="text-red-600 text-sm font-sans text-center tracking-wide">{error}</p>}

                <div className="pt-6 space-y-4">
                  <button 
                    type="submit" 
                    className="w-full group relative flex items-center justify-center overflow-hidden rounded-full border border-[#D4AF37] bg-transparent transition-all duration-300 hover:bg-[#D4AF37] py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#D4AF37] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    <span className="text-xs sm:text-sm font-sans text-[#6b4c0f] group-hover:text-black font-semibold uppercase tracking-[0.3em] transition-colors duration-300">
                      {isSubmitting ? 'Sending...' : 'Send RSVP with Love'}
                    </span>
                  </button>
                  
                  <a 
                    href="https://www.google.com/calendar/render?action=TEMPLATE&text=Anjalee+%26+Navindu+Wedding&dates=20261210T030000Z/20261210T100000Z&details=Church+ceremony+8.30+AM+at+St.+Lucia's+Cathedral,+Colombo+13.+Poruwa+%26+reception+10.45+AM+-+3.30+PM+at+Cinnamon+Grand+Colombo,+Mahogany+Ballroom.&location=St.+Lucia's+Cathedral,+Colombo+13&sf=true&output=xml" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full group relative flex items-center justify-center overflow-hidden rounded-full border border-[#b08a2e]/50 bg-[#D4AF37]/5 transition-all duration-300 hover:bg-[#D4AF37] py-4 hover:border-[#D4AF37]"
                  >
                    <Calendar className="mr-3 h-4 w-4 text-[#6b4c0f] group-hover:text-black transition-colors duration-300" />
                    <span className="text-xs sm:text-sm font-sans text-[#6b4c0f] group-hover:text-black font-semibold uppercase tracking-[0.2em] transition-colors duration-300">
                      Add to Google Calendar
                    </span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
