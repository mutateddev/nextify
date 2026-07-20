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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [prevVol, setPrevVol] = useState(0);
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
    const newTime = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseInt(e.target.value);

    setVolume(volume);

    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(prevVol);

      if (audioRef.current) {
        audioRef.current.volume = prevVol / 100;
      }
    }

    if (volume !== 0) {
      setPrevVol(volume);
      setVolume(0);

      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateTime);
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
    setDuration(0);

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio play error', error);
        setIsPlaying(false);
      }
    };

    playAudio();
  }, [currentMusic]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleEnded = () => {
      if (repeatSong) {
        audio.currentTime = 0;
        audio.play();
      } else {
        playNext();
      }
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatSong, playNext, currentMusic]);

  if (!currentMusic) return null;

  return (
    <div className='fixed bottom-0 left-0 w-full bg-bg/90 backdrop-blur-md border-t border-border text-text px-4 py-3 shadow-lg z-50'>
      <audio
        src={currentMusic.audio_url || ''}
        ref={audioRef}
        className='hidden'
      />

      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6'>
        {/* LEFT - SONG INFO */}
        <div className='flex items-center gap-3 w-full md:w-auto md:min-w-50'>
          <Image
            src={currentMusic.cover_image_url || ''}
            alt='cover image'
            loading='eager'
            width={48}
            height={48}
            className='w-12 h-12 object-cover rounded-md shrink-0'
          />

          <div className='text-sm leading-tight min-w-0'>
            <p className='text-primary font-semibold truncate'>
              {currentMusic.title}
            </p>

            <p className='text-text-muted text-xs truncate'>
              {currentMusic.artist}
            </p>
          </div>
        </div>

        {/* CENTER - CONTROLS */}
        <div className='flex flex-col items-center gap-2 w-full md:flex-1 md:max-w-md'>
          <div className='flex items-center gap-5'>
            <button
              onClick={playPrev}
              className='text-text-muted hover:text-text transition cursor-pointer'
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlayButton}
              className='w-10 h-10 flex items-center justify-center rounded-full bg-primary text-black shadow-md hover:scale-105 transition cursor-pointer'
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={playNext}
              className='text-text-muted hover:text-text transition cursor-pointer'
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* PROGRESS */}
          <div className='w-full flex items-center gap-2 text-xs'>
            <span className='text-text-muted'>{formatTime(currentTime)}</span>

            <input
              key={currentMusic.id}
              type='range'
              value={currentTime}
              onChange={handleSeek}
              min={0}
              max={duration || 0}
              className='w-full h-1 accent-primary cursor-pointer'
            />

            <span className='text-text-muted'>{formatTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT - ACTIONS */}
        <div className='flex items-center gap-3 w-full md:w-auto md:min-w-45 justify-center md:justify-end'>
          <button
            className='text-text-muted hover:text-text transition cursor-pointer'
            onClick={() => setRepeatSong(prev => !prev)}
          >
            {repeatSong ? <Repeat1 size={18} /> : <Repeat size={18} />}
          </button>

          <button
            className='text-text-muted hover:text-text transition cursor-pointer'
            onClick={() => setIsQueueModalOpen(prev => !prev)}
          >
            <ListMusic size={18} />
          </button>

          <div className='flex items-center gap-2'>
            <div
              onClick={toggleMute}
              className='text-text-muted cursor-pointer'
            >
              {volume === 0 ? <VolumeOff size={18} /> : <Volume2 size={18} />}
            </div>

            <input
              type='range'
              onChange={handleVolume}
              value={volume}
              min={0}
              max={100}
              className='hidden sm:block w-22.5 h-1 accent-primary cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
