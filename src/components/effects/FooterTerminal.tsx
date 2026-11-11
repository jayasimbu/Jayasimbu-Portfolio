'use client';

import { motion } from 'framer-motion';

/**
 * FooterTerminal — A fixed status bar pinned to the bottom
 * of the viewport, styled as a terminal/system readout.
 */
export default function FooterTerminal() {
  return (
    <motion.div
      className="fixed bottom-0 left-0 w-full"
      style={{
        zIndex: 100,
        background: 'rgba(5, 5, 16, 0.9)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0, 240, 255, 0.1)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: '#4a4a6a',
        padding: '6px 16px',
      }}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.8 }}
    >
      <div className="flex items-center gap-0 overflow-x-auto whitespace-nowrap">
        {/* SYS:ONLINE */}
        <span>SYS:</span>
        <span style={{ color: '#00FF88' }}>ONLINE</span>

        <span className="mx-1 opacity-50"> | </span>

        {/* USER */}
        <span>USER:</span>
        <span>JAYASIMBU_JAYAMANI</span>

        <span className="mx-1 opacity-50"> | </span>

        {/* LOC */}
        <span>LOC:</span>
        <span>DHARMAPURI</span>

        <span className="mx-1 opacity-50"> | </span>

        {/* NET:ACTIVE */}
        <span>NET:</span>
        <span style={{ color: '#00F0FF' }}>ACTIVE</span>

        <span className="mx-1 opacity-50"> | </span>

        {/* SIG:STABLE */}
        <span>SIG:</span>
        <span style={{ color: '#00F0FF' }}>STABLE</span>

        {/* Blinking cursor */}
        <span
          className="typing-cursor inline-block ml-1"
          style={{
            width: '6px',
            height: '12px',
            backgroundColor: '#00F0FF',
            verticalAlign: 'middle',
          }}
        />
      </div>
    </motion.div>
  );
}
