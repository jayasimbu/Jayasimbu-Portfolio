'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Database,
  Mail,
  Trash2,
  Plus,
  ArrowLeft,
  Lock,
  CheckCircle2,
  RefreshCw,
  FolderGit2,
  Code2,
  Briefcase,
} from 'lucide-react';

interface InquiryRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
}

interface DynamicItem {
  _id: string;
  id?: string;
  title?: string;
  name?: string;
  position?: string;
  company?: string;
  subtitle?: string;
  period?: string;
}

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'projects' | 'skills' | 'experience'>('inquiries');

  const [health, setHealth] = useState<{
    ok: boolean;
    database?: string;
    counts?: { projects: number; skillCategories: number; experiences: number; inquiries: number };
  } | null>(null);

  const [inquiries, setInquiries] = useState<InquiryRow[]>([]);
  const [projects, setProjects] = useState<DynamicItem[]>([]);
  const [skillCategories, setSkillCategories] = useState<DynamicItem[]>([]);
  const [experiences, setExperiences] = useState<DynamicItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Add Project Form
  const [newProj, setNewProj] = useState({
    title: '',
    subtitle: '',
    tagline: '',
    category: 'Full Stack Development | AI',
    description: '',
    techStack: '',
    contribution: '',
    githubUrl: 'https://github.com/jayasimbu',
    features: '',
  });

  // Add Skill Category Form
  const [newSkillCat, setNewSkillCat] = useState({
    name: '',
    skillsCsv: '',
  });

  // Add Experience Form
  const [newExp, setNewExp] = useState({
    company: '',
    position: '',
    period: '',
    type: 'Software Engineering',
    description: '',
    responsibilities: '',
  });

  const loadHealthAndPortfolio = useCallback(async () => {
    try {
      const [hRes, pRes] = await Promise.all([
        fetch('/api/health'),
        fetch('/api/portfolio'),
      ]);
      const hData = await hRes.json();
      setHealth(hData);
      const pData = await pRes.json();
      if (pData.ok) {
        setProjects(pData.projects || []);
        setSkillCategories(pData.skillCategories || []);
        setExperiences(pData.experiences || []);
      }
    } catch {
      setHealth({ ok: false });
    }
  }, []);

  const loadInquiries = useCallback(async (key: string) => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { 'x-admin-key': key },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAuthenticated(false);
        setAuthError(data.error || 'Invalid Admin Key');
        return;
      }
      setAuthenticated(true);
      setInquiries(data.inquiries || []);
      await loadHealthAndPortfolio();
    } catch {
      setAuthError('Failed to connect to MongoDB API');
    } finally {
      setLoading(false);
    }
  }, [loadHealthAndPortfolio]);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch('/api/health').then((r) => r.json()),
      fetch('/api/portfolio').then((r) => r.json()),
    ])
      .then(([hData, pData]) => {
        if (!active) return;
        setHealth(hData);
        if (pData?.ok) {
          setProjects(pData.projects || []);
          setSkillCategories(pData.skillCategories || []);
          setExperiences(pData.experiences || []);
        }
      })
      .catch(() => {
        if (active) setHealth({ ok: false });
      });
    return () => {
      active = false;
    };
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loadInquiries(adminKey);
  };

  const handleUpdateInquiryStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      },
      body: JSON.stringify({ id, status }),
    });
    loadInquiries(adminKey);
  };

  const handleDeleteInquiry = async (id: string) => {
    await fetch(`/api/admin/inquiries?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey },
    });
    loadInquiries(adminKey);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: newProj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now(),
      title: newProj.title,
      subtitle: newProj.subtitle || 'Full Stack Project',
      tagline: newProj.tagline || newProj.title,
      category: newProj.category,
      description: newProj.description,
      techStack: newProj.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      contribution: newProj.contribution || 'End-to-end architecture and implementation.',
      isFeatured: true,
      githubUrl: newProj.githubUrl,
      features: newProj.features.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    await fetch('/api/admin/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ collection: 'projects', item }),
    });
    setNewProj({
      title: '',
      subtitle: '',
      tagline: '',
      category: 'Full Stack Development | AI',
      description: '',
      techStack: '',
      contribution: '',
      githubUrl: 'https://github.com/jayasimbu',
      features: '',
    });
    loadHealthAndPortfolio();
  };

  const handleAddSkillCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const skills = newSkillCat.skillsCsv
      .split(',')
      .map((entry) => {
        const [name, levelStr] = entry.split(':').map((s) => s.trim());
        return { name, level: Number(levelStr) || 85 };
      })
      .filter((s) => s.name);

    await fetch('/api/admin/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({
        collection: 'skill_categories',
        item: { name: newSkillCat.name, icon: 'Code2', skills },
      }),
    });
    setNewSkillCat({ name: '', skillsCsv: '' });
    loadHealthAndPortfolio();
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      company: newExp.company,
      position: newExp.position,
      period: newExp.period,
      type: newExp.type,
      description: newExp.description,
      responsibilities: newExp.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
    };
    await fetch('/api/admin/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      body: JSON.stringify({ collection: 'experiences', item }),
    });
    setNewExp({
      company: '',
      position: '',
      period: '',
      type: 'Software Engineering',
      description: '',
      responsibilities: '',
    });
    loadHealthAndPortfolio();
  };

  const handleDeleteDynamicItem = async (
    collection: 'projects' | 'skill_categories' | 'experiences',
    id: string
  ) => {
    await fetch(
      `/api/admin/portfolio?collection=${collection}&id=${encodeURIComponent(id)}`,
      {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      }
    );
    loadHealthAndPortfolio();
  };

  return (
    <div className="min-h-screen bg-[#1d100e] text-[#f6ddd8] p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#59413c]/40">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-full bg-[#2a1c19] border border-[#59413c]/50 text-[#e1bfb8] hover:text-[#ff6b4a] transition-colors"
              title="Back to Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-['Space_Grotesk'] text-2xl font-bold text-[#f6ddd8]">
                Portfolio <span className="text-[#ff6b4a]">MongoDB</span> Admin
              </h1>
              <p className="font-['JetBrains_Mono'] text-xs text-[#a88a83]">
                Manage inquiries, dynamic projects, skills &amp; experience
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] ${
                health?.ok
                  ? 'bg-[#56d9d8]/10 text-[#56d9d8]'
                  : 'bg-[#ffb4ab]/10 text-[#ffb4ab]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              {health?.ok
                ? `Connected: ${health.database}`
                : 'MongoDB Offline / Static Mode'}
            </span>
          </div>
        </div>

        {/* Auth Gate */}
        {!authenticated ? (
          <form
            onSubmit={handleLogin}
            className="glass-card rounded-2xl p-8 max-w-md mx-auto space-y-5 mt-12"
          >
            <div className="w-12 h-12 rounded-xl bg-[#ff6b4a]/15 flex items-center justify-center text-[#ff6b4a] mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h2 className="font-['Space_Grotesk'] text-xl font-semibold text-[#f6ddd8]">
                Admin Authentication
              </h2>
              <p className="text-xs text-[#e1bfb8] mt-1 font-['JetBrains_Mono']">
                Enter your ADMIN_KEY from .env.local
              </p>
            </div>
            <input
              type="password"
              required
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key..."
              className="w-full px-4 py-3 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8] focus:outline-none focus:border-[#ff6b4a]"
            />
            {authError && (
              <p className="text-xs font-['JetBrains_Mono'] text-[#ffb4ab] text-center">
                {authError}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#ff6b4a] text-[#661000] font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              {loading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
          </form>
        ) : (
          <>
            {/* Collection Counts */}
            {health?.counts && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass-card rounded-xl p-5">
                  <p className="font-['JetBrains_Mono'] text-xs text-[#a88a83]">INQUIRIES</p>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#ff6b4a] mt-1">
                    {health.counts.inquiries}
                  </p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <p className="font-['JetBrains_Mono'] text-xs text-[#a88a83]">PROJECTS</p>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#56d9d8] mt-1">
                    {health.counts.projects}
                  </p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <p className="font-['JetBrains_Mono'] text-xs text-[#a88a83]">SKILL GROUPS</p>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#7bd0ff] mt-1">
                    {health.counts.skillCategories}
                  </p>
                </div>
                <div className="glass-card rounded-xl p-5">
                  <p className="font-['JetBrains_Mono'] text-xs text-[#a88a83]">EXPERIENCE</p>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#ffb4a3] mt-1">
                    {health.counts.experiences}
                  </p>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: 'inquiries', label: 'Inquiries', icon: Mail },
                    { id: 'projects', label: 'Projects', icon: FolderGit2 },
                    { id: 'skills', label: 'Skill Groups', icon: Code2 },
                    { id: 'experience', label: 'Experience', icon: Briefcase },
                  ] as const
                ).map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-['JetBrains_Mono'] cursor-pointer transition-all ${
                        activeTab === t.id
                          ? 'bg-[#ff6b4a] text-[#661000] font-semibold'
                          : 'bg-[#2a1c19] text-[#e1bfb8] border border-[#59413c]/40 hover:border-[#ffb4a3]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => loadInquiries(adminKey)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-['JetBrains_Mono'] bg-[#2a1c19] border border-[#59413c]/40 text-[#7bd0ff] hover:border-[#7bd0ff] cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
            </div>

            {/* Tab 1: Inquiries */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <div className="glass-card rounded-xl p-10 text-center text-sm text-[#e1bfb8]">
                    No contact inquiries saved yet. Submit the form on the main portfolio to test!
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="glass-card rounded-xl p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-['Space_Grotesk'] font-semibold text-base text-[#f6ddd8]">
                            {inq.name}
                          </span>
                          <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff]">
                            {inq.email}
                          </span>
                          <span
                            className={`font-['JetBrains_Mono'] text-[10px] px-2.5 py-0.5 rounded-full uppercase ${
                              inq.status === 'new'
                                ? 'bg-[#ff6b4a]/15 text-[#ff6b4a]'
                                : inq.status === 'replied'
                                ? 'bg-[#56d9d8]/15 text-[#56d9d8]'
                                : 'bg-[#7bd0ff]/15 text-[#7bd0ff]'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <p className="font-['JetBrains_Mono'] text-xs text-[#ffb4a3]">
                          Subject: {inq.subject}
                        </p>
                        <p className="text-sm text-[#e1bfb8] leading-relaxed">{inq.message}</p>
                        <p className="font-['JetBrains_Mono'] text-[11px] text-[#a88a83]">
                          {new Date(inq.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleUpdateInquiryStatus(inq.id, 'replied')}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-['JetBrains_Mono'] bg-[#56d9d8]/10 text-[#56d9d8] hover:bg-[#56d9d8]/20 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mark Replied
                        </button>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-full bg-[#ffb4ab]/10 text-[#ffb4ab] hover:bg-[#ffb4ab]/20 cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Projects */}
            {activeTab === 'projects' && (
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  {projects.map((p) => (
                    <div
                      key={p._id}
                      className="glass-card rounded-xl p-5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <h3 className="font-['Space_Grotesk'] font-semibold text-base text-[#f6ddd8]">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#e1bfb8]">{p.subtitle}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteDynamicItem('projects', p._id)}
                        className="p-2 rounded-full bg-[#ffb4ab]/10 text-[#ffb4ab] hover:bg-[#ffb4ab]/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddProject} className="glass-card rounded-xl p-6 space-y-4">
                  <h3 className="font-['Space_Grotesk'] font-semibold text-lg text-[#f6ddd8] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#ff6b4a]" /> Add Project to MongoDB
                  </h3>
                  <input
                    required
                    placeholder="Project Title"
                    value={newProj.title}
                    onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <input
                    placeholder="Subtitle (e.g. AI SaaS Platform)"
                    value={newProj.subtitle}
                    onChange={(e) => setNewProj({ ...newProj, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <input
                    placeholder="Tagline"
                    value={newProj.tagline}
                    onChange={(e) => setNewProj({ ...newProj, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <input
                    placeholder="Tech stack (comma separated: Next.js, FastAPI, MongoDB)"
                    value={newProj.techStack}
                    onChange={(e) => setNewProj({ ...newProj, techStack: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="Description"
                    value={newProj.description}
                    onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <textarea
                    rows={3}
                    placeholder="Key features (one per line)"
                    value={newProj.features}
                    onChange={(e) => setNewProj({ ...newProj, features: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <input
                    placeholder="GitHub URL"
                    value={newProj.githubUrl}
                    onChange={(e) => setNewProj({ ...newProj, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#ff6b4a] text-[#661000] font-semibold text-sm cursor-pointer"
                  >
                    Save Project
                  </button>
                </form>
              </div>
            )}

            {/* Tab 3: Skill Groups */}
            {activeTab === 'skills' && (
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  {skillCategories.map((sc) => (
                    <div
                      key={sc._id}
                      className="glass-card rounded-xl p-5 flex items-center justify-between gap-4"
                    >
                      <h3 className="font-['Space_Grotesk'] font-semibold text-base text-[#f6ddd8]">
                        {sc.name}
                      </h3>
                      <button
                        onClick={() => handleDeleteDynamicItem('skill_categories', sc._id)}
                        className="p-2 rounded-full bg-[#ffb4ab]/10 text-[#ffb4ab] hover:bg-[#ffb4ab]/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddSkillCategory} className="glass-card rounded-xl p-6 space-y-4">
                  <h3 className="font-['Space_Grotesk'] font-semibold text-lg text-[#f6ddd8] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#7bd0ff]" /> Add Skill Category
                  </h3>
                  <input
                    required
                    placeholder="Category Name (e.g. Cloud & DevOps)"
                    value={newSkillCat.name}
                    onChange={(e) => setNewSkillCat({ ...newSkillCat, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <input
                    required
                    placeholder="Skills (e.g. Docker:85, Vercel:90, GitHub Actions:85)"
                    value={newSkillCat.skillsCsv}
                    onChange={(e) => setNewSkillCat({ ...newSkillCat, skillsCsv: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#ff6b4a] text-[#661000] font-semibold text-sm cursor-pointer"
                  >
                    Save Skill Category
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Experience */}
            {activeTab === 'experience' && (
              <div className="grid lg:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div
                      key={exp._id}
                      className="glass-card rounded-xl p-5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <h3 className="font-['Space_Grotesk'] font-semibold text-base text-[#f6ddd8]">
                          {exp.position}
                        </h3>
                        <p className="text-xs text-[#7bd0ff]">
                          {exp.company} · {exp.period}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteDynamicItem('experiences', exp._id)}
                        className="p-2 rounded-full bg-[#ffb4ab]/10 text-[#ffb4ab] hover:bg-[#ffb4ab]/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddExperience} className="glass-card rounded-xl p-6 space-y-4">
                  <h3 className="font-['Space_Grotesk'] font-semibold text-lg text-[#f6ddd8] flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#56d9d8]" /> Add Experience Entry
                  </h3>
                  <input
                    required
                    placeholder="Company Name"
                    value={newExp.company}
                    onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <input
                    required
                    placeholder="Position / Role"
                    value={newExp.position}
                    onChange={(e) => setNewExp({ ...newExp, position: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <input
                    required
                    placeholder="Period (e.g. Nov 2026 – Present)"
                    value={newExp.period}
                    onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <textarea
                    rows={3}
                    placeholder="Key responsibilities (one per line)"
                    value={newExp.responsibilities}
                    onChange={(e) => setNewExp({ ...newExp, responsibilities: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#261815] border border-[#59413c]/40 text-sm text-[#f6ddd8]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#ff6b4a] text-[#661000] font-semibold text-sm cursor-pointer"
                  >
                    Save Experience
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
