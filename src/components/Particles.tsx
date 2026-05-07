import { type CSSProperties, useEffect, useState } from "react";

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
  const [bursts, setBursts] = useState<
    { id: number; x: number; y: number; dx: number; size: number; delay: number }[]
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("button, a, [role='button']")) return;

      const now = Date.now();
      const nextBurst = Array.from({ length: 12 }, (_, i) => ({
        id: now + i,
        x: event.clientX,
        y: event.clientY,
        dx: -34 + Math.random() * 68,
        size: 4 + Math.random() * 7,
        delay: i * 0.025,
      }));

      setBursts((current) => [...current, ...nextBurst].slice(-48));
      window.setTimeout(() => {
        setBursts((current) => current.filter((p) => !nextBurst.some((n) => n.id === p.id)));
      }, 1400);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (particles.length === 0 && bursts.length === 0) return null;

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
      {bursts.map((p) => (
        <span
          key={p.id}
          className="button-particle"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            "--particle-dx": `${p.dx}px`,
            animationDelay: `${p.delay}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
