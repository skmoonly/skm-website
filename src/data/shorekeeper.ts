// ============================================================
// ShoreKeeper Static Data — Phase 1
// Source: Prydwen.gg, wutheringlab.com, wutheringwaves.gg
// ALL DATA MUST BE VERIFIED BY SKMOONLY BEFORE GO-LIVE
// ============================================================

export const PATCH_VERSION = '3.2'

// ── Character Overview ────────────────────────────────────────────────────────
export const CHARACTER = {
  name: 'Shorekeeper',
  title: 'Overseer of the Black Shores',
  element: 'Spectro',
  weapon: 'Rectifier',
  role: 'Support / Healer',
  rarity: 5,
  classification: 'S-TIER UNIVERSAL SUPPORT',
  // In-universe designation (lore framing)
  designation: 'TETHYS OVERSEER — CLASS: UNRESTRICTED',
  patchAdded: '1.3',
} as const

// ── Character Stats (for UI display) ─────────────────────────────────────────
export const CHARACTER_STATS = [
  { label: 'ELEMENT', value: 'Spectro', icon: '◈' },
  { label: 'WEAPON', value: 'Rectifier', icon: '⊞' },
  { label: 'ROLE', value: 'Support / Healer', icon: '✦' },
  { label: 'RARITY', value: '5★', icon: '★' },
  { label: 'TIER', value: 'S — Universal', icon: '⬡' },
  { label: 'STAT PRIORITY', value: 'Energy Regen', icon: '⟁' },
  { label: 'ER TARGET', value: '≥ 250%', icon: '⏣' },
] as const

// ── Abilities ─────────────────────────────────────────────────────────────────
// Source: wutheringwaves.gg, wutheringlab.com, fandom.com
// TO BE VERIFIED BY SKMOONLY

export const ABILITIES = [
  {
    id: 'normal-attack',
    type: 'NORMAL ATTACK',
    name: 'Unto Dawn',
    damageType: 'Spectro DMG',
    description:
      'Performs up to 4 consecutive attacks dealing Spectro DMG. Each hit generates a Collapsed Core near the struck enemy (max 5 active). Collapsed Cores convert into Flare Star Butterflies after 6s, tracking and attacking the target. If 5 Cores are active, the next Normal Attack instantly converts one.',
    keyMechanic: 'Collapsed Cores → Flare Star Butterflies',
    cooldown: null,
    cost: null,
  },
  {
    id: 'resonance-skill',
    type: 'RESONANCE SKILL',
    name: 'Chaos Theory',
    damageType: 'Spectro DMG',
    description:
      'Restores HP for all party members and summons 5 Dim Star Butterflies that automatically attack nearby enemies. Can be cast mid-air. Performing a basic attack immediately after casting skips the opening portion of the basic attack chain.',
    keyMechanic: 'AoE party heal + 5 Dim Star Butterflies',
    cooldown: '16s',
    cost: '30 Resonance Energy',
  },
  {
    id: 'forte-circuit',
    type: 'FORTE CIRCUIT',
    name: 'Astral Chord',
    damageType: 'Spectro DMG',
    description:
      'Empirical Data: Each basic attack, plunging attack, or Dodge Counter grants a stack (max 5). Basic Attack 3 grants 2 stacks.\n\nIllation: When 5 stacks are full, Heavy Attack consumes all stacks. On ground: 5 instances of Spectro DMG + pulls all nearby enemies. All Collapsed Cores instantly convert to Flare Star Butterflies.\n\nUnbound Form: Holding Normal Attack transforms Shorekeeper into a butterfly, increasing movement speed and auto-collecting nearby plants. Stamina drains continuously. On revert, Deductive Data converts to Empirical Data.',
    keyMechanic:
      'Forte stacks → Heavy Attack (Illation) for AoE pull + burst',
    cooldown: null,
    cost: '5 Empirical Data stacks',
  },
  {
    id: 'resonance-liberation',
    type: 'RESONANCE LIBERATION',
    name: 'End Loop',
    damageType: 'Spectro DMG',
    description:
      'Generates a Stellarealm centered on Shorekeeper for 30 seconds. The Stellarealm continuously restores HP for all nearby party members and evolves through three stages as allies use Intro Skills within it:\n\n• Outer Stellarealm: Continuous HP restoration.\n• Inner Stellarealm: Grants team +Crit Rate (scales with ER, max 12.5% at 250% ER).\n• Supernal Stellarealm: Grants team +Crit DMG (scales with ER, max 25% at 250% ER).\n\nCooldown: 25s — nearly continuous uptime.',
    keyMechanic: '30s Stellarealm → Crit Rate + Crit DMG buffs via ER scaling',
    cooldown: '25s',
    cost: '125 Resonance Energy',
  },
  {
    id: 'intro-skill',
    type: 'INTRO SKILL',
    name: 'Proof of Existence',
    damageType: 'Spectro DMG',
    description:
      'Has two variants:\n\nEnlightenment (default): After a short delay, heals all nearby party members and summons 5 butterflies to track and attack the target. Deals Resonance Skill DMG scaling with ATK.\n\nDiscernment (Supernal Stellarealm active): Replaces the first Intro Skill after a Supernal Stellarealm is generated. Consumes the Stellarealm, heals all nearby party members, and deals Spectro DMG to all nearby enemies — guaranteed critical hit, scales with max HP. Considered Resonance Liberation DMG. Can only trigger once per Supernal Stellarealm.',
    keyMechanic:
      'Discernment: guaranteed crit, HP-scaling nuke when Supernal is active',
    cooldown: null,
    cost: null,
  },
  {
    id: 'outro-skill',
    type: 'OUTRO SKILL',
    name: 'Binary Butterfly',
    damageType: 'Support',
    description:
      'Summons one Flare Star Butterfly and one Dim Star Butterfly to orbit the current on-field Resonator for up to 30 seconds.\n\n• DMG Amplify: All nearby party members\' DMG amplified by 15%.\n• Stagger Recovery: If the on-field Resonator is hit or launched, tapping Dodge allows immediate recovery — triggers a perfect dodge. Up to 5 uses.',
    keyMechanic: '+15% team DMG amplify + 5-use stagger recovery',
    cooldown: null,
    cost: null,
  },
] as const

// ── Builds ────────────────────────────────────────────────────────────────────
// Source: Prydwen.gg, lootbar.gg, wutheringlab.com
// TO BE VERIFIED BY SKMOONLY

export const BUILDS = [
  {
    id: 'bis',
    tier: 'BEST IN SLOT',
    label: 'BIS',
    weapon: {
      name: 'Stellar Symphony',
      rarity: 5,
      type: 'Rectifier',
      note: 'Signature weapon. Provides ER%, increases HP, restores Concerto Energy, and buffs team ATK after healing.',
    },
    echoSet: {
      name: 'Rejuvenating Glow',
      pieces: 5,
      bonus2: '+10% Healing Bonus',
      bonus5: '+15% ATK to all party members for 30s after healing an ally',
    },
    mainEcho: {
      name: 'Fallacy of No Return',
      note: 'HP-scaling damage, +10% team ER bonus, +10% team ATK for 20s',
    },
    statPriority: [
      { cost: 4, stat: 'Crit DMG or Healing Bonus' },
      { cost: 3, stat: 'Energy Regen × 2' },
      { cost: 1, stat: 'HP%' },
    ],
    substats: 'Energy Regen until 250% → HP% → Crit DMG',
    skillPriority: 'Intro Skill > Resonance Liberation > Resonance Skill',
    erTarget: '250%',
  },
  {
    id: 'budget',
    tier: 'BUDGET',
    label: 'BUDGET',
    weapon: {
      name: 'Variation',
      rarity: 4,
      type: 'Rectifier',
      note: 'Best 4★ option. Solid ER% and Concerto generation. Widely available.',
    },
    echoSet: {
      name: 'Rejuvenating Glow',
      pieces: 5,
      bonus2: '+10% Healing Bonus',
      bonus5: '+15% ATK to all party members for 30s after healing',
    },
    mainEcho: {
      name: 'Fallacy of No Return or Bell-Borne Geochelone',
      note: 'Fallacy preferred for damage + ER. Bell-Borne if shield is needed.',
    },
    statPriority: [
      { cost: 4, stat: 'Crit DMG or Healing Bonus' },
      { cost: 3, stat: 'Energy Regen × 1–2' },
      { cost: 1, stat: 'HP%' },
    ],
    substats: 'Energy Regen until 230–250% → HP% → Crit DMG',
    skillPriority: 'Intro Skill > Resonance Liberation > Resonance Skill',
    erTarget: '230–250%',
  },
  {
    id: 'f2p',
    tier: 'F2P',
    label: 'F2P',
    weapon: {
      name: 'Rectifier#25',
      rarity: 4,
      type: 'Rectifier',
      note: 'Craftable via in-game blueprint. ER% main stat — the key requirement.',
    },
    echoSet: {
      name: 'Rejuvenating Glow',
      pieces: 5,
      bonus2: '+10% Healing Bonus',
      bonus5: '+15% ATK to all party members for 30s after healing',
    },
    mainEcho: {
      name: 'Bell-Borne Geochelone',
      note: 'Provides a shield + team buff. Reliable F2P option.',
    },
    statPriority: [
      { cost: 4, stat: 'Healing Bonus' },
      { cost: 3, stat: 'Energy Regen × 2' },
      { cost: 1, stat: 'HP%' },
    ],
    substats: 'Energy Regen until 230%+ → HP%',
    skillPriority: 'Intro Skill > Resonance Liberation > Resonance Skill',
    erTarget: '230%+',
  },
] as const

// ── Team Compositions ─────────────────────────────────────────────────────────
export const TEAM_COMPS = [
  {
    name: 'Premium Universal',
    members: ['DPS of Choice', 'Zhezhi', 'Shorekeeper'],
    note: 'Replace Zhezhi with any off-field sub-DPS. Shorekeeper enables virtually any main DPS.',
    difficulty: 'Standard',
  },
  {
    name: 'Spectro Resonance',
    members: ['Phoebe', 'Spectro Rover', 'Shorekeeper'],
    note: 'Activates Spectro Resonance for additional buffs. Strong sustained damage.',
    difficulty: 'Standard',
  },
  {
    name: 'Carlotta Carry',
    members: ['Carlotta', 'Zhezhi', 'Shorekeeper'],
    note: 'High burst window team. Shorekeeper\'s Stellarealm perfectly scales Carlotta\'s crit window.',
    difficulty: 'Intermediate',
  },
  {
    name: 'Jinhsi Carry',
    members: ['Jinhsi', 'Zhezhi', 'Shorekeeper'],
    note: 'Spectro synergy. Jinhsi benefits heavily from Shorekeeper\'s crit buffs.',
    difficulty: 'Intermediate',
  },
  {
    name: 'Jiyan Carry',
    members: ['Jiyan', 'Mortefi', 'Shorekeeper'],
    note: 'Classic Aero team. Shorekeeper provides healing insurance and DMG amplify.',
    difficulty: 'Standard',
  },
] as const

// ── Community Links ───────────────────────────────────────────────────────────
export const COMMUNITY = {
  discord: {
    url: 'https://discord.gg/shorekeeper',
    label: 'DISCORD',
  },
  reddit: {
    url: 'https://www.reddit.com/r/ShorekeeperMains/',
    label: 'SUBREDDIT',
  },
} as const
