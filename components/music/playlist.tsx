'use client';

import { Music2, Pause, Play } from 'lucide-react';
import { useMusicPlayer } from './music-player-provider';

export function Playlist() {
  const { tracks, currentIndex, isPlaying, playTrack, togglePlay } = useMusicPlayer();

  return (
    <div className="rounded-[2rem] border border-leaf-200 bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-leaf-900">播放列表</h3>
      <div className="mt-5 space-y-3">
        {tracks.map((track, index) => {
          const active = index === currentIndex;
          return (
            <button key={track.id} type="button" onClick={() => active ? togglePlay() : playTrack(index)} className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${active ? 'border-leaf-300 bg-leaf-100' : 'border-leaf-200 bg-white hover:border-leaf-300'}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-leaf-700">
                {active && isPlaying ? <Pause size={16} /> : active ? <Play size={16} /> : <Music2 size={16} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-leaf-900">{track.title}</span>
                <span className="mt-1 block truncate text-sm text-leaf-700">{track.artist}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
