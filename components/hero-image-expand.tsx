'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

const HERO_RGB = [28, 46, 36] as const   // #1c2e24
const PAGE_RGB = [250, 250, 250] as const // #fafafa

export function HeroImageExpand() {
  const pinRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    const frame = frameRef.current
    if (!pin || !frame) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const getClip = () => {
          const vw = window.innerWidth
          const vh = window.innerHeight
          const pad = vw >= 1024 ? 32 : 24
          const containerW = Math.min(vw, 1280)
          const hInset = (vw - containerW) / 2 + pad
          const contentW = vw - hInset * 2
          const imgH = contentW * (6 / 16)
          const bInset = Math.max(0, vh - imgH)
          return { r: hInset, b: bInset, l: hInset, rad: 0 }
        }

        const anim = { expand: 0, exit: 0 }

        const render = () => {
          const c = getClip()
          const ep = anim.expand
          const xp = anim.exit

          const r = c.r * (1 - ep)
          const b = c.b * (1 - ep)
          const l = c.l * (1 - ep)
          const rad = c.rad * (1 - ep)

          frame.style.clipPath = `inset(0px ${r}px ${b}px ${l}px round ${rad}px)`
          frame.style.transform = `translateY(${-100 * xp}%) scale(${1 - 0.04 * xp})`

          // Transition bg from dark green → white during the last 30% of expansion.
          // By the time the image is fullscreen (ep=1), bg is already white.
          // This prevents any dark green from showing during hold or exit phases.
          const bgT = Math.min(1, Math.max(0, (ep - 0.7) / 0.3))
          const bgR = Math.round(HERO_RGB[0] + (PAGE_RGB[0] - HERO_RGB[0]) * bgT)
          const bgG = Math.round(HERO_RGB[1] + (PAGE_RGB[1] - HERO_RGB[1]) * bgT)
          const bgB = Math.round(HERO_RGB[2] + (PAGE_RGB[2] - HERO_RGB[2]) * bgT)
          pin.style.backgroundColor = `rgb(${bgR},${bgG},${bgB})`
        }

        render()

        const PRE_EXPAND = 0.3

        ScrollTrigger.create({
          trigger: pin,
          start: 'top 70%',
          end: 'top top',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            anim.expand = self.progress * PRE_EXPAND
            render()
          },
        })

        const EXPAND_R = 0.45
        const HOLD_R = 0.15

        gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${window.innerHeight * 2}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }).to({ v: 0 }, {
          v: 1,
          duration: 1,
          ease: 'none',
          onUpdate() {
            const p = this.progress()

            if (p <= EXPAND_R) {
              anim.expand = PRE_EXPAND + (1 - PRE_EXPAND) * (p / EXPAND_R)
              anim.exit = 0
            } else if (p <= EXPAND_R + HOLD_R) {
              anim.expand = 1
              anim.exit = 0
            } else {
              anim.expand = 1
              anim.exit = (p - EXPAND_R - HOLD_R) / (1 - EXPAND_R - HOLD_R)
            }

            render()
          },
        })
      }, pin)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <div
      ref={pinRef}
      className="relative w-full overflow-visible"
      style={{ backgroundColor: '#1c2e24' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="w-full" style={{ aspectRatio: '16 / 6' }} />
      </div>
      <div
        ref={frameRef}
        className="pointer-events-none absolute top-0 left-0 h-screen w-full"
        style={{ willChange: 'clip-path, transform' }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Paisaje rural español con colinas y vegetación mediterránea"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  )
}
