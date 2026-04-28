import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  /** ms per character (desktop). Mobile uses ~70% of this. */
  speed?: number;
  className?: string;
  startDelay?: number;
}

/**
 * Performance-optimized typewriter:
 *  - IntersectionObserver fires once, then disconnects
 *  - Uses requestAnimationFrame instead of setInterval (smoother, throttled with tab)
 *  - Batches multiple characters per frame on slow devices to keep frames < 16ms
 *  - Honors prefers-reduced-motion (renders full text instantly)
 */
export function Typewriter({
  text,
  speed = 60,
  className = "",
  startDelay = 0,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Reduced motion → instant render
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t = window.setTimeout(() => setStarted(true), startDelay);
            obs.disconnect();
            return () => window.clearTimeout(t);
          }
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [startDelay, reducedMotion, text]);

  useEffect(() => {
    if (!started || reducedMotion) return;
    let raf = 0;
    let last = performance.now();
    let i = 0;
    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 768;
    const perCharMs = isMobile ? speed * 0.7 : speed;

    const step = (now: number) => {
      const elapsed = now - last;
      if (elapsed >= perCharMs) {
        // Add as many chars as time elapsed allows — keeps frame budget tight
        const add = Math.max(1, Math.floor(elapsed / perCharMs));
        i = Math.min(text.length, i + add);
        setDisplayed(text.slice(0, i));
        last = now;
      }
      if (i < text.length) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, text, speed, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[0.9em] bg-current ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
}
