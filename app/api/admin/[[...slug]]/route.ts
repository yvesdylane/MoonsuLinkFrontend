import { NextRequest, NextResponse } from 'next/server'

const BACKEND = process.env.BACKEND_API_URL ?? 'http://localhost:8080'

async function proxy(request: NextRequest, slug?: string[]) {
  const path = slug?.length ? '/' + slug.join('/') : ''
  const search = request.nextUrl.search
  const url = `${BACKEND}/api/admin${path}${search}`
  const method = request.method

  const headers = new Headers()
  for (const h of ['content-type', 'accept', 'authorization', 'x-requested-with']) {
    const val = request.headers.get(h)
    if (val) headers.set(h, val)
  }

  const token = request.cookies.get('token')?.value
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const body = method === 'GET' || method === 'HEAD' ? undefined : await request.text()

  let backendRes: Response
  try {
    backendRes = await fetch(url, { method, headers, body })
  } catch {
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 502 })
  }

  let data: unknown
  try {
    data = await backendRes.json()
  } catch {
    data = { status: 'error', detail: backendRes.statusText }
  }

  // On verify success, set HttpOnly token + non-HttpOnly user cookies
  if (path === '/verify' && method === 'POST' && backendRes.ok && typeof data === 'object' && data && 'token' in data) {
    const { token: jwt, user, ...rest } = data as { token: string; user: { name: string; role: string }; [key: string]: unknown }
    const res = NextResponse.json({ ...rest, user })
    res.cookies.set('token', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    })
    res.cookies.set('user', JSON.stringify({ name: user.name, role: user.role }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    })
    return res
  }

  return NextResponse.json(data, { status: backendRes.status })
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  return proxy(request, slug)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  return proxy(request, slug)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  return proxy(request, slug)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  return proxy(request, slug)
}
