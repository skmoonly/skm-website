import TerminalPanel from '@/components/ui/TerminalPanel'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import type { BUILDS } from '@/data/shorekeeper'

type Build = (typeof BUILDS)[number]

interface BuildCardProps {
  build: Build
}

// Tier color accent
const TIER_COLORS: Record<string, string> = {
  'BEST IN SLOT': '#00d4ff',
  BUDGET: '#00aaff',
  F2P: '#7ab2d4',
}

export default function BuildCard({ build }: BuildCardProps) {
  const accentColor = TIER_COLORS[build.tier] ?? 'var(--accent-primary)'

  return (
    <TerminalPanel size="hero" label={`// ${build.tier}`} rails>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
        }}
      >
        {/* Left column: Weapon + Echo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Weapon */}
          <section>
            <PrefixedLabel label="WEAPON" dim style={{ marginBottom: 10, display: 'block' }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                background: 'rgba(0,68,187,0.1)',
                border: `1px solid ${accentColor}30`,
              }}
            >
              {/* Rarity stars */}
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: accentColor,
                    letterSpacing: 1,
                  }}
                >
                  {'★'.repeat(build.weapon.rarity)}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    color: 'var(--rail-text)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {build.weapon.type}
                </div>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#e0f0ff',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  {build.weapon.name}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    color: '#7ab2d4',
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {build.weapon.note}
                </p>
              </div>
            </div>
          </section>

          {/* Echo Set */}
          <section>
            <PrefixedLabel label="ECHO SET" dim style={{ marginBottom: 10, display: 'block' }} />
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(0,68,187,0.08)',
                border: '1px solid rgba(0,170,255,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#e0f0ff',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {build.echoSet.name}{' '}
                <span style={{ color: 'var(--rail-text)', fontSize: '0.7rem' }}>
                  ({build.echoSet.pieces}-piece)
                </span>
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--accent-primary)',
                  letterSpacing: '0.05em',
                }}
              >
                2pc: {build.echoSet.bonus2}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: accentColor,
                  letterSpacing: '0.05em',
                }}
              >
                5pc: {build.echoSet.bonus5}
              </p>
            </div>
          </section>

          {/* Main Echo */}
          <section>
            <PrefixedLabel label="MAIN ECHO" dim style={{ marginBottom: 10, display: 'block' }} />
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(0,68,187,0.08)',
                border: '1px solid rgba(0,170,255,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: '#e0f0ff',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {build.mainEcho.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  color: '#7ab2d4',
                  lineHeight: 1.5,
                }}
              >
                {build.mainEcho.note}
              </p>
            </div>
          </section>
        </div>

        {/* Right column: Stats + Priority */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* ER Target */}
          <TerminalPanel size="utility" label="ER TARGET" rails={false}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 700,
                color: accentColor,
                letterSpacing: '0.06em',
                textShadow: `0 0 12px ${accentColor}`,
              }}
            >
              {build.erTarget}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--rail-text)',
                marginTop: 4,
                letterSpacing: '0.06em',
              }}
            >
              Energy Regeneration
            </p>
          </TerminalPanel>

          {/* Echo stat priority */}
          <section>
            <PrefixedLabel label="ECHO STATS" dim style={{ marginBottom: 10, display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {build.statPriority.map(({ cost, stat }, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '7px 12px',
                    background: 'rgba(0,68,187,0.08)',
                    border: '1px solid rgba(0,170,255,0.12)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      color: 'var(--rail-text)',
                      width: 40,
                      flexShrink: 0,
                    }}
                  >
                    COST {cost}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--accent-primary)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {stat}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Substats */}
          <section>
            <PrefixedLabel label="SUBSTATS PRIORITY" dim style={{ marginBottom: 8, display: 'block' }} />
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#7ab2d4',
                lineHeight: 1.7,
                letterSpacing: '0.04em',
              }}
            >
              {build.substats}
            </p>
          </section>

          {/* Skill priority */}
          <section>
            <PrefixedLabel label="SKILL PRIORITY" dim style={{ marginBottom: 8, display: 'block' }} />
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: accentColor,
                lineHeight: 1.7,
                letterSpacing: '0.04em',
              }}
            >
              {build.skillPriority}
            </p>
          </section>
        </div>
      </div>
    </TerminalPanel>
  )
}
