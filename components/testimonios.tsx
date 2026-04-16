'use client'

import { useEffect, useRef } from 'react'

import { ScrollReveal } from '@/components/scroll-reveal'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type Testimonio = {
  quote: string
  author: string
  role: string
}

const testimonios: Testimonio[] = [
  {
    quote:
      'El año 1 es el más difícil. Después se asienta. Ahora no me imagino vivir de otra forma.',
    author: 'Julia M.',
    role: '3 años en vibio.higuera',
  },
  {
    quote:
      'Todavía no nos hemos mudado, pero ya formamos parte. Ya sabemos quién busca cole, o quién trabaja el huerto',
    author: 'Sara P. y Miguel M.',
    role: '4 meses en el grupo semilla',
  },
  {
    quote:
      'Al principio desconfiábamos. Hoy compartimos fiestas, mercado y cuidados. Son parte del pueblo.',
    author: 'Candela G.',
    role: 'vecina de Berlanga de Duero',
  },
  {
    quote:
      'Lo que me hizo entrar no fue solo el proyecto, sino el modelo. Cuando ves que la demanda es real y que el equipo tiene claro dónde están los riesgos, la decisión cambia.',
    author: 'Inversor privado',
    role: 'Madrid',
  },
]

export function Testimonios() {
  const carouselWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = carouselWrapRef.current
    if (!wrap) return

    const cards = Array.from(wrap.querySelectorAll<HTMLElement>('[data-testimonio-card]'))
    const quotes = cards.map((c) => c.querySelector<HTMLElement>('[data-testimonio-quote]'))
    if (!cards.length) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.set(cards, { y: 40, opacity: 0 })
        ScrollTrigger.create({
          trigger: wrap,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.1,
            })
          },
        })

        quotes.forEach((q) => {
          if (!q) return
          gsap.fromTo(
            q,
            { yPercent: 6 },
            {
              yPercent: -6,
              ease: 'none',
              scrollTrigger: {
                trigger: q,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })
      }, wrap)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      id="testimonios"
      data-nav-surface="light"
      className="bg-vibio-marfil py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="font-heading max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-vibio-text">
            Lo que dicen quienes ya forman parte de vibio
          </h2>
        </ScrollReveal>

        <div ref={carouselWrapRef} className="mt-14 lg:mt-20">
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent className="-ml-6">
              {testimonios.map((t) => (
                <CarouselItem
                  key={t.author}
                  className="pl-6 md:basis-1/2 lg:basis-1/3"
                >
                  <figure
                    data-testimonio-card
                    className="relative flex h-full flex-col justify-between overflow-hidden border border-vibio-text/10 bg-white/40 p-8 lg:p-10"
                  >
                    <span
                      aria-hidden
                      className="font-heading pointer-events-none absolute left-6 top-4 text-[5rem] leading-none text-vibio-brand-yellow/50"
                    >
                      “
                    </span>
                    <blockquote className="relative z-10 pt-6">
                      <p
                        data-testimonio-quote
                        className="font-heading text-lg font-light leading-[1.45] text-vibio-text lg:text-xl"
                      >
                        {t.quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-8 text-sm font-light text-vibio-text/70">
                      <span className="font-medium text-vibio-text">
                        {t.author}
                      </span>{' '}
                      — {t.role}
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-10 hidden items-center gap-3 lg:flex">
              <CarouselPrevious className="static translate-x-0 translate-y-0 border-vibio-text/20 bg-transparent text-vibio-text hover:bg-vibio-text/5" />
              <CarouselNext className="static translate-x-0 translate-y-0 border-vibio-text/20 bg-transparent text-vibio-text hover:bg-vibio-text/5" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
