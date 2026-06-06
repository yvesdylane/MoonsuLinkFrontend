'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const links = ['Features', 'How It Works', 'Products', 'Regions', 'Team']

export function Navbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)
      setVisible(y <= 80 || y < lastY.current)
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
        } ${scrolled ? 'bg-white/80 backdrop-blur-md dark:bg-primary-dark/80' : 'bg-transparent'}`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50">
          <span className={`text-lg font-bold ${scrolled ? 'text-primary' : 'text-white'} dark:text-white`}>
            Moonsu
          </span>
          <span className="text-lg font-bold text-accent">Link</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-zinc-600 transition-all duration-200 hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-sm dark:text-zinc-400 dark:hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 md:hidden dark:text-zinc-400 dark:hover:bg-primary"
            aria-label="Toggle menu"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 md:hidden dark:border-zinc-700 dark:bg-primary-light">
          <nav className="flex flex-col gap-3">
            {links.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 dark:text-zinc-400 dark:hover:bg-primary"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
