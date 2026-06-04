'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type ListingItem } from '@/services/api'

const REGIONS = [
  'Adamaoua', 'Centre', 'Est', 'Extreme-Nord', 'Littoral',
  'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest', 'General',
]

function VerifiedBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    true: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    false: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    pending: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[value] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {value}
    </span>
  )
}

function StatusBadge({ expiresAt }: { expiresAt: string }) {
  const expired = new Date(expiresAt) < new Date()
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
      expired
        ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
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

export default function ListingsPage() {
  const [listings, setListings] = useState<ListingItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)

  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [viewItem, setViewItem] = useState<ListingItem | null>(null)
  const [deleteItem, setDeleteItem] = useState<ListingItem | null>(null)
  const [deleting, setDeleting] = useState(false)

  const loadListings = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getListings({
        page, limit,
        product_name: search || undefined,
        region: region || undefined,
        verified_only: verifiedOnly || undefined,
      })
      setListings(res.data.listings)
      setTotal(res.data.total)
      setTotalPages(res.data.total_pages)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load listings')
    } finally {
      setLoading(false)
    }
  }, [page, limit, search, region, verifiedOnly])

  useEffect(() => {
    loadListings() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadListings])

  const applyFilters = () => {
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setRegion('')
    setVerifiedOnly(false)
    setPage(1)
  }

  const hasFilters = search || region || verifiedOnly

  const openView = (item: ListingItem) => {
    setViewItem(item)
    setSuccessMsg('')
  }

  const closeView = () => {
    setViewItem(null)
  }

  const openDelete = (item: ListingItem) => {
    setDeleteItem(item)
    setError('')
  }

  const closeDelete = () => {
    setDeleteItem(null)
    setError('')
  }

  const confirmDelete = async () => {
    if (!deleteItem) return
    setDeleting(true)
    setError('')
    try {
      await api.deleteListing(deleteItem.id)
      setSuccessMsg('Listing deleted successfully')
      closeDelete()
      loadListings()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to delete listing')
    } finally {
      setDeleting(false)
    }
  }

  const formatPrice = (price: number) => price.toLocaleString() + ' FCFA'

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
              Listings
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {total} listing{total !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="flex-1 min-w-0 sm:min-w-[200px]">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Product name</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') applyFilters() }}
              placeholder="tomato, cassava, maize..."
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="w-full sm:w-36">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">All</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-accent-dark focus:ring-accent/20 dark:border-zinc-600 dark:bg-primary"
              />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Verified farmers only</span>
            </label>
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

      {/* Success / Error messages */}
      {successMsg && (
        <div className="mb-4 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
          {successMsg}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
          <button onClick={loadListings} className="ml-2 underline">Retry</button>
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
        ) : listings.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
            {hasFilters ? 'No listings match your filters.' : 'No listings yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Seller</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Qty · Price</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Region</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Expires</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {listings.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-primary dark:text-white capitalize">{item.product_name}</span>
                      {item.description && (
                        <span className="block text-xs text-zinc-400 dark:text-zinc-500 truncate max-w-[200px]">{item.description}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell">
                      <span className="text-sm">{item.seller_name}</span>
                      <span className="block text-xs text-zinc-400 dark:text-zinc-500">{item.seller_phone}</span>
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {item.quantity} {item.measurement} · {formatPrice(item.price)}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden md:table-cell text-xs">
                      {item.location_region ?? item.origin}
                      {item.town && <span className="block text-xs text-zinc-400 dark:text-zinc-500">{item.town}</span>}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden lg:table-cell text-xs">
                      {new Date(item.expires_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3"><StatusBadge expiresAt={item.expires_at} /></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button
                          onClick={() => openView(item)}
                          className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openDelete(item)}
                          className="rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Delete
                        </button>
                      </div>
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
                <h2 className="text-lg font-semibold text-primary dark:text-white capitalize">Listing #{viewItem.id}</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 capitalize">{viewItem.product_name}</p>
              </div>
              <button onClick={closeView} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Product info */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Product</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Name"><span className="capitalize">{viewItem.product_name}</span></Field>
                <Field label="Quantity">{viewItem.quantity} {viewItem.measurement}</Field>
                <Field label="Price">{formatPrice(viewItem.price)}</Field>
                <Field label="Status"><StatusBadge expiresAt={viewItem.expires_at} /></Field>
              </div>
              {viewItem.description && (
                <div className="mt-3">
                  <Field label="Description">{viewItem.description}</Field>
                </div>
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Seller info */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Seller</p>
              <div className="space-y-3">
                <Field label="Name">{viewItem.seller_name}</Field>
                <Field label="Phone">{viewItem.seller_phone}</Field>
                <Field label="Verified"><VerifiedBadge value={viewItem.seller_verified} /></Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Location */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Location</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Region">{viewItem.location_region ?? viewItem.origin}</Field>
                <Field label="Town">{viewItem.town ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Origin">{viewItem.origin}</Field>
              </div>
            </div>

            {/* Image */}
            {viewItem.image_url && (
              <>
                <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Image</p>
                  <a
                    href={viewItem.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-dark dark:text-accent underline hover:no-underline"
                  >
                    Open image ↗
                  </a>
                </div>
              </>
            )}

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Dates */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Timeline</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Created">{new Date(viewItem.created_at).toLocaleString()}</Field>
                <Field label="Updated">{new Date(viewItem.updated_at).toLocaleString()}</Field>
                <Field label="Expires">{new Date(viewItem.expires_at).toLocaleString()}</Field>
              </div>
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

      {/* Delete confirmation modal */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeDelete} />
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Delete Listing</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Are you sure you want to delete this listing by{' '}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">{deleteItem.seller_name}</span>{' '}
              for <span className="font-medium text-zinc-700 dark:text-zinc-300 capitalize">{deleteItem.product_name}</span>?
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">This action cannot be undone.</p>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={closeDelete}
                disabled={deleting}
                className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
