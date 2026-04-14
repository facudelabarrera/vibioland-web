import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { client } from '@/sanity/lib/client'
import { pilaresQuery, type Pilar } from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'Decálogo — vibio.land',
  description:
    'Los 10 pilares que guían cada proyecto vibio: viviendas ecológicas, biodiversidad, nuevos vecinos, cultura colaborativa, energía, agua, empleo, vivienda asequible, clima y sociocracia.',
}

export const revalidate = 60

export default async function DecalogoPage() {
  const pilares = await client.fetch<Pilar[]>(pilaresQuery)

  return (
    <main className="min-h-screen bg-vibio-white">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.15] text-vibio-text text-balance">
              Los 10 pilares que sostienen cada proyecto vibio
            </h1>
            <p className="mt-6 text-base font-light leading-[1.7] text-vibio-text/70">
              No es una lista de buenas intenciones. Es el marco que usamos
              para decidir qué construir, con quién y cómo.
            </p>
          </div>

          {pilares.length === 0 ? (
            <p className="mt-14 text-sm font-light text-vibio-text/60">
              Todavía no hay pilares publicados.
            </p>
          ) : (
            <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {pilares.map((pilar) => (
                <li
                  key={pilar._id}
                  className="flex flex-col border border-vibio-text/10 bg-vibio-surface p-8 transition-colors hover:border-vibio-accent-sky/70"
                >
                  <span className="font-heading text-5xl font-semibold text-vibio-gold">
                    {String(pilar.number).padStart(2, '0')}
                  </span>
                  <h2 className="font-heading mt-6 text-xl font-semibold leading-[1.3] text-vibio-text">
                    {pilar.title}
                  </h2>
                  {pilar.shortDescription && (
                    <p className="mt-4 text-sm font-light leading-[1.7] text-vibio-text/70">
                      {pilar.shortDescription}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
