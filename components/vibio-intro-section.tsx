'use client'

import { useRef, useEffect } from 'react'

const PARAGRAPH =
  'Viviendas bioclimáticas en territorios que merece la pena habitar, diseñadas por personas a las que merece la pena conocer.'
const words = PARAGRAPH.split(' ')

// Starting opacity for unrevealed words — set by GSAP after init, NOT in JSX.
// If GSAP fails for any reason, text falls back to full opacity (readable).
const DIM = 0.22

// "merece la pena habitar," → 5,6,7,8 | "merece la pena conocer." → 15,16,17,18
const HIGHLIGHTED = new Set([5, 6, 7, 8, 15, 16, 17, 18])

export function VibioIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const wordEls = wordsRef.current.filter(Boolean) as HTMLSpanElement[]
    if (!section || wordEls.length === 0) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Set DIM here — not in JSX. If this never runs, text is fully readable.
        gsap.set(wordEls, { opacity: DIM })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 1.8}`,
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Each word gets its own tween at a staggered position in the timeline.
        // GSAP's native scrub handles progress — no manual onUpdate needed.
        const STEP = 0.35
        wordEls.forEach((el, i) => {
          tl.to(el, { opacity: 1, duration: 0.25, ease: 'power1.in' }, i * STEP)
        })
      }, section)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-nav-surface="light"
      className="flex min-h-[70vh] items-center bg-vibio-white py-20"
    >
      <div className="mx-auto w-full max-w-[860px] px-6 lg:px-8">
        <div className="mb-10 flex justify-center">
          <span className="inline-block rounded-full border border-vibio-text/20 px-4 py-1.5 text-[11px] font-medium tracking-[0.18em] text-vibio-text/50">
            Qué es Vibio
          </span>
        </div>
        <p className="font-heading text-center text-[clamp(1.5rem,3.2vw,2.4rem)] font-medium leading-[1.4] text-vibio-text">
          {words.map((word, i) => (
            <span key={i}>
              <span
                ref={(el) => {
                  wordsRef.current[i] = el
                }}
                className={`inline-block${HIGHLIGHTED.has(i) ? ' font-bold' : ''}`}
                style={HIGHLIGHTED.has(i) ? { color: 'var(--color-vibio-azul-cielo-intenso)' } : undefined}
              >
                {word}
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
