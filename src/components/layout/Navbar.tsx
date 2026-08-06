'use client';

import { Search, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from '../shared/Logo';
import ToggleTheme from '../ui/ToggleTheme';
import useSession from '@/hooks/useSession';
import logoutUser from '@/lib/auth/logout-user';

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
    <nav className='fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-surface/85 px-4 backdrop-blur-md sm:px-6'>
      <div className='flex items-center gap-4 min-w-0'>
        <Logo />
      </div>

      <div className='hidden h-10 w-1/3 max-w-md items-center gap-2.5 rounded-full border border-border bg-bg-soft px-4 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary md:flex'>
        <Search size={18} className='shrink-0 text-text-muted' />
        <input
          type='text'
          placeholder='Search music, artists...'
          className='w-full bg-transparent text-sm text-text outline-none placeholder:text-text-muted'
        />
      </div>

      <div className='flex items-center gap-2.5 sm:gap-4'>
        <div className='hidden items-center gap-5 border-r border-border pr-5 text-sm font-medium text-text-muted xl:flex'>
          <a className='cursor-pointer transition hover:text-text'>Premium</a>
          <a className='cursor-pointer transition hover:text-text'>Support</a>
          <a className='cursor-pointer transition hover:text-text'>Download</a>
        </div>

        <ToggleTheme />

        {!loading &&
          (session ? (
            <>
              <button
                onClick={handleLogout}
                className='flex size-10 cursor-pointer items-center justify-center rounded-full bg-bg-soft text-text transition hover:bg-surface-hover active:scale-95 sm:hidden'
                aria-label='Logout'
              >
                <LogOut size={18} />
              </button>

              <button
                onClick={handleLogout}
                className='hidden h-10 cursor-pointer rounded-full bg-bg-soft px-5 text-sm font-semibold text-text transition hover:bg-surface-hover active:scale-95 sm:block'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href='/login'
                className='flex size-10 cursor-pointer items-center justify-center rounded-full bg-primary text-black transition hover:opacity-90 active:scale-95 sm:hidden'
                aria-label='Login'
              >
                <LogIn size={18} />
              </Link>

              <Link
                href='/login'
                className='hidden h-10 cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-black transition hover:opacity-90 active:scale-95 sm:flex'
              >
                Login
              </Link>
            </>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
