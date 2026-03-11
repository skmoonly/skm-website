'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[SKM] System fault:', error)
  }, [error])

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 540,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          alignItems: 'flex-start',
        }}
      >
        {/* Error code */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--rail-text)',
              letterSpacing: '0.1em',
              marginBottom: 8,
            }}
          >
            // TETHYS SYSTEM — CRITICAL FAULT
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '5rem',
              fontWeight: 700,
              color: '#f87171',
              letterSpacing: '0.1em',
              lineHeight: 1,
              textShadow: '0 0 30px rgba(248,113,113,0.25)',
            }}
          >
            500
          </h1>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: 'linear-gradient(90deg, rgba(248,113,113,0.5), transparent)',
          }}
        />

        {/* Message block */}
        <div
          style={{
            padding: '20px 24px',
            background: 'rgba(6,14,32,0.8)',
            border: '1px solid rgba(248,113,113,0.3)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {[
            '> TETHYS UPLINK INTERRUPTED',
            '> SYSTEM FAULT DETECTED — UNHANDLED EXCEPTION',
            '> DATABASE INTEGRITY: UNKNOWN',
            '> RECOMMEND: REINITIALIZE SEQUENCE',
          ].map((line) => (
            <p
              key={line}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: line.includes('FAULT') || line.includes('RECOMMEND')
                  ? '#f87171'
                  : 'var(--accent-primary)',
                letterSpacing: '0.04em',
                lineHeight: 1.6,
              }}
            >
              {line}
            </p>
          ))}
          {error.digest && (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                color: 'var(--contour)',
                letterSpacing: '0.06em',
                marginTop: 8,
                paddingTop: 8,
                borderTop: '1px solid rgba(248,113,113,0.15)',
              }}
            >
              // ERROR ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: '#f87171',
              background: 'none',
              border: '1px solid rgba(248,113,113,0.4)',
              padding: '8px 18px',
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
          >
            // REINITIALIZE
          </button>
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--rail-text)',
              border: '1px solid var(--contour)',
              padding: '8px 18px',
              textDecoration: 'none',
            }}
          >
            // RETURN TO BASE
          </a>
        </div>
      </div>
    </div>
  )
}
