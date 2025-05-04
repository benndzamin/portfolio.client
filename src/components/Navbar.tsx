import { useEffect, useState } from 'react'

const Navbar = () => {
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowSticky(true)
      } else {
        setShowSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Glavni navbar */}
      <nav className="top-0 left-0 w-full z-40 bg-transparent text-white p-4 relative">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Benjamin Mujkić</h1>
          <ul className="flex space-x-4">
            <li><a href="#about">O meni</a></li>
            <li><a href="#projects">Projekti</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>
      </nav>

      {/* Sticky navbar */}
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur text-white p-3 shadow-md
          transition-opacity duration-500
          ${showSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="container mx-auto flex justify-around items-center">
          <ul className="flex space-x-3 text-sm">
            <li><a href="#about">O meni</a></li>
            <li><a href="#projects">Projekti</a></li>
            <li><a href="#contact">Kontakt</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
