'use client'

import { useRef, useEffect, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  delay?: number
  duration?: number
  stagger?: number
  as?: keyof HTMLElementTagNameMap
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  distance = 32,
  delay = 0,
  duration = 0.9,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const axis = direction === 'left' || direction === 'right' ? 'x' : 'y'
      const sign = direction === 'down' || direction === 'right' ? -1 : 1

      ctx = gsap.context(() => {
        gsap.from(el, {
          [axis]: distance * sign,
          opacity: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      }, el)
    }

    init()
    return () => ctx?.revert()
  }, [direction, distance, delay, duration])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

type StaggerRevealProps = {
  children: ReactNode
  className?: string
  stagger?: number
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let ctx: ReturnType<typeof import('gsap').gsap.context> | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const items = el.children
        gsap.from(items, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        })
      }, el)
    }

    init()
    return () => ctx?.revert()
  }, [stagger])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
