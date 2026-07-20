'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Library, Plus } from 'lucide-react';
import useSession from '@/hooks/useSession';
import LibraryList from '../features/music/components/LibraryList';

const Sidebar = () => {
  const { session, loading } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user_id = session?.user.id;

  if (loading) {
    return (
      <aside className='fixed left-0 top-20 lg:left-2 w-72 h-[calc(100vh-6rem)] bg-surface/80 backdrop-blur-md border border-border rounded-xl p-3 overflow-hidden'>
        <div className='animate-pulse'>
          <div className='h-6 w-32 bg-surface-hover rounded mb-6' />

          <div className='space-y-3'>
            {[1, 2, 3, 4, 5].map(item => (
              <div key={item} className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-md bg-surface-hover' />

                <div className='flex-1'>
                  <div className='h-4 w-28 bg-surface-hover rounded mb-2' />
                  <div className='h-3 w-20 bg-surface-hover rounded' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (!session) {
    return (
      <aside className='fixed left-0 top-20 lg:left-2 w-72 h-[calc(100vh-6rem)] bg-surface/80 backdrop-blur-md border border-border rounded-xl p-6 flex flex-col justify-center items-center text-center'>
        <div className='w-16 h-16 rounded-full bg-bg-soft border border-border flex items-center justify-center mb-5'>
          <Library size={28} className='text-primary' />
        </div>

        <h2 className='text-text font-sora font-bold text-lg mb-2'>
          Your Library
        </h2>

        <p className='text-text-muted text-sm mb-6 max-w-55'>
          Sign in to save songs, manage playlists and access your music library.
        </p>

        <Link
          href='/login'
          className='w-full bg-primary text-black font-semibold py-3 rounded-full hover:opacity-90 transition text-center'
        >
          Login
        </Link>

        <Link
          href='/signup'
          className='mt-3 text-text-muted hover:text-primary transition text-sm'
        >
          Create an account
        </Link>
      </aside>
    );
  }

  return (
    <div>
      <aside
        className={`fixed left-0 lg:left-2 bg-surface/80 backdrop-blur-md top-20 w-72 h-[calc(100vh-6rem)] border border-border rounded-xl p-3 overflow-y-auto transition-all duration-500 z-40 ${
          sidebarOpen ? 'translate-x-3' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className='flex items-center justify-between p-2 mb-4'>
          <h2 className='font-sora font-bold text-text flex items-center gap-2'>
            <Library size={18} />
            Your Library
          </h2>

          <Link
            href='/upload-song'
            className='p-2 rounded-full bg-bg-soft hover:bg-surface-hover transition text-text-muted hover:text-primary'
          >
            <Plus size={18} />
          </Link>
        </div>

        <LibraryList userId={user_id} />
      </aside>

      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className='lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 w-8 h-14 rounded-r-xl bg-surface border border-border text-text flex items-center justify-center shadow-lg transition-all duration-300'
      >
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  );
};

export default Sidebar;
