'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from '@/components/ThemeToggle'

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

const navLinks = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: '/admin/users',
    label: 'Users',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    href: '/admin/listings',
    label: 'Listings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    href: '/admin/verifications',
    label: 'Verifications',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    ),
  },
  {
    href: '/admin/reports',
    label: 'Reports',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
  },
  {
    href: '/admin/issues',
    label: 'Issues',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    href: '/admin/advice',
    label: 'Advice',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    href: '/admin/alerts',
    label: 'Alerts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
]

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const userCookie = getCookie('user')
    if (!userCookie) {
      router.push('/admin/login')
      return
    }
    try {
      setUser(JSON.parse(userCookie)) // eslint-disable-line react-hooks/set-state-in-effect
    } catch {
      router.push('/admin/login')
    }
  }, [router])

  const logout = () => {
    document.cookie = 'token=; max-age=0; path=/'
    document.cookie = 'user=; max-age=0; path=/'
    router.push('/admin/login')
  }

  if (!user) return null

  const sidebarContent = (
    <>
      <div className="px-6 py-7 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-accent/20 flex items-center justify-center text-accent-dark dark:text-accent font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <p className="text-lg font-semibold text-primary dark:text-white">MoonsuLink</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">Admin dashboard</p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl bg-zinc-50 dark:bg-primary-dark p-4 text-sm text-zinc-600 dark:text-zinc-400">
          Signed in as <span className="font-medium text-primary dark:text-white">{user.name}</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-none">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                router.push(link.href)
              }}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? 'bg-accent/10 text-accent-dark dark:text-accent shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-primary hover:text-primary dark:hover:text-white'
              }`}
            >
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
                isActive
                  ? 'bg-accent/20 text-accent-dark dark:text-accent'
                  : 'bg-zinc-100 dark:bg-primary text-zinc-500 dark:text-zinc-400'
              }`}>
                {link.icon}
              </span>
              <span className="flex-1">{link.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="px-6 py-6 border-t border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={logout}
          className="flex-1 inline-flex items-center justify-center rounded-2xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-50 dark:hover:bg-primary"
        >
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-primary-dark text-zinc-900 dark:text-white">
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-r from-accent/10 via-accent/5 to-primary/5 pointer-events-none" />

      {/* Mobile header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-primary-light border-b border-zinc-200 dark:border-zinc-700 lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent-dark dark:text-accent font-bold text-sm">
              M
            </div>
            <span className="text-sm font-semibold text-primary dark:text-white">MoonsuLink</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-primary"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-primary-light border-r border-zinc-200 dark:border-zinc-700 flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 bg-white dark:bg-primary-light border-r border-zinc-200 dark:border-zinc-700">
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
