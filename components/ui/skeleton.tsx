import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-[var(--vibio-radius-surface)]', className)}
      {...props}
    />
  )
}

export { Skeleton }
