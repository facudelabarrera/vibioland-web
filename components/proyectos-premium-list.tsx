'use client'

import { useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { type ProjectListItem } from '@/sanity/queries'

type HomeProjectEditorialMeta = {
  key: 'higuera' | 'berlanga'
  name: string
  status: string
  statusTone: 'green' | 'blue'
  location: string
  distance: string
  dossierCta: string
  description: string
  facts: Array<{ label: string; value: string }>
  primaryCta: string
  secondaryCta: string
  iconSrc: string
  iconAlt: string
  dossierHref: string
  secondaryHref: string
}

const HOME_PROJECT_EDITORIAL: Record<HomeProjectEditorialMeta['key'], HomeProjectEditorialMeta> = {
  higuera: {
    key: 'higuera',
    name: 'vibio.higuera',
    status: 'En construcción',
    statusTone: 'green',
    location: 'Higuera de las Dueñas · Ávila',
    distance: '1h de Madrid',
    dossierCta: 'Descargar dossier',
    description:
      'Cinco hectáreas junto al casco urbano del pueblo, con la Sierra de Gredos al norte, la de San Vicente al sur y 400 hectáreas de dehesa pública delante.',
    facts: [
      { label: 'Viviendas', value: '80' },
      { label: 'Superficie', value: '60-115 m²' },
      { label: 'Hectáreas', value: '5' },
    ],
    primaryCta: 'Conocer vibio.higuera',
    secondaryCta: 'Viviendas disponibles',
    iconSrc: '/vibio.higuera_Simbolo_OcreOscuro.svg',
    iconAlt: 'Símbolo de flor de vibio.higuera',
    // TODO: reemplazar por la URL final del dossier cuando exista el archivo público.
    dossierHref: '/contacto?interes=dossier-higuera',
    // TODO: conectar a inventario real cuando exista una ruta específica de viviendas.
    secondaryHref: '/contacto?interes=viviendas-higuera',
  },
  berlanga: {
    key: 'berlanga',
    name: 'vibio.berlanga',
    status: 'En diseño',
    statusTone: 'blue',
    location: 'Berlanga de Duero, Soria',
    distance: 'A 2h de Madrid / 45 min de Soria capital',
    dossierCta: 'Descargar dossier',
    description:
      'Entre encinas y viñedos, a los pies del Castillo de Berlanga, en uno de los conjuntos medievales mejor conservados de España. Un pueblo pequeño con identidad fuerte y tejido social activo.',
    facts: [
      { label: 'Fase', value: 'En diseño' },
      { label: 'Información', value: 'Sept 2026' },
      { label: 'Pre-registro', value: 'Abierto' },
    ],
    primaryCta: 'Conocer vibio.berlanga',
    secondaryCta: 'Pre-registrarme',
    iconSrc: '/vibio.berlanga_Simbolo_OcreOscuro.svg',
    iconAlt: 'Símbolo de árbol de vibio.berlanga',
    // TODO: reemplazar por la URL final del dossier cuando exista el archivo público.
    dossierHref: '/contacto?interes=dossier-berlanga',
    // TODO: conectar al pre-registro real cuando exista una ruta/formulario específico.
    secondaryHref: '/contacto?interes=pre-registro-berlanga',
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
    const animationRoot = root

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let ctx: { revert: () => void } | undefined

    async function init() {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = animationRoot.querySelectorAll<HTMLElement>(':scope > li')

      ctx = gsap.context(() => {
        gsap.from(items, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          stagger: {
            each: 0.12,
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
      }, animationRoot)
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
      className={cn('grid items-stretch gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20', className)}
    >
      {projects.map((project) => {
        const meta = getProjectMeta(project)

        return (
          <li key={project._id} className="flex min-w-0">
            <ProjectCard project={project} meta={meta} />
          </li>
        )
      })}
    </ul>
  )
}

function ProjectCard({
  project,
  meta,
}: {
  project: ProjectListItem
  meta: HomeProjectEditorialMeta
}) {
  return (
    <article
      id={`vibio-${meta.key}`}
      className="flex h-full w-full min-w-0 flex-col text-vibio-text"
    >
      <div className="flex justify-center lg:justify-start">
        <Image
          src={meta.iconSrc}
          alt={meta.iconAlt}
          width={112}
          height={112}
          className="h-20 w-20 object-contain sm:h-24 sm:w-24 lg:h-28 lg:w-28"
        />
      </div>

      <div className="mt-9 grid min-h-[5.75rem] gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <h3 className="font-heading text-[clamp(2.05rem,4vw,3.35rem)] font-medium leading-none tracking-[-0.035em] text-vibio-text">
          {renderProjectName(meta.name)}
        </h3>
        <StatusBadge status={meta.status} tone={meta.statusTone} />
      </div>

      <div className="mt-4 min-h-[3.35rem] space-y-1 text-[15px] font-light leading-[1.45] tracking-[0.01em] text-vibio-text/72 sm:text-base">
        <p>{meta.location}</p>
        <p>{meta.distance}</p>
      </div>

      <Link
        href={meta.dossierHref}
        className="mt-6 inline-flex w-fit border-b border-current pb-0.5 text-[13px] font-medium tracking-[0.035em] text-vibio-text transition-colors hover:text-vibio-text/62 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibio-text/35 focus-visible:ring-offset-4 focus-visible:ring-offset-vibio-white"
      >
        {meta.dossierCta}
      </Link>

      <p className="mt-9 max-w-[38rem] text-[15px] font-light leading-[1.78] tracking-[0.025em] text-vibio-text/76 lg:min-h-[8rem]">
        {meta.description}
      </p>

      <ProjectFacts items={meta.facts} />

      <div className="mt-9 grid gap-4 sm:grid-cols-[minmax(0,1.35fr)_minmax(12rem,0.95fr)]">
        <ProjectButton href={`/proyectos/${project.slug}`} variant="primary">
          <span>{meta.primaryCta}</span>
          <RowArrow className="h-[10px] w-[13px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:h-3 sm:w-[15px]" />
        </ProjectButton>
        <ProjectButton href={meta.secondaryHref} variant="secondary">
          {meta.secondaryCta}
        </ProjectButton>
      </div>
    </article>
  )
}

function StatusBadge({
  status,
  tone,
}: {
  status: string
  tone: HomeProjectEditorialMeta['statusTone']
}) {
  return (
    <span className="inline-flex w-fit items-center justify-center gap-2 border border-vibio-text/50 bg-vibio-white px-3 py-1.5 text-[10px] font-medium tracking-[0.08em] text-vibio-text sm:justify-self-end">
      <span
        className={cn(
          'h-2.5 w-2.5',
          tone === 'green' ? 'bg-[#7eb37d]' : 'bg-[#9bbbd4]',
        )}
        aria-hidden
      />
      {status}
    </span>
  )
}

function ProjectButton({
  href,
  children,
  variant,
}: {
  href: string
  children: ReactNode
  variant: 'primary' | 'secondary'
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-14 items-center justify-center gap-4 border px-4 py-3 text-center text-[11px] font-medium tracking-[0.025em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 xl:text-[12px]',
        'whitespace-nowrap',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibio-text/35 focus-visible:ring-offset-4 focus-visible:ring-offset-vibio-white',
        variant === 'primary'
          ? 'border-vibio-text/70 text-vibio-text hover:bg-vibio-text hover:text-vibio-white'
          : 'border-vibio-text/70 text-vibio-text hover:bg-vibio-surface',
      )}
    >
      {children}
    </Link>
  )
}

function getProjectMeta(project: ProjectListItem): HomeProjectEditorialMeta {
  const haystack = [project.slug, project.name].filter(Boolean).join(' ').toLowerCase()

  if (haystack.includes('berlanga')) return HOME_PROJECT_EDITORIAL.berlanga
  return HOME_PROJECT_EDITORIAL.higuera
}

function renderProjectName(name: string) {
  const [root, accent] = name.split('.')

  return (
    <>
      {root}.<span className="italic">{accent}</span>
    </>
  )
}

function ProjectFacts({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <div className="mt-auto pt-10">
      <div className="grid grid-cols-3 overflow-hidden border border-vibio-text/18 bg-vibio-surface/35 text-vibio-text">
        {items.map((item) => (
          <div
            key={item.label}
            className="min-w-0 border-r border-vibio-text/14 px-3 py-4 last:border-r-0 sm:px-4"
          >
            <p className="truncate text-[10px] font-medium tracking-[0.13em] text-vibio-text/48">
              {item.label}
            </p>
            <p className="mt-2 font-heading text-[clamp(1.05rem,1.55vw,1.45rem)] font-light leading-tight tracking-[-0.015em] text-vibio-text">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
