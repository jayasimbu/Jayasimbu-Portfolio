'use client';

import { motion } from 'framer-motion';
import {
  Globe,
  Sparkles,
  Server,
  Wrench,
  Brain,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { SERVICES } from '@/data/portfolio-data';

export default function ServicesSection() {
  const iconMap: Record<string, LucideIcon> = {
    Globe,
    Sparkles,
    Server,
    Wrench,
    Brain,
  };

  const iconPalette = [
    'bg-[#ff6b4a]/10 text-[#ff6b4a] group-hover:bg-[#ff6b4a]/20',
    'bg-[#7bd0ff]/10 text-[#7bd0ff] group-hover:bg-[#7bd0ff]/20',
    'bg-[#56d9d8]/10 text-[#56d9d8] group-hover:bg-[#56d9d8]/20',
    'bg-[#ffb4a3]/10 text-[#ffb4a3] group-hover:bg-[#ffb4a3]/20',
    'bg-[#ff6b4a]/10 text-[#ff6b4a] group-hover:bg-[#ff6b4a]/20',
  ];

  return (
    <section id="services" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-['JetBrains_Mono'] text-xs text-[#ff6b4a] uppercase tracking-widest">
            04 · What I Offer
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8] mt-3">
            My <span className="gradient-text-primary">Services</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Sparkles;
            const style = iconPalette[index % iconPalette.length];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card rounded-xl p-7 hover-lift flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${style}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-['JetBrains_Mono'] text-xs text-[#a88a83]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-[#f6ddd8] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#e1bfb8]/90 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="text-xs sm:text-sm text-[#e1bfb8] flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-[#a88a83] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#59413c]/30 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-['JetBrains_Mono'] bg-[#352723] text-[#e1bfb8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-['JetBrains_Mono'] text-[#ff6b4a] hover:text-[#ffb4a3] transition-colors shrink-0"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
