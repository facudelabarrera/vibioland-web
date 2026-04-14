'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const cards = [
  {
    number: '01',
    title: 'Urbanos 35–55',
    description:
      'Llevan años pensando en el cambio. Lo que les frena no es el deseo — es no encontrar algo bien pensado donde aterrizar.',
    image: '/images/urbanist.jpg',
    imagePos: 'center center',
  },
  {
    number: '02',
    title: 'Familias con hijos',
    description:
      'Quieren espacio, comunidad y un futuro con más sentido. Necesitan saber que la logística está resuelta: escuela, trabajo, vecinos reales.',
    image: '/images/familias.jpg',
    imagePos: 'center center',
  },
  {
    number: '03',
    title: 'Knowledge workers',
    description:
      'Trabajan desde cualquier lugar. Solo necesitan conexión, naturaleza y personas con quienes compartir algo más que una pantalla.',
    image: '/images/knowledge-workers.jpg',
    imagePos: 'center center',
  },
  {
    number: '04',
    title: 'Seniors activos',
    description:
      'No buscan retirarse — buscan seguir activos en un entorno que lo permita. La comunidad es su red, no su carga.',
    image: '/images/seniors.jpg',
    imagePos: 'center center',
  },
]

export function Audiencia() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const indicatorsRef = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    if (window.innerWidth < 1024) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const els = cardsRef.current.filter(Boolean) as HTMLDivElement[]
      const dots = indicatorsRef.current.filter(Boolean) as HTMLButtonElement[]
      const n = els.length

      ctx = gsap.context(() => {
        els.forEach((card, i) => {
          if (i > 0) gsap.set(card, { yPercent: 100 })
        })

        function updateIndicators(activeIdx: number) {
          dots.forEach((dot, i) => {
            const line = dot.querySelector<HTMLSpanElement>('[data-line]')
            const label = dot.querySelector<HTMLSpanElement>('[data-label]')
            if (!line || !label) return

            if (i === activeIdx) {
              line.style.width = '24px'
              line.style.backgroundColor = '#18191b'
              label.style.color = '#18191b'
              label.style.opacity = '1'
            } else {
              line.style.width = '12px'
              line.style.backgroundColor = '#18191b33'
              label.style.color = '#18191b'
              label.style.opacity = '0.35'
            }
          })
        }

        updateIndicators(0)

        const scrollPerCard = window.innerHeight * 1.1
        const totalScroll = scrollPerCard * n

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate(self) {
              const p = self.progress
              const raw = p * (n - 1)
              const active = Math.min(Math.round(raw), n - 1)
              updateIndicators(active)
            },
          },
        })

        for (let i = 0; i < n - 1; i++) {
          tl.to(
            els[i],
            {
              scale: 0.92 - i * 0.015,
              yPercent: -3 - i * 1.5,
              opacity: 0.3,
              duration: 1,
              ease: 'none',
            },
            i,
          )
          tl.to(
            els[i + 1],
            {
              yPercent: 0,
              duration: 1,
              ease: 'none',
            },
            i,
          )
        }
      }, section)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} id="audiencia" className="bg-vibio-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid gap-10 lg:min-h-screen lg:grid-cols-[340px_1fr] lg:items-start lg:gap-16 lg:py-20">
          {/* ── Left column ── */}
          <div className="lg:pt-12">
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-vibio-text text-balance">
              ¿Para quién es vibio?
            </h2>
            <p className="mt-5 max-w-xs text-base font-light leading-[1.7] text-vibio-text/55">
              Distintas vidas, una misma búsqueda: un lugar con sentido donde
              echar raíces.
            </p>

            {/* Progress indicators */}
            <nav className="mt-12 hidden space-y-4 lg:block" aria-label="Audiencia cards">
              {cards.map((c, i) => (
                <button
                  key={c.number}
                  ref={(el) => {
                    indicatorsRef.current[i] = el
                  }}
                  type="button"
                  className="flex items-center gap-3 transition-all duration-300"
                  tabIndex={-1}
                  aria-label={c.title}
                >
                  <span
                    data-line
                    className="block h-[2px] transition-all duration-300"
                    style={{
                      width: i === 0 ? '24px' : '12px',
                      backgroundColor:
                        i === 0 ? '#18191b' : '#18191b33',
                    }}
                  />
                  <span
                    data-label
                    className="text-sm transition-all duration-300"
                    style={{
                      color: '#18191b',
                      opacity: i === 0 ? 1 : 0.35,
                    }}
                  >
                    {c.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* ── Right column — card stack ── */}
          <div className="relative overflow-hidden lg:h-[calc(100vh-240px)]">
            {cards.map((card, i) => (
              <article
                key={card.number}
                ref={(el) => {
                  cardsRef.current[i] = el
                }}
                className="mb-8 grid grid-cols-1 overflow-hidden bg-vibio-surface lg:absolute lg:inset-0 lg:mb-0 lg:grid-cols-2"
                style={{
                  zIndex: i + 1,
                  willChange: 'transform, opacity',
                  boxShadow:
                    '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* Image — left half */}
                <div className="relative h-56 w-full overflow-hidden sm:h-64 lg:h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                    style={{ objectPosition: card.imagePos }}
                  />
                </div>

                {/* Content — right half */}
                <div className="flex flex-col justify-between p-7 lg:p-10">
                  <span className="text-[11px] font-medium tabular-nums uppercase tracking-[0.08em] text-vibio-text/30">
                    {card.number} / {String(cards.length).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold leading-[1.15] text-vibio-text lg:text-[1.65rem]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[15px] font-light leading-[1.7] text-vibio-text/60 lg:text-base">
                      {card.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
