import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  STATUS_LABELS,
  projectsListQuery,
  type ProjectListItem,
} from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'Proyectos — vibio.land',
  description:
    'Comunidades rurales regenerativas en marcha: viviendas ecológicas, biodiversidad y nuevos vecinos.',
}

export const revalidate = 60

export default async function ProyectosPage() {
  const projects = await client.fetch<ProjectListItem[]>(projectsListQuery)

  return (
    <main className="min-h-screen bg-vibio-white">
      <Navigation />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.15] text-vibio-text text-balance">
              Donde la regeneración toma forma
            </h1>
          </div>

          {projects.length === 0 ? (
            <p className="mt-14 text-sm font-light text-vibio-text/60">
              Todavía no hay proyectos publicados. Volvé pronto.
            </p>
          ) : (
            <ul className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project._id}>
                  <Link
                    href={`/proyectos/${project.slug}`}
                    className="group relative block aspect-square overflow-hidden lg:aspect-[4/5]"
                  >
                    {project.coverImage?.asset ? (
                      <Image
                        src={urlFor(project.coverImage).width(900).height(1100).url()}
                        alt={project.coverImage.alt ?? project.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-vibio-surface-2" />
                    )}

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vibio-surface-2/95 to-vibio-surface/10 p-6">
                      {project.status && (
                        <span className="inline-block bg-vibio-accent-sky/40 px-3 py-1 text-xs font-medium text-vibio-text">
                          {STATUS_LABELS[project.status]}
                        </span>
                      )}
                      <h2 className="font-heading mt-4 text-2xl font-bold text-vibio-text lg:text-3xl">
                        {project.name}
                      </h2>
                      {project.location?.town && (
                        <p className="mt-1 text-sm font-light text-vibio-text/72">
                          {[project.location.town, project.location.province]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      )}
                      {project.tagline && (
                        <p className="mt-3 text-sm font-light leading-[1.6] text-vibio-text/78">
                          {project.tagline}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
