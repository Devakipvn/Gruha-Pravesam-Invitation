import { useEffect, useRef, useState } from "react";

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Generate a soft drone using Web Audio for ambient feel
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);

  const toggle = () => {
    if (!playing) {
      try {
        const ctx = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        ctxRef.current = ctx;
        // Tanpura-like drone — fundamental + fifth + octave
        [196, 293.66, 392].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.value = 0;
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.5);
          nodesRef.current.push({ osc, gain });
        });
        setPlaying(true);
      } catch {
        /* silent */
      }
    } else {
      const ctx = ctxRef.current;
      if (ctx) {
        nodesRef.current.forEach(({ osc, gain }) => {
          gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
          setTimeout(() => {
            try {
              osc.stop();
            } catch {
              /* */
            }
          }, 600);
        });
        nodesRef.current = [];
        setTimeout(() => ctx.close(), 800);
      }
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110"
      style={{
        background: "var(--gradient-gold)",
        border: "2px solid var(--ivory)",
        boxShadow: "var(--shadow-divine)",
      }}
    >
      <span className="text-xl" style={{ color: "var(--maroon)" }}>
        {playing ? "🔔" : "🔕"}
      </span>
    </button>
  );
}
