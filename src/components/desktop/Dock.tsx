'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Dock Props ───────────────────────────────────────────────────────────────
interface DockProps {
  modules: ReadonlyArray<{
    id: string;
    title: string;
    icon: string;
    color: string;
  }>;
  activeWindows: string[];
  onModuleClick: (id: string) => void;
}

// ─── Single Dock Icon ─────────────────────────────────────────────────────────
function DockIcon({
  module,
  isActive,
  onClick,
}: {
  module: { id: string; title: string; icon: string; color: string };
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      {/* Icon Button */}
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center rounded-lg transition-colors cursor-pointer"
        style={{
          width: 40,
          height: 40,
          background: hovered ? `${module.color}10` : 'transparent',
          transition: 'background 0.2s ease',
        }}
      >
        {/* Icon character */}
        <span
          style={{
            fontSize: 18,
            color: module.color,
            opacity: hovered ? 1 : 0.7,
            transition: 'opacity 0.2s ease',
          }}
        >
          {module.icon}
        </span>
      </motion.button>

      {/* Active indicator dot */}
      {isActive && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: 3,
            height: 3,
            backgroundColor: module.color,
          }}
        />
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-full ml-3 px-2.5 py-1.5 rounded-md whitespace-nowrap pointer-events-none z-[100]"
            style={{
              background: 'rgba(10,10,30,0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,240,255,0.15)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: module.color,
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            {module.title}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mini Clock ───────────────────────────────────────────────────────────────
function MiniClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      return `${h}:${m}`;
    };

    const initial = setTimeout(() => setTime(fmt()), 0);
    const interval = setInterval(() => setTime(fmt()), 1000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 8,
        color: 'rgba(0,240,255,0.3)',
        letterSpacing: '0.1em',
      }}
    >
      {time}
    </span>
  );
}

// ─── Dock Component ───────────────────────────────────────────────────────────
function Dock({ modules, activeWindows, onModuleClick }: DockProps) {
  return (
    <div
      className="fixed left-0 top-0 bottom-0 flex flex-col items-center justify-between py-4 z-50"
      style={{
        width: 60,
        background: 'rgba(5,5,16,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(0,240,255,0.08)',
      }}
    >
      {/* ── Top: Branding ──────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-1 mb-4">
        <span
          className="select-none"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 8,
            letterSpacing: '0.15em',
            color: 'rgba(0,240,255,0.12)',
            transform: 'rotate(180deg)',
          }}
        >
          PORTFOLIO://
        </span>
      </div>

      {/* ── Center: Module Icons ────────────────────────────────── */}
      <nav className="flex flex-col items-center gap-3">
        {modules.map((mod) => (
          <DockIcon
            key={mod.id}
            module={mod}
            isActive={activeWindows.includes(mod.id)}
            onClick={() => onModuleClick(mod.id)}
          />
        ))}
      </nav>

      {/* ── Bottom: System Clock ────────────────────────────────── */}
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-6 mb-2"
          style={{ borderTop: '1px solid rgba(0,240,255,0.08)' }}
        />
        <MiniClock />
      </div>
    </div>
  );
}

export default Dock;
