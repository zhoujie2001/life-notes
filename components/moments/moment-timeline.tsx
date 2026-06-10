import type { MomentMeta } from '@/types/moment';
import { MomentCard } from './moment-card';

export function MomentTimeline({ moments }: { moments: MomentMeta[] }) {
  if (moments.length === 0) {
    return <div className="rounded-3xl border border-dashed border-leaf-300 bg-white/70 p-8 text-leaf-700">还没有日常记录。请在 `content/moments` 中新增 `.mdx` 文件。</div>;
  }

  return (
    <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:h-full before:w-px before:bg-leaf-200 md:before:left-6">
      {moments.map((moment) => (
        <div key={moment.slug} className="relative pl-10 md:pl-14">
          <span className="absolute left-[0.55rem] top-7 h-4 w-4 rounded-full border-4 border-white bg-leaf-300 md:left-[1.05rem]" />
          <MomentCard moment={moment} />
        </div>
      ))}
    </div>
  );
}
