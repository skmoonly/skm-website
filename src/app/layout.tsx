import type { Metadata } from 'next'
import { Oswald, Barlow, Space_Mono } from 'next/font/google'
import './globals.css'
import '@/styles/crt.css'
import '@/styles/runic-rail.css'
import CrtOverlay from '@/components/ui/CrtOverlay'
import SiteHeader from '@/components/nav/SiteHeader'
import SiteNav from '@/components/nav/SiteNav'
import BootScreen from '@/components/boot/BootScreen'
import RouteFlash from '@/components/ui/RouteFlash'
import RouteProgress from '@/components/ui/RouteProgress'
import TethysTerminal from '@/components/terminal/TethysTerminal'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ShoreKeeperMains — Shorekeeper Wiki & Database',
  description:
    'The definitive fan resource for Shorekeeper from Wuthering Waves. Lore, builds, kit analysis, and the interactive Black Shores map.',
  metadataBase: new URL('https://shorekeepermains.com'),
  openGraph: {
    title: 'ShoreKeeperMains — Shorekeeper Wiki & Database',
    description:
      'Accessing Tethys Database — classified intel on Shorekeeper from Wuthering Waves.',
    siteName: 'ShoreKeeperMains',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShoreKeeperMains',
    description: 'The definitive Shorekeeper fan resource — lore, builds, kit, and the Black Shores map.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${barlow.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* Performance: preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'ShoreKeeperMains',
              url: 'https://shorekeepermains.com',
              description:
                'The definitive fan resource for Shorekeeper from Wuthering Waves.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://shorekeepermains.com/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>
        {/* Boot screen — client component, only shows on first visit */}
        <BootScreen />
        {/* Route progress bar — top of viewport */}
        <RouteProgress />
        {/* Route change flicker transition */}
        <RouteFlash />
        {/* Tethys Terminal overlay — backtick to toggle */}
        <TethysTerminal />
        {/* CRT scanline overlay + system controls */}
        <CrtOverlay />
        {/* Site shell */}
        <SiteHeader />
        <SiteNav />
        <main style={{ minHeight: 'calc(100vh - 120px)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
