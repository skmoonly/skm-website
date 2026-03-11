'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import '@/styles/leaflet-overrides.css'
import MapFilterSidebar from '@/components/map/MapFilterSidebar'
import MapDetailPanel from '@/components/map/MapDetailPanel'
import PrefixedLabel from '@/components/ui/PrefixedLabel'
import type { MapMarker } from '@/components/map/BlackShoresMap'

// Dynamic import — Leaflet requires browser APIs
const BlackShoresMap = dynamic(
  () => import('@/components/map/BlackShoresMap'),
  { ssr: false }
)

// ── Category definitions ──────────────────────────────────────────────────────
const CATEGORY_DEFS = [
  { key: 'beacon', label: 'BEACONS', color: '#00d4ff' },
  { key: 'boss', label: 'BOSSES', color: '#f87171' },
  { key: 'quest', label: 'QUESTS', color: '#fbbf24' },
]

export default function MapPage() {
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(
    new Set(['beacon', 'boss', 'quest'])
  )
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null)

  // Load marker data from static JSON
  useEffect(() => {
    fetch('/data/map-markers.json')
      .then((r) => r.json())
      .then((data) => setMarkers(data.markers ?? []))
      .catch((err) => console.error('Failed to load map markers:', err))
  }, [])

  const toggleCategory = useCallback((category: string) => {
    setVisibleCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }, [])

  const handleSelectMarker = useCallback((marker: MapMarker) => {
    setSelectedMarker(marker)
  }, [])

  const handleClosePanel = useCallback(() => {
    setSelectedMarker(null)
  }, [])

  // Count markers per category
  const categoriesWithCounts = CATEGORY_DEFS.map((def) => ({
    ...def,
    count: markers.filter((m) => m.category === def.key).length,
  }))

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 100px)',
        overflow: 'hidden',
      }}
    >
      {/* Map title overlay */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        <PrefixedLabel label="TETHYS SYSTEM — BLACK SHORES OPERATIONAL MAP" dim />
      </div>

      {/* Leaflet map */}
      <BlackShoresMap
        markers={markers}
        visibleCategories={visibleCategories}
        selectedMarkerId={selectedMarker?.id ?? null}
        onSelectMarker={handleSelectMarker}
      />

      {/* Filter sidebar */}
      <MapFilterSidebar
        categories={categoriesWithCounts}
        visibleCategories={visibleCategories}
        onToggle={toggleCategory}
      />

      {/* Detail panel */}
      <MapDetailPanel marker={selectedMarker} onClose={handleClosePanel} />

      {/* Placeholder notice */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          zIndex: 1000,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          color: 'var(--contour)',
          letterSpacing: '0.08em',
          background: 'rgba(6,14,32,0.8)',
          padding: '4px 8px',
          border: '1px solid rgba(0,170,255,0.1)',
          pointerEvents: 'none',
        }}
      >
        // PLACEHOLDER MAP — REAL IMAGE PENDING
      </div>
    </div>
  )
}
