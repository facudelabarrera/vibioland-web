'use client'

import { useEffect, useRef, useState } from 'react'

type Bloque = {
  number: string
  eyebrow: string
  title: string
  titleLines: [string, string]
  description: string
  longDescription: string
}

const bloques: Bloque[] = [
  {
    number: '001',
    eyebrow: 'Las viviendas',
    title: 'Arquitectura bioclimática',
    titleLines: ['Arquitectura', 'bioclimática'],
    description:
      'Casas eficientes, pensadas para perdurar en un entorno que se regenera.',
    longDescription:
      'Trabajamos con la Fundación para la Investigación del Clima y proyectamos cada Vibioland pensando en los próximos treinta años. Casas pasivas, eficientes, preparadas para gastar poco y resistir a los desafíos del clima y el paso del tiempo.',
  },
  {
    number: '002',
    eyebrow: 'La comunidad',
    title: 'Comunidad con intención',
    titleLines: ['Comunidad', 'con intención'],
    description:
      'Espacios compartidos, reglas claras y respeto a la intimidad. Vivir en comunidad, con tu privacidad intacta.',
    longDescription:
      'Antes de convivir ya hay acuerdos sobre cómo se toman decisiones, cómo se resuelven los conflictos, qué se hace en común y qué no. Con reglas claras, código ético y decisiones tomadas por sociocracia. Vivir en armonía, en plena naturaleza, en una comunidad real y con tu espacio es posible.',
  },
  {
    number: '003',
    eyebrow: 'El territorio',
    title: 'Arraigo territorial',
    titleLines: ['Arraigo', 'territorial'],
    description:
      'Vínculos que van más allá de tu vivienda: formar parte de un lugar que se transforma contigo.',
    longDescription:
      'Todo lo que hacemos beneficia al pueblo tanto como a la comunidad de Vibioland. El 40% del gasto de cada proyecto se queda en economía local: empleo, formación en oficios, inversión en transporte o depuradoras que benefician al territorio.',
  },
]

export function ModeloBloquesSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState<string | null>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-bloque-card]'))
    if (!cards.length) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.set(cards, { y: 48, opacity: 0 })
        ScrollTrigger.create({
          trigger: grid,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: 'power3.out',
              stagger: 0.12,
            })
          },
        })
      }, grid)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <div className="pt-10 lg:pt-14">
      <div ref={gridRef} className="grid gap-4 lg:grid-cols-3 lg:gap-5">
        {bloques.map(({ number, eyebrow, title, titleLines, description, longDescription }) => {
          const isOpen = activeCard === number
          const panelId = `bloque-panel-${number}`

          return (
          <article
            key={number}
            data-bloque-card
            className="relative flex min-h-[360px] flex-col lg:min-h-[430px]"
          >
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex flex-1 flex-col">
                <p className="text-[11px] font-medium tracking-[0em] text-vibio-text/48 uppercase">
                  {eyebrow}
                </p>
                <h3
                  aria-label={title}
                  className="mt-5 max-w-none whitespace-pre-line font-heading text-[clamp(1.55rem,2.2vw,2.15rem)] font-normal leading-[1.04] text-vibio-text"
                >
                  {titleLines[0]}
                  {'\n'}
                  {titleLines[1]}
                </h3>
                <p className="mt-5 max-w-sm text-[15px] font-light leading-[1.75] text-vibio-text/68">
                  {description}
                </p>

                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out ${isOpen ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-sm text-[15px] font-light leading-[1.75] text-vibio-text/68">
                      {longDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`${isOpen ? 'Colapsar' : 'Expandir'} ${title}`}
                    onClick={() => setActiveCard(isOpen ? null : number)}
                    className="inline-flex items-center text-[2rem] leading-none text-vibio-text transition-opacity duration-300 ease-in-out hover:opacity-60"
                  >
                    {isOpen ? '−' : '+'}
                  </button>
                </div>
              </div>
            </div>

          </article>
        )})}
      </div>
    </div>
  )
}
