import { useState } from "react";
import doorLeft from "@/assets/door-left.png";
import doorRight from "@/assets/door-right.png";

interface DoorEntryProps {
  onOpen: () => void;
}

export function DoorEntry({ onOpen }: DoorEntryProps) {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    // soft chime via WebAudio
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      [880, 660, 1320].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        g.gain.value = 0;
        o.connect(g);
        g.connect(ctx.destination);
        const t = ctx.currentTime + i * 0.18;
        g.gain.linearRampToValueAtTime(0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
        o.start(t);
        o.stop(t + 1.7);
      });
    } catch {
      /* silent */
    }
    setTimeout(() => {
      onOpen();
      setTimeout(() => setHidden(true), 800);
    }, 2200);
  };

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.42 0.10 35) 0%, oklch(0.18 0.05 30) 100%)",
        transition: "opacity 0.8s ease",
        opacity: opening ? (hidden ? 0 : 1) : 1,
      }}
    >
      {/* Divine light burst */}
      {opening && (
        <div
          className="absolute inset-0 divine-glow"
          style={{ background: "var(--gradient-divine)" }}
        />
      )}

      {/* Doors container */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1500px", width: "min(90vw, 700px)", height: "min(95vh, 1000px)" }}
      >
        {/* Left door */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full ${opening ? "door-open-left" : ""}`}
          style={{ transformOrigin: "left center" }}
        >
          <img
            src={doorLeft}
            alt="Traditional Indian carved door, left panel"
            className="w-full h-full object-cover object-right"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
          />
        </div>

        {/* Right door */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full ${opening ? "door-open-right" : ""}`}
          style={{ transformOrigin: "right center" }}
        >
          <img
            src={doorRight}
            alt="Traditional Indian carved door, right panel"
            className="w-full h-full object-cover object-left"
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
          />
        </div>

        {/* Open button — center */}
        {!opening && (
          <button
            onClick={handleOpen}
            className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group"
            aria-label="Open the doors"
          >
            <span
              className="block px-8 py-4 rounded-full font-display tracking-widest text-sm md:text-base uppercase pulse-glow transition-transform group-hover:scale-110"
              style={{
                background: "var(--gradient-gold)",
                color: "oklch(0.20 0.06 30)",
                border: "2px solid oklch(0.95 0.12 85)",
                textShadow: "0 1px 2px oklch(0.95 0.12 85 / 0.6)",
              }}
            >
              🔘 Open the Doors
            </span>
            <span className="block mt-3 text-xs md:text-sm font-script text-center" style={{ color: "oklch(0.92 0.10 85)" }}>
              tap to begin
            </span>
          </button>
        )}
      </div>

      {/* Top title */}
      <div className="absolute top-8 left-0 right-0 text-center px-4">
        <p className="font-script text-3xl md:text-5xl text-gold-gradient">Gṛha Praveśa</p>
        <p className="font-display tracking-[0.4em] text-xs md:text-sm mt-1" style={{ color: "oklch(0.88 0.10 80)" }}>
          HOUSE WARMING CEREMONY
        </p>
      </div>
    </div>
  );
}
