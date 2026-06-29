'use client';

import Logo from '@/components/shared/Logo';
import signupUser from '@/lib/auth/signup-user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, SubmitEvent } from 'react';

const SignupPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSignup = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage({
        type: 'error',
        text: 'All fields are required!',
      });
      return;
    }

    const result = await signupUser(name, email, password);

    if (result.type === 'error') {
      setMessage({
        type: 'error',
        text: result.text,
      });
      return;
    }

    setMessage({
      type: 'success',
      text: 'Signup successful! Redirecting...',
    });

    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <div className='h-screen flex justify-center items-center w-full bg-bg-soft'>
      <div className='bg-bg border border-border flex flex-col items-center px-6 lg:px-12 py-10 rounded-xl w-[90%] max-w-105 shadow-lg hover:shadow-xl transition'>
        <Logo />

        <h2 className='text-2xl font-bold text-text mt-7 mb-8 text-center'>
          Signup to Nextify
        </h2>

        <form onSubmit={handleSignup} className='w-full'>
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
            value={name}
            onChange={e => setName(e.target.value)}
            type='text'
            placeholder='Name'
            className='w-full outline-none border border-border bg-bg-soft p-3 rounded-md text-text placeholder:text-text-muted mb-4 focus:border-primary transition'
          />

          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
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

          <button className='bg-primary hover:opacity-90 active:scale-[0.98] transition py-3 rounded-full w-full font-bold text-black cursor-pointer'>
            Continue
          </button>

          <div className='text-text-muted text-center my-6 text-sm'>
            <span>Already have an account?</span>

            <Link href='/login' className='ml-2 text-primary hover:underline'>
              Sign in now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
