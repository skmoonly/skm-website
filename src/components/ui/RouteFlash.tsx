'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * RouteFlash — renders a full-screen overlay that briefly flickers
 * blue + scanlines on every client-side route change.
 *
 * Sequence (total ~310ms):
 *   0ms   → overlay appears (near-transparent)
 *   20ms  → flash to electric blue + high-opacity scanlines
 *   100ms → fade to dark translucent
 *   160ms → second micro-flash (scanline artifact)
 *   220ms → fade to transparent
 *   310ms → overlay pointer-events off, done
 */
export default function RouteFlash() {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  // Track if this is the very first mount (skip flash on initial load)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    const el = overlayRef.current
    if (!el) return

    // Reset and kick off
    el.style.transition = 'none'
    el.style.opacity = '0'
    el.style.pointerEvents = 'all'

    const t1 = setTimeout(() => {
      el.style.transition = 'opacity 0.08s linear'
      el.style.opacity = '1'
      el.dataset.phase = 'flash'
    }, 10)

    const t2 = setTimeout(() => {
      el.style.transition = 'opacity 0.06s linear'
      el.style.opacity = '0.15'
      el.dataset.phase = 'dim'
    }, 100)

    const t3 = setTimeout(() => {
      el.style.transition = 'opacity 0.04s linear'
      el.style.opacity = '0.65'
      el.dataset.phase = 'artifact'
    }, 160)

    const t4 = setTimeout(() => {
      el.style.transition = 'opacity 0.12s ease-out'
      el.style.opacity = '0'
    }, 210)

    const t5 = setTimeout(() => {
      el.style.pointerEvents = 'none'
      el.dataset.phase = ''
    }, 340)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [pathname])

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      data-phase=""
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 7000,
        pointerEvents: 'none',
        opacity: 0,
        background: '#00aaff',
        // Scanline artifact embedded in the flash layer
        backgroundImage: `
          linear-gradient(
            rgba(0, 170, 255, 0.95) 0%,
            rgba(0, 40, 120, 0.92) 100%
          ),
          repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 1px,
            rgba(0, 0, 0, 0.35) 1px,
            rgba(0, 0, 0, 0.35) 3px
          )
        `,
      }}
    />
  )
}
