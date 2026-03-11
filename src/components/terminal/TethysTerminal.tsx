'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ABILITIES, BUILDS, COMMUNITY, PATCH_VERSION } from '@/data/shorekeeper'

// ── Terminal command definitions ──────────────────────────────────────────────
const LORE_TEXT = [
  '// TETHYS SYSTEM — CLASSIFIED DOSSIER',
  'SUBJECT: SHOREKEEPER — OVERSEER OF THE BLACK SHORES',
  '',
  'Status.......: ACTIVE',
  'Element......: Spectro',
  'Clearance....: UNRESTRICTED',
  '',
  '[LORE DATA PENDING — Skmoonly will populate this field]',
  'For the full dossier, navigate to // LORE in the main interface.',
]

const STATUS_LINES = [
  '// TETHYS SYSTEM STATUS — ALL NODES NOMINAL',
  '',
  'UPLINK...........: \x1b[32mONLINE\x1b[0m',
  'DATABASE.......: \x1b[32mSYNCED\x1b[0m',
  'DOSSIER INTEGRITY: \x1b[32mINTACT\x1b[0m',
  'STELLAR ARRAY...: \x1b[33mSTANDBY\x1b[0m',
  'CLASSIFIED FILES: \x1b[31mRESTRICTED\x1b[0m',
  '',
  `PATCH............: ${PATCH_VERSION}`,
  '',
  '> All systems nominal. Overseer available.',
]

function handleCommand(input: string): string[] {
  const trimmed = input.trim().toLowerCase()
  const [cmd, ...args] = trimmed.split(' ')

  switch (cmd) {
    case 'help':
      return [
        '\x1b[36m// AVAILABLE COMMANDS:\x1b[0m',
        '',
        '  help          lists all commands',
        '  lore          prints Shorekeeper classified dossier',
        '  builds        prints Best In Slot build summary',
        '  kit           lists all abilities',
        '  status        prints system status',
        '  discord       prints Discord invite link',
        '  whoami        returns your system designation',
        '  echo [text]   prints back your input',
        `  ver           prints current patch and site version`,
        '  clear         clears the terminal',
        '  exit          closes the terminal',
      ]

    case 'lore':
      return LORE_TEXT

    case 'builds': {
      const bis = BUILDS[0]
      return [
        '\x1b[36m// BEST IN SLOT — PATCH ' + PATCH_VERSION + '\x1b[0m',
        '',
        `Weapon.......: ${bis.weapon.name} (${bis.weapon.rarity}★)`,
        `Echo Set.....: ${bis.echoSet.name} (5-piece)`,
        `Main Echo....: ${bis.mainEcho.name}`,
        `ER Target....: ${bis.erTarget}`,
        `Skill Priority: ${bis.skillPriority}`,
        '',
        'For Budget and F2P builds, navigate to // BUILDS',
      ]
    }

    case 'kit': {
      const lines = ['\x1b[36m// SHOREKEEPER — ABILITY LIST\x1b[0m', '']
      for (const ab of ABILITIES) {
        lines.push(`  [${ab.type}]  ${ab.name}`)
      }
      lines.push('')
      lines.push('For full ability details, navigate to // KIT')
      return lines
    }

    case 'status':
      return STATUS_LINES

    case 'discord':
      return [
        '\x1b[36m// COMMUNITY LINKS\x1b[0m',
        '',
        `Discord..: ${COMMUNITY.discord.url}`,
        `Reddit...: ${COMMUNITY.reddit.url}`,
      ]

    case 'whoami':
      return [
        '\x1b[36m// SYSTEM DESIGNATION QUERY\x1b[0m',
        '',
        'Designation..: ROVER — BLACK SHORES ACCESS GRANTED',
        'Clearance....: UNRESTRICTED',
        'Status.......: TETHYS UPLINK ACTIVE',
        '',
        '> You know who you are.',
      ]

    case 'echo':
      if (args.length === 0) return ['// echo: missing operand']
      return [args.join(' ')]

    case 'ver':
      return [
        '\x1b[36m// VERSION INFORMATION\x1b[0m',
        '',
        `Patch..: Wuthering Waves ${PATCH_VERSION}`,
        `Site...: SKM v1.0.0`,
        `Build..: Phase 2 — Immersion Layer`,
      ]

    case 'clear':
      return ['__CLEAR__']

    case 'exit':
      return ['__EXIT__']

    case '':
      return []

    default:
      return [
        `\x1b[31m// ERROR: UNKNOWN COMMAND '${cmd}'\x1b[0m`,
        "Type 'help' for available commands.",
      ]
  }
}

// ── Terminal component ────────────────────────────────────────────────────────
export default function TethysTerminal() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  // We use a simple textarea-based terminal to avoid xterm.js SSR issues
  // and keep the implementation lean. The aesthetic is maintained via CSS.
  const [history, setHistory] = useState<string[]>([
    '\x1b[36m// TETHYS TERMINAL — v1.0\x1b[0m',
    '// Type \'help\' for available commands. Press \` or ESC to close.',
    '',
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Backtick toggle
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [history])

  const submitCommand = useCallback(() => {
    const trimmed = input.trim()
    const prompt = `\x1b[36m>\x1b[0m ${trimmed}`

    const result = handleCommand(trimmed)

    if (result[0] === '__CLEAR__') {
      setHistory([])
      setInput('')
      return
    }

    if (result[0] === '__EXIT__') {
      setOpen(false)
      setInput('')
      return
    }

    setHistory((prev) => [...prev, prompt, ...result, ''])

    if (trimmed) {
      setCmdHistory((prev) => [trimmed, ...prev].slice(0, 50))
    }
    setHistoryIndex(-1)
    setInput('')
  }, [input])

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitCommand()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1)
      setHistoryIndex(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIndex - 1, -1)
      setHistoryIndex(next)
      setInput(next === -1 ? '' : (cmdHistory[next] ?? ''))
    }
  }

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 8000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(4, 12, 26, 0.75)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false)
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: 720,
          maxWidth: '95vw',
          height: 480,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          // Chamfered border — outer glow ring
          clipPath:
            'polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 14px)',
          boxShadow: '0 0 0 2px #00aaff, 0 0 30px #0044bb, 0 0 80px rgba(0,68,187,0.4)',
          background: 'rgba(6, 14, 32, 0.98)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderBottom: '1px solid rgba(0,170,255,0.3)',
            background: 'rgba(0, 68, 187, 0.12)',
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              background: '#00aaff',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              flexShrink: 0,
              boxShadow: '0 0 4px #00aaff',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--accent-primary)',
              letterSpacing: '0.12em',
              fontWeight: 700,
              flex: 1,
            }}
          >
            // TETHYS TERMINAL — v1.0
          </span>
          <button
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--rail-text)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '0.08em',
              padding: '2px 6px',
            }}
          >
            [ESC]
          </button>
        </div>

        {/* Output area */}
        <div
          ref={outputRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            lineHeight: 1.8,
            color: '#c8dff5',
            letterSpacing: '0.03em',
          }}
        >
          {history.map((line, i) => (
            <TermLine key={i} text={line} />
          ))}
        </div>

        {/* Input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderTop: '1px solid rgba(0,170,255,0.2)',
            background: 'rgba(0, 68, 187, 0.06)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent-primary)',
              flexShrink: 0,
            }}
          >
            &gt;
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#e0f0ff',
              letterSpacing: '0.03em',
              caretColor: 'var(--accent-primary)',
            }}
          />
        </div>

        {/* Footer hint */}
        <div
          style={{
            padding: '4px 16px 6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'var(--contour)',
            letterSpacing: '0.1em',
            background: 'rgba(0,0,0,0.2)',
            flexShrink: 0,
          }}
        >
          // BACKTICK OR ESC TO CLOSE · ↑↓ COMMAND HISTORY · TYPE &apos;help&apos; FOR COMMANDS
        </div>
      </div>
    </div>
  )
}

// ── Render a line with basic ANSI colour support ─────────────────────────────
function TermLine({ text }: { text: string }) {
  // Parse basic ANSI escape codes for colours
  // Supports: \x1b[36m (cyan), \x1b[32m (green), \x1b[31m (red), \x1b[33m (yellow), \x1b[0m (reset)
  const ANSI_COLORS: Record<string, string> = {
    '36': 'var(--accent-cyan)',
    '32': '#4ade80',
    '31': '#f87171',
    '33': '#fbbf24',
    '0': 'inherit',
  }

  const parts: { text: string; color: string }[] = []
  let current = text
  let color = '#c8dff5'

  const regex = /\x1b\[(\d+)m/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(current)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: current.slice(lastIndex, match.index), color })
    }
    color = ANSI_COLORS[match[1]] ?? 'inherit'
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < current.length) {
    parts.push({ text: current.slice(lastIndex), color })
  }

  if (parts.length === 0) {
    parts.push({ text, color: '#c8dff5' })
  }

  return (
    <div style={{ minHeight: '1.5em' }}>
      {parts.map((p, i) => (
        <span key={i} style={{ color: p.color }}>
          {p.text}
        </span>
      ))}
    </div>
  )
}
