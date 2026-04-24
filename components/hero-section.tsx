'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { DEFAULT_IMAGE_BLUR_DATA_URL } from "@/lib/image-placeholder"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const scope = root

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const image = scope.querySelector<HTMLElement>('[data-hero-media]')
        const overlay = scope.querySelector<HTMLElement>('[data-hero-overlay]')
        const lines = scope.querySelectorAll<HTMLElement>('[data-hero-reveal]')

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(
          image,
          { scale: 1.08, yPercent: 3, filter: 'brightness(0.92)' },
          { scale: 1, yPercent: 0, filter: 'brightness(1)', duration: 1.35 },
        )
          .fromTo(
            overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.9 },
            0.05,
          )
          .fromTo(
            lines,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.88, stagger: 0.1 },
            0.2,
          )

        if (image) {
          gsap.to(image, {
            yPercent: -3.5,
            ease: 'none',
            scrollTrigger: {
              trigger: scope,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      }, scope)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} data-nav-surface="light" className="bg-vibio-white pb-16 sm:pb-20 lg:pb-24">
      <div className="w-full">
        <div className="group relative min-h-[460px] overflow-hidden rounded-[28px] bg-[#d8d0bf] sm:min-h-[540px] sm:rounded-[36px] lg:min-h-[680px] lg:rounded-[44px]">
          <Image
            src="/hero.jpg"
            alt="Vista arquitectónica de la comunidad Vibio integrada al paisaje"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 92vw, 1400px"
            placeholder="blur"
            blurDataURL={DEFAULT_IMAGE_BLUR_DATA_URL}
            className="object-cover object-[58%_center] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
            data-hero-media
          />

          <div
            aria-hidden
            data-hero-overlay
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(50,42,28,0.40) 0%, rgba(50,42,28,0.22) 26%, rgba(50,42,28,0.08) 46%, rgba(50,42,28,0.02) 66%, rgba(50,42,28,0) 100%), linear-gradient(180deg, rgba(30,24,15,0.10) 0%, rgba(30,24,15,0.04) 42%, rgba(30,24,15,0.12) 100%)",
            }}
          />

          <div className="relative z-10 min-h-[460px] sm:min-h-[540px] lg:min-h-[680px]">
            <div className="flex min-h-[460px] w-full flex-col justify-between px-7 pt-8 pb-8 sm:min-h-[540px] sm:px-10 sm:pt-10 sm:pb-10 lg:min-h-[680px] lg:px-14 lg:pt-14 lg:pb-14 xl:px-16 xl:pt-16 xl:pb-16">
              <div className="max-w-[760px]">
                <p data-hero-reveal className="t-home-eyebrow-hero text-white/88 lg:w-max lg:max-w-none lg:whitespace-nowrap">
                  Diseñamos comunidades y viviendas para la biodiversidad
                </p>

                <h1 className="t-home-serif-hero mt-4 text-white sm:mt-5">
                  <span data-hero-reveal className="lg:block lg:w-max lg:whitespace-nowrap">Una alternativa real</span>
                  <span data-hero-reveal className="lg:block lg:w-max lg:whitespace-nowrap">a la vida en la ciudad</span>
                </h1>
              </div>

              <div data-hero-reveal>
                <Link
                  href="/modelo"
                  className="t-home-cta-label vibio-button-motion inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-vibio-text transition-colors duration-200 hover:bg-[#f4efe4]"
                >
                  ASÍ FUNCIONA VIBIO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
