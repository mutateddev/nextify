'use client';

import Image from 'next/image';
import useMusic from '../context/useMusic';

const Queue = () => {
  const { isQueueModalOpen } = useMusic();
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
          <h3 className='text-primary font-semibold text-sm mb-3'>
            Now Playing
          </h3>

          <div className='flex items-center gap-3 p-2 rounded-lg bg-surface hover:bg-surface-hover transition cursor-pointer'>
            <Image
              src='/images/cover-3.jpeg'
              width={40}
              height={40}
              alt='queue image'
              className='w-10 h-10 object-cover rounded-md'
            />

            <div className='min-w-0'>
              <p className='text-text font-medium truncate'>Diamonds</p>
              <p className='text-text-muted text-xs truncate'>Solid</p>
            </div>
          </div>
        </div>

        {/* QUEUE LIST */}
        <div>
          <h3 className='text-text-muted font-semibold text-sm mb-3'>
            Up Next
          </h3>

          <div className='space-y-2'>
            {[1, 2, 3].map(item => (
              <div
                key={item}
                className='flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover transition cursor-pointer group'
              >
                <Image
                  src='/images/cover-3.jpeg'
                  width={40}
                  height={40}
                  alt='queue image'
                  className='w-10 h-10 object-cover rounded-md'
                />

                <div className='min-w-0'>
                  <p className='text-text group-hover:text-primary transition truncate'>
                    Diamonds {item}
                  </p>
                  <p className='text-text-muted text-xs truncate'>Solid</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
