'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type ProductItem } from '@/services/api'

const PRODUCT_TYPES = ['crop', 'animal', 'tool', 'service'] as const

function TypeBadge({ type }: { type: string }) {
  const styles: Record<string, string> = {
    crop: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    animal: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    tool: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    service: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[type] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {type}
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

export default function ProductsPage() {
  const [items, setItems] = useState<ProductItem[]>([])
  const [total, setTotal] = useState(0)
  const [typeFilter, setTypeFilter] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [viewItem, setViewItem] = useState<ProductItem | null>(null)
  const [editItem, setEditItem] = useState<ProductItem | null>(null)
  const [deleteItem, setDeleteItem] = useState<ProductItem | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [formName, setFormName] = useState('')
  const [formType, setFormType] = useState('crop')
  const [formMeasurement, setFormMeasurement] = useState('kg')

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getProducts({ type: typeFilter || undefined })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d: any = res.data
      const list: ProductItem[] = Array.isArray(d) ? d : (d.products ?? [])
      setItems(list)
      setTotal(d.total ?? list.length)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [typeFilter])

  useEffect(() => {
    loadItems() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadItems])

  const resetForm = () => {
    setFormName('')
    setFormType('crop')
    setFormMeasurement('kg')
  }

  const openCreate = () => {
    resetForm()
    setError('')
    setSuccessMsg('')
    setShowCreate(true)
    setEditItem(null)
  }

  const openEdit = (item: ProductItem) => {
    setEditItem(item)
    setFormName(item.name)
    setFormType(item.type)
    setFormMeasurement(item.default_measurement)
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
    if (!formName.trim()) { setError('Name is required'); return }

    setSubmitting(true)
    setError('')
    try {
      if (editItem) {
        await api.updateProduct(editItem.id, { name: formName.trim(), type: formType, default_measurement: formMeasurement })
        setSuccessMsg('Product updated successfully')
      } else {
        await api.createProduct({ name: formName.trim(), type: formType, default_measurement: formMeasurement })
        setSuccessMsg('Product created successfully')
      }
      closeForm()
      loadItems()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to save product')
    } finally {
      setSubmitting(false)
    }
  }

  const openDelete = (item: ProductItem) => {
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
      await api.deleteProduct(deleteItem.id)
      setSuccessMsg('Product deleted successfully')
      closeDelete()
      loadItems()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to delete product')
    } finally {
      setDeleting(false)
    }
  }

  const openView = (item: ProductItem) => {
    setViewItem(item)
    setError('')
    setSuccessMsg('')
  }

  const closeView = () => { setViewItem(null) }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">Catalogue</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">Products</h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{total} product{total !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={openCreate} className="rounded-xl bg-accent-dark dark:bg-accent px-5 py-2.5 text-sm font-semibold text-white dark:text-primary transition hover:bg-accent-dark/90 dark:hover:bg-accent/90">+ Create Product</button>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="w-full sm:w-36">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Type</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="">All</option>
              {PRODUCT_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
          {typeFilter && <button onClick={() => setTypeFilter('')} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Clear</button>}
        </div>
      </div>

      {/* Messages */}
      {successMsg && <div className="mb-4 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">{successMsg}</div>}
      {error && <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error} <button onClick={loadItems} className="ml-2 underline">Retry</button></div>}

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">{typeFilter ? 'No products match your filter.' : 'No products yet.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Default unit</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Created</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3 font-medium text-primary dark:text-white capitalize">{item.name}</td>
                    <td className="px-4 py-3"><TypeBadge type={item.type} /></td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell text-xs">{item.default_measurement}</td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden md:table-cell text-xs">{new Date(item.created_at).toLocaleDateString()}</td>
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
      </div>

      {/* View modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeView} />
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-primary dark:text-white capitalize">{viewItem.name}</h2>
              <button onClick={closeView} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <Field label="Name"><span className="capitalize">{viewItem.name}</span></Field>
              <Field label="Type"><TypeBadge type={viewItem.type} /></Field>
              <Field label="Default measurement">{viewItem.default_measurement}</Field>
              <Field label="Created">{new Date(viewItem.created_at).toLocaleString()}</Field>
              <Field label="Updated">{new Date(viewItem.updated_at).toLocaleString()}</Field>
            </div>
            <div className="mt-6 flex gap-3">
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
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-primary dark:text-white">{editItem ? 'Edit Product' : 'Create Product'}</h2>
              <button onClick={closeForm} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Name *</label>
                <input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Tomato" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Type *</label>
                <select value={formType} onChange={(e) => setFormType(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                  {PRODUCT_TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Default measurement</label>
                <input value={formMeasurement} onChange={(e) => setFormMeasurement(e.target.value)} placeholder="kg" className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} disabled={submitting} className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:opacity-50">Cancel</button>
                <button type="submit" disabled={submitting} className="flex-1 rounded-xl bg-accent-dark dark:bg-accent px-4 py-2.5 text-sm font-semibold text-white dark:text-primary transition hover:bg-accent-dark/90 dark:hover:bg-accent/90 disabled:opacity-50">
                  {submitting ? 'Saving...' : editItem ? 'Update' : 'Create'}
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
            <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Delete Product</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Are you sure you want to delete <span className="font-medium text-zinc-700 dark:text-zinc-300 capitalize">{deleteItem.name}</span>?</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">This action cannot be undone. Deletion is blocked if listings reference this product.</p>
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
