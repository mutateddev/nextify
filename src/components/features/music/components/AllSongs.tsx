'use client';

import { supabase } from '@/lib/supabase-client';
import { useQuery } from '@tanstack/react-query';
import { type Song } from '@/types/song';
import { Play, Trash2 } from 'lucide-react';
import Image from 'next/image';
import useMusic from '../context/useMusic';
import SongCardSkeleton from '@/components/ui/SongCardSkeleton';
import EmptySongState from './EmptySongState';

const SongsContainer = () => {
  const { setCurrentIndex, setQueue } = useMusic();
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
    isError,
  } = useQuery({
    queryFn: getAllSongs,
    queryKey: ['allSongs'],
  });

  const startPlayingSong = (songs: Song[], i: number) => {
    setCurrentIndex(i);
    setQueue(songs);
  };

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
      <div className='min-h-[90vh] bg-bg-soft my-20 p-6 lg:ml-78 rounded-xl mx-4'>
        <h2 className='text-xl text-text font-semibold font-sora mb-4'>
          New Releases
        </h2>

        <EmptySongState />
      </div>
    );
  }

  return (
    <div className='min-h-[90vh] bg-bg-soft my-20 p-6 lg:ml-78 rounded-xl mx-4'>
      <h2 className='text-xl text-text font-semibold font-sora mb-4'>
        New Releases
      </h2>
      <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {isLoading && <SongCardSkeleton />}

        {songs?.map((song: Song, i: number) => (
          <div
            key={song.id}
            onClick={() => startPlayingSong(songs, i)}
            className='group bg-surface p-3 rounded-lg cursor-pointer hover:bg-surface-hover transition'
          >
            <div className='relative'>
              <Image
                src={song.cover_image_url}
                alt={song.title}
                width={300}
                height={300}
                loading='eager'
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

export default SongsContainer;
