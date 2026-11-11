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
  Database,
  Loader2,
  ExternalLink,
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
  const [submitting, setSubmitting] = useState(false);
  const [sentStatus, setSentStatus] = useState<{
    type: 'success' | 'gmail';
    text: string;
    gmailUrl?: string;
  } | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    setSubmitting(true);
    setSentStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not save inquiry');
      }

      setSentStatus({
        type: 'success',
        text: 'Message saved to MongoDB! Jayasimbu will review your inquiry soon.',
      });
      setFormData({
        name: '',
        email: '',
        subject: 'Full Stack Web Development',
        message: '',
      });
    } catch {
      const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject} - ${formData.name}`);
      const emailBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const gmailUrl = `${PROFILE.contact.gmailComposeUrl}&su=${emailSubject}&body=${emailBody}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      setSentStatus({
        type: 'gmail',
        text: 'Opened Gmail compose in a new tab so you can send without Outlook.',
        gmailUrl,
      });
    } finally {
      setSubmitting(false);
    }
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
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8]">
            Contact <span className="gradient-text-primary">Me</span>
          </h2>
          <p className="text-sm sm:text-base text-[#e1bfb8] mt-4 max-w-lg mx-auto">
            Interested in working together? Send a message directly to my MongoDB inbox or reach out via Gmail or WhatsApp.
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
            {/* Email (Opens Gmail Web Compose, never Outlook) */}
            <div className="glass-card rounded-xl p-5 hover-lift flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-[#ff6b4a]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#ff6b4a]" />
                </div>
                <div className="overflow-hidden">
                  <p className="font-['JetBrains_Mono'] text-[11px] text-[#e1bfb8] uppercase tracking-wider">
                    Email (Gmail)
                  </p>
                  <a
                    href={PROFILE.contact.gmailComposeUrl}
                    target="_blank"
                    rel="noreferrer"
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
              <div className="flex items-center justify-between">
                <span className="font-['Space_Grotesk'] font-semibold text-base text-[#f6ddd8]">
                  Send an Inquiry
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-['JetBrains_Mono'] text-[#56d9d8] px-2.5 py-1 rounded-full bg-[#56d9d8]/10">
                  <Database className="w-3 h-3" />
                  MongoDB Synced
                </span>
              </div>

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
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#ff6b4a] text-[#661000] rounded-full font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity text-sm cursor-pointer"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{submitting ? 'Saving to MongoDB...' : 'Send Message'}</span>
              </button>

              {sentStatus && (
                <div className="text-xs font-['JetBrains_Mono'] text-center pt-1 text-[#56d9d8] space-y-2">
                  <p>{sentStatus.text}</p>
                  {sentStatus.gmailUrl && (
                    <a
                      href={sentStatus.gmailUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#ff6b4a] underline"
                    >
                      <span>Open Gmail Compose</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
