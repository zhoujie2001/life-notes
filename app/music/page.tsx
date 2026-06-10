import { MusicPlayerPanel } from '@/components/music/music-player-panel';
import { Playlist } from '@/components/music/playlist';
import { PageHero } from '@/components/ui/page-hero';
import { getDefaultTrack } from '@/lib/music';

export default function MusicPage() {
  const defaultTrack = getDefaultTrack();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <PageHero eyebrow="Music Room" title="独立播放器专区" description={`这里会逐步整理适合阅读、学习和记录时播放的纯音乐。当前默认背景 BGM 为《${defaultTrack.title}》。`} />

      <section className="mt-10 grid gap-6 md:grid-cols-[1fr_0.8fr]">
        <MusicPlayerPanel />
        <Playlist />
      </section>
    </div>
  );
}
