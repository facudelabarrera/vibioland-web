'use client'

import { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { ProjectListItem } from '@/sanity/queries'

function RowArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 42 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M26.379 32.109L23.193 29.218L33.518 18.244H0.36V14.114H33.518L23.193 3.14L26.379 0.248997L41.129 16.179L26.379 32.109Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ProyectosPremiumList({
  projects,
  className,
}: {
  projects: ProjectListItem[]
  className?: string
}) {
  const listRef = useRef<HTMLUListElement>(null)
  const projectsKey = useMemo(
    () => projects.map((p) => p._id).join('\0'),
    [projects],
  )

  useEffect(() => {
    if (projects.length === 0) return
    const root = listRef.current
    if (!root) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let ctx: { revert: () => void } | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = root.querySelectorAll<HTMLElement>(':scope > li')

      ctx = gsap.context(() => {
        gsap.from(items, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: {
            each: 0.095,
            from: 'start',
            ease: 'power1.out',
          },
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 86%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        })
      }, root)
    }

    init()

    return () => {
      ctx?.revert()
    }
  }, [projects.length, projectsKey])

  if (projects.length === 0) {
    return (
      <p className="text-sm font-light text-vibio-text/60">
        Todavía no hay proyectos publicados. Volvé pronto.
      </p>
    )
  }

  return (
    <ul
      ref={listRef}
      role="list"
      className={cn('border-t border-vibio-text/[0.12]', className)}
    >
      {projects.map((project, i) => (
        <li key={project._id} className="border-b border-vibio-text/[0.12]">
          <Link
            href={`/proyectos/${project.slug}`}
            className={cn(
              'group block w-full text-vibio-text',
              'transition-[background-color] duration-200 ease-out motion-reduce:transition-none',
              'hover:bg-vibio-accent-yellow',
              'focus-visible:bg-vibio-accent-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibio-text focus-visible:ring-inset',
            )}
          >
            <div
              className={cn(
                'grid w-full items-center',
                'grid-cols-[minmax(3.25rem,4rem)_minmax(0,1fr)_auto]',
                'gap-x-3 py-6 sm:grid-cols-[minmax(4.25rem,5.5rem)_minmax(0,1fr)_auto] sm:gap-x-8 sm:py-8 md:gap-x-10 md:py-9 lg:grid-cols-[minmax(5.25rem,6.75rem)_minmax(0,1fr)_auto] lg:gap-x-14 lg:py-10',
                'px-0 transition-[padding] duration-200 ease-out motion-reduce:transition-none',
                'group-hover:px-4 group-focus-visible:px-4',
              )}
            >
              <span className="select-none font-heading text-[clamp(1.85rem,4.5vw,3.75rem)] font-semibold tabular-nums leading-none text-vibio-text">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <h3 className="font-heading text-[clamp(1.15rem,2.5vw,2.5rem)] font-medium leading-[1.06] text-vibio-text">
                  {project.name}
                </h3>
              </span>
              <span
                className="flex shrink-0 items-center justify-end pl-1 text-vibio-text transition-transform duration-200 ease-out motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 group-hover:translate-x-1 sm:pl-2"
                aria-hidden
              >
                <RowArrow className="h-[10px] w-[13px] sm:h-3 sm:w-[15px] md:h-[14px] md:w-[18px]" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
