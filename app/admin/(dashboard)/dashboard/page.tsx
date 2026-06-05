'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api, type Stats } from '@/services/api'

const navCards = [
  { label: 'Users', href: '/admin/users' },
  { label: 'Listings', href: '/admin/listings' },
  { label: 'Verifications', href: '/admin/verifications' },
  { label: 'Reports', href: '/admin/reports' },
  { label: 'Issues', href: '/admin/issues' },
  { label: 'Alerts', href: '/admin/alerts' },
]

export default function DashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState('')

  const loadStats = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getStats()
      setStats(res.data)
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadStats() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadStats])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-primary-light">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent-dark dark:text-accent">
              Welcome back
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-primary dark:text-white sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
              Overview of your platform activity at a glance.
            </p>
          </div>
          <button
            onClick={loadStats}
            disabled={loading}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-light active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}>
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && !stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-primary-light">
              <div className="mb-3 h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-600" />
              <div className="h-8 w-16 rounded bg-zinc-200 dark:bg-zinc-600" />
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <>
          {/* Row 1: Core metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Users"
              value={stats.total_users}
              detail={
                <>
                  <span className="text-accent-dark dark:text-accent">{stats.users_by_role.buyer}</span> buyer {'·'}{' '}
                  <span className="text-accent-dark dark:text-accent">{stats.users_by_role.farmer}</span> farmer {'·'}{' '}
                  <span className="text-accent-dark dark:text-accent">{stats.users_by_role.admin}</span> admin
                </>
              }
            />
            <StatCard
              label="Listings"
              value={stats.total_listings}
              detail={`Across ${Object.keys(stats.listings_by_region).length} regions`}
            />
            <StatCard
              label="Community"
              value={stats.total_interests}
              detail={`${stats.messages_last_24h} msgs (24h)`}
            />
            <StatCard
              label="Verifications"
              value={stats.pending_verifications}
              detail="pending approval"
              highlight
            />
          </div>

          {/* Row 2: Moderation */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Reports"
              value={stats.total_reports}
              detail={
                <>
                  <span className="text-rose-500">{stats.reports_by_status.pending}</span> pending {'·'}{' '}
                  <span className="text-accent-dark dark:text-accent">{stats.reports_by_status.reviewed}</span> reviewed {'·'}{' '}
                  <span className="text-zinc-400">{stats.reports_by_status.dismissed}</span> dismissed
                </>
              }
            />
            <StatCard
              label="Issues"
              value={stats.total_issues}
              detail={
                <>
                  <span className="text-rose-500">{stats.issues_by_status.open}</span> open {'·'}{' '}
                  <span className="text-accent-dark dark:text-accent">{stats.issues_by_status.resolved}</span> resolved
                </>
              }
            />
            <StatCard
              label="Alerts"
              value={stats.total_alerts}
              detail="active notifications"
            />
            <StatCard
              label="Last updated"
              value={lastUpdated || '\u2014'}
              detail="click Refresh to update"
            />
          </div>

          {/* Nav cards */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-primary-light">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {navCards.map((card) => (
                <a
                  key={card.label}
                  href={card.href}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(card.href)
                  }}
                  className="rounded-xl border border-zinc-200 bg-white p-4 text-sm font-semibold text-primary transition hover:border-accent/30 hover:text-accent-dark active:scale-[0.97] dark:border-zinc-700 dark:bg-primary-light dark:text-white dark:hover:border-accent/30 dark:hover:text-accent"
                >
                  {card.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatCard({
  label,
  value,
  detail,
  highlight,
}: {
  label: string
  value: number | string
  detail: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? 'border-accent/30 bg-accent/5 dark:bg-accent-dark/10'
          : 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-primary-light'
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl font-semibold tracking-tight sm:text-3xl ${
          highlight
            ? 'text-accent-dark dark:text-accent'
            : 'text-primary dark:text-white'
        }`}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
        {detail}
      </p>
    </div>
  )
}
