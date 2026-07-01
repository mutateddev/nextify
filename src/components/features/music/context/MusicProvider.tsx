'use client';

import { ReactNode, useState } from 'react';
import musicCtx, { MusicCtxType } from './music-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Song } from '@/types/song';

const queryClient = new QueryClient();

const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMusic = queue.length > 0 ? queue[currentIndex] : null;

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prvIndex => prvIndex + 1);
    }
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prvIndex => prvIndex - 1);
    }
  };

  const ctxValue: MusicCtxType = {
    isQueueModalOpen,
    setIsQueueModalOpen,

    currentMusic,

    currentIndex,
    setCurrentIndex,

    queue,
    setQueue,

    playNext,
    playPrev,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <musicCtx.Provider value={ctxValue}>{children}</musicCtx.Provider>
    </QueryClientProvider>
  );
};

export default MusicProvider;
