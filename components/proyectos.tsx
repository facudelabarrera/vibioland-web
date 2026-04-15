import Link from 'next/link'

import { ProyectosPremiumList } from '@/components/proyectos-premium-list'
import { client } from '@/sanity/lib/client'
import {
  projectsListQuery,
  type ProjectListItem,
} from '@/sanity/queries'
import { TextAnimate } from '@/components/ui/text-animate'
import { ScrollReveal } from '@/components/scroll-reveal'

export async function Proyectos() {
  const projects = await client.fetch<ProjectListItem[]>(projectsListQuery)

  return (
    <section id="proyectos" data-nav-surface="light" className="bg-vibio-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
<div className="flex flex-wrap items-end justify-between gap-8">
              <TextAnimate
                as="h2"
                animation="slideUp"
                by="word"
                once
                className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] text-vibio-text"
              >
                Lugares
              </TextAnimate>

              <Link
                href="/proyectos"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-vibio-text/80 transition-colors duration-200 ease-out hover:text-vibio-text"
              >
                Ver todos los lugares
                <ArrowRightShort className="h-2.5 w-3 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
              </Link>
            </div>

            <p className="mt-4 max-w-2xl font-light leading-[1.7] text-vibio-text/70 lg:mt-6 lg:text-lg">
              Esto ya está pasando. Vibio no es una idea. Es un modelo sólido que ya está en marcha, con comunidades reales y proyectos en desarrollo.
            </p>
        </ScrollReveal>

        <ProyectosPremiumList projects={projects} className="mt-14 lg:mt-20" />
      </div>
    </section>
  )
}

function ArrowRightShort({ className }: { className?: string }) {
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
