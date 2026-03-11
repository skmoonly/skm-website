import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Classification Not Found | SKM',
  description: 'The requested Tethys record does not exist.',
}

export default function NotFound() {
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
            // TETHYS SYSTEM — ERROR REPORT
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '5rem',
              fontWeight: 700,
              color: 'var(--accent-primary)',
              letterSpacing: '0.1em',
              lineHeight: 1,
              textShadow: '0 0 30px rgba(0,170,255,0.3)',
            }}
          >
            404
          </h1>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: 1,
            background:
              'linear-gradient(90deg, rgba(0,170,255,0.4), transparent)',
          }}
        />

        {/* Message block */}
        <div
          style={{
            padding: '20px 24px',
            background: 'rgba(6,14,32,0.8)',
            border: '1px solid rgba(0,170,255,0.2)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          {[
            '> TETHYS SYSTEM QUERY...',
            '> CLASSIFICATION: NOT FOUND',
            '> DOSSIER: DOES NOT EXIST IN DATABASE',
            '> STATUS: ACCESS DENIED — RECORD UNKNOWN',
          ].map((line) => (
            <p
              key={line}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: line.includes('DENIED')
                  ? '#f87171'
                  : 'var(--accent-primary)',
                letterSpacing: '0.04em',
                lineHeight: 1.6,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--accent-primary)',
              border: '1px solid rgba(0,170,255,0.4)',
              padding: '8px 18px',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
          >
            // RETURN TO BASE
          </Link>
          <Link
            href="/lore"
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
            // ACCESS LORE
          </Link>
        </div>
      </div>
    </div>
  )
}
