'use client';

import Link from 'next/link';
import { ListMusic, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { formatTime, useMusicPlayer } from './music-player-provider';

export function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, progress, duration, volume, togglePlay, playNext, playPrevious, seek, setVolume } = useMusicPlayer();

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-3xl border border-leaf-200 bg-white/90 p-3 shadow-soft backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button type="button" onClick={playPrevious} className="hidden h-10 w-10 items-center justify-center rounded-full border border-leaf-200 text-leaf-700 transition hover:bg-leaf-100 hover:text-leaf-900 sm:flex" aria-label="上一首">
          <SkipBack size={17} />
        </button>
        <button type="button" onClick={togglePlay} className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf-300 text-leaf-900 transition hover:scale-105" aria-label={isPlaying ? '暂停音乐' : '播放音乐'}>
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <button type="button" onClick={playNext} className="hidden h-10 w-10 items-center justify-center rounded-full border border-leaf-200 text-leaf-700 transition hover:bg-leaf-100 hover:text-leaf-900 sm:flex" aria-label="下一首">
          <SkipForward size={17} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-leaf-900">{currentTrack.title}</p>
              <p className="truncate text-xs text-leaf-700">{currentTrack.artist} · 背景 BGM</p>
            </div>
            <span className="hidden shrink-0 text-xs text-leaf-700 sm:inline">{formatTime(progress)} / {formatTime(duration)}</span>
          </div>
          <input className="mt-2 h-1.5 w-full accent-leaf-300" type="range" min={0} max={duration || 0} step={1} value={Math.min(progress, duration || 0)} onChange={(event) => seek(Number(event.target.value))} aria-label="播放进度" />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Volume2 size={17} className="text-leaf-700" />
          <input className="w-20 accent-leaf-300" type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="音量" />
        </div>

        <Link href="/music" className="flex h-10 w-10 items-center justify-center rounded-full border border-leaf-200 text-leaf-700 transition hover:bg-leaf-100 hover:text-leaf-900" aria-label="进入音乐专区">
          <ListMusic size={18} />
        </Link>
      </div>
    </div>
  );
}
