import React, { useEffect, useState } from 'react';
import { Check, Link as LinkIcon, FileText, Sparkles } from 'lucide-react';
import { WEDDING, PREFIXES, getDisplayName } from '../weddingConfig';

type Generated = { link: string; displayName: string; message: string };

const buildMessage = (displayName: string, link: string) =>
  `Dear ${displayName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${WEDDING.groomName} & ${WEDDING.brideName}`;

export const Admin: React.FC = () => {
  const [prefix, setPrefix] = useState<string>('Mr.');
  const [guestName, setGuestName] = useState('');
  const [inviteType, setInviteType] = useState('both');
  const [generated, setGenerated] = useState<Generated | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Any edit after generating invalidates the old link, so stale links can't be copied.
  useEffect(() => setGenerated(null), [prefix, guestName, inviteType]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = guestName.trim().replace(/\s+/g, ' ');
    if (!name) return;

    const params = new URLSearchParams({ prefix });
    if (inviteType !== 'both') params.set('invite', inviteType);

    const link = `${window.location.origin}/${encodeURIComponent(name)}?${params.toString()}`;
    const displayName = getDisplayName(prefix, name);
    setGenerated({ link, displayName, message: buildMessage(displayName, link) });
  };

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setToast(label);
  };

  const field =
    'w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all';
  const label = 'text-xs font-medium text-stone-600 uppercase tracking-widest';

  return (
    <div className="min-h-screen bg-[#faf7f0] text-stone-800 p-4 sm:p-6 md:p-12 font-sans flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-[#D4AF37]/30">
        <h1 className="text-2xl sm:text-3xl font-serif text-center text-stone-800">Invitation Link Generator</h1>
        <p className="text-center text-sm text-stone-500 mt-2 mb-8">
          {WEDDING.brideName} &amp; {WEDDING.groomName}
        </p>

        <form onSubmit={handleGenerate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className={label}>Select Prefix</label>
              <select value={prefix} onChange={(e) => setPrefix(e.target.value)} className={field}>
                {PREFIXES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className={label}>Guest Name</label>
              <input
                type="text"
                placeholder="e.g. Sanjaya"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className={field}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={label}>Invite Type</label>
            <select value={inviteType} onChange={(e) => setInviteType(e.target.value)} className={field}>
              <option value="both">Both (Church &amp; Reception)</option>
              <option value="church">Church Ceremony Only</option>
              <option value="reception">Poruwa &amp; Reception Only</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!guestName.trim()}
            className="w-full h-12 flex items-center justify-center gap-2 bg-stone-800 hover:bg-black text-[#D4AF37] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-medium transition-all"
          >
            <Sparkles className="w-4 h-4" /> Generate Link
          </button>
        </form>

        <div className="pt-6 mt-6 border-t border-stone-100 space-y-5">
          {generated && (
            <div className="rounded-xl bg-[#022c22] text-center px-4 py-5">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">Preview on invitation</p>
              <p className="mt-2 text-sm text-white/90">
                We cordially invite <span className="text-[#D4AF37] font-serif text-lg">{generated.displayName}</span> to
                celebrate our special day with us.
              </p>
              <p className="mt-3 text-xs text-white/60">Greeting: Dear {generated.displayName} ❤️</p>
            </div>
          )}

          <div className="space-y-2">
            <label className={label}>Generated Link</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                readOnly
                value={generated?.link ?? ''}
                placeholder="Click Generate Link"
                onFocus={(e) => e.target.select()}
                className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 text-sm outline-none"
              />
              <button
                onClick={() => generated && copy(generated.link, 'Link copied!')}
                disabled={!generated}
                className="h-12 px-5 flex items-center justify-center gap-2 border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-xl font-medium transition-all sm:min-w-[160px]"
              >
                <LinkIcon className="w-4 h-4" /> Copy Link Only
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className={label}>Full Message</label>
            <textarea
              readOnly
              value={generated?.message ?? ''}
              placeholder="The personalized WhatsApp message will appear here."
              rows={13}
              className="w-full p-4 rounded-xl border border-stone-200 bg-stone-50 text-stone-600 text-sm outline-none resize-none"
            />
            <button
              onClick={() => generated && copy(generated.message, 'Message copied!')}
              disabled={!generated}
              className="w-full h-12 flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#C5A030] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-medium shadow-lg transition-all"
            >
              <FileText className="w-5 h-5" /> Copy Full Message
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-stone-900 text-white text-sm px-5 py-3 rounded-full shadow-xl">
          <Check className="w-4 h-4 text-[#D4AF37]" /> {toast}
        </div>
      )}
    </div>
  );
};
