'use client';

import { motion } from 'framer-motion';
import {
  GraduationCap,
  Layers,
  Brain,
  Database,
  Rocket,
  CheckCircle,
  MapPin,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';
import { PROFILE, HIGHLIGHTS } from '@/data/portfolio-data';

export default function AboutSection() {
  const iconMap: Record<string, LucideIcon> = {
    GraduationCap,
    Layers,
    Brain,
    Database,
    Rocket,
  };

  const iconBgMap = [
    'bg-[#ff6b4a]/10 text-[#ff6b4a]',
    'bg-[#7bd0ff]/10 text-[#7bd0ff]',
    'bg-[#56d9d8]/10 text-[#56d9d8]',
    'bg-[#ffb4a3]/10 text-[#ffb4a3]',
    'bg-[#ff6b4a]/10 text-[#ff6b4a]',
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
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
            About <span className="gradient-text-primary">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Bio Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-base sm:text-lg text-[#e1bfb8] leading-relaxed">
              I&apos;m <strong className="text-[#f6ddd8] font-semibold">Jayasimbu Jayamani</strong>, a Computer Science and Engineering graduate (2026) passionate about full-stack development, artificial intelligence, and modern web technologies.
            </p>
            <p className="text-sm sm:text-base text-[#e1bfb8]/90 leading-relaxed">
              My development experience includes building applications such as <strong className="text-[#f6ddd8]">AI-powered job portals</strong>, <strong className="text-[#f6ddd8]">intelligent invoice processing systems</strong>, and <strong className="text-[#f6ddd8]">personalized fitness platforms</strong>.
            </p>
            <p className="text-sm sm:text-base text-[#e1bfb8]/90 leading-relaxed">
              I work across frontend and backend — building responsive interfaces, REST APIs, database integrations, authentication systems, and AI-powered features.
            </p>

            {/* Quote */}
            <div className="glass-card rounded-xl p-5 border-l-4 border-l-[#ff6b4a] mt-6">
              <p className="text-sm sm:text-base text-[#f6ddd8] italic leading-relaxed">
                &ldquo;I believe in continuous learning, practical implementation, and creating technology that solves meaningful problems.&rdquo;
              </p>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a1c19] border border-[#59413c]/40">
                <MapPin className="w-4 h-4 text-[#ff6b4a]" />
                <span className="text-xs sm:text-sm text-[#e1bfb8]">{PROFILE.location}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2a1c19] border border-[#59413c]/40">
                <Briefcase className="w-4 h-4 text-[#56d9d8]" />
                <span className="text-xs sm:text-sm text-[#e1bfb8]">
                  Open to Full-time, Internships &amp; Freelance
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {HIGHLIGHTS.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || CheckCircle;
              const badgeStyle = iconBgMap[idx % iconBgMap.length];
              return (
                <div
                  key={item.title}
                  className="glass-card rounded-xl p-5 hover-lift flex gap-4 items-start"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${badgeStyle}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Space_Grotesk'] text-[16px] text-[#f6ddd8] font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#e1bfb8] mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
