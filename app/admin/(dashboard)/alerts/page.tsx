'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type AlertItem } from '@/services/api'

const ALERT_TYPES = ['disease_outbreak', 'product_shortage', 'general'] as const
const REGIONS = [
  '', 'Adamaoua', 'Centre', 'Est', 'Extreme-Nord', 'Littoral',
  'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest', 'General',
]

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    disease_outbreak: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    product_shortage: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    general: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[type] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {type.replace('_', ' ')}
    </span>
  )
}

function StatusBadge({ expiresAt }: { expiresAt: string }) {
  const expired = new Date(expiresAt) < new Date()
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
      expired
        ? 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
        : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
    }`}>
      {expired ? 'Expired' : 'Active'}
    </span>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">{label}</p>
      <p className="text-sm text-zinc-800 dark:text-zinc-200">{children}</p>
    </div>
  )
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)

  const [typeFilter, setTypeFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // create form state
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formAlertType, setFormAlertType] = useState('disease_outbreak')
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formProductName, setFormProductName] = useState('')
  const [formRegion, setFormRegion] = useState('')
  const [formExpiresAt, setFormExpiresAt] = useState('')

  // view modal
  const [viewItem, setViewItem] = useState<AlertItem | null>(null)

  const loadAlerts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getAlerts({
        page, limit,
        alert_type: typeFilter || undefined,
        region: regionFilter || undefined,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d: any = res.data
      const items: AlertItem[] = Array.isArray(d) ? d : (d.alerts ?? d.items ?? [])
      setAlerts(items)
      setTotal(d.total ?? items.length)
      setTotalPages(d.total_pages ?? 1)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load alerts')
    } finally {
      setLoading(false)
    }
  }, [page, limit, typeFilter, regionFilter])

  useEffect(() => {
    loadAlerts() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadAlerts])

  useEffect(() => {
    setPage(1) // eslint-disable-line react-hooks/set-state-in-effect
  }, [typeFilter, regionFilter])

  const applyFilters = () => setPage(1)

  const clearFilters = () => {
    setTypeFilter('')
    setRegionFilter('')
    setPage(1)
  }

  const hasFilters = typeFilter || regionFilter

  const openForm = () => {
    setShowForm(true)
    setError('')
    setFormAlertType('disease_outbreak')
    setFormTitle('')
    setFormDescription('')
    setFormProductName('')
    setFormRegion('')
    const d = new Date()
    d.setDate(d.getDate() + 30)
    setFormExpiresAt(d.toISOString().slice(0, 16))
  }

  const closeForm = () => {
    if (submitting) return
    setShowForm(false)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim()) { setError('Title is required'); return }
    if (!formExpiresAt) { setError('Expiry date is required'); return }

    setSubmitting(true)
    setError('')
    try {
      const res = await api.createAlert({
        title: formTitle.trim(),
        description: formDescription.trim() || undefined,
        alert_type: formAlertType,
        region: formRegion || undefined,
        product_name: formProductName.trim() || undefined,
        expires_at: new Date(formExpiresAt).toISOString(),
      })
      closeForm()
      setSuccessMsg(res.message)
      loadAlerts()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to create alert')
    } finally {
      setSubmitting(false)
    }
  }

  const openView = (item: AlertItem) => {
    setViewItem(item)
    setError('')
    setSuccessMsg('')
  }

  const closeView = () => {
    setViewItem(null)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">
              Broadcast
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">
              Alerts
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {total} alert{total !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={openForm}
            className="rounded-xl bg-accent-dark dark:bg-accent px-5 py-2.5 text-sm font-semibold text-white dark:text-primary transition hover:bg-accent-dark/90 dark:hover:bg-accent/90"
          >
            + Create Alert
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="w-full sm:w-44">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Alert Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">All</option>
              {ALERT_TYPES.map((t) => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
            </select>
          </div>
          <div className="w-full sm:w-36">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Region</label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">All</option>
              {REGIONS.filter(Boolean).map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              className="rounded-xl bg-primary dark:bg-accent-dark px-4 py-2 text-sm font-semibold text-white dark:text-primary transition hover:bg-primary-light dark:hover:bg-accent"
            >
              Apply
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="mb-4 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
          <button onClick={loadAlerts} className="ml-2 underline">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : alerts.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
            {hasFilters ? 'No alerts match your filters.' : 'No alerts yet. Create your first alert to broadcast to all users.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Region</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">By</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Created</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {alerts.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3"><TypeBadge type={item.alert_type} /></td>
                    <td className="px-4 py-3 font-medium text-primary dark:text-white max-w-[200px] truncate">{item.title}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell text-xs">{item.region ?? <span className="text-zinc-300 dark:text-zinc-600">All</span>}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden md:table-cell text-xs">{item.created_by_name}</td>
                    <td className="px-4 py-3"><StatusBadge expiresAt={item.expires_at} /></td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden lg:table-cell text-xs">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openView(item)}
                        className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-700 px-4 py-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Page {page} of {totalPages} ({total} total)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View detail modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeView} />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-primary dark:text-white">Alert #{viewItem.id}</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{viewItem.title}</p>
              </div>
              <button onClick={closeView} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Alert info */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Alert</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Type"><TypeBadge type={viewItem.alert_type} /></Field>
                <Field label="Status"><StatusBadge expiresAt={viewItem.expires_at} /></Field>
              </div>
              <div className="mt-3">
                <Field label="Title">{viewItem.title}</Field>
              </div>
              {viewItem.description && (
                <div className="mt-3">
                  <Field label="Description">{viewItem.description}</Field>
                </div>
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Details */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Details</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Product">
                  {viewItem.product_name ? <span className="capitalize">{viewItem.product_name}</span> : <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                </Field>
                <Field label="Region">{viewItem.region ?? <span className="text-zinc-300 dark:text-zinc-600">All</span>}</Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Timeline */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Timeline</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Created">{new Date(viewItem.created_at).toLocaleString()}</Field>
                <Field label="Expires">{new Date(viewItem.expires_at).toLocaleString()}</Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Created by */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Broadcasted by</p>
              <Field label="Admin">{viewItem.created_by_name}</Field>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeView}
                className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Alert form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeForm} />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-primary dark:text-white">Create Alert</h2>
              <button onClick={closeForm} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Alert Type */}
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Alert Type *</label>
                <select
                  value={formAlertType}
                  onChange={(e) => setFormAlertType(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="disease_outbreak">Disease Outbreak</option>
                  <option value="product_shortage">Product Shortage</option>
                  <option value="general">General</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Title *</label>
                <input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Tomato Blight Reported"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Description</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={3}
                  placeholder="Cases of late blight detected in Mfoundi division..."
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                />
              </div>

              {/* Product Name */}
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Product Name</label>
                <input
                  value={formProductName}
                  onChange={(e) => setFormProductName(e.target.value)}
                  placeholder="Tomato, Cassava..."
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              {/* Region */}
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Region</label>
                <select
                  value={formRegion}
                  onChange={(e) => setFormRegion(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  {REGIONS.map((r) => (
                    <option key={r} value={r}>{r || 'All regions'}</option>
                  ))}
                </select>
              </div>

              {/* Expires At */}
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Expires At *</label>
                <input
                  type="datetime-local"
                  value={formExpiresAt}
                  onChange={(e) => setFormExpiresAt(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl bg-accent-dark dark:bg-accent px-4 py-2.5 text-sm font-semibold text-white dark:text-primary transition hover:bg-accent-dark/90 dark:hover:bg-accent/90 disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Broadcast Alert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
