import { useEffect, useState } from "react";

/**
 * Floating golden particles.
 * Mobile-aware:
 *  - Halves count on small viewports
 *  - Disabled when prefers-reduced-motion is set
 *  - Pure CSS animations (no JS per-frame work)
 */
export function Particles({ count = 25 }: { count?: number }) {
  const [particles, setParticles] = useState<
    { id: number; left: number; size: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;
    const isLowMem =
      // navigator.deviceMemory is non-standard, hence the cast
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory !==
        undefined &&
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4) <=
        2;
    const effective = isLowMem
      ? Math.round(count * 0.35)
      : isMobile
        ? Math.round(count * 0.55)
        : count;

    setParticles(
      Array.from({ length: effective }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 3 + Math.random() * 6,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 15,
      }))
    );
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-10"
      style={{ contain: "strict" }}
      aria-hidden
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 2}px oklch(0.85 0.18 75 / 0.7)`,
          }}
        />
      ))}
    </div>
  );
}
