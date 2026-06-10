'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Music2, Pause, Play } from 'lucide-react';

const defaultTrack = {
  title: '海边的曼彻斯特',
  artist: '森水垚',
  src: '/music/haibian-de-manchesite.mp3',
};

export function GlobalAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function togglePlay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-3xl border border-leaf-200 bg-white/90 p-3 shadow-soft backdrop-blur-xl">
      <audio ref={audioRef} src={defaultTrack.src} loop preload="metadata" />
      <div className="flex items-center gap-3">
        <button type="button" onClick={togglePlay} className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf-300 text-leaf-900 transition hover:scale-105" aria-label={isPlaying ? '暂停音乐' : '播放音乐'}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-leaf-900">{defaultTrack.title}</p>
          <p className="truncate text-xs text-leaf-700">{defaultTrack.artist} · 背景 BGM</p>
        </div>
        <Link href="/music" className="flex h-10 w-10 items-center justify-center rounded-full border border-leaf-200 text-leaf-700 transition hover:bg-leaf-100 hover:text-leaf-900" aria-label="进入音乐专区">
          <Music2 size={18} />
        </Link>
      </div>
    </div>
  );
}
