import homamKund from "@/assets/homam-kund.png";
import couple from "@/assets/couple-puja.png";
import cow from "@/assets/cow-calf.png";

export function HomamScene() {
  return (
    <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end px-4">
      {/* LEFT: couple + homam kund (3D style image) */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-full max-w-md flex flex-col items-center">
          <img
            src={couple}
            alt="Husband and wife performing the homam ceremony with folded hands"
            className="w-full h-auto relative z-10"
            loading="lazy"
          />
          {/* Homam kund placed in front, large and centered, with animated glow */}
          <div className="relative -mt-10 sm:-mt-14 md:-mt-16 z-20 w-48 sm:w-60 md:w-72">
            {/* Glow halo behind the kund */}
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 35%, oklch(0.92 0.20 75 / 0.7), transparent 65%)",
                animation: "pulse-glow 2.5s ease-in-out infinite",
              }}
            />
            <img
              src={homamKund}
              alt="Sacred homam kund with rising fire"
              className="relative w-full h-auto flame-dance"
              loading="lazy"
              style={{ filter: "drop-shadow(0 10px 25px rgba(120,40,0,0.5))" }}
            />
            {/* Rising spark particles */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {[20, 40, 50, 60, 80].map((cx, i) => (
                <circle key={i} cx={cx} cy="35" r="0.8" fill="#ffd54a">
                  <animate
                    attributeName="cy"
                    values="35;-5"
                    dur={`${2 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.4}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur={`${2 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.4}s`}
                  />
                </circle>
              ))}
            </svg>
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
            alt="Sacred cow Gomata with her calf, blessed for the new home"
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
