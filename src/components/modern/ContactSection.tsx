'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  MessageSquare,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { PROFILE } from '@/data/portfolio-data';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export default function ContactSection({ onOpenResume }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full Stack Web Development',
    message: '',
  });
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - ${formData.name}`);
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${PROFILE.contact.email}?subject=${emailSubject}&body=${emailBody}`;
    setSentStatus('Opening your email client! You can also reach me directly on WhatsApp.');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
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
            09 · Get In Touch
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8] mt-3">
            Contact <span className="gradient-text-primary">Me</span>
          </h2>
          <p className="text-sm sm:text-base text-[#e1bfb8] mt-4 max-w-lg mx-auto">
            Interested in working together? Fill out the form or reach out through any of the channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-5"
          >
            {/* Email */}
            <div className="glass-card rounded-xl p-5 hover-lift flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-[#ff6b4a]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#ff6b4a]" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-['JetBrains_Mono'] text-[11px] text-[#e1bfb8] uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href={`mailto:${PROFILE.contact.email}`}
                    className="text-sm sm:text-base text-[#f6ddd8] hover:text-[#ff6b4a] transition-colors truncate block"
                  >
                    {PROFILE.contact.email}
                  </a>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-lg bg-[#352723] hover:bg-[#41312e] text-[#ffb4a3] transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-[#56d9d8]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone / WhatsApp */}
            <div className="glass-card rounded-xl p-5 hover-lift flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#56d9d8]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#56d9d8]" />
                </div>
                <div>
                  <p className="font-['JetBrains_Mono'] text-[11px] text-[#e1bfb8] uppercase tracking-wider">
                    Phone / WhatsApp
                  </p>
                  <a
                    href={PROFILE.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm sm:text-base text-[#f6ddd8] hover:text-[#56d9d8] transition-colors"
                  >
                    {PROFILE.contact.phone}
                  </a>
                </div>
              </div>
              <a
                href={PROFILE.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-full text-xs font-['JetBrains_Mono'] font-semibold bg-[#00acab] text-[#003939] hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </a>
            </div>

            {/* Location */}
            <div className="glass-card rounded-xl p-5 hover-lift flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#7bd0ff]/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#7bd0ff]" />
              </div>
              <div>
                <p className="font-['JetBrains_Mono'] text-[11px] text-[#e1bfb8] uppercase tracking-wider">
                  Location
                </p>
                <p className="text-sm sm:text-base text-[#f6ddd8]">{PROFILE.contact.location}</p>
              </div>
            </div>

            {/* Social Links & Resume CTA */}
            <div className="glass-card rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={PROFILE.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#352723] flex items-center justify-center text-[#e1bfb8] hover:text-[#ff6b4a] hover:bg-[#41312e] transition-all"
                  title="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={PROFILE.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-[#352723] flex items-center justify-center text-[#e1bfb8] hover:text-[#7bd0ff] hover:bg-[#41312e] transition-all"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={PROFILE.contact.hackerrank}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 h-11 rounded-xl bg-[#352723] flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] text-[#e1bfb8] hover:text-[#56d9d8] hover:bg-[#41312e] transition-all"
                  title="HackerRank"
                >
                  <span className="font-bold text-[#56d9d8]">H</span>
                  <span>HackerRank</span>
                </a>
                <button
                  onClick={onOpenResume}
                  className="ml-auto px-4 h-11 rounded-full text-xs font-['JetBrains_Mono'] font-medium border border-[#59413c] text-[#f6ddd8] hover:bg-[#352723] transition-colors cursor-pointer"
                >
                  View Resume
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-7 sm:p-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="font-['JetBrains_Mono'] text-xs text-[#e1bfb8] uppercase tracking-wider block mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Sharma"
                  className="w-full px-4 py-3 bg-[#261815] border border-[#59413c]/40 rounded-lg text-[#f6ddd8] text-sm placeholder:text-[#a88a83] focus:outline-none focus:border-[#ff6b4a] focus:ring-1 focus:ring-[#ff6b4a] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-['JetBrains_Mono'] text-xs text-[#e1bfb8] uppercase tracking-wider block mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 bg-[#261815] border border-[#59413c]/40 rounded-lg text-[#f6ddd8] text-sm placeholder:text-[#a88a83] focus:outline-none focus:border-[#ff6b4a] focus:ring-1 focus:ring-[#ff6b4a] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="font-['JetBrains_Mono'] text-xs text-[#e1bfb8] uppercase tracking-wider block mb-2"
                >
                  Subject / Service Needed
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-[#261815] border border-[#59413c]/40 rounded-lg text-[#f6ddd8] text-sm focus:outline-none focus:border-[#ff6b4a] focus:ring-1 focus:ring-[#ff6b4a] transition-colors"
                >
                  <option value="Full Stack Web Development">Full Stack Web Development</option>
                  <option value="Entry-Level Job / Internship Opportunity">Entry-Level Job / Internship Opportunity</option>
                  <option value="Landing Page Development">Landing Page Development</option>
                  <option value="REST API Development">REST API Development</option>
                  <option value="AI Integration">AI Integration</option>
                  <option value="Website Maintenance & Bug Fixing">Website Maintenance &amp; Bug Fixing</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-['JetBrains_Mono'] text-xs text-[#e1bfb8] uppercase tracking-wider block mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, or open role..."
                  className="w-full px-4 py-3 bg-[#261815] border border-[#59413c]/40 rounded-lg text-[#f6ddd8] text-sm placeholder:text-[#a88a83] focus:outline-none focus:border-[#ff6b4a] focus:ring-1 focus:ring-[#ff6b4a] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#ff6b4a] text-[#661000] rounded-full font-semibold hover:opacity-90 transition-opacity text-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>

              {sentStatus && (
                <p className="text-xs font-['JetBrains_Mono'] text-[#56d9d8] text-center pt-1">
                  {sentStatus}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
