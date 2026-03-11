import TerminalPanel from '@/components/ui/TerminalPanel'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import Link from 'next/link'
import { CHARACTER, BUILDS, COMMUNITY } from '@/data/shorekeeper'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ShoreKeeperMains — Shorekeeper Wiki & Database',
  description:
    'The definitive fan resource for Shorekeeper from Wuthering Waves. Lore, builds, kit analysis, and the interactive Black Shores map.',
}

export default function HomePage() {
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
      {/* ── Hero Panel ── */}
      <TerminalPanel size="hero" label="SHOREKEEPER — OVERSEER OF THE BLACK SHORES" rails delay={0}>
        <div
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            minHeight: 280,
          }}
        >
          {/* Character art placeholder */}
          <div
            style={{
              flexShrink: 0,
              width: 220,
              height: 280,
              background:
                'linear-gradient(135deg, rgba(0,68,187,0.15) 0%, rgba(0,170,255,0.05) 100%)',
              border: '1px dashed rgba(0,170,255,0.25)',
              clipPath:
                'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: '3rem',
                opacity: 0.3,
              }}
            >
              ◈
            </span>
            <PrefixedLabel label="ART PLACEHOLDER" dim style={{ fontSize: '0.55rem' }} />
          </div>

          {/* Character identity */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <PrefixedLabel label="SUBJECT CLASSIFIED — TETHYS SYSTEM" dim />
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: '#e0f0ff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginTop: 8,
                }}
              >
                Shorekeeper
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.12em',
                  marginTop: 4,
                }}
              >
                {CHARACTER.title}
              </p>
            </div>

            {/* Stat chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'ELEMENT', value: CHARACTER.element },
                { label: 'WEAPON', value: CHARACTER.weapon },
                { label: 'ROLE', value: CHARACTER.role },
                { label: 'TIER', value: 'S — Universal' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '8px 14px',
                    background: 'rgba(0,68,187,0.12)',
                    border: '1px solid rgba(0,170,255,0.2)',
                    gap: 3,
                  }}
                >
                  <PrefixedLabel label={label} dim style={{ fontSize: '0.5rem' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      color: '#c8dff5',
                      textTransform: 'uppercase',
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: '#7ab2d4',
                lineHeight: 1.7,
                maxWidth: 500,
              }}
            >
              The definitive reference for Shorekeeper — Wuthering Waves&apos; premier universal
              support. Lore dossiers, verified builds, full kit analysis, and the interactive
              Black Shores map.
            </p>
          </div>
        </div>
      </TerminalPanel>

      {/* ── Quick Access Row ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        {/* Latest Build quick card */}
        <Link href="/builds" style={{ textDecoration: 'none' }}>
          <TerminalPanel size="mid" label="LATEST BUILD" rails={false} delay={0.08}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <PrefixedLabel label="BEST IN SLOT — PATCH 3.2" />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#e0f0ff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {BUILDS[0].weapon.name}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.83rem',
                  color: '#7ab2d4',
                }}
              >
                {BUILDS[0].echoSet.name} · {BUILDS[0].mainEcho.name}
              </p>
              <PrefixedLabel label="VIEW FULL BUILDS →" style={{ marginTop: 4 }} />
            </div>
          </TerminalPanel>
        </Link>

        {/* Lore quick card */}
        <Link href="/lore" style={{ textDecoration: 'none' }}>
          <TerminalPanel size="mid" label="TETHYS DOSSIER" rails={false} delay={0.16}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <PrefixedLabel label="CLASSIFIED — SUBJECT FILE" />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#e0f0ff',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Overseer of the Black Shores
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.83rem',
                  color: '#7ab2d4',
                  fontStyle: 'italic',
                }}
              >
                [LORE PLACEHOLDER — Skmoonly will populate the full dossier]
              </p>
              <PrefixedLabel label="ACCESS DOSSIER →" style={{ marginTop: 4 }} />
            </div>
          </TerminalPanel>
        </Link>

        {/* Community card */}
        <TerminalPanel size="mid" label="COMMUNITY" rails={false} delay={0.24}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.83rem',
                color: '#7ab2d4',
              }}
            >
              Join the ShoreKeeperMains community.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <CommunityButton href={COMMUNITY.discord.url} label={COMMUNITY.discord.label} />
              <CommunityButton href={COMMUNITY.reddit.url} label={COMMUNITY.reddit.label} />
            </div>
          </div>
        </TerminalPanel>
      </div>

      {/* ── Section divider ── */}
      <Divider label="QUICK NAVIGATION" />

      {/* ── Nav shortcuts ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16,
        }}
      >
        {[
          { href: '/lore', label: 'LORE', desc: 'Classified dossier & backstory' },
          { href: '/kit', label: 'KIT', desc: 'Full ability breakdown' },
          { href: '/builds', label: 'BUILDS', desc: 'BIS, Budget, F2P' },
          { href: '/guide', label: 'GUIDE', desc: 'Rotations & team comps' },
        ].map(({ href, label, desc }, i) => (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <TerminalPanel size="utility" label={label} rails={false} delay={0.32 + i * 0.06}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  color: '#7ab2d4',
                  lineHeight: 1.5,
                }}
              >
                {desc}
              </p>
            </TerminalPanel>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function CommunityButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px',
        background: 'rgba(0,68,187,0.1)',
        border: '1px solid rgba(0,170,255,0.25)',
        textDecoration: 'none',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          color: 'var(--accent-primary)',
          fontWeight: 700,
        }}
      >
        // {label}
      </span>
      <span
        style={{
          marginLeft: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--rail-text)',
        }}
      >
        ↗
      </span>
    </a>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '8px 0' }}>
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
