'use client';

import {
  ListMusic,
  Pause,
  Play,
  Repeat1,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeOff,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import useMusic from '../context/useMusic';

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(77);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [prevVol, setPrevVol] = useState(0);
  const { setIsQueueModalOpen } = useMusic();

  const togglePlayButton = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    if (!isPlaying) {
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
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div className='fixed bottom-0 left-0 w-full bg-bg/90 backdrop-blur-md border-t border-border text-text px-4 py-3 shadow-lg z-50'>
      <audio
        src='/music/brain-boost.mp3'
        ref={audioRef}
        className='hidden'
      ></audio>
      <div className='max-w-7xl mx-auto flex items-center justify-between gap-6'>
        {/* LEFT - SONG INFO */}
        <div className='flex items-center gap-4 min-w-50'>
          <Image
            src='/images/cover-2.jpeg'
            alt='cover image'
            width={48}
            height={48}
            className='w-12 h-12 object-cover rounded-md'
          />

          <div className='text-sm leading-tight'>
            <p className='text-primary font-semibold truncate'>Brain Fuel</p>
            <p className='text-text-muted text-xs truncate'>Brainy</p>
          </div>
        </div>

        {/* CENTER - CONTROLS */}
        <div className='flex flex-col items-center gap-2 flex-1 max-w-md'>
          <div className='flex items-center gap-5'>
            <button className='text-text-muted hover:text-text transition'>
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlayButton}
              className='w-10 h-10 flex items-center justify-center rounded-full bg-primary text-black shadow-md hover:scale-105 transition cursor-pointer'
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button className='text-text-muted hover:text-text transition'>
              <SkipForward size={20} />
            </button>
          </div>

          {/* PROGRESS */}
          <div className='w-full flex items-center gap-2 text-xs'>
            <span className='text-text-muted'>{formatTime(currentTime)}</span>

            <input
              type='range'
              onChange={handleSeek}
              min={0}
              max={duration || 0}
              value={currentTime}
              className='w-full h-1 accent-primary cursor-pointer'
            />

            <span className='text-text-muted'>{formatTime(duration)}</span>
          </div>
        </div>

        {/* RIGHT - VOLUME */}
        <div className='flex items-center gap-3 min-w-45 justify-end'>
          <button className='text-text-muted hover:text-text transition'>
            <Repeat1 size={18} />
          </button>

          <button
            className='text-text-muted hover:text-text transition cursor-pointer'
            onClick={() => setIsQueueModalOpen(prv => !prv)}
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
              className='w-22.5 h-1 accent-primary cursor-pointer'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
