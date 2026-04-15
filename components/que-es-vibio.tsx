'use client'

import { useRef, useEffect } from 'react'

const PARAGRAPH =
  'Las zonas rurales de España se vacían porque no ofrecen lo que la gente necesita. vibio es un modelo integral: arquitectura sostenible, gobernanza participativa y un proceso probado para crear comunidades que funcionan. No vendemos un estilo de vida. Construimos infraestructura social.'

const words = PARAGRAPH.split(' ')
const KEYWORDS = new Set([
  'vibio',
  'modelo',
  'integral',
  'arquitectura',
  'sostenible',
  'gobernanza',
  'participativa',
  'comunidades',
  'infraestructura',
  'social',
])

function normalizeWord(word: string) {
  return word
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,:;¡!¿?()]/g, '')
}

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
        let smoothCursor = 0

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${window.innerHeight * 2.4}`,
            pin: true,
            scrub: 2.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to({}, {
          duration: total,
          ease: 'none',
          onUpdate() {
            const p = this.progress()
            const targetCursor = p * (total - 1)
            smoothCursor += (targetCursor - smoothCursor) * 0.1

            for (let i = 0; i < total; i++) {
              const el = wordEls[i]
              const diff = i - smoothCursor
              const isKeyword = el.dataset.keyword === 'true'

              if (diff < -1.1) {
                el.style.color = isKeyword ? '#7FA9D6' : '#241818'
                el.style.opacity = '1'
                el.style.transform = 'scale(1)'
                el.style.fontWeight = isKeyword ? '600' : '500'
              } else if (diff < 1.05) {
                const t = 1 - Math.abs(diff) / 1.05
                const target = isKeyword
                  ? { r: 127, g: 169, b: 214 }
                  : { r: 36, g: 24, b: 24 }
                const r = Math.round(target.r + (210 - target.r) * (1 - t))
                const g = Math.round(target.g + (215 - target.g) * (1 - t))
                const b = Math.round(target.b + (224 - target.b) * (1 - t))
                el.style.color = `rgb(${r},${g},${b})`
                el.style.opacity = String(0.74 + 0.26 * t)
                el.style.transform = `scale(${1 + 0.01 * t})`
                el.style.fontWeight = isKeyword ? '600' : '550'
              } else if (diff < 2.8) {
                const t = (diff - 1.05) / 1.75
                const start = isKeyword
                  ? { r: 127, g: 169, b: 214 }
                  : { r: 36, g: 24, b: 24 }
                const r = Math.round(start.r + (210 - start.r) * t)
                const g = Math.round(start.g + (215 - start.g) * t)
                const b = Math.round(start.b + (224 - start.b) * t)
                el.style.color = `rgb(${r},${g},${b})`
                el.style.opacity = String(1 - 0.78 * t)
                el.style.transform = 'scale(1)'
                el.style.fontWeight = isKeyword ? '600' : '500'
              } else {
                el.style.color = '#d2d7e0'
                el.style.opacity = '0.22'
                el.style.transform = 'scale(1)'
                el.style.fontWeight = '500'
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
          {words.map((word, i) => {
            const isKeyword = KEYWORDS.has(normalizeWord(word))
            return (
            <span
              key={i}
              ref={(el) => { wordsRef.current[i] = el }}
              data-keyword={isKeyword ? 'true' : 'false'}
              className="inline-block"
              style={{ color: '#d2d7e0', opacity: 0.22, fontWeight: isKeyword ? 600 : 500 }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}
