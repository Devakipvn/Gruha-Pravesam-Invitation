import { useEffect, useState } from "react";

import { Particles } from "@/components/Particles";
import { Reveal } from "@/components/Reveal";
import { Envelope } from "@/components/Envelope";
import { Typewriter } from "@/components/Typewriter";

import { MusicToggle } from "@/components/MusicToggle";
import { HomamScene } from "@/components/HomamScene";
import ganesha from "@/assets/ganesha.png";
import rangoli from "@/assets/rangoli.png";


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
  panchangHeading: string;
  panchang: { label: string; value: string }[];
}

const EN: CardContent = {
  blessing: "|| Shrī Gaṇeśāya Namaḥ ||",
  blessingSub: "With the blessings of Lord Ganesha",
  title: "GRUHA PRAVESAM",
  subtitle: "A Sacred House Warming Ceremony",
  invite:
    "With hearts full of gratitude and joy, we humbly invite you and your family to grace our new home with your divine presence and warm blessings on this auspicious occasion.",
  dateLabel: "DATE",
  dateValue: "Friday, 9th May 2026",
  dateSub: "Bahula Saptami",
  timeLabel: "MUHURTHAM",
  timeValue: "9:40 AM",
  timeSub: "Auspicious Time",
  venueLabel: "VENUE",
  venueValue: "Sri Lakshmi Srinivasa Towers",
  venueSub: "Eluru, Andhra Pradesh",
  addressHeading: "✦ ADDRESS ✦",
  addressLines: [
    "Flat No. 202,",
    "Sri Lakshmi Srinivasa Towers,",
    "Chataparru Road, Sunkara Vari Thota,",
    "Eluru – 534001, Andhra Pradesh",
  ],
  regards: "WITH WARM REGARDS",
  family: "The Nadiminti Family",
  hosts: "Venkata Ramana & Satyavathi\nwith sons Sandeep Kumar, Avinash Naidu & Sarath Kumar",
  flipLabel: "తెలుగు",
  panchangHeading: "✦ PANCHANGAM ✦",
  panchang: [
    { label: "Year", value: "Sri Vishvavasu Nama Samvatsaram" },
    { label: "Month", value: "Vaishakha Masam" },
    { label: "Tithi", value: "Bahula Saptami" },
    { label: "Date", value: "09-05-2026" },
    { label: "Day", value: "Friday" },
    { label: "Muhurtham", value: "Morning 9:40 AM" },
  ],
};

const TE: CardContent = {
  blessing: "|| శ్రీ గణేశాయ నమః ||",
  blessingSub: "శ్రీ గణపతి ఆశీస్సులతో",
  title: "గృహ ప్రవేశం",
  subtitle: "పవిత్ర గృహ ప్రవేశ మహోత్సవం",
  invite:
    "ఎంతో ఆనందంతో మరియు భక్తి పూర్వకంగా, మా క్రొత్త ఇంటి గృహప్రవేశ శుభ సందర్భమున మీరు మీ కుటుంబ సమేతంగా విచ్చేసి మమ్మల్ని ఆశీర్వదించవలసిందిగా హృదయపూర్వకంగా ఆహ్వానిస్తున్నాము.",
  dateLabel: "తేదీ",
  dateValue: "శుక్రవారం, మే 9, 2026",
  dateSub: "బహుళ సప్తమి",
  timeLabel: "ముహూర్తం",
  timeValue: "ఉదయం 9:40",
  timeSub: "శుభ ముహూర్తం",
  venueLabel: "వేదిక",
  venueValue: "శ్రీ లక్ష్మీ శ్రీనివాస టవర్స్",
  venueSub: "ఏలూరు, ఆంధ్రప్రదేశ్",
  addressHeading: "✦ చిరునామా ✦",
  addressLines: [
    "ఫ్లాట్ నం. 202,",
    "శ్రీ లక్ష్మీ శ్రీనివాస టవర్స్,",
    "చటపర్రు రోడ్, సుంకర వారి తోట,",
    "ఏలూరు – 534001, ఆంధ్రప్రదేశ్",
  ],
  regards: "ప్రేమపూర్వక నమస్కారములతో",
  family: "నాదిమింటి కుటుంబం",
  hosts: "వెంకట రమణ & సత్యవతి\nకుమారులు సందీప్ కుమార్, అవినాష్ నాయుడు & శరత్ కుమార్",
  flipLabel: "English",
  panchangHeading: "✦ పంచాంగం ✦",
  panchang: [
    { label: "సంవత్సరం", value: "శ్రీ విశ్వావసు నామ సంవత్సరం" },
    { label: "మాసం", value: "వైశాఖ మాసం" },
    { label: "తిథి", value: "బహుళ సప్తమి" },
    { label: "తేదీ", value: "09-05-2026" },
    { label: "వారము", value: "శుక్రవారం" },
    { label: "శుభ ముహూర్తం", value: "ఉదయం 9 గంటల 40 నిమిషాలకు" },
  ],
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
        className={`${teFont} text-xl sm:text-3xl md:text-4xl text-[var(--maroon)] break-words leading-tight`}
        style={!isTe ? { fontFamily: "var(--font-display)", letterSpacing: "0.1em", fontWeight: 700 } : { fontFamily: "var(--font-telugu)", fontWeight: 700, letterSpacing: "0.04em" }}
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

      {/* Panchangam */}
      <div className="mt-10 md:mt-12 max-w-2xl mx-auto">
        <p
          className="font-body text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] text-[var(--gold-deep)] mb-5 uppercase"
          style={{ fontWeight: 600 }}
        >
          {c.panchangHeading}
        </p>
        <div
          className="rounded-2xl p-5 sm:p-6 text-left"
          style={{
            background: "linear-gradient(160deg, var(--ivory), oklch(0.96 0.03 80))",
            border: "1px solid var(--gold)",
            boxShadow: "0 8px 20px -12px oklch(0.55 0.14 65 / 0.3)",
          }}
        >
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {c.panchang.map((p, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-3 border-b border-[var(--gold)]/20 pb-2 last:border-0">
                <dt className={`${teFont} font-body text-[11px] sm:text-xs uppercase tracking-[0.18em] text-[var(--gold-deep)]`} style={{ fontWeight: 600 }}>
                  {p.label}
                </dt>
                <dd className={`${teFont} text-sm sm:text-base text-[var(--maroon)] sm:text-right`} style={!isTe ? { fontFamily: "var(--font-body)", fontWeight: 500 } : { fontWeight: 500 }}>
                  {p.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
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
          className={`${teFont} text-3xl sm:text-4xl md:text-5xl text-gold-gradient mt-4 leading-tight overflow-visible`}
          style={!isTe ? { fontFamily: "var(--font-script)" } : { fontFamily: "var(--font-telugu)", fontWeight: 700 }}
        >
          {c.family}
        </p>
        <p className={`${teFont} font-body italic text-sm md:text-base text-[var(--maroon)]/70 mt-3 whitespace-pre-line`}>
          {c.hosts}
        </p>
      </div>
    </article >
  );
}

export function Invitation() {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<Lang>("en");
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [directionsLoading, setDirectionsLoading] = useState(false);

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
          <section className="min-h-[65vh] sm:min-h-[80vh] flex flex-col items-center justify-center px-3 sm:px-6 pt-4 pb-6 sm:pt-10 sm:pb-12 text-center relative">
            <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}>
              <p className="font-script text-[2.25rem] leading-[1.05] sm:text-5xl md:text-7xl text-gold-gradient font-bold italic">
                Gṛuha Praveśa
              </p>
              <p className="font-display tracking-[0.18em] sm:tracking-[0.35em] text-[8.5px] sm:text-xs md:text-sm mt-1.5 sm:mt-3 text-[var(--gold-deep)] uppercase">
                House Warming Ceremony
              </p>
              <div className="mt-2 sm:mt-4 flex items-center justify-center gap-2 sm:gap-3">
                <span className="h-px w-8 sm:w-20 bg-[var(--gold-deep)]/50" />
                <span className="text-[var(--gold-deep)] text-base sm:text-xl">❖</span>
                <span className="h-px w-8 sm:w-20 bg-[var(--gold-deep)]/50" />
              </div>
              <p className="font-script text-[1.75rem] leading-[1.05] sm:text-4xl md:text-5xl text-gold-gradient mt-2 sm:mt-4 font-semibold italic">
                Welcome
              </p>
              <p className="mt-2 sm:mt-4 font-display tracking-[0.14em] sm:tracking-[0.25em] text-[8.5px] sm:text-xs md:text-sm text-[var(--gold-deep)]">
                ✨ SCROLL TO SEE THE INVITATION ✨
              </p>
            </div>
            <div
              className="absolute bottom-4 sm:bottom-8 flex flex-col items-center gap-1.5 scroll-bounce"
              style={{ color: "var(--gold-deep)" }}
            >
              <span className="text-[10px] sm:text-xs tracking-widest font-display">SCROLL</span>
              <svg width="18" height="26" viewBox="0 0 20 30" fill="none">
                <path d="M10 3 L10 25 M3 18 L10 25 L17 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </section>

          {/* INVITATION CARD */}
          <section className="min-h-screen flex flex-col items-center justify-start sm:justify-center px-3 sm:px-4 pt-8 pb-10 sm:py-16 md:py-20 relative">
            {/* Language toggle */}
            <div className="mb-8 flex items-center gap-2 bg-[var(--ivory)] rounded-full p-1.5 border border-[var(--gold)] shadow-md fade-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-display tracking-wider transition-all ${lang === "en"
                  ? "bg-[var(--gold-deep)] text-[var(--ivory)] shadow"
                  : "text-[var(--maroon)] hover:bg-[var(--cream)]"
                  }`}
              >
                English
              </button>
              <button
                onClick={() => setLang("te")}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-display tracking-wider transition-all ${lang === "te"
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
              <p className="font-script text-2xl sm:text-3xl md:text-5xl text-gold-gradient leading-[1.4] pb-2 font-bold italic">
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

          {/* MAP / LOCATION */}
          <section className="relative py-16 md:py-20 px-4">
            <Reveal className="max-w-5xl mx-auto text-center mb-8 md:mb-10">
              <p className="font-script text-2xl sm:text-3xl md:text-5xl text-gold-gradient leading-[1.4] pb-2 font-bold italic">
                Find Us Here
              </p>
              <p className="font-display tracking-[0.3em] text-[10px] sm:text-xs md:text-sm text-[var(--gold-deep)] mt-2">
                LOCATION ON MAP
              </p>
              <p className="font-body text-sm sm:text-base text-[var(--maroon)]/80 mt-4 max-w-xl mx-auto leading-relaxed">
                Flat No. 202, Sri Lakshmi Srinivasa Towers,<br />
                Chataparru Road, Sunkara Vari Thota,<br />
                Eluru – 534001, Andhra Pradesh
              </p>
            </Reveal>

            <Reveal delay={150} className="max-w-4xl mx-auto px-1 sm:px-0">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--gold)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]">
                  {!mapLoaded && (
                    <div
                      className="absolute inset-0 animate-pulse flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(110deg, oklch(0.94 0.03 80) 20%, oklch(0.97 0.02 85) 40%, oklch(0.94 0.03 80) 60%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      <div className="flex flex-col items-center gap-2 text-[var(--gold-deep)]">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="animate-spin">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                          <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="font-display tracking-widest text-[10px] sm:text-xs">LOADING MAP…</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    title="Venue location on Google Maps"
                    src="https://maps.google.com/maps?q=16.701145,81.118434&z=18&output=embed"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0, display: "block" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    onLoad={() => setMapLoaded(true)}
                  />
                </div>
              </div>
              <div className="text-center mt-5">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=16.701145,81.118434"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    setDirectionsLoading(true);
                    setTimeout(() => setDirectionsLoading(false), 2500);
                  }}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-display tracking-widest text-xs sm:text-sm bg-[var(--gold-deep)] text-[var(--ivory)] shadow hover:opacity-90 transition disabled:opacity-70"
                >
                  {directionsLoading ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
                        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                      OPENING MAPS…
                    </>
                  ) : (
                    <>GET DIRECTIONS →</>
                  )}
                </a>
              </div>
            </Reveal>
          </section>

          {/* Footer */}
          <footer className="py-12 md:py-16 px-4 text-center relative">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-14 sm:w-20 bg-[var(--gold-deep)]/40" />
              <span className="text-[var(--gold-deep)]">🪔</span>
              <span className="h-px w-14 sm:w-20 bg-[var(--gold-deep)]/40" />
            </div>
            <p className="font-script text-xl sm:text-2xl md:text-3xl text-gold-gradient font-semibold italic">
              Your presence is our blessing
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919177064394?text=Hello%2C%20I%20would%20like%20to%20RSVP%20for%20the%20Griha%20Pravesh%20ceremony%20on%20May%209th%2C%202026"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-display tracking-[0.2em] text-xs sm:text-sm bg-[#25D366] text-white hover:opacity-90 transition shadow-lg hover:shadow-xl"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.988 1.51.986.986 0 00-.402 1.437l.589 1.566c.313.834 1.238 1.374 2.126 1.253a7.88 7.88 0 016.887-1.535c.84-.045 1.543-.688 1.544-1.532v-1.956a.987.987 0 00-.987-.987h-.001m11.051-3.972C19.588 2.849 15.856 1 12 1 5.925 1 .998 5.925.998 12S5.925 23 12 23c6.076 0 11.002-4.925 11.002-11 0-3.857-1.849-7.589-4.949-9.972z" />
                </svg>
                RSVP VIA WHATSAPP
              </a>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
