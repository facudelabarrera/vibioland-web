'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export function Unete() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const image = imageRef.current
    if (!section || !text || !image) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.from(text, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from(image, {
          x: 120,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
      }, section)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="unete"
      className="overflow-hidden bg-vibio-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div ref={textRef} className="flex flex-col justify-center">
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-vibio-text text-balance">
              El primer paso es una conversación.
            </h2>
            <p className="mt-6 max-w-md text-lg font-light leading-[1.7] text-vibio-text/60">
              <span className="font-semibold text-vibio-text">vibio</span> no es
              para todo el mundo, y eso es una ventaja. Si llegaste hasta aquí,
              probablemente tiene sentido hablar.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contacto">
                <ShimmerButton
                  background="#18191b"
                  shimmerColor="#ffffff"
                  borderRadius="0"
                  className="border-transparent px-8 py-3.5 text-sm font-medium !text-vibio-white"
                >
                  Empezar la conversación
                </ShimmerButton>
              </Link>
            </div>
            <p className="mt-6 text-xs text-vibio-text/40">
              Sin spam. Sin automatizaciones. Te responde una persona.
            </p>
          </div>

          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]"
          >
            <Image
              src="/images/hero_landscape.png"
              alt="Comunidad rural vibio — paisaje mediterráneo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
