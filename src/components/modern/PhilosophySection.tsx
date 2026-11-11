'use client';

import { motion } from 'framer-motion';
import {
  Code2,
  UserCheck,
  Server,
  Bot,
  TrendingUp,
  Quote,
  Sparkles,
} from 'lucide-react';
import { PHILOSOPHY } from '@/data/portfolio-data';

export default function PhilosophySection() {
  const iconList = [Code2, UserCheck, Server, Bot, TrendingUp];
  const iconColors = [
    'text-[#ff6b4a]',
    'text-[#7bd0ff]',
    'text-[#56d9d8]',
    'text-[#ffb4a3]',
    'text-[#ff6b4a]',
  ];

  return (
    <section id="philosophy" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-['JetBrains_Mono'] text-xs text-[#56d9d8] uppercase tracking-widest">
            08 · My Approach
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8] mt-3">
            Development <span className="gradient-text-tertiary">Philosophy</span>
          </h2>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto mb-14"
        >
          <div className="glass-card rounded-xl p-8 border-l-4 border-l-[#56d9d8] text-center glow-tertiary">
            <Quote className="w-9 h-9 text-[#56d9d8] mx-auto mb-4 opacity-80" />
            <p className="text-lg sm:text-xl text-[#f6ddd8] italic leading-relaxed font-['Space_Grotesk']">
              &ldquo;{PHILOSOPHY.quote}&rdquo;
            </p>
            <p className="font-['JetBrains_Mono'] text-xs text-[#56d9d8] mt-4">
              — Jayasimbu Jayamani
            </p>
          </div>
        </motion.div>

        {/* 5 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {PHILOSOPHY.principles.map((p, idx) => {
            const Icon = iconList[idx] || Sparkles;
            const colorClass = iconColors[idx % iconColors.length];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="glass-card rounded-xl p-5 text-center hover-lift flex flex-col justify-between"
              >
                <div>
                  <Icon className={`w-7 h-7 mx-auto mb-3 ${colorClass}`} />
                  <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-[#f6ddd8] mb-2">
                    {p.title}
                  </h4>
                  <p className="text-xs text-[#e1bfb8]/90 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#59413c]/30 font-['JetBrains_Mono'] text-[10px] text-[#a88a83]">
                  PILLAR 0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
