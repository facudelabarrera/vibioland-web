'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

/** Pin background — matches --color-vibio-marfil (#F1EFE4) so the spacer behind
 *  the image never shows a white seam during or after the expand animation. */
const HERO_RGB = [241, 239, 228] as const
const PAGE_RGB = [241, 239, 228] as const

const WORDS = ['Reencuentra.', 'Rediseña.', 'Regenera.'] as const

/**
 * One-at-a-time reveal windows over the normalized `anim.logo` progress (0..1).
 * Each word: [inStart, inEnd, outStart, outEnd]. Between inEnd and outStart the
 * word is fully visible. Last word never fades out (keepVisible = true).
 */
const WORD_PHASES: Array<{ inStart: number; inEnd: number; outStart: number; outEnd: number; keepVisible?: boolean }> = [
  { inStart: 0.00, inEnd: 0.06, outStart: 0.22, outEnd: 0.28 },
  { inStart: 0.36, inEnd: 0.42, outStart: 0.56, outEnd: 0.62 },
  { inStart: 0.70, inEnd: 0.78, outStart: 1.00, outEnd: 1.00, keepVisible: true },
]

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
const easeInCubic = (x: number) => x * x * x

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
            textLayerRoot.style.opacity = '1'
            const raw = Math.min(1, Math.max(0, anim.logo))
            for (let i = 0; i < WORDS.length; i++) {
              const { inStart, inEnd, outStart, outEnd, keepVisible } = WORD_PHASES[i]
              const el = wordRefs.current[i]
              if (!el) continue

              let opacity = 0
              let phase: 'pre' | 'in' | 'hold' | 'out' | 'post' = 'pre'
              let phaseProgress = 0

              if (raw < inStart) {
                phase = 'pre'
              } else if (raw < inEnd) {
                phase = 'in'
                phaseProgress = (raw - inStart) / (inEnd - inStart)
                opacity = easeOutCubic(phaseProgress)
              } else if (keepVisible || raw < outStart) {
                phase = 'hold'
                opacity = 1
              } else if (raw < outEnd) {
                phase = 'out'
                phaseProgress = (raw - outStart) / (outEnd - outStart)
                opacity = 1 - easeInCubic(phaseProgress)
              } else {
                phase = 'post'
                opacity = 0
              }

              let y = 0
              let blur = 0
              if (phase === 'pre') {
                y = 28
                blur = 12
              } else if (phase === 'in') {
                y = (1 - easeOutCubic(phaseProgress)) * 28
                blur = (1 - easeOutCubic(phaseProgress)) * 12
              } else if (phase === 'out') {
                y = -easeInCubic(phaseProgress) * 28
                blur = easeInCubic(phaseProgress) * 12
              } else if (phase === 'post') {
                y = -28
                blur = 12
              }

              el.style.opacity = String(opacity)
              el.style.transform = `translate3d(0, ${y}px, 0)`
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
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
        <div
          ref={textLayerRef}
          className="pointer-events-none absolute inset-0 z-10 grid place-items-center px-6"
          style={{ opacity: 0 }}
        >
          <div className="relative flex items-center justify-center">
            {WORDS.map((word, i) => (
              <h2
                key={word}
                ref={(el) => {
                  wordRefs.current[i] = el
                }}
                className="font-heading absolute whitespace-nowrap text-center font-bold leading-[1.05] tracking-tight text-white"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
                  textShadow: '0 2px 32px rgba(0,0,0,0.35)',
                  opacity: 0,
                  transform: 'translate3d(0, 28px, 0)',
                  filter: 'blur(12px)',
                  willChange: 'opacity, transform, filter',
                }}
              >
                {word}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
