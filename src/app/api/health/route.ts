import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ensurePortfolioSeeded } from '@/lib/seed';

export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    await ensurePortfolioSeeded(db);

    const [projects, skillCategories, experiences, inquiries] = await Promise.all([
      db.collection('projects').countDocuments(),
      db.collection('skill_categories').countDocuments(),
      db.collection('experiences').countDocuments(),
      db.collection('inquiries').countDocuments(),
    ]);

    return NextResponse.json({
      ok: true,
      database: db.databaseName,
      counts: { projects, skillCategories, experiences, inquiries },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Database connection error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
