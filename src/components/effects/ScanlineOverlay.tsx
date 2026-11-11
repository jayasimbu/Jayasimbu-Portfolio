'use client';

/**
 * ScanlineOverlay — CRT scanline + noise grain overlays.
 * Both are fullscreen, non-interactive, and sit at the
 * highest z-indices for that retro cyberpunk feel.
 */
export default function ScanlineOverlay() {
  return (
    <>
      {/* Horizontal scanlines */}
      <div
        className="scanline-overlay fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
        aria-hidden="true"
      />
      {/* Film-grain noise */}
      <div
        className="noise-overlay fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
        aria-hidden="true"
      />
    </>
  );
}
