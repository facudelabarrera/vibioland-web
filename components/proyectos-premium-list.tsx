'use client'

import { useRef, useEffect, useMemo } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { STATUS_LABELS, type ProjectListItem } from '@/sanity/queries'

type HomeProjectEditorialMeta = {
  summary?: string
  homes?: string
  size?: string
  extra?: string
  availability?: string
  cta?: string
}

const HOME_PROJECT_EDITORIAL: Record<string, HomeProjectEditorialMeta> = {
  berlanga: {
    summary:
      'Arquitectura de autor, gobernanza diseñada y una comunidad transgeneracional ya en marcha.',
    homes: '28 viviendas',
    size: '70–120 m²',
    extra: '2h de Madrid · 30 min de Soria',
    availability: '65% reservadas · 10 unidades disponibles',
    cta: 'Ver proyecto',
  },
  higuera: {
    summary:
      'Un nuevo territorio pensado para vivir fuera de la ciudad sin resignar estructura, privacidad ni comunidad.',
    homes: '32 viviendas',
    size: '70–120 m²',
    extra: '1h de Madrid',
    availability: 'Pre-registro abierto para primera ronda',
    cta: 'Conocer territorio',
  },
}

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
      {projects.map((project, i) => {
        const meta = getProjectMeta(project)
        const location = formatLocation(project.location)
        const statusLabel = project.status ? STATUS_LABELS[project.status] : undefined
        const tagline = shouldRenderTagline(project) ? project.tagline : undefined

        return (
        <li key={project._id} className="border-b border-vibio-text/[0.12]">
          <Link
            href={`/proyectos/${project.slug}`}
            className={cn(
              'group block w-full text-vibio-text',
              'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              'hover:bg-vibio-surface/55',
              'focus-visible:bg-vibio-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibio-text focus-visible:ring-inset',
            )}
          >
            <div
              className={cn(
                'grid w-full gap-y-8 px-0 py-8 transition-[padding,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                'sm:py-10 lg:grid-cols-[minmax(5rem,6rem)_minmax(0,1.6fr)_minmax(13rem,0.75fr)] lg:gap-x-10 lg:gap-y-0 lg:py-11 xl:grid-cols-[minmax(5.5rem,6.75rem)_minmax(0,1.8fr)_minmax(14rem,0.78fr)] xl:gap-x-12',
                'group-hover:px-3 group-focus-visible:px-3',
              )}
            >
              <div className="flex items-start gap-4 lg:block lg:pr-2">
                <span className="select-none font-heading text-[clamp(1.85rem,4.5vw,3.75rem)] font-semibold tabular-nums leading-none text-vibio-text">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {statusLabel ? (
                  <span className="inline-flex w-fit rounded-full border border-vibio-border/24 bg-vibio-surface/65 px-3 py-1 text-[11px] font-medium text-vibio-text/58 lg:mt-4">
                    {statusLabel}
                  </span>
                ) : null}
              </div>

              <div className="min-w-0">
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-[clamp(1.3rem,2.6vw,2.5rem)] font-medium leading-[1.04] text-vibio-text">
                    {project.name}
                  </h3>
                  {location ? (
                    <p className="text-[13px] font-light tracking-[0.02em] text-vibio-text/55">
                      {location}
                    </p>
                  ) : null}
                </div>

                {tagline && (
                  <p className="mt-4 max-w-xl text-[15px] font-light leading-[1.78] text-vibio-text/72 lg:pr-8">
                    {tagline}
                  </p>
                )}

                {meta.summary && meta.summary !== tagline && (
                  <p className="mt-3 max-w-xl text-[14px] font-light leading-[1.72] text-vibio-text/56 lg:pr-10">
                    {meta.summary}
                  </p>
                )}

                <ProjectFacts
                  items={[
                    meta.extra,
                    meta.homes ?? formatHomes(project.stats?.viviendas),
                    meta.size,
                  ]}
                />
              </div>

              <div className="flex min-h-full flex-col justify-between gap-5 border-t border-vibio-text/10 pt-5 lg:border-t-0 lg:pt-0 lg:pl-6 xl:pl-8">
                <div>
                  <p className="text-[12px] font-medium text-vibio-text/48">
                    Disponibilidad
                  </p>
                  <p className="mt-3 text-[15px] font-light leading-[1.72] text-vibio-text/72">
                    {meta.availability}
                  </p>
                </div>

                <span className="relative inline-flex w-fit items-center gap-3 pb-1 text-sm font-medium text-vibio-text transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">
                  <span>
                    {meta.cta}
                  </span>
                  <RowArrow className="h-[10px] w-[13px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:h-3 sm:w-[15px]" />
                </span>
              </div>
            </div>
          </Link>
        </li>
        )
      })}
    </ul>
  )
}

function getProjectMeta(project: ProjectListItem): HomeProjectEditorialMeta {
  const key = [project.slug, project.name]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  const editorial = HOME_PROJECT_EDITORIAL[key] ?? {}

  const resolvedEditorial =
    editorial.summary != null
      ? editorial
      : Object.entries(HOME_PROJECT_EDITORIAL).find(([slugLike]) => key.includes(slugLike))?.[1] ?? {}

  return {
    summary: project.description ?? resolvedEditorial.summary,
    homes: resolvedEditorial.homes,
    size: resolvedEditorial.size,
    extra: resolvedEditorial.extra,
    availability: resolvedEditorial.availability ?? 'Consultá disponibilidad actual',
    cta: resolvedEditorial.cta ?? 'Ver proyecto',
  }
}

function formatLocation(location?: ProjectListItem['location']) {
  if (!location) return ''
  return [location.town, location.province, location.region].filter(Boolean).join(', ')
}

function formatHomes(value?: number) {
  return value != null ? `${value.toLocaleString('es-ES')} viviendas` : undefined
}

function shouldRenderTagline(project: ProjectListItem) {
  const key = [project.slug, project.name].filter(Boolean).join(' ').toLowerCase()
  return !key.includes('higuera')
}

function ProjectFacts({ items }: { items: Array<string | undefined> }) {
  const validItems = items.filter(Boolean) as string[]

  if (validItems.length === 0) return null

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-light text-vibio-text/54 lg:mt-6">
      {validItems.map((item, index) => (
        <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
          {index > 0 ? <span className="h-1 w-1 rounded-full bg-vibio-text/24" aria-hidden /> : null}
          <span>{item}</span>
        </span>
      ))}
    </div>
  )
}
