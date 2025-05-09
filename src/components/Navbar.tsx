import { useEffect, useState } from 'react'

const Navbar = () => {
  const [showSticky, setShowSticky] = useState(false)
  const [activeHover, setActiveHover] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'projects', label: 'Home' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ]

  const renderNavItems = () => (
    <ul className="flex space-x-6">
      {navItems.map(({ id, label }) => (
        <li
          key={id}
          onMouseEnter={() => setActiveHover(id)}
          onMouseLeave={() => setActiveHover(null)}
          className={`
            transition duration-400
            ${activeHover && activeHover !== id ? 'opacity-50' : 'opacity-100'}
          `}
        >
          <a
            href={`#${id}`}
            className="text-white text-shadow-sm hover:opacity-100 hover:text-cyan-800 transition font-medium"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* Glavni navbar */}
      <nav className="top-0 left-0 w-full z-40 bg-transparent text-white p-5">
        <div className="container mx-auto flex flex-col sm:flex-row justify-center md:justify-between items-center gap-2">
          <h1 className="text-2xl font-bold hidden md:block">Benjamin Mujkić</h1>
          {renderNavItems()}
        </div>
      </nav>

      {/* Sticky navbar */}
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md text-white p-4 shadow-md
          transition-opacity duration-500
          ${showSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="container mx-auto flex justify-center">
          {renderNavItems()}
        </div>
      </nav>
    </>
  )
}

export default Navbar
