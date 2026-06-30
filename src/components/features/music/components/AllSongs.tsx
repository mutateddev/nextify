'use client';

import { supabase } from '@/lib/supabase-client';
import { useQuery } from '@tanstack/react-query';
import { type Song } from '@/types/song';
import { Play, Trash2 } from 'lucide-react';
import Image from 'next/image';

const tempSongs = [
  {
    id: 1,
    title: 'Neon Drift',
    artist: 'Synthwave Collective',
    cover: '/images/cover-1.jpeg',
  },
  {
    id: 2,
    title: 'Midnight Echoes',
    artist: 'Neon Skyline',
    cover: '/images/cover-2.jpeg',
  },
  {
    id: 3,
    title: 'Velvet Nights',
    artist: 'Luna Wave',
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

const AllSongs = () => {
  const getAllSongs = async () => {
    const { data, error } = await supabase.from('songs').select('*');
    if (error) {
      console.log('fetch all songs error');
      return;
    }

    return data;
  };

  const {
    data: songs,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryFn: getAllSongs,
    queryKey: ['allSongs'],
  });

  if (isLoading)
    return (
      <div className='space-y-3 animate-pulse'>
        <div className='h-5 w-32 bg-surface-hover rounded-md mb-4' />

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className='flex items-center gap-3 p-2 rounded-lg bg-surface/40'
          >
            <div className='w-10 h-10 bg-surface-hover rounded-md' />

            <div className='flex-1 space-y-2'>
              <div className='h-3 w-1/2 bg-surface-hover rounded' />
              <div className='h-2 w-1/3 bg-surface-hover rounded' />
            </div>
          </div>
        ))}
      </div>
    );
  if (isError)
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center'>
        <Trash2 size={20} className='text-red-500 mb-2' />

        <p className='text-text font-medium'>Failed to load library</p>
        <p className='text-text-muted text-sm mt-1'>Please try again later</p>

        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 rounded-full bg-primary text-black text-sm font-medium hover:opacity-90 transition'
        >
          Retry
        </button>
      </div>
    );

  if (!songs || songs.length === 0) {
    return (
      <div className='min-h-[90vh] bg-bg-soft my-20 p-6 lg:ml-78 rounded-xl mx-4 flex flex-col items-center justify-center text-center'>
        <div className='w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4'>
          <Play className='text-text-muted' size={22} />
        </div>

        <h2 className='text-xl font-semibold text-text mb-2'>No songs yet</h2>

        <p className='text-text-muted text-sm max-w-md'>
          Start building your library by uploading your first track.
        </p>

        <a
          href='/upload-song'
          className='mt-6 px-6 py-3 rounded-full bg-primary text-black font-semibold hover:opacity-90 transition'
        >
          Add your first song
        </a>
      </div>
    );
  }

  return (
    <div className='min-h-[90vh] bg-bg-soft my-20 p-6 lg:ml-78 rounded-xl mx-4'>
      <h2 className='text-xl text-text font-semibold font-sora mb-4'>
        New Releases
      </h2>

      <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {songs?.map((song: Song) => (
          <div
            key={song.id}
            className='group bg-surface p-3 rounded-lg cursor-pointer hover:bg-surface-hover transition'
          >
            <div className='relative'>
              <Image
                src={song.cover_image_url}
                alt={song.title}
                width={300}
                height={300}
                loading='lazy'
                className='w-full h-52 object-cover rounded-md'
              />

              <div className='absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200'>
                <button className='w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition '>
                  <Play size={28} />
                </button>
              </div>
            </div>

            <div className='mt-3'>
              <p className='text-text font-semibold group-hover:text-primary transition truncate'>
                {song.title}
              </p>
              <p className='text-text-muted text-sm'>{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSongs;
