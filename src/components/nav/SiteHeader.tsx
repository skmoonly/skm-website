import Link from 'next/link'
import PrefixedLabel from '@/components/ui/PrefixedLabel'

export default function SiteHeader() {
  return (
    <header
      style={{
        background: 'rgba(4, 12, 26, 0.98)',
        borderBottom: '1px solid rgba(0,170,255,0.12)',
        padding: '12px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {/* Logo / Identity */}
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {/* Logo placeholder — chamfered square with SKM */}
          <div
            style={{
              width: 42,
              height: 42,
              background: 'var(--bg-raised)',
              clipPath:
                'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 8px #00aaff, 0 0 20px #0044bb',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.04em',
                color: 'var(--accent-primary)',
              }}
            >
              SKM
            </span>
          </div>

          {/* Site name */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#e0f0ff',
                lineHeight: 1,
                margin: 0,
              }}
            >
              ShoreKeeper<span style={{ color: 'var(--accent-primary)' }}>Mains</span>
            </p>
            <PrefixedLabel
              label="TETHYS DATABASE — CLASSIFIED"
              dim
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.1em',
                display: 'block',
                marginTop: 3,
              }}
            />
          </div>
        </Link>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Status strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: 'var(--rail-text)',
            letterSpacing: '0.08em',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00aaff',
              boxShadow: '0 0 6px #00aaff',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          UPLINK ACTIVE
        </div>
      </div>
    </header>
  )
}
