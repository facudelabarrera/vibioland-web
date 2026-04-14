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
      <section className="bg-vibio-white pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center">
              <h1 className="font-heading text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.08] text-vibio-text text-balance">
                El primer paso es una conversación.
              </h1>
              <p className="mt-6 max-w-md text-lg font-light leading-[1.7] text-vibio-text/60">
                <span className="font-semibold text-vibio-text">vibio</span> no es
                para todo el mundo, y eso es una ventaja. Si llegaste hasta aquí, probablemente tiene sentido hablar.
              </p>
              <p className="mt-8 text-sm text-vibio-text/45">
                Sin spam. Sin automatizaciones. Te responde una persona.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
