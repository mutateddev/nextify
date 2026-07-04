import { Song } from '@/types/song';
import Image from 'next/image';
import useMusic from '../context/useMusic';

const QueueList = () => {
  const { currentIndex, setCurrentIndex, queue, setQueue } = useMusic();

  const startPlayingSong = (songs: Song[], i: number) => {
    setCurrentIndex(i);
    setQueue(songs);
  };

  return (
    <div>
      <h3 className='text-text-muted font-semibold text-sm mb-3'>Up Next</h3>

      <div className='space-y-2'>
        {queue.map((song, i) => {
          const isCurrentSong = i === currentIndex;

          return (
            <div
              key={song.id}
              onClick={() => startPlayingSong(queue, i)}
              className={`group flex items-center gap-3 rounded-lg p-2 cursor-pointer transition ${
                isCurrentSong
                  ? 'bg-primary/15 ring-1 ring-primary'
                  : 'hover:bg-surface-hover'
              }`}
            >
              <Image
                src={song.cover_image_url}
                width={40}
                height={40}
                alt={song.title}
                className='w-10 h-10 rounded-md object-cover'
              />

              <div className='min-w-0 flex-1'>
                <p
                  className={`truncate transition ${
                    isCurrentSong
                      ? 'text-primary font-semibold'
                      : 'text-text group-hover:text-primary'
                  }`}
                >
                  {song.title}
                </p>

                <p className='truncate text-xs text-text-muted'>
                  {song.artist}
                </p>
              </div>

              {isCurrentSong && (
                <div className='flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-primary animate-pulse' />
                  <span className='text-xs text-primary'>Playing</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QueueList;
