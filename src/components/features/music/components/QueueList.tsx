import type { Song } from '@/types/song';
import Image from 'next/image';
import useMusic from '../context/useMusic';

const QueueList = () => {
  const { currentIndex, setCurrentIndex, queue, setQueue } = useMusic();

  const startPlayingSong = (songs: Song[], index: number) => {
    setCurrentIndex(index);
    setQueue(songs);
  };

  return (
    <div>
      <h3 className='mb-2.5 text-xs font-semibold text-text-muted uppercase tracking-wider'>
        Up Next
      </h3>

      <div className='space-y-1 sm:space-y-1.5'>
        {queue.map((song, index) => {
          const isCurrentSong = index === currentIndex;

          return (
            <div
              key={song.id}
              onClick={() => startPlayingSong(queue, index)}
              className={`group flex select-none cursor-pointer items-center gap-3 rounded-lg p-2 transition active:scale-[0.98] ${
                isCurrentSong
                  ? 'bg-primary/15 ring-1 ring-primary/50'
                  : 'hover:bg-bg-soft'
              }`}
            >
              <Image
                src={song.cover_image_url}
                width={40}
                height={40}
                sizes='40px'
                alt={song.title}
                className='size-10 shrink-0 rounded-md object-cover'
              />

              <div className='min-w-0 flex-1'>
                <p
                  className={`truncate text-sm transition ${
                    isCurrentSong
                      ? 'font-bold text-primary'
                      : 'font-medium text-text group-hover:text-primary'
                  }`}
                >
                  {song.title}
                </p>

                <p className='truncate text-xs text-text-muted mt-0.5'>
                  {song.artist}
                </p>
              </div>

              {isCurrentSong && (
                <div className='flex shrink-0 items-center pr-1'>
                  <span className='size-2 animate-pulse rounded-full bg-primary' />
                  <span className='ml-2 hidden text-xs font-semibold text-primary sm:block'>
                    Playing
                  </span>
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
