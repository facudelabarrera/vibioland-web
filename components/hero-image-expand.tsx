'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

import { HeroLogoMark, type HeroLogoMarkHandle } from '@/components/hero-logo-mark'

/**
 * Stagger manuscrito. Windows irregulares (start, duration) por letra con solapamientos
 * para que el conjunto se sienta como escritura y no como wipe. Mapeados sobre un progreso
 * global normalizado 0..1 (el reveal de t).
 */
const SEG_WINDOWS: Array<[number, number]> = [
  [0.00, 0.22],
  [0.09, 0.18],
  [0.19, 0.26],
  [0.31, 0.15],
  [0.38, 0.22],
  [0.48, 0.13],
  [0.56, 0.22],
  [0.68, 0.19],
  [0.80, 0.20],
]

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
const easeOutQuart = (x: number) => 1 - Math.pow(1 - x, 4)
const easeInOutSine = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2

const SEG_EASES = [
  easeInOutCubic, // v
  easeOutCubic,
  easeInOutCubic,
  easeOutQuart,
  easeInOutCubic,
  easeOutCubic,   // punto, rápido
  easeInOutCubic,
  easeInOutSine,
  easeOutCubic,
]

/** Pin background at rest + start of expansion (hero editorial, light) */
const HERO_RGB = [255, 255, 255] as const
/** Page surface once expansion completes */
const PAGE_RGB = [250, 250, 250] as const

export function HeroImageExpand() {
  const pinRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const logoLayerRef = useRef<HTMLDivElement>(null)
  const logoOutlineRef = useRef<HTMLDivElement>(null)
  const logoFillRef = useRef<HeroLogoMarkHandle>(null)

  useEffect(() => {
    const pinEl = pinRef.current
    const frameEl = frameRef.current
    if (!pinEl || !frameEl) return

    const pinRoot: HTMLDivElement = pinEl
    const frameRoot: HTMLDivElement = frameEl
    const logoLayerRoot = logoLayerRef.current
    const logoOutlineRoot = logoOutlineRef.current
    const segProgress = new Array(SEG_WINDOWS.length).fill(0) as number[]

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

          // Subtle white → off-white during last part of expansion (matches body)
          const bgT = Math.min(1, Math.max(0, (ep - 0.7) / 0.3))
          const bgR = Math.round(HERO_RGB[0] + (PAGE_RGB[0] - HERO_RGB[0]) * bgT)
          const bgG = Math.round(HERO_RGB[1] + (PAGE_RGB[1] - HERO_RGB[1]) * bgT)
          const bgB = Math.round(HERO_RGB[2] + (PAGE_RGB[2] - HERO_RGB[2]) * bgT)
          pinRoot.style.backgroundColor = `rgb(${bgR},${bgG},${bgB})`

          if (logoLayerRoot && logoOutlineRoot) {
            logoLayerRoot.style.opacity = '1'

            const outlineOp = Math.min(1, Math.max(0, (ep - 0.08) / 0.42))
            const smooth = outlineOp * outlineOp * (3 - 2 * outlineOp)
            logoOutlineRoot.style.opacity = String(smooth)

            const raw = Math.min(1, Math.max(0, anim.logo))
            for (let i = 0; i < SEG_WINDOWS.length; i++) {
              const [start, dur] = SEG_WINDOWS[i]
              const local = Math.min(1, Math.max(0, (raw - start) / dur))
              segProgress[i] = SEG_EASES[i](local)
            }
            logoFillRef.current?.setSegmentProgress(segProgress)
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

        /** Fracciones del pin (suman 1): expansión → hold fullscreen → reveal logo → hold logo → salida */
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
          ref={logoLayerRef}
          className="pointer-events-none absolute inset-0 z-10 grid place-items-center"
          style={{ opacity: 0, willChange: 'opacity' }}
        >
          <div className="relative">
            {/* Capa base: outline siempre presente como guía desde antes del fullscreen */}
            <div
              ref={logoOutlineRef}
              style={{ opacity: 0, willChange: 'opacity' }}
            >
              <HeroLogoMark
                variant="outline"
                strokeWidth={0.55}
                className="block h-auto w-[min(92vw,860px)]"
              />
            </div>
            {/* Capa activa: cada path se revela individualmente vía <clipPath> SVG con stagger irregular */}
            <div className="pointer-events-none absolute inset-0">
              <HeroLogoMark
                ref={logoFillRef}
                segmented
                className="block h-auto w-[min(92vw,860px)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
