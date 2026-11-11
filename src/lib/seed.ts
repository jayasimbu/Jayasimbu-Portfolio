import { Db } from 'mongodb';
import {
  PROJECTS,
  SKILL_CATEGORIES,
  EXPERIENCE,
} from '@/data/portfolio-data';

let seededOnce = false;

/**
 * Ensures default projects, skill categories, and experiences exist in MongoDB
 * on first access so the dynamic portfolio immediately reflects real data.
 */
export async function ensurePortfolioSeeded(db: Db): Promise<void> {
  if (seededOnce) return;

  const projectsCol = db.collection('projects');
  const skillsCol = db.collection('skill_categories');
  const experienceCol = db.collection('experiences');

  const [projCount, skillCount, expCount] = await Promise.all([
    projectsCol.countDocuments(),
    skillsCol.countDocuments(),
    experienceCol.countDocuments(),
  ]);

  if (projCount === 0 && PROJECTS.length > 0) {
    await projectsCol.insertMany(
      PROJECTS.map((p, idx) => ({ ...p, order: idx }))
    );
  }

  if (skillCount === 0 && SKILL_CATEGORIES.length > 0) {
    await skillsCol.insertMany(
      SKILL_CATEGORIES.map((c, idx) => ({ ...c, order: idx }))
    );
  }

  if (expCount === 0 && EXPERIENCE.length > 0) {
    await experienceCol.insertMany(
      EXPERIENCE.map((e, idx) => ({ ...e, order: idx }))
    );
  }

  seededOnce = true;
}
