'use client';

import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';
import { useState, type SubmitEvent } from 'react';
import useSession from '@/hooks/useSession';
import Logo from '@/components/shared/Logo';

const UploadSongPage = () => {
  const { session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleUpload = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!title.trim() || !artist.trim() || !audioFile || !imageFile) {
      setMessage({
        type: 'error',
        text: 'all fields are required!',
      });
      setLoading(false);
      return;
    }

    try {
      const timestamp = Date.now();
      const imagePath = `/${timestamp}_${imageFile.name}`;
      // upload image
      const { error: imgUploadError } = await supabase.storage
        .from('cover-images')
        .upload(imagePath, imageFile);

      if (imgUploadError) {
        setMessage({
          type: 'error',
          text: imgUploadError.message,
        });
        setLoading(false);
        return;
      }

      // get public image url
      const {
        data: { publicUrl: imageURL },
      } = supabase.storage.from('cover-images').getPublicUrl(imagePath);

      // upload audio
      const audioPath = `/${timestamp}_${audioFile.name}`;
      const { error: audioUploadError } = await supabase.storage
        .from('songs')
        .upload(audioPath, audioFile);

      if (audioUploadError) {
        setMessage({
          type: 'error',
          text: audioUploadError.message,
        });
        setLoading(false);
        return;
      }

      // get public song url
      const {
        data: { publicUrl: audioURL },
      } = supabase.storage.from('songs').getPublicUrl(audioPath);

      // save songs to supabase
      const { error: insertError } = await supabase.from('songs').insert({
        title,
        artist,
        cover_image_url: imageURL,
        audio_url: audioURL,
        user_id: session?.user.id,
      });

      if (insertError) {
        setMessage({
          type: 'error',
          text: insertError.message,
        });
        setLoading(false);
        return;
      }

      setTitle('');
      setArtist('');
      setImageFile(null);
      setAudioFile(null);
      setMessage({
        type: 'success',
        text: 'Song uploaded successfully',
      });

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      console.log('error message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen flex justify-center items-center w-full bg-bg-soft'>
      <div className='bg-bg border border-border flex flex-col items-center px-6 lg:px-12 py-10 rounded-xl w-[90%] max-w-105 shadow-lg hover:shadow-xl transition'>
        <Logo />

        <h2 className='text-2xl font-bold text-text mt-5 mb-8 text-center'>
          Upload Song
        </h2>

        <form className='w-full space-y-6' onSubmit={handleUpload}>
          {message && (
            <p
              className={`text-sm text-center ${
                message.type === 'error' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {message.text}
            </p>
          )}

          {/* TITLE */}
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type='text'
            placeholder='Song title'
            className='w-full outline-none border border-border bg-bg-soft p-3 rounded-md text-text placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition'
          />

          {/* ARTIST */}
          <input
            value={artist}
            onChange={e => setArtist(e.target.value)}
            type='text'
            placeholder='Artist name'
            className='w-full outline-none border border-border bg-bg-soft p-3 rounded-md text-text placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition'
          />

          {/* AUDIO */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='audio' className='text-sm text-text-muted'>
              Audio file
            </label>

            <input
              accept='audio/*'
              onChange={e => {
                const files = e.target.files;
                if (!files) return;
                const file = files[0];
                setAudioFile(file);
              }}
              id='audio'
              type='file'
              className='w-full text-text text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary file:text-black file:cursor-pointer hover:file:opacity-90'
            />
          </div>

          {/* COVER */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='cover' className='text-sm text-text-muted'>
              Cover image
            </label>

            <input
              accept='image/*'
              onChange={e => {
                const files = e.target.files;
                if (!files) return;
                const file = files[0];
                setImageFile(file);
              }}
              id='cover'
              type='file'
              className='w-full text-text text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-surface-hover file:text-text file:cursor-pointer hover:file:bg-surface'
            />
          </div>

          <button
            disabled={loading}
            className='bg-primary hover:opacity-90 active:scale-[0.98] transition py-3 rounded-full w-full font-bold text-black cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? 'Uploading...' : 'Add Song'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadSongPage;
