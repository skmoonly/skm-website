'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// ── Types ─────────────────────────────────────────────────────────────────────
export interface MapMarker {
  id: string
  category: 'beacon' | 'boss' | 'quest'
  name: string
  position: [number, number]
  description: string
}

interface BlackShoresMapProps {
  markers: MapMarker[]
  visibleCategories: Set<string>
  selectedMarkerId: string | null
  onSelectMarker: (marker: MapMarker) => void
}

// ── Category icon config ──────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<
  string,
  { color: string; glow: string; symbol: string; label: string }
> = {
  beacon: {
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.5)',
    symbol: '◇',
    label: 'BEACON',
  },
  boss: {
    color: '#f87171',
    glow: 'rgba(248,113,113,0.5)',
    symbol: '✦',
    label: 'BOSS',
  },
  quest: {
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.5)',
    symbol: '★',
    label: 'QUEST',
  },
}

function createMarkerIcon(category: string, isSelected: boolean): L.DivIcon {
  const cfg = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.beacon
  const size = isSelected ? 20 : 14
  const glowSize = isSelected ? 32 : 20

  return L.divIcon({
    className: '', // no default leaflet class
    iconSize: [glowSize, glowSize],
    iconAnchor: [glowSize / 2, glowSize / 2],
    html: `
      <div style="
        width: ${glowSize}px;
        height: ${glowSize}px;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 0 ${isSelected ? '8' : '4'}px ${cfg.glow});
        transition: all 0.2s ease;
      ">
        <div style="
          width: ${size}px;
          height: ${size}px;
          background: ${cfg.color};
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          opacity: ${isSelected ? 1 : 0.85};
        "></div>
      </div>
    `,
  })
}

// ── Map bounds ────────────────────────────────────────────────────────────────
const MAP_BOUNDS: L.LatLngBoundsExpression = [
  [0, 0],
  [100, 100],
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function BlackShoresMap({
  markers,
  visibleCategories,
  selectedMarkerId,
  onSelectMarker,
}: BlackShoresMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#060e20',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--rail-text)',
            letterSpacing: '0.1em',
          }}
        >
          // INITIALIZING MAP UPLINK...
        </span>
      </div>
    )
  }

  const filteredMarkers = markers.filter((m) => visibleCategories.has(m.category))

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={MAP_BOUNDS}
      maxBounds={MAP_BOUNDS}
      maxBoundsViscosity={0.8}
      minZoom={1}
      maxZoom={5}
      zoom={2}
      zoomSnap={0.25}
      zoomDelta={0.5}
      attributionControl={false}
      style={{ width: '100%', height: '100%', background: '#060e20' }}
    >
      <ImageOverlay
        url="/images/map-placeholder.svg"
        bounds={MAP_BOUNDS}
      />

      {filteredMarkers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.position[1], marker.position[0]]}
          icon={createMarkerIcon(marker.category, marker.id === selectedMarkerId)}
          eventHandlers={{
            click: () => onSelectMarker(marker),
          }}
        >
          <Tooltip direction="top" offset={[0, -12]}>
            <span style={{ fontWeight: 700 }}>
              {CATEGORY_CONFIG[marker.category]?.symbol ?? '◈'}{' '}
              {marker.name}
            </span>
          </Tooltip>
        </Marker>
      ))}

      <MapCoordinateDisplay />
    </MapContainer>
  )
}

// ── Coordinate display — shows cursor position on map ─────────────────────────
function MapCoordinateDisplay() {
  const map = useMap()
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const handler = (e: L.LeafletMouseEvent) => {
      setCoords({
        x: Math.round(e.latlng.lng * 10) / 10,
        y: Math.round(e.latlng.lat * 10) / 10,
      })
    }
    map.on('mousemove', handler)
    return () => {
      map.off('mousemove', handler)
    }
  }, [map])

  if (!coords) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 8,
        left: 8,
        zIndex: 1000,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--rail-text)',
        letterSpacing: '0.1em',
        background: 'rgba(6,14,32,0.85)',
        padding: '4px 8px',
        border: '1px solid rgba(0,170,255,0.15)',
        pointerEvents: 'none',
      }}
    >
      X: {coords.x.toFixed(1)} · Y: {coords.y.toFixed(1)}
    </div>
  )
}
