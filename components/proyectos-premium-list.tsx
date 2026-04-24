'use client'

import { useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { type ProjectListItem } from '@/sanity/queries'

type HomeProjectEditorialMeta = {
  key: 'higuera' | 'berlanga'
  name: string
  logoSrc: string
  logoAlt: string
  status: string
  statusDotColor: string
  themeColor: string
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
    logoSrc: '/vibio.higuera_logo.svg',
    logoAlt: 'Logo de vibio.higuera',
    status: 'En construcción',
    statusDotColor: '#7AB782',
    themeColor: '#A36A3A',
    location: 'Higuera de las Dueñas · Ávila',
    distance: '1h de Madrid',
    dossierCta: 'DESCARGAR DOSSIER',
    description:
      'Cinco hectáreas junto al casco urbano del pueblo, con la Sierra de Gredos al norte, la de San Vicente al sur y 400 hectáreas de dehesa pública delante.',
    facts: [
      { label: 'Viviendas', value: '80' },
      { label: 'Superficie', value: '60-115 m²' },
      { label: 'Hectáreas', value: '5' },
    ],
    primaryCta: 'CONOCER',
    secondaryCta: 'VIVIENDAS DISPONIBLES',
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
    logoSrc: '/vibio.berlanga_logo.svg',
    logoAlt: 'Logo de vibio.berlanga',
    status: 'En diseño',
    statusDotColor: '#9BBBD4',
    themeColor: '#424B2D',
    location: 'Berlanga de Duero, Soria',
    distance: 'A 2h de Madrid / 45 min de Soria capital',
    dossierCta: 'DESCARGAR DOSSIER',
    description:
      'Entre encinas y viñedos, a los pies del Castillo de Berlanga, en uno de los conjuntos medievales mejor conservados de España. Un pueblo pequeño con identidad fuerte y tejido social activo.',
    facts: [
      { label: 'Fase', value: 'En diseño' },
      { label: 'Información', value: 'Sept 2026' },
      { label: 'Pre-registro', value: 'Abierto' },
    ],
    primaryCta: 'CONOCER',
    secondaryCta: 'PRE-REGISTRARME',
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
      <p className="t-home-body-empty text-vibio-text/60">
        Todavía no hay proyectos publicados. Volvé pronto.
      </p>
    )
  }

  return (
    <ul
      ref={listRef}
      role="list"
      className={cn(
        'grid items-stretch gap-20 lg:justify-between lg:gap-28 xl:gap-32',
        'lg:grid-cols-[minmax(0,30rem)_minmax(0,30rem)] xl:grid-cols-[minmax(0,33rem)_minmax(0,33rem)]',
        className,
      )}
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
      className="vibio-project-card flex h-full w-full min-w-0 flex-col"
      style={{ color: meta.themeColor }}
    >
      <div className="flex justify-center lg:justify-start">
        <div
          data-project-icon
          role="img"
          aria-label={meta.iconAlt}
          className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
          style={{
            backgroundColor: meta.themeColor,
            WebkitMaskImage: `url(${meta.iconSrc})`,
            maskImage: `url(${meta.iconSrc})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
      </div>

      <div className="mt-9 grid min-h-[5.75rem] gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div
          data-project-logo
          role="img"
          aria-label={meta.logoAlt}
          className="h-11 w-[16.25rem] sm:h-12 sm:w-[17.5rem] lg:h-[3.4rem] lg:w-[19.5rem]"
          style={{
            backgroundColor: meta.themeColor,
            WebkitMaskImage: `url(${meta.logoSrc})`,
            maskImage: `url(${meta.logoSrc})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'left center',
            maskPosition: 'left center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          }}
        />
        <StatusBadge status={meta.status} dotColor={meta.statusDotColor} textColor={meta.themeColor} />
      </div>

      <div data-project-meta className="t-home-serif-meta mt-4 min-h-[3.35rem] space-y-1">
        <p>{meta.location}</p>
        <p>{meta.distance}</p>
      </div>

      <Link
        href={meta.dossierHref}
        className="t-home-link-dossier vibio-hover-link mt-6 inline-flex w-fit border-b border-current pb-0.5 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-vibio-white"
        style={{ borderColor: `${meta.themeColor}80`, color: meta.themeColor, outlineColor: meta.themeColor }}
      >
        {meta.dossierCta}
      </Link>

      <p className="t-home-body-community mt-9 max-w-[38rem] lg:min-h-[8rem]">
        {meta.description}
      </p>

      <ProjectFacts items={meta.facts} color={meta.themeColor} />

      <div data-project-cta-row className="mt-9 grid gap-4 sm:grid-cols-[minmax(0,1.35fr)_minmax(12rem,0.95fr)]">
        <ProjectButton href={`/proyectos/${project.slug}`} variant="primary" color={meta.themeColor}>
          <span>{meta.primaryCta}</span>
          <RowArrow className="h-[10px] w-[13px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:h-3 sm:w-[15px]" />
        </ProjectButton>
        <ProjectButton href={meta.secondaryHref} variant="secondary" color={meta.themeColor}>
          {meta.secondaryCta}
        </ProjectButton>
      </div>
    </article>
  )
}

function StatusBadge({
  status,
  dotColor,
  textColor,
}: {
  status: string
  dotColor: string
  textColor: string
}) {
  return (
    <span
      className="t-home-badge-status vibio-badge-radius inline-flex w-fit items-center justify-center gap-2 border bg-vibio-white px-3 py-1.5 sm:justify-self-end"
      style={{ borderColor: `${textColor}66`, color: textColor }}
    >
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: dotColor }}
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
  color,
}: {
  href: string
  children: ReactNode
  variant: 'primary' | 'secondary'
  color: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        't-home-button vibio-button-motion group vibio-action-radius inline-flex min-h-14 w-full items-center border px-4 py-3 text-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5',
        'whitespace-nowrap',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-vibio-white',
        variant === 'primary' ? 'justify-between text-white' : 'justify-center bg-transparent',
      )}
      style={
        variant === 'primary'
          ? {
              backgroundColor: color,
              borderColor: color,
              color: '#ffffff',
            }
          : {
              borderColor: `${color}B3`,
              color,
            }
      }
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

function ProjectFacts({
  items,
  color,
}: {
  items: Array<{ label: string; value: string }>
  color: string
}) {
  return (
    <div className="mt-auto pt-10">
      <div data-project-facts className="grid grid-cols-3 border-y" style={{ borderColor: `${color}26`, color }}>
        {items.map((item, i) => (
          <div
            key={item.label}
            className="min-w-0 px-4 py-3.5"
            style={i > 0 ? { borderLeft: `1px solid ${color}26` } : undefined}
          >
            <p className="t-home-fact-label" style={{ color: `${color}B3` }}>
              {item.label}
            </p>
            <p className="t-home-serif-stat mt-1.5">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
