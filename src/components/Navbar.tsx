import { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "home" },
  { id: "expertise", label: "expertise" },
  { id: "work", label: "work" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];

const Navbar = () => {
  const [showSticky, setShowSticky] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ── sticky toggle ─────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── smooth scroll helper ──────────────────────────────────────── */
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* ── desktop nav list ──────────────────────────────────────────── */
  const renderNavItems = () => (
    <ul className="hidden md:flex space-x-6 select-none">
      {navItems.map(({ id, label }, idx) => (
        <li
          key={id}
          onMouseEnter={() => setActiveHover(id)}
          onMouseLeave={() => setActiveHover(null)}
          className={`relative transition duration-200 cursor-pointer
                      ${
                        activeHover && activeHover !== id
                          ? "opacity-40"
                          : "opacity-100"
                      }`}
        >
          <a
            onClick={scrollTo(id)}
            className="flex flex-col items-start text-white lowercase font-mono text-shadow-sm hover:text-white/80"
          >
            <span className="absolute -top-2 right-0 text-xs text-white drop-shadow-sm">
              {`0${idx + 1}`}
            </span>
            <span className="drop-shadow-md  before:content-['//'] sm:before:content-[''] md:before:content-['//'] before:mr-2">
              {label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  /* ── JSX ───────────────────────────────────────────────────────── */
  return (
    <>
      {/* Top bar (transparent) */}
      <nav className="w-full z-40 bg-transparent text-white p-5">
        <div className="mx-auto container flex items-center justify-between">
          {/* Logo / ime */}
          <h1 className="text-2xl font-bold font-mono text-nowrap">
            Benjamin Mujkić
          </h1>

          {/* Desktop meni */}
          {renderNavItems()}

          {/* Hamburger dugme (samo mobilno) */}
          <button
            className="md:hidden text-white focus:outline-none bg-transparent border-x-white hover:border-y-white hover:border-x-transparent"
            onClick={() => setMobileOpen(true)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Sticky bar (kopija desktop navigacije) */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur
                       transition-opacity duration-500
                       ${
                         showSticky
                           ? "opacity-100"
                           : "opacity-0 pointer-events-none"
                       }`}
      >
        <div className="mx-auto container flex items-center justify-between p-4 md:justify-center">
          <h1 className="text-white text-lg font-bold font-mono md:hidden">
            Benjamin Mujkić
          </h1>

          {/* Desktop meni */}
          {renderNavItems()}

          {/* Hamburger dugme (samo mobilno) */}
          <button
            className="md:hidden text-white focus:outline-none bg-transparent border-x-white hover:border-y-white hover:border-x-transparent"
            onClick={() => setMobileOpen(true)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── MOBILE OVERLAY MENU ─────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur flex flex-col items-center justify-center space-y-8 md:hidden">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              onClick={(e) => {
                scrollTo(id)(e);
                setMobileOpen(false);
              }}
              className="text-white text-2xl font-mono lowercase py-4"
            >
              // {label}
            </a>
          ))}

          {/* Close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-0 right-8 text-white/70 focus:outline-none bg-transparent border-x-white hover:border-y-white hover:border-x-transparent"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
