'use client';

import Link from 'next/link';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { PROFILE } from '@/data/portfolio-data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-[#59413c]/30 bg-[#170b09] py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#59413c]/25">
          {/* Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#ff6b4a] flex items-center justify-center font-['Space_Grotesk'] font-bold text-[#661000] text-xs">
                JJ
              </div>
              <span className="font-['Space_Grotesk'] font-semibold text-base text-[#f6ddd8]">
                JAYASIMBU<span className="text-[#ff6b4a]">.DEV</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#e1bfb8]/85 max-w-sm leading-relaxed">
              Full Stack Developer &amp; AI Application Developer building modern web applications, scalable APIs, and AI-powered solutions.
            </p>
            <p className="font-['JetBrains_Mono'] text-xs text-[#a88a83]">
              {PROFILE.location}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-['Space_Grotesk'] text-xs font-semibold text-[#f6ddd8] uppercase tracking-wider">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-['JetBrains_Mono'] text-[#e1bfb8]">
              <a href="#home" className="hover:text-[#ff6b4a] transition-colors">Home</a>
              <a href="#about" className="hover:text-[#ff6b4a] transition-colors">About</a>
              <a href="#skills" className="hover:text-[#ff6b4a] transition-colors">Skills</a>
              <a href="#projects" className="hover:text-[#ff6b4a] transition-colors">Projects</a>
              <a href="#services" className="hover:text-[#ff6b4a] transition-colors">Services</a>
              <a href="#experience" className="hover:text-[#ff6b4a] transition-colors">Experience</a>
              <a href="#education" className="hover:text-[#ff6b4a] transition-colors">Education</a>
              <a href="#contact" className="hover:text-[#ff6b4a] transition-colors">Contact</a>
            </div>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-['Space_Grotesk'] text-xs font-semibold text-[#f6ddd8] uppercase tracking-wider">
              Connect
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={PROFILE.contact.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#2a1c19] border border-[#59413c]/40 hover:border-[#ff6b4a] text-[#e1bfb8] hover:text-[#ff6b4a] transition-all"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#2a1c19] border border-[#59413c]/40 hover:border-[#7bd0ff] text-[#e1bfb8] hover:text-[#7bd0ff] transition-all"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.contact.gmailComposeUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#2a1c19] border border-[#59413c]/40 hover:border-[#ff6b4a] text-[#e1bfb8] hover:text-[#ff6b4a] transition-all"
                title="Email via Gmail"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-[#2a1c19] border border-[#56d9d8]/30 hover:border-[#56d9d8] text-[#56d9d8] transition-all"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] text-[#ffb4a3] bg-[#2a1c19] border border-[#59413c]/40 hover:border-[#ff6b4a] transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a88a83]">
          <span>© 2026 Jayasimbu Jayamani. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="font-['JetBrains_Mono'] text-[11px] text-[#a88a83] hover:text-[#ff6b4a] transition-colors"
            >
              DB Admin
            </Link>
            <span>
              Crafted with <span className="text-[#ff6b4a] font-medium">Next.js</span>,{' '}
              <span className="text-[#7bd0ff] font-medium">MongoDB</span> &amp;{' '}
              <span className="text-[#56d9d8] font-medium">TypeScript</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
