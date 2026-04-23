'use client'

import { useEffect, useRef, type ComponentType } from 'react'
import Image from 'next/image'

type Bloque = {
  number: string
  eyebrow: string
  title: string
  titleLines: [string, string]
  description: string
  imageSrc: string
  Icon: ComponentType<{ className?: string }>
}

function ArquitecturaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      <path d="M18 82 60 38l42 44" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 73v28h64V73" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M47 101V79h26v22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M87 31v18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M78 38h18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="92" cy="28" r="12" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  )
}

function ComunidadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      <circle cx="37" cy="44" r="12" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="82" cy="44" r="12" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="60" cy="30" r="10" stroke="currentColor" strokeWidth="2.2" />
      <path d="M25 88c2-14 12-23 24-23s22 9 24 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M58 88c1-12 9-20 20-20 12 0 20 8 22 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 88c1-12 9-20 20-20 8 0 14 3 18 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M52 56h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

function RegeneracionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      <path d="M60 95V47" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M60 62c0-16 11-29 27-33-1 17-12 30-27 33Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M60 72c0-16-11-29-27-33 1 17 12 30 27 33Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M30 97c8-8 18-12 30-12s22 4 30 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="91" cy="44" r="8" stroke="currentColor" strokeWidth="2.2" />
      <path d="M91 31v-8M91 65v-8M78 44h-8M112 44h-8M82 35l-6-6M100 35l6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

const bloques: Bloque[] = [
  {
    number: '001',
    eyebrow: 'Las viviendas',
    title: 'Arquitectura bioclimática',
    titleLines: ['Arquitectura', 'bioclimática'],
    description:
      'Casas eficientes, pensadas para perdurar en un entorno que se regenera.',
    imageSrc: '/VIBIO 4.0 - GENERAL.jpg',
    Icon: ArquitecturaIcon,
  },
  {
    number: '002',
    eyebrow: 'La comunidad',
    title: 'Comunidad con intención',
    titleLines: ['Comunidad', 'con intención'],
    description:
      'Espacios compartidos, reglas claras y respeto a la intimidad. Vivir en comunidad, con tu privacidad intacta.',
    imageSrc: '/VIBIO 4.0 - GENERAL (1).jpg',
    Icon: ComunidadIcon,
  },
  {
    number: '003',
    eyebrow: 'El territorio',
    title: 'Arraigo territorial',
    titleLines: ['Arraigo', 'territorial'],
    description:
      'Vínculos que van más allá de tu vivienda: formar parte de un lugar que se transforma contigo.',
    imageSrc: '/Copia de H_Dueñas-8436.jpg',
    Icon: RegeneracionIcon,
  },
]

export function ModeloBloquesSection() {
  const gridRef = useRef<HTMLDivElement>(null)

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
      <div ref={gridRef} className="grid gap-0 lg:grid-cols-3">
        {bloques.map(({ number, eyebrow, title, titleLines, description, imageSrc, Icon }) => (
          <article
            key={number}
            data-bloque-card
            className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden px-6 py-8 transition-colors duration-500 lg:min-h-[430px] lg:border-r lg:border-vibio-border/75 lg:px-8 lg:py-10 lg:last:border-r-0"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 1023px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-vibio-casi-negro/55 transition-colors duration-500 ease-out group-hover:bg-vibio-casi-negro/58" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between transition-all duration-500 ease-out">
              <div className="relative h-[112px] w-full">
                <div className="absolute inset-0 flex items-start">
                <Icon className="h-20 w-20 text-vibio-cafe-medio transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:text-white" />
                </div>
              </div>

              <div className="mt-10">
                <p className="mb-3 text-[11px] font-medium tracking-[0.18em] text-vibio-text/48 transition-colors duration-500 ease-out group-hover:text-white/58">
                  {eyebrow}
                </p>
                <h3
                  aria-label={title}
                  className="max-w-none whitespace-pre-line font-heading text-[clamp(1.55rem,2.2vw,2.15rem)] font-normal leading-[1.04] text-vibio-text transition-colors duration-500 ease-out group-hover:text-white"
                >
                  {titleLines[0]}
                  {'\n'}
                  {titleLines[1]}
                </h3>
                <p className="mt-4 max-w-sm text-[15px] font-light leading-[1.75] text-vibio-text/68 transition-colors duration-500 ease-out group-hover:text-white/86">
                  {description}
                </p>
              </div>
            </div>

          </article>
        ))}
      </div>
    </div>
  )
}
