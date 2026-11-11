import { useState, useCallback } from 'react';

// ─── Window State Interface ───────────────────────────────────────────────────
export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

// ─── Default Dimensions & Positioning ─────────────────────────────────────────
const DEFAULT_SIZE = { width: 750, height: 520 };
const START_POSITION = { x: 120, y: 40 };
const STAGGER_OFFSET = 30;
const INITIAL_Z_INDEX = 10;

// ─── Window Manager Hook ──────────────────────────────────────────────────────
export function useWindowManager() {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [zCounter, setZCounter] = useState(INITIAL_Z_INDEX);

  // Get the next z-index and increment the counter
  const getNextZ = useCallback(() => {
    setZCounter((prev) => prev + 1);
    return zCounter + 1;
  }, [zCounter]);

  // Open a new window or restore a minimized one
  const openWindow = useCallback(
    (id: string, title: string) => {
      setWindows((prev) => {
        const existing = prev[id];

        // If already open, just un-minimize and bring to front
        if (existing?.isOpen) {
          const nextZ = zCounter + 1;
          setZCounter(nextZ);
          return {
            ...prev,
            [id]: { ...existing, isMinimized: false, zIndex: nextZ },
          };
        }

        // Calculate staggered position based on currently open windows
        const openCount = Object.values(prev).filter((w) => w.isOpen).length;
        const nextZ = zCounter + 1;
        setZCounter(nextZ);

        return {
          ...prev,
          [id]: {
            id,
            title,
            isOpen: true,
            isMinimized: false,
            isMaximized: false,
            position: {
              x: START_POSITION.x + openCount * STAGGER_OFFSET,
              y: START_POSITION.y + openCount * STAGGER_OFFSET,
            },
            size: { ...DEFAULT_SIZE },
            zIndex: nextZ,
          },
        };
      });
    },
    [zCounter]
  );

  // Close a window (keep it in state but mark as closed)
  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return { ...prev, [id]: { ...win, isOpen: false, isMinimized: false, isMaximized: false } };
    });
  }, []);

  // Minimize a window to the taskbar
  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return { ...prev, [id]: { ...win, isMinimized: true } };
    });
  }, []);

  // Toggle maximize state
  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return { ...prev, [id]: { ...win, isMaximized: !win.isMaximized } };
    });
  }, []);

  // Bring a window to the front by assigning the highest z-index
  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const win = prev[id];
        if (!win) return prev;
        const nextZ = zCounter + 1;
        setZCounter(nextZ);
        return { ...prev, [id]: { ...win, zIndex: nextZ, isMinimized: false } };
      });
    },
    [zCounter]
  );

  // Update window position after a drag
  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return { ...prev, [id]: { ...win, position } };
    });
  }, []);

  // Get a single window by ID
  const getWindow = useCallback(
    (id: string): WindowState | undefined => {
      return windows[id];
    },
    [windows]
  );

  // Get open, non-minimized windows sorted by z-index (lowest first)
  const getOpenWindows = useCallback(() => {
    return Object.values(windows)
      .filter((w) => w.isOpen && !w.isMinimized)
      .sort((a, b) => a.zIndex - b.zIndex);
  }, [windows]);

  // Get all minimized windows
  const getMinimizedWindows = useCallback(() => {
    return Object.values(windows).filter((w) => w.isOpen && w.isMinimized);
  }, [windows]);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    getWindow,
    getOpenWindows,
    getMinimizedWindows,
  };
}

export default useWindowManager;
