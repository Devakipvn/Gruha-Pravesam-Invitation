import couple from "@/assets/couple-puja.png";
import cow from "@/assets/cow-calf.png";

// Pure SVG animated homam fire — no static image
function AnimatedHomam() {
  return (
    <svg
      viewBox="0 0 300 320"
      className="w-full h-auto"
      style={{ filter: "drop-shadow(0 0 30px rgba(255,140,0,0.55))" }}
      aria-label="Animated sacred homam fire"
    >
      <defs>
        <linearGradient id="kund" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5a2b" />
          <stop offset="60%" stopColor="#5a3414" />
          <stop offset="100%" stopColor="#2b1707" />
        </linearGradient>
        <linearGradient id="kundTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a47148" />
          <stop offset="100%" stopColor="#5a3414" />
        </linearGradient>
        <radialGradient id="ember" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff4a3" />
          <stop offset="40%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#7a1a00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="flameOuter" cx="50%" cy="80%" r="65%">
          <stop offset="0%" stopColor="#ffe066" stopOpacity="1" />
          <stop offset="45%" stopColor="#ff8c00" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="flameMid" cx="50%" cy="80%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#ffd54a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="flameCore" cx="50%" cy="85%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="60%" stopColor="#fff3b0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffaa33" stopOpacity="0" />
        </radialGradient>
        <filter id="blur1"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>

      {/* Glow halo */}
      <ellipse cx="150" cy="160" rx="140" ry="120" fill="url(#flameOuter)" opacity="0.18">
        <animate attributeName="opacity" values="0.14;0.26;0.14" dur="2.4s" repeatCount="indefinite" />
      </ellipse>

      {/* === Stepped Havan Kund (3-tier square pyramid) === */}
      {/* tier 3 - bottom widest */}
      <polygon points="40,310 260,310 240,288 60,288" fill="url(#kund)" stroke="#1a0e04" strokeWidth="1.5" />
      <rect x="60" y="270" width="180" height="20" fill="url(#kund)" stroke="#1a0e04" strokeWidth="1.2" />
      {/* tier 2 */}
      <polygon points="70,270 230,270 215,250 85,250" fill="url(#kund)" stroke="#1a0e04" strokeWidth="1.2" />
      <rect x="85" y="232" width="130" height="20" fill="url(#kund)" stroke="#1a0e04" strokeWidth="1" />
      {/* tier 1 - top */}
      <polygon points="92,232 208,232 198,215 102,215" fill="url(#kundTop)" stroke="#1a0e04" strokeWidth="1" />
      <rect x="102" y="200" width="96" height="18" fill="url(#kundTop)" stroke="#1a0e04" strokeWidth="1" />
      {/* inner cavity (dark) */}
      <ellipse cx="150" cy="205" rx="44" ry="8" fill="#120800" />

      {/* Glowing embers in the cavity */}
      <ellipse cx="150" cy="204" rx="40" ry="7" fill="url(#ember)">
        <animate attributeName="opacity" values="0.7;1;0.75;1;0.8" dur="1.4s" repeatCount="indefinite" />
      </ellipse>
      {[120, 140, 160, 180].map((cx, i) => (
        <circle key={i} cx={cx} cy={204} r="2.5" fill="#ffb347">
          <animate attributeName="opacity" values="0.4;1;0.5" dur={`${0.8 + i * 0.15}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* === Flames === outer */}
      <g style={{ transformOrigin: "150px 200px" }}>
        <path
          fill="url(#flameOuter)"
          d="M150 200 C 95 175, 88 110, 120 65 C 124 95, 140 88, 132 50 C 158 80, 175 85, 168 35 C 200 75, 215 150, 150 200 Z"
        >
          <animate
            attributeName="d"
            dur="1.6s"
            repeatCount="indefinite"
            values="
              M150 200 C 95 175, 88 110, 120 65 C 124 95, 140 88, 132 50 C 158 80, 175 85, 168 35 C 200 75, 215 150, 150 200 Z;
              M150 200 C 100 178, 82 105, 116 58 C 122 92, 142 84, 134 42 C 162 78, 178 82, 172 28 C 206 78, 220 152, 150 200 Z;
              M150 200 C  92 172, 90 115, 124 70 C 126 100, 138 92, 130 56 C 156 84, 172 88, 166 40 C 196 70, 212 148, 150 200 Z;
              M150 200 C 95 175, 88 110, 120 65 C 124 95, 140 88, 132 50 C 158 80, 175 85, 168 35 C 200 75, 215 150, 150 200 Z"
          />
        </path>

        {/* mid flame */}
        <path
          fill="url(#flameMid)"
          d="M150 198 C 115 175, 110 130, 130 95 C 134 115, 146 110, 142 80 C 158 105, 168 110, 164 78 C 188 110, 190 165, 150 198 Z"
        >
          <animate
            attributeName="d"
            dur="1.2s"
            repeatCount="indefinite"
            values="
              M150 198 C 115 175, 110 130, 130 95 C 134 115, 146 110, 142 80 C 158 105, 168 110, 164 78 C 188 110, 190 165, 150 198 Z;
              M150 198 C 118 178, 108 125, 128 90 C 132 112, 148 108, 144 74 C 162 102, 172 106, 168 70 C 192 108, 194 168, 150 198 Z;
              M150 198 C 115 175, 110 130, 130 95 C 134 115, 146 110, 142 80 C 158 105, 168 110, 164 78 C 188 110, 190 165, 150 198 Z"
          />
        </path>

        {/* bright core */}
        <path
          fill="url(#flameCore)"
          d="M150 195 C 132 180, 130 150, 142 125 C 146 140, 154 138, 150 118 C 162 138, 168 150, 166 168 C 172 182, 162 192, 150 195 Z"
        >
          <animate
            attributeName="d"
            dur="0.9s"
            repeatCount="indefinite"
            values="
              M150 195 C 132 180, 130 150, 142 125 C 146 140, 154 138, 150 118 C 162 138, 168 150, 166 168 C 172 182, 162 192, 150 195 Z;
              M150 195 C 134 182, 128 148, 140 120 C 144 138, 156 136, 152 114 C 164 136, 170 148, 168 166 C 174 184, 162 194, 150 195 Z;
              M150 195 C 132 180, 130 150, 142 125 C 146 140, 154 138, 150 118 C 162 138, 168 150, 166 168 C 172 182, 162 192, 150 195 Z"
          />
        </path>
      </g>

      {/* Rising sparks */}
      {[100, 130, 150, 170, 200, 115, 185].map((cx, i) => (
        <circle key={i} cx={cx} cy={150} r={1 + (i % 3) * 0.6} fill="#ffd54a" filter="url(#blur1)">
          <animate
            attributeName="cy"
            values={`${180 + (i % 4) * 8};-10`}
            dur={`${2.4 + (i % 4) * 0.5}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.35) % 2.5}s`}
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur={`${2.4 + (i % 4) * 0.5}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.35) % 2.5}s`}
          />
          <animate
            attributeName="cx"
            values={`${cx};${cx + (i % 2 === 0 ? 8 : -8)}`}
            dur={`${2.4 + (i % 4) * 0.5}s`}
            repeatCount="indefinite"
            begin={`${(i * 0.35) % 2.5}s`}
          />
        </circle>
      ))}
    </svg>
  );
}

export function HomamScene() {
  return (
    <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-end px-4">
      {/* LEFT: couple + animated homam (kund placed between them) */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <img
            src={couple}
            alt="Husband and wife performing the homam ceremony"
            className="w-full h-auto relative z-10"
            loading="lazy"
          />
          {/* 3-tier havan kund positioned between the couple */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 w-40 sm:w-48 md:w-56">
            <AnimatedHomam />
          </div>
        </div>
        <p className="mt-4 font-script text-2xl md:text-3xl text-gold-gradient text-center">
          Yajña · The Sacred Fire
        </p>
      </div>

      {/* RIGHT: cow and calf */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-full max-w-md float-gentle">
          <img
            src={cow}
            alt="Sacred cow Gomata with her calf"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        <p className="mt-4 font-script text-2xl md:text-3xl text-gold-gradient text-center">
          Gomātā · Divine Blessing
        </p>
      </div>
    </div>
  );
}
