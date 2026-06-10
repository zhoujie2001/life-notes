import type { MomentMedia } from '@/types/moment';

export function MediaGallery({ media }: { media: MomentMedia[] }) {
  if (media.length === 0) return null;

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {media.map((item) => (
        <div key={item.src} className="overflow-hidden rounded-2xl border border-leaf-200 bg-leaf-50">
          {item.type === 'video' ? (
            <video className="aspect-video w-full object-cover" src={item.src} poster={item.poster} controls />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="aspect-video w-full object-cover" src={item.src} alt={item.alt ?? ''} />
          )}
        </div>
      ))}
    </div>
  );
}
