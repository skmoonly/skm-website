'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import { COMMUNITY } from '@/data/shorekeeper'

const NAV_TABS: {
  label: string
  href: string
  disabled: boolean
  coming?: boolean
}[] = [
  { label: 'LORE', href: '/lore', disabled: false },
  { label: 'BUILDS', href: '/builds', disabled: false },
  { label: 'MAP', href: '/map', disabled: false },
  { label: 'GUIDE', href: '/guide', disabled: false },
  { label: 'KIT', href: '/kit', disabled: false },
]

export default function SiteNav() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        background: 'rgba(4, 12, 26, 0.95)',
        borderBottom: '1px solid rgba(0,170,255,0.2)',
        backdropFilter: 'blur(8px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 20px rgba(0,68,187,0.3)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'stretch',
          gap: 0,
        }}
      >
        {NAV_TABS.map(({ label, href, disabled, coming }) => {
          const isActive = !disabled && pathname === href

          return (
            <NavTab
              key={label}
              label={label}
              href={href}
              disabled={disabled ?? false}
              isActive={isActive}
              subLabel={coming ? 'COMING SOON' : undefined}
            />
          )
        })}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Community links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <CommunityLink href={COMMUNITY.discord.url} label={COMMUNITY.discord.label} />
          <CommunityLink href={COMMUNITY.reddit.url} label={COMMUNITY.reddit.label} />
          {/* Terminal hint */}
          <span
            title="Press backtick (`) to open the Tethys Terminal"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--contour)',
              letterSpacing: '0.1em',
              cursor: 'default',
              userSelect: 'none',
              borderLeft: '1px solid var(--divider)',
              paddingLeft: 12,
            }}
          >
            [&nbsp;`&nbsp;] TERMINAL
          </span>
        </div>
      </div>
    </nav>
  )
}

// ── Tab item ──────────────────────────────────────────────────────────────────
function NavTab({
  label,
  href,
  disabled,
  isActive,
  subLabel,
}: {
  label: string
  href: string
  disabled: boolean
  isActive: boolean
  subLabel?: string
}) {
  const baseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 20px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    position: 'relative',
    borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
    color: disabled
      ? 'var(--contour)'
      : isActive
      ? 'var(--accent-primary)'
      : '#7ab2d4',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'color 0.2s ease, border-color 0.2s ease',
    whiteSpace: 'nowrap',
    pointerEvents: disabled ? 'none' : 'auto',
    gap: 3,
  }

  const content = (
    <>
      <span>// {label}</span>
      {subLabel && (
        <span
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.08em',
            color: 'var(--contour)',
            opacity: 0.8,
          }}
        >
          {subLabel}
        </span>
      )}
      {isActive && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: -1,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 6,
            height: 6,
            background: 'var(--accent-primary)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
        />
      )}
    </>
  )

  if (disabled) {
    return <span style={baseStyle}>{content}</span>
  }

  return (
    <Link href={href} style={baseStyle}>
      {content}
    </Link>
  )
}

// ── Community link ─────────────────────────────────────────────────────────────
function CommunityLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.12em',
        color: 'var(--rail-text)',
        textDecoration: 'none',
        border: '1px solid var(--contour)',
        padding: '5px 10px',
        transition: 'color 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent-primary)'
        e.currentTarget.style.borderColor = 'var(--accent-primary)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--rail-text)'
        e.currentTarget.style.borderColor = 'var(--contour)'
      }}
    >
      // {label}
    </a>
  )
}
