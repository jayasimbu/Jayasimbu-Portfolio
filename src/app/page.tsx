'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MessageSquare,
  Monitor,
  ArrowUp,
} from 'lucide-react';
import {
  PROFILE,
  PROJECTS,
  SKILL_CATEGORIES,
  EXPERIENCE,
  Project,
  SkillCategory,
  ExperienceItem,
} from '@/data/portfolio-data';
import Navbar from '@/components/modern/Navbar';
import HeroSection from '@/components/modern/HeroSection';
import AboutSection from '@/components/modern/AboutSection';
import SkillsSection from '@/components/modern/SkillsSection';
import ProjectsSection from '@/components/modern/ProjectsSection';
import AIPlaygroundSection from '@/components/modern/AIPlaygroundSection';
import ServicesSection from '@/components/modern/ServicesSection';
import ExperienceSection from '@/components/modern/ExperienceSection';
import EducationSection from '@/components/modern/EducationSection';
import CertificationsSection from '@/components/modern/CertificationsSection';
import PhilosophySection from '@/components/modern/PhilosophySection';
import ContactSection from '@/components/modern/ContactSection';
import Footer from '@/components/modern/Footer';
import ResumeModal from '@/components/modern/ResumeModal';
import DesktopOS from '@/components/desktop/DesktopOS';

export default function Home() {
  const [isOsMode, setIsOsMode] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(SKILL_CATEGORIES);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(EXPERIENCE);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hydrate dynamic portfolio collections from MongoDB when API is available
  useEffect(() => {
    let active = true;
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data?.ok) return;
        if (Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
        if (Array.isArray(data.skillCategories) && data.skillCategories.length > 0) {
          setSkillCategories(data.skillCategories);
        }
        if (Array.isArray(data.experiences) && data.experiences.length > 0) {
          setExperiences(data.experiences);
        }
      })
      .catch(() => {
        // Fallback silently to static portfolio-data.ts when static-hosted
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isOsMode) {
      document.body.classList.add('os-mode-active');
    } else {
      document.body.classList.remove('os-mode-active');
    }
  }, [isOsMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#1d100e] text-[#f6ddd8] relative selection:bg-[#ff6b4a]/25 selection:text-[#f6ddd8]">
      <AnimatePresence mode="wait">
        {isOsMode ? (
          <motion.div
            key="os"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50"
          >
            <DesktopOS onExitOS={() => setIsOsMode(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="web"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="fixed inset-0 grid-bg opacity-40 pointer-events-none" />

            <Navbar
              onOpenResume={() => setIsResumeOpen(true)}
              isOsMode={isOsMode}
              onToggleOsMode={() => setIsOsMode(true)}
            />

            <main className="relative z-10">
              <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

              <div className="section-divider max-w-7xl mx-auto" />
              <AboutSection />

              <div className="section-divider max-w-7xl mx-auto" />
              <SkillsSection skillCategories={skillCategories} />

              <div className="section-divider max-w-7xl mx-auto" />
              <ProjectsSection projects={projects} />

              <div className="section-divider max-w-7xl mx-auto" />
              <AIPlaygroundSection />

              <div className="section-divider max-w-7xl mx-auto" />
              <ServicesSection />

              <div className="section-divider max-w-7xl mx-auto" />
              <ExperienceSection experiences={experiences} />

              <div className="section-divider max-w-7xl mx-auto" />
              <EducationSection />

              <div className="section-divider max-w-7xl mx-auto" />
              <CertificationsSection />

              <div className="section-divider max-w-7xl mx-auto" />
              <PhilosophySection />

              <div className="section-divider max-w-7xl mx-auto" />
              <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
            </main>

            <Footer />

            {/* Floating Quick Action Bar */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
              <a
                href={PROFILE.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#00acab] text-[#003939] font-['JetBrains_Mono'] font-bold text-xs shadow-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>

              <button
                onClick={() => setIsOsMode(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#2a1c19]/90 border border-[#7bd0ff]/40 text-[#7bd0ff] font-['JetBrains_Mono'] text-xs backdrop-blur-md shadow-lg hover:border-[#7bd0ff] hover:bg-[#352723] hover:scale-105 transition-all cursor-pointer"
                title="Switch to Cyberpunk OS Desktop"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">OS Mode</span>
              </button>

              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  className="p-3 rounded-full bg-[#2a1c19]/90 border border-[#ff6b4a]/40 text-[#ff6b4a] backdrop-blur-md shadow-lg hover:bg-[#ff6b4a] hover:text-[#661000] transition-all cursor-pointer"
                  title="Scroll to Top"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              )}
            </div>

            <ResumeModal
              isOpen={isResumeOpen}
              onClose={() => setIsResumeOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
