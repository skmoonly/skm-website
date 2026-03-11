import TerminalPanel from '@/components/ui/TerminalPanel'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import BackToTop from '@/components/ui/BackToTop'
import { ABILITIES } from '@/data/shorekeeper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kit & Abilities — Shorekeeper | SKM',
  description:
    "Complete breakdown of Shorekeeper's abilities: Normal Attack, Resonance Skill, Forte Circuit, Liberation, Intro, and Outro.",
}

// Damage type badge colors
const DMG_COLORS: Record<string, string> = {
  'Spectro DMG': '#00d4ff',
  Support: '#00aaff',
}

export default function KitPage() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      {/* ── Page header ── */}
      <div>
        <PrefixedLabel label="TETHYS CLASSIFICATION — COMBAT PROFILE" dim />
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#e0f0ff',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginTop: 6,
          }}
        >
          Kit & Abilities
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--rail-text)',
            marginTop: 6,
            letterSpacing: '0.08em',
          }}
        >
          // SOURCE: PUBLIC WIKI DATA — VERIFY WITH SKMOONLY BEFORE GO-LIVE
        </p>
      </div>

      {/* ── Abilities ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {ABILITIES.map((ability, i) => (
          <AbilityPanel key={ability.id} ability={ability} delay={i * 0.09} />
        ))}
      </div>
      {/* Back to top — appears after 400px scroll */}
      <BackToTop />
    </div>
  )
}

// ── Ability Panel ─────────────────────────────────────────────────────────────
function AbilityPanel({
  ability,
  delay = 0,
}: {
  ability: (typeof ABILITIES)[number]
  delay?: number
}) {
  const dmgColor = DMG_COLORS[ability.damageType] ?? 'var(--accent-primary)'

  return (
    <TerminalPanel size="hero" label={ability.type} rails delay={delay}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 240px',
          gap: 32,
          alignItems: 'start',
        }}
      >
        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Ability name + damage type */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#e0f0ff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {ability.name}
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: dmgColor,
                letterSpacing: '0.12em',
                border: `1px solid ${dmgColor}40`,
                padding: '3px 8px',
                textTransform: 'uppercase',
              }}
            >
              {ability.damageType}
            </span>
          </div>

          {/* Cooldown / cost row */}
          {(ability.cooldown || ability.cost) && (
            <div style={{ display: 'flex', gap: 20 }}>
              {ability.cooldown && (
                <StatChip label="COOLDOWN" value={ability.cooldown} />
              )}
              {ability.cost && (
                <StatChip label="COST" value={ability.cost} />
              )}
            </div>
          )}

          {/* Description */}
          <div>
            {ability.description.split('\n').map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: '#c8dff5',
                  lineHeight: 1.8,
                  marginBottom: line === '' ? 8 : 0,
                }}
              >
                {line.startsWith('•') ? (
                  <span>
                    <span style={{ color: 'var(--accent-primary)' }}>◈</span>
                    {line.slice(1)}
                  </span>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        </div>

        {/* Key mechanic sidebar — animate=false to avoid double-animation */}
        <TerminalPanel size="utility" label="KEY MECHANIC" rails={false} animate={false}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--accent-cyan)',
              lineHeight: 1.7,
              letterSpacing: '0.04em',
            }}
          >
            {ability.keyMechanic}
          </p>
        </TerminalPanel>
      </div>
    </TerminalPanel>
  )
}

// ── Stat chip ─────────────────────────────────────────────────────────────────
function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '6px 12px',
        background: 'rgba(0,68,187,0.1)',
        border: '1px solid rgba(0,170,255,0.15)',
      }}
    >
      <PrefixedLabel label={label} dim style={{ fontSize: '0.5rem' }} />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--accent-primary)',
          fontWeight: 700,
        }}
      >
        {value}
      </span>
    </div>
  )
}
