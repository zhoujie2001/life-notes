import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { CalendarDays, Clock3 } from 'lucide-react';
import { TagChip } from '@/components/blog/tag-chip';
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts';

export function generateStaticParams() {
  return getAllPostSlugs();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title}｜Life Notes`,
    description: post.summary,
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <div className="mb-8">
        <p className="text-sm text-leaf-700">{post.category}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-leaf-900 md:text-5xl">{post.title}</h1>
        <p className="mt-5 leading-8 text-leaf-700">{post.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-leaf-700">
          <span className="inline-flex items-center gap-2"><CalendarDays size={16} />{post.publishedAt}</span>
          <span className="inline-flex items-center gap-2"><Clock3 size={16} />{post.readingTime} min read</span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => <TagChip key={tag} label={tag} />)}
        </div>
      </div>

      <div className="prose-life rounded-[2rem] border border-leaf-200 bg-white p-7 shadow-sm md:p-10">
        {content}
      </div>
    </article>
  );
}
