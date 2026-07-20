import Link from 'next/link';
import { Play } from 'lucide-react';

const EmptySongState = () => {
  return (
    <div className='col-span-full flex flex-col items-center justify-center py-20 text-center'>
      <div className='mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-surface border border-border'>
        <Play className='text-primary' size={26} />
      </div>

      <h2 className='text-2xl font-bold text-text'>No songs yet</h2>

      <p className='mt-2 max-w-md text-sm text-text-muted'>
        library is empty. Upload your first song and start building your
        personal music collection.
      </p>

      <Link
        href='/upload-song'
        className='mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-black transition hover:opacity-90'
      >
        Upload song
      </Link>
    </div>
  );
};

export default EmptySongState;
