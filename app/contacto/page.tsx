import type { ReactNode } from 'react'

import { Navigation } from '@/components/navigation'
import { ContactForm } from '@/components/contact-form'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Contacto — vibio.land',
  description: 'Empezá la conversación con vibio. El primer paso hacia una vida con más sentido.',
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section data-nav-surface="light" className="bg-vibio-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="vibio-surface-radius-lg overflow-hidden border border-vibio-border/18 lg:grid lg:grid-cols-2">
            <div className="bg-vibio-white px-6 py-10 lg:px-10 lg:py-12">
              <span className="text-[12px] font-medium tracking-[0em] text-vibio-text/45 uppercase">
                Contacto
              </span>
              <h1 className="mt-4 font-heading text-[clamp(2.2rem,4.5vw,3.4rem)] font-semibold leading-[1.04] text-vibio-text text-balance">
                Hablamos.
              </h1>
              <p className="mt-5 max-w-lg text-base font-light leading-[1.8] text-vibio-text/68">
                Sin formularios automáticos. Sin bots. Respondemos todas las consultas en menos de 48 horas, de persona a persona.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <aside className="bg-vibio-surface-2 px-6 py-10 lg:px-10 lg:py-12">
              <span className="text-[12px] font-medium tracking-[0em] text-vibio-text/45 uppercase">
                O encontranos aquí
              </span>

              <div className="mt-8 space-y-8">
                <InfoBlock title="Email directo">
                  hola@vibio.land
                </InfoBlock>

                <Divider />

                <InfoBlock title="Visitas a proyectos">
                  Sábados de 10 a 14h en vibio.berlanga. Residentes como guías. Reservá tu plaza por email.
                </InfoBlock>

                <Divider />

                <div>
                  <h2 className="font-heading text-[1.6rem] font-medium leading-[1.08] text-vibio-text">
                    Newsletter
                  </h2>
                  <p className="mt-3 max-w-md text-[15px] font-light leading-[1.75] text-vibio-text/68">
                    Actualizaciones reales sobre los proyectos. Sin spam ni lifestyle vacío.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="vibio-input-radius w-full border border-vibio-border/55 bg-vibio-white px-4 py-3 text-[15px] text-vibio-text placeholder:text-vibio-text/42 focus:border-vibio-accent-sky focus:outline-none"
                    />
                    <button
                      type="button"
                      className="vibio-action-radius inline-flex shrink-0 items-center justify-center border border-transparent bg-vibio-brand-yellow px-5 py-3 text-sm font-medium text-vibio-dark transition-colors hover:bg-[#d1ba5f]"
                    >
                      Suscribir
                    </button>
                  </div>
                </div>

                <Divider />

                <div>
                  <h2 className="font-heading text-[1.6rem] font-medium leading-[1.08] text-vibio-text">
                    Redes
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {['Instagram', 'LinkedIn', 'YouTube'].map((network) => (
                      <button
                        key={network}
                        type="button"
                        className="vibio-action-radius border border-vibio-border/35 px-4 py-2 text-xs font-medium text-vibio-text/72 transition-colors hover:border-vibio-text/55 hover:text-vibio-text"
                      >
                        {network}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

function InfoBlock({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <h2 className="font-heading text-[1.6rem] font-medium leading-[1.08] text-vibio-text">
        {title}
      </h2>
      <p className="mt-3 max-w-md text-[15px] font-light leading-[1.75] text-vibio-text/68">
        {children}
      </p>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-vibio-text/10" />
}
