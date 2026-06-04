'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type MessageLogItem, type AssistantLogItem, type ConversationStateItem } from '@/services/api'

type Tab = 'messages' | 'assistant' | 'states'
const TABS: { key: Tab; label: string }[] = [
  { key: 'messages', label: 'Messages' },
  { key: 'assistant', label: 'Assistant' },
  { key: 'states', label: 'States' },
]

const PLATFORMS = ['whatsapp', 'telegram'] as const
const METHODS = ['classify', 'search', 'ask', 'create', 'complete'] as const

function PlatformBadge({ platform }: { platform: string }) {
  const styles: Record<string, string> = {
    whatsapp: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    telegram: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  }
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[platform] ?? 'bg-zinc-100 text-zinc-500'}`}>{platform}</span>
}

function MethodBadge({ method }: { method: string | null }) {
  return method
    ? <span className="inline-flex items-center rounded-full bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 px-2.5 py-0.5 text-xs font-medium capitalize">{method}</span>
    : <span className="text-zinc-300 dark:text-zinc-600">—</span>
}

function StateBadge({ state }: { state: string }) {
  return <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-primary px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 capitalize">{state.replace(/_/g, ' ')}</span>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-0.5">{label}</p>
      <div className="text-sm text-zinc-800 dark:text-zinc-200">{children}</div>
    </div>
  )
}

function JsonBlock({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return <span className="text-zinc-300 dark:text-zinc-600">—</span>
  return <pre className="max-h-48 overflow-y-auto rounded-xl bg-zinc-50 dark:bg-primary p-3 text-xs text-zinc-700 dark:text-zinc-300 font-mono whitespace-pre-wrap break-all">{JSON.stringify(data, null, 2)}</pre>
}

export default function LogsPage() {
  const [tab, setTab] = useState<Tab>('messages')

  // Messages state
  const [msgItems, setMsgItems] = useState<MessageLogItem[]>([])
  const [msgTotal, setMsgTotal] = useState(0)
  const [msgTotalPages, setMsgTotalPages] = useState(0)
  const [msgPage, setMsgPage] = useState(1)
  const [msgFilterPlatform, setMsgFilterPlatform] = useState('')
  const [msgFilterIntent, setMsgFilterIntent] = useState('')
  const [msgFilterUserId, setMsgFilterUserId] = useState('')
  const [msgView, setMsgView] = useState<MessageLogItem | null>(null)
  const [msgLoading, setMsgLoading] = useState(true)
  const [msgError, setMsgError] = useState('')

  // Assistant state
  const [asstItems, setAsstItems] = useState<AssistantLogItem[]>([])
  const [asstTotal, setAsstTotal] = useState(0)
  const [asstTotalPages, setAsstTotalPages] = useState(0)
  const [asstPage, setAsstPage] = useState(1)
  const [asstFilterIntent, setAsstFilterIntent] = useState('')
  const [asstFilterMethod, setAsstFilterMethod] = useState('')
  const [asstView, setAsstView] = useState<AssistantLogItem | null>(null)
  const [asstLoading, setAsstLoading] = useState(true)
  const [asstError, setAsstError] = useState('')

  // States state
  const [stateItems, setStateItems] = useState<ConversationStateItem[]>([])
  const [stateTotal, setStateTotal] = useState(0)
  const [stateTotalPages, setStateTotalPages] = useState(0)
  const [statePage, setStatePage] = useState(1)
  const [stateFilter, setStateFilter] = useState('')
  const [stateView, setStateView] = useState<ConversationStateItem | null>(null)
  const [stateLoading, setStateLoading] = useState(true)
  const [stateError, setStateError] = useState('')

  const limit = 20

  const loadMessages = useCallback(async () => {
    setMsgLoading(true); setMsgError('')
    try {
      const res = await api.getMessageLogs({
        page: msgPage, limit,
        platform: msgFilterPlatform || undefined,
        intent: msgFilterIntent || undefined,
        user_id: msgFilterUserId || undefined,
      })
      setMsgItems(res.data.logs ?? [])
      setMsgTotal(res.data.total)
      setMsgTotalPages(res.data.total_pages)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setMsgError(err instanceof Error ? err.message : 'Failed to load messages')
    } finally { setMsgLoading(false) }
  }, [msgPage, limit, msgFilterPlatform, msgFilterIntent, msgFilterUserId])

  const loadAssistant = useCallback(async () => {
    setAsstLoading(true); setAsstError('')
    try {
      const res = await api.getAssistantLogs({
        page: asstPage, limit,
        intent: asstFilterIntent || undefined,
        method: asstFilterMethod || undefined,
      })
      setAsstItems(res.data.logs ?? [])
      setAsstTotal(res.data.total)
      setAsstTotalPages(res.data.total_pages)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setAsstError(err instanceof Error ? err.message : 'Failed to load assistant logs')
    } finally { setAsstLoading(false) }
  }, [asstPage, limit, asstFilterIntent, asstFilterMethod])

  const loadStates = useCallback(async () => {
    setStateLoading(true); setStateError('')
    try {
      const res = await api.getConversationStates({
        page: statePage, limit,
        state: stateFilter || undefined,
      })
      setStateItems(res.data.states ?? [])
      setStateTotal(res.data.total)
      setStateTotalPages(res.data.total_pages)
    } catch (err) {
      if (err instanceof Error && err.message === 'Session expired') return
      setStateError(err instanceof Error ? err.message : 'Failed to load states')
    } finally { setStateLoading(false) }
  }, [statePage, limit, stateFilter])

  useEffect(() => { loadMessages() }, [loadMessages]) // eslint-disable-line react-hooks/set-state-in-effect
  useEffect(() => { loadAssistant() }, [loadAssistant]) // eslint-disable-line react-hooks/set-state-in-effect
  useEffect(() => { loadStates() }, [loadStates]) // eslint-disable-line react-hooks/set-state-in-effect

  const switchTab = (t: Tab) => {
    setTab(t)
    if (t === 'messages') { setMsgPage(1) }
    if (t === 'assistant') { setAsstPage(1) }
    if (t === 'states') { setStatePage(1) }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl sm:rounded-[2rem] border border-zinc-200 dark:border-zinc-700 bg-white/90 dark:bg-primary-light/90 p-4 sm:p-6 shadow-sm backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-dark dark:text-accent">Analysis</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-primary dark:text-white">Logs</h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">Read-only logs for analysis and monitoring</p>
      </div>

      {/* Tabs */}
      <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-1.5 shadow-sm">
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => switchTab(t.key)} className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              tab === t.key
                ? 'bg-accent-dark dark:bg-accent text-white shadow-sm'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-primary'
            }`}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* ───── MESSAGES TAB ───── */}
      {tab === 'messages' && (
        <>
          {/* Filters */}
          <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
              <div className="w-full sm:w-36">
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Platform</label>
                <select value={msgFilterPlatform} onChange={(e) => setMsgFilterPlatform(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                  <option value="">All</option>
                  {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="w-full sm:w-44">
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Intent</label>
                <input value={msgFilterIntent} onChange={(e) => setMsgFilterIntent(e.target.value)} placeholder="Filter..." className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              <div className="w-full sm:w-44">
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">User ID</label>
                <input value={msgFilterUserId} onChange={(e) => setMsgFilterUserId(e.target.value)} placeholder="Filter..." className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              {(msgFilterPlatform || msgFilterIntent || msgFilterUserId) && <button onClick={() => { setMsgFilterPlatform(''); setMsgFilterIntent(''); setMsgFilterUserId('') }} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Clear</button>}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
            {msgLoading ? (
              <div className="p-6 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />)}</div>
            ) : msgError ? (
              <div className="p-6 text-center"><p className="text-sm text-red-500 dark:text-red-400 mb-3">{msgError}</p><button onClick={loadMessages} className="rounded-xl border border-zinc-200 dark:border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-primary">Retry</button></div>
            ) : msgItems.length === 0 ? (
              <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">{(msgFilterPlatform || msgFilterIntent || msgFilterUserId) ? 'No messages match your filter.' : 'No message logs yet.'}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Platform</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Intent</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Message</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">User</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                    {msgItems.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                        <td className="px-4 py-3"><PlatformBadge platform={item.platform} /></td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell text-xs capitalize">{item.intent ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                        <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 max-w-[200px] truncate">{item.incoming_message}</td>
                        <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 hidden md:table-cell text-xs">{item.user_name ?? item.user_id?.slice(0, 8) ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                        <td className="px-4 py-3 text-right"><button onClick={() => setMsgView(item)} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {msgTotalPages > 1 && (
              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-700 px-4 py-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Page {msgPage} of {msgTotalPages} ({msgTotal} total)</p>
                <div className="flex gap-2">
                  <button onClick={() => setMsgPage(p => Math.max(1, p - 1))} disabled={msgPage <= 1} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">← Prev</button>
                  <button onClick={() => setMsgPage(p => Math.min(msgTotalPages, p + 1))} disabled={msgPage >= msgTotalPages} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">Next →</button>
                </div>
              </div>
            )}
          </div>

          {/* Messages view modal */}
          {msgView && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50" onClick={() => setMsgView(null)} />
              <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-primary dark:text-white">Message #{msgView.id}</h2>
                  <button onClick={() => setMsgView(null)} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Platform"><PlatformBadge platform={msgView.platform} /></Field>
                    <Field label="Intent">{msgView.intent ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                  </div>
                  <Field label="Incoming Message"><div className="rounded-xl bg-zinc-50 dark:bg-primary p-3 text-sm whitespace-pre-wrap">{msgView.incoming_message}</div></Field>
                  {msgView.outgoing_reply && <Field label="Outgoing Reply"><div className="rounded-xl bg-zinc-50 dark:bg-primary p-3 text-sm whitespace-pre-wrap">{msgView.outgoing_reply}</div></Field>}
                  <hr className="border-zinc-100 dark:border-zinc-700" />
                  <Field label="User">{msgView.user_name ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                  <Field label="Phone">{msgView.user_phone ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                  <Field label="User ID">{msgView.user_id ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                  <Field label="Created">{new Date(msgView.created_at).toLocaleString()}</Field>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setMsgView(null)} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Close</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ───── ASSISTANT TAB ───── */}
      {tab === 'assistant' && (
        <>
          {/* Filters */}
          <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
              <div className="w-full sm:w-44">
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Intent</label>
                <input value={asstFilterIntent} onChange={(e) => setAsstFilterIntent(e.target.value)} placeholder="Filter..." className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              <div className="w-full sm:w-36">
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">Method</label>
                <select value={asstFilterMethod} onChange={(e) => setAsstFilterMethod(e.target.value)} className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                  <option value="">All</option>
                  {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              {(asstFilterIntent || asstFilterMethod) && <button onClick={() => { setAsstFilterIntent(''); setAsstFilterMethod('') }} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Clear</button>}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
            {asstLoading ? (
              <div className="p-6 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />)}</div>
            ) : asstError ? (
              <div className="p-6 text-center"><p className="text-sm text-red-500 dark:text-red-400 mb-3">{asstError}</p><button onClick={loadAssistant} className="rounded-xl border border-zinc-200 dark:border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-primary">Retry</button></div>
            ) : asstItems.length === 0 ? (
              <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">{(asstFilterIntent || asstFilterMethod) ? 'No assistant logs match your filter.' : 'No assistant logs yet.'}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Intent</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">Method</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Input</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Confidence</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                    {asstItems.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                        <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 text-xs capitalize">{item.intent ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                        <td className="px-4 py-3 hidden sm:table-cell"><MethodBadge method={item.method} /></td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 max-w-[200px] truncate">{item.input_text}</td>
                        <td className="px-4 py-3 text-right hidden md:table-cell text-xs text-zinc-500 dark:text-zinc-400">{item.confidence != null ? `${Math.round(item.confidence * 100)}%` : <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                        <td className="px-4 py-3 text-right"><button onClick={() => setAsstView(item)} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {asstTotalPages > 1 && (
              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-700 px-4 py-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Page {asstPage} of {asstTotalPages} ({asstTotal} total)</p>
                <div className="flex gap-2">
                  <button onClick={() => setAsstPage(p => Math.max(1, p - 1))} disabled={asstPage <= 1} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">← Prev</button>
                  <button onClick={() => setAsstPage(p => Math.min(asstTotalPages, p + 1))} disabled={asstPage >= asstTotalPages} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">Next →</button>
                </div>
              </div>
            )}
          </div>

          {/* Assistant view modal */}
          {asstView && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50" onClick={() => setAsstView(null)} />
              <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-primary dark:text-white">Assistant Log #{asstView.id}</h2>
                  <button onClick={() => setAsstView(null)} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Intent">{asstView.intent ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                    <Field label="Method"><MethodBadge method={asstView.method} /></Field>
                    <Field label="Confidence">{asstView.confidence != null ? `${Math.round(asstView.confidence * 100)}%` : <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                    <Field label="Timestamp">{new Date(asstView.timestamp).toLocaleString()}</Field>
                  </div>
                  <Field label="Input Text"><div className="rounded-xl bg-zinc-50 dark:bg-primary p-3 text-sm whitespace-pre-wrap">{asstView.input_text}</div></Field>
                  <Field label="Entities"><JsonBlock data={asstView.entities} /></Field>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setAsstView(null)} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Close</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ───── STATES TAB ───── */}
      {tab === 'states' && (
        <>
          {/* Filters */}
          <div className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-4 sm:p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:flex-wrap">
              <div className="w-full sm:w-44">
                <label className="mb-1 block text-xs font-medium text-zinc-500 dark:text-zinc-400">State</label>
                <input value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} placeholder="Filter..." className="w-full rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-2 text-sm text-zinc-900 dark:text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
              </div>
              {stateFilter && <button onClick={() => setStateFilter('')} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Clear</button>}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light shadow-sm overflow-hidden">
            {stateLoading ? (
              <div className="p-6 space-y-4">{[...Array(5)].map((_, i) => <div key={i} className="h-10 bg-zinc-100 dark:bg-primary rounded-xl animate-pulse" />)}</div>
            ) : stateError ? (
              <div className="p-6 text-center"><p className="text-sm text-red-500 dark:text-red-400 mb-3">{stateError}</p><button onClick={loadStates} className="rounded-xl border border-zinc-200 dark:border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-primary">Retry</button></div>
            ) : stateItems.length === 0 ? (
              <div className="p-12 text-center text-sm text-zinc-400 dark:text-zinc-500">{stateFilter ? 'No states match your filter.' : 'No conversation states yet.'}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-primary-dark">
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">State</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden sm:table-cell">User</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 hidden md:table-cell">Created</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
                    {stateItems.map((item) => (
                      <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-primary-dark transition-colors">
                        <td className="px-4 py-3"><StateBadge state={item.state} /></td>
                        <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hidden sm:table-cell text-xs">{item.user_name ?? item.user_id?.slice(0, 8) ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</td>
                        <td className="px-4 py-3 text-xs text-zinc-500 dark:text-zinc-400 hidden md:table-cell">{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-right"><button onClick={() => setStateView(item)} className="rounded-lg border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">View</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {stateTotalPages > 1 && (
              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-700 px-4 py-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Page {statePage} of {stateTotalPages} ({stateTotal} total)</p>
                <div className="flex gap-2">
                  <button onClick={() => setStatePage(p => Math.max(1, p - 1))} disabled={statePage <= 1} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">← Prev</button>
                  <button onClick={() => setStatePage(p => Math.min(stateTotalPages, p + 1))} disabled={statePage >= stateTotalPages} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40">Next →</button>
                </div>
              </div>
            )}
          </div>

          {/* States view modal */}
          {stateView && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50" onClick={() => setStateView(null)} />
              <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-primary-light p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold text-primary dark:text-white">Conversation State #{stateView.id}</h2>
                  <button onClick={() => setStateView(null)} className="rounded-lg p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-primary transition">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="State"><StateBadge state={stateView.state} /></Field>
                    <Field label="User ID">{stateView.user_id}</Field>
                    <Field label="User Name">{stateView.user_name ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                    <Field label="Phone">{stateView.user_phone ?? <span className="text-zinc-300 dark:text-zinc-600">—</span>}</Field>
                  </div>
                  <Field label="Context"><JsonBlock data={stateView.context} /></Field>
                  <Field label="Created">{new Date(stateView.created_at).toLocaleString()}</Field>
                  <Field label="Updated">{new Date(stateView.updated_at).toLocaleString()}</Field>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setStateView(null)} className="rounded-xl border border-zinc-200 dark:border-zinc-600 bg-white dark:bg-primary-light px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-primary">Close</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
