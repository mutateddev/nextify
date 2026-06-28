import Link from 'next/link';

const Logo = () => {
  return (
    <h1 className='glow-text text-3xl font-sora select-none cursor-pointer'>
      <Link href='/'>Nextify</Link>
    </h1>
  );
};

export default Logo;
