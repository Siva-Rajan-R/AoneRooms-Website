import { useState, useEffect } from "react";
import { useScrollY } from "../hooks/useScrollY";

const NAV_LINKS = ["Rooms", "Philosophy", "Experience", "Contact"];

export default function Navbar() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 60;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          MAIN NAVIGATION - Glassmorphism Effect
          ═══════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[600] transition-all duration-700 ease-out ${
          scrolled ? "py-3" : "py-5 lg:py-6"
        }`}
      >
        <div
          className={`max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-14 transition-all duration-700 ${
            scrolled && !menuOpen
              ? "bg-white/50 backdrop-blur-3xl rounded-2xl mx-4 sm:mx-8 shadow-[0_8px_32px_rgba(94,48,35,0.12)]"
              : "bg-transparent"
          }`}
        >
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* ── Logo ── */}
            <a
              href="/"
              className="relative z-[600] group flex items-center gap-3"
            >
              <div className="relative">
                <img
                  src="/images/hotel_logo.png"
                  alt="A1 Hotel"
                  className={`transition-all duration-700 object-contain ${
                    scrolled ? "h-10 sm:h-12" : "h-12 sm:h-16 lg:h-14"
                  }`}
                />
                {/* Logo glow effect on hover */}
                <div className="absolute inset-0 bg-[#C08552]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </a>

            {/* ── Desktop Navigation Links ── */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="relative font-jost text-[13px] tracking-[0.15em] uppercase font-semibold group py-2 overflow-hidden"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      scrolled
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-[#895737] via-[#C08552] to-[#895737]"
                        : "text-white"
                    } group-hover:text-`}
                  >
                    {link}
                  </span>

                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#895737] to-[#C08552] transition-all duration-500 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* ── CTA Button (Desktop) ── */}
            <a
              href="#contact"
              className="hidden lg:flex items-center gap-2 font-jost text-[12px] tracking-[0.2em] uppercase font-semibold
              px-7 py-3.5 relative overflow-hidden group/btn transition-all duration-500 hover:scale-105 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #895737 0%, #C08552 100%)",
                boxShadow: "0 4px 20px rgba(137, 87, 55, 0.3)",
              }}
            >
              {/* Gradient overlay (reverse on hover) */}
              <span className="absolute inset-0 bg-gradient-to-r from-[#C08552] to-[#895737] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

              {/* Glass overlay */}
              <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

              {/* Shine sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Text */}
              <span className="relative z-10 text-[#F3E9DC]">Reserve Now</span>

              {/* Arrow */}
              <svg
                className="relative z-10 w-4 h-4 text-[#F3E9DC] transform transition-transform duration-500 group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            {/* ── Mobile Menu Button ── */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative z-[600] w-12 h-12 flex flex-col items-center justify-center gap-[5px] group"
              aria-label="Toggle menu"
            >
              {/* Hamburger background circle */}
              <div className="absolute inset-0 bg-[#895737]/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />

              {/* Hamburger lines */}
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block w-6 h-[2px] transition-all duration-500 ease-out ${
                    menuOpen ? "bg-[#F3E9DC]" : "bg-[#895737]"
                  } ${
                    menuOpen && i === 0
                      ? "rotate-45 translate-y-[7px]"
                      : menuOpen && i === 2
                      ? "-rotate-45 -translate-y-[7px]"
                      : ""
                  } ${menuOpen && i === 1 ? "opacity-0 scale-0" : ""}`}
                  style={{
                    boxShadow: menuOpen ? "0 0 8px rgba(243, 233, 220, 0.4)" : "none",
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════
          MOBILE MENU - Full Screen Glassmorphism Overlay
          ═══════════════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-[550] lg:hidden transition-all duration-700 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Animated Background Blur */}
        <div
          className={`absolute inset-0 transition-all duration-700 ${
            menuOpen ? "backdrop-blur-3xl" : "backdrop-blur-none"
          }`}
          style={{
            background: menuOpen
              ? "linear-gradient(135deg, rgba(94, 48, 35, 0.97) 0%, rgba(107, 56, 41, 0.95) 50%, rgba(137, 87, 55, 0.97) 100%)"
              : "transparent",
          }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top right glow */}
          <div
            className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[120px] transition-all duration-1000 ${
              menuOpen ? "opacity-30 scale-100" : "opacity-0 scale-50"
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(192, 133, 82, 0.6) 0%, transparent 70%)",
            }}
          />

          {/* Bottom left glow */}
          <div
            className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-[120px] transition-all duration-1000 delay-200 ${
              menuOpen ? "opacity-30 scale-100" : "opacity-0 scale-50"
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(137, 87, 55, 0.6) 0%, transparent 70%)",
            }}
          />

          {/* Decorative lines */}
          <div
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#C08552]/40 to-transparent transition-all duration-1000 ${
              menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          />
        </div>

        {/* Menu Content Container */}
<div className="relative h-full flex items-center justify-center px-6">

  {/* Glass Card */}
  <div
    className={`relative w-full max-w-md
    backdrop-blur-2xl bg-white/10 border border-white/20
    rounded-[28px] px-8 py-12
    shadow-[0_20px_80px_rgba(0,0,0,0.35)]
    transition-all duration-700 ${
      menuOpen
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-95 translate-y-6"
    }`}
  >

    {/* glass highlight */}
    <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/25 via-white/5 to-transparent opacity-60" />

    {/* glow */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
      bg-gradient-to-br from-[#C08552]/20 to-transparent rounded-[28px]" />

    <div className="relative z-10">

      <nav className="w-full flex flex-col gap-2 mb-10">

  {NAV_LINKS.map((link, index) => (
    <a
      key={link}
      href={`#${link.toLowerCase()}`}
      onClick={() => setMenuOpen(false)}
      className="group relative w-full px-5 py-4 rounded-xl
      flex items-center justify-between
      text-[#F3E9DC]
      transition-all duration-300"

      style={{
        opacity: menuOpen ? 1 : 0,
        transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* LEFT TEXT */}
      <span className="font-display text-[22px] tracking-wide">
        {link}
      </span>

      {/* RIGHT ARROW */}
      <svg
        className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M9 5l7 7-7 7"
        />
      </svg>

      {/* hover glass bg */}
      <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition" />

      {/* subtle border */}
      <div className="absolute bottom-0 left-5 right-5 h-px bg-[#C08552]/20" />
    </a>
  ))}

</nav>

      {/* divider */}
      {/* <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C08552]/40 to-transparent mb-10" /> */}

      {/* CTA BUTTON */}
      <a
        href="#contact"
        onClick={() => setMenuOpen(false)}
        className="group/btn relative w-full flex items-center justify-center gap-2
        font-jost text-[12px] tracking-[0.2em] uppercase font-semibold
        px-10 py-4 rounded-xl overflow-hidden
        text-[#F3E9DC]
        transition-all duration-500 hover:scale-[1.02]"
        style={{
          background: "linear-gradient(135deg, #895737 0%, #C08552 100%)",
          boxShadow: "0 6px 25px rgba(137, 87, 55, 0.35)",
        }}
      >
        {/* Shine */}
        <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700
          bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Hover overlay */}
        <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition bg-[#C08552]" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          Check Availability

          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </a>
      {/* CONTACT */}
      <div className="mt-10 text-center">
        <p className="font-jost text-[11px] tracking-[0.3em] uppercase text-[#C08552] mb-3">
          Call Directly
        </p>

        <div className="flex gap-x-6">
            <a
            href="tel:9677760535"
            className="flex items-center justify-center gap-2 font-display text-xl text-[#F3E9DC]
            transition hover:text-[#C08552]"
          >
            {/* phone icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.94l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.94-.45l2.064.516A2 2 0 0119.72 19H22a2 2 0 012 2v1a1 1 0 01-1 1C10.745 23 1 13.255 1 1a1 1 0 011-1h1a2 2 0 012 2v2.28z"
              />
            </svg>

            9677760535
          </a>

          <a
            href="tel:9600726535"
            className="flex items-center justify-center gap-2 font-display text-xl text-[#F3E9DC]
            transition hover:text-[#C08552]"
          >
            {/* phone icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.516 2.064a2 2 0 01-.45 1.94l-1.27 1.27a16.001 16.001 0 006.586 6.586l1.27-1.27a2 2 0 011.94-.45l2.064.516A2 2 0 0119.72 19H22a2 2 0 012 2v1a1 1 0 01-1 1C10.745 23 1 13.255 1 1a1 1 0 011-1h1a2 2 0 012 2v2.28z"
              />
            </svg>

            9600726535
          </a>
        </div>
        

        <p className="font-jost text-[12px] text-[#F3E9DC]/60 mt-2">
          5 mins from Madurai Airport
        </p>
      </div>

    </div>
  </div>
</div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          GLOBAL ANIMATION STYLES
          ═══════════════════════════════════════════════════════ */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Smooth hover transitions */
        a {
          -webkit-tap-highlight-color: transparent;
        }

        /* Better mobile touch feedback */
        @media (max-width: 1024px) {
          button:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </>
  );
}