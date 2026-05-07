import { useEffect, useRef } from "react";

import backgroundMusic from "../Background_Bgm.mp3";

export const MUSIC_START_EVENT = "invitation:play-music";

interface MusicToggleProps {
  autoPlay?: boolean;
  audioSrc?: string;
}

export function MusicToggle({ autoPlay = false, audioSrc = backgroundMusic }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayAttemptedRef = useRef(false);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.35;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (autoPlay && audioRef.current && !autoPlayAttemptedRef.current) {
      autoPlayAttemptedRef.current = true;
      audioRef.current
        .play()
        .catch((err) => {
          console.error("Failed to auto-play music:", err);
        });
    }
  }, [autoPlay]);

  useEffect(() => {
    const playMusic = () => {
      if (!audioRef.current) return;

      autoPlayAttemptedRef.current = true;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.error("Failed to play music:", err);
      });
    };

    window.addEventListener(MUSIC_START_EVENT, playMusic);
    return () => window.removeEventListener(MUSIC_START_EVENT, playMusic);
  }, []);

  return null;
}
