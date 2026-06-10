import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Post, PostMeta } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
}

function calculateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const estimatedWords = words + chineseChars;
  return Math.max(1, Math.ceil(estimatedWords / 350));
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.map(String);
  if (typeof tags === 'string') return tags.split(',').map((tag) => tag.trim()).filter(Boolean);
  return [];
}

function parsePostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title ?? slug),
    summary: String(data.summary ?? ''),
    publishedAt: String(data.publishedAt ?? ''),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    tags: normalizeTags(data.tags),
    category: String(data.category ?? 'Notes'),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    readingTime: calculateReadingTime(content),
    isFeatured: Boolean(data.isFeatured),
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return ensurePostsDirectory()
    .map(parsePostFile)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPosts().filter((post) => post.isFeatured).slice(0, 3);
}

export function getPostBySlug(slug: string): Post | null {
  const fileName = `${slug}.mdx`;
  const fullPath = path.join(postsDirectory, fileName);

  if (!fs.existsSync(fullPath)) return null;
  return parsePostFile(fileName);
}

export function getAllPostSlugs() {
  return ensurePostsDirectory().map((fileName) => ({ slug: fileName.replace(/\.mdx$/, '') }));
}

export function getAllTags() {
  const tagSet = new Set<string>();
  getAllPosts().forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
