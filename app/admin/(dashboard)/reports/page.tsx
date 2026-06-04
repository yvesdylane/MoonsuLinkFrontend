'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type ReportItem } from '@/services/api'

const STATUS_OPTIONS = ['pending', 'reviewed', 'dismissed', 'alert_created'] as const

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    disease: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    shortage: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    other: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[type] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {type}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    reviewed: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    dismissed: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
    alert_created: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[status] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {status.replace('_', ' ')}
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

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)

  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [viewItem, setViewItem] = useState<ReportItem | null>(null)
  const [updating, setUpdating] = useState(false)

  const loadReports = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getReports({
        page, limit,
        status: statusFilter || undefined,
      })
      setReports(res.data.reports)
      setTotal(res.data.total)
      setTotalPages(res.data.total_pages)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load reports')
    } finally {
      setLoading(false)
    }
  }, [page, limit, statusFilter])

  useEffect(() => {
    loadReports() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadReports])

  useEffect(() => {
    setPage(1) // eslint-disable-line react-hooks/set-state-in-effect
  }, [statusFilter])

  const openView = (item: ReportItem) => {
    setViewItem(item)
    setSuccessMsg('')
    setError('')
  }

  const closeView = () => {
    setViewItem(null)
  }

  const updateStatus = async (status: string) => {
    if (!viewItem) return
    setUpdating(true)
    setError('')
    try {
      await api.updateReport(viewItem.id, { status })
      setSuccessMsg(`Report marked as "${status.replace('_', ' ')}"`)
      setViewItem((prev) => prev ? { ...prev, status } : null)
      loadReports()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to update report')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">
              Management
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">
              Reports
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {total} report{total !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="w-full sm:w-44">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">All</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
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
          <button onClick={loadReports} className="ml-2 underline">Retry</button>
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
        ) : reports.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
            {statusFilter ? 'No reports match the selected status.' : 'No reports yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Created</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {reports.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3"><TypeBadge type={item.report_type} /></td>
                    <td className="px-4 py-3 font-medium text-primary dark:text-white max-w-[200px] truncate">
                      {item.title}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell text-xs">{item.user_name}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden md:table-cell text-xs capitalize">
                      {item.product_name ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden lg:table-cell text-xs">
                      {[item.location, item.region].filter(Boolean).join(', ') || <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
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
                <h2 className="text-lg font-semibold text-primary dark:text-white">Report #{viewItem.id}</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{viewItem.title}</p>
              </div>
              <button onClick={closeView} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Report info */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Report</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Type"><TypeBadge type={viewItem.report_type} /></Field>
                <Field label="Status"><StatusBadge status={viewItem.status} /></Field>
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

            {/* User & Product */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Details</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="User">{viewItem.user_name}</Field>
                <Field label="Product">
                  {viewItem.product_name ? <span className="capitalize">{viewItem.product_name}</span> : <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                </Field>
              </div>
            </div>

            {/* Location */}
            {(viewItem.location || viewItem.region) && (
              <>
                <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Location</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {viewItem.location && <Field label="Location">{viewItem.location}</Field>}
                    {viewItem.region && <Field label="Region">{viewItem.region}</Field>}
                  </div>
                </div>
              </>
            )}

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Timeline */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Timeline</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Created">{new Date(viewItem.created_at).toLocaleString()}</Field>
                <Field label="Updated">{new Date(viewItem.updated_at).toLocaleString()}</Field>
              </div>
            </div>

            {/* Status actions */}
            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.filter((s) => s !== viewItem.status).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(s)}
                    disabled={updating}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:opacity-50 capitalize"
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
              {updating && <p className="text-xs text-zinc-400 mt-2">Updating...</p>}
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
    </div>
  )
}
