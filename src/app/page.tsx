import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import AllSongs from '@/components/features/music/components/AllSongs';
import MusicPlayer from '@/components/features/music/components/MusicPlayer';
import Queue from '@/components/features/music/components/Queue';
import MusicProvider from '@/components/features/music/context/MusicProvider';

export default function Home() {
  return (
    <MusicProvider>
      <div className='min-h-dvh bg-bg text-text selection:bg-primary selection:text-black'>
        <Navbar />

        <main className='relative min-h-dvh pt-16 pb-36 md:pb-28'>
          <Sidebar />

          <div className='w-full transition-all duration-300 lg:pl-72 xl:pl-80'>
            <AllSongs />
          </div>

          <MusicPlayer />
          <Queue />
        </main>
      </div>
    </MusicProvider>
  );
}
