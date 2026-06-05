import { Navbar } from '@/components/Navbar'

function WhatsAppMockup() {
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl border-4 border-zinc-800 bg-white shadow-2xl dark:border-zinc-600">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
        <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Moonsu Link</p>
          <p className="text-[11px] text-white/70">online</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="space-y-3 bg-[#e5ddd5] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPjxyZWN0IHdpZHRoPSI1IiBoZWlnaHQ9IjUiIGZpbGw9IiNlNWRkZDUiLz48cGF0aCBkPSJNMCA1TDUgMFpNNiA0TDQgNlpNLTEsMUwxLC0xWiIgc3Ryb2tlPSIjYzJhYjkyIiBzdHJva2Utd2lkdGg9IjEuMjUiLz48L3N2Zz4=')] p-4 dark:opacity-90">
        {/* Incoming: farmer listing */}
        <div className="flex">
          <div className="max-w-[85%] rounded-br-2xl rounded-tr-2xl rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-zinc-800">
              I want to sell 50kg of corn at 250 XAF per kg
            </p>
            <p className="mt-1 text-right text-[10px] text-zinc-400">14:02</p>
          </div>
        </div>

        {/* Outgoing: system reply */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-bl-2xl rounded-tl-2xl rounded-tr-sm bg-[#dcf8c6] px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-zinc-800">
              ✅ Listed! Your corn is now visible to buyers searching near you.
            </p>
            <p className="mt-1 text-right text-[10px] text-zinc-400">14:02</p>
          </div>
        </div>

        {/* Incoming: buyer searching */}
        <div className="flex">
          <div className="max-w-[85%] rounded-br-2xl rounded-tr-2xl rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-zinc-800">
              Find fresh tomatoes in Douala
            </p>
            <p className="mt-1 text-right text-[10px] text-zinc-400">14:05</p>
          </div>
        </div>

        {/* Outgoing: search results */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-bl-2xl rounded-tl-2xl rounded-tr-sm bg-[#dcf8c6] px-3.5 py-2.5 shadow-sm">
            <p className="text-[13px] leading-relaxed text-zinc-800">
              3 farmers found near Douala 🍅
            </p>
            <p className="mt-1 text-right text-[10px] text-zinc-400">14:05</p>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-zinc-200 bg-[#f0f0f0] px-3 py-2">
        <div className="flex-1 rounded-2xl bg-white px-4 py-2 text-xs text-zinc-400 shadow-inner">
          Type a message...
        </div>
        <svg viewBox="0 0 24 24" fill="#075e54" className="h-7 w-7">
          <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
        </svg>
      </div>
    </div>
  )
}

function TelegramMockup() {
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-3xl border-4 border-zinc-800 bg-white shadow-2xl dark:border-zinc-600">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#2AABEE] px-4 py-3">
        <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">MoonsoLinkBot</p>
          <p className="text-[11px] text-white/70">bot</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="space-y-3 bg-white p-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl bg-[#2AABEE] px-3.5 py-2.5">
            <p className="text-[13px] leading-relaxed text-white">
              Check market prices for corn
            </p>
            <p className="mt-1 text-right text-[10px] text-white/60">15:30</p>
          </div>
        </div>
        <div className="flex">
          <div className="max-w-[85%] rounded-2xl bg-[#F0F0F0] px-3.5 py-2.5">
            <p className="text-[13px] leading-relaxed text-zinc-800">
              Current corn prices in Cameroon:
            </p>
            <div className="mt-2 space-y-1 border-l-2 border-[#2AABEE] pl-3">
              <p className="text-[12px] font-medium text-zinc-800">Centre: 150-250 XAF/kg</p>
              <p className="text-[12px] font-medium text-zinc-800">Littoral: 180-280 XAF/kg</p>
              <p className="text-[12pxx] font-medium text-zinc-800">West: 130-220 XAF/kg</p>
            </div>
            <p className="mt-1 text-right text-[10px] text-zinc-400">15:30</p>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-zinc-200 bg-white px-3 py-2">
        <div className="flex-1 rounded-xl bg-[#F0F0F0] px-4 py-2 text-xs text-zinc-400">
          Message
        </div>
        <svg viewBox="0 0 24 24" fill="#2AABEE" className="h-6 w-6">
          <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
        </svg>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative bg-primary pb-24 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(154,243,118,0.06),_transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: text */}
            <div>
              <h1 className="text-balance text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[clamp(2.5rem,5vw,5rem)]">
                Cameroon&apos;s agricultural marketplace, inside your chat app
              </h1>
              <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-zinc-300 sm:text-lg">
                List your products. Find what you need. Check market prices. Get
                farming advice. All through WhatsApp and Telegram — no app to
                install.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-semibold text-primary transition hover:bg-accent-hover"
                >
                  See how it works
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#platforms"
                  className="inline-flex items-center gap-2 rounded-2xl border border-zinc-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Contact us
                </a>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <svg viewBox="0 0 24 24" fill="#9af376" className="h-3 w-3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  Free to use
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <svg viewBox="0 0 24 24" fill="#9af376" className="h-3 w-3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  No installation
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                    <svg viewBox="0 0 24 24" fill="#9af376" className="h-3 w-3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  Works offline first
                </span>
              </div>
            </div>

            {/* Right: mockup */}
            <div className="hidden lg:block">
              <WhatsAppMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Platforms ─────────────────────────────────── */}
      <section id="platforms" className="bg-primary-dark py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
            <p className="text-center text-lg font-medium text-zinc-300 sm:text-left">
              Available on the messaging apps Cameroon already uses
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="#25D366" className="h-7 w-7">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                <span className="text-sm font-semibold text-white">WhatsApp</span>
              </div>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="#2AABEE" className="h-7 w-7">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span className="text-sm font-semibold text-white">Telegram</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────── */}
      <section id="how-it-works" className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
            Two sides, one conversation
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Moonsu Link works the way you already communicate. Send a message, get a result.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Buyer side */}
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 dark:border-zinc-700 dark:bg-primary-light">
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
                  <li key={i} className="flex gap-3">
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
            </div>

            {/* Farmer side */}
            <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-8 dark:border-zinc-700 dark:bg-primary-light">
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
                  <li key={i} className="flex gap-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────── */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-24 dark:border-zinc-700 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
            Everything inside your chat
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            No separate app, no login screen. The marketplace lives where you already talk.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Feature 1 — Marketplace — wide */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-primary-light md:col-span-2">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
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
                <div className="hidden md:block">
                  <div className="rounded-2xl bg-zinc-50 p-6 dark:bg-primary-dark">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">Example search</p>
                    <p className="mt-3 rounded-xl bg-white px-4 py-3 text-sm shadow-sm dark:bg-primary">
                      <span className="text-accent-dark dark:text-accent">&gt;</span> Find corn in Yaounde under 300 XAF per kg
                    </p>
                    <p className="mt-2 rounded-xl bg-white px-4 py-3 text-sm shadow-sm dark:bg-primary">
                      <span className="text-zinc-400">3 listings found —</span> 200, 250, and 280 XAF/kg
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 — Price Search */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-primary-light">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-white">Price Search</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Ask for current market rates by product and region. The system returns real prices from active listings.
              </p>
            </div>

            {/* Feature 3 — Verification */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-primary-light">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-white">Farmer Verification</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Farmers submit a selfie and ID. Admin verifies the account. Verified badges build trust in every listing.
              </p>
            </div>

            {/* Feature 4 — Reports & Issues */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-primary-light">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
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
            </div>

            {/* Feature 5 — Voice & Cross-platform */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-primary-light">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
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
            </div>

            {/* Feature 6 — Community Advice */}
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-primary-light">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-dark dark:text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M8 10h.01M12 10h.01M16 10h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-white">Community Advice</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                Post a farming question and get answers from the community. Advice is tagged by crop and issue type.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── See it live ───────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
                Two platforms, one experience
              </h2>
              <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                Send a WhatsApp message or find the Telegram bot. Either way, you get the same marketplace, the same prices, the same community.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-primary-light">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10">
                    <svg viewBox="0 0 24 24" fill="#25D366" className="h-4 w-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary dark:text-white">Send a message to Moonsu Link on WhatsApp</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">Save the number and start shopping</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-primary-light">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2AABEE]/10">
                    <svg viewBox="0 0 24 24" fill="#2AABEE" className="h-4 w-4">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary dark:text-white">Find @MoonsoLinkBot on Telegram</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">Search the bot and start a conversation</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <TelegramMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ──────────────────────────────────── */}
      <section id="products" className="bg-zinc-50 py-24 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
            What you can trade
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Any agricultural product. Categories are added automatically when farmers list new items.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Crops', desc: 'Maize, cassava, tomatoes, plantains, and more from Cameroonian farms', accent: 'bg-amber-50 dark:bg-primary-light', ico: 'text-amber-600 dark:text-amber-400' },
              { name: 'Livestock', desc: 'Cattle, goats, sheep, poultry, and other farm animals', accent: 'bg-emerald-50 dark:bg-primary-light', ico: 'text-emerald-600 dark:text-emerald-400' },
              { name: 'Tools', desc: 'Hoe, machete, sprayer, wheelbarrow, watering can, and more', accent: 'bg-sky-50 dark:bg-primary-light', ico: 'text-sky-600 dark:text-sky-400' },
              { name: 'Services', desc: 'Land plowing, harvesting, transport, and storage', accent: 'bg-violet-50 dark:bg-primary-light', ico: 'text-violet-600 dark:text-violet-400' },
            ].map((cat) => (
              <div key={cat.name} className={`rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700 ${cat.accent}`}>
                <p className={`text-sm font-semibold ${cat.ico}`}>{cat.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Regions ───────────────────────────────────── */}
      <section id="regions" className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              All 10 regions of Cameroon
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
              From the coast to the highlands — farmers and buyers connect across every region.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {['Adamaoua', 'Centre', 'Est', 'Extreme-Nord', 'Littoral', 'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest'].map((r) => (
              <span key={r} className="rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-medium text-zinc-600 dark:border-zinc-600 dark:bg-primary-light dark:text-zinc-300">
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────── */}
      <section id="team" className="bg-zinc-50 py-24 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
            Built by CODE::DEV
          </h2>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            A Cameroonian team using technology to solve real problems for farmers and communities.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'DONFACK TSOPFACT YVES DYLANE', role: 'Lead Developer' },
              { name: 'KANJO ELKAMIRA NDI (SAMIRA)', role: 'Developer' },
              { name: 'ENOW EWEH MAC BRENDA', role: 'Developer' },
              { name: 'SACKA MERCY', role: 'Developer' },
            ].map((member) => (
              <div key={member.name} className="rounded-2xl border border-zinc-100 bg-white p-6 text-center dark:border-zinc-700 dark:bg-primary-light">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent-dark dark:text-accent">
                  {member.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-primary dark:text-white">{member.name}</h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="border-t border-zinc-100 bg-white py-12 dark:border-zinc-700 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-primary dark:text-white">Moonso</span>
              <span className="text-lg font-bold tracking-tight text-accent">Link</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              &copy; {new Date().getFullYear()} CODE::DEV. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
