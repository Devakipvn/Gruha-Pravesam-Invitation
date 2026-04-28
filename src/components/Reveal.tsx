import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Reveal-on-scroll wrapper.
 * - Uses IntersectionObserver, disconnects immediately after first fire (no leaks)
 * - GPU-only properties (opacity + translate3d) for compositor-friendly animation
 * - Respects prefers-reduced-motion (renders visible immediately, no transition)
 * - `will-change` set only while animating, then cleared
 */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setAnimating(true);
            setVisible(true);
            obs.disconnect();
            // Clear will-change once the transition finishes
            window.setTimeout(() => setAnimating(false), 900 + delay);
            return;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay, reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,32px,0)",
        transition: reducedMotion
          ? "none"
          : `opacity 0.8s ease-out ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: animating ? "opacity, transform" : "auto",
      }}
    >
      {children}
    </div>
  );
}
