'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '@/data/portfolio-data';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    icon: '⬡',
    url: PROFILE.contact.github,
    color: '#E0E0FF',
    description: 'Source code & repositories',
  },
  {
    label: 'LinkedIn',
    icon: '◆',
    url: PROFILE.contact.linkedin,
    color: '#0A66C2',
    description: 'Professional network',
  },
  {
    label: 'Email',
    icon: '◈',
    url: `mailto:${PROFILE.contact.email}`,
    color: '#00F0FF',
    description: PROFILE.contact.email,
  },
  {
    label: 'Phone',
    icon: '◉',
    url: `tel:${PROFILE.contact.phone}`,
    color: '#00FF88',
    description: PROFILE.contact.phone,
  },
];

export default function ContactModule() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="p-2 font-['Inter'] h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-4 pb-3 border-b border-[rgba(0,240,255,0.1)]"
      >
        <div className="flex items-center gap-2">
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#00F0FF]">◉ COMMUNICATION TERMINAL</span>
          <span className="flex-1 h-px bg-[rgba(0,240,255,0.1)]" />
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#00FF88]">
            {/* Static dot — no animate-pulse */}
            <span className="w-1.5 h-1.5 inline-block rounded-full bg-[#00FF88] mr-1" />
            SIGNAL ACTIVE
          </span>
        </div>
      </motion.div>

      {/* Signal Status — removed typing-cursor span */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-4 font-['JetBrains_Mono'] text-[11px] text-[#4a4a6a] rounded-lg p-3"
        style={{ background: 'rgba(5,5,16,0.6)', border: '1px solid rgba(0,240,255,0.06)' }}
      >
        <div>&gt; SIGNAL CHANNELS ACTIVE</div>
        <div>&gt; Secure communication initialized...</div>
        <div className="mt-1 text-[#00FF88]">
          &gt; Currently {PROFILE.availability}
        </div>
      </motion.div>

      {/* Social Links — no whileHover scale, border-color transition via CSS */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {SOCIAL_LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(0.15 + i * 0.05, 0.3), duration: 0.4 }}
            className="rounded-lg p-3 flex items-center gap-3 no-underline transition-colors duration-300 group hover:border-[rgba(0,240,255,0.25)]"
            style={{
              background: 'rgba(10,10,30,0.4)',
              border: '1px solid rgba(0,240,255,0.08)',
            }}
          >
            <span
              className="text-xl"
              style={{ color: link.color }}
            >
              {link.icon}
            </span>
            <div className="min-w-0">
              <div className="font-['JetBrains_Mono'] text-xs font-medium" style={{ color: link.color }}>
                {link.label}
              </div>
              <div className="font-['JetBrains_Mono'] text-[9px] text-[#4a4a6a] truncate">
                {link.description}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
      >
        <h3 className="font-['JetBrains_Mono'] text-xs text-[#8080A0] mb-3 tracking-widest uppercase flex items-center gap-2">
          <span className="w-4 h-px bg-[#00F0FF] opacity-50" />
          SEND TRANSMISSION
          <span className="flex-1 h-px bg-[rgba(0,240,255,0.1)]" />
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name Field */}
          <div>
            <label className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a] mb-1 block">
              {activeField === 'name' ? '> ' : ''}IDENTIFIER
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setActiveField('name')}
              onBlur={() => setActiveField(null)}
              placeholder="Enter your name..."
              required
              className="w-full px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-sm text-[#E0E0FF] placeholder-[#2a2a4a] outline-none transition-all duration-300"
              style={{
                background: 'rgba(5,5,16,0.6)',
                border: `1px solid ${activeField === 'name' ? 'rgba(0,240,255,0.3)' : 'rgba(0,240,255,0.08)'}`,
                /* Reduced focus glow to 0.06 opacity */
                boxShadow: activeField === 'name' ? '0 0 8px rgba(0,240,255,0.06)' : 'none',
              }}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a] mb-1 block">
              {activeField === 'email' ? '> ' : ''}SIGNAL ADDRESS
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setActiveField('email')}
              onBlur={() => setActiveField(null)}
              placeholder="Enter your email..."
              required
              className="w-full px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-sm text-[#E0E0FF] placeholder-[#2a2a4a] outline-none transition-all duration-300"
              style={{
                background: 'rgba(5,5,16,0.6)',
                border: `1px solid ${activeField === 'email' ? 'rgba(0,240,255,0.3)' : 'rgba(0,240,255,0.08)'}`,
                boxShadow: activeField === 'email' ? '0 0 8px rgba(0,240,255,0.06)' : 'none',
              }}
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a] mb-1 block">
              {activeField === 'message' ? '> ' : ''}TRANSMISSION DATA
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setActiveField('message')}
              onBlur={() => setActiveField(null)}
              placeholder="Enter your message..."
              required
              rows={4}
              className="w-full px-3 py-2 rounded-lg font-['JetBrains_Mono'] text-sm text-[#E0E0FF] placeholder-[#2a2a4a] outline-none transition-all duration-300 resize-none"
              style={{
                background: 'rgba(5,5,16,0.6)',
                border: `1px solid ${activeField === 'message' ? 'rgba(0,240,255,0.3)' : 'rgba(0,240,255,0.08)'}`,
                boxShadow: activeField === 'message' ? '0 0 8px rgba(0,240,255,0.06)' : 'none',
              }}
            />
          </div>

          {/* Send Button — no whileHover scale, reduced boxShadow, keep whileTap */}
          <motion.button
            type="submit"
            disabled={sending || sent}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 rounded-lg font-['JetBrains_Mono'] text-sm font-medium transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            style={{
              background: sent
                ? 'rgba(0,255,136,0.15)'
                : sending
                ? 'rgba(185,128,240,0.15)'
                : 'rgba(0,240,255,0.1)',
              border: `1px solid ${sent ? 'rgba(0,255,136,0.4)' : sending ? 'rgba(185,128,240,0.4)' : 'rgba(0,240,255,0.3)'}`,
              color: sent ? '#00FF88' : sending ? '#B980F0' : '#00F0FF',
              boxShadow: `0 0 10px ${sent ? 'rgba(0,255,136,0.08)' : sending ? 'rgba(185,128,240,0.08)' : 'rgba(0,240,255,0.08)'}`,
            }}
          >
            {sent ? '✓ TRANSMISSION SENT' : sending ? '◌ TRANSMITTING...' : '◈ SEND TRANSMISSION'}
          </motion.button>
        </form>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-4 pt-3 border-t border-[rgba(0,240,255,0.06)] flex items-center gap-2"
      >
        <span className="text-[#00F0FF] text-xs">◉</span>
        <span className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a]">
          SIGNAL ORIGIN: {PROFILE.contact.location}
        </span>
      </motion.div>
    </div>
  );
}
