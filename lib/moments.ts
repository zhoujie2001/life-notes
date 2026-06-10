import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Moment, MomentMedia, MomentMeta } from '@/types/moment';

const momentsDirectory = path.join(process.cwd(), 'content/moments');

function ensureMomentsDirectory() {
  if (!fs.existsSync(momentsDirectory)) return [];
  return fs.readdirSync(momentsDirectory).filter((file) => file.endsWith('.mdx'));
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.map(String);
  if (typeof tags === 'string') return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  return [];
}

function normalizeMedia(media: unknown): MomentMedia[] {
  if (!Array.isArray(media)) return [];

  return media
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const record = item as Record<string, unknown>;
      const type = record.type === 'video' ? 'video' : 'image';
      const src = typeof record.src === 'string' ? record.src : '';
      if (!src) return null;

      return {
        type,
        src,
        alt: typeof record.alt === 'string' ? record.alt : undefined,
        poster: typeof record.poster === 'string' ? record.poster : undefined,
      };
    })
    .filter(Boolean) as MomentMedia[];
}

function parseMomentFile(fileName: string): Moment {
  const slug = fileName.replace(/\.mdx$/, '');
  const fullPath = path.join(momentsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title ?? slug),
    summary: data.summary ? String(data.summary) : undefined,
    createdAt: String(data.createdAt ?? ''),
    mood: data.mood ? String(data.mood) : undefined,
    location: data.location ? String(data.location) : undefined,
    tags: normalizeTags(data.tags),
    media: normalizeMedia(data.media),
    content,
  };
}

export function getAllMoments(): MomentMeta[] {
  return ensureMomentsDirectory()
    .map(parseMomentFile)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getMomentBySlug(slug: string): Moment | null {
  const fileName = `${slug}.mdx`;
  const fullPath = path.join(momentsDirectory, fileName);
  if (!fs.existsSync(fullPath)) return null;
  return parseMomentFile(fileName);
}

export function getAllMomentSlugs() {
  return ensureMomentsDirectory().map((fileName) => ({ slug: fileName.replace(/\.mdx$/, '') }));
}

export function getAllMomentTags() {
  const tagSet = new Set<string>();
  getAllMoments().forEach((moment) => moment.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
