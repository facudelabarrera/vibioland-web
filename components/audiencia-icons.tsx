import type { SVGProps } from 'react'

const stroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.35,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  vectorEffect: 'non-scaling-stroke' as const,
}

type IconProps = SVGProps<SVGSVGElement>

/** Tres círculos solapados — densidad, cohortes, muchas vidas en el mismo espacio urbano */
export function AudienciaIconUrbanos(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <circle cx="22" cy="32" r="12" {...stroke} />
      <circle cx="32" cy="32" r="12" {...stroke} />
      <circle cx="42" cy="32" r="12" {...stroke} />
    </svg>
  )
}

/** Círculos concéntricos — núcleo familiar, capas de cuidado */
export function AudienciaIconFamilias(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <circle cx="32" cy="32" r="20" {...stroke} />
      <circle cx="32" cy="32" r="11" {...stroke} />
      <circle cx="32" cy="32" r="3.5" {...stroke} />
    </svg>
  )
}

/** Nodo central y satélites — trabajo remoto, red, foco + conexiones */
export function AudienciaIconKnowledge(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <circle cx="32" cy="32" r="15" {...stroke} />
      <circle cx="11" cy="32" r="7.5" {...stroke} />
      <circle cx="53" cy="32" r="7.5" {...stroke} />
    </svg>
  )
}

/** Anillo sobre esfera — ciclos, movimiento activo en el tiempo */
export function AudienciaIconSeniors(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden {...props}>
      <circle cx="32" cy="34" r="13" {...stroke} />
      <ellipse cx="32" cy="34" rx="22" ry="5" {...stroke} />
    </svg>
  )
}

export const audienciaIconBySlug = {
  urbanos: AudienciaIconUrbanos,
  familias: AudienciaIconFamilias,
  knowledge: AudienciaIconKnowledge,
  seniors: AudienciaIconSeniors,
} as const

export type AudienciaIconSlug = keyof typeof audienciaIconBySlug
