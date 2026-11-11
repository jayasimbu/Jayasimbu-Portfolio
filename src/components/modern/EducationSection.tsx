'use client';

import { motion } from 'framer-motion';
import { EDUCATION } from '@/data/portfolio-data';

export default function EducationSection() {
  const dotColors = ['bg-[#56d9d8]', 'bg-[#7bd0ff]', 'bg-[#ff6b4a]'];
  const pillColors = [
    'bg-[#56d9d8]/10 text-[#56d9d8]',
    'bg-[#7bd0ff]/10 text-[#7bd0ff]',
    'bg-[#ff6b4a]/10 text-[#ff6b4a]',
  ];

  const coursework = [
    'Data Structures',
    'Algorithms',
    'OOP',
    'DBMS',
    'OS',
    'Web Technologies',
    'AI',
  ];

  return (
    <section id="education" className="py-20 lg:py-28 relative overflow-hidden">
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
            06 · Academic Background
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8] mt-3">
            My <span className="gradient-text-tertiary">Education</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {EDUCATION.map((edu, index) => {
            const isLast = index === EDUCATION.length - 1;
            const dotColor = dotColors[index % dotColors.length];
            const pillColor = pillColors[index % pillColors.length];

            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative pl-8 border-l-2 border-[#59413c]/50 ${isLast ? '' : 'pb-10'}`}
              >
                <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-4 border-[#1d100e] ${dotColor}`} />

                <div className="glass-card rounded-xl p-6 hover-lift">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className={`font-['JetBrains_Mono'] text-xs px-3 py-1 rounded-full ${pillColor}`}>
                      {edu.period}
                    </span>
                    {edu.score && (
                      <span className="font-['JetBrains_Mono'] text-xs px-3 py-1 rounded-full bg-[#ff6b4a]/10 text-[#ff6b4a]">
                        {edu.score}
                      </span>
                    )}
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-semibold text-[#f6ddd8]">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-[#7bd0ff] mt-1">
                    {edu.institution}
                  </p>

                  {edu.details && (
                    <p className="text-xs sm:text-sm text-[#e1bfb8] mt-3 leading-relaxed">
                      {edu.details}
                    </p>
                  )}

                  {index === 0 && (
                    <div className="mt-4">
                      <p className="font-['JetBrains_Mono'] text-[11px] text-[#e1bfb8] uppercase tracking-wider mb-2">
                        Relevant Coursework
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {coursework.map((course) => (
                          <span
                            key={course}
                            className="px-2.5 py-1 rounded-full bg-[#352723] text-[#e1bfb8] font-['JetBrains_Mono'] text-[11px]"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
