'use client';

import { useEffect, useState } from 'react';

/**
 * CursorGlow — Soft ambient lighting that follows cursor.
 * Smaller, more subtle than before.
 */
export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    const init = setTimeout(() => setIsHoverDevice(mq.matches), 0);
    const handleChange = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mq.addEventListener('change', handleChange);
    return () => {
      clearTimeout(init);
      mq.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (!isHoverDevice) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHoverDevice]);

  if (!isHoverDevice) return null;

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        zIndex: 1,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)',
        transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
        transition: 'transform 0.15s ease-out',
        top: 0,
        left: 0,
      }}
      aria-hidden="true"
    />
  );
}
