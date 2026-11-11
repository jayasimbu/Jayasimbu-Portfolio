'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Rocket,
  Mail,
  FileText,
  MessageSquare,
  MapPin,
  CheckCircle2,
  BadgeCheck,
  Sparkles,
  Bot,
  Boxes,
  GraduationCap,
  Award,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { PROFILE, STATS } from '@/data/portfolio-data';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export default function HeroSection({ onOpenResume }: HeroSectionProps) {
  const statIcons = [Bot, Boxes, GraduationCap, Award];
  const statColors = ['text-[#ff6b4a]', 'text-[#7bd0ff]', 'text-[#56d9d8]', 'text-[#ffb4a3]'];

  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#ff6b4a]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[420px] h-[420px] bg-[#7bd0ff]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#56d9d8]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Intro & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a1c19] border border-[#59413c]/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#56d9d8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#56d9d8]" />
              </span>
              <span className="font-['JetBrains_Mono'] text-[11px] sm:text-xs text-[#56d9d8] uppercase tracking-wider">
                Open to Entry-Level &amp; Full Stack Roles · 2026 Batch
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <p className="text-base sm:text-lg text-[#e1bfb8] font-['Inter']">Hello, I&apos;m</p>
              <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-bold font-['Space_Grotesk'] tracking-[-0.02em] text-[#f6ddd8] leading-[1.1]">
                Jayasimbu <br className="hidden sm:inline" />
                <span className="gradient-text-primary">Jayamani</span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold font-['Space_Grotesk'] text-[#7bd0ff] pt-1">
                Full Stack Developer <span className="text-[#a88a83]">|</span> AI Application Developer
              </p>
              <p className="text-sm sm:text-base font-['JetBrains_Mono'] text-[#ffb4a3]">
                {PROFILE.headline}
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base text-[#e1bfb8]/90 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {PROFILE.bio}
            </p>

            {/* Location & Availability */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-['JetBrains_Mono'] text-[#e1bfb8]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a1c19] border border-[#59413c]/40">
                <MapPin className="w-3.5 h-3.5 text-[#ff6b4a]" />
                <span>{PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a1c19] border border-[#59413c]/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#56d9d8]" />
                <span>Open to Full-time, Internships &amp; Freelance</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[#ff6b4a] text-[#661000] hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-[#ff6b4a]/15 cursor-pointer"
              >
                <Rocket className="w-4 h-4" />
                <span>View Projects</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-[#59413c] text-[#f6ddd8] hover:bg-[#352723] transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#ffb4a3]" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-[#2a1c19] border border-[#7bd0ff]/40 text-[#7bd0ff] hover:bg-[#7bd0ff]/10 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>

              <a
                href={PROFILE.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium bg-[#00acab] text-[#003939] hover:opacity-90 transition-opacity cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <span className="text-xs font-['JetBrains_Mono'] text-[#a88a83]">PROFILES:</span>
              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#352723] flex items-center justify-center text-[#e1bfb8] hover:text-[#ff6b4a] hover:bg-[#41312e] transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#352723] flex items-center justify-center text-[#e1bfb8] hover:text-[#7bd0ff] hover:bg-[#41312e] transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.contact.hackerrank}
                target="_blank"
                rel="noreferrer"
                className="px-3 h-10 rounded-full bg-[#352723] flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] text-[#e1bfb8] hover:text-[#56d9d8] hover:bg-[#41312e] transition-all"
                title="HackerRank"
              >
                <span className="font-bold text-[#56d9d8]">H</span>
                <span>HackerRank</span>
              </a>
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="w-10 h-10 rounded-full bg-[#352723] flex items-center justify-center text-[#e1bfb8] hover:text-[#ff6b4a] hover:bg-[#41312e] transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Portrait + FastAPI Code Snippet Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center gap-7"
          >
            {/* Circular Profile Image with Glow */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#ff6b4a]/25 via-[#7bd0ff]/15 to-[#56d9d8]/15 blur-2xl animate-pulse-glow" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden profile-glow border-4 border-[#352723] bg-[#2a1c19]">
                <Image
                  src={PROFILE.profileImage}
                  alt="Jayasimbu Jayamani — Full Stack & AI Developer"
                  fill
                  sizes="(max-width: 768px) 224px, 256px"
                  priority
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-card rounded-full px-4 py-1.5 flex items-center gap-1.5 whitespace-nowrap shadow-lg">
                <BadgeCheck className="w-4 h-4 text-[#56d9d8]" />
                <span className="font-['JetBrains_Mono'] text-[11px] font-medium text-[#56d9d8]">
                  2026 Graduate
                </span>
              </div>
            </div>

            {/* FastAPI Code Snippet Card */}
            <div className="glass-card rounded-xl p-4 w-full max-w-md glow-primary">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/70" />
                  <div className="w-3 h-3 rounded-full bg-[#ffb4a3]/50" />
                  <div className="w-3 h-3 rounded-full bg-[#56d9d8]/50" />
                  <span className="ml-2 font-['JetBrains_Mono'] text-[11px] text-[#a88a83]">
                    main.py — FastAPI
                  </span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-[#ff6b4a]" />
              </div>

              <div className="font-['JetBrains_Mono'] text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-[#f6ddd8] whitespace-pre" aria-label="FastAPI LINKUP API example">
                  <span className="text-[#7bd0ff]">from</span>{' '}
                  <span className="text-[#56d9d8]">fastapi</span>{' '}
                  <span className="text-[#7bd0ff]">import</span> FastAPI, UploadFile{'\n'}
                  <span className="text-[#7bd0ff]">from</span>{' '}
                  <span className="text-[#56d9d8]">ai_engine</span>{' '}
                  <span className="text-[#7bd0ff]">import</span> analyze_resume{'\n\n'}
                  app = FastAPI(<span className="text-[#ffb4a3]">title</span>=
                  <span className="text-[#ff6b4a]">&quot;LINKUP API&quot;</span>){'\n\n'}
                  <span className="text-[#a88a83]">@app.post</span>(
                  <span className="text-[#ff6b4a]">&quot;/api/resume/analyze&quot;</span>){'\n'}
                  <span className="text-[#7bd0ff]">async def</span>{' '}
                  <span className="text-[#56d9d8]">resume_analysis</span>(file: UploadFile):{'\n'}
                  {'    '}result = <span className="text-[#7bd0ff]">await</span> analyze_resume(file){'\n'}
                  {'    '}<span className="text-[#7bd0ff]">return</span> {'{\n'}
                  {'        '}<span className="text-[#ff6b4a]">&quot;ats_score&quot;</span>: result.score,{'\n'}
                  {'        '}<span className="text-[#ff6b4a]">&quot;skills&quot;</span>: result.matched{'\n'}
                  {'    }'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {STATS.map((stat, idx) => {
            const IconComp = statIcons[idx] || Sparkles;
            const colorClass = statColors[idx] || 'text-[#ff6b4a]';
            return (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-6 text-center hover-lift"
              >
                <IconComp className={`w-7 h-7 mx-auto mb-2 ${colorClass}`} />
                <p className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8]">
                  {stat.value}
                </p>
                <p className="font-['JetBrains_Mono'] text-xs text-[#e1bfb8] mt-1">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
