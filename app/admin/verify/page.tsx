'use client'

import { Suspense, useState, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { api } from '@/services/api'

function VerifyForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') ?? ''

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.verify(phone, code)
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent-dark dark:text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div className="h-px w-12 bg-zinc-300 dark:bg-zinc-600" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent-dark dark:text-accent">
            2
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-primary dark:text-white">
            Verify Code
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Enter the 6-digit code sent to{' '}
            <span className="font-medium text-primary dark:text-white">
              {phone}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-primary-light"
        >
          <div>
            <label className="mb-3 block text-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Verification code
            </label>
            <div className="flex justify-center gap-2">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={code[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 1)
                    const next = code.split('')
                    next[i] = val
                    setCode(next.join(''))
                    if (val && i < 5) {
                      const nextInput = document.getElementById(`otp-${i + 1}`)
                      nextInput?.focus()
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !code[i] && i > 0) {
                      const prevInput = document.getElementById(`otp-${i - 1}`)
                      prevInput?.focus()
                    }
                  }}
                  id={`otp-${i}`}
                  required
                  className="h-12 w-10 rounded-xl border border-zinc-200 bg-white text-center text-lg font-semibold text-zinc-900 transition focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 dark:border-zinc-600 dark:bg-primary dark:text-white sm:w-12"
                />
              ))}
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-light active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify code'}
          </button>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            Wrong number?{' '}
            <a
              href="/admin/login"
              className="font-medium text-accent-dark hover:text-accent dark:text-accent"
            >
              Use a different number
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-accent" />
        </div>
      }
    >
      <VerifyForm />
    </Suspense>
  )
}
