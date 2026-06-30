import { supabase } from '@/lib/supabase-client';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
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
  const deleteSong = async () => {
    // delete image
    const { error: imgError } = await supabase.storage
      .from('cover-images')
      .remove([imagePath]);

    if (imgError) {
      console.log('image delete error', imgError.message);
      return;
    }

    // delete audio
    const { error: audioError } = await supabase.storage
      .from('songs')
      .remove([audioPath]);

    if (audioError) {
      console.log('audio delete error', audioError.message);
      return;
    }

    // delete the song from the table
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
      className='absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-bg-soft border border-border text-text-muted hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition cursor-pointer'
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteSongButton;
