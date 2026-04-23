import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { InvestorInterestForm } from '@/components/interest-forms'

export const metadata = {
  title: 'Invertir en vibio — vibio.land',
  description:
    'Compartí tu perfil inversor, rango y tesis para abrir una conversación alineada con el crecimiento de vibio.',
}

const highlights = [
  'Tipo de vehículo, rango de inversión y horizonte esperado.',
  'Interés por retorno, impacto territorial y escalabilidad.',
  'Nivel de involucramiento deseado y clase de oportunidad que buscás.',
]

export default function InvertirEnVibioPage() {
  return (
    <main className="min-h-screen bg-vibio-white">
      <Navigation />
      <section data-nav-surface="light" className="bg-vibio-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full bg-[#C7D8E6] px-4 py-1.5 text-[12px] font-medium tracking-[0em] text-vibio-text/65 uppercase">
              Invertir en vibio
            </span>
            <h1 className="mt-4 font-heading text-[clamp(2.25rem,5vw,3.6rem)] font-semibold leading-[1.08] text-vibio-text text-balance">
              El capital correcto también construye comunidad.
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-[1.75] text-vibio-text/62">
              Este formulario nos permite entender si hay encaje entre tu tesis de inversión y el tipo de crecimiento que vibio quiere habilitar.
            </p>

            <ul className="mt-8 space-y-4 border-t border-vibio-text/10 pt-6">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-[15px] font-light leading-[1.7] text-vibio-text/68">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-vibio-brand-yellow" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-vibio-text/45">
              Buscamos conversaciones precisas, con contexto y expectativas claras desde el inicio.
            </p>
          </div>

          <InvestorInterestForm />
        </div>
      </section>
      <Footer showInvestorCta={false} />
    </main>
  )
}
