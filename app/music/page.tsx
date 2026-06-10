import { getDefaultTrack, getTracks } from '@/lib/music';

export default function MusicPage() {
  const defaultTrack = getDefaultTrack();
  const tracks = getTracks();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10">
        <p className="text-sm text-leaf-700">Music Room</p>
        <h1 className="mt-3 text-4xl font-semibold text-leaf-900">独立播放器专区</h1>
        <p className="mt-4 max-w-2xl leading-8 text-leaf-700">这里会逐步整理适合阅读、学习和记录时播放的纯音乐。当前默认背景 BGM 为《{defaultTrack.title}》。</p>
      </div>

      <section className="grid gap-6 md:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[2rem] border border-leaf-200 bg-white p-8 shadow-soft">
          <div className="flex h-64 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-leaf-200 via-white to-leaf-100 text-leaf-700">Cover Placeholder</div>
          <h2 className="mt-8 text-2xl font-semibold text-leaf-900">{defaultTrack.title}</h2>
          <p className="mt-2 text-leaf-700">{defaultTrack.artist}</p>
          <p className="mt-5 leading-8 text-leaf-700">{defaultTrack.description}</p>
          <audio className="mt-6 w-full" controls loop src={defaultTrack.src} />
        </div>

        <div className="rounded-[2rem] border border-leaf-200 bg-white/80 p-6">
          <h3 className="text-lg font-semibold text-leaf-900">播放列表</h3>
          <div className="mt-5 space-y-3">
            {tracks.map((track) => (
              <div key={track.id} className="rounded-2xl border border-leaf-200 bg-white p-4">
                <p className="font-medium text-leaf-900">{track.title}</p>
                <p className="mt-1 text-sm text-leaf-700">{track.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
