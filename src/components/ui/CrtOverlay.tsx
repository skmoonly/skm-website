'use client'

import { useEffect, useState } from 'react'

// Runic characters that look like alien/classified script at low opacity
const RUNIC_CHARS =
  'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ⌬⌭⌮⏣⟁⟂⟃⟄⋮⋯⋰⋱░▒▓│┃┆┇┊┋╎╏║▌▍▋█⊞⊟⊠⊡'

function generateRailContent(length = 200): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += RUNIC_CHARS[Math.floor(Math.random() * RUNIC_CHARS.length)]
    if (i % 1 === 0) result += '\n'
  }
  return result + result
}

// ── CRT Overlay ──────────────────────────────────────────────────────────────
export default function CrtOverlay() {
  const [crtOn, setCrtOn] = useState(true)

  // Read persisted CRT preference on mount
  useEffect(() => {
    const stored = localStorage.getItem('skm-crt')
    if (stored === 'off') {
      setCrtOn(false)
      document.documentElement.setAttribute('data-crt', 'off')
    }
  }, [])

  const toggleCrt = () => {
    const next = !crtOn
    setCrtOn(next)
    if (next) {
      document.documentElement.removeAttribute('data-crt')
      localStorage.setItem('skm-crt', 'on')
    } else {
      document.documentElement.setAttribute('data-crt', 'off')
      localStorage.setItem('skm-crt', 'off')
    }
  }

  return (
    <>
      {/* Scanline overlay */}
      <div className="skm-crt-overlay" aria-hidden="true" />

      {/* CRT toggle — fixed bottom-right */}
      <button
        className="skm-crt-toggle"
        style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 10000 }}
        onClick={toggleCrt}
        aria-label={crtOn ? 'Disable CRT scanlines' : 'Enable CRT scanlines'}
        title="Toggle CRT scanlines"
      >
        {crtOn ? '// CRT ON' : '// CRT OFF'}
      </button>
    </>
  )
}

// ── useCrt hook ───────────────────────────────────────────────────────────────
export function useCrt() {
  const [crtOn, setCrtOn] = useState(true)
  useEffect(() => {
    const stored = localStorage.getItem('skm-crt')
    setCrtOn(stored !== 'off')
  }, [])
  return crtOn
}

// ── Rail content generator (exported for TerminalPanel) ──────────────────────
export { generateRailContent }
