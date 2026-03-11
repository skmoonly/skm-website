'use client'

import { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'

const BOOT_LINES = [
  '> TETHYS UPLINK INITIATING...',
  '> AUTHENTICATION: CONFIRMED^500',
  '> CLEARANCE LEVEL: UNRESTRICTED^500',
  '> RETRIEVING CLASSIFIED DOSSIER...^800',
  '> SUBJECT: SHOREKEEPER^400',
  '> DESIGNATION: OVERSEER — BLACK SHORES^600',
  '> ACCESSING SHOREKEEPER DATABASE...^1000',
  '> SYSTEM READY.^800',
  ' ',
]

export default function BootScreen() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const typedRef = useRef<HTMLSpanElement>(null)
  const typedInstance = useRef<Typed | null>(null)
  const mountedAt = useRef<number>(0)

  const MIN_DISPLAY_MS = 1000

  useEffect(() => {
    // Only show on first visit per session
    const booted = sessionStorage.getItem('skm-booted')
    if (booted) return
    setVisible(true)
    mountedAt.current = Date.now()
  }, [])

  useEffect(() => {
    if (!visible || !typedRef.current) return

    typedInstance.current = new Typed(typedRef.current, {
      strings: [BOOT_LINES.join('<br/>')],
      typeSpeed: 28,
      showCursor: true,
      cursorChar: '█',
      onComplete: () => {
        // Auto-dismiss after sequence completes
        setTimeout(() => dismiss(), 1200)
      },
    })

    return () => {
      typedInstance.current?.destroy()
    }
  }, [visible])

  const dismiss = () => {
    const elapsed = Date.now() - mountedAt.current
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed)
    setTimeout(() => {
      sessionStorage.setItem('skm-booted', '1')
      setExiting(true)
      setTimeout(() => setVisible(false), 600)
    }, remaining)
  }

  useEffect(() => {
    if (!visible) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible])

  if (!visible) return null

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* CRT scanline overlay on boot screen too */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0,0,0,0.1) 2px,
            rgba(0,0,0,0.1) 4px
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* SKM logo mark */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '3.5rem',
          letterSpacing: '0.2em',
          color: 'var(--accent-primary)',
          textShadow: '0 0 20px #00aaff, 0 0 50px #0044bb',
          marginBottom: 40,
          textTransform: 'uppercase',
        }}
      >
        SKM
      </div>

      {/* Terminal output */}
      <div
        style={{
          maxWidth: 560,
          width: '90%',
          padding: '32px 28px',
          background: 'rgba(8, 18, 42, 0.8)',
          border: '1px solid rgba(0,170,255,0.2)',
          boxShadow: '0 0 30px rgba(0,68,187,0.3)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--accent-primary)',
            lineHeight: 2,
            letterSpacing: '0.03em',
            margin: 0,
          }}
        >
          <span ref={typedRef} />
        </p>
      </div>

      {/* Skip hint */}
      <p
        style={{
          position: 'absolute',
          bottom: 32,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'var(--contour)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        // PRESS ESC OR CLICK ANYWHERE TO SKIP
      </p>
    </div>
  )
}
