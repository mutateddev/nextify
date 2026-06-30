'use client';

import { ReactNode, useState } from 'react';
import musicCtx, { MusicCtxType } from './music-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);

  const ctxValue: MusicCtxType = {
    isQueueModalOpen,
    setIsQueueModalOpen,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <musicCtx.Provider value={ctxValue}>{children}</musicCtx.Provider>
    </QueryClientProvider>
  );
};

export default MusicProvider;
