'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Library, Plus } from 'lucide-react';

import useSession from '@/hooks/useSession';
import LibraryList from '../features/music/components/LibraryList';

const Sidebar = () => {
  const { session, loading } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userId = session?.user.id;

  const sidebarClass = `fixed left-0 top-16 z-40 h-[calc(100dvh-4rem)] w-72 max-w-[85vw] flex-col border-r border-border bg-surface/95 backdrop-blur-md transition-transform duration-300 lg:left-0 lg:w-72 lg:translate-x-0 xl:w-80 ${
    sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
  }`;

  return (
    <>
      <aside className={sidebarClass}>
        <div className='flex h-full flex-col overflow-y-auto p-4 custom-scrollbar'>
          {loading ? (
            <div className='animate-pulse space-y-4 p-2'>
              <div className='h-6 w-32 rounded bg-surface-hover mb-6' />
              {[1, 2, 3, 4, 5].map(item => (
                <div key={item} className='flex items-center gap-3'>
                  <div className='size-10 shrink-0 rounded-md bg-surface-hover' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-28 rounded bg-surface-hover' />
                    <div className='h-3 w-20 rounded bg-surface-hover' />
                  </div>
                </div>
              ))}
            </div>
          ) : !session ? (
            <div className='flex h-full flex-col items-center justify-center px-2 text-center'>
              <div className='mb-4 flex size-14 items-center justify-center rounded-full border border-border bg-bg-soft'>
                <Library size={26} className='text-primary' />
              </div>

              <h2 className='font-sora text-lg font-bold text-text mb-2'>
                Your Library
              </h2>

              <p className='mb-6 max-w-xs text-xs leading-relaxed text-text-muted'>
                Sign in to save songs, manage playlists and access your music
                library.
              </p>

              <Link
                href='/login'
                onClick={() => setSidebarOpen(false)}
                className='w-full rounded-full bg-primary py-2.5 text-center text-sm font-semibold text-black transition hover:opacity-90 active:scale-95'
              >
                Login
              </Link>

              <Link
                href='/signup'
                onClick={() => setSidebarOpen(false)}
                className='mt-3 text-xs font-medium text-text-muted transition hover:text-primary'
              >
                Create an account
              </Link>
            </div>
          ) : (
            <div className='flex flex-col h-full'>
              <div className='mb-4 flex items-center justify-between px-1'>
                <h2 className='flex items-center gap-2 font-sora text-base font-bold text-text'>
                  <Library size={20} className='text-primary' />
                  Your Library
                </h2>

                <Link
                  href='/upload-song'
                  onClick={() => setSidebarOpen(false)}
                  className='flex size-8 items-center justify-center rounded-full bg-bg-soft text-text-muted transition hover:bg-surface-hover hover:text-primary'
                  aria-label='Upload song'
                >
                  <Plus size={18} />
                </Link>
              </div>

              <div className='flex-1 overflow-y-auto pr-1 pb-20'>
                <LibraryList userId={userId} />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className='fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden'
        />
      )}

      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        aria-label='Toggle Sidebar'
        className='fixed left-0 top-20 z-40 flex h-12 w-7 cursor-pointer items-center justify-center rounded-r-xl border border-l-0 border-border bg-surface text-text shadow-md transition-all duration-300 hover:w-8 hover:bg-surface-hover lg:hidden'
      >
        {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>
    </>
  );
};

export default Sidebar;
