'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ToggleTheme = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className='flex size-10 items-center justify-center rounded-full border border-border bg-bg-soft transition hover:border-primary hover:text-primary cursor-pointer'
    >
      {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ToggleTheme;
