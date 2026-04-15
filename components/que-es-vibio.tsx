'use client'

import { useRef, useEffect } from 'react'

const PARAGRAPH =
  'Las zonas rurales de España se vacían porque no ofrecen lo que la gente necesita. vibio es un modelo integral: arquitectura sostenible, gobernanza participativa y un proceso probado para crear comunidades que funcionan. No vendemos un estilo de vida. Construimos infraestructura social.'

const words = PARAGRAPH.split(' ')

export function QueEsVibio() {
  const sectionRef = useRef<HTMLDivElement>(null)
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
        for (const el of wordEls) {
          el.style.color = '#d2d7e0'
          el.style.opacity = '0.22'
          el.style.transform = 'scale(1)'
        }

        const total = wordEls.length

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 1.4}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to({}, {
          duration: total,
          ease: 'none',
          onUpdate() {
            const p = this.progress()
            const cursor = p * (total - 1)

            for (let i = 0; i < total; i++) {
              const el = wordEls[i]
              const diff = i - cursor

              if (diff < -0.6) {
                el.style.color = '#18191b'
                el.style.opacity = '1'
                el.style.transform = 'scale(1)'
              } else if (diff < 0.6) {
                const t = 1 - Math.abs(diff) / 0.6
                const r = Math.round(24 + 186 * (1 - t))
                const g = Math.round(25 + 190 * (1 - t))
                const b = Math.round(27 + 197 * (1 - t))
                el.style.color = `rgb(${r},${g},${b})`
                el.style.opacity = String(0.7 + 0.3 * t)
                el.style.transform = `scale(${1 + 0.008 * t})`
              } else if (diff < 1.8) {
                const t = (diff - 0.6) / 1.2
                const r = Math.round(24 + 186 * t)
                const g = Math.round(25 + 190 * t)
                const b = Math.round(27 + 197 * t)
                el.style.color = `rgb(${r},${g},${b})`
                el.style.opacity = String(1 - 0.78 * t)
                el.style.transform = 'scale(1)'
              } else {
                el.style.color = '#d2d7e0'
                el.style.opacity = '0.22'
                el.style.transform = 'scale(1)'
              }
            }
          },
        })
      }, section)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="comunidad"
      data-nav-surface="light"
      className="flex min-h-[80vh] items-center bg-vibio-white py-16"
    >
      <div className="mx-auto w-full max-w-[1060px] px-6 lg:px-8">
        <p className="font-heading text-center text-[clamp(1.35rem,2.8vw,2rem)] font-medium leading-[1.3]">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el }}
              className="inline-block"
              style={{ color: '#d2d7e0', opacity: 0.22 }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
