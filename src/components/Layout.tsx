import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import BusinessCardModal from './BusinessCardModal' // Adjust import path if inside components/

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCardOpen, setIsCardOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
  ]

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <header
        className="sticky top-0 z-50 w-full backdrop-blur-md transition-colors"
        style={{
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        }}
      >
        <div className="flex items-center justify-between px-8 py-6 md:px-10">
          {/* Brand / Name in Editorial Serif */}
          <Link
            to="/"
            className="font-serif text-2xl md:text-3xl tracking-tight transition-opacity hover:opacity-80"
            style={{ color: 'var(--text-h)' }}
          >
            Michael Wei<span style={{ color: 'var(--accent)' }}>.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-8 text-md font-medium tracking-wide">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-all ${isActive ? 'font-semibold' : 'hover:opacity-80'}`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--accent)' : 'var(--text)',
                  })}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden cursor-pointer"
            style={{ color: 'var(--text-h)' }}
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            className="border-b px-8 py-6 md:hidden space-y-4"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
          >
            <nav className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={({ isActive }) => ({
                    color: isActive ? 'var(--accent)' : 'var(--text)',
                  })}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1 px-8 py-12 md:px-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="w-full mt-auto transition-colors"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-8 md:px-10 text-xs">
          <p style={{ color: 'var(--text)' }}>
            &copy; {new Date().getFullYear()} Michael Wei. All rights reserved. All writing and images are my own.
          </p>

          <button
            type="button"
            onClick={() => setIsCardOpen(true)}
            className="hover:underline underline-offset-4 cursor-pointer font-medium"
            style={{ color: 'var(--accent)' }}
          >
            Find Me Elsewhere
          </button>
        </div>
      </footer>

      {/* Global Business Card Modal */}
      <BusinessCardModal isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />
    </div>
  )
}