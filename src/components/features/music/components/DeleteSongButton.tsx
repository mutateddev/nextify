import { supabase } from '@/lib/supabase-client';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import type { MouseEvent } from 'react';

type DeleteSongButtonProps = {
  songId: number;
  imagePath: string;
  audioPath: string;
};

const DeleteSongButton = ({
  songId,
  imagePath,
  audioPath,
}: DeleteSongButtonProps) => {
  const queryClient = useQueryClient();

  const deleteSong = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const { error: imgError } = await supabase.storage
      .from('cover-images')
      .remove([imagePath]);

    if (imgError) {
      console.log('image delete error', imgError.message);
      return;
    }

    const { error: audioError } = await supabase.storage
      .from('songs')
      .remove([audioPath]);

    if (audioError) {
      console.log('audio delete error', audioError.message);
      return;
    }

    const { error: deleteError } = await supabase
      .from('songs')
      .delete()
      .eq('id', songId);

    if (deleteError) {
      console.log('table delete error', deleteError.message);
      return;
    }

    queryClient.invalidateQueries({
      queryKey: ['allSongs'],
    });

    queryClient.invalidateQueries({
      queryKey: ['userSongs'],
    });
  };

  return (
    <button
      onClick={deleteSong}
      aria-label='Delete song'
      className='absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-border bg-bg-soft/90 text-text-muted opacity-100 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 active:scale-90 lg:opacity-0 lg:group-hover:opacity-100'
    >
      <Trash2 size={15} />
    </button>
  );
};

export default DeleteSongButton;
