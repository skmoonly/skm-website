import TerminalPanel from '@/components/ui/TerminalPanel'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import { CHARACTER, CHARACTER_STATS } from '@/data/shorekeeper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lore — Shorekeeper Classified Dossier | SKM',
  description:
    'Classified Tethys System dossier on Shorekeeper — her origin, role, and significance to the Black Shores.',
}

// ── Placeholder lore blocks ─────────────────────────────────────────────────
// These are STRUCTURAL PLACEHOLDERS for Skmoonly to populate.
const LORE_SECTIONS = [
  {
    id: 'origin',
    label: 'ORIGIN',
    title: 'Origin & Creation',
    placeholder: true,
    content:
      '[LORE PLACEHOLDER] — Skmoonly will write this section. Document the full account of Shorekeeper\'s origin: her creation by the Tethys system, her relationship to the Black Shores, and the circumstances that bound her to the role of Overseer. All content must be written in-universe as a classified Tethys system dossier entry.',
  },
  {
    id: 'role',
    label: 'ROLE',
    title: 'The Overseer\'s Mandate',
    placeholder: true,
    content:
      '[LORE PLACEHOLDER] — Skmoonly will write this section. Describe Shorekeeper\'s duties as Overseer of the Black Shores: what she guards, what she maintains, and why her existence is mission-critical to the Tethys system. Written from the perspective of a classified Tethys intelligence file.',
  },
  {
    id: 'nature',
    label: 'NATURE',
    title: 'Nature & Consciousness',
    placeholder: true,
    content:
      '[LORE PLACEHOLDER] — Skmoonly will write this section. Explore the nature of Shorekeeper\'s consciousness: her capacity for emotion, her relationship to the subjects she oversees, her awareness of her own constructed origin, and the philosophical weight of what she is.',
  },
  {
    id: 'significance',
    label: 'SIGNIFICANCE',
    title: 'Narrative Significance',
    placeholder: true,
    content:
      '[LORE PLACEHOLDER] — Skmoonly will write this section. Document Shorekeeper\'s role in the broader Wuthering Waves narrative: her connection to the Rover\'s journey, key events she is tied to, and why she is central to the Black Shores storyline.',
  },
]

export default function LorePage() {
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
      {/* ── Page title ── */}
      <div>
        <PrefixedLabel label="TETHYS SYSTEM — CLASSIFICATION: UNRESTRICTED" dim />
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
          Subject Dossier — Shorekeeper
        </h1>
      </div>

      {/* ── Main content + sidebar ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 260px',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: lore sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {LORE_SECTIONS.map((section, i) => (
            <TerminalPanel key={section.id} size="mid" label={section.label} rails delay={i * 0.1}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: '#e0f0ff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                {section.title}
              </h2>
              {section.placeholder ? (
                <PlaceholderBlock text={section.content} />
              ) : (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: '#c8dff5',
                    lineHeight: 1.8,
                  }}
                >
                  {section.content}
                </p>
              )}
            </TerminalPanel>
          ))}
        </div>

        {/* Right: character stat block */}
        <div
          style={{
            position: 'sticky',
            top: 120,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {/* Stat block panel */}
          <TerminalPanel size="utility" label="SUBJECT FILE" rails={false}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Art placeholder */}
              <div
                style={{
                  width: '100%',
                  height: 140,
                  background:
                    'linear-gradient(135deg, rgba(0,68,187,0.12), rgba(0,170,255,0.04))',
                  border: '1px dashed rgba(0,170,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                }}
              >
                <PrefixedLabel label="ART" dim style={{ fontSize: '0.55rem' }} />
              </div>

              {/* Stats list */}
              {CHARACTER_STATS.map(({ label, value, icon }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--divider)',
                    paddingBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      color: 'var(--rail-text)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {icon} {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--accent-primary)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </TerminalPanel>

          {/* In-universe designation panel */}
          <TerminalPanel size="utility" label="DESIGNATION" rails={false}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                color: 'var(--accent-cyan)',
                letterSpacing: '0.08em',
                lineHeight: 1.7,
              }}
            >
              {CHARACTER.designation}
            </p>
          </TerminalPanel>
        </div>
      </div>
    </div>
  )
}

// ── Placeholder block ─────────────────────────────────────────────────────────
function PlaceholderBlock({ text }: { text: string }) {
  return (
    <div
      style={{
        padding: '16px',
        background: 'rgba(0,170,255,0.03)',
        border: '1px dashed rgba(0,170,255,0.15)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--rail-text)',
          lineHeight: 1.8,
          letterSpacing: '0.02em',
          fontStyle: 'italic',
        }}
      >
        {text}
      </p>
    </div>
  )
}
