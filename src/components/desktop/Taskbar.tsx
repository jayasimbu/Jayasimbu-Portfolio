'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ─── Taskbar Props ────────────────────────────────────────────────────────────
interface TaskbarProps {
  openWindows: Array<{ id: string; title: string; isMinimized: boolean }>;
  onWindowClick: (id: string) => void;
}

// ─── Clock Component ──────────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      return `${h}:${m}:${s}`;
    };

    const initial = setTimeout(() => setTime(formatTime()), 0);
    const interval = setInterval(() => setTime(formatTime()), 1000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 11,
        color: '#00F0FF',
        letterSpacing: '0.08em',
      }}
    >
      {time}
    </span>
  );
}

// ─── Taskbar Component ────────────────────────────────────────────────────────
function Taskbar({ openWindows, onWindowClick }: TaskbarProps) {
  return (
    <div
      className="fixed bottom-0 right-0 flex items-center justify-between px-3 z-50"
      style={{
        left: 60,
        height: 40,
        background: 'rgba(5,5,16,0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0,240,255,0.1)',
      }}
    >
      {/* ── Left: Window Tabs ───────────────────────────────────── */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {openWindows.map((win) => (
          <motion.button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: win.isMinimized ? 'rgba(0,240,255,0.4)' : '#00F0FF',
              background: win.isMinimized
                ? 'rgba(0,240,255,0.03)'
                : 'rgba(0,240,255,0.08)',
              border: win.isMinimized
                ? '1px dashed rgba(0,240,255,0.15)'
                : '1px solid rgba(0,240,255,0.25)',
            }}
          >
            {/* Glow indicator dot */}
            <span
              className="inline-block rounded-full"
              style={{
                width: 5,
                height: 5,
                backgroundColor: win.isMinimized
                  ? 'rgba(0,240,255,0.3)'
                  : '#00F0FF',
                boxShadow: win.isMinimized
                  ? 'none'
                  : '0 0 6px rgba(0,240,255,0.5)',
              }}
            />
            <span className="truncate max-w-[120px]">{win.title}</span>
          </motion.button>
        ))}
      </div>

      {/* ── Right: Clock & Status ───────────────────────────────── */}
      <div className="flex items-center gap-4 shrink-0 ml-4">
        {/* Online indicator */}
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: '#00FF88',
              boxShadow: '0 0 8px rgba(0,255,136,0.6)',
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#00FF88',
              letterSpacing: '0.06em',
            }}
          >
            ONLINE
          </span>
        </div>

        {/* System clock */}
        <Clock />
      </div>
    </div>
  );
}

export default Taskbar;
