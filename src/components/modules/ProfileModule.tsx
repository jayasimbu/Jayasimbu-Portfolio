'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PROFILE, EDUCATION } from '@/data/portfolio-data';

function TypewriterText({ text, delay = 0, speed = 40 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayed, started, text, speed]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="typing-cursor" style={{ height: '1em', width: '8px' }} />
      )}
    </span>
  );
}

export default function ProfileModule() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-2 font-['Inter'] h-full overflow-y-auto">
      {/* System Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-4 pb-3 border-b border-[rgba(0,240,255,0.1)]"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00FF88]" />
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#00FF88]">SYSTEM ACTIVE</span>
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#4a4a6a] ml-auto">PID: 0x7F3A</span>
        </div>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="rounded-xl p-5 mb-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.05) 0%, rgba(185,128,240,0.05) 100%)',
          border: '1px solid rgba(0,240,255,0.15)',
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-xl relative overflow-hidden border border-[rgba(0,240,255,0.3)] shrink-0 shadow-lg"
          >
            <Image
              src={PROFILE.profileImage}
              alt="Jayasimbu Jayamani"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-['JetBrains_Mono'] text-lg sm:text-xl font-bold text-[#E0E0FF] mb-1 leading-tight">
              {showContent ? <TypewriterText text={PROFILE.name} speed={50} /> : ''}
            </h1>
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#00F0FF] leading-tight">
              {showContent ? <TypewriterText text={PROFILE.role} delay={1200} speed={30} /> : ''}
            </p>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            { label: 'STATUS', value: 'ONLINE', color: '#00FF88' },
            { label: 'MODE', value: 'AVAILABLE', color: '#00F0FF' },
            { label: 'BATCH', value: '2026', color: '#B980F0' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-['JetBrains_Mono']"
              style={{ background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.1)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: stat.color }} />
              <span className="text-[#8080A0]">{stat.label}:</span>
              <span style={{ color: stat.color }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Hero Statement */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-5 pl-3 py-2"
            style={{ borderLeft: '2px solid #B980F0' }}
          >
            <p className="font-['JetBrains_Mono'] text-xs sm:text-sm italic text-[#B980F0]">
              &ldquo;{PROFILE.heroStatement}&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mb-5"
      >
        <h2 className="font-['JetBrains_Mono'] text-xs text-[#8080A0] mb-2 tracking-widest uppercase flex items-center gap-2">
          <span className="w-4 h-px bg-[#00F0FF] opacity-50" />
          ABOUT
          <span className="flex-1 h-px bg-[rgba(0,240,255,0.1)]" />
        </h2>
        <p className="text-xs sm:text-sm text-[#E0E0FF] leading-relaxed opacity-90">{PROFILE.about}</p>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h2 className="font-['JetBrains_Mono'] text-xs text-[#8080A0] mb-3 tracking-widest uppercase flex items-center gap-2">
          <span className="w-4 h-px bg-[#B980F0] opacity-50" />
          EDUCATION
          <span className="flex-1 h-px bg-[rgba(185,128,240,0.1)]" />
        </h2>
        <div className="space-y-3">
          {EDUCATION.map((edu, i) => (
            <div
              key={i}
              className="p-3 rounded-lg"
              style={{
                background: 'rgba(185,128,240,0.03)',
                border: '1px solid rgba(185,128,240,0.1)',
              }}
            >
              <h3 className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[#E0E0FF] font-medium mb-1">
                {edu.degree}
              </h3>
              <p className="text-xs text-[#8080A0]">{edu.institution}</p>
              <div className="flex items-center gap-2 mt-1">
                {edu.period && (
                  <span className="font-['Orbitron'] text-[10px] text-[#B980F0]">{edu.period}</span>
                )}
                {edu.score && (
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#00FF88]">({edu.score})</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-4 pt-3 border-t border-[rgba(0,240,255,0.1)] flex items-center gap-2"
      >
        <span className="text-[#00F0FF] text-xs">◉</span>
        <span className="font-['JetBrains_Mono'] text-[11px] text-[#4a4a6a]">
          LOCATION: {PROFILE.contact.location}
        </span>
      </motion.div>
    </div>
  );
}
