'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type UserListItem } from '@/services/api'

const ROLES = ['buyer', 'farmer', 'admin']
const VERIFIED = ['true', 'false', 'pending']
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

function RoleBadge({ value }: { value: string }) {
  const styles: Record<string, string> = {
    admin: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    farmer: 'bg-accent/10 text-accent-dark dark:text-accent',
    buyer: 'bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[value] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {value}
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

export default function UsersPage() {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(20)

  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [verified, setVerified] = useState('')
  const [region, setRegion] = useState('')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const [viewUser, setViewUser] = useState<UserListItem | null>(null)
  const [editUser, setEditUser] = useState<UserListItem | null>(null)
  const [editForm, setEditForm] = useState({ name: '', role: '', verified: '', region: '' })

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getUsers({ page, limit, role: role || undefined, verified: verified || undefined, region: region || undefined, search: search || undefined })
      setUsers(res.data.users)
      setTotal(res.data.total)
      setTotalPages(res.data.total_pages)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [page, limit, role, verified, region, search])

  useEffect(() => {
    loadUsers() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadUsers])

  const applyFilters = () => {
    setPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setRole('')
    setVerified('')
    setRegion('')
    setPage(1)
  }

  const hasFilters = search || role || verified || region

  const openView = (user: UserListItem) => {
    setViewUser(user)
    setSuccessMsg('')
  }

  const closeView = () => {
    setViewUser(null)
  }

  const openEdit = (user: UserListItem) => {
    setEditUser(user)
    setEditForm({ name: user.name, role: user.role, verified: user.verified, region: user.region })
    setSuccessMsg('')
  }

  const closeEdit = () => {
    setEditUser(null)
    setSuccessMsg('')
  }

  const saveEdit = async () => {
    if (!editUser) return
    setSaving(true)
    setError('')
    try {
      const payload: { name?: string; role?: string; verified?: string; region?: string } = {}
      if (editForm.name !== editUser.name) payload.name = editForm.name
      if (editForm.role !== editUser.role) payload.role = editForm.role
      if (editForm.verified !== editUser.verified) payload.verified = editForm.verified
      if (editForm.region !== editUser.region) payload.region = editForm.region

      if (Object.keys(payload).length === 0) {
        closeEdit()
        return
      }

      await api.updateUser(editUser.id, payload)
      setSuccessMsg('User updated successfully')
      closeEdit()
      loadUsers()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to update user')
    } finally {
      setSaving(false)
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
              Users
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {total} registered user{total !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
          <div className="flex-1 min-w-0 sm:min-w-[200px]">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') applyFilters() }}
              placeholder="Name, WhatsApp, Telegram..."
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <div className="w-full sm:w-32">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">All</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="w-full sm:w-32">
            <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Verified</label>
            <select
              value={verified}
              onChange={(e) => setVerified(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              <option value="">All</option>
              {VERIFIED.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
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

      {/* Success message */}
      {successMsg && (
        <div className="mb-4 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-600 dark:text-emerald-400">
          {successMsg}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
          <button onClick={loadUsers} className="ml-2 underline">Retry</button>
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
        ) : users.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
            {hasFilters ? 'No users match your filters.' : 'No users yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">WhatsApp</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Region</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Verified</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Created</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-primary dark:text-white">{u.name}</span>
                      {u.email && <span className="block text-xs text-zinc-400 dark:text-zinc-500 truncate max-w-[200px]">{u.email}</span>}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell font-mono text-xs">
                      {u.whatsapp_number ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                    </td>
                    <td className="px-4 py-3"><RoleBadge value={u.role} /></td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden md:table-cell text-xs">{u.region}</td>
                    <td className="px-4 py-3"><VerifiedBadge value={u.verified} /></td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden lg:table-cell text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button
                          onClick={() => openView(u)}
                          className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openEdit(u)}
                          className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-accent-dark dark:text-accent transition hover:bg-accent/5 dark:hover:bg-accent/10"
                        >
                          Edit
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
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeView} />
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-primary dark:text-white">User Details</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{viewUser.name}</p>
              </div>
              <button onClick={closeView} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Identity */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Identity</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="ID">{viewUser.id}</Field>
                <Field label="Legacy ID">{viewUser.user_id ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Name">{viewUser.name}</Field>
                <Field label="Language">{viewUser.lang}</Field>
                <Field label="Role"><RoleBadge value={viewUser.role} /></Field>
                <Field label="Verified"><VerifiedBadge value={viewUser.verified} /></Field>
                <Field label="Region">{viewUser.region}</Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Contact */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Contact</p>
              <div className="space-y-3">
                <Field label="WhatsApp Number">{viewUser.whatsapp_number ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="WhatsApp Chat ID">{viewUser.whatsapp_chat_id ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Telegram ID">{viewUser.telegram_id ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Telegram Number">{viewUser.telegram_number ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Email">{viewUser.email ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Phone (not actively used)">{viewUser.phone || <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Verification */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Verification</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">Pic Folder</p>
                  <p className={`text-sm font-mono ${viewUser.pic_folder ? 'text-accent-dark dark:text-accent' : 'text-zinc-300 dark:text-zinc-600'}`}>
                    {viewUser.pic_folder ?? '—'}
                  </p>
                  {viewUser.pic_folder && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                      Check this folder for uploaded selfie &amp; ID photos
                    </p>
                  )}
                </div>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* System */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">System</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <Field label="Linking Code">{viewUser.linking_code ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Code Expires">{viewUser.code_expire_at ? new Date(viewUser.code_expire_at).toLocaleString() : <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Created">{new Date(viewUser.created_at).toLocaleString()}</Field>
                <Field label="Updated">{new Date(viewUser.updated_at).toLocaleString()}</Field>
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

      {/* Edit modal */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeEdit} />
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-primary dark:text-white mb-1">
              Edit User
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5 truncate">
              {editUser.name}
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Name</label>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Verified</label>
                <select
                  value={editForm.verified}
                  onChange={(e) => setEditForm({ ...editForm, verified: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  {VERIFIED.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Region</label>
                <select
                  value={editForm.region}
                  onChange={(e) => setEditForm({ ...editForm, region: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={closeEdit}
                disabled={saving}
                className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="rounded-xl bg-primary dark:bg-accent-dark px-4 py-2 text-sm font-semibold text-white dark:text-primary transition hover:bg-primary-light dark:hover:bg-accent disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
