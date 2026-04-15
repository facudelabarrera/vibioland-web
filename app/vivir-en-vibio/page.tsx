import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { JoinInterestForm } from '@/components/interest-forms'

export const metadata = {
  title: 'Vivir en vibio — vibio.land',
  description:
    'Contanos cómo imaginás tu llegada a vibio y qué proyecto o formato de vida te interesa explorar.',
}

const highlights = [
  'Con quién te gustaría vivir y en qué momento estás.',
  'Qué formato de vivienda, proyecto o territorio te interesa.',
  'Cómo encaja tu trabajo, tu ritmo y tu expectativa de comunidad.',
]

export default function VivirEnVibioPage() {
  return (
    <main className="min-h-screen bg-vibio-white">
      <Navigation />
      <section data-nav-surface="light" className="bg-vibio-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-8">
          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-vibio-text/45">
              Vivir en vibio
            </span>
            <h1 className="mt-4 font-heading text-[clamp(2.25rem,5vw,3.6rem)] font-semibold leading-[1.08] text-vibio-text text-balance">
              El primer filtro no es financiero. Es de encaje humano.
            </h1>
            <p className="mt-6 max-w-xl text-lg font-light leading-[1.75] text-vibio-text/62">
              Este formulario nos ayuda a entender tu momento, tus preferencias y qué tipo de comunidad tendría sentido para vos.
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
              Sin spam. Sin automatizaciones. Responde una persona del equipo.
            </p>
          </div>

          <JoinInterestForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
