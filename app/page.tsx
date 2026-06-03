import { Navbar } from '@/components/Navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white to-zinc-50 dark:from-primary-dark dark:to-primary">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(154,243,118,0.08),_transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(22,37,49,0.05),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,_rgba(154,243,118,0.06),_transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <span className="mb-6 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-dark dark:text-accent">
            Your Digital Farmer Assistant
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-primary dark:text-white sm:text-5xl lg:text-6xl">
            Connecting Cameroon&apos;s{' '}
            <span className="text-accent-dark dark:text-accent">Farmers</span>
            {' '}&amp;{' '}
            <span className="text-accent-dark dark:text-accent">Buyers</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
            A free, AI-powered marketplace that works on WhatsApp and Telegram.
            List products, find what you need, check market prices, and get
            farming advice — all from your phone.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#features"
              className="rounded-2xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-light"
            >
              Explore Features
            </a>
            <a
              href="#how-it-works"
              className="rounded-2xl border border-zinc-200 bg-white px-8 py-3.5 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-primary-light dark:text-zinc-200 dark:hover:bg-primary"
            >
              How It Works
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6 text-xs text-zinc-400 dark:text-zinc-500">
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp
            </span>
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              Telegram
            </span>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section id="features" className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              Everything you need
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              Built for Cameroon&apos;s agricultural community — every feature
              works on WhatsApp and Telegram.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Marketplace',
                desc: 'Farmers list products with quantity, price, location, and photos. Buyers search and compare, with market prices shown alongside for fair trading.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                ),
              },
              {
                title: 'Smart Search',
                desc: 'Natural language search — "Find tomatoes in Douala". Browse by price and see where products are sold with full listing details.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                ),
              },
              {
                title: 'Farmer Verification',
                desc: 'Farmers submit a selfie + ID card photo. Admin reviews and verifies the account. Verified farmers build trust in the marketplace.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: 'Account Management',
                desc: 'View your profile, role, and verification status. Upgrade from buyer to farmer, update your name or region.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                title: 'Community',
                desc: 'Report disease outbreaks, post farming problems, and give or receive advice from the agricultural community.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
              },
              {
                title: 'Voice & Cross-Platform',
                desc: 'Send voice messages transcribed automatically. Link WhatsApp and Telegram to use Moonso Link seamlessly on both.',
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
                    <rect x="9" y="2" width="6" height="12" rx="3" />
                    <path d="M5 10a7 7 0 0 0 14 0" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-primary-light"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-dark dark:text-accent">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-primary dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────── */}
      <section id="how-it-works" className="bg-zinc-50 py-24 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              Simple &amp; intuitive
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              How It Works
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-primary-light">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
                For Buyers
              </span>
              <ol className="mt-6 space-y-4">
                {[
                  'Send a message to Moonso Link on WhatsApp or Telegram',
                  'Search for products naturally — "Find corn in Yaounde"',
                  'Browse results and navigate pages easily',
                  'View full details — product, price, seller, location',
                  'Express interest — the farmer gets your contact instantly',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent-dark dark:text-accent">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-zinc-100 bg-white p-8 dark:border-zinc-700 dark:bg-primary-light">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
                For Farmers
              </span>
              <ol className="mt-6 space-y-4">
                {[
                  'Start selling — "I want to sell 50kg of corn at 200 XAF"',
                  'Add optional location, photos, and description',
                  'Verify your account to build buyer trust',
                  'Get notified when buyers express interest',
                  'Manage listings — update, edit, or delete anytime',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent-dark dark:text-accent">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── See It In Action ──────────────────────────────── */}
      <section className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              See it in action
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Available on Your Favorite Platforms
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              Moonso Link works seamlessly on WhatsApp and Telegram — the
              messaging apps Cameroonians already use every day.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <div className="flex h-80 w-full max-w-sm items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-600 dark:bg-primary-light">
                <div className="text-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-500">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  <p className="mt-4 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                    WhatsApp Screenshot
                  </p>
                  <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">
                    Image placeholder
                  </p>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                Send a message to Moonso Link on WhatsApp
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-80 w-full max-w-sm items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-600 dark:bg-primary-light">
                <div className="text-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto h-12 w-12 text-zinc-300 dark:text-zinc-500">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  <p className="mt-4 text-sm font-medium text-zinc-400 dark:text-zinc-500">
                    Telegram Screenshot
                  </p>
                  <p className="mt-1 text-xs text-zinc-300 dark:text-zinc-600">
                    Image placeholder
                  </p>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                Find @MoonsoLinkBot on Telegram
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ────────────────────────────────────── */}
      <section id="products" className="bg-zinc-50 py-24 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              What you can trade
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Supported Products
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              Farmers can list any agricultural product — new items are
              automatically added to the catalog.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { category: 'Crops', emoji: '🌾', color: 'bg-amber-50 dark:bg-primary-light', textColor: 'text-amber-600 dark:text-amber-400' },
              { category: 'Livestock', emoji: '🐄', color: 'bg-emerald-50 dark:bg-primary-light', textColor: 'text-emerald-600 dark:text-emerald-400' },
              { category: 'Agricultural Tools', emoji: '🔧', color: 'bg-sky-50 dark:bg-primary-light', textColor: 'text-sky-600 dark:text-sky-400' },
              { category: 'Services', emoji: '🤝', color: 'bg-violet-50 dark:bg-primary-light', textColor: 'text-violet-600 dark:text-violet-400' },
            ].map((cat) => (
              <div
                key={cat.category}
                className={`rounded-2xl border border-zinc-100 p-8 text-center dark:border-zinc-700 ${cat.color}`}
              >
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm dark:bg-primary ${cat.textColor}`}>
                  {cat.emoji}
                </div>
                <h3 className={`mt-5 text-lg font-semibold ${cat.textColor}`}>
                  {cat.category}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {cat.category === 'Crops' && 'Maize, cassava, tomatoes, plantains, and many more crops from Cameroonian farms.'}
                  {cat.category === 'Livestock' && 'Cattle, goats, sheep, poultry, and other farm animals.'}
                  {cat.category === 'Agricultural Tools' && 'Hoe, machete, sprayer, wheelbarrow, watering can, and more.'}
                  {cat.category === 'Services' && 'Land plowing, harvesting, transport, and storage services.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery / Community ──────────────────────────── */}
      <section className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              Gallery
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Our Agricultural Community
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              From farm to market — connecting Cameroon&apos;s agricultural
              value chain.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-600 dark:bg-primary-light"
              >
                <div className="text-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-500">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <p className="mt-3 text-sm text-zinc-400 dark:text-zinc-500">
                    Photo {i}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Regions ─────────────────────────────────────── */}
      <section id="regions" className="bg-zinc-50 py-24 dark:bg-primary-dark">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              Across Cameroon
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Supported Regions
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              Moonso Link operates across all 10 regions of Cameroon.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {['Centre', 'Littoral', 'Ouest', 'Nord', 'Sud', 'Est', 'Adamaoua', 'Nord-Ouest', 'Sud-Ouest', 'Extrême-Nord'].map((region) => (
              <div
                key={region}
                className="rounded-xl border border-zinc-100 bg-white px-5 py-4 text-center dark:border-zinc-700 dark:bg-primary-light"
              >
                <span className="text-sm font-medium text-primary dark:text-white">
                  {region}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ────────────────────────────────────────── */}
      <section id="team" className="bg-white py-24 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark dark:text-accent">
              Made with passion
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl">
              Meet the Team
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              CODE::DEV — passionate about using technology to solve real
              problems for Cameroonian farmers and communities.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'DONFACK TSOPFACT YVES DYLANE', role: 'Lead Developer' },
              { name: 'KANJO ELKAMIRA NDI (SAMIRA)', role: 'Developer' },
              { name: 'ENOW EWEH MAC BRENDA', role: 'Developer' },
              { name: 'SACKA MERCY', role: 'Developer' },
            ].map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-zinc-100 bg-white p-6 text-center dark:border-zinc-700 dark:bg-primary-light"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent-dark dark:text-accent">
                  {member.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-primary dark:text-white">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-zinc-100 bg-white py-12 dark:border-zinc-700 dark:bg-primary">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-primary dark:text-white">
                Moonso
              </span>
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
