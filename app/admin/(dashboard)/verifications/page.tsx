'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type VerificationItem } from '@/services/api'

function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, string> = {
    farmer: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    buyer: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    admin: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[role] ?? 'bg-zinc-100 text-zinc-500'}`}>
      {role}
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

export default function VerificationsPage() {
  const [items, setItems] = useState<VerificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [viewItem, setViewItem] = useState<VerificationItem | null>(null)
  const [actionTarget, setActionTarget] = useState<VerificationItem | null>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null)
  const [processing, setProcessing] = useState(false)

  const loadVerifications = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.getPendingVerifications()
      setItems(res.data)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : 'Failed to load verifications')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadVerifications() // eslint-disable-line react-hooks/set-state-in-effect
  }, [loadVerifications])

  const openView = (item: VerificationItem) => {
    setViewItem(item)
    setError('')
    setSuccessMsg('')
  }

  const closeView = () => {
    setViewItem(null)
  }

  const openConfirm = (item: VerificationItem, type: 'approve' | 'reject') => {
    setActionTarget(item)
    setActionType(type)
    setError('')
    setSuccessMsg('')
  }

  const closeConfirm = () => {
    setActionTarget(null)
    setActionType(null)
    setError('')
  }

  const confirmAction = async () => {
    if (!actionTarget || !actionType) return
    setProcessing(true)
    setError('')
    try {
      if (actionType === 'approve') {
        await api.approveVerification(actionTarget.id)
      } else {
        await api.rejectVerification(actionTarget.id)
      }
      const label = actionType === 'approve' ? 'approved' : 'rejected'
      setSuccessMsg(`${actionTarget.name} ${label} successfully`)
      closeConfirm()
      closeView()
      loadVerifications()
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setError(err instanceof Error ? err.message : `Failed to ${actionType} verification`)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">
              Verification Queue
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">
              Verifications
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {items.length} pending verification{items.length !== 1 ? 's' : ''}
            </p>
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
          <button onClick={loadVerifications} className="ml-2 underline">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">
            No pending verifications.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Region</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden lg:table-cell">Created</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                    <td className="px-4 py-3 font-medium text-primary dark:text-white">{item.name}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell text-xs">{item.phone}</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden md:table-cell text-xs">{item.region ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                    <td className="px-4 py-3 hidden lg:table-cell"><RoleBadge role={item.role} /></td>
                    <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden lg:table-cell text-xs">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-1.5 justify-end">
                        <button
                          onClick={() => openView(item)}
                          className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openConfirm(item, 'approve')}
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openConfirm(item, 'reject')}
                          className="rounded-lg border border-red-200 dark:border-red-900 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <h2 className="text-lg font-semibold text-primary dark:text-white">Verification</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{viewItem.name}</p>
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
                <Field label="Name">{viewItem.name}</Field>
                <Field label="Role"><RoleBadge role={viewItem.role} /></Field>
                <Field label="Region">{viewItem.region ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                <Field label="Status">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 capitalize">
                    {viewItem.verified}
                  </span>
                </Field>
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Contact */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Contact</p>
              <div className="space-y-3">
                <Field label="Phone">{viewItem.phone}</Field>
                <Field label="WhatsApp">{viewItem.whatsapp_number ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                {viewItem.whatsapp_chat_id && <Field label="WhatsApp Chat ID">{viewItem.whatsapp_chat_id}</Field>}
                <Field label="Telegram">{viewItem.telegram_number ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                {viewItem.telegram_id && <Field label="Telegram ID">{viewItem.telegram_id}</Field>}
              </div>
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Photos */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Verification Photos</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">Selfie</p>
                  {viewItem.selfie_url ? (
                    <a href={viewItem.selfie_url} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={viewItem.selfie_url}
                        alt="Selfie"
                        className="w-full aspect-[3/4] object-cover rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-primary"
                      />
                    </a>
                  ) : (
                    <div className="w-full aspect-[3/4] rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-primary flex items-center justify-center text-xs text-zinc-400">
                      No selfie
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">ID Document</p>
                  {viewItem.id_url ? (
                    <a href={viewItem.id_url} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={viewItem.id_url}
                        alt="ID Document"
                        className="w-full aspect-[3/4] object-cover rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-primary"
                      />
                    </a>
                  ) : (
                    <div className="w-full aspect-[3/4] rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-primary flex items-center justify-center text-xs text-zinc-400">
                      No ID photo
                    </div>
                  )}
                </div>
              </div>
              {viewItem.pic_folder && (
                <div className="mt-3">
                  <Field label="Pic Folder">
                    <code className="rounded bg-zinc-100 dark:bg-primary px-1.5 py-0.5 text-xs">{viewItem.pic_folder}</code>
                  </Field>
                </div>
              )}
            </div>

            <hr className="border-zinc-100 dark:border-zinc-700 mb-5" />

            {/* Timeline + Actions */}
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Timeline</p>
              <Field label="Registered">{new Date(viewItem.created_at).toLocaleString()}</Field>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { closeView(); openConfirm(viewItem, 'approve') }}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Approve
              </button>
              <button
                onClick={() => { closeView(); openConfirm(viewItem, 'reject') }}
                className="flex-1 rounded-xl border border-red-200 dark:border-red-900 bg-white dark:bg-primary px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve / Reject confirmation modal */}
      {actionTarget && actionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={closeConfirm} />
          <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-primary dark:text-white mb-2 capitalize">
              {actionType} Verification
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {actionType === 'approve'
                ? <>Approve <span className="font-medium text-zinc-700 dark:text-zinc-300">{actionTarget.name}</span> as a verified farmer?</>
                : <>Reject <span className="font-medium text-zinc-700 dark:text-zinc-300">{actionTarget.name}</span>&apos;s verification request?</>
              }
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
              {actionType === 'approve'
                ? 'They will be notified via WhatsApp and Telegram.'
                : 'Their photos will be removed and they will be notified.'}
            </p>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={closeConfirm}
                disabled={processing}
                className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={processing}
                className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-50 ${
                  actionType === 'approve'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {processing ? 'Processing...' : actionType === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
