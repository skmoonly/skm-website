'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'skm-sound'

/**
 * useAmbientDrone
 *
 * Generates a synthetic atmospheric drone entirely within the browser
 * using the Web Audio API. No external audio assets required.
 *
 * Architecture:
 *   [osc1: 55Hz sub]  ──┐
 *   [osc2: 110Hz]     ──┤──→ [gainNode: master 0.06] ──→ [destination]
 *   [osc3: 82.5Hz]    ──┘
 *        ↑
 *   [lfo: 0.08Hz sine] → modulates gainNode.gain for slow breathing
 */
export function useAmbientDrone() {
  const [isOn, setIsOn] = useState(false)
  const ctx = useRef<AudioContext | null>(null)
  const masterGain = useRef<GainNode | null>(null)
  const lfoGain = useRef<GainNode | null>(null)
  const oscillators = useRef<OscillatorNode[]>([])
  const lfo = useRef<OscillatorNode | null>(null)
  const initiated = useRef(false)

  // Read saved preference on mount — but don't auto-start audio
  // (browsers block AudioContext auto-play without user gesture)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    // We note the preference but don't autostart — user must click first
    if (saved === 'on') {
      // Will be started when the user interacts via toggle
    }
  }, [])

  const buildGraph = useCallback(() => {
    if (typeof window === 'undefined') return
    if (!ctx.current) {
      ctx.current = new AudioContext()
    }
    const audioCtx = ctx.current

    // Master gain — very quiet
    masterGain.current = audioCtx.createGain()
    masterGain.current.gain.setValueAtTime(0.001, audioCtx.currentTime)
    masterGain.current.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 2.5)

    // Lowpass filter to kill harshness
    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 220
    filter.Q.value = 0.8

    masterGain.current.connect(filter)
    filter.connect(audioCtx.destination)

    // LFO — slow breathe on master gain
    lfoGain.current = audioCtx.createGain()
    lfoGain.current.gain.value = 0.018 // amplitude of LFO modulation
    lfo.current = audioCtx.createOscillator()
    lfo.current.type = 'sine'
    lfo.current.frequency.value = 0.09
    lfo.current.connect(lfoGain.current)
    lfoGain.current.connect(masterGain.current.gain)
    lfo.current.start()

    // Oscillators — layered sub-bass drone
    const freqs: [OscillatorType, number, number][] = [
      ['sine', 55, 0],        // sub-bass fundamental
      ['sine', 110, 12],      // octave, slightly detuned
      ['sine', 82.5, -8],     // perfect fifth, detuned opposite
      ['triangle', 55, 5],    // triangle adds subtle odd harmonics
    ]

    oscillators.current = freqs.map(([type, freq, detune]) => {
      const osc = audioCtx.createOscillator()
      osc.type = type
      osc.frequency.value = freq
      osc.detune.value = detune
      osc.connect(masterGain.current!)
      osc.start()
      return osc
    })

    initiated.current = true
  }, [])

  const teardownGraph = useCallback(() => {
    oscillators.current.forEach((osc) => {
      try { osc.stop() } catch { /* already stopped */ }
    })
    lfo.current?.stop()
    oscillators.current = []
    lfo.current = null

    if (masterGain.current) {
      masterGain.current.gain.setValueAtTime(
        masterGain.current.gain.value,
        ctx.current!.currentTime
      )
      masterGain.current.gain.linearRampToValueAtTime(
        0.001,
        ctx.current!.currentTime + 1.2
      )
    }

    // Null refs but keep ctx alive for next time
    masterGain.current = null
    lfoGain.current = null
    initiated.current = false
  }, [])

  const toggle = useCallback(async () => {
    if (isOn) {
      teardownGraph()
      setIsOn(false)
      localStorage.setItem(STORAGE_KEY, 'off')
    } else {
      // Resume context if suspended (browser autoplay policy)
      if (ctx.current?.state === 'suspended') {
        await ctx.current.resume()
      }
      buildGraph()
      setIsOn(true)
      localStorage.setItem(STORAGE_KEY, 'on')
    }
  }, [isOn, buildGraph, teardownGraph])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try { teardownGraph() } catch { /* ignore */ }
      ctx.current?.close()
    }
  }, [teardownGraph])

  return { isOn, toggle }
}
