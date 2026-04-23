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
  context: string
  role: string
}

const testimonios: Testimonio[] = [
  {
    quote: '«Pensé que tendría que elegir entre mi espacio y socializar o pertenecer a la comunidad. Resulta que no.»',
    author: 'Sandra, 42.',
    context: 'Tenía un estudio de arquitectura compartido en Madrid',
    role: 'Lleva 2 años en vibio.higuera',
  },
  {
    quote: '«Al principio mi familia pensó que me iba a una comuna. Ahora vienen cada mes.»',
    author: 'Pablo, 33.',
    context: 'Trabaja como desarrollador en remoto',
    role: 'Lleva 1 año en vibio.higuera',
  },
  {
    quote: '«Todavía no hemos llegado, pero ya formamos parte. Ya sabemos quién busca cole, quién va los fines de semana y quién organiza la caminata del domingo.»',
    author: 'Marta y Miguel, 48 y 52 años',
    context: 'Dos hijos',
    role: 'Llevan 6 meses en vibio.berlanga',
  },
  {
    quote: '«La factura de la luz me dejó de preocupar. Pero lo que no esperaba era dejar de preocuparme por el ruido, la prisa y los vecinos que no se saludan.»',
    author: 'Cristina, 38.',
    context: 'Dejó su piso en Barcelona tras diez años',
    role: 'Lleva 8 meses en vibio.higuera',
  },
  {
    quote: '«Mis hijos salen solos a jugar. Eso en la ciudad era impensable. Eso solo ya lo justifica todo.»',
    author: 'Rodrigo y Ana, 41 y 39 años',
    context: 'Tres hijos, teletrabajan los dos',
    role: 'Llevan 1 año en vibio.berlanga',
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
          <p className="mb-4 text-[12px] font-medium text-vibio-text/45">
            La opinión de la comunidad
          </p>
          <h2 className="font-heading max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-vibio-text">
            Lo que dicen quienes ya forman parte de Vibio
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
                        className="font-serif italic font-normal text-lg leading-[1.5] text-vibio-text lg:text-xl"
                      >
                        {t.quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-8 text-sm font-light text-vibio-text/70">
                      <span className="font-medium text-vibio-text">
                        {t.author}
                      </span>
                      <span className="mt-2 block">{t.context}</span>
                      <span className="mt-5 block">{t.role}</span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-10 flex items-center gap-3">
              <CarouselPrevious className="static translate-x-0 translate-y-0 border-vibio-text/20 bg-transparent text-vibio-text hover:bg-vibio-text/5" />
              <CarouselNext className="static translate-x-0 translate-y-0 border-vibio-text/20 bg-transparent text-vibio-text hover:bg-vibio-text/5" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
