import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined) return 'N/A';
  return `${Math.round(score * 10) / 10}`;
}

export function getCompetencyLevelLabel(level: number): { label: string; color: string } {
  if (level >= 4.5) return { label: 'Expert (Level 5)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (level >= 3.5) return { label: 'Advanced (Level 4)', color: 'bg-blue-100 text-blue-800 border-blue-300' };
  if (level >= 2.5) return { label: 'Proficient (Level 3)', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' };
  if (level >= 1.5) return { label: 'Working (Level 2)', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  return { label: 'Novice (Level 1)', color: 'bg-rose-100 text-rose-800 border-rose-300' };
}
