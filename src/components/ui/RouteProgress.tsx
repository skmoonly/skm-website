'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

// ── Inner component that uses useSearchParams ─────────────────────────────────
function RouteProgressInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Trigger on route change
    setVisible(true)
    setProgress(0)

    // Animate to ~80% quickly, hold there
    const t1 = setTimeout(() => setProgress(30), 50)
    const t2 = setTimeout(() => setProgress(65), 150)
    const t3 = setTimeout(() => setProgress(80), 300)

    // Complete and hide
    const t4 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setVisible(false)
        setProgress(0)
      }, 300)
    }, 600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [pathname, searchParams])

  if (!visible && progress === 0) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        width: `${progress}%`,
        height: 2,
        background:
          'linear-gradient(90deg, transparent, #00aaff 20%, #00d4ff 80%, transparent)',
        boxShadow: '0 0 8px #00aaff, 0 0 16px rgba(0,170,255,0.4)',
        transition:
          progress === 100
            ? 'width 0.15s ease, opacity 0.3s ease 0.15s'
            : 'width 0.25s ease',
        opacity: progress === 100 ? 0 : 1,
        pointerEvents: 'none',
      }}
    />
  )
}

// ── Wrapper with Suspense (required for useSearchParams in Next.js app router) ─
export default function RouteProgress() {
  return (
    <Suspense fallback={null}>
      <RouteProgressInner />
    </Suspense>
  )
}
