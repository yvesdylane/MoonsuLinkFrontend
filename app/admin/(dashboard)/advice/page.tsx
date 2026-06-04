'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type AdviceItem } from '@/services/api'

const ISSUE_TYPES = ['disease', 'pest', 'soil', 'weather', 'technique', 'other'] as const

function VerifiedBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
      Verified
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
      Unverified
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

export default function AdvicePage() {
  const [items, setItems] = useState<AdviceItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)

  const [productSearch, setProductSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [viewItem, setViewItem] = useState<AdviceItem | null>(null)
  const [editItem, setEditItem] = useState<AdviceItem | null>(null)
  const [deleteItem, setDeleteItem] = useState<AdviceItem | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // form state
  const [formTitle, setFormTitle] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formIssueType, setFormIssueType] = useState('')
  const [formProductName, setFormProductName] = useState('')
  const [formVerified, setFormVerified] = useState(false)

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getAdvice({
        page, limit,
        product_name: productSearch || undefined,
        issue_type: typeFilter || undefined,
        is_verified: verifiedOnly || undefined,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d: any = res.data
      setItems(Array.isArray(d) ? d : (d.advice ?? []))
      setTotal(d.total ?? (Array.isArray(d) ? d.length : 0))
      setTotalPages(d.total_pages ?? 1)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load advice')
    } finally {
      setLoading(false)
    }
  }, [page, limit, productSearch, typeFilter, verifiedOnly])

  useEffect(() => {
    loadItems() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadItems])

  useEffect(() => {
    setPage(1) // eslint-disable-line react-hooks/set-state-in-effect
  }, [productSearch, typeFilter, verifiedOnly])

  const applyFilters = () => setPage(1)

  const clearFilters = () => {
    setProductSearch('')
    setTypeFilter('')
    setVerifiedOnly(false)
    setPage(1)
  }

  const hasFilters = productSearch || typeFilter || verifiedOnly

  const resetForm = () => {
    setFormTitle('')
    setFormContent('')
    setFormIssueType('')
    setFormProductName('')
    setFormVerified(false)
  }

  const openCreate = () => {
    resetForm()
    setError('')
    setSuccessMsg('')
    setShowCreate(true)
    setEditItem(null)
  }

  const openEdit = (item: AdviceItem) => {
    setEditItem(item)
    setFormTitle(item.title)
    setFormContent(item.content)
    setFormIssueType(item.issue_type ?? '')
    setFormProductName(item.product_name ?? '')
    setFormVerified(item.is_verified)
    setError('')
    setSuccessMsg('')
    setShowCreate(true)
  }

  const closeForm = () => {
    if (submitting) return
    setShowCreate(false)
    setEditItem(null)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim()) { setError('Title is required'); return }
    if (!formContent.trim()) { setError('Content is required'); return }

    setSubmitting(true)
    setError('')
    try {
      const payload = {
        title: formTitle.trim(),
        content: formContent.trim(),
        issue_type: formIssueType || undefined,
        product_name: formProductName.trim() || undefined,
        is_verified: formVerified,
      }
      if (editItem) {
        await api.updateAdvice(editItem.id, payload)
        setSuccessMsg('Advice updated successfully')
      } else {
        await api.createAdvice(payload)
        setSuccessMsg('Advice created successfully')
      }
      closeForm()
      loadItems()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to save advice')
    } finally {
      setSubmitting(false)
    }
  }

  const openDelete = (item: AdviceItem) => {
    setDeleteItem(item)
    setError('')
    setSuccessMsg('')
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
      await api.deleteAdvice(deleteItem.id)
      setSuccessMsg('Advice deleted successfully')
      closeDelete()
      loadItems()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to delete advice')
    } finally {
      setDeleting(false)
    }
  }

  const openView = (item: AdviceItem) => {
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
              Knowledge Base
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">
              Advice
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {total} article{total !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={openCreate}
            className="rounded-xl bg-accent-dark dark:bg-accent px-5 py-2.5 text-sm font-semibold text-white dark:text-primary transition hover:bg-accent-dark/90 dark:hover:bg-accent/90"
          >
            + Create Advice
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="flex-1 min-w-0 sm:min-w-[180px]">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Product name</label>
            <input
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') applyFilters() }}
              placeholder="tomato, maize..."
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="w-full sm:w-36">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Issue type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">All</option>
              {ISSUE_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
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
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Verified only</span>
            </label>
          </div>
          <div className="flex gap-2">
            <button onClick={applyFilters} className="rounded-xl bg-primary dark:bg-accent-dark px-4 py-2 text-sm font-semibold text-white dark:text-primary transition hover:bg-primary-light dark:hover:bg-accent">Apply</button>
            {hasFilters && <button onClick={clearFilters} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Clear</button>}
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMsg && (
        <div className="mb-4 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">{successMsg}</div>
      )}
      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
          <button onClick={loadItems} className="ml-2 underline">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
            {hasFilters ? 'No advice matches your filters.' : 'No advice yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Author</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Verified</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden xl:table-cell">↑ Votes</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3 font-medium text-primary dark:text-white max-w-[220px] truncate">{item.title}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell text-xs capitalize">{item.issue_type ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden md:table-cell text-xs capitalize">{item.product_name ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden lg:table-cell text-xs">{item.author_name}</td>
                    <td className="px-4 py-3"><VerifiedBadge verified={item.is_verified} /></td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden xl:table-cell text-xs">{item.upvotes}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button onClick={() => openView(item)} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">View</button>
                        <button onClick={() => openEdit(item)} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 transition hover:bg-blue-50 dark:hover:bg-blue-900/20">Edit</button>
                        <button onClick={() => openDelete(item)} className="rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/20">Delete</button>
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
                <h2 className="text-lg font-semibold text-primary dark:text-white">Advice #{viewItem.id}</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{viewItem.title}</p>
              </div>
              <button onClick={closeView} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Article</p>
              <div className="space-y-3">
                <Field label="Title">{viewItem.title}</Field>
                <Field label="Content"><p className="whitespace-pre-wrap">{viewItem.content}</p></Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Metadata</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Issue type">{viewItem.issue_type ? <span className="capitalize">{viewItem.issue_type}</span> : <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Product">{viewItem.product_name ? <span className="capitalize">{viewItem.product_name}</span> : <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Verified"><VerifiedBadge verified={viewItem.is_verified} /></Field>
                <Field label="Upvotes">{viewItem.upvotes}</Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Author & Timeline</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Author">{viewItem.author_name}</Field>
                <Field label="Created">{new Date(viewItem.created_at).toLocaleString()}</Field>
                <Field label="Updated">{new Date(viewItem.updated_at).toLocaleString()}</Field>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { closeView(); openEdit(viewItem) }} className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-4 py-2.5 text-sm font-semibold text-blue-600 dark:text-blue-400 transition hover:bg-blue-50 dark:hover:bg-blue-900/20">Edit</button>
              <button onClick={closeView} className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeForm} />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-primary dark:text-white">{editItem ? 'Edit Advice' : 'Create Advice'}</h2>
              <button onClick={closeForm} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Title *</label>
                <input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="How to manage tomato blight" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Content *</label>
                <textarea value={formContent} onChange={(e) => setFormContent(e.target.value)} rows={5} placeholder="Write your advice article here..." className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Issue type</label>
                  <select value={formIssueType} onChange={(e) => setFormIssueType(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                    <option value="">None</option>
                    {ISSUE_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Product name</label>
                  <input value={formProductName} onChange={(e) => setFormProductName(e.target.value)} placeholder="tomato, maize..." className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_verified" checked={formVerified} onChange={(e) => setFormVerified(e.target.checked)} className="h-4 w-4 rounded border-zinc-300 text-accent-dark focus:ring-accent/20 dark:border-zinc-600 dark:bg-primary" />
                <label htmlFor="is_verified" className="text-sm text-zinc-600 dark:text-zinc-400">Mark as verified</label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} disabled={submitting} className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 rounded-xl bg-accent-dark dark:bg-accent px-4 py-2.5 text-sm font-semibold text-white dark:text-primary transition hover:bg-accent-dark/90 dark:hover:bg-accent/90 disabled:opacity-50">
                  {submitting ? 'Saving...' : editItem ? 'Update Advice' : 'Create Advice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeDelete} />
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Delete Advice</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Are you sure you want to delete <span className="font-medium text-zinc-700 dark:text-zinc-300">{deleteItem.title}</span>?
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">This action cannot be undone.</p>
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={closeDelete} disabled={deleting} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:opacity-50">Cancel</button>
              <button onClick={confirmDelete} disabled={deleting} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50">{deleting ? 'Deleting...' : 'Delete'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
