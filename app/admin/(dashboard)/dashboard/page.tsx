'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api, type Stats } from '@/services/api'

const navCards = [
  { label: 'Users', href: '/admin/users', color: 'bg-accent/10 text-accent-dark dark:text-accent' },
  { label: 'Listings', href: '/admin/listings', color: 'bg-sky-50 text-sky-600 dark:bg-primary-light dark:text-sky-400' },
  { label: 'Verifications', href: '/admin/verifications', color: 'bg-amber-50 text-amber-600 dark:bg-primary-light dark:text-amber-400' },
  { label: 'Reports', href: '/admin/reports', color: 'bg-rose-50 text-rose-600 dark:bg-primary-light dark:text-rose-400' },
  { label: 'Issues', href: '/admin/issues', color: 'bg-purple-50 text-purple-600 dark:bg-primary-light dark:text-purple-400' },
  { label: 'Alerts', href: '/admin/alerts', color: 'bg-orange-50 text-orange-600 dark:bg-primary-light dark:text-orange-400' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')

  const loadStats = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await api.getStats(token)
      setStats(res.data)
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadStats() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadStats])

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">
                Welcome back
              </p>
              <h1 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">
                Dashboard
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
                Overview of your platform activity at a glance.
              </p>
            </div>
            <button
              onClick={loadStats}
              disabled={loading}
              className="rounded-2xl sm:rounded-3xl bg-primary dark:bg-accent-dark px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white dark:text-primary transition hover:bg-primary-light dark:hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !stats && (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 animate-pulse">
              <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-600 rounded mb-3" />
              <div className="h-8 w-16 bg-zinc-200 dark:bg-zinc-600 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <>
          {/* Row 1: Core metrics */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
            {/* Users */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Users</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-primary dark:text-white">
                {stats.total_users}
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <span className="text-accent-dark dark:text-accent">{stats.users_by_role.buyer}</span> buyer ·{' '}
                <span className="text-accent-dark dark:text-accent">{stats.users_by_role.farmer}</span> farmer ·{' '}
                <span className="text-accent-dark dark:text-accent">{stats.users_by_role.admin}</span> admin
              </p>
            </div>

            {/* Listings */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Listings</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-primary dark:text-white">
                {stats.total_listings}
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                Across {Object.keys(stats.listings_by_region).length} regions
              </p>
            </div>

            {/* Interests & Messages */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Community</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-primary dark:text-white">
                {stats.total_interests}
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                interests · {stats.messages_last_24h} msgs (24h)
              </p>
            </div>

            {/* Pending Verifications */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-amber-50/50 dark:bg-amber-900/10 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400">Verifications</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-amber-700 dark:text-amber-300">
                {stats.pending_verifications}
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-amber-600/70 dark:text-amber-400/70">
                pending approval
              </p>
            </div>
          </div>

          {/* Row 2: Moderation */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
            {/* Reports */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Reports</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-primary dark:text-white">
                {stats.total_reports}
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <span className="text-rose-500">{stats.reports_by_status.pending}</span> pending ·{' '}
                <span className="text-accent-dark dark:text-accent">{stats.reports_by_status.reviewed}</span> reviewed ·{' '}
                <span className="text-zinc-400">{stats.reports_by_status.dismissed}</span> dismissed
              </p>
            </div>

            {/* Issues */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Issues</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-primary dark:text-white">
                {stats.total_issues}
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <span className="text-rose-500">{stats.issues_by_status.open}</span> open ·{' '}
                <span className="text-accent-dark dark:text-accent">{stats.issues_by_status.resolved}</span> resolved
              </p>
            </div>

            {/* Alerts */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Alerts</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-primary dark:text-white">
                {stats.total_alerts}
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                active notifications
              </p>
            </div>

            {/* Last updated */}
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Last updated</p>
              <p className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold text-primary dark:text-white">
                {lastUpdated || '—'}
              </p>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                pull to refresh
              </p>
            </div>
          </div>

          {/* Nav cards */}
          <div className="rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400 mb-4">
              Quick Navigation
            </p>
            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {navCards.map((card) => (
                <a
                  key={card.label}
                  href={card.href}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(card.href)
                  }}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm transition hover:shadow-md hover:border-accent/30 dark:hover:border-accent/30"
                >
                  <p className="text-sm font-semibold text-primary dark:text-white">
                    {card.label}
                  </p>
                  <p className={`mt-3 inline-block rounded-lg px-3 py-1 text-xs font-medium ${card.color}`}>
                    Manage
                  </p>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
