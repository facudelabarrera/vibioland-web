import type { SVGProps } from 'react'

/**
 * Familia visual consistente: viewBox 64, fill none, stroke currentColor,
 * stroke-width 1.25, linecap/join round. Abstractas / geométricas / lineales.
 */
const SHARED = {
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
  focusable: false,
}

const Viviendas = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <path d="M12 30 L32 14 L52 30 V50 H12 Z" />
    <path d="M32 36 V44" />
    <path d="M28 36 Q32 32 36 36" />
  </svg>
)

const Biodiversidad = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <circle cx="24" cy="36" r="11" />
    <circle cx="40" cy="36" r="11" />
    <circle cx="32" cy="24" r="11" />
  </svg>
)

const Vecinos = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <circle cx="22" cy="32" r="9" />
    <circle cx="42" cy="32" r="9" />
    <path d="M22 32 H42" />
    <circle cx="32" cy="32" r="1" />
  </svg>
)

const Cultura = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <path d="M32 12 L52 44 H12 Z" />
    <path d="M32 52 L12 20 H52 Z" />
  </svg>
)

const Energia = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <circle cx="32" cy="32" r="9" />
    <path d="M32 8 V16 M32 48 V56 M8 32 H16 M48 32 H56 M15 15 L21 21 M43 43 L49 49 M49 15 L43 21 M15 49 L21 43" />
  </svg>
)

const Agua = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <path d="M10 22 Q19 16 28 22 T46 22 T56 22" />
    <path d="M10 34 Q19 28 28 34 T46 34 T56 34" />
    <path d="M10 46 Q19 40 28 46 T46 46 T56 46" />
  </svg>
)

const Empleo = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    {[20, 32, 44].map((cy) =>
      [20, 32, 44].map((cx) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" fill="currentColor" stroke="none" />
      )),
    )}
    <path d="M20 20 L44 44 M44 20 L20 44" opacity="0" />
  </svg>
)

const ViviendaAsequible = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <path d="M10 32 L32 12 L54 32 V52 H10 Z" />
    <path d="M22 52 V38 H42 V52" />
    <path d="M32 52 V44" />
  </svg>
)

const Adaptacion = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <path d="M10 46 Q22 18 32 18 Q42 18 54 46" />
    <path d="M32 20 V52" />
    <path d="M24 44 H40" />
  </svg>
)

const Sociocracia = (p: SVGProps<SVGSVGElement>) => (
  <svg {...SHARED} {...p}>
    <path d="M32 10 L54 26 L46 50 H18 L10 26 Z" />
    <circle cx="32" cy="32" r="4" />
  </svg>
)

export const PILAR_ICONS: Array<(p: SVGProps<SVGSVGElement>) => React.JSX.Element> = [
  Viviendas,
  Biodiversidad,
  Vecinos,
  Cultura,
  Energia,
  Agua,
  Empleo,
  ViviendaAsequible,
  Adaptacion,
  Sociocracia,
]
