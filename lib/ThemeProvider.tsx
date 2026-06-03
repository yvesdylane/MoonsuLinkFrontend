'use client'

import { useEffect, type ReactNode } from 'react'

function getTheme(): 'dark' | 'light' {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  } catch {}
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', getTheme() === 'dark')
  }, [])

  return <>{children}</>
}
