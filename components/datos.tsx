'use client'

import { useEffect, useRef } from 'react'
import { ScrollReveal } from '@/components/scroll-reveal'

type Dato = {
  metric: string
  description: string
  text: string
}

const datos: Dato[] = [
  {
    metric: '80',
    description: 'familias en vibio',
    text: 'Ya forman parte del primer Vibio. No son compradores anónimos: son co-autores que llevan dos años participando en el diseño del proyecto.',
  },
  {
    metric: '1.500',
    description: 'personas interesadas',
    text: 'Forman la comunidad de interesados que confirma que no hablamos de un nicho sino de la necesidad creciente de encontrar otra forma de vivir.',
  },
  {
    metric: '23,2 M€',
    description: 'invertidos en vibio.Higuera',
    text: 'Financiación cerrada con Triodos Bank (primer banco ético europeo, B Corp) y co-promotores privados. Sin subvenciones, sin dependencia de ayudas públicas.',
  },
  {
    metric: '70-80%',
    description: 'casas más eficientes',
    text: 'Que una vivienda rural convencional. Arquitectura pasiva, aerotermia, fotovoltaica en tejados, aislamiento con textiles reciclados. Consumo eléctrico entre 20 y 50 € al mes.',
  },
  {
    metric: '400',
    description: 'árboles, 96 especies',
    text: '5 hectáreas pensadas para atraer fauna, absorber agua y mejorar la biodiversidad del entorno durante décadas.',
  },
  {
    metric: '06-15 %',
    description: 'beneficio máximo',
    text: 'Beneficio máximo que pueden obtener los promotores. Cualquier excedente se destina a reducir precios para la comunidad o a iniciar nuevos proyectos. Aquí nadie se está haciendo rico.',
  },
]

export function Datos() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Scroll-enter animation
  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-dato-card]'))
    const dividers = cards.map((c) => c.querySelector<HTMLElement>('[data-dato-divider]'))
    if (!cards.length) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.set(dividers, { transformOrigin: 'top center', scaleY: 0 })
        gsap.set(cards, { y: 18, opacity: 0 })

        ScrollTrigger.create({
          trigger: root,
          start: 'top 78%',
          once: true,
          onEnter: () => {
            gsap.to(dividers, {
              scaleY: 1,
              duration: 0.85,
              ease: 'power3.out',
              stagger: 0.06,
            })
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.06,
              delay: 0.08,
            })
          },
        })
      }, root)
    }

    init()
    return () => ctx?.revert()
  }, [])

  // Drag-to-scroll for desktop mouse users
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let isDown = false
    let isDragging = false
    let startX = 0
    let scrollLeft = 0
    let lastX = 0
    let velocity = 0
    let rafId = 0
    const THRESHOLD = 4

    const stopMomentum = () => cancelAnimationFrame(rafId)

    const applyMomentum = () => {
      if (Math.abs(velocity) < 0.5) return
      velocity *= 0.94
      track.scrollLeft -= velocity
      rafId = requestAnimationFrame(applyMomentum)
    }

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return
      stopMomentum()
      isDown = true
      isDragging = false
      startX = e.clientX
      lastX = e.clientX
      scrollLeft = track.scrollLeft
      velocity = 0
    }

    const onMove = (e: MouseEvent) => {
      if (!isDown) return
      const dx = e.clientX - startX
      if (!isDragging && Math.abs(dx) < THRESHOLD) return
      if (!isDragging) {
        isDragging = true
        track.style.cursor = 'grabbing'
        document.body.style.userSelect = 'none'
        document.body.style.cursor = 'grabbing'
      }
      velocity = e.clientX - lastX
      lastX = e.clientX
      track.scrollLeft = scrollLeft - dx
    }

    const onUp = () => {
      if (!isDown) return
      isDown = false
      if (isDragging) {
        isDragging = false
        track.style.cursor = 'grab'
        document.body.style.userSelect = ''
        document.body.style.cursor = ''
        applyMomentum()
      }
    }

    track.addEventListener('mousedown', onDown)
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)

    return () => {
      stopMomentum()
      track.removeEventListener('mousedown', onDown)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="datos"
      data-nav-surface="light"
      className="overflow-hidden bg-vibio-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-6">
            <span className="inline-block rounded-full border border-vibio-text/25 px-4 py-1.5 text-[11px] font-medium tracking-[0.06em] text-vibio-text/50 uppercase">
              Vibio en cifras
            </span>
          </div>
          <h2 className="font-heading max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-vibio-text">
            Datos que diferencian una promesa de un compromiso.
          </h2>
        </ScrollReveal>

        {/* Scroll wrapper — relative so the fade overlay is scoped to the container */}
        <div className="relative mt-14 lg:mt-20">
          {/* Right-edge fade — signals horizontal continuity without blocking scroll */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 lg:w-28"
            style={{ background: 'linear-gradient(to left, var(--color-vibio-white) 35%, transparent 100%)' }}
          />

          {/* Horizontal scroll track */}
          <div
            ref={trackRef}
            className="cursor-grab overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-7 lg:gap-9">
              {datos.map((dato) => (
                <div
                  key={dato.description}
                  data-dato-card
                  className="relative flex w-[260px] flex-shrink-0 flex-col pb-8 pl-6 pt-1"
                >
                  <span
                    data-dato-divider
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px bg-vibio-text/22"
                  />

                  {/* Fixed-height top block — pins all descriptions to the same Y */}
                  <div className="h-[120px]">
                    <span className="font-serif block whitespace-nowrap text-[clamp(2rem,2.8vw,2.8rem)] font-semibold leading-none text-vibio-text">
                      {dato.metric}
                    </span>

                    <span className="mt-2 block font-serif italic font-normal text-sm leading-[1.45] text-vibio-text/65">
                      {dato.description}
                    </span>
                  </div>

                  <p className="mt-20 text-[13px] font-light leading-[1.65] text-vibio-text/52">
                    {dato.text}
                  </p>
                </div>
              ))}

              {/* Trailing spacer so last card clears the fade overlay when scrolled to end */}
              <div className="min-w-[80px] flex-shrink-0 lg:min-w-[112px]" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
