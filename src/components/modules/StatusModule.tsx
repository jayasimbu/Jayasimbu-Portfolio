'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '@/data/portfolio-data';

function AnimatedCounter({ target, duration = 1000, prefix = '', suffix = '' }: {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span className="font-['Orbitron']">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="text-center">
      {/* Reduced text-shadow to 0.2 max, static colons — no animate-pulse */}
      <div className="font-['Orbitron'] text-3xl font-bold text-[#00F0FF] tracking-wider mb-1"
        style={{ textShadow: '0 0 10px rgba(0,240,255,0.2)' }}
      >
        {pad(time.getHours())}
        <span>:</span>
        {pad(time.getMinutes())}
        <span>:</span>
        {pad(time.getSeconds())}
      </div>
      <div className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a]">
        {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}

export default function StatusModule() {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 23,
    memory: 45,
    network: 87,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics({
        cpu: 15 + Math.floor(Math.random() * 25),
        memory: 40 + Math.floor(Math.random() * 15),
        network: 80 + Math.floor(Math.random() * 18),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const STATS = [
    { label: 'PROJECTS', value: 3, color: '#FF3366' },
    { label: 'TECHNOLOGIES', value: 28, color: '#00F0FF' },
    { label: 'AUTOMATION FLOWS', value: 12, color: '#FFB800' },
    { label: 'AI MODELS', value: 5, color: '#B980F0' },
  ];

  const HEALTH_INDICATORS = [
    { label: 'CPU', value: systemMetrics.cpu, color: '#00F0FF', suffix: '%' },
    { label: 'MEMORY', value: systemMetrics.memory, color: '#B980F0', suffix: '%' },
    { label: 'NETWORK', value: systemMetrics.network, color: '#00FF88', suffix: '%' },
  ];

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
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#FF3366]">⬡ SYSTEM MONITOR</span>
          <span className="flex-1 h-px bg-[rgba(255,51,102,0.1)]" />
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#00FF88]">ALL SYSTEMS NOMINAL</span>
        </div>
      </motion.div>

      {/* Live Clock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-4 rounded-xl p-4"
        style={{ background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.08)' }}
      >
        <LiveClock />
      </motion.div>

      {/* System Health — smooth width transitions, no boxShadow/glow from bar fills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-4"
      >
        <h3 className="font-['JetBrains_Mono'] text-xs text-[#8080A0] mb-2 tracking-widest uppercase flex items-center gap-2">
          <span className="w-4 h-px bg-[#FF3366] opacity-50" />
          SYSTEM HEALTH
          <span className="flex-1 h-px bg-[rgba(255,51,102,0.1)]" />
        </h3>
        <div className="space-y-2">
          {HEALTH_INDICATORS.map((indicator) => (
            <div
              key={indicator.label}
              className="flex items-center gap-3"
            >
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a] w-16">
                {indicator.label}
              </span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,240,255,0.05)' }}>
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${indicator.value}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    background: `linear-gradient(90deg, ${indicator.color}80, ${indicator.color})`,
                    /* No boxShadow glow */
                  }}
                />
              </div>
              <span className="font-['Orbitron'] text-[11px] w-10 text-right" style={{ color: indicator.color }}>
                {indicator.value}{indicator.suffix}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Project Statistics — fade only, no scale animation on entry */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-4"
      >
        <h3 className="font-['JetBrains_Mono'] text-xs text-[#8080A0] mb-2 tracking-widest uppercase flex items-center gap-2">
          <span className="w-4 h-px bg-[#00F0FF] opacity-50" />
          STATISTICS
          <span className="flex-1 h-px bg-[rgba(0,240,255,0.1)]" />
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg p-3 text-center"
              style={{ background: 'rgba(10,10,30,0.3)', border: '1px solid rgba(0,240,255,0.06)' }}
            >
              <div className="text-xl font-bold mb-0.5" style={{ color: stat.color }}>
                {/* AnimatedCounter with faster 1000ms duration */}
                <AnimatedCounter target={stat.value} duration={1000} />
              </div>
              <div className="font-['JetBrains_Mono'] text-[9px] text-[#4a4a6a]">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Status Info — static green dot, no animate-pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="space-y-2"
      >
        {[
          { label: 'LOCATION', value: PROFILE.contact.location, color: '#00F0FF', icon: '◉' },
          { label: 'STATUS', value: 'AVAILABLE FOR PROJECTS', color: '#00FF88', icon: '◈' },
          { label: 'ACTIVE MSG', value: PROFILE.statusMessage, color: '#B980F0', icon: '◎' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{ background: 'rgba(10,10,30,0.3)', border: '1px solid rgba(0,240,255,0.05)' }}
          >
            <span style={{ color: item.color }}>{item.icon}</span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#4a4a6a]">{item.label}:</span>
            <span className="font-['JetBrains_Mono'] text-[11px]" style={{ color: item.color }}>
              {item.value}
            </span>
            {item.label === 'STATUS' && (
              /* Static green dot */
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] ml-auto" />
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
