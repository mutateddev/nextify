import { Play } from 'lucide-react';

const EmptySongState = () => {
  return (
    <div className='min-h-[90vh] bg-bg-soft my-20 p-6 lg:ml-78 rounded-xl mx-4 flex flex-col items-center justify-center text-center'>
      <div className='w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-4'>
        <Play className='text-text-muted' size={22} />
      </div>

      <h2 className='text-xl font-semibold text-text mb-2'>No songs yet</h2>

      <p className='text-text-muted text-sm max-w-md'>
        Start building your library by uploading your first track.
      </p>

      <a
        href='/upload-song'
        className='mt-6 px-6 py-3 rounded-full bg-primary text-black font-semibold hover:opacity-90 transition'
      >
        Add your first song
      </a>
    </div>
  );
};

export default EmptySongState;
