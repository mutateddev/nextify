import { Play } from 'lucide-react';
import Image from 'next/image';

const songs = [
  {
    id: 1,
    title: 'Neon Drift',
    artist: 'Synthwave Collective',
    cover: '/images/cover-1.jpeg',
  },
  {
    id: 2,
    title: 'Midnight Echoes',
    artist: 'Neon Skyline',
    cover: '/images/cover-2.jpeg',
  },
  {
    id: 3,
    title: 'Velvet Nights',
    artist: 'Luna Wave',
    cover: '/images/cover-3.jpeg',
  },
  {
    id: 4,
    title: 'After Hours',
    artist: 'Night Drive',
    cover: '/images/cover-4.jpeg',
  },
  {
    id: 5,
    title: 'Golden Static',
    artist: 'Echo Room',
    cover: '/images/cover-5.jpeg',
  },
];

const AllSongs = () => {
  return (
    <div className='min-h-[90vh] bg-bg-soft my-20 p-6 lg:ml-78 rounded-xl mx-4'>
      <h2 className='text-xl text-text font-semibold font-sora mb-4'>
        New Releases
      </h2>

      <div className='grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {songs.map(song => (
          <div
            key={song.id}
            className='group bg-surface p-3 rounded-lg cursor-pointer hover:bg-surface-hover transition'
          >
            <div className='relative'>
              <Image
                src={song.cover}
                alt={song.title}
                width={300}
                height={300}
                loading='lazy'
                className='w-full h-52 object-cover rounded-md'
              />

              <div className='absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200'>
                <button className='w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition '>
                  <Play size={28} />
                </button>
              </div>
            </div>

            <div className='mt-3'>
              <p className='text-text font-semibold group-hover:text-primary transition truncate'>
                {song.title}
              </p>
              <p className='text-text-muted text-sm'>{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSongs;
