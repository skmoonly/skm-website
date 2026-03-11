import TerminalPanel from '@/components/ui/TerminalPanel'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import BuildCard from '@/components/builds/BuildCard'
import BackToTop from '@/components/ui/BackToTop'
import { BUILDS, TEAM_COMPS, PATCH_VERSION } from '@/data/shorekeeper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Builds — Shorekeeper | SKM',
  description:
    'Best-in-slot, budget, and F2P build recommendations for Shorekeeper in Wuthering Waves. Updated for patch 3.2.',
}

export default function BuildsPage() {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      {/* ── Page header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <PrefixedLabel label="TETHYS CLASSIFICATION — COMBAT LOADOUT" dim />
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
            Build Recommendations
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

        {/* Patch indicator */}
        <div
          style={{
            padding: '10px 20px',
            background: 'rgba(0,68,187,0.12)',
            border: '1px solid rgba(0,170,255,0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 3,
          }}
        >
          <PrefixedLabel label="LAST UPDATED" dim style={{ fontSize: '0.5rem' }} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--accent-primary)',
              letterSpacing: '0.12em',
            }}
          >
            PATCH {PATCH_VERSION}
          </span>
        </div>
      </div>

      {/* ── Build Cards ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {BUILDS.map((build) => (
          <BuildCard key={build.id} build={build} />
        ))}
      </div>

      {/* ── Section divider ── */}
      <Divider label="TEAM COMPOSITIONS" />

      {/* ── Team Comps ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {TEAM_COMPS.map((comp) => (
          <TerminalPanel key={comp.name} size="mid" label={comp.difficulty.toUpperCase()} rails={false}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#e0f0ff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {comp.name}
              </h3>

              {/* Team members */}
              <div style={{ display: 'flex', gap: 8 }}>
                {comp.members.map((member, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      padding: '8px 6px',
                      background: 'rgba(0,68,187,0.1)',
                      border: '1px solid rgba(0,170,255,0.2)',
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: member === 'Shorekeeper' ? 'var(--accent-cyan)' : '#c8dff5',
                        fontWeight: member === 'Shorekeeper' ? 700 : 400,
                        letterSpacing: '0.04em',
                        display: 'block',
                      }}
                    >
                      {member}
                    </span>
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  color: '#7ab2d4',
                  lineHeight: 1.6,
                }}
              >
                {comp.note}
              </p>
            </div>
          </TerminalPanel>
        ))}
      </div>

      {/* ── Credits ── */}
      <div
        style={{
          padding: '16px',
          background: 'rgba(0,68,187,0.05)',
          border: '1px dashed rgba(0,170,255,0.1)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'var(--contour)',
            letterSpacing: '0.08em',
            lineHeight: 1.7,
          }}
        >
          // DATA SOURCES: Prydwen.gg · wutheringlab.com · lootbar.gg ·
          wutheringwaves.gg — All data sourced from public wikis and must be
          verified by Skmoonly against in-game sources before this site goes live.
          Patch accuracy is not guaranteed.
        </p>
      </div>
      {/* Back to top — appears after 400px scroll */}
      <BackToTop />
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,170,255,0.3))',
        }}
      />
      <PrefixedLabel label={label} dim />
      <div
        style={{
          flex: 1,
          height: 1,
          background: 'linear-gradient(90deg, rgba(0,170,255,0.3), transparent)',
        }}
      />
    </div>
  )
}
