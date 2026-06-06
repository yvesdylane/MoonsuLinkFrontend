export function initScrollReveal(
  selector = '[data-reveal]',
  options?: IntersectionObserverInit
): () => void {
  const defaults: IntersectionObserverInit = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px',
  }
  const config = { ...defaults, ...options }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement
        const delay = el.dataset.delay || '0ms'
        el.style.animationDelay = delay
        el.classList.add('revealed')
        observer.unobserve(el)
      }
    })
  }, config)

  document.querySelectorAll(selector).forEach((el) => observer.observe(el))

  return () => observer.disconnect()
}
