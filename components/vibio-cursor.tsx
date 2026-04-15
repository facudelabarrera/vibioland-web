'use client'

import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from '@/components/animate-ui/components/animate/cursor'

export function VibioCursor() {
  return (
    <CursorProvider global>
      <Cursor className="size-6 text-vibio-brand-yellow opacity-100" />
      <CursorFollow className="bg-vibio-brand-yellow text-black font-medium tracking-[-0.02em] px-2.5 py-1 opacity-100">
        vibio
      </CursorFollow>
    </CursorProvider>
  )
}
