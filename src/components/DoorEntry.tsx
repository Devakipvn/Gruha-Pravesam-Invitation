import { useState } from "react";
import doorLeft from "@/assets/door-left.png";
import doorRight from "@/assets/door-right.png";

interface DoorEntryProps {
  onOpen: () => void;
}

export function DoorEntry({ onOpen }: DoorEntryProps) {
  const [opening, setOpening] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [knocking, setKnocking] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    // play a quick knock animation, then open
    setKnocking(true);
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      // two soft knocks
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
      // chime after knock
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

      {/* Decorative toran (garland) above doors */}
      <div className="absolute top-4 md:top-6 left-0 right-0 z-30 flex justify-center pointer-events-none px-4">
        <div className="flex gap-1 text-2xl md:text-3xl select-none">
          <span>🌼</span><span>🏵️</span><span>🌼</span><span>🏵️</span><span>🌼</span><span>🏵️</span><span>🌼</span>
        </div>
      </div>

      {/* Doors container — both panels exact same size */}
      <div
        className="relative flex items-stretch justify-center"
        style={{ perspective: "1800px", width: "min(92vw, 620px)", height: "min(88vh, 880px)" }}
      >
        {/* Left door panel */}
        <div
          className={`relative w-1/2 h-full ${opening ? "door-open-left" : ""}`}
          style={{ transformOrigin: "left center" }}
        >
          <img
            src={doorLeft}
            alt="Traditional Indian carved door, left panel"
            className="w-full h-full object-fill block"
            style={{ filter: "drop-shadow(-4px 20px 30px rgba(0,0,0,0.5))" }}
          />
        </div>

        {/* Right door panel */}
        <div
          className={`relative w-1/2 h-full ${opening ? "door-open-right" : ""}`}
          style={{ transformOrigin: "right center" }}
        >
          <img
            src={doorRight}
            alt="Traditional Indian carved door, right panel"
            className="w-full h-full object-fill block"
            style={{ filter: "drop-shadow(4px 20px 30px rgba(0,0,0,0.5))" }}
          />
        </div>

        {/* Door Knocker — center, brass ring */}
        {!opening && (
          <button
            onClick={handleOpen}
            className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group ${knocking ? "knock-animate" : ""}`}
            aria-label="Open the doors"
          >
            <div className="flex flex-col items-center gap-3">
              {/* Brass knocker SVG */}
              <div
                className="relative pulse-glow rounded-full"
                style={{
                  width: 120,
                  height: 140,
                  filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.6))",
                }}
              >
                <svg viewBox="0 0 120 140" width="120" height="140" aria-hidden>
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
                  {/* Lion-head plate */}
                  <circle cx="60" cy="40" r="22" fill="url(#brassPlate)" stroke="#3a230a" strokeWidth="1.5" />
                  {/* tiny eyes/nose hint */}
                  <circle cx="53" cy="38" r="1.6" fill="#2a1606" />
                  <circle cx="67" cy="38" r="1.6" fill="#2a1606" />
                  <path d="M55 47 Q60 51 65 47" stroke="#2a1606" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                  {/* Knocker ring */}
                  <ellipse
                    cx="60"
                    cy="95"
                    rx="36"
                    ry="40"
                    fill="none"
                    stroke="url(#brass)"
                    strokeWidth="9"
                  />
                  {/* ring attachment */}
                  <rect x="55" y="55" width="10" height="10" rx="2" fill="url(#brass)" />
                </svg>
              </div>
              <span
                className="px-5 py-1.5 rounded-full font-display tracking-[0.25em] text-[11px] md:text-xs uppercase"
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
    </div>
  );
}
