import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays, Camera, Music2 } from 'lucide-react';
import { PostCard } from '@/components/blog/post-card';
import { MomentCard } from '@/components/moments/moment-card';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeading } from '@/components/ui/section-heading';
import { getAllPosts } from '@/lib/posts';
import { getAllMoments } from '@/lib/moments';
import { getDefaultTrack, getTracks } from '@/lib/music';

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const latestMoments = getAllMoments().slice(0, 2);
  const defaultTrack = getDefaultTrack();
  const tracks = getTracks();

  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="grid gap-10 py-20 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-leaf-200 bg-white px-4 py-2 text-sm text-leaf-700">Life Notes · 极简生活记录</p>
          <h1 className="text-4xl font-semibold tracking-tight text-leaf-900 md:text-6xl">在学习、生活与音乐里，留下清澈的注脚。</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-leaf-700">这里用于记录个人展示、学习心得、日常片段、图片视频，以及那些适合在安静时刻循环播放的纯音乐。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog" className="inline-flex items-center gap-2 rounded-full bg-leaf-300 px-5 py-3 text-sm font-medium text-leaf-900 transition hover:scale-[1.02]">查看博客 <ArrowRight size={16} /></Link>
            <Link href="/music" className="inline-flex items-center gap-2 rounded-full border border-leaf-200 bg-white px-5 py-3 text-sm font-medium text-leaf-700 transition hover:border-leaf-300 hover:text-leaf-900">进入音乐专区</Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-leaf-200 bg-white/80 p-6 shadow-soft">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-leaf-200 to-white p-6">
            <p className="text-sm text-leaf-700">Now</p>
            <h2 className="mt-2 text-2xl font-semibold text-leaf-900">记录正在生长的自己</h2>
            <p className="mt-4 leading-7 text-leaf-700">以浅绿色和留白作为视觉底色，写下学习、思考、日常和音乐。</p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-white/80 p-3">
                <p className="text-xl font-semibold text-leaf-900">{latestPosts.length}</p>
                <p className="mt-1 text-xs text-leaf-700">最新文章</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-3">
                <p className="text-xl font-semibold text-leaf-900">{latestMoments.length}</p>
                <p className="mt-1 text-xs text-leaf-700">近期记录</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-3">
                <p className="text-xl font-semibold text-leaf-900">{tracks.length}</p>
                <p className="mt-1 text-xs text-leaf-700">音乐曲目</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 pb-16 md:grid-cols-3">
        {[
          { icon: BookOpen, title: '心得与学习', desc: '沉淀阶段性思考、技术学习和复盘。', href: '/blog' },
          { icon: Camera, title: '日常记录', desc: '通过图片、视频和简短文字记录生活片段。', href: '/moments' },
          { icon: Music2, title: '音乐空间', desc: '以纯音乐作为阅读和记录时的背景。', href: '/music' },
        ].map((item) => (
          <Link key={item.title} href={item.href} className="rounded-3xl border border-leaf-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-leaf-300 hover:shadow-soft">
            <item.icon className="text-leaf-700" size={22} />
            <h3 className="mt-5 text-lg font-semibold text-leaf-900">{item.title}</h3>
            <p className="mt-3 leading-7 text-leaf-700">{item.desc}</p>
          </Link>
        ))}
      </section>

      <section className="pb-16">
        <SectionHeading eyebrow="Latest Blog" title="最新心得与学习" href="/blog" />
        <div className="grid gap-5">
          {latestPosts.length > 0 ? latestPosts.map((post) => <PostCard key={post.slug} post={post} />) : <EmptyState>还没有文章。</EmptyState>}
        </div>
      </section>

      <section className="pb-16">
        <SectionHeading eyebrow="Recent Moments" title="近期日常记录" href="/moments" />
        <div className="grid gap-5 md:grid-cols-2">
          {latestMoments.length > 0 ? latestMoments.map((moment) => <MomentCard key={moment.slug} moment={moment} />) : <EmptyState>还没有日常记录。</EmptyState>}
        </div>
      </section>

      <section className="pb-24">
        <div className="rounded-[2rem] border border-leaf-200 bg-white p-8 shadow-soft md:flex md:items-center md:justify-between md:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm text-leaf-700"><Music2 size={16} /> Now Playing</p>
            <h2 className="mt-3 text-3xl font-semibold text-leaf-900">{defaultTrack.title}</h2>
            <p className="mt-2 text-leaf-700">{defaultTrack.artist}</p>
            {defaultTrack.description && <p className="mt-4 max-w-2xl leading-8 text-leaf-700">{defaultTrack.description}</p>}
            <div className="mt-5 flex flex-wrap gap-2">
              {tracks.map((track) => <span key={track.id} className="rounded-full border border-leaf-200 px-3 py-1 text-xs text-leaf-700">{track.title}</span>)}
            </div>
          </div>
          <Link href="/music" className="mt-7 inline-flex items-center gap-2 rounded-full bg-leaf-300 px-5 py-3 text-sm font-medium text-leaf-900 transition hover:scale-[1.02] md:mt-0">打开播放器 <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
