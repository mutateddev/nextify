'use client';

import { ReactNode, useState } from 'react';
import musicCtx, { MusicCtxType } from './music-context';

const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [isQueueModalOpen, setIsQueueModalOpen] = useState(false);

  const ctxValue: MusicCtxType = {
    isQueueModalOpen,
    setIsQueueModalOpen,
  };

  return <musicCtx.Provider value={ctxValue}>{children}</musicCtx.Provider>;
};

export default MusicProvider;
