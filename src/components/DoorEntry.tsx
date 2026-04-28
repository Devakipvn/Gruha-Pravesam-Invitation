import { useState } from "react";
import doorFull from "@/assets/door-full.png";

interface DoorEntryProps {
  onOpen: () => void;
}

export function DoorEntry({ onOpen }: DoorEntryProps) {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [knocking, setKnocking] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setKnocking(true);
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      [0, 0.18].forEach((delay) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = 110;
        g.gain.value = 0;
        o.connect(g);
        g.connect(ctx.destination);
        const t = ctx.currentTime + delay;
        g.gain.linearRampToValueAtTime(0.35, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        o.start(t);
        o.stop(t + 0.2);
      });
      [880, 660, 1320].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        g.gain.value = 0;
        o.connect(g);
        g.connect(ctx.destination);
        const t = ctx.currentTime + 0.55 + i * 0.18;
        g.gain.linearRampToValueAtTime(0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
        o.start(t);
        o.stop(t + 1.5);
      });
    } catch {
      /* silent */
    }
    setTimeout(() => {
      setOpening(true);
      setTimeout(() => {
        onOpen();
        setTimeout(() => setHidden(true), 800);
      }, 2200);
    }, 700);
  };

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, oklch(0.55 0.18 55) 0%, oklch(0.38 0.16 40) 35%, oklch(0.22 0.10 35) 70%, oklch(0.12 0.06 30) 100%)",
        transition: "opacity 0.8s ease",
        opacity: opening ? (hidden ? 0 : 1) : 1,
      }}
    >
      {/* Decorative warm vignette + sparkle overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, oklch(0.85 0.16 75 / 0.18), transparent 35%), radial-gradient(circle at 85% 25%, oklch(0.85 0.16 75 / 0.15), transparent 35%), radial-gradient(circle at 50% 90%, oklch(0.55 0.18 50 / 0.35), transparent 55%)",
        }}
      />

      {/* Ambient floor glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-32 rounded-[50%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, oklch(0.85 0.18 75 / 0.55), transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Divine light burst behind doors */}
      {opening && (
        <div
          className="absolute inset-0 divine-glow z-0"
          style={{ background: "var(--gradient-divine)" }}
        />
      )}

      {/* Doors — centered, full height, constrained width like a real doorway */}
      <div
        className="relative h-full flex items-stretch"
        style={{
          perspective: "2400px",
          width: "min(680px, 92vw)",
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.8))",
        }}
      >
        {/* Door frame / arch backdrop */}
        <div
          className="absolute -inset-x-4 -inset-y-2 pointer-events-none rounded-t-[60px]"
          style={{
            background: "linear-gradient(180deg, #2a1608 0%, #1a0e06 100%)",
            border: "6px solid #4a2c10",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)",
          }}
        />

        {/* Left door */}
        <div
          className={`relative w-1/2 h-full overflow-hidden ${opening ? "door-open-left" : ""}`}
          style={{
            transformOrigin: "left center",
            backgroundImage: `url(${doorFull})`,
            backgroundSize: "200% 100%",
            backgroundPosition: "left center",
            backgroundRepeat: "no-repeat",
            boxShadow: opening ? "none" : "inset -6px 0 18px rgba(0,0,0,0.7)",
          }}
        />
        {/* Right door */}
        <div
          className={`relative w-1/2 h-full overflow-hidden ${opening ? "door-open-right" : ""}`}
          style={{
            transformOrigin: "right center",
            backgroundImage: `url(${doorFull})`,
            backgroundSize: "200% 100%",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
            boxShadow: opening ? "none" : "inset 6px 0 18px rgba(0,0,0,0.7)",
          }}
        />
      </div>

      {/* Door Knocker — center seam */}
      {!opening && (
        <button
          onClick={handleOpen}
          className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group ${knocking ? "knock-animate" : ""}`}
          aria-label="Open the doors"
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className="relative pulse-glow rounded-full"
              style={{
                width: 110,
                height: 130,
                filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.7))",
              }}
            >
              <svg viewBox="0 0 120 140" width="110" height="130" aria-hidden>
                <defs>
                  <radialGradient id="brass" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#fff3b0" />
                    <stop offset="40%" stopColor="#e0a83a" />
                    <stop offset="100%" stopColor="#6b4310" />
                  </radialGradient>
                  <radialGradient id="brassPlate" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor="#f8d77a" />
                    <stop offset="70%" stopColor="#a06a1c" />
                    <stop offset="100%" stopColor="#3a230a" />
                  </radialGradient>
                </defs>
                <circle cx="60" cy="40" r="22" fill="url(#brassPlate)" stroke="#3a230a" strokeWidth="1.5" />
                <circle cx="53" cy="38" r="1.6" fill="#2a1606" />
                <circle cx="67" cy="38" r="1.6" fill="#2a1606" />
                <path d="M55 47 Q60 51 65 47" stroke="#2a1606" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <ellipse cx="60" cy="95" rx="36" ry="40" fill="none" stroke="url(#brass)" strokeWidth="9" />
                <rect x="55" y="55" width="10" height="10" rx="2" fill="url(#brass)" />
              </svg>
            </div>
            <span
              className="px-5 py-1.5 rounded-full font-display tracking-[0.25em] text-[11px] md:text-xs uppercase whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, oklch(0.85 0.13 85), oklch(0.55 0.14 65))",
                color: "oklch(0.20 0.06 30)",
                border: "1px solid oklch(0.95 0.12 85)",
              }}
            >
              Open the Doors
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
