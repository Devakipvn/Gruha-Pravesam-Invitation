import { useEffect, useState } from "react";
import { DoorEntry } from "@/components/DoorEntry";
import { Particles } from "@/components/Particles";
import { Reveal } from "@/components/Reveal";
import { Typewriter } from "@/components/Typewriter";
import { Diya } from "@/components/Diya";
import { MusicToggle } from "@/components/MusicToggle";
import { HomamScene } from "@/components/HomamScene";
import ganesha from "@/assets/ganesha.png";
import rangoli from "@/assets/rangoli.png";
import pasupu from "@/assets/pasupu-kumkuma.png";

export function Invitation() {
  const [opened, setOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "auto" : "hidden";
  }, [opened]);

  return (
    <div className="relative min-h-screen w-full">
      <DoorEntry onOpen={() => setOpened(true)} />

      {opened && (
        <>
          <Particles count={30} />
          <MusicToggle />

          {/* Parallax background rangoli */}
          <div
            className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-[0.07]"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <img src={rangoli} alt="" className="w-[80vmin] h-[80vmin]" />
          </div>

          {/* HERO welcome */}
          <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
            <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
              <p className="font-script text-5xl sm:text-6xl md:text-8xl text-gold-gradient leading-none">
                Gṛha Praveśa
              </p>
              <p className="font-display tracking-[0.4em] text-[10px] sm:text-xs md:text-sm mt-3 text-[var(--gold-deep)]">
                HOUSE WARMING CEREMONY
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="h-px w-16 sm:w-24 bg-[var(--gold-deep)]/50" />
                <span className="text-[var(--gold-deep)] text-xl">❖</span>
                <span className="h-px w-16 sm:w-24 bg-[var(--gold-deep)]/50" />
              </div>
              <p className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-gradient leading-none mt-6">
                Welcome
              </p>
              <p className="mt-6 font-display tracking-[0.3em] text-[10px] sm:text-xs md:text-sm text-[var(--gold-deep)]">
                ✨ SCROLL TO SEE THE INVITATION ✨
              </p>
            </div>
            <div
              className="absolute bottom-12 flex flex-col items-center gap-2 scroll-bounce"
              style={{ color: "var(--gold-deep)" }}
            >
              <span className="text-2xl">📜</span>
              <span className="text-xs tracking-widest font-display">SCROLL</span>
              <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
                <path d="M10 3 L10 25 M3 18 L10 25 L17 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </section>

          {/* INVITATION CARD */}
          <section className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-16 md:py-20 relative">
            <Reveal className="w-full max-w-3xl">
              <article
                className="relative mx-auto rounded-3xl px-5 py-8 sm:p-10 md:p-16 text-center"
                style={{
                  background: "linear-gradient(180deg, var(--ivory) 0%, var(--cream) 100%)",
                  boxShadow: "var(--shadow-card)",
                  border: "1px solid var(--gold)",
                }}
              >
                {/* Layered decorative borders */}
                <div className="absolute inset-3 rounded-2xl pointer-events-none" style={{ border: "1px dashed var(--gold-deep)", opacity: 0.5 }} />
                <div className="absolute inset-5 rounded-xl pointer-events-none" style={{ border: "1px solid var(--gold)", opacity: 0.3 }} />

                {/* Corner ornaments — diagonal motifs */}
                {(["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"] as const).map((pos) => (
                  <span
                    key={pos}
                    className={`absolute ${pos} text-xl md:text-2xl pointer-events-none`}
                    style={{ color: "var(--gold-deep)", opacity: 0.7 }}
                  >
                    ❋
                  </span>
                ))}

                {/* PASUPU KUMKUMA hanging at top of card */}
                <div className="relative -mt-16 sm:-mt-20 md:-mt-24 mb-2 flex justify-center">
                  <div className="swing">
                    <img
                      src={pasupu}
                      alt="Pasupu Kumkuma — traditional turmeric and vermilion blessing"
                      className="w-28 sm:w-36 md:w-44 h-auto drop-shadow-lg"
                      style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))" }}
                    />
                  </div>
                </div>

                {/* Ganesha */}
                <Reveal delay={100}>
                  <img src={ganesha} alt="Lord Ganesha blessing" className="mx-auto w-24 sm:w-28 md:w-36" loading="lazy" />
                </Reveal>

                <Reveal delay={300} className="mt-2">
                  <p className="font-script text-2xl sm:text-3xl md:text-4xl text-gold-gradient">
                    || Shrī Gaṇeśāya Namaḥ ||
                  </p>
                  <p className="mt-2 font-body italic text-[var(--maroon)]/70 text-xs sm:text-sm md:text-base">
                    With the blessings of Lord Ganesha
                  </p>
                </Reveal>

                {/* Divider */}
                <Reveal delay={400} className="my-6 md:my-8 flex items-center justify-center gap-3">
                  <span className="h-px w-12 sm:w-20 md:w-24 bg-[var(--gold-deep)]/40" />
                  <span className="text-[var(--gold-deep)] text-lg">❖</span>
                  <span className="h-px w-12 sm:w-20 md:w-24 bg-[var(--gold-deep)]/40" />
                </Reveal>

                <Reveal delay={500}>
                  <h1 className="font-display text-2xl sm:text-3xl md:text-5xl text-[var(--maroon)] tracking-wider">
                    GṚHA PRAVEŚA
                  </h1>
                  <p className="font-script text-xl sm:text-2xl md:text-3xl mt-2 text-[var(--gold-deep)]">
                    A Sacred House Warming
                  </p>
                </Reveal>

                <Reveal delay={700} className="mt-6 md:mt-8 max-w-xl mx-auto">
                  <p className="font-body text-base sm:text-lg md:text-xl text-[var(--maroon)] leading-relaxed min-h-[8rem]">
                    <Typewriter
                      text="With hearts full of gratitude and joy, we humbly invite you to grace our new home with your divine presence and warm blessings on this auspicious occasion."
                      speed={35}
                    />
                  </p>
                </Reveal>

                {/* Event Details */}
                <Reveal delay={900} className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { label: "DATE", value: "12th May, 2026", sub: "Tuesday" },
                    { label: "TIME", value: "10:30 AM", sub: "Onwards" },
                    { label: "VENUE", value: "Aarambh Nivas", sub: "42, Lotus Lane, Pune" },
                  ].map((d) => (
                    <div
                      key={d.label}
                      className="rounded-xl p-4 md:p-5 transition-transform hover:scale-105"
                      style={{
                        background: "var(--ivory)",
                        border: "1px solid var(--gold)",
                        boxShadow: "0 8px 20px -10px oklch(0.55 0.14 65 / 0.3)",
                      }}
                    >
                      <p className="font-display text-[10px] sm:text-xs tracking-[0.3em] text-[var(--gold-deep)]">
                        {d.label}
                      </p>
                      <p className="font-display text-lg sm:text-xl md:text-2xl mt-2 text-[var(--maroon)]">
                        {d.value}
                      </p>
                      <p className="font-body italic text-xs sm:text-sm text-[var(--maroon)]/70 mt-1">
                        {d.sub}
                      </p>
                    </div>
                  ))}
                </Reveal>

                <Reveal delay={1100} className="mt-10 md:mt-12">
                  <p className="font-display text-[10px] sm:text-xs tracking-[0.4em] text-[var(--gold-deep)]">
                    WITH WARM REGARDS
                  </p>
                  <p className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-gradient mt-3">
                    The Sharma Family
                  </p>
                  <p className="font-body italic text-sm md:text-base text-[var(--maroon)]/70 mt-2">
                    Rajesh &amp; Anjali · with Aarav &amp; Saanvi
                  </p>
                </Reveal>

                {/* Bottom diyas row */}
                <Reveal delay={1300} className="mt-10 md:mt-12 flex items-end justify-center gap-5 sm:gap-6 md:gap-10">
                  <Diya size={40} />
                  <Diya size={60} />
                  <Diya size={40} />
                </Reveal>
              </article>
            </Reveal>
          </section>

          {/* HOMAM + COW SCENE */}
          <section className="relative py-16 md:py-20 px-2 sm:px-4 overflow-hidden">
            <Reveal className="max-w-5xl mx-auto text-center mb-10 md:mb-14">
              <p className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-gradient">
                Pavitra Saṅskāra
              </p>
              <p className="font-display tracking-[0.3em] text-[10px] sm:text-xs md:text-sm text-[var(--gold-deep)] mt-2">
                THE SACRED CEREMONY
              </p>
            </Reveal>

            <Reveal delay={200}>
              <HomamScene />
            </Reveal>

            <Reveal delay={400} className="mt-12 md:mt-16 max-w-2xl mx-auto text-center px-4">
              <p className="font-body italic text-base sm:text-lg md:text-xl text-[var(--maroon)] leading-relaxed">
                "Vāstu doṣa nivāraṇāya, sarva maṅgala dāyakāya — may this home be blessed with
                peace, prosperity, and the laughter of loved ones."
              </p>
            </Reveal>
          </section>

          {/* Footer */}
          <footer className="py-12 md:py-16 px-4 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-14 sm:w-20 bg-[var(--gold-deep)]/40" />
              <span className="text-[var(--gold-deep)]">🪔</span>
              <span className="h-px w-14 sm:w-20 bg-[var(--gold-deep)]/40" />
            </div>
            <p className="font-script text-2xl sm:text-3xl md:text-4xl text-gold-gradient">
              Your presence is our blessing
            </p>
            <p className="font-display tracking-[0.3em] text-[10px] sm:text-xs mt-4 text-[var(--gold-deep)]">
              RSVP · +91 98765 43210
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
