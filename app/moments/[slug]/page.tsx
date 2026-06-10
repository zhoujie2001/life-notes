import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { CalendarDays, MapPin, Smile } from 'lucide-react';
import { MediaGallery } from '@/components/moments/media-gallery';
import { getAllMomentSlugs, getMomentBySlug } from '@/lib/moments';

export function generateStaticParams() {
  return getAllMomentSlugs();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const moment = getMomentBySlug(params.slug);
  if (!moment) return {};

  return {
    title: `${moment.title}｜Life Notes`,
    description: moment.summary ?? 'Life Notes 日常记录',
  };
}

export default async function MomentDetailPage({ params }: { params: { slug: string } }) {
  const moment = getMomentBySlug(params.slug);
  if (!moment) notFound();

  const { content } = await compileMDX({
    source: moment.content,
    options: { parseFrontmatter: false },
  });

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <div className="mb-8">
        <p className="text-sm text-leaf-700">Moment</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-leaf-900 md:text-5xl">{moment.title}</h1>
        {moment.summary && <p className="mt-5 leading-8 text-leaf-700">{moment.summary}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-leaf-700">
          <span className="inline-flex items-center gap-2"><CalendarDays size={16} />{moment.createdAt}</span>
          {moment.mood && <span className="inline-flex items-center gap-2"><Smile size={16} />{moment.mood}</span>}
          {moment.location && <span className="inline-flex items-center gap-2"><MapPin size={16} />{moment.location}</span>}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {moment.tags.map((tag) => <span key={tag} className="rounded-full border border-leaf-200 bg-white px-3 py-1 text-xs text-leaf-700">#{tag}</span>)}
        </div>
      </div>

      <MediaGallery media={moment.media} />

      <div className="prose-life mt-8 rounded-[2rem] border border-leaf-200 bg-white p-7 shadow-sm md:p-10">
        {content}
      </div>
    </article>
  );
}
