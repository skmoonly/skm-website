import TerminalPanel from '@/components/ui/TerminalPanel'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gameplay Guide — Shorekeeper | SKM',
  description:
    'Rotation guide, team compositions, and gameplay tips for Shorekeeper in Wuthering Waves.',
}

// ── Guide sections — placeholder structure for Skmoonly to write ──────────────
const GUIDE_SECTIONS = [
  {
    id: 'rotation',
    label: 'ROTATION',
    title: 'Basic Rotation',
    note: 'How Shorekeeper fits into a standard 3-character rotation cycle.',
    placeholder:
      '[GUIDE PLACEHOLDER — Skmoonly writes this section] Provide a step-by-step rotation: which character starts, when Shorekeeper swaps in, when she activates Liberation, when she uses Intro/Outro skills, and how the Stellarealm stages are triggered. Include timing notes for maintaining ER breakpoint buffs.',
  },
  {
    id: 'advanced',
    label: 'ADVANCED',
    title: 'Advanced Techniques',
    note: 'Optimal Stellarealm management, Discernment trigger windows, and ER breakpoint theory.',
    placeholder:
      '[GUIDE PLACEHOLDER — Skmoonly writes this section] Cover advanced concepts: exactly how to trigger all 3 Stellarealm stages in one rotation, when Discernment is most valuable, how to stack Liberation uptime, energy management strategies, and situations where Bell-Borne is preferred over Fallacy.',
  },
  {
    id: 'beginner',
    label: 'BEGINNER',
    title: 'Beginner Tips',
    note: 'Getting started with Shorekeeper — key things to understand for new players.',
    placeholder:
      "[GUIDE PLACEHOLDER — Skmoonly writes this section] Explain the most important things for new Shorekeeper players: why ER matters and how to check it, the basics of the Stellarealm stages, when to use her skill vs. when to hold it, and common mistakes to avoid. Keep language accessible for players new to the character.",
  },
  {
    id: 'teams',
    label: 'TEAM COMPS',
    title: 'Team Composition Notes',
    note: 'How to choose the right team around Shorekeeper and who she pairs with best.',
    placeholder:
      '[GUIDE PLACEHOLDER — Skmoonly writes this section] Explain team-building philosophy with Shorekeeper as support: which DPS characters benefit most from her crit buffs, how to choose a sub-DPS alongside her, and notes on specific synergies (e.g. Jinhsi Spectro resonance, Carlotta crit window alignment). Reference the Builds page team comp lists.',
  },
  {
    id: 'synergies',
    label: 'SYNERGIES',
    title: 'Character Synergies',
    note: 'Characters who work exceptionally well alongside Shorekeeper.',
    placeholder:
      '[GUIDE PLACEHOLDER — Skmoonly writes this section] Break down individual character synergies: who benefits most from her 15% DMG amplify, who has Intro Skill timing that aligns with Stellarealm stages, and which characters have notable anti-synergies or considerations when running with her.',
  },
]

export default function GuidePage() {
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
        <PrefixedLabel label="TETHYS CLASSIFICATION — TACTICAL BRIEFING" dim />
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
          Gameplay Guide
        </h1>
      </div>

      {/* ── Status notice ── */}
      <TerminalPanel size="hero" label="DOCUMENT STATUS" rails={false}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 20,
          }}
        >
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>⏣</span>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent-primary)',
                letterSpacing: '0.06em',
                marginBottom: 6,
              }}
            >
              // GUIDE CONTENT — AWAITING AUTHOR INPUT
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: '#c8dff5',
                lineHeight: 1.7,
              }}
            >
              This guide is structure-ready. All sections below contain placeholder text indicating
              what Skmoonly will write. The layout, panels, and navigation are fully functional — only
              the written content needs to be filled in.
            </p>
          </div>
        </div>
      </TerminalPanel>

      {/* ── Guide sections ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {GUIDE_SECTIONS.map((section) => (
          <TerminalPanel key={section.id} size="hero" label={section.label} rails>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#e0f0ff',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {section.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: '#7ab2d4',
                    marginTop: 4,
                    lineHeight: 1.5,
                    fontStyle: 'italic',
                  }}
                >
                  {section.note}
                </p>
              </div>

              {/* Placeholder block */}
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
                    lineHeight: 1.9,
                    letterSpacing: '0.02em',
                    fontStyle: 'italic',
                  }}
                >
                  {section.placeholder}
                </p>
              </div>
            </div>
          </TerminalPanel>
        ))}
      </div>
    </div>
  )
}
