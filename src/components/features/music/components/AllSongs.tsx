import Image from 'next/image';

const AllSongs = () => {
  return (
    <div className='min-h-[90vh] bg-bg-soft my-20 p-6 lg:ml-78 rounded-xl mx-4'>
      {/* HEADER */}
      <h2 className='text-xl text-text font-semibold font-sora mb-4'>
        New Releases
      </h2>

      {/* GRID */}
      <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {/* 1 */}
        <div className='group bg-surface p-3 rounded-lg cursor-pointer hover:bg-surface-hover transition'>
          <Image
            src='/images/cover-1.jpeg'
            alt='Neon Drift'
            width={300}
            height={300}
            className='w-full h-52 object-cover rounded-md'
          />

          <div className='mt-3'>
            <p className='text-text font-semibold group-hover:text-primary transition truncate'>
              Neon Drift
            </p>
            <p className='text-text-muted text-sm'>Synthwave Collective</p>
          </div>
        </div>

        {/* 2 */}
        <div className='group bg-surface p-3 rounded-lg cursor-pointer hover:bg-surface-hover transition'>
          <Image
            src='/images/cover-2.jpeg'
            alt='Midnight Echoes'
            width={300}
            height={300}
            className='w-full h-52 object-cover rounded-md'
          />

          <div className='mt-3'>
            <p className='text-text font-semibold group-hover:text-primary transition truncate'>
              Midnight Echoes
            </p>
            <p className='text-text-muted text-sm'>Neon Skyline</p>
          </div>
        </div>

        {/* 3 */}
        <div className='group bg-surface p-3 rounded-lg cursor-pointer hover:bg-surface-hover transition'>
          <Image
            src='/images/cover-3.jpeg'
            alt='Velvet Nights'
            width={300}
            height={300}
            className='w-full h-52 object-cover rounded-md'
          />

          <div className='mt-3'>
            <p className='text-text font-semibold group-hover:text-primary transition truncate'>
              Velvet Nights
            </p>
            <p className='text-text-muted text-sm'>Luna Wave</p>
          </div>
        </div>

        {/* 4 */}
        <div className='group bg-surface p-3 rounded-lg cursor-pointer hover:bg-surface-hover transition'>
          <Image
            src='/images/cover-4.jpeg'
            alt='After Hours'
            width={300}
            height={300}
            className='w-full h-52 object-cover rounded-md'
          />

          <div className='mt-3'>
            <p className='text-text font-semibold group-hover:text-primary transition truncate'>
              After Hours
            </p>
            <p className='text-text-muted text-sm'>Night Drive</p>
          </div>
        </div>

        {/* 5 */}
        <div className='group bg-surface p-3 rounded-lg cursor-pointer hover:bg-surface-hover transition'>
          <Image
            src='/images/cover-5.jpeg'
            alt='Golden Static'
            width={300}
            height={300}
            className='w-full h-52 object-cover rounded-md'
          />

          <div className='mt-3'>
            <p className='text-text font-semibold group-hover:text-primary transition truncate'>
              Golden Static
            </p>
            <p className='text-text-muted text-sm'>Echo Room</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSongs;
