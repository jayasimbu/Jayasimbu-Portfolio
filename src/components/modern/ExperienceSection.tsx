'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE } from '@/data/portfolio-data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] uppercase tracking-widest">
            05 · Work History
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8] mt-3">
            Professional <span className="gradient-text-secondary">Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {EXPERIENCE.map((exp) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative pl-8 border-l-2 border-[#59413c]/50"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[#ff6b4a] border-4 border-[#1d100e]" />

              <div className="glass-card rounded-xl p-6 sm:p-7 hover-lift space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-['JetBrains_Mono'] text-xs px-3 py-1 rounded-full bg-[#ff6b4a]/10 text-[#ff6b4a]">
                    {exp.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] text-[#e1bfb8]">
                    <Calendar className="w-3.5 h-3.5 text-[#a88a83]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-[#f6ddd8]">
                    {exp.position}
                  </h3>
                  <p className="text-sm sm:text-base text-[#7bd0ff] mt-0.5 font-medium">
                    {exp.company}
                  </p>
                </div>

                {exp.note && (
                  <div className="p-3.5 rounded-lg bg-[#261815] border border-[#ffb4a3]/25 text-xs font-['JetBrains_Mono'] text-[#ffb4a3] leading-relaxed">
                    {exp.note}
                  </div>
                )}

                <ul className="space-y-2 pt-1">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-sm text-[#e1bfb8]">
                      <CheckCircle2 className="w-4 h-4 text-[#56d9d8] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
