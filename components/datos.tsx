'use client'

import { useEffect, useRef } from 'react'

import { NumberCounter } from '@/components/ui/number-counter'

type Dato = {
  description: string
  value: number
  format?: (n: number) => string
  unit?: string
}

const datos: Dato[] = [
  { description: 'invertidos en 2025', value: 12, unit: 'M€' },
  { description: 'familias presentes', value: 48 },
  { description: 'proyectos activos', value: 3 },
  {
    description: 'rentabilidad estimada anual',
    value: 7.5,
    unit: '%',
    format: (n) =>
      n.toLocaleString('es-ES', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
  },
]

export function Datos() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-dato-card]'))
    const dividers = cards.map((c) => c.querySelector<HTMLElement>('[data-dato-divider]'))
    const labels = cards.map((c) => c.querySelector<HTMLElement>('[data-dato-label]'))
    if (!cards.length) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.set(dividers, { transformOrigin: 'top center', scaleY: 0 })
        gsap.set(labels, { y: 16, opacity: 0 })

        ScrollTrigger.create({
          trigger: root,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(dividers, {
              scaleY: 1,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.08,
            })
            gsap.to(labels, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.08,
              delay: 0.15,
            })
          },
        })
      }, root)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="datos"
      data-nav-surface="light"
      className="bg-vibio-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="font-heading max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-vibio-text">
          Los números del modelo
        </h2>

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
          {datos.map((dato) => (
            <div
              key={dato.description}
              data-dato-card
              className="relative flex h-full min-h-[280px] flex-col justify-between pl-6 lg:min-h-[340px] lg:pl-8"
            >
              <span
                data-dato-divider
                aria-hidden
                className="absolute inset-y-0 left-0 w-px bg-vibio-text/25"
              />
              <span
                data-dato-label
                className="max-w-[220px] text-sm font-light leading-[1.5] text-vibio-text/70"
              >
                {dato.description}
              </span>
              <span className="font-heading flex items-baseline gap-2 leading-none text-vibio-text">
                <NumberCounter
                  to={dato.value}
                  format={dato.format}
                  className="text-[clamp(3.5rem,8vw,6.5rem)] font-semibold"
                />
                {dato.unit ? (
                  <span className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-light text-vibio-text/80">
                    {dato.unit}
                  </span>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
