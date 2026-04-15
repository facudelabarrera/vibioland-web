import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { ProyectosPremiumList } from '@/components/proyectos-premium-list'
import { client } from '@/sanity/lib/client'
import { projectsListQuery, type ProjectListItem } from '@/sanity/queries'

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

      <section data-nav-surface="light" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] text-vibio-text text-balance">
              Donde la regeneración toma forma
            </h1>
          </div>

          <ProyectosPremiumList projects={projects} className="mt-16 lg:mt-24" />
        </div>
      </section>

      <Footer />
    </main>
  )
}
