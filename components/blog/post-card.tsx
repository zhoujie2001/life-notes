import Link from 'next/link';
import { CalendarDays, Clock3 } from 'lucide-react';
import type { PostMeta } from '@/types/post';

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block rounded-3xl border border-leaf-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-leaf-300 hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-3 text-xs text-leaf-700">
        <span className="rounded-full bg-leaf-100 px-3 py-1">{post.category}</span>
        <span className="inline-flex items-center gap-1"><CalendarDays size={14} />{post.publishedAt}</span>
        <span className="inline-flex items-center gap-1"><Clock3 size={14} />{post.readingTime} min read</span>
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-leaf-900 transition group-hover:text-leaf-700">{post.title}</h2>
      <p className="mt-3 line-clamp-2 leading-7 text-leaf-700">{post.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-leaf-200 px-3 py-1 text-xs text-leaf-700">#{tag}</span>
        ))}
      </div>
    </Link>
  );
}
