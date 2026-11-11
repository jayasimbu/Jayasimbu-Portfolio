'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  FileText,
  Monitor,
  ChevronRight,
  Mail,
} from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  isOsMode: boolean;
  onToggleOsMode: () => void;
}

export default function Navbar({ onOpenResume, isOsMode, onToggleOsMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'AI Lab', href: '#ai-playground' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1d100e]/85 backdrop-blur-xl border-b border-[#59413c]/40 shadow-lg py-3'
          : 'bg-[#1d100e]/60 backdrop-blur-md border-b border-[#59413c]/20 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg bg-[#ff6b4a] flex items-center justify-center font-['Space_Grotesk'] font-bold text-[#661000] text-sm shadow-sm group-hover:scale-105 transition-transform">
              JJ
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#56d9d8] animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#56d9d8]" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] font-semibold text-sm sm:text-base tracking-wide text-[#f6ddd8]">
                JAYASIMBU<span className="text-[#ff6b4a]">.DEV</span>
              </span>
              <span className="text-[10px] font-['JetBrains_Mono'] text-[#a88a83] hidden sm:block">
                Full Stack &amp; AI Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] text-[#e1bfb8] hover:text-[#f6ddd8] hover:bg-[#352723]/70 transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={onToggleOsMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] text-[#7bd0ff] border border-[#7bd0ff]/35 hover:border-[#7bd0ff] hover:bg-[#7bd0ff]/10 transition-all cursor-pointer"
              title="Toggle Cyberpunk Desktop OS Mode"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{isOsMode ? 'Web Mode' : 'OS Mode'}</span>
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] font-medium text-[#f6ddd8] bg-[#2a1c19] border border-[#59413c] hover:border-[#ffb4a3] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#ffb4a3]" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] font-semibold text-[#661000] bg-[#ff6b4a] hover:opacity-90 transition-all cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hire Me</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onToggleOsMode}
              className="p-2 rounded-lg text-[#7bd0ff] border border-[#7bd0ff]/30 hover:bg-[#7bd0ff]/10 text-xs sm:hidden cursor-pointer"
              title="Toggle OS Mode"
            >
              <Monitor className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#e1bfb8] hover:text-[#f6ddd8] hover:bg-[#352723] transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#ff6b4a]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-[#59413c]/40 bg-[#1d100e]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              <div className="pb-3 border-b border-[#59413c]/30 flex items-center justify-between">
                <span className="text-xs font-['JetBrains_Mono'] text-[#a88a83]">
                  NAVIGATION
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-['JetBrains_Mono'] text-[#56d9d8] bg-[#56d9d8]/10 border border-[#56d9d8]/25">
                  Open for Roles
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-['JetBrains_Mono'] text-[#f6ddd8] bg-[#2a1c19]/80 hover:bg-[#352723] hover:text-[#ff6b4a] border border-[#59413c]/30 transition-all"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#a88a83]" />
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-[#59413c]/30 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-['JetBrains_Mono'] text-[#f6ddd8] bg-[#2a1c19] border border-[#59413c] cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#ffb4a3]" />
                  <span>View Resume</span>
                </button>

                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-['JetBrains_Mono'] font-bold text-[#661000] bg-[#ff6b4a] cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Hire Me Now</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
