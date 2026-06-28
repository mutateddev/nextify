import Logo from '@/components/shared/Logo';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className='h-screen flex justify-center items-center w-full bg-bg-soft'>
      <div className='bg-bg border border-border flex flex-col items-center px-6 lg:px-12 py-10 rounded-xl w-[90%] max-w-105 shadow-lg'>
        <Logo />

        <h2 className='text-2xl font-bold text-text mt-7 mb-8 text-center'>
          Log in to Nextify
        </h2>

        <form className='w-full'>
          <input
            type='text'
            placeholder='Email'
            className='w-full outline-none border border-border bg-bg-soft p-3 rounded-md text-text placeholder:text-text-muted mb-4 focus:border-primary transition'
          />

          <input
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
