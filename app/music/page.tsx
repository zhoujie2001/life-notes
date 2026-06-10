import { MusicPlayerPanel } from '@/components/music/music-player-panel';
import { Playlist } from '@/components/music/playlist';
import { getDefaultTrack } from '@/lib/music';

export default function MusicPage() {
  const defaultTrack = getDefaultTrack();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-10">
        <p className="text-sm text-leaf-700">Music Room</p>
        <h1 className="mt-3 text-4xl font-semibold text-leaf-900">独立播放器专区</h1>
        <p className="mt-4 max-w-2xl leading-8 text-leaf-700">这里会逐步整理适合阅读、学习和记录时播放的纯音乐。当前默认背景 BGM 为《{defaultTrack.title}》。</p>
      </div>

      <section className="grid gap-6 md:grid-cols-[1fr_0.8fr]">
        <MusicPlayerPanel />
        <Playlist />
      </section>
    </div>
  );
}
