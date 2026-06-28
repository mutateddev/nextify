import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import AllSongs from '@/components/features/music/components/AllSongs';
import MusicPlayer from '@/components/features/music/components/MusicPlayer';
import Queue from '@/components/features/music/components/Queue';
import MusicProvider from '@/components/features/music/context/MusicProvider';

export default function Home() {
  return (
    <div className='h-full'>
      <Navbar />
      <MusicProvider>
        <main>
          <Sidebar />
          <AllSongs />
          <MusicPlayer />
          <Queue />
        </main>
      </MusicProvider>
    </div>
  );
}
