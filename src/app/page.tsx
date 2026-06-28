import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';

export default function Home() {
  return (
    <div className='h-full'>
      <Navbar />
      <main>
        <Sidebar />
      </main>
    </div>
  );
}
