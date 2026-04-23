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
  const activeProjects = getHomeProjects(projects)

  return (
    <section id="proyectos" data-nav-surface="light" className="bg-vibio-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-[12px] font-medium text-vibio-text/45">
                Comunidades
              </p>
              <TextAnimate
                as="h2"
                animation="slideUp"
                by="word"
                once
                className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] text-vibio-text"
              >
                Dos proyectos en ejecución y cuatro en evaluación.
              </TextAnimate>
            </div>
          </div>
        </ScrollReveal>

        <ProyectosPremiumList projects={activeProjects} className="mt-14 lg:mt-20" />

        <div id="proximos-territorios" className="mt-20 lg:mt-28">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-[clamp(1.8rem,3.4vw,2.65rem)] font-semibold leading-[1.06] text-vibio-text text-balance">
                  Próximos Vibio
                </h3>
                <span className="inline-flex w-fit rounded-full border border-vibio-border/24 bg-vibio-surface/65 px-3 py-1 text-[11px] font-medium text-vibio-text/58">
                  En estudio
                </span>
              </div>
              <p className="mt-5 text-[12px] font-medium text-vibio-text/45">
                En estudio · Próximos territorios
              </p>
              <p className="mt-4 text-[15px] font-light leading-[1.8] text-vibio-text/68 lg:text-base">
                Actualmente estamos evaluando cuatro nuevos territorios. Si estás interesado en formar parte del proceso de diseño o conoces un territorio que encaja con el modelo Vibio, podemos hablar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/proyectos"
                  className="inline-flex items-center justify-center border border-vibio-text/20 bg-transparent px-6 py-3 text-sm font-medium text-vibio-text transition-all hover:border-vibio-text/35 hover:bg-vibio-text/[0.04]"
                >
                  Conocer todas las comunidades
                </Link>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center border border-vibio-text/20 bg-transparent px-6 py-3 text-sm font-medium text-vibio-text transition-all hover:border-vibio-text/35 hover:bg-vibio-text/[0.04]"
                >
                  Proponer territorio
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function getHomeProjects(projects: ProjectListItem[]) {
  const byKey = (key: string) =>
    projects.find((project) =>
      [project.slug, project.name].filter(Boolean).join(' ').toLowerCase().includes(key),
    )

  return [
    byKey('higuera') ?? {
      _id: 'home-vibio-higuera',
      name: 'vibio.higuera',
      slug: 'higuera',
    },
    byKey('berlanga') ?? {
      _id: 'home-vibio-berlanga',
      name: 'vibio.berlanga',
      slug: 'berlanga',
    },
  ] as ProjectListItem[]
}
