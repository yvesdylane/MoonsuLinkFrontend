'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    const raw = localStorage.getItem('user')
    if (raw) setUser(JSON.parse(raw)) // eslint-disable-line react-hooks/set-state-in-effect
  }, [router])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/admin/login')
  }

  if (!user) return null

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-primary dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Welcome back, {user.name}
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-primary-light dark:text-zinc-300 dark:hover:bg-primary"
        >
          Sign out
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Users', href: '/admin/users', color: 'bg-accent/10 text-accent-dark dark:text-accent' },
          { label: 'Listings', href: '/admin/listings', color: 'bg-sky-50 text-sky-600 dark:bg-primary-light dark:text-sky-400' },
          { label: 'Verifications', href: '/admin/verifications', color: 'bg-amber-50 text-amber-600 dark:bg-primary-light dark:text-amber-400' },
        ].map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-primary-light"
          >
            <p className="text-sm font-semibold text-primary dark:text-white">
              {card.label}
            </p>
            <p className={`mt-4 inline-block rounded-lg px-3 py-1 text-xs font-medium ${card.color}`}>
              Manage
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
