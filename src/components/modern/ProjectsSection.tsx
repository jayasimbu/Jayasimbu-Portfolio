'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PROJECTS, Project } from '@/data/portfolio-data';
import ProjectModal from './ProjectModal';

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({ projects = PROJECTS }: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const glowClasses = ['glow-primary', 'glow-secondary', 'glow-tertiary'];
  const accentTextClasses = ['text-[#ff6b4a]', 'text-[#7bd0ff]', 'text-[#56d9d8]'];
  const linkHoverClasses = ['hover:text-[#ffb4a3]', 'hover:text-[#c4e7ff]', 'hover:text-[#76f6f4]'];

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8]">
            Featured <span className="gradient-text-tertiary">Projects</span>
          </h2>
        </motion.div>

        {/* Projects List */}
        <div className="space-y-10">
          {projects.map((project, index) => {
            const glowClass = glowClasses[index % glowClasses.length];
            const accentText = accentTextClasses[index % accentTextClasses.length];
            const linkHover = linkHoverClasses[index % linkHoverClasses.length];
            const categories = project.category.split('|').map((c) => c.trim());

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={`glass-card rounded-xl overflow-hidden hover-lift ${glowClass}`}
              >
                <div className="grid lg:grid-cols-5 gap-0">
                  {/* Left: Project Info */}
                  <div className="lg:col-span-3 p-7 sm:p-8 space-y-5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {categories.map((cat, cIdx) => {
                        const badgeColors = [
                          'bg-[#ff6b4a]/10 text-[#ff6b4a]',
                          'bg-[#56d9d8]/10 text-[#56d9d8]',
                          'bg-[#7bd0ff]/10 text-[#7bd0ff]',
                        ];
                        return (
                          <span
                            key={cat}
                            className={`font-['JetBrains_Mono'] text-xs px-3 py-1 rounded-full ${badgeColors[cIdx % badgeColors.length]}`}
                          >
                            {cat}
                          </span>
                        );
                      })}
                    </div>

                    <div>
                      <h3 className="font-['Space_Grotesk'] text-2xl sm:text-[28px] font-semibold text-[#f6ddd8]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#e1bfb8] italic mt-1">
                        &ldquo;{project.tagline}&rdquo;
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-[#e1bfb8]/90 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#352723] text-[#e1bfb8] font-['JetBrains_Mono'] text-[11px]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Contribution */}
                    <p className="text-sm text-[#e1bfb8] leading-relaxed">
                      <span className={`${accentText} font-medium`}>My Contribution: </span>
                      {project.contribution}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 ${accentText} ${linkHover} transition-colors font-medium text-sm`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View on GitHub</span>
                      </a>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['JetBrains_Mono'] text-[#f6ddd8] bg-[#352723] border border-[#59413c]/50 hover:border-[#ffb4a3] transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#ffb4a3]" />
                        <span>Explore Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right: Key Features */}
                  <div className="lg:col-span-2 bg-[#261815]/70 p-7 sm:p-8 border-t lg:border-t-0 lg:border-l border-[#59413c]/30">
                    <h4 className="font-['JetBrains_Mono'] text-xs text-[#e1bfb8] uppercase tracking-wider mb-4">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {project.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${accentText}`} />
                          <span className="text-xs sm:text-sm text-[#e1bfb8] leading-relaxed">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
