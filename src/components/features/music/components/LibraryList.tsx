import { supabase } from '@/lib/supabase-client';
import { useQuery } from '@tanstack/react-query';
import useMusic from '../context/useMusic';
import Image from 'next/image';
import DeleteSongButton from './DeleteSongButton';
import { Library } from 'lucide-react';
import type { Song } from '@/types/song';

type LibraryListProps = {
  userId: string | undefined;
};

const LibraryList = ({ userId }: LibraryListProps) => {
  const { setQueue, setCurrentIndex } = useMusic();

  const getUserSongs = async () => {
    const { data, error } = await supabase
      .from('songs')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const {
    data: userPlaylist,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userSongs', userId],
    queryFn: getUserSongs,
    enabled: !!userId,
  });

  const startPlayingSong = (songs: Song[], index: number) => {
    setCurrentIndex(index);
    setQueue(songs);
  };

  if (isLoading) {
    return (
      <div className='animate-pulse space-y-3 pr-1'>
        <div className='mb-4 h-5 w-32 rounded bg-surface-hover' />

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='flex items-center gap-3'>
            <div className='size-10 shrink-0 rounded-md bg-surface-hover' />
            <div className='flex-1 space-y-2'>
              <div className='h-3.5 w-28 rounded bg-surface-hover' />
              <div className='h-2.5 w-20 rounded bg-surface-hover' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center px-2'>
        <Library size={24} className='mb-2 text-red-500' />
        <p className='font-medium text-text text-sm'>Failed to load songs</p>
        <p className='mt-1 text-xs text-text-muted max-w-50 truncate'>
          {(error as Error).message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className='mt-4 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-black transition hover:opacity-90 active:scale-95'
        >
          Retry
        </button>
      </div>
    );
  }

  if (!userPlaylist || userPlaylist.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center text-text-muted'>
        <Library size={28} className='mb-2 opacity-60' />
        <p className='text-xs'>No songs found</p>
      </div>
    );
  }

  return (
    <div className='space-y-1 sm:space-y-1.5'>
      {userPlaylist.map((song, index) => (
        <div
          key={song.id}
          onClick={() => startPlayingSong(userPlaylist, index)}
          className='group relative flex min-w-0 cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-surface-hover active:scale-[0.98]'
        >
          <Image
            src={song.cover_image_url}
            width={40}
            height={40}
            sizes='40px'
            alt={song.title}
            className='size-10 shrink-0 rounded-md object-cover'
          />

          <div className='min-w-0 flex-1 pr-8'>
            <p className='truncate text-sm font-medium text-text transition group-hover:text-primary'>
              {song.title}
            </p>
            <p className='truncate text-xs text-text-muted mt-0.5'>
              {song.artist}
            </p>
          </div>

          <DeleteSongButton
            songId={song.id}
            imagePath={song.cover_image_url}
            audioPath={song.audio_url}
          />
        </div>
      ))}
    </div>
  );
};

export default LibraryList;
