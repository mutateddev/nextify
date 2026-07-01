import { supabase } from '@/lib/supabase-client';
import { useQuery } from '@tanstack/react-query';
import useMusic from '../context/useMusic';
import Image from 'next/image';
import DeleteSongButton from './DeleteSongButton';
import { Library } from 'lucide-react';
import { type Song } from '@/types/song';

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

  const startPlayingSong = (songs: Song[], i: number) => {
    setCurrentIndex(i);
    setQueue(songs);
  };

  // LOADING UI
  if (isLoading) {
    return (
      <div className='space-y-3 animate-pulse'>
        <div className='h-5 w-32 bg-surface-hover rounded mb-4' />

        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-md bg-surface-hover' />

            <div className='flex-1 space-y-2'>
              <div className='h-3 w-28 bg-surface-hover rounded' />
              <div className='h-2 w-20 bg-surface-hover rounded' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ERROR UI
  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center'>
        <Library className='text-red-500 mb-2' size={20} />

        <p className='text-text font-medium'>Failed to load songs</p>

        <p className='text-text-muted text-sm mt-1'>
          {(error as Error).message}
        </p>

        <button
          onClick={() => window.location.reload()}
          className='mt-4 px-4 py-2 rounded-full bg-primary text-black text-sm font-medium hover:opacity-90 transition'
        >
          Retry
        </button>
      </div>
    );
  }

  //  EMPTY STATE
  if (!userPlaylist || userPlaylist.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-10 text-center text-text-muted'>
        <Library size={28} className='mb-2' />
        <p>No songs found</p>
      </div>
    );
  }

  //  SUCCESS UI
  return (
    <div className='space-y-2'>
      {userPlaylist.map((song, i) => (
        <div
          key={song.id}
          onClick={() => startPlayingSong(userPlaylist, i)}
          className='flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-surface-hover transition group relative'
        >
          <DeleteSongButton
            songId={song.id}
            imagePath={song.cover_image_url}
            audioPath={song.audio_url}
          />
          <Image
            src={song.cover_image_url}
            alt={song.title}
            loading='eager'
            width={40}
            height={40}
            className='w-10 h-10 rounded-md object-cover'
          />

          <div className='min-w-0'>
            <p className='text-text font-medium truncate group-hover:text-primary transition'>
              {song.title}
            </p>

            <p className='text-text-muted text-sm truncate'>{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LibraryList;
