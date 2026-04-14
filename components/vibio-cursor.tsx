'use client'

import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from '@/components/animate-ui/components/animate/cursor'

export function VibioCursor() {
  return (
    <CursorProvider global>
      <Cursor className="size-6 text-vibio-accent-green" />
      <CursorFollow className="bg-vibio-accent-green/75 text-vibio-text font-medium tracking-[-0.02em] px-2.5 py-1 shadow-sm">
        vibio
      </CursorFollow>
    </CursorProvider>
  )
}
