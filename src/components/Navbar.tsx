import { useEffect, useState } from 'react'

interface NavItem {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'home' },
  { id: 'expertise',    label: 'expertise' },
  { id: 'work',         label: 'work' },
  { id: 'experience',   label: 'experience' },
  { id: 'contact',      label: 'contact' },
]

const Navbar = () => {
  const [showSticky, setShowSticky]   = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)

  /*  ─── show / hide sticky bar on scroll ─────────────────────────── */
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

/*  ─── helper: smooth-scroll + no hash in URL ───────────────────── */
  const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  /*  ─── nav list ─────────────────────────────────────────────────── */
const renderNavItems = () => (
  <ul className="flex space-x-6 select-none">
    {navItems.map(({ id, label }, idx) => (
      <li
        key={id}
        onMouseEnter={() => setActiveHover(id)}
        onMouseLeave={() => setActiveHover(null)}
        className={`relative transition duration-200 cursor-pointer
          ${activeHover && activeHover !== id ? 'opacity-40' : 'opacity-100'}
        `}
      >
        <a
          onClick={scrollTo(id)}
          className="flex flex-col items-start text-white lowercase font-mono text-shadow-sm hover:text-white/80"
        >
          {/* Broj gore desno, bliže tekstu */}
          <span className="absolute -top-2 right-0 text-xs text-white drop-shadow-sm">
            {idx < 9 ? `0${idx}` : idx}
          </span>

          {/* Label ispod */}
          <span className="drop-shadow-md">// {label.replace('// ', '')}</span>
        </a>
      </li>
    ))}
  </ul>
)

  return (
    <>
      {/* normalna traka */}
      <nav className="w-full z-40 bg-transparent text-white p-5">
        <div className="mx-auto container flex flex-col md:flex-row items-center justify-center md:justify-between gap-2">
          <h1 className="hidden md:block text-2xl font-bold font-sans">Benjamin Mujkić</h1>
          {renderNavItems()}
        </div>
      </nav>

      {/* sticky traka */}
      <nav className={`fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur
                       transition-opacity duration-500
                       ${showSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="mx-auto container flex justify-center py-3">{renderNavItems()}</div>
      </nav>
    </>
  )
}

export default Navbar
