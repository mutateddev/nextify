'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useMusic from '../context/useMusic';
import {
  ListMusic,
  Pause,
  Play,
  Repeat,
  Repeat1,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
} from 'lucide-react';

const MusicPlayer = () => {
  const { setIsQueueModalOpen, currentMusic, playNext, playPrev } = useMusic();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(77);
  const [prevVol, setPrevVol] = useState(77);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeatSong, setRepeatSong] = useState(true);

  const togglePlayButton = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(prevVol);
      if (audioRef.current) audioRef.current.volume = prevVol / 100;
      return;
    }

    setPrevVol(volume);
    setVolume(0);

    if (audioRef.current) audioRef.current.volume = 0;
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const update = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', update);

    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', update);
    };
  }, [currentMusic]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentMusic) return;

    audio.load();
    setCurrentTime(0);

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playAudio();
  }, [currentMusic]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const ended = () => {
      if (repeatSong) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener('ended', ended);

    return () => {
      audio.removeEventListener('ended', ended);
    };
  }, [repeatSong, playNext]);

  if (!currentMusic) return null;

  return (
    <div className='fixed bottom-0 left-0 z-50 w-full border-t border-border bg-surface/95 px-3 py-2 shadow-2xl backdrop-blur-lg sm:px-6 sm:py-3'>
      <audio ref={audioRef} src={currentMusic.audio_url} className='hidden' />

      {/* Thin Progress bar for mobile overlay at top of player */}
      <div className='absolute top-0 left-0 right-0 h-1 w-full bg-border md:hidden'>
        <div
          className='h-full bg-primary transition-all duration-150'
          style={{
            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
          }}
        />
      </div>

      <div className='mx-auto flex max-w-7xl flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        {/* INFO */}
        <div className='flex items-center justify-between min-w-0 md:w-64'>
          <div className='flex items-center gap-3 min-w-0'>
            <Image
              src={currentMusic.cover_image_url}
              width={44}
              height={44}
              alt={currentMusic.title}
              className='size-10 shrink-0 rounded-md object-cover sm:size-11'
            />

            <div className='min-w-0'>
              <p className='truncate text-sm font-bold text-text sm:text-base'>
                {currentMusic.title}
              </p>
              <p className='truncate text-xs text-text-muted mt-0.5'>
                {currentMusic.artist}
              </p>
            </div>
          </div>

          {/* Quick mobile play toggle */}
          <div className='flex items-center gap-2 md:hidden'>
            <button
              onClick={togglePlayButton}
              className='flex size-9 items-center justify-center rounded-full bg-primary text-black'
            >
              {isPlaying ? (
                <Pause size={18} fill='currentColor' />
              ) : (
                <Play size={18} fill='currentColor' className='ml-0.5' />
              )}
            </button>
            <button
              onClick={() => setIsQueueModalOpen(prev => !prev)}
              className='p-1.5 text-text-muted hover:text-text'
            >
              <ListMusic size={20} />
            </button>
          </div>
        </div>

        {/* CONTROLS (Desktop & Tablet) */}
        <div className='hidden w-full max-w-md flex-col items-center gap-1.5 md:flex'>
          <div className='flex items-center gap-6'>
            <button
              onClick={playPrev}
              className='text-text-muted transition hover:text-text active:scale-90'
              aria-label='Previous track'
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlayButton}
              className='flex size-10 items-center justify-center rounded-full bg-primary text-black transition hover:scale-105 active:scale-95'
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={20} fill='currentColor' />
              ) : (
                <Play size={20} fill='currentColor' className='ml-0.5' />
              )}
            </button>

            <button
              onClick={playNext}
              className='text-text-muted transition hover:text-text active:scale-90'
              aria-label='Next track'
            >
              <SkipForward size={20} />
            </button>
          </div>

          <div className='flex w-full items-center gap-2.5 text-xs tabular-nums'>
            <span className='text-text-muted'>{formatTime(currentTime)}</span>

            <input
              type='range'
              value={currentTime}
              min={0}
              max={duration || 0}
              onChange={handleSeek}
              className='h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-border accent-primary focus:outline-none'
            />

            <span className='text-text-muted'>{formatTime(duration)}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className='hidden items-center justify-end gap-3 md:flex md:w-56'>
          <button
            onClick={() => setRepeatSong(prev => !prev)}
            className={`p-1.5 transition ${
              repeatSong ? 'text-primary' : 'text-text-muted hover:text-text'
            }`}
            aria-label='Repeat song'
          >
            {repeatSong ? <Repeat1 size={18} /> : <Repeat size={18} />}
          </button>

          <button
            onClick={() => setIsQueueModalOpen(prev => !prev)}
            className='p-1.5 text-text-muted transition hover:text-text'
            aria-label='Open Queue'
          >
            <ListMusic size={18} />
          </button>

          <div className='flex items-center gap-2 pl-2'>
            <button
              onClick={toggleMute}
              className='text-text-muted transition hover:text-text'
              aria-label='Mute toggle'
            >
              {volume === 0 ? <VolumeOff size={18} /> : <Volume2 size={18} />}
            </button>

            <input
              type='range'
              value={volume}
              min={0}
              max={100}
              onChange={handleVolume}
              className='h-1.5 w-20 cursor-pointer appearance-none rounded-lg bg-border accent-primary focus:outline-none'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
