import { TextAnimate } from '@/components/ui/text-animate'
import { PILAR_ICONS } from '@/components/pilares-icons'
import { cn } from '@/lib/utils'

export type PilarEditorial = {
  number: string
  title: string
  description: string
}

type PilaresEditorialSectionProps = {
  pilares: PilarEditorial[]
}

/**
 * Dos columnas: intro editorial sticky a la izquierda y pilares apilados
 * con sticky-stacking nativo CSS a la derecha. Cada pilar se pinea y el
 * siguiente se apila encima; al terminar el último se libera el scroll.
 */
export function PilaresEditorialSection({ pilares }: PilaresEditorialSectionProps) {
  return (
    <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-x-16 xl:gap-x-24">
      <header className="max-w-md self-start lg:sticky lg:top-28 lg:max-w-none">
        <TextAnimate
          as="h2"
          animation="slideUp"
          by="word"
          once
          className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.06] text-vibio-text"
        >
          10 pilares
        </TextAnimate>
        <p className="mt-7 text-base font-light leading-[1.8] text-vibio-text/62 lg:mt-8 lg:text-[17px] lg:leading-[1.75]">
          Estos pilares estructuran el modelo integral de vibio y definen cómo se
          diseñan comunidades rurales viables, sostenibles y cohesionadas.
        </p>
      </header>

      <ol className="relative list-none lg:pb-[40vh]" role="list">
        {pilares.map((pilar, i) => {
          const Icon = PILAR_ICONS[i] ?? PILAR_ICONS[0]
          return (
            <li
              key={pilar.number}
              className={cn(
                'bg-vibio-white lg:sticky lg:top-28',
                i > 0 && 'mt-10 lg:mt-[60vh]',
              )}
            >
              <article className="border-t border-vibio-text/[0.12] py-10 lg:py-14">
                <div className="flex items-start gap-5 sm:gap-6 lg:gap-8">
                  <Icon
                    className="h-12 w-12 shrink-0 text-vibio-accent-green sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-[clamp(1.4rem,2.6vw,2.5rem)] font-medium leading-[1.08] text-vibio-text">
                      {pilar.title}
                    </h3>
                    <p className="mt-4 max-w-prose text-[15px] font-light leading-[1.7] text-vibio-text/68 lg:mt-5 lg:text-base lg:leading-[1.75]">
                      {pilar.description}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
