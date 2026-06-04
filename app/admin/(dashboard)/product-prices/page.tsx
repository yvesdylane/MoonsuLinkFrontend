'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type ProductPriceItem, type ProductItem } from '@/services/api'

const REGIONS = [
  '', 'Adamaoua', 'Centre', 'Est', 'Extreme-Nord', 'Littoral',
  'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest', 'General',
]

function fmtPrice(n: number) { return n.toLocaleString() + ' FCFA' }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">{label}</p>
      <p className="text-sm text-zinc-800 dark:text-zinc-200">{children}</p>
    </div>
  )
}

export default function ProductPricesPage() {
  const [items, setItems] = useState<ProductPriceItem[]>([])
  const [total, setTotal] = useState(0)
  const [products, setProducts] = useState<ProductItem[]>([])

  const [productFilter, setProductFilter] = useState('')
  const [regionFilter, setRegionFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [viewItem, setViewItem] = useState<ProductPriceItem | null>(null)
  const [editItem, setEditItem] = useState<ProductPriceItem | null>(null)
  const [deleteItem, setDeleteItem] = useState<ProductPriceItem | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const [formProductId, setFormProductId] = useState('')
  const [formRegion, setFormRegion] = useState('General')
  const [formMinPrice, setFormMinPrice] = useState('')
  const [formMaxPrice, setFormMaxPrice] = useState('')

  const computedAvg = formMinPrice && formMaxPrice
    ? Math.round((Number(formMinPrice) + Number(formMaxPrice)) / 2)
    : 0

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getProductPrices({
        product_id: productFilter ? Number(productFilter) : undefined,
        region: regionFilter || undefined,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d: any = res.data
      const list: ProductPriceItem[] = Array.isArray(d) ? d : (d.product_prices ?? [])
      setItems(list)
      setTotal(d.total ?? list.length)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load prices')
    } finally {
      setLoading(false)
    }
  }, [productFilter, regionFilter])

  const loadProducts = useCallback(async () => {
    try {
      const res = await api.getProducts()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d: any = res.data
      setProducts(Array.isArray(d) ? d : (d.products ?? []))
    } catch { /* silent */ }
  }, [])

  useEffect(() => {
    loadItems() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadItems])

  useEffect(() => {
    loadProducts() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadProducts])

  const resetForm = () => {
    setFormProductId('')
    setFormRegion('General')
    setFormMinPrice('')
    setFormMaxPrice('')
  }

  const openCreate = () => {
    resetForm()
    setError('')
    setSuccessMsg('')
    setShowCreate(true)
    setEditItem(null)
  }

  const openEdit = (item: ProductPriceItem) => {
    setEditItem(item)
    setFormProductId(String(item.product_id))
    setFormRegion(item.region)
    setFormMinPrice(String(item.min_price))
    setFormMaxPrice(String(item.max_price))
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
    if (!formProductId) { setError('Product is required'); return }
    if (!formMinPrice || !formMaxPrice) { setError('Min and max prices are required'); return }

    const min = Number(formMinPrice)
    const max = Number(formMaxPrice)
    if (min <= 0 || max <= 0) { setError('Prices must be positive'); return }
    if (min > max) { setError('Min price cannot exceed max price'); return }
    const avg = computedAvg

    setSubmitting(true)
    setError('')
    try {
      if (editItem) {
        await api.updateProductPrice(editItem.id, { min_price: min, avg_price: avg, max_price: max })
        setSuccessMsg('Price updated successfully')
      } else {
        await api.createProductPrice({ product_id: Number(formProductId), region: formRegion, min_price: min, max_price: max, avg_price: avg })
        setSuccessMsg('Price created successfully')
      }
      closeForm()
      loadItems()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to save price')
    } finally {
      setSubmitting(false)
    }
  }

  const openDelete = (item: ProductPriceItem) => {
    setDeleteItem(item)
    setError('')
    setSuccessMsg('')
  }

  const closeDelete = () => { setDeleteItem(null); setError('') }

  const confirmDelete = async () => {
    if (!deleteItem) return
    setDeleting(true)
    setError('')
    try {
      await api.deleteProductPrice(deleteItem.id)
      setSuccessMsg('Price deleted successfully')
      closeDelete()
      loadItems()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to delete price')
    } finally {
      setDeleting(false)
    }
  }

  const openView = (item: ProductPriceItem) => { setViewItem(item); setError(''); setSuccessMsg('') }
  const closeView = () => { setViewItem(null) }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">Pricing</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">Price List</h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{total} price{total !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={openCreate} className="rounded-xl bg-accent-dark dark:bg-accent px-5 py-2.5 text-sm font-semibold text-white dark:text-primary transition hover:bg-accent-dark/90 dark:hover:bg-accent/90">+ Create Price</button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="w-full sm:w-48">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Product</label>
            <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="">All</option>
              {products.map((p) => <option key={p.id} value={p.id} className="capitalize">{p.name}</option>)}
            </select>
          </div>
          <div className="w-full sm:w-36">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Region</label>
            <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
              <option value="">All</option>
              {REGIONS.filter(Boolean).map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          {(productFilter || regionFilter) && <button onClick={() => { setProductFilter(''); setRegionFilter('') }} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Clear</button>}
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
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">{(productFilter || regionFilter) ? 'No prices match your filters.' : 'No prices yet.'}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Region</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Min</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Avg</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Max</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3 font-medium text-primary dark:text-white capitalize">{item.product_name}</td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden sm:table-cell text-xs capitalize">{item.product_type}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 text-xs">{item.region}</td>
                    <td className="px-4 py-3 text-right text-zinc-700 dark:text-zinc-300 text-xs">{fmtPrice(item.min_price)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-primary dark:text-white text-sm">{fmtPrice(item.avg_price)}</td>
                    <td className="px-4 py-3 text-right text-zinc-500 dark:text-zinc-400 hidden md:table-cell text-xs">{fmtPrice(item.max_price)}</td>
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
              <h2 className="text-lg font-semibold text-primary dark:text-white capitalize">{viewItem.product_name}</h2>
              <button onClick={closeView} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <Field label="Product"><span className="capitalize">{viewItem.product_name}</span></Field>
              <Field label="Type"><span className="capitalize">{viewItem.product_type}</span></Field>
              <Field label="Region">{viewItem.region}</Field>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl bg-zinc-50 dark:bg-primary p-3 text-center">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Min</p>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{fmtPrice(viewItem.min_price)}</p>
                </div>
                <div className="rounded-xl bg-accent/10 p-3 text-center">
                  <p className="text-xs text-zinc-500">Avg</p>
                  <p className="text-sm font-semibold text-accent-dark dark:text-accent">{fmtPrice(viewItem.avg_price)}</p>
                </div>
                <div className="rounded-xl bg-zinc-50 dark:bg-primary p-3 text-center">
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Max</p>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{fmtPrice(viewItem.max_price)}</p>
                </div>
              </div>
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
              <h2 className="text-lg font-semibold text-primary dark:text-white">{editItem ? 'Edit Price' : 'Create Price'}</h2>
              <button onClick={closeForm} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product (only for create) */}
              {!editItem && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Product *</label>
                  <select value={formProductId} onChange={(e) => setFormProductId(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                    <option value="">Select product...</option>
                    {products.map((p) => <option key={p.id} value={p.id} className="capitalize">{p.name} ({p.type})</option>)}
                  </select>
                </div>
              )}
              {/* Region (only for create) */}
              {!editItem && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Region *</label>
                  <select value={formRegion} onChange={(e) => setFormRegion(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                    {REGIONS.filter(Boolean).map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              )}
              {editItem && (
                <div className="rounded-xl bg-zinc-50 dark:bg-primary p-3 space-y-1 text-sm">
                  <p className="font-medium text-primary dark:text-white capitalize">{editItem.product_name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{editItem.region} · {editItem.product_type}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Min price (FCFA)</label>
                  <input type="number" min="1" value={formMinPrice} onChange={(e) => setFormMinPrice(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Max price (FCFA)</label>
                  <input type="number" min="1" value={formMaxPrice} onChange={(e) => setFormMaxPrice(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
                </div>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Average: <span className="font-semibold text-accent-dark dark:text-accent">{computedAvg.toLocaleString()} FCFA</span>
                {formMinPrice && formMaxPrice && <span className="ml-1 text-zinc-300 dark:text-zinc-600">(auto-calculated)</span>}
              </p>

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
            <h2 className="text-lg font-semibold text-primary dark:text-white mb-2">Delete Price</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Are you sure you want to delete the price for <span className="font-medium text-zinc-700 dark:text-zinc-300 capitalize">{deleteItem.product_name}</span> in <span className="font-medium text-zinc-700 dark:text-zinc-300">{deleteItem.region}</span>?</p>
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
