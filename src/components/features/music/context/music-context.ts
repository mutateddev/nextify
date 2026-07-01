import { createContext } from 'react';
import { type Song } from '@/types/song';

export type MusicCtxType = {
  isQueueModalOpen: boolean;
  setIsQueueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  currentMusic: Song | null;

  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;

  queue: Song[];
  setQueue: React.Dispatch<React.SetStateAction<Song[]>>;

  playNext: () => void;
  playPrev: () => void;
};

const musicCtx = createContext<MusicCtxType | null>(null);

export default musicCtx;
