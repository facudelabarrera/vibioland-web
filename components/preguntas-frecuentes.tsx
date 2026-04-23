'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/animate-ui/components/radix/accordion'
import { ScrollReveal } from '@/components/scroll-reveal'

const faqs = [
  {
    q: '¿Qué es vibio exactamente?',
    a: 'vibio es un modelo integral de regeneración rural: combina arquitectura sostenible, gobernanza participativa y un proceso probado para crear comunidades que funcionan en zonas rurales de España.',
  },
  {
    q: '¿Cómo se financia una comunidad vibio?',
    a: 'Cada proyecto se estructura de forma mixta: aportes de las familias que se suman, financiación ética y, cuando corresponde, colaboración con administraciones locales. Transparente desde el primer día.',
  },
  {
    q: '¿Tengo que dejar mi trabajo para vivir en vibio?',
    a: 'No. Diseñamos las comunidades para compatibilizar trabajo remoto, proyectos locales y economía real del territorio. Vivir en el campo no implica desconectarse del mundo.',
  },
  {
    q: '¿En qué zonas de España están trabajando?',
    a: 'Priorizamos territorios con despoblación real pero con masa crítica para sostener servicios básicos. Podés ver los proyectos activos en la sección "Proyectos".',
  },
  {
    q: '¿Cómo me sumo a una comunidad?',
    a: 'Empezá por conocer el modelo y escribirnos. El proceso de entrada es progresivo: conversaciones, visitas y decisión conjunta. No vendemos casas, construimos vecinos.',
  },
]

export function PreguntasFrecuentes() {
  return (
    <section id="faq" data-nav-surface="light" className="bg-vibio-marfil py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-20 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:gap-48">
          <ScrollReveal>
            <h2 className="font-heading whitespace-nowrap text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.15] text-vibio-text">
              Preguntas frecuentes
            </h2>
            <p className="mt-4 max-w-[380px] text-base font-light leading-[1.8] text-vibio-text/60 lg:text-lg">
              Lo que más nos preguntan sobre el modelo, la vida en comunidad y cómo dar el primer paso.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Accordion
              type="single"
              collapsible
              className="w-full border-t border-vibio-text/15"
            >
              {faqs.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-vibio-text/15"
                >
                  <AccordionTrigger className="font-heading py-5 text-left text-base font-medium text-vibio-text hover:no-underline lg:text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-base font-light leading-[1.8] text-vibio-text/70">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
