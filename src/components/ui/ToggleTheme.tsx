'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return <div className='size-9 sm:size-10' />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label='Toggle theme'
      className='flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-bg-soft text-text transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-95 sm:size-10'
    >
      <span className='transition-transform duration-300 hover:rotate-12'>
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </span>
    </button>
  );
};

export default ToggleTheme;
