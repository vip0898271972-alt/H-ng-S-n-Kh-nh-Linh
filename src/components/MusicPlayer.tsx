import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Disc, SkipForward } from 'lucide-react';

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

interface Track {
  id: string;
  name: string;
  artist: string;
  bpm: number;
  chords: number[][];
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isRunningRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const tracks: Track[] = [
    {
      id: 'canon',
      name: 'Canon in D',
      artist: 'Johann Pachelbel',
      bpm: 72,
      chords: [
        [293.66, 369.99, 440.0, 587.33], // D maj
        [220.0, 329.63, 440.0, 554.37],  // A maj
        [246.94, 293.66, 369.99, 493.88],// B min
        [185.0, 293.66, 369.99, 440.0],  // F# min
        [196.0, 246.94, 293.66, 392.0],  // G maj
        [220.0, 293.66, 369.99, 440.0],  // D maj
        [196.0, 246.94, 329.63, 392.0],  // G/Em
        [220.0, 277.18, 329.63, 440.0],  // A7
      ],
    },
    {
      id: 'thousand-years',
      name: 'A Thousand Years',
      artist: 'Acoustic Piano',
      bpm: 64,
      chords: [
        [261.63, 329.63, 392.0, 523.25], // C maj
        [220.0, 261.63, 329.63, 440.0],  // A min
        [174.61, 220.0, 261.63, 349.23], // F maj
        [196.0, 246.94, 293.66, 392.0],  // G maj
      ],
    },
    {
      id: 'wedding-march',
      name: 'Wedding March & Love Waltz',
      artist: 'Romantic Chimes',
      bpm: 80,
      chords: [
        [261.63, 329.63, 392.0, 523.25], // C
        [196.0, 246.94, 293.66, 392.0],  // G
        [220.0, 261.63, 329.63, 440.0],  // Am
        [174.61, 220.0, 261.63, 349.23], // F
      ],
    },
  ];

  const currentTrack = tracks[currentTrackIndex];

  const playChord = (frequencies: number[], startTime: number, duration: number) => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
    const ctx = audioCtxRef.current;

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + index * 0.16);

      const noteStart = startTime + index * 0.16;
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.038, noteStart + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + duration + 0.1);
    });
  };

  const startMusicLoop = (trackToPlay = currentTrack) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      isRunningRef.current = true;
      setIsPlaying(true);

      let chordIndex = 0;
      const stepInterval = (60 / trackToPlay.bpm) * 1000 * 2.8;

      const scheduleStep = () => {
        if (!isRunningRef.current || !audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        playChord(trackToPlay.chords[chordIndex], now, 2.5);
        chordIndex = (chordIndex + 1) % trackToPlay.chords.length;
        timerRef.current = window.setTimeout(scheduleStep, stepInterval);
      };

      scheduleStep();
    } catch {
      // Audio context policy
    }
  };

  const stopMusicLoop = () => {
    isRunningRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusicLoop();
    } else {
      startMusicLoop();
    }
  };

  const nextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopMusicLoop();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    setTimeout(() => {
      startMusicLoop(tracks[nextIdx]);
    }, 150);
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startMusicLoop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      stopMusicLoop();
    };
  }, []);

  return (
    <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#E8DFC8]">
      {/* Vinyl Disc & Waveform */}
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 text-xs font-medium text-[#4A3B32] hover:text-[#9B2C2C] transition-colors focus-visible:outline-none cursor-pointer"
        title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc nền'}
      >
        <div className="relative flex items-center justify-center">
          <Disc className={`w-5 h-5 text-[#C59B27] ${isPlaying ? 'animate-spin-slow' : ''}`} />
          {isPlaying && (
            <span className="absolute w-1.5 h-1.5 rounded-full bg-[#9B2C2C] animate-ping" />
          )}
        </div>

        {/* Dynamic Waveform Visualizer Bars */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 w-4">
            <span className="w-0.5 bg-[#C59B27] rounded-full animate-bounce h-2" style={{ animationDelay: '0.1s' }} />
            <span className="w-0.5 bg-[#9B2C2C] rounded-full animate-bounce h-3.5" style={{ animationDelay: '0.3s' }} />
            <span className="w-0.5 bg-[#C59B27] rounded-full animate-bounce h-1.5" style={{ animationDelay: '0.2s' }} />
          </div>
        )}

        <div className="text-left leading-tight hidden sm:block">
          <span className="font-serif-elegant italic text-xs font-bold text-[#2D2825] block">
            {currentTrack.name}
          </span>
          <span className="text-[10px] text-stone-400">
            {isPlaying ? 'Đang phát' : 'Chạm để phát'}
          </span>
        </div>
      </button>

      {/* Switch Next Song */}
      <button
        onClick={nextTrack}
        className="p-1 rounded-full text-stone-400 hover:text-[#9B2C2C] transition-colors cursor-pointer"
        title="Đổi bài tiếp theo"
      >
        <SkipForward className="w-3.5 h-3.5" />
      </button>

      <div className="h-3.5 w-[1px] bg-stone-300 mx-0.5" />

      {/* Mute/Play Toggle */}
      <button
        onClick={togglePlay}
        className="p-1 rounded-full text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
        title={isPlaying ? 'Tắt âm thanh' : 'Bật âm thanh'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#9B2C2C]" />
        ) : (
          <VolumeX className="w-4 h-4 text-stone-400" />
        )}
      </button>
    </div>
  );
};
