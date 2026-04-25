interface HomamFireProps {
  size?: number;
}

// Animated SVG flame — multiple layered flames with staggered flicker
export function HomamFire({ size = 120 }: HomamFireProps) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      style={{ filter: "drop-shadow(0 0 20px rgba(255,140,0,0.7))" }}
      aria-hidden
    >
      <defs>
        <radialGradient id="flameOuter" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#ffd54a" stopOpacity="1" />
          <stop offset="50%" stopColor="#ff8c00" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#c0392b" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="flameInner" cx="50%" cy="85%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#ffe17a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer flame */}
      <path
        d="M50 130 C20 110, 18 70, 35 45 C38 60, 45 55, 42 35 C55 50, 65 55, 60 30 C75 50, 82 90, 50 130 Z"
        fill="url(#flameOuter)"
      >
        <animate
          attributeName="d"
          dur="1.4s"
          repeatCount="indefinite"
          values="
          M50 130 C20 110, 18 70, 35 45 C38 60, 45 55, 42 35 C55 50, 65 55, 60 30 C75 50, 82 90, 50 130 Z;
          M50 130 C22 112, 16 68, 32 40 C36 58, 48 52, 44 28 C58 48, 68 52, 62 22 C78 48, 84 92, 50 130 Z;
          M50 130 C20 110, 18 70, 35 45 C38 60, 45 55, 42 35 C55 50, 65 55, 60 30 C75 50, 82 90, 50 130 Z"
        />
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1 1; 1.04 1.08; 0.98 0.96; 1 1"
          dur="1.6s"
          repeatCount="indefinite"
          additive="sum"
        />
      </path>

      {/* Inner flame */}
      <path
        d="M50 125 C35 110, 35 80, 45 60 C47 72, 53 70, 50 55 C58 68, 62 80, 60 95 C66 105, 60 120, 50 125 Z"
        fill="url(#flameInner)"
      >
        <animate
          attributeName="d"
          dur="1.1s"
          repeatCount="indefinite"
          values="
          M50 125 C35 110, 35 80, 45 60 C47 72, 53 70, 50 55 C58 68, 62 80, 60 95 C66 105, 60 120, 50 125 Z;
          M50 125 C36 112, 34 78, 44 56 C46 70, 54 68, 50 50 C60 66, 64 82, 62 96 C68 108, 60 122, 50 125 Z;
          M50 125 C35 110, 35 80, 45 60 C47 72, 53 70, 50 55 C58 68, 62 80, 60 95 C66 105, 60 120, 50 125 Z"
        />
      </path>

      {/* Sparks */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={40 + i * 12} cy={20} r="1.5" fill="#ffd54a">
          <animate
            attributeName="cy"
            values="40;-10"
            dur={`${2 + i * 0.4}s`}
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur={`${2 + i * 0.4}s`}
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
          />
        </circle>
      ))}
    </svg>
  );
}
