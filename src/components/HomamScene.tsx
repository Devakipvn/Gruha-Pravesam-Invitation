import { HomamFire } from "@/components/HomamFire";
import homamKund from "@/assets/homam-kund.png";
import couple from "@/assets/couple-puja.png";
import cow from "@/assets/cow-calf.png";

export function HomamScene() {
  return (
    <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-end px-4">
      {/* LEFT: couple performing homam */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-full max-w-md">
          <img
            src={couple}
            alt="Husband and wife performing the homam ceremony with folded hands"
            className="w-full h-auto relative z-10"
            loading="lazy"
          />
          {/* Homam kund + animated fire in front of couple */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-20 flex flex-col items-center">
            <div className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 z-30">
              <HomamFire size={70} />
            </div>
            <img
              src={homamKund}
              alt="Sacred homam kund altar"
              className="w-32 md:w-44 h-auto"
              loading="lazy"
            />
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
