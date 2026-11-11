'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data/portfolio-data';

export default function ProjectsModule() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const selected = PROJECTS.find((p) => p.id === selectedProject);

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
          <span className="font-['JetBrains_Mono'] text-[11px] text-[#00F0FF]">◆ PROJECT REGISTRY</span>
          <span className="flex-1 h-px bg-[rgba(0,240,255,0.1)]" />
          <span className="font-['Orbitron'] text-[11px] text-[#8080A0]">{PROJECTS.length} LOADED</span>
        </div>
      </motion.div>

      {/* Project List */}
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.08, 0.3), duration: 0.4 }}
                onClick={() => setSelectedProject(project.id)}
                className="relative rounded-xl p-4 cursor-pointer group transition-colors duration-300"
                style={{
                  background: project.isFeatured
                    ? 'linear-gradient(135deg, rgba(255,51,102,0.08) 0%, rgba(185,128,240,0.08) 100%)'
                    : 'rgba(10,10,30,0.5)',
                  border: project.isFeatured
                    ? '1px solid rgba(255,51,102,0.3)'
                    : '1px solid rgba(0,240,255,0.1)',
                }}
                /* No whileHover scale — border-color handled via CSS group-hover */
              >
                {/* Featured Badge — static dot, no animate-pulse */}
                {project.isFeatured && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] text-[#FF3366]"
                    style={{ background: 'rgba(255,51,102,0.1)', border: '1px solid rgba(255,51,102,0.2)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF3366]" />
                    FEATURED
                  </div>
                )}

                {/* Project Info */}
                <h3 className="font-['JetBrains_Mono'] text-base font-bold text-[#E0E0FF] mb-1 group-hover:text-[#00F0FF] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-['JetBrains_Mono'] text-xs text-[#B980F0] mb-2">
                  {project.subtitle}
                </p>
                <p className="text-sm text-[#8080A0] leading-relaxed line-clamp-2 mb-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] text-[#00F0FF]"
                      style={{ background: 'rgba(0,240,255,0.06)', border: '1px solid rgba(0,240,255,0.1)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Removed 'CLICK TO EXPAND →' hint */}
              </motion.div>
            ))}
          </motion.div>
        ) : selected ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 mb-4 font-['JetBrains_Mono'] text-xs text-[#8080A0] hover:text-[#00F0FF] transition-colors cursor-pointer"
            >
              ← BACK TO REGISTRY
            </button>

            {/* Project Detail */}
            <div
              className="rounded-xl p-5 mb-4"
              style={{
                background: selected.isFeatured
                  ? 'linear-gradient(135deg, rgba(255,51,102,0.06) 0%, rgba(185,128,240,0.06) 100%)'
                  : 'rgba(10,10,30,0.5)',
                border: `1px solid ${selected.isFeatured ? 'rgba(255,51,102,0.2)' : 'rgba(0,240,255,0.15)'}`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {selected.isFeatured && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-['JetBrains_Mono'] text-[#FF3366]"
                    style={{ background: 'rgba(255,51,102,0.1)', border: '1px solid rgba(255,51,102,0.2)' }}
                  >
                    ★ FEATURED
                  </span>
                )}
              </div>
              <h2 className="font-['JetBrains_Mono'] text-xl font-bold text-[#E0E0FF] mb-1">
                {selected.title}
              </h2>
              <p className="font-['JetBrains_Mono'] text-sm text-[#B980F0] mb-3">{selected.subtitle}</p>
              <p className="text-sm text-[#E0E0FF] leading-relaxed opacity-90 mb-4">{selected.description}</p>

              {/* Features — minimal delay */}
              <h3 className="font-['JetBrains_Mono'] text-xs text-[#8080A0] mb-2 tracking-widest uppercase">
                FEATURES
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {selected.features.map((feature) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-sm text-[#E0E0FF]"
                  >
                    <span className="text-[#00F0FF] text-[10px]">▸</span>
                    {feature}
                  </motion.div>
                ))}
              </div>

              {/* Tech Stack — clean, no boxShadow */}
              <h3 className="font-['JetBrains_Mono'] text-xs text-[#8080A0] mb-2 tracking-widest uppercase">
                TECH STACK
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-['JetBrains_Mono'] text-[#00F0FF]"
                    style={{
                      background: 'rgba(0,240,255,0.06)',
                      border: '1px solid rgba(0,240,255,0.15)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons — clean borders only, no boxShadow, no hover scale */}
              <div className="flex gap-3">
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs transition-colors duration-300 hover:bg-[rgba(0,240,255,0.15)]"
                  style={{
                    background: 'rgba(0,240,255,0.1)',
                    border: '1px solid rgba(0,240,255,0.3)',
                    color: '#00F0FF',
                  }}
                >
                  ◈ LIVE DEMO
                </a>
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-['JetBrains_Mono'] text-xs transition-colors duration-300 hover:bg-[rgba(185,128,240,0.15)]"
                  style={{
                    background: 'rgba(185,128,240,0.1)',
                    border: '1px solid rgba(185,128,240,0.3)',
                    color: '#B980F0',
                  }}
                >
                  ⬡ GITHUB
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
