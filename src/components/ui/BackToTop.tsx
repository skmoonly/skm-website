'use client'

import { useEffect, useState } from 'react'

interface BackToTopProps {
  threshold?: number
}

export default function BackToTop({ threshold = 400 }: BackToTopProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 10000,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        title="Back to top"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.1em',
          color: 'var(--rail-text)',
          background: 'rgba(6,14,32,0.9)',
          border: '1px solid rgba(0,170,255,0.2)',
          padding: '5px 10px',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          transition: 'color 0.15s ease, border-color 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-primary)'
          e.currentTarget.style.borderColor = 'rgba(0,170,255,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--rail-text)'
          e.currentTarget.style.borderColor = 'rgba(0,170,255,0.2)'
        }}
      >
        // TOP ↑
      </button>
    </div>
  )
}
