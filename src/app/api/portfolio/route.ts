import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ensurePortfolioSeeded } from '@/lib/seed';

export async function GET() {
  try {
    const db = await getDb();
    await ensurePortfolioSeeded(db);

    const [rawProjects, rawSkills, rawExperiences] = await Promise.all([
      db.collection('projects').find().sort({ order: 1, _id: 1 }).toArray(),
      db.collection('skill_categories').find().sort({ order: 1, _id: 1 }).toArray(),
      db.collection('experiences').find().sort({ order: 1, _id: 1 }).toArray(),
    ]);

    const projects = rawProjects.map(({ _id, ...rest }) => ({
      ...rest,
      _id: _id.toString(),
    }));
    const skillCategories = rawSkills.map(({ _id, ...rest }) => ({
      ...rest,
      _id: _id.toString(),
    }));
    const experiences = rawExperiences.map(({ _id, ...rest }) => ({
      ...rest,
      _id: _id.toString(),
    }));

    return NextResponse.json({
      ok: true,
      projects,
      skillCategories,
      experiences,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load portfolio data';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
