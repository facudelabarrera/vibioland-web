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
    </CursorProvider>
  )
}
