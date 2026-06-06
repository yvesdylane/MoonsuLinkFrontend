'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { initScrollReveal } from '@/lib/scrollReveal'
import { initParallax } from '@/lib/parallax'

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

function WhatsAppMockup() {
  return (
    <div className="animate-float mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl border-4 border-zinc-800 bg-white shadow-tinted dark:border-zinc-600">
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="white" className="h-5 w-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Moonsu Link</p>
          <p className="text-[11px] text-white/70">online</p>
        </div>
      </div>
      <div className="space-y-3 bg-[#e5ddd5] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPjxyZWN0IHdpZHRoPSI1IiBoZWlnaHQ9IjUiIGZpbGw9IiNlNWRkZDUiLz48cGF0aCBkPSJNMCA1TDUgMFpNNiA0TDQgNlpNLTEsMUwxLC0xWiIgc3Ryb2tlPSIjYzJhYjkyIiBzdHJva2Utd2lkdGg9IjEuMjUiLz48L3N2Zz4=')] p-4 dark:opacity-90">
        <div className="flex">
          <div className="max-w-[85%] rounded-br-2xl rounded-tr-2xl rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-zinc-800 tabular-nums">I want to sell 50kg of corn at 250 XAF per kg</p>
            <p className="mt-1 text-right text-[10px] text-zinc-400">14:02</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-bl-2xl rounded-tl-2xl rounded-tr-sm bg-[#dcf8c6] px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-zinc-800">✅ Listed! Your corn is now visible to buyers searching near you.</p>
            <p className="mt-1 text-right text-[10px] text-zinc-400">14:02</p>
          </div>
        </div>
        <div className="flex">
          <div className="max-w-[85%] rounded-br-2xl rounded-tr-2xl rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-zinc-800">Find fresh tomatoes in Douala</p>
            <p className="mt-1 text-right text-[10px] text-zinc-400">14:05</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-bl-2xl rounded-tl-2xl rounded-tr-sm bg-[#dcf8c6] px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-zinc-800">3 farmers found near Douala</p>
            <p className="mt-1 text-right text-[10px] text-zinc-400">14:05</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-zinc-200 bg-[#f0f0f0] px-3 py-2">
        <div className="flex-1 rounded-2xl bg-white px-4 py-2 text-xs text-zinc-400 shadow-inner">Type a message...</div>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="#075e54" className="h-7 w-7">
          <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
        </svg>
      </div>
    </div>
  )
}

function TelegramMockup() {
  return (
    <div className="animate-float mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl border-4 border-zinc-800 bg-white shadow-tinted dark:border-zinc-600" style={{ animationDelay: '-2s' }}>
      <div className="flex items-center gap-3 bg-[#2AABEE] px-4 py-3">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="white" className="h-5 w-5">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">MoonsoLinkBot</p>
          <p className="text-[11px] text-white/70">bot</p>
        </div>
      </div>
      <div className="space-y-3 bg-white p-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl bg-[#2AABEE] px-3.5 py-2.5">
            <p className="text-[13px] leading-relaxed text-white">Check market prices for corn</p>
            <p className="mt-1 text-right text-[10px] text-white/60">15:30</p>
          </div>
        </div>
        <div className="flex">
          <div className="max-w-[85%] rounded-2xl bg-[#F0F0F0] px-3.5 py-2.5">
            <p className="text-[13px] leading-relaxed text-zinc-800">Current corn prices in Cameroon:</p>
            <div className="mt-2 space-y-1 border-l-2 border-[#2AABEE] pl-3">
               <p className="text-[12px] font-medium text-zinc-800 tabular-nums">Centre: 150–250 XAF/kg</p>
               <p className="text-[12px] font-medium text-zinc-800 tabular-nums">Littoral: 180–280 XAF/kg</p>
               <p className="text-[12px] font-medium text-zinc-800 tabular-nums">West: 130–220 XAF/kg</p>
            </div>
            <p className="mt-1 text-right text-[10px] text-zinc-400">15:30</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-zinc-200 bg-white px-3 py-2">
        <div className="flex-1 rounded-xl bg-[#F0F0F0] px-4 py-2 text-xs text-zinc-400">Message</div>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="#2AABEE" className="h-6 w-6">
          <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
        </svg>
      </div>
    </div>
  )
}

function DoubleBezelCard({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <div {...props} className="rounded-[1.75rem] bg-black/[0.03] p-[5px] ring-1 ring-black/[0.04] dark:bg-white/[0.06] dark:ring-white/[0.08]">
      <div className={`rounded-[calc(1.75rem-5px)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ${className || ''}`}>
        {children}
      </div>
    </div>
  )
}

function splitWords(text: string): string {
  return text
    .split(' ')
    .map((word, wi) => `<span class="split-word" style="--i:${wi}">${word}</span>`)
    .join(' ')
}

export default function HomePage() {
  useEffect(() => {
    const destroyScroll = initScrollReveal()
    const destroyParallax = initParallax()
    return () => {
      destroyScroll()
      destroyParallax()
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary focus:shadow-lg">
        Skip to content
      </a>
      <Navbar />

      {/* ── Hero ── */}
      <section id="main-content" className="relative flex min-h-[100dvh] items-center bg-primary-dark pb-24 pt-32 sm:pt-40">
        <div data-parallax="0.05" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(154,243,118,0.08),_transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.p variants={fadeUp} className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Cameroon&apos;s Agricultural Marketplace
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[clamp(2.5rem,5vw,5rem)]"
                dangerouslySetInnerHTML={{
                  __html: splitWords('Your farm marketplace, inside your chat app'),
                }}
              />
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[65ch] text-balance text-base leading-relaxed text-zinc-300 sm:text-lg"
              >
                List products, find buyers, check prices, get advice — all through WhatsApp
                and Telegram. No app install needed.
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-wrap gap-4"
              >
                <a
                  href="#how-it-works"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent pl-6 pr-2 py-2 text-sm font-semibold text-primary transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent-hover active:scale-[0.98]"
                >
                  <span className="tracking-tight">See how it works</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
                <a
                  href="#platforms"
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.97]"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Contact us
                </a>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="mt-10 flex items-center gap-6 text-sm text-zinc-400"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="#9af376" className="h-3 w-3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  Free to use
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="#9af376" className="h-3 w-3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  No installation
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="#9af376" className="h-3 w-3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  Works offline first
                </span>
              </motion.div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              className="hidden lg:block"
            >
              <WhatsAppMockup />
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="animate-scroll-indicator flex flex-col items-center gap-1">
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">Scroll</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-zinc-500">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section id="platforms" className="bg-primary-dark py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div
            data-reveal
            className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between"
          >
            <p className="text-center text-base font-medium text-zinc-300 sm:text-left">
              Available on the messaging apps Cameroon already uses
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="#25D366" className="h-6 w-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span className="text-sm font-semibold text-white">WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="#2AABEE" className="h-6 w-6">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span className="text-sm font-semibold text-white">Telegram</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal>
            <span className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              <span className="h-3 w-1 rounded-full bg-accent" />
              Buyer &amp; Seller
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Two sides, one conversation
            </h2>
            <p className="mt-4 max-w-[65ch] text-balance text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              Moonsu Link works the way you already communicate. Send a message, get a result.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <DoubleBezelCard
              data-reveal
              className="border border-zinc-200 bg-zinc-50 p-8 backdrop-blur-lg dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-sm font-bold text-accent-dark dark:text-accent">B</span>
                <div>
                  <p className="text-sm font-semibold text-primary dark:text-white">For Buyers</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Find what you need</p>
                </div>
              </div>
              <ol className="mt-6 space-y-3">
                {[
                  ['Search naturally', 'Ask for produce in plain language — "Find tomatoes in Douala"'],
                  ['Browse & compare', 'View results with prices, locations, and seller details'],
                  ['Express interest', 'The farmer gets your contact and follows up directly'],
                ].map(([step, desc], i) => (
                  <li key={i} data-reveal data-delay={`${i * 80}ms`} data-reveal-left className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[11px] font-bold text-accent-dark dark:text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-primary dark:text-white">{step}</p>
                      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </DoubleBezelCard>

            <DoubleBezelCard
              data-reveal
              data-delay="200ms"
              className="border border-zinc-200 bg-zinc-50 p-8 backdrop-blur-lg dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-sm font-bold text-accent-dark dark:text-accent">F</span>
                <div>
                  <p className="text-sm font-semibold text-primary dark:text-white">For Farmers</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Sell your produce</p>
                </div>
              </div>
              <ol className="mt-6 space-y-3">
                {[
                  ['List in seconds', 'Send a message — "I want to sell 50kg of corn at 250 XAF"'],
                  ['Add details', 'Optionally include photos, location, and a description'],
                  ['Get notified', 'Buyers can express interest and the farmer gets their contact'],
                ].map(([step, desc], i) => (
                  <li key={i} data-reveal data-delay={`${i * 80}ms`} data-reveal-left className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[11px] font-bold text-accent-dark dark:text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-primary dark:text-white">{step}</p>
                      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </DoubleBezelCard>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="border-t border-zinc-100 bg-zinc-50 py-24 dark:border-zinc-700 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal>
            <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              Features
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Everything inside your chat
            </h2>
            <p className="mt-4 max-w-[65ch] text-balance text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              No separate app, no login screen. The marketplace lives where you already talk.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
            <DoubleBezelCard
              data-reveal
              className="border border-zinc-200 bg-white p-8 backdrop-blur-lg md:col-span-2 lg:col-span-1 lg:row-span-2 lg:row-start-1 dark:border-white/10 dark:bg-white/5"
            >
              <div className="grid gap-8 md:grid-cols-2 md:items-center lg:grid-cols-1">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary dark:text-white">Marketplace</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    Farmers list products with quantity, price, location, and photos.
                    Buyers search and compare — natural language, instant results.
                    Market prices display alongside every listing so you know the fair range.
                  </p>
                </div>
                <div className="hidden md:block lg:hidden">
                  <div className="rounded-2xl bg-primary-dark/50 p-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Example search</p>
                    <p className="mt-3 rounded-xl bg-white/10 px-4 py-3 text-sm shadow-sm backdrop-blur-sm">
                       <span className="text-accent">&gt;</span> Find corn in Yaounde under 300 XAF per kg
                     </p>
                     <p className="mt-2 rounded-xl bg-white/10 px-4 py-3 text-sm tabular-nums shadow-sm backdrop-blur-sm">
                       <span className="text-zinc-400">3 listings found —</span> 200, 250, and 280 XAF/kg
                    </p>
                  </div>
                </div>
              </div>
            </DoubleBezelCard>

            <DoubleBezelCard data-reveal data-delay="80ms" className="border border-zinc-200 bg-white p-8 backdrop-blur-lg dark:border-white/10 dark:bg-white/5 lg:col-start-2 lg:row-start-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-white">Price Search</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Ask for current market rates by product and region. The system returns real prices from active listings.
              </p>
            </DoubleBezelCard>

            <DoubleBezelCard data-reveal data-delay="160ms" className="border border-zinc-200 bg-white p-8 backdrop-blur-lg dark:border-white/10 dark:bg-white/5 lg:col-start-3 lg:row-start-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-white">Farmer Verification</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Farmers submit a selfie and ID. Admin verifies the account. Verified badges build trust in every listing.
              </p>
            </DoubleBezelCard>

            <DoubleBezelCard data-reveal data-delay="240ms" className="border border-zinc-200 bg-white p-8 backdrop-blur-lg md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-2 dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-white">Reports & Issues</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Report disease outbreaks, post farming problems. The community can offer advice and solutions.
              </p>
            </DoubleBezelCard>

            <DoubleBezelCard data-reveal data-delay="320ms" className="border border-zinc-200 bg-white p-8 backdrop-blur-lg dark:border-white/10 dark:bg-white/5 lg:col-start-2 lg:row-start-3">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <path d="M8 21h8" />
                  <path d="M12 17v4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-white">Voice & Cross-Platform</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Send voice messages transcribed automatically. Link both platforms — pick up where you left off.
              </p>
            </DoubleBezelCard>

            <DoubleBezelCard data-reveal data-delay="400ms" className="border border-zinc-200 bg-white p-8 backdrop-blur-lg dark:border-white/10 dark:bg-white/5 lg:col-start-3 lg:row-start-3">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M8 10h.01M12 10h.01M16 10h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-white">Community Advice</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Post a farming question and get answers from the community. Advice is tagged by crop and issue type.
              </p>
            </DoubleBezelCard>
          </div>
        </div>
      </section>

      {/* ── See It Live ── */}
      <section className="relative overflow-visible bg-white py-24 dark:bg-primary">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-[0.04] dark:opacity-[0.06]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <div data-reveal>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-accent-dark underline decoration-accent/40 decoration-2 underline-offset-4 dark:text-accent">
                  Cross-Platform
                </span>
                <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
                  Two platforms, one experience
                </h2>
                <p className="mt-4 max-w-[65ch] text-balance text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Send a WhatsApp message or find the Telegram bot. Either way, you get the same marketplace,
                  the same prices, the same community.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <DoubleBezelCard
                  data-reveal
                  data-delay="100ms"
                  data-reveal-left
                  className="border border-zinc-200 bg-zinc-50 p-4 backdrop-blur-lg dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="#25D366" className="h-4 w-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary dark:text-white">Send a message to Moonsu Link on WhatsApp</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">Save the number and start shopping</p>
                    </div>
                  </div>
                </DoubleBezelCard>
                <DoubleBezelCard
                  data-reveal
                  data-delay="200ms"
                  data-reveal-left
                  className="border border-zinc-200 bg-zinc-50 p-4 backdrop-blur-lg dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2AABEE]/10">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="#2AABEE" className="h-4 w-4">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary dark:text-white">Find @MoonsoLinkBot on Telegram</p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500">Search the bot and start a conversation</p>
                    </div>
                  </div>
                </DoubleBezelCard>
              </div>
            </div>
            <div data-reveal data-delay="300ms" data-reveal-scale data-parallax="0.1">
              <TelegramMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="bg-zinc-50 py-24 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              What you can trade
            </h2>
            <p className="mt-4 max-w-[65ch] text-balance text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              Any agricultural product. Categories are added automatically when farmers list new items.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Crops', desc: 'Maize, cassava, tomatoes, plantains, and more from Cameroonian farms', dot: 'bg-amber-500' },
              { name: 'Livestock', desc: 'Cattle, goats, sheep, poultry, and other farm animals', dot: 'bg-emerald-500' },
              { name: 'Tools', desc: 'Hoe, machete, sprayer, wheelbarrow, watering can, and more', dot: 'bg-sky-500' },
              { name: 'Services', desc: 'Land plowing, harvesting, transport, and storage', dot: 'bg-violet-500' },
            ].map((cat, i) => (
              <DoubleBezelCard
                key={cat.name}
                data-reveal
                data-delay={`${i * 80}ms`}
                data-reveal-scale
                className="border border-zinc-200 bg-white p-6 backdrop-blur-lg hover:-translate-y-1 hover:scale-[1.01] dark:border-white/10 dark:bg-white/5"
                style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <span className={`mb-3 flex h-3 w-3 rounded-full ${cat.dot}`} />
                <p className="text-sm font-semibold text-primary dark:text-white">{cat.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{cat.desc}</p>
              </DoubleBezelCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Regions ── */}
      <section id="regions" className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <span className="flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Coverage
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              All 10 regions of Cameroon
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              From the coast to the highlands — farmers and buyers connect across every region.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {['Adamaoua', 'Centre', 'Est', 'Extreme-Nord', 'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'].map((r, i) => (
              <span
                key={r}
                data-reveal
                data-delay={`${i * 40}ms`}
                data-reveal-left
                className={`rounded-full border px-4 py-2 text-xs font-medium transition hover:-translate-y-0.5 ${
                  r === 'Centre' || r === 'Littoral'
                    ? 'border-accent/30 bg-accent/10 text-accent'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400'
                }`}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="team" className="bg-zinc-50 py-24 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal>
            <span className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              <span className="h-3 w-1 rounded-full bg-accent" />
              Team
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Built by CODE::DEV
            </h2>
            <p className="mt-4 max-w-[65ch] text-balance text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              A Cameroonian team using technology to solve real problems for farmers and communities.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'DONFACK TSOPFACT YVES DYLANE', role: 'Lead Developer' },
              { name: 'KANJO ELKAMIRA NDI (SAMIRA)', role: 'Developer' },
              { name: 'ENOW EWEH MAC BRENDA', role: 'Developer' },
              { name: 'SACKA MERCY', role: 'Developer' },
            ].map((member, i) => (
              <DoubleBezelCard
                key={member.name}
                data-reveal
                data-delay={`${i * 80}ms`}
                className="border border-zinc-200 bg-white p-6 text-center backdrop-blur-lg hover:-translate-y-1 dark:border-white/10 dark:bg-white/5"
                style={{ transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent-dark dark:text-accent">
                  {member.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-primary dark:text-white">{member.name}</h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{member.role}</p>
              </DoubleBezelCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-200 bg-white py-12 dark:border-white/10 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-primary dark:text-white">Moonso</span>
              <span className="text-lg font-bold tracking-tight text-accent">Link</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="text-xs text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white">Privacy</a>
              <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
              <a href="/terms" className="text-xs text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-white">Terms</a>
              <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                &copy; {new Date().getFullYear()} CODE::DEV
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
