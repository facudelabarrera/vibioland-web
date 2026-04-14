import { TextAnimate } from "@/components/ui/text-animate"
import { ScrollReveal, StaggerReveal } from "@/components/scroll-reveal"

const pilares = [
  {
    number: "01",
    title: "Viviendas ecológicas",
    description: "Construcción bioclimática con materiales locales y consumo energético casi nulo.",
  },
  {
    number: "02",
    title: "Biodiversidad",
    description: "Restauración activa del ecosistema: bosques comestibles, corredores verdes, agua.",
  },
  {
    number: "03",
    title: "Nuevos vecinos",
    description: "Proceso de selección cuidadoso para crear comunidades cohesionadas y diversas.",
  },
  {
    number: "04",
    title: "Cultura colaborativa",
    description: "Espacios y rituales compartidos que fortalecen el tejido social del pueblo.",
  },
  {
    number: "05",
    title: "Comunidades energéticas",
    description: "Producción y gestión colectiva de energía renovable a escala local.",
  },
  {
    number: "06",
    title: "Gestión del agua",
    description: "Captación, almacenamiento y reutilización inteligente de recursos hídricos.",
  },
  {
    number: "07",
    title: "Empleo local",
    description: "Desarrollo de economía real: artesanía, agricultura, servicios y teletrabajo.",
  },
  {
    number: "08",
    title: "Vivienda asequible",
    description: "Modelos de propiedad y alquiler que mantienen la accesibilidad a largo plazo.",
  },
  {
    number: "09",
    title: "Adaptación climática",
    description: "Diseño resiliente preparado para los escenarios climáticos que vienen.",
  },
  {
    number: "10",
    title: "Sociocracia",
    description: "Gobernanza por consentimiento: decisiones efectivas sin jerarquías rígidas.",
  },
]

export function ElModelo() {
  return (
    <section id="modelo" className="bg-vibio-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <TextAnimate
                as="h2"
                animation="slideUp"
                by="word"
                once
                className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium leading-[1.2] text-vibio-text"
              >
                10 pilares
              </TextAnimate>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-vibio-text underline underline-offset-4 decoration-vibio-text/30 hover:decoration-vibio-text transition-colors"
            >
              Descubrir el modelo completo
            </a>
          </div>
        </ScrollReveal>

        <div className="mt-8 h-px w-full bg-vibio-border/90" />

        <StaggerReveal
          className="grid grid-cols-1 sm:grid-cols-2 sm:grid-flow-col sm:grid-rows-5 sm:gap-x-10 lg:gap-x-16"
          stagger={0.06}
        >
          {pilares.map((pilar) => (
            <article
              key={pilar.number}
              className="group flex items-start gap-5 border-t border-vibio-border/90 py-6 transition-colors first:border-t-0 hover:bg-vibio-surface/70 sm:items-center sm:gap-6 sm:py-7 sm:[&:nth-child(6)]:border-t-0"
            >
              <span className="w-8 shrink-0 pt-0.5 text-sm font-normal tabular-nums text-vibio-text/45 sm:w-10 sm:pt-0">
                {pilar.number}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-base font-medium text-vibio-text sm:text-lg">
                  {pilar.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-vibio-text/68">
                  {pilar.description}
                </p>
              </div>
            </article>
          ))}
        </StaggerReveal>
      </div>
    </section>
  )
}
