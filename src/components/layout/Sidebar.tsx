'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Library, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import useSession from '@/hooks/useSession';

const playlists = [
  {
    id: 1,
    title: 'Midnight Echoes',
    artist: 'Neon Skyline',
    cover: '/images/cover-1.jpeg',
  },
  {
    id: 2,
    title: 'Velvet Nights',
    artist: 'Luna Wave',
    cover: '/images/cover-2.jpeg',
  },
  {
    id: 3,
    title: 'Neon Dreams',
    artist: 'Cyber Aura',
    cover: '/images/cover-3.jpeg',
  },
  {
    id: 4,
    title: 'After Hours',
    artist: 'Night Drive',
    cover: '/images/cover-4.jpeg',
  },
  {
    id: 5,
    title: 'Golden Static',
    artist: 'Echo Room',
    cover: '/images/cover-5.jpeg',
  },
];

const Sidebar = () => {
  const { session, loading } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        <p className='text-text-muted text-sm mb-6 max-w-[220px]'>
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
        className={`fixed left-0 lg:left-2 bg-surface/80 backdrop-blur-md top-20 w-72 h-[calc(100vh-6rem)] border border-border rounded-xl p-3 overflow-y-auto transition-all duration-500 ${
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

        <div className='space-y-2'>
          {playlists.map(item => (
            <div
              key={item.id}
              className='flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-surface-hover transition group relative'
            >
              <button className='absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-bg-soft border border-border text-text-muted hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition cursor-pointer'>
                <Trash2 size={16} />
              </button>

              <Image
                src={item.cover}
                alt={item.title}
                width={40}
                height={40}
                className='w-10 h-10 rounded-md object-cover'
              />

              <div className='min-w-0'>
                <p className='text-text font-medium truncate group-hover:text-primary transition'>
                  {item.title}
                </p>

                <p className='text-text-muted text-sm truncate'>
                  {item.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className='lg:hidden fixed bottom-5 left-5 w-12 h-12 rounded-full bg-bg-soft border border-border text-text hover:text-primary hover:border-primary transition grid place-items-center z-50'
      >
        <Library />
      </button>
    </div>
  );
};

export default Sidebar;
