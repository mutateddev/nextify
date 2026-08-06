const SongCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className='rounded-xl bg-surface p-2.5 sm:p-3'>
          <div className='aspect-square w-full animate-pulse rounded-lg bg-surface-hover' />

          <div className='mt-3 space-y-2'>
            <div className='h-4 w-3/4 animate-pulse rounded bg-surface-hover' />
            <div className='h-3 w-1/2 animate-pulse rounded bg-surface-hover' />
          </div>
        </div>
      ))}
    </>
  );
};

export default SongCardSkeleton;
