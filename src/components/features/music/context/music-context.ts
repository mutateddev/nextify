import { createContext } from 'react';

export type MusicCtxType = {
  isQueueModalOpen: boolean;
  setIsQueueModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const musicCtx = createContext<MusicCtxType | null>(null);

export default musicCtx;
