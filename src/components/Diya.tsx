interface DiyaProps {
  className?: string;
  size?: number;
}

export function Diya({ className = "", size = 60 }: DiyaProps) {
  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size * 1.4 }}>
      {/* Flame */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flicker"
        style={{ bottom: size * 0.55, width: size * 0.35, height: size * 0.7 }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, oklch(0.95 0.18 90) 0%, oklch(0.78 0.20 60) 40%, oklch(0.55 0.20 35) 75%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
        {/* glow halo */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.85 0.20 70 / 0.5) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </div>
      {/* Lamp body */}
      <svg
        viewBox="0 0 100 60"
        className="absolute bottom-0 left-0 w-full"
        style={{ height: size * 0.55 }}
      >
        <defs>
          <linearGradient id="diyaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.15 70)" />
            <stop offset="50%" stopColor="oklch(0.55 0.16 50)" />
            <stop offset="100%" stopColor="oklch(0.32 0.10 35)" />
          </linearGradient>
        </defs>
        <path
          d="M 5 15 Q 50 0 95 15 Q 90 50 50 55 Q 10 50 5 15 Z"
          fill="url(#diyaGrad)"
          stroke="oklch(0.40 0.10 40)"
          strokeWidth="1"
        />
        <ellipse cx="50" cy="15" rx="42" ry="6" fill="oklch(0.30 0.08 35)" opacity="0.6" />
      </svg>
    </div>
  );
}
