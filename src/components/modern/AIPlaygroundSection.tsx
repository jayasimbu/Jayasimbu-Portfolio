'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export default function AIPlaygroundSection() {
  const [activeTab, setActiveTab] = useState<'linkup' | 'vlm' | 'fitness'>('linkup');

  const [resumeText, setResumeText] = useState(
    'React.js, Python, FastAPI, MongoDB, Tailwind CSS, Ollama local LLMs, Git, REST APIs, Supabase'
  );
  const [jobText, setJobText] = useState(
    'Looking for Full Stack Developer proficient in React.js, Python, FastAPI, Docker, and AI workflow integration with database design.'
  );
  const [atsScore, setAtsScore] = useState(88);
  const [scanningAts, setScanningAts] = useState(false);

  const handleRunAts = () => {
    setScanningAts(true);
    setTimeout(() => {
      setAtsScore(94);
      setScanningAts(false);
    }, 700);
  };

  const [vlmAnswer, setVlmAnswer] = useState<string>(
    'The total tax is VAT (18%) amounting to $216.00, calculated on subtotal $1,200.00.'
  );
  const [vlmLoading, setVlmLoading] = useState(false);

  const handleAskVlm = (query: string) => {
    setVlmLoading(true);
    setTimeout(() => {
      if (query.includes('tax')) {
        setVlmAnswer('The total tax is VAT (18%) amounting to $216.00, calculated on subtotal $1,200.00.');
      } else if (query.includes('vendor')) {
        setVlmAnswer('The issuing vendor is CloudScale Tech Solutions Ltd.');
      } else {
        setVlmAnswer('The line item is FastAPI API Cloud Cluster (Quantity: 1) at unit price $1,200.00.');
      }
      setVlmLoading(false);
    }, 500);
  };

  const [fitGoal, setFitGoal] = useState('Hypertrophy (Muscle Gain)');
  const [fitFreq, setFitFreq] = useState('4 Days (Upper / Lower Split)');
  const [fitOutput, setFitOutput] = useState(
    'Day 1: Incline DB Press (4x8-10) · Barbell Bent-Over Row (4x8) · Lateral Raises (3x15) · Triceps Pushdown (3x12). Progressive overload target: +2.5kg on primary compounds.'
  );
  const [fitGenerating, setFitGenerating] = useState(false);

  const handleGenerateFitness = () => {
    setFitGenerating(true);
    setTimeout(() => {
      setFitOutput(
        `Tailored routine for ${fitGoal} (${fitFreq}): Primary emphasis on high mechanical tension and RPE 8-9 targets. Rest 90-120s between sets. Structured with a 48-hour recovery window and 2.0g protein/kg target.`
      );
      setFitGenerating(false);
    }, 600);
  };

  return (
    <section id="ai-playground" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[#7bd0ff] uppercase tracking-widest mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive AI Lab</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-[#f6ddd8]">
            Test-Drive My <span className="gradient-text-primary">AI Capabilities</span>
          </h2>
          <p className="text-sm sm:text-base text-[#e1bfb8] mt-3">
            Experience interactive simulations of the AI engines behind LINKUP, VLM LLaVA, and MyFitness Hub.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab('linkup')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'linkup'
                ? 'bg-[#2a1c19] border-[#ff6b4a] glow-primary text-[#f6ddd8]'
                : 'bg-[#261815] border-[#59413c]/40 text-[#e1bfb8] hover:border-[#ffb4a3]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-['JetBrains_Mono'] text-[#ff6b4a] font-semibold">SIMULATION 01</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ff6b4a]/15 text-[#ff6b4a]">Ollama</span>
            </div>
            <div className="font-['Space_Grotesk'] font-semibold text-sm text-[#f6ddd8]">LINKUP ATS Scanner</div>
            <div className="text-xs text-[#a88a83] mt-0.5">Resume &amp; Job Description Matcher</div>
          </button>

          <button
            onClick={() => setActiveTab('vlm')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'vlm'
                ? 'bg-[#2a1c19] border-[#7bd0ff] glow-secondary text-[#f6ddd8]'
                : 'bg-[#261815] border-[#59413c]/40 text-[#e1bfb8] hover:border-[#7bd0ff]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-['JetBrains_Mono'] text-[#7bd0ff] font-semibold">SIMULATION 02</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7bd0ff]/15 text-[#7bd0ff]">LLaVA VLM</span>
            </div>
            <div className="font-['Space_Grotesk'] font-semibold text-sm text-[#f6ddd8]">VLM Invoice Scanner</div>
            <div className="text-xs text-[#a88a83] mt-0.5">EasyOCR + Multimodal Q&amp;A</div>
          </button>

          <button
            onClick={() => setActiveTab('fitness')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'fitness'
                ? 'bg-[#2a1c19] border-[#56d9d8] glow-tertiary text-[#f6ddd8]'
                : 'bg-[#261815] border-[#59413c]/40 text-[#e1bfb8] hover:border-[#56d9d8]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-['JetBrains_Mono'] text-[#56d9d8] font-semibold">SIMULATION 03</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#56d9d8]/15 text-[#56d9d8]">Gemini AI</span>
            </div>
            <div className="font-['Space_Grotesk'] font-semibold text-sm text-[#f6ddd8]">MyFitness Routine Generator</div>
            <div className="text-xs text-[#a88a83] mt-0.5">Dynamic Goal-Based Workout Plans</div>
          </button>
        </div>

        {/* Simulation Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'linkup' && (
            <motion.div
              key="linkup"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl glass-card glow-primary max-w-4xl mx-auto space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#59413c]/40">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold font-['Space_Grotesk'] text-[#f6ddd8]">
                    LINKUP: AI Resume Analysis &amp; ATS Match
                  </h3>
                  <p className="text-xs font-['JetBrains_Mono'] text-[#e1bfb8] mt-0.5">
                    Locally hosted Ollama model evaluates candidate skills and identifies gaps.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] text-[#ff6b4a] bg-[#ff6b4a]/10 self-start sm:self-auto">
                  Local Ollama LLM
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-['JetBrains_Mono'] text-[#e1bfb8] mb-1.5">
                    Candidate Resume Skills &amp; Profile
                  </label>
                  <textarea
                    rows={4}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#261815] border border-[#59413c]/40 text-xs text-[#f6ddd8] font-['JetBrains_Mono'] focus:outline-none focus:border-[#ff6b4a] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-['JetBrains_Mono'] text-[#e1bfb8] mb-1.5">
                    Job Description (Requirements)
                  </label>
                  <textarea
                    rows={4}
                    value={jobText}
                    onChange={(e) => setJobText(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#261815] border border-[#59413c]/40 text-xs text-[#f6ddd8] font-['JetBrains_Mono'] focus:outline-none focus:border-[#ff6b4a] resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleRunAts}
                  disabled={scanningAts}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-['JetBrains_Mono'] font-semibold text-[#661000] bg-[#ff6b4a] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>{scanningAts ? 'Calculating ATS Embeddings...' : 'Run Ollama ATS Analysis'}</span>
                </button>
                <span className="text-xs font-['JetBrains_Mono'] text-[#56d9d8]">
                  {scanningAts ? 'Analyzing...' : 'Ready'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#261815] border border-[#59413c]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-['JetBrains_Mono'] text-[#e1bfb8]">
                    SEMANTIC MATCH CONFIDENCE
                  </span>
                  <span className="text-2xl font-bold font-['Space_Grotesk'] text-[#56d9d8]">
                    {atsScore}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#352723] overflow-hidden">
                  <div
                    className="h-full bg-[#ff6b4a] transition-all duration-700"
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-['JetBrains_Mono'] pt-2">
                  <div className="p-3 rounded-lg bg-[#56d9d8]/10 text-[#56d9d8]">
                    <strong>Matched:</strong> React.js, Python, FastAPI, MongoDB, Supabase, AI Workflows
                  </div>
                  <div className="p-3 rounded-lg bg-[#ff6b4a]/10 text-[#ffb4a3]">
                    <strong>Skill Gap:</strong> Docker containerization &amp; orchestration
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'vlm' && (
            <motion.div
              key="vlm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl glass-card glow-secondary max-w-4xl mx-auto space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#59413c]/40">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold font-['Space_Grotesk'] text-[#f6ddd8]">
                    VLM LLaVA: Visual Document Understanding
                  </h3>
                  <p className="text-xs font-['JetBrains_Mono'] text-[#e1bfb8] mt-0.5">
                    Extract structured entities and converse with invoices using EasyOCR + Vision-Language models.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] text-[#7bd0ff] bg-[#7bd0ff]/10 self-start sm:self-auto">
                  LLaVA + EasyOCR
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="p-5 rounded-xl bg-[#261815] border border-[#59413c]/40 space-y-2.5 font-['JetBrains_Mono'] text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#59413c]/30 text-[#a88a83]">
                    <span>INVOICE #INV-2026-88</span>
                    <span className="text-[#56d9d8] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Parsed
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a88a83]">Vendor:</span>
                    <span className="text-[#f6ddd8] font-semibold">CloudScale Tech Solutions Ltd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a88a83]">Date:</span>
                    <span className="text-[#f6ddd8]">2026-04-15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a88a83]">Line Item:</span>
                    <span className="text-[#f6ddd8]">FastAPI Cloud Cluster (x1)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a88a83]">Subtotal:</span>
                    <span className="text-[#f6ddd8]">$1,200.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#a88a83]">Tax (VAT 18%):</span>
                    <span className="text-[#ffb4a3]">$216.00</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#59413c]/30 font-bold">
                    <span className="text-[#7bd0ff]">Total Due:</span>
                    <span className="text-[#56d9d8] text-sm">$1,416.00</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#261815] border border-[#59413c]/40 space-y-4">
                  <div className="text-xs font-['JetBrains_Mono'] text-[#e1bfb8]">
                    Click a query to ask the Vision-Language Model:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleAskVlm('What is the total tax amount?')}
                      className="px-3 py-1.5 rounded-full bg-[#352723] text-xs font-['JetBrains_Mono'] text-[#7bd0ff] hover:bg-[#41312e] transition-colors cursor-pointer"
                    >
                      &quot;What is the total tax?&quot;
                    </button>
                    <button
                      onClick={() => handleAskVlm('Who is the vendor?')}
                      className="px-3 py-1.5 rounded-full bg-[#352723] text-xs font-['JetBrains_Mono'] text-[#7bd0ff] hover:bg-[#41312e] transition-colors cursor-pointer"
                    >
                      &quot;Who is the vendor?&quot;
                    </button>
                    <button
                      onClick={() => handleAskVlm('What item was purchased?')}
                      className="px-3 py-1.5 rounded-full bg-[#352723] text-xs font-['JetBrains_Mono'] text-[#7bd0ff] hover:bg-[#41312e] transition-colors cursor-pointer"
                    >
                      &quot;What item was purchased?&quot;
                    </button>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#7bd0ff]/10 border border-[#7bd0ff]/25 text-xs font-['JetBrains_Mono'] text-[#f6ddd8] min-h-[75px] leading-relaxed">
                    <strong className="text-[#7bd0ff]">LLaVA Answer: </strong>
                    {vlmLoading ? 'Reasoning over visual bounding boxes...' : vlmAnswer}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'fitness' && (
            <motion.div
              key="fitness"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl glass-card glow-tertiary max-w-4xl mx-auto space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#59413c]/40">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold font-['Space_Grotesk'] text-[#f6ddd8]">
                    MyFitness Hub: Gemini AI Routine Synthesizer
                  </h3>
                  <p className="text-xs font-['JetBrains_Mono'] text-[#e1bfb8] mt-0.5">
                    Generates dynamic periodized workout schedules tailored to goals and recovery.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-['JetBrains_Mono'] text-[#56d9d8] bg-[#56d9d8]/10 self-start sm:self-auto">
                  Google Gemini AI
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-['JetBrains_Mono'] text-[#e1bfb8] mb-1.5">
                    Primary Fitness Goal
                  </label>
                  <select
                    value={fitGoal}
                    onChange={(e) => setFitGoal(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#261815] border border-[#59413c]/40 text-xs text-[#f6ddd8] font-['JetBrains_Mono'] focus:outline-none focus:border-[#56d9d8]"
                  >
                    <option value="Hypertrophy (Muscle Gain)">Hypertrophy (Muscle Gain)</option>
                    <option value="Fat Loss & Conditioning">Fat Loss &amp; Conditioning</option>
                    <option value="Strength & Powerlifting">Strength &amp; Powerlifting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-['JetBrains_Mono'] text-[#e1bfb8] mb-1.5">
                    Weekly Training Split
                  </label>
                  <select
                    value={fitFreq}
                    onChange={(e) => setFitFreq(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[#261815] border border-[#59413c]/40 text-xs text-[#f6ddd8] font-['JetBrains_Mono'] focus:outline-none focus:border-[#56d9d8]"
                  >
                    <option value="4 Days (Upper / Lower Split)">4 Days (Upper / Lower Split)</option>
                    <option value="5 Days (Push / Pull / Legs)">5 Days (Push / Pull / Legs)</option>
                    <option value="3 Days (Full Body Routine)">3 Days (Full Body Routine)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateFitness}
                disabled={fitGenerating}
                className="w-full py-3 rounded-full font-['JetBrains_Mono'] text-xs font-semibold text-[#003939] bg-[#00acab] hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{fitGenerating ? 'Synthesizing routine with Gemini...' : 'Generate Custom AI Workout Plan'}</span>
              </button>

              <div className="p-4 rounded-xl bg-[#261815] border border-[#56d9d8]/25 space-y-2 text-xs font-['JetBrains_Mono']">
                <div className="text-[#56d9d8] font-semibold">SYNTHESIZED ROUTINE:</div>
                <p className="text-[#f6ddd8] leading-relaxed">
                  {fitOutput}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
