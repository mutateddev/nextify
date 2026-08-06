'use client';

import { supabase } from '@/lib/supabase-client';
import { useQuery } from '@tanstack/react-query';
import type { Song } from '@/types/song';
import { Play, Trash2 } from 'lucide-react';
import Image from 'next/image';

import useMusic from '../context/useMusic';
import SongCardSkeleton from '@/components/ui/SongCardSkeleton';
import EmptySongState from './EmptySongState';

const AllSongs = () => {
  const { setCurrentIndex, setQueue } = useMusic();

  const getAllSongs = async () => {
    const { data, error } = await supabase.from('songs').select('*');

    if (error) throw new Error(error.message);
    return data;
  };

  const {
    data: songs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['allSongs'],
    queryFn: getAllSongs,
  });

  const startPlayingSong = (songs: Song[], index: number) => {
    setCurrentIndex(index);
    setQueue(songs);
  };

  if (isError) {
    return (
      <div className='flex min-h-[50vh] flex-col items-center justify-center px-4 text-center'>
        <Trash2 size={28} className='mb-3 text-red-500' />
        <p className='font-medium text-text'>Failed to load library</p>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-black transition hover:opacity-90 active:scale-95'
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='mx-3 mt-4 min-h-[calc(100dvh-8rem)] rounded-2xl bg-bg-soft p-4 sm:mx-4 sm:p-6 md:mx-6'>
      <h2 className='mb-4 font-sora text-lg font-bold text-text sm:text-xl md:mb-6'>
        New Releases
      </h2>

      {!isLoading && (!songs || songs.length === 0) ? (
        <EmptySongState />
      ) : (
        <div className='grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {isLoading && <SongCardSkeleton />}

          {songs?.map((song: Song, index: number) => (
            <div
              key={song.id}
              onClick={() => startPlayingSong(songs, index)}
              className='group flex cursor-pointer flex-col rounded-xl bg-surface p-2.5 transition-all duration-300 hover:bg-surface-hover hover:shadow-lg sm:p-3'
            >
              <div className='relative aspect-square w-full overflow-hidden rounded-lg bg-bg-soft'>
                <Image
                  src={song.cover_image_url}
                  alt={song.title}
                  fill
                  sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                  className='object-cover transition duration-300 group-hover:scale-105'
                />

                <button
                  aria-label={`Play ${song.title}`}
                  className='absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-primary text-black shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 md:size-10 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100'
                >
                  <Play size={18} fill='currentColor' className='ml-0.5' />
                </button>
              </div>

              <div className='mt-2.5 min-w-0'>
                <p className='truncate text-sm font-semibold text-text transition group-hover:text-primary'>
                  {song.title}
                </p>
                <p className='truncate text-xs text-text-muted mt-0.5'>
                  {song.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSongs;
