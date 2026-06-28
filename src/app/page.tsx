import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import AllSongs from '@/components/features/music/components/AllSongs';

export default function Home() {
  return (
    <div className='h-full'>
      <Navbar />
      <main>
        <Sidebar />
        <AllSongs />
      </main>
    </div>
  );
}
