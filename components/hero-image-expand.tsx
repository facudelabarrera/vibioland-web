'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

import { DEFAULT_IMAGE_BLUR_DATA_URL } from '@/lib/image-placeholder'

/** Pin background — matches --color-vibio-marfil (#F1EFE4) so the spacer behind
 *  the image never shows a white seam during or after the expand animation. */
const HERO_RGB = [241, 239, 228] as const
const PAGE_RGB = [241, 239, 228] as const

const WORDS = ['Reencuentra.', 'Rediseña.', 'Regenera.'] as const

const WORD_REVEAL_WINDOWS = [
  { start: 0.0, end: 0.18 },
  { start: 0.24, end: 0.44 },
  { start: 0.5, end: 0.72 },
] as const

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)

export function HeroImageExpand() {
  const pinRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const pinEl = pinRef.current
    const frameEl = frameRef.current
    if (!pinEl || !frameEl) return

    const pinRoot: HTMLDivElement = pinEl
    const frameRoot: HTMLDivElement = frameEl
    const textLayerRoot = textLayerRef.current

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const getClip = () => {
          const vw = window.innerWidth
          const vh = window.innerHeight
          const hInset = 0
          const contentW = vw - hInset * 2
          const imgH = contentW * (6 / 16)
          const bInset = Math.max(0, vh - imgH)
          return { r: hInset, b: bInset, l: hInset, rad: 0 }
        }

        const anim = { expand: 0, exit: 0, logo: 0 }

        const render = () => {
          const c = getClip()
          const ep = anim.expand
          const xp = anim.exit

          const r = c.r * (1 - ep)
          const b = c.b * (1 - ep)
          const l = c.l * (1 - ep)
          const rad = c.rad * (1 - ep)

          frameRoot.style.clipPath = `inset(0px ${r}px ${b}px ${l}px round ${rad}px)`
          frameRoot.style.transform = `translateY(${-100 * xp}%) scale(${1 - 0.04 * xp})`

          const bgT = Math.min(1, Math.max(0, (ep - 0.7) / 0.3))
          const bgR = Math.round(HERO_RGB[0] + (PAGE_RGB[0] - HERO_RGB[0]) * bgT)
          const bgG = Math.round(HERO_RGB[1] + (PAGE_RGB[1] - HERO_RGB[1]) * bgT)
          const bgB = Math.round(HERO_RGB[2] + (PAGE_RGB[2] - HERO_RGB[2]) * bgT)
          pinRoot.style.backgroundColor = `rgb(${bgR},${bgG},${bgB})`

          if (textLayerRoot) {
            const raw = Math.min(1, Math.max(0, anim.logo))
            const layerOpacity = raw <= 0 ? 0 : raw < 0.06 ? easeOutCubic(raw / 0.06) : 1
            textLayerRoot.style.opacity = String(layerOpacity)

            for (let i = 0; i < WORDS.length; i++) {
              const { start, end } = WORD_REVEAL_WINDOWS[i]
              const el = wordRefs.current[i]
              if (!el) continue

              let opacity = 0
              let y = 26
              let blur = 14
              let scale = 0.985

              if (raw <= start) {
                opacity = 0
              } else if (raw < end) {
                const progress = easeOutCubic((raw - start) / (end - start))
                opacity = progress
                y = (1 - progress) * 26
                blur = (1 - progress) * 14
                scale = 0.985 + progress * 0.015
              } else {
                opacity = 1
                y = 0
                blur = 0
                scale = 1
              }

              el.style.opacity = String(opacity)
              el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`
              el.style.filter = `blur(${blur}px)`
            }
          }
        }

        render()

        const PRE_EXPAND = 0.3

        ScrollTrigger.create({
          trigger: pinRoot,
          start: 'top 70%',
          end: 'top top',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            anim.expand = self.progress * PRE_EXPAND
            render()
          },
        })

        const EXPAND_R = 0.26
        const HOLD_FULLSCREEN_R = 0.05
        const LOGO_REVEAL_R = 0.48
        const LOGO_HOLD_R = 0.14

        gsap.timeline({
          scrollTrigger: {
            trigger: pinRoot,
            start: 'top top',
            end: () => `+=${window.innerHeight * 3.8}`,
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

            const pLogoRevealStart = EXPAND_R + HOLD_FULLSCREEN_R
            const pLogoRevealEnd = pLogoRevealStart + LOGO_REVEAL_R
            const pLogoHoldEnd = pLogoRevealEnd + LOGO_HOLD_R

            if (p <= EXPAND_R) {
              anim.expand = PRE_EXPAND + (1 - PRE_EXPAND) * (p / EXPAND_R)
              anim.exit = 0
              anim.logo = 0
            } else if (p <= pLogoRevealStart) {
              anim.expand = 1
              anim.exit = 0
              anim.logo = 0
            } else if (p <= pLogoRevealEnd) {
              anim.expand = 1
              anim.exit = 0
              anim.logo = (p - pLogoRevealStart) / LOGO_REVEAL_R
            } else if (p <= pLogoHoldEnd) {
              anim.expand = 1
              anim.exit = 0
              anim.logo = 1
            } else {
              anim.expand = 1
              anim.exit = (p - pLogoHoldEnd) / (1 - pLogoHoldEnd)
              anim.logo = 1
            }

            render()
          },
        })
      }, pinRoot)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <div
      ref={pinRef}
      data-nav-surface="dark"
      className="relative w-full overflow-visible bg-vibio-marfil"
      style={{ backgroundColor: 'var(--color-vibio-marfil)' }}
    >
      <div className="w-full">
        <div className="w-full" style={{ aspectRatio: '16 / 6' }} />
      </div>
      <div
        ref={frameRef}
        className="pointer-events-none absolute top-0 left-0 h-screen w-full"
        style={{ willChange: 'clip-path, transform' }}
      >
        <Image
          src="/Copia de VIBIOLAND_20250216_011.JPG"
          alt="Vista aérea de Vibioland entre entorno rural y urbanización"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={DEFAULT_IMAGE_BLUR_DATA_URL}
          className="object-cover"
        />
        <div
          ref={textLayerRef}
          className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-6"
          style={{ opacity: 0 }}
        >
          <div className="flex max-w-[min(92vw,1200px)] flex-wrap items-center justify-center gap-x-[0.32em] gap-y-[0.12em] text-center sm:flex-nowrap">
            {WORDS.map((word, i) => (
              <span
                key={word}
                ref={(el) => {
                  wordRefs.current[i] = el
                }}
                className="font-heading whitespace-nowrap text-center font-bold leading-[1.02] tracking-[-0.035em] text-white"
                style={{
                  fontSize: 'clamp(1.85rem, 5.2vw, 4.7rem)',
                  textShadow: '0 2px 32px rgba(0,0,0,0.35)',
                  opacity: 0,
                  transform: 'translate3d(0, 26px, 0) scale(0.985)',
                  filter: 'blur(14px)',
                  willChange: 'opacity, transform, filter',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
