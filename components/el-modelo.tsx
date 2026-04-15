import { PilaresEditorialSection } from '@/components/pilares-editorial-section'

const pilares = [
  {
    number: '01',
    title: 'Viviendas ecológicas',
    description:
      'Construcción bioclimática con materiales locales y consumo energético casi nulo.',
  },
  {
    number: '02',
    title: 'Biodiversidad',
    description:
      'Restauración activa del ecosistema: bosques comestibles, corredores verdes, agua.',
  },
  {
    number: '03',
    title: 'Nuevos vecinos',
    description:
      'Proceso de selección cuidadoso para crear comunidades cohesionadas y diversas.',
  },
  {
    number: '04',
    title: 'Cultura colaborativa',
    description:
      'Espacios y rituales compartidos que fortalecen el tejido social del pueblo.',
  },
  {
    number: '05',
    title: 'Comunidades energéticas',
    description:
      'Producción y gestión colectiva de energía renovable a escala local.',
  },
  {
    number: '06',
    title: 'Gestión del agua',
    description:
      'Captación, almacenamiento y reutilización inteligente de recursos hídricos.',
  },
  {
    number: '07',
    title: 'Empleo local',
    description:
      'Desarrollo de economía real: artesanía, agricultura, servicios y teletrabajo.',
  },
  {
    number: '08',
    title: 'Vivienda asequible',
    description:
      'Modelos de propiedad y alquiler que mantienen la accesibilidad a largo plazo.',
  },
  {
    number: '09',
    title: 'Adaptación climática',
    description:
      'Diseño resiliente preparado para los escenarios climáticos que vienen.',
  },
  {
    number: '10',
    title: 'Sociocracia',
    description:
      'Gobernanza por consentimiento: decisiones efectivas sin jerarquías rígidas.',
  },
]

export function ElModelo() {
  return (
    <section id="modelo" data-nav-surface="light" className="bg-vibio-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <PilaresEditorialSection pilares={pilares} />
      </div>
    </section>
  )
}
