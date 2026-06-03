const BASE = 'http://localhost:8080'

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(body.error ?? body.detail ?? 'Request failed')
  }

  return res.json()
}

export interface User {
  id: string
  name: string
  role: string
  phone: string
}

export interface Stats {
  total_users: number
  users_by_role: { buyer: number; farmer: number; admin: number }
  total_listings: number
  total_interests: number
  pending_verifications: number
  total_reports: number
  reports_by_status: { pending: number; reviewed: number; dismissed: number }
  total_issues: number
  issues_by_status: { open: number; resolved: number }
  total_alerts: number
  listings_by_region: Record<string, number>
  messages_last_24h: number
}

export const api = {
  login: (phone: string) =>
    request<{ status: string; message: string; phone: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),

  verify: (phone: string, code: string) =>
    request<{ status: string; token: string; user: User }>('/api/admin/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    }),

  getStats: (token: string) =>
    request<{ status: string; data: Stats }>('/api/admin/stats', {}, token),
}
