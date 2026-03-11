'use client'

import { type ReactNode } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import PrefixedLabel from './PrefixedLabel'

// ── Types ─────────────────────────────────────────────────────────────────────
export type PanelSize = 'utility' | 'mid' | 'hero'

interface TerminalPanelProps {
  /** Panel tier — controls width defaults */
  size?: PanelSize
  /** Category label shown in the header notch */
  label?: string
  /** Set to false to suppress side rail decorations */
  rails?: boolean
  children: ReactNode
  className?: string
  /** Extra classes applied to the inner body container */
  bodyClassName?: string
  /**
   * Stagger delay in seconds before clip-path expand animation begins.
   * Pass increasing values (0, 0.08, 0.16…) to cascade panels on mount.
   */
  delay?: number
  /**
   * Set to false to disable the entrance animation entirely (e.g. nested panels).
   * @default true
   */
  animate?: boolean
}

// ── Runic content for rails ───────────────────────────────────────────────────
const RAIL_TEXT =
  'ᚠᚢᚦᚨᚱᚲᚷᚹᚺ⌬⌭░▒║│┆⏣⟁⋮⟂ᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ⊞⊡⋯▋▌⌮⟄⊟'

function buildRailContent(): string {
  let s = ''
  for (let i = 0; i < 240; i++) {
    s += RAIL_TEXT[i % RAIL_TEXT.length]
  }
  return s
}

const RAIL_CONTENT = buildRailContent()

// ── Size map ──────────────────────────────────────────────────────────────────
const sizeClasses: Record<PanelSize, string> = {
  utility: 'w-full max-w-[300px]',
  mid: 'w-full max-w-[600px]',
  hero: 'w-full',
}

// ── Clip-path expand animation variants ───────────────────────────────────────
// Panel grows from a horizontal centre line outward — echoes the chamfered aesthetic
const panelVariants = {
  hidden: {
    clipPath: 'inset(48% 0% 48% 0%)',
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function TerminalPanel({
  size = 'mid',
  label,
  rails = true,
  children,
  className,
  bodyClassName,
  delay = 0,
  animate = true,
}: TerminalPanelProps) {
  const showRails = rails && size !== 'utility'

  return (
    <motion.div
      className={clsx('skm-panel relative group', sizeClasses[size], className)}
      variants={animate ? panelVariants : undefined}
      initial={animate ? 'hidden' : false}
      animate={animate ? 'visible' : false}
      transition={
        animate
          ? {
              duration: 0.42,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }
          : undefined
      }
    >
      {/* ── Outer border wrapper — double-line glow effect ── */}
      <div
        className="relative"
        style={{
          clipPath: 'var(--clip-panel)',
          padding: '2px',
          background: `linear-gradient(135deg, #00aaff 0%, rgba(0,68,187,0.6) 50%, #00aaff 100%)`,
          boxShadow: 'var(--glow-panel)',
          transition: 'box-shadow 0.25s ease',
        }}
      >
        {/* ── Inner border (dimmer inner line) ── */}
        <div
          style={{
            clipPath: 'var(--clip-panel)',
            padding: '1px',
            background: `rgba(0, 170, 255, 0.35)`,
          }}
        >
          {/* ── Panel body ── */}
          <div
            style={{
              clipPath: 'var(--clip-panel)',
              background: 'var(--bg-panel)',
            }}
          >
            {/* ── Header notch ── */}
            {label && (
              <div
                className="relative flex items-center px-4 py-2"
                style={{
                  borderBottom: '1px solid rgba(0,170,255,0.3)',
                  background: 'rgba(0, 68, 187, 0.12)',
                }}
              >
                {/* Diamond indicator left */}
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block"
                  style={{
                    width: 6,
                    height: 6,
                    background: 'var(--accent-primary)',
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                    flexShrink: 0,
                  }}
                />
                <PrefixedLabel label={label} />
                {/* Horizontal glow line */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, #00aaff60, transparent)',
                  }}
                />
              </div>
            )}

            {/* ── Content area (with optional side rails) ── */}
            <div className={clsx('relative px-6 py-5', bodyClassName)}>
              {/* Left rail */}
              {showRails && (
                <div className="skm-rail skm-rail--left" aria-hidden="true">
                  <span className="skm-rail__inner">{RAIL_CONTENT}</span>
                </div>
              )}

              {/* Right rail */}
              {showRails && (
                <div className="skm-rail skm-rail--right" aria-hidden="true">
                  <span className="skm-rail__inner">{RAIL_CONTENT}</span>
                </div>
              )}

              {/* Actual content */}
              <div className={clsx(showRails && 'mx-5')}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
