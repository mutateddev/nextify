'use client';

import { useContext } from 'react';
import musicCtx from './music-context';

const useMusic = () => {
  const ctx = useContext(musicCtx);
  if (!ctx) throw new Error('the context just available inside the provider');
  return ctx;
};

export default useMusic;
