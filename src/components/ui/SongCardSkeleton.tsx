const SongCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className='bg-surface p-3 rounded-lg'>
          <div className='w-full h-52 bg-surface-hover rounded-md animate-pulse' />
          <div className='mt-3 space-y-2'>
            <div className='h-4 w-3/4 bg-surface-hover rounded animate-pulse' />
            <div className='h-3 w-1/2 bg-surface-hover rounded animate-pulse' />
          </div>
        </div>
      ))}
    </>
  );
};

export default SongCardSkeleton;
