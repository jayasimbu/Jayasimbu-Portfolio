'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  Sparkles,
  Code2,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { Project } from '@/data/portfolio-data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#170b09]/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#2a1c19] border border-[#59413c]/60 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-[#59413c]/40 flex items-start justify-between bg-[#261815]">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full text-[11px] font-['JetBrains_Mono'] text-[#ff6b4a] bg-[#ff6b4a]/10">
                  {project.category}
                </span>
                <span className="text-xs font-['JetBrains_Mono'] text-[#7bd0ff]">
                  FEATURED PROJECT
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#f6ddd8]">
                {project.title}
              </h3>
              <p className="text-sm font-['JetBrains_Mono'] text-[#ffb4a3] mt-1">
                {project.subtitle} — <em>{project.tagline}</em>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#e1bfb8] hover:text-[#f6ddd8] hover:bg-[#352723] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <div className="text-xs font-['JetBrains_Mono'] text-[#a88a83] uppercase mb-2">
                Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] text-[#f6ddd8] bg-[#352723]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold font-['Space_Grotesk'] text-[#f6ddd8] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#ff6b4a]" />
                Project Architecture &amp; Overview
              </h4>
              <p className="text-sm text-[#e1bfb8] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold font-['Space_Grotesk'] text-[#f6ddd8] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#7bd0ff]" />
                Core Implemented Features
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#261815] border border-[#59413c]/30 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#56d9d8] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#f6ddd8] leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#261815] border-l-4 border-l-[#ff6b4a] space-y-1.5">
              <div className="text-xs font-['JetBrains_Mono'] text-[#ff6b4a] uppercase flex items-center gap-1.5 font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                <span>My Direct Contribution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#e1bfb8] leading-relaxed">
                {project.contribution}
              </p>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="p-5 sm:p-6 border-t border-[#59413c]/40 flex flex-wrap items-center justify-between gap-4 bg-[#261815]">
            <span className="text-xs font-['JetBrains_Mono'] text-[#a88a83]">
              Repository Verified &amp; Publicly Available
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-['JetBrains_Mono'] text-[#e1bfb8] hover:text-[#f6ddd8] transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-['JetBrains_Mono'] font-semibold text-[#661000] bg-[#ff6b4a] hover:opacity-90 transition-opacity cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
