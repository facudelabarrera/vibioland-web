import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"

type VibioLogoProps = {
  /** Clases extra para tamaño / alineación */
  className?: string
  priority?: boolean
}

const src = "/images/vibioland-logo.svg"

/**
 * Wordmark vectorial (`public/images/vibioland-logo.svg`).
 */
export function VibioLogo({ className, priority }: VibioLogoProps) {
  return (
    <Image
      src={src}
      alt="vibio.land"
      width={879}
      height={158}
      priority={priority}
      sizes="(max-width: 1024px) 200px, 240px"
      className={cn(
        "h-[26px] w-auto max-w-[160px] object-contain object-left lg:h-8 lg:max-w-[200px]",
        className,
      )}
    />
  )
}

export function VibioLogoLink({
  className,
  priority,
  linkClassName,
}: VibioLogoProps & { linkClassName?: string }) {
  return (
    <Link href="/" className={linkClassName ?? "inline-block shrink-0 leading-none"}>
      <VibioLogo className={className} priority={priority} />
    </Link>
  )
}
