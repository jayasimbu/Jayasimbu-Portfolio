'use client';

import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowManager } from '@/hooks/useWindowManager';
import { DESKTOP_MODULES } from '@/data/portfolio-data';
import Window from '@/components/desktop/Window';
import Dock from '@/components/desktop/Dock';
import Taskbar from '@/components/desktop/Taskbar';
import ParticleField from '@/components/effects/ParticleField';
import ScanlineOverlay from '@/components/effects/ScanlineOverlay';
import CursorGlow from '@/components/effects/CursorGlow';
import FooterTerminal from '@/components/effects/FooterTerminal';
import ProfileModule from '@/components/modules/ProfileModule';
import ProjectsModule from '@/components/modules/ProjectsModule';
import StackModule from '@/components/modules/StackModule';
import AILabModule from '@/components/modules/AILabModule';
import AutomationModule from '@/components/modules/AutomationModule';
import ContactModule from '@/components/modules/ContactModule';
import StatusModule from '@/components/modules/StatusModule';

const MODULE_COMPONENTS: Record<string, React.ComponentType> = {
  profile: ProfileModule,
  projects: ProjectsModule,
  stack: StackModule,
  ailab: AILabModule,
  automation: AutomationModule,
  contact: ContactModule,
  status: StatusModule,
};

interface DesktopOSProps {
  onExitOS?: () => void;
}

export default function DesktopOS({ onExitOS }: DesktopOSProps) {
  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    getOpenWindows,
    getMinimizedWindows,
  } = useWindowManager();

  const handleModuleClick = (id: string) => {
    const desktopModule = DESKTOP_MODULES.find((m) => m.id === id);
    if (!desktopModule) return;

    const existingWindow = windows[id];
    if (existingWindow?.isOpen && !existingWindow.isMinimized) {
      focusWindow(id);
      return;
    }
    openWindow(id, desktopModule.title);
  };

  const openWindowsList = getOpenWindows();
  const minimizedWindowsList = getMinimizedWindows();
  const activeWindowIds = useMemo(
    () => [
      ...openWindowsList.map((w) => w.id),
      ...minimizedWindowsList.map((w) => w.id),
    ],
    [openWindowsList, minimizedWindowsList]
  );

  const highestZIndex = useMemo(
    () => Math.max(0, ...openWindowsList.map((w) => w.zIndex)),
    [openWindowsList]
  );

  const taskbarWindows = useMemo(
    () =>
      [...openWindowsList, ...minimizedWindowsList].map((w) => ({
        id: w.id,
        title: w.title,
        isMinimized: w.isMinimized,
      })),
    [openWindowsList, minimizedWindowsList]
  );

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#050510' }}>
      {/* Background Effects */}
      <ParticleField />
      <div className="grid-bg fixed inset-0 pointer-events-none opacity-30" />
      <CursorGlow />

      {/* Switch to Web View Toggle */}
      {onExitOS && (
        <button
          onClick={onExitOS}
          className="fixed top-3 right-4 z-[9999] flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-['JetBrains_Mono'] font-bold text-white bg-[#0A0A1F]/90 border border-[#00F0FF]/40 hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 shadow-lg transition-all cursor-pointer backdrop-blur-md"
        >
          <span>🌐 Switch to Modern Web View</span>
        </button>
      )}

      {/* Desktop Area */}
      <div className="fixed inset-0" style={{ paddingLeft: '60px', paddingBottom: '40px' }}>
        {/* Welcome Message when no windows open */}
        {openWindowsList.length === 0 && minimizedWindowsList.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="font-['Orbitron'] text-xs text-[#4a4a6a] tracking-[0.3em] mb-3 uppercase">
                Portfolio:// Override
              </div>
              <div className="font-['JetBrains_Mono'] text-sm text-[#8080A0] mb-1">
                Welcome to the system, Visitor.
              </div>
              <div className="font-['JetBrains_Mono'] text-xs text-[#4a4a6a]">
                Select a module from the dock to begin.
              </div>
            </div>
          </div>
        )}

        {/* Windows */}
        <AnimatePresence>
          {openWindowsList.map((win) => {
            const ModuleComponent = MODULE_COMPONENTS[win.id];
            if (!ModuleComponent) return null;

            return (
              <Window
                key={win.id}
                id={win.id}
                title={win.title}
                isActive={win.zIndex === highestZIndex}
                isMaximized={win.isMaximized}
                position={win.position}
                size={win.size}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
                onDragEnd={(pos) => updatePosition(win.id, pos)}
              >
                <ModuleComponent />
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <Dock
        modules={DESKTOP_MODULES}
        activeWindows={activeWindowIds}
        onModuleClick={handleModuleClick}
      />

      {/* Taskbar */}
      <Taskbar
        openWindows={taskbarWindows}
        onWindowClick={handleModuleClick}
      />

      {/* Footer Terminal */}
      <FooterTerminal />

      {/* Overlays */}
      <ScanlineOverlay />
    </div>
  );
}
