import { useState } from "react";

interface EnvelopeProps {
  children: React.ReactNode;
  onOpen: () => void;
}

export function Envelope({ children, onOpen }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullyOpen, setFullyOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      setFullyOpen(true);
      onOpen();
    }, 1800);
  };

  if (fullyOpen) {
    return (
      <div className="w-full fade-up" style={{ animationDuration: "0.6s" }}>
        {children}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center px-3 sm:px-0">
      <div
        className="relative w-full max-w-md sm:max-w-lg mx-auto cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={handleOpen}
      >
        {/* Envelope body — responsive aspect ratio */}
        <div
          className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-visible"
          style={{
            background: "linear-gradient(160deg, oklch(0.88 0.06 55), oklch(0.78 0.08 50), oklch(0.70 0.09 45))",
            border: "2px solid oklch(0.65 0.12 60)",
            boxShadow: "0 20px 60px -15px oklch(0.30 0.08 40 / 0.5), inset 0 2px 4px oklch(0.95 0.05 80 / 0.5)",
            aspectRatio: "5 / 4",
          }}
        >
          {/* Paper lines */}
          <div
            className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl pointer-events-none"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 18px, oklch(0.72 0.06 55 / 0.12) 18px, oklch(0.72 0.06 55 / 0.12) 19px)",
            }}
          />

          {/* Diagonal fold */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, oklch(0.92 0.04 65 / 0.3) 0%, transparent 40%, transparent 60%, oklch(0.65 0.08 50 / 0.2) 100%)",
            }}
          />

          {/* Center seal */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className={`flex flex-col items-center gap-1.5 sm:gap-2 transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
              <div
                className="relative pulse-glow rounded-full flex items-center justify-center"
                style={{
                  width: "clamp(56px, 16vw, 90px)",
                  height: "clamp(56px, 16vw, 90px)",
                  background: "radial-gradient(circle at 35% 35%, oklch(0.50 0.20 30), oklch(0.35 0.18 25) 60%, oklch(0.25 0.14 20))",
                  boxShadow: "0 6px 20px oklch(0.25 0.14 20 / 0.6), inset 0 2px 6px oklch(0.60 0.18 35 / 0.4)",
                  border: "2px solid oklch(0.45 0.16 28)",
                }}
              >
                <span className="text-xl sm:text-2xl md:text-3xl" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}>🙏</span>
              </div>
              <span
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-display tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs uppercase whitespace-nowrap pointer-events-auto"
                style={{
                  background: "linear-gradient(135deg, oklch(0.85 0.13 85), oklch(0.55 0.14 65))",
                  color: "oklch(0.20 0.06 30)",
                  border: "1px solid oklch(0.90 0.10 80)",
                }}
              >
                Open Invitation
              </span>
            </div>
          </div>

          {/* Top flap */}
          <div
            className="absolute top-0 left-0 right-0 z-20"
            style={{
              transformOrigin: "top center",
              transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "2.2 / 1",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, oklch(0.82 0.07 52), oklch(0.72 0.09 48))",
                borderBottom: "2px solid oklch(0.60 0.10 55)",
                boxShadow: "0 4px 12px oklch(0.30 0.08 40 / 0.3)",
              }}
            />
          </div>

          {/* Bottom fold */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "38%",
              clipPath: "polygon(0 100%, 50% 20%, 100% 100%)",
              background: "linear-gradient(0deg, oklch(0.75 0.07 50), oklch(0.80 0.06 52))",
              borderTop: "1px solid oklch(0.65 0.10 55 / 0.5)",
            }}
          />

          {/* Side fold left */}
          <div
            className="absolute top-0 left-0 bottom-0 pointer-events-none"
            style={{
              width: "50%",
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              background: "linear-gradient(90deg, oklch(0.76 0.07 50), oklch(0.82 0.06 53))",
              opacity: 0.7,
            }}
          />

          {/* Side fold right */}
          <div
            className="absolute top-0 right-0 bottom-0 pointer-events-none"
            style={{
              width: "50%",
              clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
              background: "linear-gradient(-90deg, oklch(0.76 0.07 50), oklch(0.82 0.06 53))",
              opacity: 0.7,
            }}
          />

          {/* Card peeking out */}
          <div
            className="absolute left-[8%] right-[8%] bottom-[12%] z-5 rounded-lg sm:rounded-xl overflow-hidden"
            style={{
              height: "50%",
              background: "radial-gradient(ellipse at top, var(--ivory) 0%, var(--cream) 70%)",
              border: "1px solid var(--gold)",
              boxShadow: "0 -4px 20px oklch(0.55 0.14 65 / 0.2)",
              transform: isOpen ? "translateY(-120%)" : "translateY(0)",
              transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.5s, opacity 0.4s ease 1.4s",
              opacity: isOpen ? 0 : 1,
            }}
          >
            <div className="h-full flex flex-col items-center justify-center p-3 sm:p-4 text-center">
              <p className="text-gold-gradient font-script text-lg sm:text-xl md:text-2xl font-bold italic">Gṛha Praveśa</p>
              <p className="font-display tracking-[0.15em] sm:tracking-[0.2em] text-[7px] sm:text-[9px] md:text-[10px] text-[var(--gold-deep)] mt-1.5 sm:mt-2 uppercase">
                House Warming Ceremony
              </p>
              <div className="mt-2 sm:mt-3 flex items-center gap-2">
                <span className="h-px w-6 sm:w-8 bg-[var(--gold-deep)]/40" />
                <span className="text-[var(--gold-deep)] text-[10px] sm:text-xs">❖</span>
                <span className="h-px w-6 sm:w-8 bg-[var(--gold-deep)]/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Gold border accent */}
        <div
          className="absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl pointer-events-none"
          style={{
            border: "1px solid oklch(0.75 0.12 70 / 0.3)",
            boxShadow: "inset 0 0 30px oklch(0.85 0.10 75 / 0.1)",
          }}
        />
      </div>
    </div>
  );
}
