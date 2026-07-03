'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import Logo from '../shared/Logo';
import ToggleTheme from '../ui/ToggleTheme';
import useSession from '@/hooks/useSession';
import logoutUser from '@/lib/auth/logout-user';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { session, loading } = useSession();

  const handleLogout = async () => {
    const result = await logoutUser();

    if (result.type === 'success') {
      router.push('/');
    }
  };

  return (
    <nav className='fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md border-b border-border z-50'>
      {/* LEFT */}
      <div className='flex items-center gap-6'>
        <Logo />

        {/* <Link href='/'>
          <HouseIcon
            size={26}
            strokeWidth={2.5}
            className='text-text-muted hover:text-text transition'
          />
        </Link> */}
      </div>

      {/* Center */}
      <div className='flex items-center gap-3 h-11 w-1/3 px-4 rounded-full bg-bg-soft border border-border focus-within:border-primary transition'>
        <Search className='text-text-muted shrink-0' size={18} />
        <input
          type='text'
          placeholder='What do you want to play?'
          className='w-full bg-transparent outline-none text-text placeholder:text-text-muted'
        />
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
        <ToggleTheme />
        {!loading && (
          <>
            {session ? (
              <button
                onClick={handleLogout}
                className='h-10 px-6 flex items-center rounded-full bg-bg text-text font-semibold hover:bg-surface-hover transition cursor-pointer'
              >
                Logout
              </button>
            ) : (
              <Link
                href='/login'
                className='h-10 px-6 flex items-center rounded-full bg-bg text-text font-semibold hover:bg-surface-hover transition'
              >
                Login
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
