import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { DEFAULT_IMAGE_BLUR_DATA_URL } from '@/lib/image-placeholder'

export const metadata: Metadata = {
  title: 'Cómo funciona — vibio.land',
  description:
    'Arquitectura, gobernanza y comunidad real para diseñar una vida en común que sí funciona en entornos rurales.',
}

const steps = [
  {
    number: '01',
    title: 'Selección del territorio',
    description:
      'Vibio identifica territorios rurales con arraigo, acceso y comunidad local existente. No cualquier campo. Lugares con historia y con futuro. El territorio manda: cada proyecto es una exploración nueva.',
  },
  {
    number: '02',
    title: 'Diseño arquitectónico con autor',
    description:
      'Cada Vibio encarga a un arquitecto de reconocido prestigio el diseño de las viviendas y los espacios comunes. Arquitectura contemporánea que dialoga con el lugar, no que lo borra.',
  },
  {
    number: '03',
    title: 'Construcción de la comunidad',
    description:
      'Antes de que haya una obra, ya hay una comunidad. El proceso de selección de habitantes es parte del diseño. Se construye el grupo antes que las casas.',
  },
  {
    number: '04',
    title: 'Modelo de gobernanza diseñado',
    description:
      'Reglas claras, asambleas, comisiones y herramientas digitales. No es autogestión total ni imposición vertical. Es un sistema funcional que Vibio diseña y acompaña.',
  },
  {
    number: '05',
    title: 'Integración territorial',
    description:
      '40% del consumo va al pueblo. Participación en asociaciones locales. Proyectos colaborativos. Vibio no llega a gentrificar, llega a convivir.',
  },
]

const privateHomeItems = [
  'Viviendas entre 70 y 120m² — propiedad plena o alquiler de larga duración.',
  'Diseño de autor, materiales locales y eficiencia energética integrada.',
  'Privacidad real: tu espacio es tuyo, la comunidad es accesible pero nunca obligatoria.',
  'Conectividad fibra óptica garantizada — trabajo remoto sin excusas.',
]

const sharedSpaceItems = [
  'Casa común con cocina, sala, espacio de trabajo y terraza exterior.',
  'Huerto colectivo + espacio de talleres con herramientas compartidas.',
  'Carpool organizado, gestión de turnos digital y gobernanza por app.',
  'Zonas naturales integradas — biodiversidad como parte del diseño.',
]

const profiles = [
  {
    eyebrow: 'Perfil 01',
    title: 'Urbanos 30–55 saturados de ciudad',
    description:
      'Buscan sentido, calma y conexión real. Miedo a perder comodidad, trabajo o red social.',
    quote: 'No es huir. Es elegir distinto.',
  },
  {
    eyebrow: 'Perfil 02',
    title: 'Familias con hijos',
    description:
      'Buscan entorno, comunidad y espacio. Les preocupa la logística, las escuelas y la incertidumbre.',
    quote: 'El cohousing más pensado para la vida real.',
  },
  {
    eyebrow: 'Perfil 03',
    title: 'Seniors activos',
    description:
      'Buscan vida activa, no aislamiento. Temor al cambio y a depender de otros.',
    quote: 'No es un retiro. Es la siguiente etapa.',
  },
  {
    eyebrow: 'Perfil 04',
    title: 'Knowledge workers en remoto',
    description:
      'Quieren flexibilidad, naturaleza y comunidad. Les preocupa la infraestructura y la conectividad.',
    quote: 'Desde aquí se trabaja igual. Y se vive mejor.',
  },
]

export default function ModeloPage() {
  return (
    <main className="min-h-screen bg-vibio-white">
      <Navigation />

      <section data-nav-surface="dark" className="bg-vibio-brand-green pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="inline-flex w-fit rounded-full bg-[#C7D8E6] px-4 py-1.5 text-[12px] font-medium tracking-[0em] text-vibio-text/65 uppercase">
            El modelo vibio
          </span>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <h1 className="font-heading max-w-4xl text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1.03] text-vibio-marfil text-balance">
              La vida en común funciona mejor cuando está bien diseñada.
            </h1>
            <p className="max-w-xl text-base font-light leading-[1.8] text-white/72 lg:justify-self-end lg:text-lg">
              Vibio no propone una idea de vida. Diseña las condiciones para que la vida en común funcione en lo cotidiano. Sin utopías. Con arquitectura, gobernanza y comunidad real.
            </p>
          </div>
        </div>
      </section>

      <section data-nav-surface="light" className="bg-vibio-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex w-fit rounded-full bg-[#C7D8E6] px-4 py-1.5 text-[12px] font-medium tracking-[0em] text-vibio-text/65 uppercase">
              El sistema — cómo funciona
            </span>
          </div>

          <div className="mt-8 divide-y divide-vibio-text/10 border-y border-vibio-text/10">
            {steps.map((step) => (
              <article key={step.number} className="grid gap-4 py-8 lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-8 lg:py-10">
                <span className="font-heading text-5xl font-semibold leading-none text-vibio-brand-yellow/65">
                  {step.number}
                </span>
                <div>
                  <h2 className="font-heading text-[1.45rem] font-medium leading-[1.08] text-vibio-text lg:text-[1.8rem]">
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-[15px] font-light leading-[1.8] text-vibio-text/72 lg:text-base">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vibio-surface-2 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="inline-flex w-fit rounded-full bg-[#C7D8E6] px-4 py-1.5 text-[12px] font-medium tracking-[0em] text-vibio-text/65 uppercase">
            Qué incluye cada vibio
          </span>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ChecklistColumn title="Vivienda privada" items={privateHomeItems} />
            <ChecklistColumn title="Espacios comunes" items={sharedSpaceItems} />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="relative h-[340px] sm:h-[400px] lg:h-[460px]">
          <Image
            src="/Copia de H_Dueñas-8436.jpg"
            alt="Vida en comunidad en vibio"
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={DEFAULT_IMAGE_BLUR_DATA_URL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-vibio-casi-negro/52" />
          <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center justify-center px-6 text-center lg:px-8">
            <p className="font-heading max-w-4xl text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.15] text-white text-balance">
              Vibio no viene a salvar nada ni a enseñar a nadie. Viene a diseñar condiciones para vivir mejor juntos.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-vibio-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex w-fit rounded-full bg-[#C7D8E6] px-4 py-1.5 text-[12px] font-medium tracking-[0em] text-vibio-text/65 uppercase">
              A quién está dirigido
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {profiles.map((profile) => (
              <article key={profile.title} className="vibio-surface-radius border border-vibio-border/20 bg-vibio-surface p-6 lg:p-7">
                <span className="text-[12px] font-medium tracking-[0em] text-vibio-text/42 uppercase">
                  {profile.eyebrow}
                </span>
                <h3 className="font-heading mt-4 text-[1.6rem] font-medium leading-[1.08] text-vibio-text">
                  {profile.title}
                </h3>
                <p className="mt-3 text-[15px] font-light leading-[1.8] text-vibio-text/70">
                  {profile.description}
                </p>
                <p className="mt-5 border-l-2 border-vibio-brand-yellow pl-4 text-[15px] font-light italic leading-[1.7] text-vibio-text">
                  “{profile.quote}”
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-vibio-brand-green py-20 lg:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.06] text-vibio-marfil text-balance">
              Si esto te resuena, el siguiente paso es conversar.
            </h2>
            <p className="mt-4 max-w-2xl text-base font-light leading-[1.8] text-white/70">
              Te contamos en qué punto está cada territorio, cómo es el proceso y si tiene sentido seguir profundizando.
            </p>
          </div>

          <Link
            href="/contacto"
            className="vibio-action-radius inline-flex w-full items-center justify-center border border-transparent bg-vibio-brand-yellow px-6 py-3.5 text-sm font-medium text-vibio-dark transition-colors hover:bg-[#d1ba5f] lg:w-auto"
          >
            HABLA CON EL EQUIPO
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ChecklistColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-heading text-[1.8rem] font-medium leading-[1.08] text-vibio-text">
        {title}
      </h2>
      <div className="mt-6 divide-y divide-vibio-text/8 border-y border-vibio-text/8">
        {items.map((item) => (
          <div key={item} className="flex gap-3 py-4">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-vibio-brand-yellow text-[10px] text-vibio-brand-yellow">
              ✓
            </span>
            <p className="text-[15px] font-light leading-[1.75] text-vibio-text/72">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
