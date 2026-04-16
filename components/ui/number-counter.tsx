'use client'

import { useEffect, useRef } from 'react'

type NumberCounterProps = {
  to: number
  format?: (n: number) => string
  duration?: number
  delay?: number
  className?: string
}

/**
 * Scroll-driven count-up. Animates from 0 → `to` once the element enters the
 * viewport. Uses the repo's dynamic-import GSAP pattern and respects
 * prefers-reduced-motion.
 */
export function NumberCounter({
  to,
  format = (n) => Math.round(n).toLocaleString('es-ES'),
  duration = 1.6,
  delay = 0,
  className,
}: NumberCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(to)
      return
    }

    el.textContent = format(0)

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const counter = { v: 0 }
        gsap.to(counter, {
          v: to,
          duration,
          delay,
          ease: 'power3.out',
          onUpdate() {
            if (el) el.textContent = format(counter.v)
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reset',
          },
        })
      }, el)
    }

    init()
    return () => ctx?.revert()
  }, [to, duration, delay, format])

  return <span ref={ref} className={className}>{format(0)}</span>
}
