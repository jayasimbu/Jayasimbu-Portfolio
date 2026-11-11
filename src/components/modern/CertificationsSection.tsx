'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '@/data/portfolio-data';

export default function CertificationsSection() {
  const iconPalette = [
    'bg-[#ff6b4a]/10 text-[#ff6b4a] group-hover:bg-[#ff6b4a]/20',
    'bg-[#7bd0ff]/10 text-[#7bd0ff] group-hover:bg-[#7bd0ff]/20',
    'bg-[#56d9d8]/10 text-[#56d9d8] group-hover:bg-[#56d9d8]/20',
  ];

  return (
    <section id="certifications" className="py-20 lg:py-28 relative overflow-hidden">
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
            My <span className="gradient-text-primary">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CERTIFICATIONS.map((cert, index) => {
            const style = iconPalette[index % iconPalette.length];
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card rounded-xl p-6 hover-lift flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${style}`}>
                      <BadgeCheck className="w-6 h-6" />
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[11px] px-2.5 py-1 rounded-full bg-[#352723] text-[#e1bfb8]">
                      {cert.badge}
                    </span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-[17px] text-[#f6ddd8] font-semibold">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[#7bd0ff] mt-1">{cert.issuer}</p>
                  <p className="text-xs sm:text-sm text-[#e1bfb8] mt-3 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {cert.url && (
                  <div className="mt-4 pt-3 border-t border-[#59413c]/30">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] text-[#ff6b4a] hover:text-[#ffb4a3] transition-colors"
                    >
                      <span>View Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
