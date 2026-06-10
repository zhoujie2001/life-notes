import Link from 'next/link';
import { ArrowRight, BookOpen, Camera, Music2 } from 'lucide-react';

export default function HomePage() {
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
          </div>
        </div>
      </section>

      <section className="grid gap-5 pb-20 md:grid-cols-3">
        {[
          { icon: BookOpen, title: '心得与学习', desc: '沉淀阶段性思考、技术学习和复盘。' },
          { icon: Camera, title: '日常记录', desc: '通过图片、视频和简短文字记录生活片段。' },
          { icon: Music2, title: '音乐空间', desc: '以纯音乐作为阅读和记录时的背景。' },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-leaf-200 bg-white p-6 shadow-sm">
            <item.icon className="text-leaf-700" size={22} />
            <h3 className="mt-5 text-lg font-semibold text-leaf-900">{item.title}</h3>
            <p className="mt-3 leading-7 text-leaf-700">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
