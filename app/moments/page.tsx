import { MomentTimeline } from '@/components/moments/moment-timeline';
import { getAllMomentTags, getAllMoments } from '@/lib/moments';

export default function MomentsPage() {
  const moments = getAllMoments();
  const tags = getAllMomentTags();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-sm text-leaf-700">Moments</p>
      <h1 className="mt-3 text-4xl font-semibold text-leaf-900">日常记录</h1>
      <p className="mt-4 max-w-2xl leading-8 text-leaf-700">这里用于记录图片、视频与生活片段。第一版采用时间线结构，由 `content/moments/*.mdx` 文件驱动。</p>

      {tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-leaf-200 bg-white px-3 py-1 text-sm text-leaf-700">#{tag}</span>
          ))}
        </div>
      )}

      <div className="mt-10">
        <MomentTimeline moments={moments} />
      </div>
    </div>
  );
}
