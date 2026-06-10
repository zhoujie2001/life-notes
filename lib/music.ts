import tracks from '@/content/music.json';
import type { Track } from '@/types/music';

export function getTracks(): Track[] {
  return tracks as Track[];
}

export function getDefaultTrack(): Track {
  const list = getTracks();
  return list.find((track) => track.isDefaultBgm) ?? list[0];
}
