import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { DEFAULT_IMAGE_BLUR_DATA_URL } from '@/lib/image-placeholder'

export const metadata: Metadata = {
  title: 'Territorios — vibio.land',
  description:
    'Berlanga, Higuera y próximos territorios en estudio. Cada vibio nace de su lugar, su comunidad y su paisaje.',
}

const projects = [
  {
    name: 'vibio.berlanga',
    accent: 'berlanga',
    status: 'En construcción',
    location: 'Berlanga de Duero, Soria',
    description:
      'Entre encinas y viñedos, a los pies del Castillo de Berlanga. Historia cerca. Horizonte abierto. 28 viviendas de autor con gobernanza diseñada y comunidad transgeneracional.',
    tags: ['28 viviendas', '70–120 m²', '2h Madrid', '30 min Soria'],
    progress: '65% reservadas — quedan 10 unidades disponibles',
    progressValue: '65%',
    image: '/images/hero-landscape.jpg',
    imageAlt: 'Paisaje del territorio vibio.berlanga',
    reverse: false,
  },
  {
    name: 'vibio.higuera',
    accent: 'higuera',
    status: 'Próximamente',
    location: 'Sierra Oeste, Madrid',
    description:
      'En la Sierra Oeste madrileña, entre encinas y robles. A una hora de Madrid. 32 viviendas en construcción sostenible, con arquitectura de autor y comunidad diseñada desde cero.',
    tags: ['32 viviendas', '1h Madrid', 'Pre-registro'],
    progress: 'Pre-registro abierto',
    progressValue: '18%',
    image: '/images/proyecto-higuera.jpg',
    imageAlt: 'Territorio proyectado para vibio.higuera',
    reverse: true,
  },
]

const upcomingTerritories = [
  {
    name: 'vibio.aragón',
    description:
      'Cuenca del río. En evaluación de viabilidad territorial. Estimado Q3 2026.',
  },
  {
    name: 'vibio.extremadura',
    description:
      'Dehesa. En evaluación de viabilidad territorial. Estimado Q4 2026.',
  },
]

export default function ProyectosPage() {
  return (
    <main className="min-h-screen bg-vibio-white">
      <Navigation />

      <section data-nav-surface="light" className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-[12px] font-medium text-vibio-text/45">
            Proyectos
          </span>
          <h1 className="mt-4 font-heading max-w-4xl text-[clamp(2.4rem,5vw,4.3rem)] font-semibold leading-[1.03] text-vibio-text text-balance">
            Cada territorio es único. Cada vibio nace de su lugar.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-[1.8] text-vibio-text/68 lg:text-lg">
            No hay copia y pega. Cada comunidad responde a su paisaje, su historia y su gente.
          </p>
        </div>
      </section>

      <section className="space-y-0.5 pb-20 lg:pb-24">
        {projects.map((project) => (
          <article
            key={project.name}
            id={project.name.replace('.', '-')}
            className="grid min-h-[540px] bg-vibio-surface lg:grid-cols-2"
          >
            <div className={project.reverse ? 'order-2 lg:order-1' : ''}>
              <div className="relative h-[320px] sm:h-[420px] lg:h-full">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={DEFAULT_IMAGE_BLUR_DATA_URL}
                  className="object-cover"
                />
              </div>
            </div>

            <div className={project.reverse ? 'order-1 lg:order-2' : ''}>
              <div className="flex h-full flex-col justify-center px-6 py-10 lg:px-12 lg:py-14">
                <span className={`inline-flex w-fit px-3 py-1 text-[12px] font-medium ${project.status === 'En construcción' ? 'bg-vibio-brand-yellow text-vibio-dark' : 'border border-vibio-border/40 text-vibio-text/68'}`}>
                  {project.status}
                </span>
                <h2 className="mt-5 font-heading text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.02] text-vibio-text">
                  {project.name.split('.')[0]}.<span className="italic">{project.accent}</span>
                </h2>
                <p className="mt-3 text-sm font-light tracking-[0.02em] text-vibio-text/55">
                  {project.location}
                </p>
                <p className="mt-5 max-w-xl text-[15px] font-light leading-[1.8] text-vibio-text/72 lg:text-base">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-vibio-border/25 px-3 py-1 text-[12px] font-medium text-vibio-text/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7">
                  <div className="h-[2px] w-full bg-vibio-text/12">
                    <div
                      className="h-full bg-vibio-brand-yellow"
                      style={{ width: project.progressValue }}
                    />
                  </div>
                  <p className="mt-2 text-sm font-light text-vibio-text/55">{project.progress}</p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contacto"
                    className="inline-flex items-center justify-center border border-transparent bg-vibio-brand-yellow px-5 py-3 text-sm font-medium text-vibio-dark transition-colors hover:bg-[#d1ba5f]"
                  >
                    {project.name === 'vibio.berlanga' ? 'Ver viviendas disponibles' : 'Apuntarme'}
                  </Link>
                  <Link
                    href="/vivir-en-vibio"
                    className="inline-flex items-center justify-center border border-vibio-border/35 px-5 py-3 text-sm font-medium text-vibio-text transition-colors hover:border-vibio-text/55 hover:bg-vibio-text/[0.04]"
                  >
                    {project.name === 'vibio.berlanga' ? 'Descargar dossier' : 'Saber más'}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section id="proximos-territorios" className="bg-vibio-surface-2 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="text-[12px] font-medium text-vibio-text/45">
            En estudio — próximos territorios
          </span>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {upcomingTerritories.map((territory) => (
              <article
                key={territory.name}
                className="border border-vibio-border/18 bg-vibio-white p-6 opacity-80 lg:p-7"
              >
                <span className="inline-flex border border-vibio-border/30 px-3 py-1 text-[12px] font-medium text-vibio-text/58">
                  En estudio
                </span>
                <h3 className="font-heading mt-5 text-[1.8rem] font-medium leading-[1.05] text-vibio-text">
                  {territory.name.split('.')[0]}.<span className="italic">{territory.name.split('.')[1]}</span>
                </h3>
                <p className="mt-4 text-[15px] font-light leading-[1.75] text-vibio-text/68">
                  {territory.description}
                </p>
              </article>
            ))}

            <Link
              href="/contacto"
              className="group flex min-h-[240px] flex-col items-center justify-center border border-dashed border-vibio-border/35 px-8 py-10 text-center transition-colors hover:bg-vibio-white/70"
            >
              <span className="font-heading text-5xl leading-none text-vibio-brand-yellow transition-transform group-hover:scale-105">
                +
              </span>
              <h3 className="font-heading mt-4 text-[1.6rem] font-medium leading-[1.08] text-vibio-text">
                ¿Tu territorio podría ser el próximo?
              </h3>
              <p className="mt-3 max-w-sm text-[15px] font-light leading-[1.75] text-vibio-text/68">
                Si tenés tierra, conocés un lugar o querés proponer un territorio, hablemos.
              </p>
              <span className="mt-6 text-sm font-medium text-vibio-text">
                Proponer territorio
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
