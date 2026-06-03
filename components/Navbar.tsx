'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const links = ['Features', 'How It Works', 'Products', 'Regions', 'Team']

export function Navbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 80)

      if (y > 80) setVisible(false)

      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setVisible(true), 400)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        visible && scrolled
          ? 'bg-white/80 backdrop-blur-md dark:bg-[#0f1a24]/80'
          : ''
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-lg font-bold tracking-tight text-primary dark:text-white">
            Moonso
          </span>
          <span className="text-lg font-bold tracking-tight text-accent">Link</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-primary transition hover:text-accent-dark dark:text-zinc-300 dark:hover:text-accent"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/admin/login"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-light"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}
