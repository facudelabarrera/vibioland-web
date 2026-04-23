import Image from 'next/image'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { JoinInterestForm } from '@/components/interest-forms'
import { DEFAULT_IMAGE_BLUR_DATA_URL } from '@/lib/image-placeholder'

export const metadata = {
  title: 'Vivir en vibio — vibio.land',
  description:
    'Una landing para entender encaje, proceso y condiciones reales antes de dar el paso hacia vivir en vibio.',
}

const reasons = [
  {
    title: 'Privacidad real',
    description:
      'Tu casa es tuya. La comunidad existe para sostener mejor la vida cotidiana, no para invadirla.',
  },
  {
    title: 'Infraestructura para vivir y trabajar',
    description:
      'Arquitectura, conectividad y servicios pensados para una vida contemporánea en entorno rural.',
  },
  {
    title: 'Comunidad con criterio',
    description:
      'No se trata de juntar gente al azar. Se trata de construir compatibilidad, reglas claras y confianza.',
  },
]

const steps = [
  'Nos contás tu momento, tu formato de vivienda ideal y qué tipo de comunidad estás buscando.',
  'Te orientamos sobre el territorio o proyecto con más sentido para vos hoy.',
  'Si hay encaje, avanzamos a una conversación más concreta con el equipo.',
]

const profiles = [
  'Personas o parejas que quieren salir de la ciudad sin perder comodidad ni calidad de vida.',
  'Familias que buscan red, entorno y espacio para criar distinto.',
  'Profesionales en remoto que necesitan naturaleza sin desconectarse del mundo.',
]

export default function VivirEnVibioPage() {
  return (
    <main className="min-h-screen bg-vibio-white">
      <Navigation />
      <section data-nav-surface="light" className="bg-vibio-white pt-32 pb-20 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.8fr)] lg:items-end lg:gap-16">
            <div>
              <span className="text-[12px] font-medium tracking-[0em] text-vibio-text/45 uppercase">
                Vivir en vibio
              </span>
              <h1 className="mt-4 font-heading max-w-4xl text-[clamp(2.35rem,5vw,4.2rem)] font-semibold leading-[1.03] text-vibio-text text-balance">
                No se trata de irse al campo. Se trata de encontrar un modo de vida que sí te encaje.
              </h1>
              <p className="mt-6 max-w-2xl text-base font-light leading-[1.8] text-vibio-text/68 lg:text-lg">
                Vibio está pensado para personas que quieren vivir fuera de la ciudad con más espacio, más naturaleza y más sentido, sin resignar privacidad ni estructura.
              </p>
            </div>

            <div className="vibio-surface-radius border border-vibio-border/20 bg-vibio-surface p-6 lg:p-8">
              <p className="text-[12px] font-medium tracking-[0em] text-vibio-text/45 uppercase">
                Lo primero que miramos
              </p>
              <ul className="mt-5 space-y-4 border-t border-vibio-text/10 pt-5">
                <li className="flex gap-3 text-[15px] font-light leading-[1.7] text-vibio-text/68">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vibio-brand-yellow" aria-hidden />
                  <span>Con quién te imaginás dando el paso y en qué momento de vida estás.</span>
                </li>
                <li className="flex gap-3 text-[15px] font-light leading-[1.7] text-vibio-text/68">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vibio-brand-yellow" aria-hidden />
                  <span>Qué proyecto, territorio o formato de vivienda te interesa explorar.</span>
                </li>
                <li className="flex gap-3 text-[15px] font-light leading-[1.7] text-vibio-text/68">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vibio-brand-yellow" aria-hidden />
                  <span>Cómo encajan tu trabajo, tu ritmo y tu expectativa de comunidad.</span>
                </li>
              </ul>
              <p className="mt-6 text-sm text-vibio-text/45">
                Sin spam. Sin automatizaciones. Responde una persona del equipo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-vibio-surface-2 py-20 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {reasons.map((reason) => (
              <article key={reason.title} className="vibio-surface-radius border border-vibio-border/18 bg-vibio-white p-6 lg:p-7">
                <h2 className="font-heading text-[1.7rem] font-medium leading-[1.08] text-vibio-text">
                  {reason.title}
                </h2>
                <p className="mt-4 text-[15px] font-light leading-[1.8] text-vibio-text/70">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vibio-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
          <div>
            <span className="text-[12px] font-medium tracking-[0em] text-vibio-text/45 uppercase">
              Cómo avanzamos
            </span>
            <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-vibio-text text-balance">
              Primero entendemos tu encaje. Después hablamos de proyecto.
            </h2>
            <div className="mt-8 divide-y divide-vibio-text/10 border-y border-vibio-text/10">
              {steps.map((step, index) => (
                <div key={step} className="grid gap-4 py-6 lg:grid-cols-[56px_minmax(0,1fr)] lg:gap-6">
                  <span className="font-heading text-4xl font-semibold leading-none text-vibio-brand-yellow/65">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] font-light leading-[1.8] text-vibio-text/72">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="vibio-surface-radius-lg relative isolate overflow-hidden bg-vibio-brand-green min-h-[340px]">
            <Image
              src="/VIBIO 4.0 - GENERAL (1).jpg"
              alt="Espacio compartido en vibio"
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={DEFAULT_IMAGE_BLUR_DATA_URL}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-vibio-casi-negro/45" />
            <div className="relative z-10 flex h-full flex-col justify-end p-6 lg:p-8">
              <p className="text-[12px] font-medium tracking-[0em] text-vibio-brand-yellow/78 uppercase">
                Para quién suele encajar
              </p>
              <ul className="mt-5 space-y-4">
                {profiles.map((profile) => (
                  <li key={profile} className="flex gap-3 text-[15px] font-light leading-[1.7] text-white/82">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vibio-brand-yellow" aria-hidden />
                    <span>{profile}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-vibio-white pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="text-[12px] font-medium tracking-[0em] text-vibio-text/45 uppercase">
              Contanos tu caso
            </span>
            <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] text-vibio-text text-balance">
              Si esto podría ser para vos, el siguiente paso es simple.
            </h2>
            <p className="mt-6 max-w-xl text-base font-light leading-[1.8] text-vibio-text/68">
              Este formulario nos ayuda a responder con contexto real: dónde estás, qué buscás y qué territorio tendría más sentido explorar primero.
            </p>
          </div>

          <JoinInterestForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
