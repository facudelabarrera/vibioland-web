'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export function Unete() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.from(text, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        })
      }, section)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} id="unete" className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div
          className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[70vh]"
        >
          <Image
            src="/images/hero_landscape.png"
            alt="Comunidad rural vibio — paisaje mediterráneo"
            fill
            quality={90}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div
          ref={textRef}
          className="flex flex-col justify-center px-6 py-16 lg:px-16 lg:py-24"
        >
          <h2 className="font-heading text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.08] text-white text-balance">
            El primer paso es una conversación.
          </h2>
          <p className="mt-6 max-w-md text-lg font-light leading-[1.7] text-white/60">
            <span className="font-semibold text-white">vibio</span> no es
            para todo el mundo, y eso es una ventaja. Si llegaste hasta aquí,
            probablemente tiene sentido hablar.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contacto">
              <ShimmerButton
                background="rgba(255,255,255,0.95)"
                shimmerColor="var(--color-vibio-brand-green)"
                borderRadius="0"
                className="border-transparent px-8 py-3.5 text-sm font-medium !text-vibio-dark"
              >
                Empezar la conversación
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
