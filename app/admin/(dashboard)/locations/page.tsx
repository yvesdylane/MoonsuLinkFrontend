'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type LocationItem } from '@/services/api'

const REGIONS = [
  'Adamaoua', 'Centre', 'Est', 'Extreme-Nord', 'Littoral',
  'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest', 'General',
]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">{label}</p>
      <p className="text-sm text-zinc-800 dark:text-zinc-200">{children}</p>
    </div>
  )
}

export default function LocationsPage() {
  const [items, setItems] = useState<LocationItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [townFilter, setTownFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [viewItem, setViewItem] = useState<LocationItem | null>(null)
  const [editItem, setEditItem] = useState<LocationItem | null>(null)
  const [deleteItem, setDeleteItem] = useState<LocationItem | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [formTown, setFormTown] = useState('')
  const [formDepartment, setFormDepartment] = useState('')
  const [formRegion, setFormRegion] = useState('Centre')

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getLocations({
        page, limit,
        town: townFilter || undefined,
        region: regionFilter || undefined,
      })
      const d = res.data
      setItems(d.locations ?? [])
      setTotal(d.total)
      setTotalPages(d.total_pages)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load locations')
    } finally {
      setLoading(false)
    }
  }, [page, limit, townFilter, regionFilter])

  useEffect(() => { loadItems() }, [loadItems]) // eslint-disable-line
  useEffect(() => { setPage(1) }, [townFilter, regionFilter]) // eslint-disable-line

  const resetForm = () => {
    setFormTown('')
    setFormDepartment('')
    setFormRegion('Centre')
  }

  const openCreate = () => {
    resetForm()
    setError('')
    setSuccessMsg('')
    setShowCreate(true)
    setEditItem(null)
  }

  const openEdit = (item: LocationItem) => {
    setEditItem(item)
    setFormTown(item.town)
    setFormDepartment(item.department ?? '')
    setFormRegion(item.region)
    setError('')
    setSuccessMsg('')
    setShowCreate(true)
  }

  const closeForm = () => {
    if (submitting) return
    setShowCreate(false)
    setEditItem(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTown.trim()) { setError('Town is required'); return }
    setSubmitting(true)
    setError('')
    try {
      const payload = { town: formTown.trim(), region: formRegion, department: formDepartment.trim() || undefined }
      if (editItem) {
        await api.updateLocation(editItem.id, payload)
        setSuccessMsg('Location updated')
      } else {
        await api.createLocation(payload)
        setSuccessMsg('Location created')
      }
      closeForm()
      await loadItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteItem) return
    setDeleting(true)
    setError('')
    try {
      await api.deleteLocation(deleteItem.id)
      setDeleteItem(null)
      setSuccessMsg('Location deleted')
      await loadItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">Configuration</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">Locations</h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{items.length} location{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={openCreate} className="inline-flex items-center gap-1.5 self-start rounded-xl border border-accent-dark bg-accent-dark dark:border-accent dark:bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M12 5v14M5 12h14" /></svg>
            Add Location
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="w-full sm:w-56">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Town</label>
            <input value={townFilter} onChange={(e) => setTownFilter(e.target.value)} placeholder="Search town..." className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
          </div>
          <div className="w-full sm:w-44">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Region</label>
            <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="">All</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          {(townFilter || regionFilter) && <button onClick={() => { setTownFilter(''); setRegionFilter('') }} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Clear</button>}
        </div>
      </div>

      {/* Messages */}
      {error && <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error} <button onClick={loadItems} className="ml-2 underline">Retry</button></div>}
      {successMsg && <div className="mb-4 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">{successMsg}</div>}

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">{(townFilter || regionFilter) ? 'No locations match your filter.' : 'No locations yet. Add one to get started.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Town</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Region</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3 font-medium text-primary dark:text-white capitalize">{item.town}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell capitalize">{item.department ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                    <td className="px-4 py-3"><span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-primary px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">{item.region}</span></td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setViewItem(item)} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">View</button>
                        <button onClick={() => openEdit(item)} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Edit</button>
                        <button onClick={() => { setDeleteItem(item); setError('') }} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Delete</button>
                      </div>
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
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">← Prev</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">Next →</button>
            </div>
          </div>
        )}
      </div>

      {/* View modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setViewItem(null)} />
          <div className="relative w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-primary dark:text-white capitalize">{viewItem.town}</h2>
              <button onClick={() => setViewItem(null)} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Town">{viewItem.town}</Field>
              <Field label="Region">{viewItem.region}</Field>
              <Field label="Department capitalize">{viewItem.department ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
              <Field label="Created">{new Date(viewItem.created_at).toLocaleDateString()}</Field>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setViewItem(null)} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeForm} />
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-primary dark:text-white">{editItem ? 'Edit Location' : 'Add Location'}</h2>
              <button onClick={closeForm} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Town *</label>
                <input value={formTown} onChange={(e) => setFormTown(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Department</label>
                <input value={formDepartment} onChange={(e) => setFormDepartment(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Region *</label>
                <select value={formRegion} onChange={(e) => setFormRegion(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeForm} disabled={submitting} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">Cancel</button>
                <button type="submit" disabled={submitting || !formTown.trim()} className="rounded-xl bg-accent-dark dark:bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">{submitting ? 'Saving...' : editItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setDeleteItem(null)} />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Delete Location</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Are you sure you want to delete <strong className="text-zinc-800 dark:text-zinc-200">{deleteItem.town}</strong>? This will fail if listings still reference it.
            </p>
            {error && <p className="text-sm text-red-500 dark:text-red-400 mb-4">{error}</p>}
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteItem(null)} disabled={deleting} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">Cancel</button>
              <button onClick={handleDelete} disabled={deleting} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40">{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
