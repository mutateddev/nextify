'use client';

import { useState, type SubmitEvent } from 'react';
import Logo from '@/components/shared/Logo';
import Link from 'next/link';
import loginUser from '@/lib/auth/login-user';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage({
        type: 'error',
        text: 'All fields are required!',
      });
      return;
    }
    const result = await loginUser(email, password);

    if (result.type === 'error') {
      setMessage({
        type: 'error',
        text: result.text,
      });
      return;
    }

    setMessage({ type: 'success', text: 'login successful.' });

    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className='h-screen flex justify-center items-center w-full bg-bg-soft'>
      <div className='bg-bg border border-border flex flex-col items-center px-6 lg:px-12 py-10 rounded-xl w-[90%] max-w-105 shadow-lg'>
        <Logo />

        <h2 className='text-2xl font-bold text-text mt-7 mb-8 text-center'>
          Log in to Nextify
        </h2>

        <form onSubmit={handleLogin} className='w-full'>
          {message && (
            <div
              className={`mb-4 rounded-md px-4 py-3 text-center text- font-medium
          ${
            message.type === 'error'
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-green-500/10 text-green-400 border border-green-500/20'
          }`}
            >
              {message.text}
            </div>
          )}
          <input
            value={email}
            type='email'
            onChange={e => setEmail(e.target.value)}
            placeholder='Email'
            className='w-full outline-none border border-border bg-bg-soft p-3 rounded-md text-text placeholder:text-text-muted mb-4 focus:border-primary transition'
          />

          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
            placeholder='Password'
            className='w-full outline-none border border-border bg-bg-soft p-3 rounded-md text-text placeholder:text-text-muted mb-6 focus:border-primary transition'
          />

          <button className='bg-primary hover:opacity-90 transition py-3 rounded-full w-full font-bold text-black cursor-pointer'>
            Continue
          </button>

          <div className='text-text-muted text-center my-6 text-sm'>
            <span>Don&apos;t have an account?</span>

            <Link href='/signup' className='ml-2 text-primary hover:underline'>
              Sign up now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
