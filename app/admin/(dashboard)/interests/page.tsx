'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type InterestItem } from '@/services/api'

const STATUS_OPTIONS = ['active', 'cancelled_by_buyer', 'rejected_by_farmer'] as const

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    cancelled_by_buyer: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
    rejected_by_farmer: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[status] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {status.replace(/_/g, ' ')}
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

export default function InterestsPage() {
  const [items, setItems] = useState<InterestItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)

  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [viewItem, setViewItem] = useState<InterestItem | null>(null)

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getInterests({
        page, limit,
        status: statusFilter || undefined,
      })
      setItems(res.data.interests ?? [])
      setTotal(res.data.total)
      setTotalPages(res.data.total_pages)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load interests')
    } finally {
      setLoading(false)
    }
  }, [page, limit, statusFilter])

  useEffect(() => {
    loadItems() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadItems])

  useEffect(() => {
    setPage(1) // eslint-disable-line react-hooks/set-state-in-effect
  }, [statusFilter])

  const openView = (item: InterestItem) => { setViewItem(item); setError('') }
  const closeView = () => { setViewItem(null) }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">Monitoring</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">Interests</h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{total} interest{total !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="w-full sm:w-44">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="">All</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
          {statusFilter && <button onClick={() => setStatusFilter('')} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Clear</button>}
        </div>
      </div>

      {/* Error */}
      {error && <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error} <button onClick={loadItems} className="ml-2 underline">Retry</button></div>}

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">{statusFilter ? 'No interests match your filter.' : 'No interests yet.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Buyer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Seller</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Qty</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3 font-medium text-primary dark:text-white capitalize">{item.product_name}</td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      <span className="block text-sm">{item.buyer_name}</span>
                      <span className="block text-xs text-zinc-400 dark:text-zinc-500">{item.buyer_phone}</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell">
                      <span className="block text-sm">{item.seller_name}</span>
                      <span className="block text-xs text-zinc-400 dark:text-zinc-500">{item.seller_phone}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400 hidden md:table-cell text-xs">{item.interested_quantity ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                    <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openView(item)} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-700 px-4 py-3">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Page {page} of {totalPages} ({total} total)</p>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">← Prev</button>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">Next →</button>
            </div>
          </div>
        )}
      </div>

      {/* View modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeView} />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-primary dark:text-white">Interest #{viewItem.id}</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 capitalize">{viewItem.product_name}</p>
              </div>
              <button onClick={closeView} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Product & Status */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Interest</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Product"><span className="capitalize">{viewItem.product_name}</span></Field>
                <Field label="Status"><StatusBadge status={viewItem.status} /></Field>
                <Field label="Listing ID">#{viewItem.listing_id}</Field>
                <Field label="Quantity">{viewItem.interested_quantity ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
              </div>
              {viewItem.message && (
                <div className="mt-3">
                  <Field label="Message">{viewItem.message}</Field>
                </div>
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Buyer */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Buyer</p>
              <div className="space-y-3">
                <Field label="Name">{viewItem.buyer_name}</Field>
                <Field label="Phone">{viewItem.buyer_phone}</Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Seller */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Seller</p>
              <div className="space-y-3">
                <Field label="Name">{viewItem.seller_name}</Field>
                <Field label="Phone">{viewItem.seller_phone}</Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Timeline */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Timeline</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Created">{new Date(viewItem.created_at).toLocaleString()}</Field>
                <Field label="Updated">{new Date(viewItem.updated_at).toLocaleString()}</Field>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={closeView} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
