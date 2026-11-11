'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Printer,
  Copy,
  Check,
  FileText,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import {
  PROFILE,
  PROJECTS,
  SKILL_CATEGORIES,
  EDUCATION,
  EXPERIENCE,
  CERTIFICATIONS,
} from '@/data/portfolio-data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
JAYASIMBU JAYAMANI
Full Stack Developer | AI Application Developer
Email: ${PROFILE.contact.email} | Phone: ${PROFILE.contact.phone}
Location: ${PROFILE.contact.location}
GitHub: ${PROFILE.contact.github} | LinkedIn: ${PROFILE.contact.linkedin}

SUMMARY:
${PROFILE.bio}

TECHNICAL SKILLS:
${SKILL_CATEGORIES.map((c) => `${c.name}: ${c.skills.map((s) => s.name).join(', ')}`).join('\n')}

FEATURED PROJECTS:
${PROJECTS.map(
  (p) => `
* ${p.title} - ${p.subtitle}
  Stack: ${p.techStack.join(', ')}
  Description: ${p.description}
  GitHub: ${p.githubUrl}`
).join('\n')}

EXPERIENCE:
${EXPERIENCE.map((e) => `* ${e.position} at ${e.company} (${e.period})\n  ${e.description} (${e.note || ''})`).join('\n')}

EDUCATION:
${EDUCATION.map((ed) => `* ${ed.degree} - ${ed.institution} (${ed.period}) ${ed.score || ''}`).join('\n')}

CERTIFICATIONS & WORKSHOPS:
${CERTIFICATIONS.map((c) => `* ${c.title} - ${c.issuer} (${c.type})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#170b09]/85 backdrop-blur-xl no-print"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl rounded-2xl bg-[#2a1c19] border border-[#59413c]/60 shadow-2xl overflow-hidden z-10 my-6 max-h-[92vh] flex flex-col"
        >
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 border-b border-[#59413c]/40 flex items-center justify-between bg-[#261815] no-print">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ff6b4a]/15 flex items-center justify-center text-[#ff6b4a]">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-['Space_Grotesk'] font-semibold text-[#f6ddd8]">
                RESUME PREVIEW — JAYASIMBU JAYAMANI
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] text-[#f6ddd8] bg-[#352723] border border-[#59413c] hover:border-[#ff6b4a] transition-all cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#ff6b4a]" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] text-[#f6ddd8] bg-[#352723] border border-[#59413c] hover:border-[#56d9d8] transition-all cursor-pointer"
                title="Copy Resume as Text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#56d9d8]" /> : <Copy className="w-3.5 h-3.5 text-[#56d9d8]" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#e1bfb8] hover:text-[#f6ddd8] hover:bg-[#352723] transition-colors cursor-pointer"
                aria-label="Close resume preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Content */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-[#f6ddd8] bg-[#1d100e] print:bg-white print:text-black">
            <div className="border-b border-[#59413c]/40 pb-6 text-center sm:text-left print:border-black/20">
              <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#f6ddd8] print:text-black">
                JAYASIMBU JAYAMANI
              </h2>
              <div className="text-sm font-semibold font-['JetBrains_Mono'] text-[#ff6b4a] print:text-blue-800 mt-1">
                Full Stack Developer | AI Application Developer
              </div>
              <p className="text-xs text-[#e1bfb8] print:text-gray-700 mt-1">
                Building Modern Web Applications &amp; AI-Powered Solutions
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-['JetBrains_Mono'] text-[#e1bfb8] print:text-gray-700 mt-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#ff6b4a] print:text-black" />
                  {PROFILE.contact.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#56d9d8] print:text-black" />
                  {PROFILE.contact.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#7bd0ff] print:text-black" />
                  {PROFILE.contact.location}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold font-['Space_Grotesk'] text-[#ff6b4a] print:text-blue-900 uppercase tracking-wider border-b border-[#59413c]/30 print:border-black/10 pb-1">
                Professional Summary
              </h3>
              <p className="text-xs sm:text-sm text-[#e1bfb8] print:text-gray-800 leading-relaxed">
                {PROFILE.bio}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold font-['Space_Grotesk'] text-[#ff6b4a] print:text-blue-900 uppercase tracking-wider border-b border-[#59413c]/30 print:border-black/10 pb-1">
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-['JetBrains_Mono']">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.name} className="print:text-gray-900">
                    <strong className="text-[#f6ddd8] print:text-black">{cat.name}: </strong>
                    <span className="text-[#e1bfb8] print:text-gray-700">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold font-['Space_Grotesk'] text-[#ff6b4a] print:text-blue-900 uppercase tracking-wider border-b border-[#59413c]/30 print:border-black/10 pb-1">
                Featured Projects
              </h3>
              <div className="space-y-4">
                {PROJECTS.map((proj) => (
                  <div key={proj.id} className="space-y-1 text-xs">
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="font-bold text-sm text-[#f6ddd8] print:text-black font-['Space_Grotesk']">
                        {proj.title} — <span className="text-xs font-['JetBrains_Mono'] text-[#7bd0ff] print:text-purple-900">{proj.subtitle}</span>
                      </div>
                      <span className="font-['JetBrains_Mono'] text-[11px] text-[#ffb4a3] print:text-blue-800">
                        {proj.techStack.join(' | ')}
                      </span>
                    </div>
                    <p className="text-[#e1bfb8] print:text-gray-800 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="text-[11px] text-[#56d9d8] print:text-green-800 font-['JetBrains_Mono']">
                      <strong>My Contribution: </strong>{proj.contribution}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold font-['Space_Grotesk'] text-[#ff6b4a] print:text-blue-900 uppercase tracking-wider border-b border-[#59413c]/30 print:border-black/10 pb-1">
                Professional Experience
              </h3>
              {EXPERIENCE.map((exp) => (
                <div key={exp.company} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm text-[#f6ddd8] print:text-black font-['Space_Grotesk']">
                      {exp.company} — <span className="font-['JetBrains_Mono'] font-normal text-[#7bd0ff] print:text-blue-800">{exp.position}</span>
                    </strong>
                    <span className="font-['JetBrains_Mono'] text-[#e1bfb8] print:text-gray-700">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[#e1bfb8] print:text-gray-800 leading-relaxed">
                    {exp.description} {exp.note && <em>({exp.note})</em>}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold font-['Space_Grotesk'] text-[#ff6b4a] print:text-blue-900 uppercase tracking-wider border-b border-[#59413c]/30 print:border-black/10 pb-1">
                Education
              </h3>
              <div className="space-y-2 text-xs">
                {EDUCATION.map((edu) => (
                  <div key={edu.degree} className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-[#f6ddd8] print:text-black">{edu.degree}</strong>
                      <div className="text-[#e1bfb8] print:text-gray-700">{edu.institution}</div>
                    </div>
                    <div className="text-right font-['JetBrains_Mono'] text-[#7bd0ff] print:text-blue-800">
                      <span>{edu.period}</span>
                      {edu.score && <span className="ml-2 font-bold text-[#56d9d8] print:text-green-800">({edu.score})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold font-['Space_Grotesk'] text-[#ff6b4a] print:text-blue-900 uppercase tracking-wider border-b border-[#59413c]/30 print:border-black/10 pb-1">
                Certifications &amp; Workshops
              </h3>
              <ul className="space-y-1 text-xs text-[#e1bfb8] print:text-gray-800">
                {CERTIFICATIONS.map((cert) => (
                  <li key={cert.title}>
                    <strong className="text-[#f6ddd8] print:text-black">{cert.title}</strong> — {cert.issuer} ({cert.type})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
