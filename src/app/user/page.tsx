import Logo from '@/components/shared/Logo';

const UploadSongPage = () => {
  return (
    <div className='h-screen flex justify-center items-center w-full bg-bg-soft'>
      <div className='bg-bg border border-border flex flex-col items-center px-6 lg:px-12 py-10 rounded-xl w-[90%] max-w-105 shadow-lg hover:shadow-xl transition'>
        <Logo />

        <h2 className='text-2xl font-bold text-text mt-5 mb-8 text-center'>
          Upload Song
        </h2>

        <form className='w-full space-y-6'>
          {/* TITLE */}
          <input
            type='text'
            placeholder='Song title'
            className='w-full outline-none border border-border bg-bg-soft p-3 rounded-md text-text placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition'
          />

          {/* ARTIST */}
          <input
            type='text'
            placeholder='Artist name'
            className='w-full outline-none border border-border bg-bg-soft p-3 rounded-md text-text placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition'
          />

          {/* AUDIO */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='audio' className='text-sm text-text-muted'>
              Audio file
            </label>

            <input
              id='audio'
              type='file'
              accept='audio/*'
              className='w-full text-text text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-black file:cursor-pointer hover:file:opacity-90'
            />
          </div>

          {/* COVER */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='cover' className='text-sm text-text-muted'>
              Cover image
            </label>

            <input
              id='cover'
              type='file'
              accept='image/*'
              className='w-full text-text text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-surface-hover file:text-text file:cursor-pointer hover:file:bg-surface'
            />
          </div>

          {/* BUTTON */}
          <button className='bg-primary hover:opacity-90 active:scale-[0.98] transition py-3 rounded-full w-full font-bold text-black cursor-pointer'>
            Add Song
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadSongPage;
