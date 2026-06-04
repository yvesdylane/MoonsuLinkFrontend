async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  const res = await fetch(path, { ...options, headers })

  if (res.status === 401) {
    document.cookie = 'token=; max-age=0; path=/'
    document.cookie = 'user=; max-age=0; path=/'
    throw new Error('Session expired')
  }

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

export interface UserListItem {
  id: string
  user_id: string | null
  name: string
  phone: string
  email: string | null
  role: string
  region: string
  verified: string
  lang: string
  whatsapp_number: string | null
  whatsapp_chat_id: string | null
  telegram_number: string | null
  telegram_id: string | null
  pic_folder: string | null
  linking_code: string | null
  code_expire_at: string | null
  created_at: string
  updated_at: string
}

export const api = {
  login: (phone: string) =>
    request<{ status: string; message: string; phone: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),

  verify: (phone: string, code: string) =>
    request<{ status: string; user: User }>('/api/admin/verify', {
      method: 'POST',
      body: JSON.stringify({ phone, code }),
    }),

  getStats: () => request<{ status: string; data: Stats }>('/api/admin/stats'),

  getUsers: (params?: {
    page?: number
    limit?: number
    role?: string
    verified?: string
    region?: string
    search?: string
  }) => {
    const qs = new URLSearchParams()
    if (params?.page) qs.set('page', String(params.page))
    if (params?.limit) qs.set('limit', String(params.limit))
    if (params?.role) qs.set('role', params.role)
    if (params?.verified) qs.set('verified', params.verified)
    if (params?.region) qs.set('region', params.region)
    if (params?.search) qs.set('search', params.search)
    const q = qs.toString()
    return request<{
      status: string
      data: { total: number; page: number; limit: number; total_pages: number; users: UserListItem[] }
    }>(`/api/admin/users${q ? '?' + q : ''}`)
  },

  getUser: (id: string) =>
    request<{ status: string; data: UserListItem }>(`/api/admin/users/${id}`),

  updateUser: (id: string, data: { name?: string; role?: string; verified?: string; region?: string }) =>
    request<{ status: string; message: string; data?: { user: UserListItem } }>(`/api/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getListings: (params?: {
    page?: number
    limit?: number
    product_name?: string
    region?: string
    verified_only?: boolean
  }) => {
    const qs = new URLSearchParams()
    if (params?.page) qs.set('page', String(params.page))
    if (params?.limit) qs.set('limit', String(params.limit))
    if (params?.product_name) qs.set('product_name', params.product_name)
    if (params?.region) qs.set('region', params.region)
    if (params?.verified_only) qs.set('verified_only', 'true')
    const q = qs.toString()
    return request<{
      status: string
      data: { total: number; page: number; limit: number; total_pages: number; listings: ListingItem[] }
    }>(`/api/admin/listings${q ? '?' + q : ''}`)
  },

  getListing: (id: number) =>
    request<{ status: string; data: { listing: ListingItem } }>(`/api/admin/listings/${id}`),

  deleteListing: (id: number) =>
    request<{ status: string; message: string }>(`/api/admin/listings/${id}`, { method: 'DELETE' }),

  getReports: (params?: {
    page?: number
    limit?: number
    status?: string
  }) => {
    const qs = new URLSearchParams()
    if (params?.page) qs.set('page', String(params.page))
    if (params?.limit) qs.set('limit', String(params.limit))
    if (params?.status) qs.set('status', params.status)
    const q = qs.toString()
    return request<{
      status: string
      data: { total: number; page: number; limit: number; total_pages: number; reports: ReportItem[] }
    }>(`/api/admin/reports${q ? '?' + q : ''}`)
  },

  updateReport: (id: number, data: { status: string }) =>
    request<{ status: string; message: string }>(`/api/admin/reports/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  getIssues: (params?: {
    page?: number
    limit?: number
    status?: string
    issue_type?: string
    region?: string
  }) => {
    const qs = new URLSearchParams()
    if (params?.page) qs.set('page', String(params.page))
    if (params?.limit) qs.set('limit', String(params.limit))
    if (params?.status) qs.set('status', params.status)
    if (params?.issue_type) qs.set('issue_type', params.issue_type)
    if (params?.region) qs.set('region', params.region)
    const q = qs.toString()
    return request<{
      status: string
      data: { total: number; page: number; limit: number; total_pages: number; issues: IssueItem[] }
    }>(`/api/admin/issues${q ? '?' + q : ''}`)
  },

  updateIssue: (id: number, data: { status: string }) =>
    request<{ status: string; message: string }>(`/api/admin/issues/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
}

export interface ListingItem {
  id: number
  user_id: string
  product_id: number
  quantity: string
  measurement: string
  price: number
  description: string | null
  location_id: number | null
  origin: string
  image_url: string | null
  expires_at: string
  created_at: string
  updated_at: string
  product_name: string
  seller_name: string
  seller_phone: string
  seller_verified: string
  town: string | null
  location_region: string | null
}

export interface ReportItem {
  id: number
  user_id: string
  report_type: string
  title: string
  description: string | null
  product_name: string | null
  location: string | null
  region: string | null
  status: string
  created_at: string
  updated_at: string
  user_name: string
}

export interface IssueItem {
  id: number
  title: string
  description: string | null
  product_name: string | null
  issue_type: string
  location: string | null
  region: string | null
  status: string
  created_at: string
  updated_at: string
  author_name: string
}
