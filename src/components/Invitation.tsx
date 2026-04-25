import { useEffect, useState } from "react";
import { DoorEntry } from "@/components/DoorEntry";
import { Particles } from "@/components/Particles";
import { Reveal } from "@/components/Reveal";
import { Typewriter } from "@/components/Typewriter";
import { Diya } from "@/components/Diya";
import { MusicToggle } from "@/components/MusicToggle";
import ganesha from "@/assets/ganesha.png";
import border from "@/assets/border-ornament.png";
import rangoli from "@/assets/rangoli.png";
import puja from "@/assets/puja-scene.png";

export function Invitation() {
  const [opened, setOpened] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (opened) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
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
            <div className="fade-up" style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}>
              <p className="font-script text-6xl md:text-8xl text-gold-gradient leading-none">
                Welcome
              </p>
              <p className="mt-6 font-display tracking-[0.3em] text-sm md:text-base text-[var(--gold-deep)]">
                ✨ PLEASE SCROLL TO SEE THE INVITATION ✨
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
          <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
            <Reveal className="w-full max-w-3xl">
              <article
                className="relative mx-auto rounded-3xl p-8 md:p-16 text-center"
                style={{
                  background: "linear-gradient(180deg, var(--ivory) 0%, var(--cream) 100%)",
                  boxShadow: "var(--shadow-card)",
                  border: "1px solid var(--gold)",
                }}
              >
                {/* corner ornaments via borders */}
                <div className="absolute inset-3 rounded-2xl pointer-events-none" style={{ border: "1px solid var(--gold-deep)", opacity: 0.4 }} />

                {/* Side borders */}
                <img
                  src={border}
                  alt=""
                  className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[80%] w-auto pointer-events-none sway"
                  style={{ filter: "drop-shadow(0 4px 12px oklch(0.55 0.14 65 / 0.3))" }}
                />
                <img
                  src={border}
                  alt=""
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[80%] w-auto pointer-events-none sway"
                  style={{ filter: "drop-shadow(0 4px 12px oklch(0.55 0.14 65 / 0.3))", animationDelay: "1s" }}
                />

                {/* Ganesha */}
                <Reveal delay={100}>
                  <img src={ganesha} alt="Lord Ganesha blessing" className="mx-auto w-28 md:w-36" loading="lazy" />
                </Reveal>

                <Reveal delay={300} className="mt-2">
                  <p className="font-script text-3xl md:text-4xl text-gold-gradient">
                    || Shrī Gaṇeśāya Namaḥ ||
                  </p>
                  <p className="mt-2 font-body italic text-[var(--maroon)]/70 text-sm md:text-base">
                    With the blessings of Lord Ganesha
                  </p>
                </Reveal>

                {/* Divider */}
                <Reveal delay={400} className="my-8 flex items-center justify-center gap-3">
                  <span className="h-px w-16 md:w-24 bg-[var(--gold-deep)]/40" />
                  <span className="text-[var(--gold-deep)] text-lg">❖</span>
                  <span className="h-px w-16 md:w-24 bg-[var(--gold-deep)]/40" />
                </Reveal>

                <Reveal delay={500}>
                  <h1 className="font-display text-3xl md:text-5xl text-[var(--maroon)] tracking-wider">
                    GṚHA PRAVEŚA
                  </h1>
                  <p className="font-script text-2xl md:text-3xl mt-2 text-[var(--gold-deep)]">
                    A Sacred House Warming
                  </p>
                </Reveal>

                <Reveal delay={700} className="mt-8 max-w-xl mx-auto">
                  <p className="font-body text-lg md:text-xl text-[var(--maroon)] leading-relaxed min-h-[8rem]">
                    <Typewriter
                      text="With hearts full of gratitude and joy, we humbly invite you to grace our new home with your divine presence and warm blessings on this auspicious occasion."
                      speed={35}
                    />
                  </p>
                </Reveal>

                {/* Event Details */}
                <Reveal delay={900} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "DATE", value: "12th May, 2026", sub: "Tuesday" },
                    { label: "TIME", value: "10:30 AM", sub: "Onwards" },
                    { label: "VENUE", value: "Aarambh Nivas", sub: "42, Lotus Lane, Pune" },
                  ].map((d) => (
                    <div
                      key={d.label}
                      className="rounded-xl p-5 transition-transform hover:scale-105"
                      style={{
                        background: "var(--ivory)",
                        border: "1px solid var(--gold)",
                        boxShadow: "0 8px 20px -10px oklch(0.55 0.14 65 / 0.3)",
                      }}
                    >
                      <p className="font-display text-xs tracking-[0.3em] text-[var(--gold-deep)]">
                        {d.label}
                      </p>
                      <p className="font-display text-xl md:text-2xl mt-2 text-[var(--maroon)]">
                        {d.value}
                      </p>
                      <p className="font-body italic text-sm text-[var(--maroon)]/70 mt-1">
                        {d.sub}
                      </p>
                    </div>
                  ))}
                </Reveal>

                <Reveal delay={1100} className="mt-12">
                  <p className="font-display text-xs tracking-[0.4em] text-[var(--gold-deep)]">
                    WITH WARM REGARDS
                  </p>
                  <p className="font-script text-4xl md:text-5xl text-gold-gradient mt-3">
                    The Sharma Family
                  </p>
                  <p className="font-body italic text-[var(--maroon)]/70 mt-2">
                    Rajesh &amp; Anjali · with Aarav &amp; Saanvi
                  </p>
                </Reveal>

                {/* Bottom diyas row */}
                <Reveal delay={1300} className="mt-12 flex items-end justify-center gap-6 md:gap-10">
                  <Diya size={50} />
                  <Diya size={70} />
                  <Diya size={50} />
                </Reveal>
              </article>
            </Reveal>
          </section>

          {/* PUJA SCENE */}
          <section className="relative py-20 px-4 overflow-hidden">
            <Reveal className="max-w-5xl mx-auto text-center">
              <p className="font-script text-4xl md:text-5xl text-gold-gradient">
                Pavitra Saṅskāra
              </p>
              <p className="font-display tracking-[0.3em] text-xs md:text-sm text-[var(--gold-deep)] mt-2">
                THE SACRED CEREMONY
              </p>
            </Reveal>

            <Reveal delay={200} className="mt-12 max-w-5xl mx-auto relative">
              {/* Glow behind scene */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, oklch(0.85 0.18 75 / 0.35) 0%, transparent 60%)",
                  filter: "blur(40px)",
                }}
              />
              <img
                src={puja}
                alt="A couple performing the griha pravesh puja with their children and a calm cow nearby"
                className="relative w-full h-auto"
                loading="lazy"
                style={{ filter: "drop-shadow(0 30px 60px oklch(0.32 0.10 25 / 0.25))" }}
              />
              {/* Floating diyas in front */}
              <div className="absolute bottom-2 left-4 md:left-12">
                <Diya size={40} />
              </div>
              <div className="absolute bottom-2 right-4 md:right-12">
                <Diya size={40} />
              </div>
            </Reveal>

            <Reveal delay={400} className="mt-16 max-w-2xl mx-auto text-center">
              <p className="font-body italic text-lg md:text-xl text-[var(--maroon)] leading-relaxed">
                "Vāstu doṣa nivāraṇāya, sarva maṅgala dāyakāya — may this home be blessed with
                peace, prosperity, and the laughter of loved ones."
              </p>
            </Reveal>
          </section>

          {/* Footer */}
          <footer className="py-16 px-4 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-20 bg-[var(--gold-deep)]/40" />
              <span className="text-[var(--gold-deep)]">🪔</span>
              <span className="h-px w-20 bg-[var(--gold-deep)]/40" />
            </div>
            <p className="font-script text-3xl md:text-4xl text-gold-gradient">
              Your presence is our blessing
            </p>
            <p className="font-display tracking-[0.3em] text-xs mt-4 text-[var(--gold-deep)]">
              RSVP · +91 98765 43210
            </p>
          </footer>
        </>
      )}
    </div>
  );
}
