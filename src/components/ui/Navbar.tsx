import { HouseIcon, Search } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full h-14 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-border z-50'>
      {/* LEFT */}
      <div className='flex items-center gap-6'>
        <h1 className='glow-text text-3xl font-sora select-none cursor-pointer'>
          <Link href='/'>Nextify</Link>
        </h1>

        <Link href='/'>
          <HouseIcon
            size={26}
            strokeWidth={2.5}
            className='text-text-muted hover:text-text transition'
          />
        </Link>

        {/* SEARCH */}
        <div className='flex items-center gap-3 h-11 w-[360px] px-4 rounded-full bg-bg-soft border border-border focus-within:border-primary transition'>
          <Search className='text-text-muted shrink-0' size={18} />

          <input
            type='text'
            placeholder='What do you want to play?'
            className='w-full bg-transparent outline-none text-text placeholder:text-text-muted'
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className='flex items-center gap-6'>
        <div className='flex gap-5 text-text-muted font-medium pr-6 border-r border-border'>
          <a href='#' className='hover:text-text transition'>
            Premium
          </a>
          <a href='#' className='hover:text-text transition'>
            Support
          </a>
          <a href='#' className='hover:text-text transition'>
            Download
          </a>
        </div>

        <Link
          href='/login'
          className='h-10 px-6 flex items-center rounded-full bg-bg text-text font-semibold hover:bg-surface-hover transition'
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
