import React, { useState } from 'react';
import { Copy, Link as LinkIcon, Check } from 'lucide-react';

export const Admin = () => {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const generateLink = () => {
    const baseUrl = window.location.origin;
    if (!guestName.trim()) return baseUrl;
    const params = new URLSearchParams();
    params.set('prefix', prefix);
    params.set('name', guestName.trim());
    return `${baseUrl}/?${params.toString()}`;
  };

  const generateMessage = () => {
    const link = generateLink();
    const nameStr = guestName.trim() ? ` ${guestName.trim()}` : '';
    
    return `Dear ${prefix}${nameStr} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Imalsha & Isuru`;
  };

  const copyToClipboard = (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#12100C] text-[#FAFAF8] p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-[#1A1814] rounded-2xl p-8 shadow-2xl border border-[#D4AF37]/20">
        <h1 className="text-3xl font-serif text-[#E8C547] mb-8 text-center">Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium text-white/70 mb-2">Prefix</label>
              <select 
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-[#2A2824] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
                <option value="Ms.">Ms.</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
            <div className="w-full sm:w-2/3">
              <label className="block text-sm font-medium text-white/70 mb-2">Guest Name</label>
              <input 
                type="text" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full bg-[#2A2824] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-[#D4AF37]/20 space-y-4">
            <h2 className="text-xl font-serif text-[#E8C547]">Preview</h2>
            
            <div className="bg-[#12100C] p-4 rounded-lg border border-white/10 break-all text-sm text-white/80">
              {generateLink()}
            </div>

            <div className="bg-[#12100C] p-6 rounded-lg border border-white/10 whitespace-pre-wrap text-sm text-white/80 leading-relaxed">
              {generateMessage()}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              onClick={() => copyToClipboard(generateLink(), setCopiedLink)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#2A2824] hover:bg-[#3A3834] border border-[#D4AF37]/30 py-3 px-6 rounded-xl transition-all font-medium"
            >
              {copiedLink ? <Check className="w-5 h-5 text-green-400" /> : <LinkIcon className="w-5 h-5 text-[#E8C547]" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link Only'}</span>
            </button>
            
            <button 
              onClick={() => copyToClipboard(generateMessage(), setCopiedMsg)}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#E8C547] text-black hover:opacity-90 py-3 px-6 rounded-xl transition-all font-semibold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              {copiedMsg ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copiedMsg ? 'Message Copied!' : 'Copy Full Message'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
