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
          <p className="mb-4 inline-flex w-fit rounded-full bg-[#C7D8E6] px-4 py-1.5 text-[12px] font-medium tracking-[0em] text-vibio-text/65 uppercase">
            La opinión de la comunidad
          </p>
          <h2 className="font-heading max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.08] text-vibio-text">
            Lo que dicen quienes ya forman parte de Vibio
          </h2>
        </ScrollReveal>

        <div ref={carouselWrapRef} className="mt-14 lg:mt-20">
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselContent className="-ml-3">
              {testimonios.map((t) => (
                <CarouselItem
                  key={t.author}
                  className="pl-3 md:basis-1/2 lg:basis-1/3"
                >
                  <figure
                    data-testimonio-card
                    className="vibio-surface-radius-lg relative flex h-full min-h-[31rem] w-full flex-col overflow-hidden bg-[#C7D8E6] px-7 py-8 lg:min-h-[35rem] lg:px-8 lg:py-9"
                  >
                    <figcaption className="relative z-10 min-h-[5.5rem] text-sm font-light text-vibio-text/70 lg:min-h-[6rem]">
                      <span className="block font-semibold text-vibio-text">
                        {t.author}
                      </span>
                      <span className="mt-2.5 block min-h-[3rem] max-w-[26ch] leading-[1.6] lg:min-h-[3.2rem]">
                        {t.context}
                      </span>
                    </figcaption>
                    <blockquote className="relative z-10 mt-8 flex-1 lg:mt-10">
                      <p
                        data-testimonio-quote
                        className="font-serif relative z-10 text-[1.4rem] leading-[1.58] text-vibio-text italic lg:text-[1.6rem] lg:leading-[1.54]"
                      >
                        {t.quote}
                      </p>
                    </blockquote>
                    <div className="mt-10 border-t border-vibio-text/18 pt-6 text-sm font-light leading-[1.6] text-vibio-text/70">
                      {t.role}
                    </div>
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
