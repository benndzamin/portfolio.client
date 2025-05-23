import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderNavItems = () => (
    <ul className="hidden md:flex select-none">
      {navItems.map(({ id, label }, idx) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <li
            key={id}
            onMouseEnter={() => setActiveHover(id)}
            onMouseLeave={() => setActiveHover(null)}
            className={`relative transition duration-200 cursor-pointer ${
              activeHover && activeHover !== id ? "opacity-40" : "opacity-100"
            }`}
          >
            <a
              onClick={scrollTo(id)}
              className="flex flex-col items-start text-white lowercase font-mono text-shadow-sm hover:text-white/80 px-5"
            >
              <span className="absolute -top-2.5 right-0 text-[0.6rem] text-white drop-shadow-sm px-5">
                {`0${idx + 1}`}
              </span>
              <span className="drop-shadow-md before:content-['//'] sm:before:content-[''] md:before:content-['//'] before:mr-2">
                {label}
              </span>
            </a>
          </li>
        </motion.div>
      ))}
    </ul>
  );

  return (
    <>
      {/* Top bar */}
      <nav className="w-full z-40 bg-transparent text-white p-5">
        <div className="mx-auto container flex items-center lg:justify-between md:justify-center">
          <h1 className="text-2xl font-bold font-mono text-nowrap hidden lg:block">
            Benjamin Mujkić
          </h1>

          {renderNavItems()}

          <button
            className="md:hidden text-white focus:outline-none bg-transparent border-x-white hover:border-y-white hover:border-x-transparent ml-auto"
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

      {/* Sticky bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur transition-opacity duration-500 ${
          showSticky ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto container flex items-center justify-between p-4 md:justify-center">
          <h1 className="text-white text-lg font-bold font-mono md:hidden">
            Benjamin Mujkić
          </h1>

          {renderNavItems()}

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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navItems.map(({ id, label }, i) => (
              <motion.a
                key={id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1 }}
                onClick={(e) => {
                  scrollTo(id)(e);
                  setMobileOpen(false);
                }}
                className="text-white text-2xl font-mono lowercase py-4"
              >
                // {label}
              </motion.a>
            ))}

            <motion.button
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: navItems.length * 0.1 }}
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
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
