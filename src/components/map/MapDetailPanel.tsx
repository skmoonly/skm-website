'use client'

import { motion, AnimatePresence } from 'framer-motion'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import type { MapMarker } from './BlackShoresMap'

interface MapDetailPanelProps {
  marker: MapMarker | null
  onClose: () => void
}

const CATEGORY_CONFIG: Record<string, { color: string; label: string; symbol: string }> = {
  beacon: { color: '#00d4ff', label: 'RESONANCE BEACON', symbol: '◇' },
  boss:   { color: '#f87171', label: 'ELITE / BOSS',     symbol: '✦' },
  quest:  { color: '#fbbf24', label: 'QUEST LOCATION',   symbol: '★' },
}

export default function MapDetailPanel({ marker, onClose }: MapDetailPanelProps) {
  return (
    <AnimatePresence>
      {marker && (
        <motion.div
          key={marker.id}
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1000,
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            // Chamfered border
            clipPath:
              'polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 10px)',
            boxShadow: '0 0 0 1px #00aaff, 0 0 24px rgba(0,68,187,0.4)',
            background: 'rgba(6, 14, 32, 0.96)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderBottom: '1px solid rgba(0,170,255,0.3)',
              background: 'rgba(0, 68, 187, 0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: CATEGORY_CONFIG[marker.category]?.color ?? '#00aaff',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  flexShrink: 0,
                  filter: `drop-shadow(0 0 4px ${CATEGORY_CONFIG[marker.category]?.color ?? '#00aaff'})`,
                }}
              />
              <PrefixedLabel
                label={CATEGORY_CONFIG[marker.category]?.label ?? 'LOCATION'}
              />
            </div>
            <button
              onClick={onClose}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--rail-text)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                padding: '2px 4px',
              }}
            >
              [✕]
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Name */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 700,
                color: '#e0f0ff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {CATEGORY_CONFIG[marker.category]?.symbol} {marker.name}
            </h3>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                color: '#c8dff5',
                lineHeight: 1.7,
              }}
            >
              {marker.description}
            </p>

            {/* Coordinates */}
            <div
              style={{
                display: 'flex',
                gap: 16,
                padding: '8px 12px',
                background: 'rgba(0,68,187,0.1)',
                border: '1px solid rgba(0,170,255,0.12)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    color: 'var(--rail-text)',
                    letterSpacing: '0.1em',
                  }}
                >
                  // X COORD
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                  }}
                >
                  {marker.position[0].toFixed(1)}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    color: 'var(--rail-text)',
                    letterSpacing: '0.1em',
                  }}
                >
                  // Y COORD
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-primary)',
                    fontWeight: 700,
                  }}
                >
                  {marker.position[1].toFixed(1)}
                </span>
              </div>
            </div>

            {/* Category tag */}
            <div
              style={{
                alignSelf: 'flex-start',
                padding: '4px 10px',
                border: `1px solid ${CATEGORY_CONFIG[marker.category]?.color ?? '#00aaff'}40`,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: CATEGORY_CONFIG[marker.category]?.color ?? '#00aaff',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {marker.category}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
