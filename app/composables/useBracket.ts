import { computed } from 'vue'
import teams from '~/data/teams'
import matchBlueprint from '~/data/matches'
import type {
  BracketResultRecord,
  HydratedMatch,
  MatchDefinition,
  MatchResult,
  MatchSlotSource,
  SeriesFormat,
  Team
} from '~/types/bracket'

const targetMap: Record<SeriesFormat, number> = {
  FT2: 2,
  FT3: 3,
  FT4: 4
}

const teamMap = Object.fromEntries(teams.map(team => [team.id, team]))
const matchMap = new Map(matchBlueprint.map(match => [match.id, match]))

const defaultResult = (): MatchResult => ({
  winnerSlot: null,
  score: [null, null]
})

const base64urlFromBytes = (bytes: Uint8Array) => {
  if (!bytes.length) {
    return ''
  }
  if (globalThis.window === undefined) {
    return Buffer.from(bytes).toString('base64url')
  }
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCodePoint(byte)
  }
  return globalThis.window
    .btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '')
}

const bytesFromBase64url = (payload: string) => {
  if (!payload) {
    return new Uint8Array()
  }
  if (globalThis.window === undefined) {
    return new Uint8Array(Buffer.from(payload, 'base64url'))
  }
  const normalized = payload.replaceAll('-', '+').replaceAll('_', '/')
  const pad = normalized.length % 4
  const padded = pad ? normalized + '='.repeat(4 - pad) : normalized
  const binary = globalThis.window.atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.codePointAt(index) ?? 0
  }
  return bytes
}

export const useBracket = () => {
  const results = useState<BracketResultRecord>('bracket-results', () => ({}))
  const isLocked = useState<boolean>('bracket-locked', () => false)

  const readResult = (matchId: string): MatchResult =>
    results.value[matchId] ?? defaultResult()

  const hydrateMatch = computed(() => {
    const cache = new Map<string, HydratedMatch>()

    const resolveSlot = (source: MatchSlotSource): Team | null => {
      if (source.type === 'team') {
        return teamMap[source.teamId] ?? null
      }
      const ref = matchMap.get(source.matchId)
      if (!ref) return null
      const resolved = computeMatch(ref)
      if (source.type === 'winner') return resolved.winner
      return resolved.loser
    }

    const computeMatch = (def: MatchDefinition): HydratedMatch => {
      if (cache.has(def.id)) {
        return cache.get(def.id)!
      }
      const participants = def.slots.map(slot => resolveSlot(slot)) as [
        Team | null,
        Team | null
      ]
      const result = readResult(def.id)
      const winner =
        result.winnerSlot === null ? null : participants[result.winnerSlot] ?? null
      let loser: Team | null = null
      if (result.winnerSlot !== null) {
        const loserSlot = result.winnerSlot === 0 ? 1 : 0
        loser = participants[loserSlot] ?? null
      }

      const hydrated: HydratedMatch = {
        ...def,
        participants,
        result,
        winner,
        loser,
        targetScore: targetMap[def.bestOf]
      }
      cache.set(def.id, hydrated)
      return hydrated
    }

    return matchBlueprint.map(match => computeMatch(match))
  })

  const matchesById = computed(() => {
    const dictionary: Record<string, HydratedMatch> = {}
    for (const match of hydrateMatch.value) {
      dictionary[match.id] = match
    }
    return dictionary
  })

  const getTargetScoreForMatch = (matchId: string) => {
    const def = matchMap.get(matchId)
    if (!def) {
      return 4
    }
    return targetMap[def.bestOf]
  }

  const setMatchResult = (matchId: string, data: Partial<MatchResult>) => {
    if (isLocked.value) return
    const targetScore = getTargetScoreForMatch(matchId)
    const current = readResult(matchId)
    const merged: MatchResult = {
      winnerSlot:
        typeof data.winnerSlot === 'number' ? data.winnerSlot : current.winnerSlot,
      score: (data.score ?? current.score).map(value =>
        value === null || value === undefined
          ? null
          : Math.max(0, Math.min(targetScore, Number(value)))
      ) as [number | null, number | null],
      updatedAt: Date.now()
    }

    results.value = {
      ...results.value,
      [matchId]: merged
    }
  }

  const clearMatchResult = (matchId: string) => {
    if (isLocked.value) return
    if (results.value[matchId]) {
      const { [matchId]: _, ...rest } = results.value
      results.value = rest
    }
  }

  const resetBracket = () => {
    if (isLocked.value) return
    results.value = {}
  }

  const encodeBracketState = () => {
    const bytes = new Uint8Array(matchBlueprint.length)
    let lastIndexWithData = -1

    for (let index = 0; index < matchBlueprint.length; index += 1) {
      const match = matchBlueprint[index]
      if (!match) continue
      const result = readResult(match.id)
      let winnerBits = 0
      if (result.winnerSlot === 0) {
        winnerBits = 1
      } else if (result.winnerSlot === 1) {
        winnerBits = 2
      }
      const encodeScore = (value: number | null | undefined) => {
        if (value === null || value === undefined) {
          return 7
        }
        return Math.max(0, Math.min(4, Number(value)))
      }
      const scoreA = encodeScore(result.score[0])
      const scoreB = encodeScore(result.score[1])
      const packed = winnerBits | (scoreA << 2) | (scoreB << 5)
      bytes[index] = packed
      if (packed !== 0) {
        lastIndexWithData = index
      }
    }

    if (lastIndexWithData === -1) {
      return ''
    }
    const payload = bytes.slice(0, lastIndexWithData + 1)
    return base64urlFromBytes(payload)
  }

  const decodeBracketState = (token: string) => {
    try {
      if (!token) {
        results.value = {}
        return true
      }
      const bytes = bytesFromBase64url(token)
      const next: BracketResultRecord = {}
      const matchCount = Math.min(bytes.length, matchBlueprint.length)

      for (let index = 0; index < matchCount; index += 1) {
        const byte = bytes[index] ?? 0
        if (byte === 0) continue
        const match = matchBlueprint[index]
        if (!match) continue
        const winnerBits = byte & 0b11
        const scoreABits = (byte >> 2) & 0b111
        const scoreBBits = (byte >> 5) & 0b111
        let winnerSlot: 0 | 1 | null = null
        if (winnerBits === 1) {
          winnerSlot = 0
        } else if (winnerBits === 2) {
          winnerSlot = 1
        }
        const decodeScore = (bits: number) => (bits === 7 ? null : bits)
        const score: [number | null, number | null] = [
          decodeScore(scoreABits),
          decodeScore(scoreBBits)
        ]
        if (
          winnerSlot !== null ||
          score.some(value => value !== null && value !== undefined)
        ) {
          next[match.id] = {
            winnerSlot,
            score,
            updatedAt: Date.now()
          }
        }
      }
      results.value = next
      return true
    } catch (error) {
      console.warn('Invalid bracket token', error)
      return false
    }
  }

  return {
    teams,
    matches: hydrateMatch,
    matchesById,
    getTargetScoreForMatch,
    results,
    setMatchResult,
    clearMatchResult,
    resetBracket,
    encodeBracketState,
    decodeBracketState,
    isLocked
  }
}

