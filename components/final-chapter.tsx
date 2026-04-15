'use client'

import { useRef, useEffect, type ReactNode } from 'react'

export function FinalChapter({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const panel = panelRef.current
    if (!wrapper || !panel) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          panel,
          { yPercent: 20 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 85%',
              end: 'top 10%',
              scrub: 0.6,
            },
          },
        )
      }, wrapper)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <div ref={wrapperRef} data-nav-surface="dark" className="relative overflow-hidden">
      <div
        ref={panelRef}
        className="relative isolate"
        style={{
          backgroundColor: 'var(--color-vibio-brand-green)',
          willChange: 'transform',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.11] sm:opacity-[0.13] lg:opacity-[0.15]"
          style={{
            backgroundImage: "url('/images/topography.svg')",
            backgroundRepeat: 'repeat',
            backgroundSize: 'clamp(200px, 32vw, 420px)',
            backgroundPosition: 'top left',
          }}
          aria-hidden
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}
