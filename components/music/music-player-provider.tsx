'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Track } from '@/types/music';

type MusicPlayerContextValue = {
  tracks: Track[];
  currentTrack: Track;
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  playTrack: (index: number) => Promise<void>;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  seek: (value: number) => void;
  setVolume: (value: number) => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export function MusicPlayerProvider({ tracks, children }: { tracks: Track[]; children: React.ReactNode }) {
  const safeTracks = tracks.length > 0 ? tracks : [{ id: 'empty', title: '暂无音乐', artist: 'Life Notes', src: '' }];
  const defaultIndex = Math.max(0, safeTracks.findIndex((track) => track.isDefaultBgm));
  const [currentIndex, setCurrentIndex] = useState(defaultIndex === -1 ? 0 : defaultIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.72);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = safeTracks[currentIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setProgress(0);
    setDuration(0);

    if (isPlaying && currentTrack.src) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack.src, isPlaying]);

  async function play() {
    if (!audioRef.current || !currentTrack.src) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  function pause() {
    audioRef.current?.pause();
    setIsPlaying(false);
  }

  async function togglePlay() {
    if (isPlaying) {
      pause();
      return;
    }
    await play();
  }

  async function playTrack(index: number) {
    if (index < 0 || index >= safeTracks.length) return;
    setCurrentIndex(index);
    setIsPlaying(true);
  }

  async function playNext() {
    const nextIndex = (currentIndex + 1) % safeTracks.length;
    await playTrack(nextIndex);
  }

  async function playPrevious() {
    const previousIndex = (currentIndex - 1 + safeTracks.length) % safeTracks.length;
    await playTrack(previousIndex);
  }

  function seek(value: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setProgress(value);
  }

  function setVolume(value: number) {
    const nextVolume = Math.min(1, Math.max(0, value));
    setVolumeState(nextVolume);
  }

  const value = useMemo<MusicPlayerContextValue>(() => ({
    tracks: safeTracks,
    currentTrack,
    currentIndex,
    isPlaying,
    progress,
    duration,
    volume,
    play,
    pause,
    togglePlay,
    playTrack,
    playNext,
    playPrevious,
    seek,
    setVolume,
  }), [safeTracks, currentTrack, currentIndex, isPlaying, progress, duration, volume]);

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime || 0)}
        onEnded={playNext}
      />
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider');
  }
  return context;
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${rest}`;
}
