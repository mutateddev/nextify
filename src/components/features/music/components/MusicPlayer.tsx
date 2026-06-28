import {
  ListMusic,
  Pause,
  Play,
  Repeat1,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import Image from 'next/image';

const MusicPlayer = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full bg-bg/90 backdrop-blur-md border-t border-border text-text px-4 py-3 shadow-lg z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between gap-6'>
        {/* LEFT - SONG INFO */}
        <div className='flex items-center gap-4 min-w-50'>
          <Image
            src='/images/cover-2.jpeg'
            alt='cover image'
            width={48}
            height={48}
            className='w-12 h-12 object-cover rounded-md'
          />

          <div className='text-sm leading-tight'>
            <p className='text-primary font-semibold truncate'>Brain Fuel</p>
            <p className='text-text-muted text-xs truncate'>Brainy</p>
          </div>
        </div>

        {/* CENTER - CONTROLS */}
        <div className='flex flex-col items-center gap-2 flex-1 max-w-md'>
          <div className='flex items-center gap-5'>
            <button className='text-text-muted hover:text-text transition'>
              <SkipBack size={20} />
            </button>

            <button className='w-10 h-10 flex items-center justify-center rounded-full bg-primary text-black shadow-md hover:scale-105 transition'>
              <Pause size={18} />
            </button>

            <button className='text-text-muted hover:text-text transition'>
              <SkipForward size={20} />
            </button>
          </div>

          {/* PROGRESS */}
          <div className='w-full flex items-center gap-2 text-xs'>
            <span className='text-text-muted'>1:45</span>

            <input
              type='range'
              min={0}
              max={100}
              className='w-full h-1 accent-primary cursor-pointer'
            />

            <span className='text-text-muted'>5:05</span>
          </div>
        </div>

        {/* RIGHT - VOLUME */}
        <div className='flex items-center gap-3 min-w-45 justify-end'>
          <button className='text-text-muted hover:text-text transition'>
            <Repeat1 size={18} />
          </button>

          <button className='text-text-muted hover:text-text transition'>
            <ListMusic size={18} />
          </button>

          <div className='flex items-center gap-2'>
            <Volume2 size={18} className='text-text-muted' />

            <input
              type='range'
              min={0}
              max={100}
              className='w-22.5 h-1 accent-primary cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
