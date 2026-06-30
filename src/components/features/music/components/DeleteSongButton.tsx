import { Trash2 } from 'lucide-react';
type DeleteSongButtonProps = {
  songId: number;
  imagePath: string;
  audioPath: string;
};

const DeleteSongButton = ({
  songId,
  imagePath,
  audiaPath,
}: DeleteSongButtonProps) => {
  return (
    <button className='absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-bg-soft border border-border text-text-muted hover:text-red-500 hover:border-red-500 hover:bg-red-500/10 transition cursor-pointer'>
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteSongButton;
