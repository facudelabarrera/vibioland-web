import Link from 'next/link'

import { ProyectosPremiumList } from '@/components/proyectos-premium-list'
import { client } from '@/sanity/lib/client'
import {
  projectsListQuery,
  type ProjectListItem,
} from '@/sanity/queries'
import { TextAnimate } from '@/components/ui/text-animate'
import { ScrollReveal } from '@/components/scroll-reveal'

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

export async function Proyectos() {
  const projects = await client.fetch<ProjectListItem[]>(projectsListQuery)
  const activeProjects = getHomeProjects(projects)

  return (
    <section id="proyectos" data-nav-surface="light" className="bg-vibio-white py-24 lg:py-32">
      <div className="vibio-layout-shell">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="t-home-badge-dark mb-4 inline-flex w-fit rounded-full bg-[#3F3926] px-4 py-1.5 text-white">
                Comunidades
              </p>
              <TextAnimate
                as="h2"
                animation="slideUp"
                by="line"
                once
                className="t-home-display-section-wide text-vibio-text"
              >
                {"Dos proyectos en ejecución\ny cuatro en evaluación."}
              </TextAnimate>
            </div>
          </div>
        </ScrollReveal>

        <ProyectosPremiumList projects={activeProjects} className="mt-14 lg:mt-20" />

        <div id="proximos-territorios" className="mt-20 lg:mt-28">
          <ScrollReveal>
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-8">
                <h3 className="t-home-display-subsection text-vibio-text text-balance">
                  Próximos Vibio
                </h3>
                <span
                  className="t-home-badge-status vibio-badge-radius inline-flex w-fit items-center justify-center gap-2 border bg-vibio-white px-3 py-1.5"
                  style={{ borderColor: '#5F513466', color: '#5F5134' }}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F38163]" aria-hidden />
                  EN ESTUDIO
                </span>
              </div>
              <p className="t-home-body-md-relaxed mt-4 text-vibio-text/68">
                Actualmente estamos evaluando cuatro nuevos territorios. Si estás interesado en formar parte del proceso de diseño o conoces un territorio que encaja con el modelo Vibio, podemos hablar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/proyectos"
                  className="t-home-button vibio-button-motion group vibio-action-radius inline-flex items-center justify-between gap-4 border border-[#D9D9D9] bg-[#D9D9D9] px-6 py-3 text-vibio-text transition-all hover:bg-[#cfcfcf]"
                >
                  <span>CONOCER TODAS LAS COMUNIDADES</span>
                  <RowArrow className="h-[10px] w-[13px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:h-3 sm:w-[15px]" />
                </Link>
                <Link
                  href="/contacto"
                  className="t-home-button vibio-button-motion vibio-action-radius inline-flex items-center justify-center border border-vibio-text/20 bg-transparent px-6 py-3 text-vibio-text transition-all hover:border-vibio-text/35 hover:bg-vibio-text/[0.04]"
                >
                  PROPONER TERRITORIO
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
