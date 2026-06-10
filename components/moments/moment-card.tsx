import Link from 'next/link';
import { CalendarDays, MapPin, Smile } from 'lucide-react';
import type { MomentMeta } from '@/types/moment';
import { MediaGallery } from './media-gallery';

export function MomentCard({ moment }: { moment: MomentMeta }) {
  return (
    <article className="relative rounded-[2rem] border border-leaf-200 bg-white p-6 shadow-sm transition hover:border-leaf-300 hover:shadow-soft">
      <div className="flex flex-wrap items-center gap-3 text-xs text-leaf-700">
        <span className="inline-flex items-center gap-1"><CalendarDays size={14} />{moment.createdAt}</span>
        {moment.mood && <span className="inline-flex items-center gap-1"><Smile size={14} />{moment.mood}</span>}
        {moment.location && <span className="inline-flex items-center gap-1"><MapPin size={14} />{moment.location}</span>}
      </div>

      <Link href={`/moments/${moment.slug}`}>
        <h2 className="mt-4 text-2xl font-semibold text-leaf-900 transition hover:text-leaf-700">{moment.title}</h2>
      </Link>

      {moment.summary && <p className="mt-3 leading-7 text-leaf-700">{moment.summary}</p>}

      <MediaGallery media={moment.media} />

      <div className="mt-5 flex flex-wrap gap-2">
        {moment.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-leaf-200 px-3 py-1 text-xs text-leaf-700">#{tag}</span>
        ))}
      </div>
    </article>
  );
}
