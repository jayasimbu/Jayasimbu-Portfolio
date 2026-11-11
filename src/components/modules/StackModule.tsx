'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '@/data/portfolio-data';

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="mb-2.5"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="font-['JetBrains_Mono'] text-xs text-[#E0E0FF]">{name}</span>
        <span className="font-['Orbitron'] text-[10px] text-[#00F0FF]">{level}%</span>
      </div>
      {/* Bar track */}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,240,255,0.08)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay: delay + 0.1, duration: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, rgba(0,240,255,0.5), rgba(0,240,255,0.8))',
            /* No boxShadow glow, no glowing dot */
          }}
        />
      </div>
    </motion.div>
  );
}

function RadarChart({ categories }: { categories: typeof SKILL_CATEGORIES }) {
  const centerX = 140;
  const centerY = 130;
  const maxR = 100;
  const levels = 5;
  const points = categories.length;

  const getPoint = (index: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / points - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const avgLevels = categories.map(
    (cat) => cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length / 100
  );

  const dataPath = avgLevels
    .map((level, i) => {
      const p = getPoint(i, level * maxR);
      return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
    })
    .join(' ') + ' Z';

  return (
    <motion.svg
      width="280"
      height="260"
      viewBox="0 0 280 260"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mx-auto"
    >
      {/* Grid levels */}
      {Array.from({ length: levels }).map((_, i) => {
        const r = (maxR * (i + 1)) / levels;
        const path =
          Array.from({ length: points })
            .map((_, j) => {
              const p = getPoint(j, r);
              return `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
            })
            .join(' ') + ' Z';
        return (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="rgba(0,240,255,0.08)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axes */}
      {categories.map((_, i) => {
        const p = getPoint(i, maxR);
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={p.x}
            y2={p.y}
            stroke="rgba(0,240,255,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon — shown immediately, no animated pathLength */}
      <path
        d={dataPath}
        fill="rgba(0,240,255,0.08)"
        stroke="#00F0FF"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* Data points — shown immediately */}
      {avgLevels.map((level, i) => {
        const p = getPoint(i, level * maxR);
        return (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="#00F0FF"
            opacity="0.8"
          />
        );
      })}

      {/* Labels */}
      {categories.map((cat, i) => {
        const p = getPoint(i, maxR + 20);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#8080A0"
            fontSize="10"
            fontFamily="JetBrains Mono"
          >
            {cat.name}
          </text>
        );
      })}
    </motion.svg>
  );
}

export default function StackModule() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Frontend');

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
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#B980F0]">◈ SYSTEM CAPABILITIES</span>
          <span className="flex-1 h-px bg-[rgba(185,128,240,0.1)]" />
          <span className="font-['Orbitron'] text-[10px] text-[#8080A0]">
            {SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.skills.length, 0)} MODULES
          </span>
        </div>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-4 rounded-xl p-2"
        style={{ background: 'rgba(0,240,255,0.02)', border: '1px solid rgba(0,240,255,0.05)' }}
      >
        <RadarChart categories={SKILL_CATEGORIES} />
      </motion.div>

      {/* Skill Categories */}
      <div className="space-y-2">
        {SKILL_CATEGORIES.map((category, catIdx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: Math.min(0.15 + catIdx * 0.05, 0.3), duration: 0.4 }}
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid rgba(0,240,255,0.08)' }}
          >
            {/* Category Header */}
            <button
              onClick={() =>
                setExpandedCategory(expandedCategory === category.name ? null : category.name)
              }
              className="w-full flex items-center gap-2 px-3 py-2.5 cursor-pointer transition-colors"
              style={{
                background:
                  expandedCategory === category.name
                    ? 'rgba(0,240,255,0.05)'
                    : 'rgba(10,10,30,0.3)',
              }}
            >
              <span className="text-base" style={{ color: '#00F0FF' }}>
                {category.icon}
              </span>
              <span className="font-['JetBrains_Mono'] text-sm text-[#E0E0FF] font-medium">
                {category.name}
              </span>
              <span className="font-['Orbitron'] text-[10px] text-[#4a4a6a] ml-auto mr-2">
                {category.skills.length}
              </span>
              <motion.span
                animate={{ rotate: expandedCategory === category.name ? 90 : 0 }}
                className="text-[#4a4a6a] text-xs"
              >
                ▸
              </motion.span>
            </button>

            {/* Skills List */}
            <motion.div
              initial={false}
              animate={{
                height: expandedCategory === category.name ? 'auto' : 0,
                opacity: expandedCategory === category.name ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-3 py-2" style={{ background: 'rgba(5,5,16,0.5)' }}>
                {category.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={Math.min(0.05 * i, 0.3)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Floating Badges section removed entirely */}
    </div>
  );
}
