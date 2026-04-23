'use client'

import { useEffect, useState } from 'react'
import {
  Cursor,
  CursorProvider,
} from '@/components/animate-ui/components/animate/cursor'

export function VibioCursor() {
  const [isOnFooter, setIsOnFooter] = useState(false)

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      setIsOnFooter(Boolean(target?.closest('#contacto')))
    }

    document.addEventListener('pointermove', handlePointerMove)
    return () => document.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <CursorProvider global>
      <Cursor
        className={`size-6 opacity-100 ${isOnFooter ? 'text-[#242018]' : 'text-vibio-brand-yellow'}`}
      />
    </CursorProvider>
  )
}
