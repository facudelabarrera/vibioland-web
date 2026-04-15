import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

/** Solid CTA: same API as before, sin brillo ni sombras. */
export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      borderRadius = "0",
      background = "#f1f3f5",
      className,
      children,
      shimmerColor: _shimmerColor,
      shimmerSize: _shimmerSize,
      shimmerDuration: _shimmerDuration,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={
          {
            "--radius": borderRadius,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "relative flex cursor-pointer items-center justify-center overflow-hidden border border-vibio-text/15 px-6 py-3 whitespace-nowrap [border-radius:var(--radius)] [background:var(--bg)]",
          "text-inherit transition-colors duration-200 ease-out",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"
