'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

import { ShimmerButton } from '@/components/ui/shimmer-button'

export function Inversores() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const heading = root.querySelector<HTMLElement>('[data-inv-heading]')
    const paragraphs = Array.from(root.querySelectorAll<HTMLElement>('[data-inv-paragraph]'))
    const ctas = Array.from(root.querySelectorAll<HTMLElement>('[data-inv-cta]'))
    if (!heading) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.set(heading, { y: 36, opacity: 0 })
        gsap.set(paragraphs, { y: 24, opacity: 0 })
        gsap.set(ctas, { y: 18, opacity: 0 })

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            toggleActions: 'play none none reset',
          },
        })

        tl.to(heading, { y: 0, opacity: 1, duration: 0.9 })
          .to(paragraphs, { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 }, '-=0.5')
          .to(ctas, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.35')
      }, root)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inversores"
      data-nav-surface="light"
      className="bg-vibio-marfil py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            data-inv-heading
            className="font-heading text-balance text-[clamp(1.9rem,4.2vw,3.1rem)] font-normal leading-[1.08] text-vibio-text"
          >
            Una oportunidad para invertir en cómo queremos vivir
          </h2>

          <div className="mt-6 max-w-2xl space-y-5 text-base font-light leading-[1.8] text-vibio-text/70 lg:text-lg">
            <p data-inv-paragraph>
              La vivienda está cambiando. Cada vez más personas quieren
              salir de la ciudad, pero no encuentran una alternativa real.
              vibio responde a esa demanda real con un modelo probado,
              escalable y de rentabilidad clara que ya está en marcha. Sin
              greenwashing ni promesas vacías. Un proyecto sólido con
              impacto territorial medible.
            </p>
            <p data-inv-paragraph className="text-vibio-text">
              No es solo invertir en vivienda. Es invertir en una nueva
              forma de habitar.
            </p>
          </div>

          <div className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Link data-inv-cta href="/contacto" className="inline-block">
              <ShimmerButton
                background="var(--color-vibio-brand-yellow)"
                shimmerColor="var(--color-vibio-brand-green)"
                borderRadius="var(--vibio-radius-action)"
                className="border-transparent px-6 py-3 text-sm font-medium !text-vibio-dark"
              >
                DESCARGA DOSSIER INVERSOR
              </ShimmerButton>
            </Link>

            <Link
              data-inv-cta
              href="/contacto"
              className="inline-flex items-center justify-center border border-vibio-text/20 bg-transparent px-6 py-3 text-sm font-medium text-vibio-text transition-all hover:border-vibio-text/35 hover:bg-vibio-text/[0.04]"
            >
              HABLA CON EL EQUIPO
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
