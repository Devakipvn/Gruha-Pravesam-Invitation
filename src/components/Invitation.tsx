import { useEffect, useState } from "react";

import { Particles } from "@/components/Particles";
import { Reveal } from "@/components/Reveal";
import { Envelope } from "@/components/Envelope";
import { Typewriter } from "@/components/Typewriter";

import { MusicToggle } from "@/components/MusicToggle";
import { HomamScene } from "@/components/HomamScene";
import ganesha from "@/assets/ganesha.png";
import rangoli from "@/assets/rangoli.png";
import pasupu from "@/assets/pasupu-kumkuma.png";

type Lang = "en" | "te";

interface CardContent {
  blessing: string;
  blessingSub: string;
  title: string;
  subtitle: string;
  invite: string;
  dateLabel: string;
  dateValue: string;
  dateSub: string;
  timeLabel: string;
  timeValue: string;
  timeSub: string;
  venueLabel: string;
  venueValue: string;
  venueSub: string;
  addressHeading: string;
  addressLines: string[];
  regards: string;
  family: string;
  hosts: string;
  flipLabel: string;
}

const EN: CardContent = {
  blessing: "|| Shrī Gaṇeśāya Namaḥ ||",
  blessingSub: "With the blessings of Lord Ganesha",
  title: "GṚHA PRAVEŚA",
  subtitle: "A Sacred House Warming Ceremony",
  invite:
    "With hearts full of gratitude and joy, we humbly invite you and your family to grace our new home with your divine presence and warm blessings on this auspicious occasion.",
  dateLabel: "DATE",
  dateValue: "Saturday, 3rd May",
  dateSub: "Early Morning",
  timeLabel: "TIME",
  timeValue: "4:30 AM",
  timeSub: "Brahma Muhūrta",
  venueLabel: "VENUE",
  venueValue: "Sri Lakshmi Srinivasa Towers",
  venueSub: "Eluru, Andhra Pradesh",
  addressHeading: "✦ ADDRESS ✦",
  addressLines: [
    "Sri Lakshmi Srinivasa Towers,",
    "Sunkara Vaari Thota, Venkatapuram,",
    "Venna Valli Vaari Peta, Choudimella,",
    "Eluru – 534001, Andhra Pradesh",
  ],
  regards: "WITH WARM REGARDS",
  family: "The Nadiminti Family",
  hosts: "Venkata Ramana & Satyavathi",
  flipLabel: "తెలుగు",
};

const TE: CardContent = {
  blessing: "|| శ్రీ గణేశాయ నమః ||",
  blessingSub: "శ్రీ గణపతి ఆశీస్సులతో",
  title: "గృహ ప్రవేశం",
  subtitle: "పవిత్ర గృహ ప్రవేశ మహోత్సవం",
  invite:
    "ఎంతో ఆనందంతో మరియు భక్తి పూర్వకంగా, మా క్రొత్త ఇంటి గృహప్రవేశ శుభ సందర్భమున మీరు మీ కుటుంబ సమేతంగా విచ్చేసి మమ్మల్ని ఆశీర్వదించవలసిందిగా హృదయపూర్వకంగా ఆహ్వానిస్తున్నాము.",
  dateLabel: "తేదీ",
  dateValue: "శనివారం, మే 3",
  dateSub: "తెల్లవారుజామున",
  timeLabel: "సమయం",
  timeValue: "4:30 ఉదయం",
  timeSub: "బ్రహ్మ ముహూర్తం",
  venueLabel: "వేదిక",
  venueValue: "శ్రీ లక్ష్మీ శ్రీనివాస టవర్స్",
  venueSub: "ఏలూరు, ఆంధ్రప్రదేశ్",
  addressHeading: "✦ చిరునామా ✦",
  addressLines: [
    "శ్రీ లక్ష్మీ శ్రీనివాస టవర్స్,",
    "సుంకర వారి తోట, వెంకటాపురం,",
    "వెన్నవల్లి వారి పేట, చౌడిమెల్ల,",
    "ఏలూరు – 534001, ఆంధ్రప్రదేశ్",
  ],
  regards: "ప్రేమపూర్వక నమస్కారములతో",
  family: "నాదిమింటి కుటుంబం",
  hosts: "వెంకట రమణ & సత్యవతి",
  flipLabel: "English",
};

function CardFace({ c, lang }: { c: CardContent; lang: Lang }) {
  const isTe = lang === "te";
  const teFont = isTe ? "font-telugu" : "";

  return (
    <article
      className="relative mx-auto rounded-[1.25rem] sm:rounded-[2rem] px-4 py-10 sm:px-12 sm:py-14 md:px-16 md:py-16 text-center h-full overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, var(--ivory) 0%, var(--cream) 70%, oklch(0.90 0.045 75) 100%)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--gold)",
      }}
    >
      {/* Layered decorative borders */}
      <div
        className="absolute inset-3 rounded-[1.75rem] pointer-events-none"
        style={{ border: "1px dashed var(--gold-deep)", opacity: 0.4 }}
      />
      <div
        className="absolute inset-5 rounded-[1.5rem] pointer-events-none"
        style={{ border: "1px solid var(--gold)", opacity: 0.25 }}
      />

      {/* Corner ornaments */}
      {(["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"] as const).map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} text-2xl md:text-3xl pointer-events-none select-none`}
          style={{ color: "var(--gold-deep)", opacity: 0.55 }}
        >
          ❦
        </span>
      ))}

      {/* Pasupu kumkuma at top, fully inside card */}
      <div className="mb-4 flex justify-center">
        <img
          src={pasupu}
          alt="Pasupu Kumkuma — turmeric and vermilion blessing"
          className="w-28 sm:w-32 md:w-36 h-auto object-contain"
          style={{ filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.18))" }}
        />
      </div>

      {/* Ganesha */}
      <img
        src={ganesha}
        alt="Lord Ganesha"
        className="mx-auto w-20 sm:w-24 md:w-28"
        loading="lazy"
      />

      {/* Blessing */}
      <p
        className={`mt-3 sm:mt-4 ${teFont} text-lg sm:text-2xl md:text-3xl text-gold-gradient tracking-wide font-semibold italic`}
        style={!isTe ? { fontFamily: "var(--font-script)" } : undefined}
      >
        {c.blessing}
      </p>
      <p className={`mt-1 ${teFont} font-body italic text-[var(--maroon)]/65 text-[11px] sm:text-sm md:text-base tracking-wide`}>
        {c.blessingSub}
      </p>

      <div className="my-7 md:my-9 gold-divider">
        <span className="text-[var(--gold-deep)] text-base">✦</span>
      </div>

      {/* Title */}
      <h1
        className={`${teFont} text-xl sm:text-3xl md:text-4xl text-[var(--maroon)] break-words`}
        style={
          !isTe
            ? { fontFamily: "var(--font-display)", letterSpacing: "0.1em", fontWeight: 700 }
            : { fontWeight: 700, letterSpacing: "0.04em" }
        }
      >
        {c.title}
      </h1>
      <p
        className={`${teFont} text-base sm:text-lg md:text-xl mt-3 text-[var(--gold-deep)] tracking-wider`}
        style={!isTe ? { fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 500 } : undefined}
      >
        {c.subtitle}
      </p>

      {/* Invitation paragraph — typewriter on scroll, full text always visible */}
      <div
        className={`mt-8 md:mt-10 max-w-xl mx-auto ${teFont} text-base sm:text-lg md:text-xl text-[var(--maroon)]/90 leading-[1.95] relative`}
        style={!isTe ? { fontFamily: "var(--font-body)" } : undefined}
      >
        {/* Invisible ghost text reserves the exact full height so nothing clips */}
        <p aria-hidden className="invisible whitespace-pre-wrap m-0">
          {c.invite}
        </p>
        {/* Animated text overlays the reserved space */}
        <p className="absolute inset-0 m-0 whitespace-pre-wrap">
          <Typewriter key={`${lang}-invite`} text={c.invite} speed={55} />
        </p>
      </div>

      {/* Event Details */}
      <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
        {[
          { label: c.dateLabel, value: c.dateValue, sub: c.dateSub, icon: "❖" },
          { label: c.timeLabel, value: c.timeValue, sub: c.timeSub, icon: "✶" },
          { label: c.venueLabel, value: c.venueValue, sub: c.venueSub, icon: "❋" },
        ].map((d, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 md:p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "linear-gradient(160deg, var(--ivory), oklch(0.96 0.03 80))",
              border: "1px solid var(--gold)",
              boxShadow: "0 10px 24px -12px oklch(0.55 0.14 65 / 0.35)",
            }}
          >
            <p className="text-[var(--gold-deep)] text-base">{d.icon}</p>
            <p
              className="font-body text-[10px] sm:text-[11px] tracking-[0.35em] text-[var(--gold-deep)] mt-2 uppercase"
              style={{ fontWeight: 600 }}
            >
              {d.label}
            </p>
            <p className={`${teFont} text-base sm:text-lg md:text-xl mt-3 text-[var(--maroon)] leading-tight`}
              style={!isTe ? { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.04em" } : { fontWeight: 600 }}
            >
              {d.value}
            </p>
            <p className={`${teFont} font-body italic text-xs sm:text-sm text-[var(--maroon)]/65 mt-1.5`}>
              {d.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="mt-10 md:mt-12 max-w-2xl mx-auto">
        <p
          className="font-body text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-[var(--gold-deep)] mb-4 uppercase"
          style={{ fontWeight: 600 }}
        >
          {c.addressHeading}
        </p>
        <p className={`${teFont} font-body text-sm sm:text-base md:text-lg text-[var(--maroon)]/85 leading-[1.9]`}>
          {c.addressLines.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>

      <div className="my-10 md:my-12 gold-divider">
        <span className="text-[var(--gold-deep)] text-base">✦</span>
      </div>

      <div>
        <p
          className="font-body text-[10px] sm:text-xs tracking-[0.45em] text-[var(--gold-deep)] uppercase"
          style={{ fontWeight: 600 }}
        >
          {c.regards}
        </p>
        <p
          className={`${teFont} text-3xl sm:text-4xl md:text-5xl text-gold-gradient mt-4`}
          style={!isTe ? { fontFamily: "var(--font-script)" } : { fontWeight: 700 }}
        >
          {c.family}
        </p>
        <p className={`${teFont} font-body italic text-sm md:text-base text-[var(--maroon)]/70 mt-3`}>
          {c.hosts}
        </p>
      </div>
    </article>
  );
}

export function Invitation() {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = envelopeOpened ? "auto" : "hidden";
  }, [envelopeOpened]);

  const isFlipped = lang === "te";

  return (
    <div className="relative min-h-screen w-full">
      {/* ENVELOPE ENTRY — full screen until opened */}
      {!envelopeOpened && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:py-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, oklch(0.92 0.04 70) 0%, oklch(0.82 0.06 55) 50%, oklch(0.65 0.08 45) 100%)",
          }}
        >
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
            <Envelope onOpen={() => setEnvelopeOpened(true)}>
              <div />
            </Envelope>
          </div>
        </div>
      )}

      {envelopeOpened && (
        <>
          <Particles count={22} />
          <MusicToggle />

          <div
            className="fixed inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-[0.07]"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <img src={rangoli} alt="" className="w-[80vmin] h-[80vmin]" />
          </div>

          {/* HERO welcome */}
          <section className="min-h-[88vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-0 text-center relative">
            <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
              <p className="font-script text-4xl sm:text-5xl md:text-7xl text-gold-gradient leading-tight font-bold italic">
                Gṛha Praveśa
              </p>
              <p className="font-display tracking-[0.2em] sm:tracking-[0.35em] text-[9px] sm:text-xs md:text-sm mt-2 sm:mt-3 text-[var(--gold-deep)] uppercase">
                House Warming Ceremony
              </p>
              <div className="mt-5 sm:mt-7 flex items-center justify-center gap-3">
                <span className="h-px w-10 sm:w-20 bg-[var(--gold-deep)]/50" />
                <span className="text-[var(--gold-deep)] text-lg sm:text-xl">❖</span>
                <span className="h-px w-10 sm:w-20 bg-[var(--gold-deep)]/50" />
              </div>
              <p className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-gradient leading-tight mt-4 sm:mt-5 font-semibold italic">
                Welcome
              </p>
              <p className="mt-4 sm:mt-5 font-display tracking-[0.15em] sm:tracking-[0.25em] text-[9px] sm:text-xs md:text-sm text-[var(--gold-deep)]">
                ✨ SCROLL TO SEE THE INVITATION ✨
              </p>
            </div>
            <div
              className="absolute bottom-6 sm:bottom-12 flex flex-col items-center gap-2 scroll-bounce"
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
          <section className="min-h-screen flex flex-col items-center justify-start sm:justify-center px-3 sm:px-4 pt-8 pb-10 sm:py-16 md:py-20 relative">
            {/* Language toggle */}
            <div className="mb-8 flex items-center gap-2 bg-[var(--ivory)] rounded-full p-1.5 border border-[var(--gold)] shadow-md fade-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-display tracking-wider transition-all ${
                  lang === "en"
                    ? "bg-[var(--gold-deep)] text-[var(--ivory)] shadow"
                    : "text-[var(--maroon)] hover:bg-[var(--cream)]"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLang("te")}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-display tracking-wider transition-all ${
                  lang === "te"
                    ? "bg-[var(--gold-deep)] text-[var(--ivory)] shadow"
                    : "text-[var(--maroon)] hover:bg-[var(--cream)]"
                }`}
              >
                తెలుగు
              </button>
            </div>

            <Reveal className="w-full max-w-3xl flip-perspective">
              <div className={`flip-inner ${isFlipped ? "is-flipped" : ""}`}>
                <div className="flip-face">
                  <CardFace c={EN} lang="en" />
                </div>
                <div className="flip-face flip-back">
                  <CardFace c={TE} lang="te" />
                </div>
              </div>
            </Reveal>
          </section>

          {/* HOMAM + COW SCENE */}
          <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-2 sm:px-4 overflow-hidden">
            <Reveal className="max-w-5xl mx-auto text-center mb-10 md:mb-14 pt-4">
              <p className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-gradient leading-[1.4] pb-2">
                Pavitra Saṅskāra
              </p>
              <p className="font-display tracking-[0.3em] text-[10px] sm:text-xs md:text-sm text-[var(--gold-deep)] mt-3">
                THE SACRED CEREMONY
              </p>
            </Reveal>

            <Reveal delay={200}>
              <HomamScene />
            </Reveal>

            <Reveal delay={400} className="mt-12 md:mt-16 max-w-2xl mx-auto text-center px-4">
              <p className="font-body italic text-base sm:text-lg md:text-xl text-[var(--maroon)] leading-relaxed">
                "May this home be blessed with peace, prosperity, and the laughter of loved ones."
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
