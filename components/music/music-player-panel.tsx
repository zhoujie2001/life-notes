'use client';

import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { formatTime, useMusicPlayer } from './music-player-provider';

export function MusicPlayerPanel() {
  const { currentTrack, isPlaying, progress, duration, volume, togglePlay, playPrevious, playNext, seek, setVolume } = useMusicPlayer();

  return (
    <div className="rounded-[2rem] border border-leaf-200 bg-white p-8 shadow-soft">
      <div className="flex h-64 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-leaf-200 via-white to-leaf-100 text-leaf-700">
        {currentTrack.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="h-full w-full rounded-[1.5rem] object-cover" src={currentTrack.coverImage} alt={`${currentTrack.title} cover`} />
        ) : (
          <span>Cover Placeholder</span>
        )}
      </div>

      <h2 className="mt-8 text-2xl font-semibold text-leaf-900">{currentTrack.title}</h2>
      <p className="mt-2 text-leaf-700">{currentTrack.artist}</p>
      {currentTrack.description && <p className="mt-5 leading-8 text-leaf-700">{currentTrack.description}</p>}

      <div className="mt-7 flex items-center justify-center gap-3">
        <button type="button" onClick={playPrevious} className="flex h-11 w-11 items-center justify-center rounded-full border border-leaf-200 text-leaf-700 transition hover:bg-leaf-100" aria-label="上一首">
          <SkipBack size={18} />
        </button>
        <button type="button" onClick={togglePlay} className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf-300 text-leaf-900 transition hover:scale-105" aria-label={isPlaying ? '暂停音乐' : '播放音乐'}>
          {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </button>
        <button type="button" onClick={playNext} className="flex h-11 w-11 items-center justify-center rounded-full border border-leaf-200 text-leaf-700 transition hover:bg-leaf-100" aria-label="下一首">
          <SkipForward size={18} />
        </button>
      </div>

      <div className="mt-6">
        <input className="h-1.5 w-full accent-leaf-300" type="range" min={0} max={duration || 0} step={1} value={Math.min(progress, duration || 0)} onChange={(event) => seek(Number(event.target.value))} aria-label="播放进度" />
        <div className="mt-2 flex justify-between text-xs text-leaf-700">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 text-leaf-700">
        <Volume2 size={18} />
        <input className="w-full accent-leaf-300" type="range" min={0} max={1} step={0.01} value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="音量" />
      </div>
    </div>
  );
}
