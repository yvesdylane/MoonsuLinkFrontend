export function initParallax(
  selector = '[data-parallax]'
): () => void {
  const els = document.querySelectorAll<HTMLElement>(selector)
  if (!els.length) return () => {}

  const onScroll = () => {
    const y = window.scrollY
    els.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.3')
      const rect = el.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      el.style.transform = `translateY(${y * speed}px)`
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
