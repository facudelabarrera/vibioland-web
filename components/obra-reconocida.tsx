const recognitionSlots = [
  {
    title: 'Sede de Greenpeace',
    award: 'Green Solutions Awards',
    year: '2019',
  },
  {
    title: 'Entrepinares',
    award: 'Premio Europeo Vivienda Colaborativa',
    year: '2019',
  },
  {
    title: 'Entrepinares y Coworking Triple',
    award: 'Green Solutions Awards',
    year: '2021',
  },
  {
    title: 'Arquitectura regenerativa y cooperativa',
    award: 'Premio Especial Triodos Bank',
    year: '2023',
  },
  {
    title: 'Edificio Pira',
    award: 'Premio Sostenibilidad Saint Gobain',
    year: '2024',
  },
]

export function ObraReconocida() {
  return (
    <section
      id="obra-reconocida"
      data-nav-surface="light"
      className="bg-vibio-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.08] text-vibio-text text-balance">
            25 años de obra reconocida antes del primer Vibio
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5 lg:gap-4">
          {recognitionSlots.map((slot) => (
            <div key={slot.title} className="border border-vibio-border/18 bg-vibio-surface-2">
              <div className="aspect-[1.9/1] bg-vibio-text/[0.06]" aria-hidden />
              <div className="px-3 py-3 text-center text-[11px] font-light leading-[1.45] text-vibio-text/52">
                <p>{slot.title}</p>
                <p>{slot.award}</p>
                <p>{slot.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
