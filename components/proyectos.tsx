import Link from 'next/link'

import { client } from '@/sanity/lib/client'
import {
  projectsListQuery,
  type ProjectListItem,
} from '@/sanity/queries'
import { TextAnimate } from '@/components/ui/text-animate'
import { ScrollReveal, StaggerReveal } from '@/components/scroll-reveal'

export async function Proyectos() {
  const projects = await client.fetch<ProjectListItem[]>(projectsListQuery)

  return (
    <section id="proyectos" className="bg-vibio-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              once
              className="font-heading whitespace-nowrap text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] text-vibio-text"
            >
              Nuestros proyectos
            </TextAnimate>

            <Link
              href="/proyectos"
              className="group inline-flex items-center gap-2 text-sm font-medium text-vibio-text transition-opacity hover:opacity-60"
            >
              Ver todos los proyectos
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-12 border-t border-vibio-text/15 lg:mt-16" stagger={0.12}>
          {projects.map((project) => (
            <li key={project._id}>
              <ProjectRow project={project} />
            </li>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}

function ProjectRow({ project }: { project: ProjectListItem }) {
  const location = [project.location?.town, project.location?.province]
    .filter(Boolean)
    .join(', ')

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group flex items-center justify-between gap-6 border-b border-vibio-text/15 py-6 transition-colors hover:bg-vibio-surface/70 lg:py-7"
    >
      {/* Name + location aligned in consistent columns */}
      <div className="flex flex-col gap-1 sm:grid sm:grid-cols-[minmax(220px,340px)_minmax(0,1fr)] sm:items-baseline sm:gap-x-6">
        <h3 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-[1.1] text-vibio-text">
          {project.name}
        </h3>
        <p className="text-sm font-light text-vibio-text/55 sm:text-base">
          {location || 'Ubicación por confirmar'}
        </p>
      </div>

      {/* Arrow isolated right */}
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center border border-vibio-text/20 text-vibio-text transition-all duration-300 group-hover:border-vibio-text/30 group-hover:bg-vibio-surface-2 group-hover:text-vibio-text sm:h-12 sm:w-12"
      >
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
      </span>
    </Link>
  )
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.75}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 17L17 7M8 7h9v9"
      />
    </svg>
  )
}
