import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { DEFAULT_IMAGE_BLUR_DATA_URL } from '@/lib/image-placeholder'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  STATUS_LABELS,
  projectBySlugQuery,
  projectSlugsQuery,
  type ProjectDetail,
} from '@/sanity/queries'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch<ProjectDetail | null>(projectBySlugQuery, { slug })
  if (!project) return { title: 'Proyecto no encontrado — vibio.land' }
  return {
    title: `${project.name} — vibio.land`,
    description: project.tagline ?? project.description,
  }
}

export default async function ProyectoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await client.fetch<ProjectDetail | null>(projectBySlugQuery, { slug })

  if (!project) notFound()

  return (
    <main className="min-h-screen bg-vibio-white">
      <Navigation />

      <article className="pb-24">
        <header
          data-nav-surface="dark"
          className="relative h-[60vh] min-h-[420px] overflow-hidden"
        >
          {project.coverImage?.asset ? (
            <Image
              src={urlFor(project.coverImage).width(2200).height(1320).fit('crop').auto('format').quality(78).url()}
              alt={project.coverImage.alt ?? project.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={DEFAULT_IMAGE_BLUR_DATA_URL}
            />
          ) : (
            <div className="absolute inset-0 bg-vibio-surface-2" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-[50%] bg-vibio-surface-2/92" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12 lg:px-8 lg:pb-16">
            {project.status && (
              <span className="vibio-badge-radius inline-block w-fit bg-vibio-accent-yellow/45 px-3 py-1 text-xs font-medium text-vibio-text">
                {STATUS_LABELS[project.status]}
              </span>
            )}
            <h1 className="font-heading mt-4 text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] text-vibio-text text-balance">
              {project.name}
            </h1>
            {project.location?.town && (
              <p className="mt-3 text-base font-light text-vibio-text/75">
                {[project.location.town, project.location.province, project.location.region]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
          </div>
        </header>

        <div
          data-nav-surface="light"
          className="mx-auto mt-16 grid max-w-7xl gap-16 px-6 lg:mt-24 lg:grid-cols-3 lg:px-8"
        >
          <div className="lg:col-span-2">
            {project.tagline && (
              <p className="text-[clamp(1.25rem,2vw,1.75rem)] font-light leading-[1.4] tracking-[0em] text-vibio-text text-balance uppercase">
                {project.tagline}
              </p>
            )}
            {project.description && (
              <p className="mt-8 text-base font-light leading-[1.8] text-vibio-text/80">
                {project.description}
              </p>
            )}
          </div>

          {project.stats && (
            <aside className="vibio-surface-radius flex flex-col gap-6 border border-vibio-border bg-vibio-surface p-8 text-vibio-text">
              {project.stats.viviendas != null && (
                <Stat label="Viviendas" value={project.stats.viviendas} />
              )}
              {project.stats.hectareas != null && (
                <Stat label="Hectáreas" value={project.stats.hectareas} />
              )}
              {project.stats.familias != null && (
                <Stat label="Familias" value={project.stats.familias} />
              )}
            </aside>
          )}
        </div>

        {project.pillars && project.pillars.length > 0 && (
          <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold text-vibio-text">
              Pilares del decálogo en este proyecto
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.pillars.map((pilar) => (
                <li
                  key={pilar._id}
                  className="vibio-surface-radius border border-vibio-text/10 bg-vibio-surface p-6"
                >
                  <span className="text-xs font-medium tracking-[0.02em] text-vibio-text/40">
                    {String(pilar.number).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading mt-3 text-lg font-semibold text-vibio-text">
                    {pilar.title}
                  </h3>
                  {pilar.shortDescription && (
                    <p className="mt-3 text-sm font-light leading-[1.7] text-vibio-text/70">
                      {pilar.shortDescription}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold text-vibio-text">
              Galería
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, idx) =>
                image.asset ? (
                  <div
                    key={idx}
                    className="vibio-surface-radius relative aspect-[4/5] overflow-hidden"
                  >
                    <Image
                      src={urlFor(image).width(800).height(1000).fit('crop').auto('format').quality(76).url()}
                      alt={image.alt ?? `${project.name} — imagen ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : null,
              )}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-heading text-4xl font-semibold">
        {value.toLocaleString('es-ES')}
      </div>
      <div className="mt-1 text-sm font-light text-vibio-text/62">{label}</div>
    </div>
  )
}
