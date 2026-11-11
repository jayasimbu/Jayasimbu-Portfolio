'use client';

import React from 'react';
import { motion, type PanInfo } from 'framer-motion';

interface WindowProps {
  id: string;
  title: string;
  isActive: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDragEnd: (position: { x: number; y: number }) => void;
  children: React.ReactNode;
}

function ControlDot({ color, label, onClick }: { color: string; label: string; onClick: () => void }) {
  return (
    <motion.button
      aria-label={label}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="rounded-full cursor-pointer"
      style={{ width: 12, height: 12, backgroundColor: color }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.15 }}
    />
  );
}

export default function Window({
  id,
  title,
  isActive,
  isMaximized,
  position,
  size,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDragEnd,
  children,
}: WindowProps) {
  const resolvedStyle = isMaximized
    ? { x: 60, y: 0, width: 'calc(100vw - 60px)', height: 'calc(100vh - 40px)' }
    : { x: position.x, y: position.y, width: size.width, height: size.height };

  return (
    <motion.div
      key={id}
      /* Smooth spring open, soft fade close */
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: resolvedStyle.x,
        y: resolvedStyle.y,
        width: resolvedStyle.width,
        height: resolvedStyle.height,
      }}
      exit={{ scale: 0.97, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      /* Drag */
      drag={!isMaximized}
      dragMomentum={false}
      dragListener={false}
      dragConstraints={{
        top: 0,
        left: 60,
        right: typeof window !== 'undefined' ? window.innerWidth - 200 : 1200,
        bottom: typeof window !== 'undefined' ? window.innerHeight - 100 : 700,
      }}
      onDragEnd={(_: unknown, info: PanInfo) => {
        onDragEnd({ x: position.x + info.offset.x, y: position.y + info.offset.y });
      }}
      onMouseDown={onFocus}
      className={`fixed flex flex-col overflow-hidden rounded-xl ${isActive ? 'window-active' : 'window-inactive'}`}
      style={{
        zIndex: isActive ? 999 : undefined,
        background: 'rgba(10, 10, 30, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isActive ? '1px solid rgba(0,240,255,0.2)' : '1px solid rgba(0,240,255,0.08)',
        borderRadius: 12,
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Title Bar */}
      <motion.div
        drag={!isMaximized}
        dragMomentum={false}
        dragConstraints={{
          top: 0, left: 60,
          right: typeof window !== 'undefined' ? window.innerWidth - 200 : 1200,
          bottom: typeof window !== 'undefined' ? window.innerHeight - 100 : 700,
        }}
        onDragEnd={(_: unknown, info: PanInfo) => {
          onDragEnd({ x: position.x + info.offset.x, y: position.y + info.offset.y });
        }}
        className="flex items-center justify-between px-4 py-2.5 shrink-0 cursor-grab active:cursor-grabbing select-none"
        style={{
          borderBottom: '1px solid rgba(0,240,255,0.06)',
          background: 'rgba(0,240,255,0.02)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-40" style={{ color: '#00F0FF' }}>◆</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: isActive ? '#00F0FF' : '#6a6a8a',
            letterSpacing: '0.02em',
            transition: 'color 0.3s ease',
          }}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ControlDot color="#FFB800" label="Minimize" onClick={onMinimize} />
          <ControlDot color="#00FF88" label="Maximize" onClick={onMaximize} />
          <ControlDot color="#FF3366" label="Close" onClick={onClose} />
        </div>
      </motion.div>

      {/* Body */}
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,240,255,0.15) transparent' }}
      >
        {children}
      </div>
    </motion.div>
  );
}
