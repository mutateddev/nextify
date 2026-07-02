'use client';

import Image from 'next/image';
import useMusic from '../context/useMusic';

const Queue = () => {
  const {
    isQueueModalOpen,
    currentMusic,
    currentIndex,
    setCurrentIndex,
    queue,
    setQueue,
  } = useMusic();

  const startPlayingSong = (songs: Song[], i: number) => {
    setCurrentIndex(i);
    setQueue(songs);
  };

  if (!isQueueModalOpen) return null;
  return (
    <div className='fixed bottom-24 right-6 z-50 w-full max-w-sm h-[75vh] bg-bg/90 backdrop-blur-md border border-border shadow-xl rounded-xl overflow-hidden flex flex-col'>
      {/* HEADER */}
      <div className='p-4 border-b border-border'>
        <h2 className='text-text font-sora font-bold text-lg'>Queue</h2>
        <p className='text-text-muted text-xs mt-1'>Your upcoming tracks</p>
      </div>

      {/* CONTENT */}
      <div className='p-4 overflow-y-auto flex-1 space-y-6'>
        {/* NOW PLAYING */}
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <span className='h-2 w-2 rounded-full bg-primary animate-pulse' />
            <span className='text-xs text-primary font-medium'>
              Now Playing
            </span>
          </div>

          <div className='flex items-center gap-3 p-2 rounded-lg bg-surface hover:bg-surface-hover transition cursor-pointer'>
            {currentMusic && (
              <>
                <Image
                  src={currentMusic?.cover_image_url}
                  width={40}
                  height={40}
                  alt={currentMusic.title}
                  loading='eager'
                  className='w-10 h-10 object-cover rounded-md'
                />

                <div className='min-w-0'>
                  <p className='text-text font-medium truncate'>
                    {currentMusic.title}
                  </p>
                  <p className='text-text-muted text-xs truncate'>
                    {currentMusic.artist}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* QUEUE LIST */}
        <div>
          <h3 className='text-text-muted font-semibold text-sm mb-3'>
            Up Next
          </h3>

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
      </div>
    </div>
  );
};

export default Queue;
