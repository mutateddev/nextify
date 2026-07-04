'use client';

import Image from 'next/image';
import useMusic from '../context/useMusic';
import QueueList from './QueueList';

const Queue = () => {
  const { isQueueModalOpen, currentMusic } = useMusic();

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
        <QueueList />
      </div>
    </div>
  );
};

export default Queue;
