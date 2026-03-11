'use client'

import PrefixedLabel from '@/components/ui/PrefixedLabel'

// ── Types ─────────────────────────────────────────────────────────────────────
interface MapFilterSidebarProps {
  categories: { key: string; label: string; color: string; count: number }[]
  visibleCategories: Set<string>
  onToggle: (category: string) => void
}

// ── Category config ───────────────────────────────────────────────────────────
const SYMBOLS: Record<string, string> = {
  beacon: '◇',
  boss: '✦',
  quest: '★',
}

export default function MapFilterSidebar({
  categories,
  visibleCategories,
  onToggle,
}: MapFilterSidebarProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1000,
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        background: 'rgba(6, 14, 32, 0.88)',
        border: '1px solid rgba(0,170,255,0.2)',
        padding: '12px',
        backdropFilter: 'blur(6px)',
        clipPath:
          'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 8px)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 8,
          paddingBottom: 8,
          borderBottom: '1px solid rgba(0,170,255,0.15)',
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            background: '#00aaff',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            flexShrink: 0,
          }}
        />
        <PrefixedLabel label="FILTER" />
      </div>

      {/* Category toggles */}
      {categories.map(({ key, label, color, count }) => {
        const active = visibleCategories.has(key)
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 8px',
              background: active
                ? 'rgba(0,68,187,0.15)'
                : 'rgba(0,0,0,0.2)',
              border: `1px solid ${active ? `${color}40` : 'rgba(0,170,255,0.08)'}`,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              width: '100%',
              textAlign: 'left',
            }}
          >
            {/* Category diamond indicator */}
            <span
              style={{
                width: 8,
                height: 8,
                background: active ? color : 'var(--contour)',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                flexShrink: 0,
                transition: 'background 0.15s ease',
                filter: active ? `drop-shadow(0 0 3px ${color})` : 'none',
              }}
            />

            {/* Label */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: active ? '#e0f0ff' : 'var(--contour)',
                letterSpacing: '0.1em',
                flex: 1,
                transition: 'color 0.15s ease',
              }}
            >
              {SYMBOLS[key] ?? '◈'} {label}
            </span>

            {/* Count */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: active ? color : 'var(--contour)',
                transition: 'color 0.15s ease',
              }}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
