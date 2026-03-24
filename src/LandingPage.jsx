import { useState, useEffect } from "react";
import { useScrollY } from "./hooks/useScrollY";

import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import Philosophy   from "./components/Philosophy";
import Rooms        from "./components/Rooms";
import Experience   from "./components/Experience";
import Quote        from "./components/Quote";
import FAQ          from "./components/FAQ";
import Footer       from "./components/Footer";

/* ── Marquee strip ── */
const MARQUEE_ITEMS = [
  "Private Luxury Stay", "❧",
  "Boutique Hotel in Madurai", "❧",
  "Two Exclusive Suites", "❧",
  "Peaceful Retreat Experience", "❧",
  "Perungudi · Madurai", "❧",
  "Curated Guest Experience", "❧",
];

function Marquee() {
  return (
    <div className="bg-[#5E3023] py-[18px] overflow-hidden border-t border-[#C08552]/12">
      <div className="marquee-track">
        {[...Array(2)].flatMap((_, i) =>
          MARQUEE_ITEMS.map((text, j) => (
            <span
              key={`${i}-${j}`}
              className={`font-serif text-[15px] tracking-[0.4em] uppercase flex-shrink-0 font-light ${
                text === "❧" ? "bg-clip-text text-transparent bg-gradient-to-r from-[#895737] via-[#C08552] to-[#895737]" : "bg-clip-text text-transparent bg-gradient-to-r from-[#d5966f] via-[#C08552] to-[#f19f6c]"
              }`}
            >
              {text}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

/* ── Intro loader ── */
function IntroLoader({ loaded, out }) {
  return (
    <div className={`intro-overlay${out ? " out" : ""}`}>


      <div
        className="font-display text-[clamp(28px,5vw,46px)] text-[#F3E9DC] tracking-[0.06em] mb-5 transition-opacity duration-[800ms] delay-200"
        style={{
          opacity: loaded ? 1 : 0,
          animation: loaded ? "rise 0.9s 0.2s cubic-bezier(0.16,1,0.3,1) both" : "none",
        }}
      >
       <img src="/images/hotel_logo.png" className="h-40 max-sm:h-30" alt="" />
      </div>

      {/* Loader bar */}
      <div className="relative w-[220px] h-px bg-[#C08552]/20 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#C08552] loader-bar"
          style={{ animation: loaded ? undefined : "none" }}
        />
      </div>
    </div>
  );
}

/* ── Page ── */
export default function LandingPage() {
  const scrollY = useScrollY();
  const [introOut, setIntroOut] = useState(false);
  const [loaded,   setLoaded]   = useState(false);

  useEffect(() => {
  const hasSeenIntro = sessionStorage.getItem("intro_seen");

  if (hasSeenIntro) {
    // Skip loader
    setLoaded(true);
    setIntroOut(true);
    return;
  }

  // First time → run loader
  const t1 = setTimeout(() => setLoaded(true), 200);
  const t2 = setTimeout(() => {
    setIntroOut(true);
    sessionStorage.setItem("intro_seen", "true"); // mark as seen
  }, 2400);

  return () => {
    clearTimeout(t1);
    clearTimeout(t2);
  };
}, []);

  /* Scroll progress width */
  const progressWidth =
    typeof document !== "undefined"
      ? Math.min(
          (scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)) * 100,
          100
        )
      : 0;

  return (
    <div className="bg-[#F3E9DC] text-[#5E3023] overflow-x-hidden font-display">

      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${progressWidth}%` }}
      />

      {/* Intro loader */}
      <IntroLoader loaded={loaded} out={introOut} />

      {/* Page sections */}
      
      <Hero introOut={introOut} />
      <Marquee />
      <Philosophy />
      <Rooms />
      <Experience />
      <Quote />
      <FAQ />
      <Footer />
    </div>
  );
}
