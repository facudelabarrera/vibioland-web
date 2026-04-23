'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  const [hasOverflow, setHasOverflow] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [hasScrolledHorizontally, setHasScrolledHorizontally] = useState(false)

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

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateScrollState = () => {
      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
      const nextHasOverflow = maxScroll > 8
      const nextProgress = nextHasOverflow ? track.scrollLeft / maxScroll : 0

      setHasOverflow(nextHasOverflow)
      setScrollProgress(nextProgress)
      setCanScrollRight(nextHasOverflow && track.scrollLeft < maxScroll - 8)
      if (!hasScrolledHorizontally && track.scrollLeft > 12) {
        setHasScrolledHorizontally(true)
      }
    }

    updateScrollState()

    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="datos"
      data-nav-surface="light"
      className="overflow-hidden bg-[#DBC56C] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-6">
            <span className="inline-flex w-fit rounded-full bg-[#5F5134] px-4 py-1.5 text-[11px] font-medium tracking-[0.06em] text-white uppercase">
              Vibio en cifras
            </span>
          </div>
          <h2 className="font-heading max-w-3xl text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.08] text-[#5F5134]">
            Datos que diferencian una promesa de un compromiso.
          </h2>
        </ScrollReveal>

        {/* Scroll wrapper — relative so the fade overlay is scoped to the container */}
        <div className="relative mt-14 lg:mt-20">
          {hasOverflow && (
            <div className="mb-5 flex items-center justify-between gap-4 text-[#5F5134]/72">
              <div className="min-h-[14px]">
                {!hasScrolledHorizontally && (
                  <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] uppercase">
                    <ChevronLeft className="h-3.5 w-3.5 opacity-45" />
                    <span>Deslizá para ver más</span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 transition-opacity duration-300 ${
                        canScrollRight ? 'opacity-100' : 'opacity-35'
                      }`}
                    />
                  </div>
                )}
              </div>

              <div
                aria-hidden
                className="hidden h-0.5 w-28 overflow-hidden rounded-full bg-[#5F5134]/18 sm:block"
              >
                <div
                  className="h-full rounded-full bg-[#5F5134]/55 transition-transform duration-200 ease-out"
                  style={{
                    width: '40%',
                    transform: `translateX(${scrollProgress * 150}%)`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Right-edge fade — signals horizontal continuity without blocking scroll */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 lg:w-28"
            style={{ background: 'linear-gradient(to left, #DBC56C 35%, transparent 100%)' }}
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
                    className="absolute inset-y-0 left-0 w-px bg-[#5F5134]/22"
                  />

                  {/* Fixed-height top block — pins all descriptions to the same Y */}
                  <div className="h-[128px]">
                    <span className="font-serif block whitespace-nowrap text-[clamp(2.2rem,3vw,3rem)] font-semibold leading-none text-[#5F5134]">
                      {dato.metric}
                    </span>

                    <span className="mt-2.5 block font-serif italic font-normal text-[15px] leading-[1.5] text-[#5F5134]/72">
                      {dato.description}
                    </span>
                  </div>

                  <p className="mt-20 text-[14px] font-light leading-[1.7] text-[#5F5134]/82">
                    {dato.text}
                  </p>
                </div>
              ))}

              {/* Trailing spacer so last card clears the fade overlay when scrolled to end */}
              <div className="min-w-[80px] flex-shrink-0 lg:min-w-[112px]" aria-hidden />
            </div>
          </div>

          {hasOverflow && (
            <div
              aria-hidden
              className="mt-5 h-0.5 overflow-hidden rounded-full bg-[#5F5134]/18 sm:hidden"
            >
              <div
                className="h-full rounded-full bg-[#5F5134]/55 transition-transform duration-200 ease-out"
                style={{
                  width: '32%',
                  transform: `translateX(${scrollProgress * 212.5}%)`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
