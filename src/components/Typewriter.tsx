import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
}

export function Typewriter({ text, speed = 75, className = "", startDelay = 0 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setTimeout(() => setStarted(true), startDelay);
          }
        });
      },
      { threshold: 0.6 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started, startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[0.9em] bg-current ml-1 align-middle animate-pulse" />
      )}
    </span>
  );
}
