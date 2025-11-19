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

const base64urlEncode = (payload: string) => {
  if (typeof window === 'undefined') {
    return Buffer.from(payload, 'utf-8').toString('base64url')
  }
  return window
    .btoa(payload)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

const base64urlDecode = (payload: string) => {
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
  if (typeof window === 'undefined') {
    return Buffer.from(normalized, 'base64').toString('utf-8')
  }
  const pad = normalized.length % 4
  const padded = pad ? normalized + '='.repeat(4 - pad) : normalized
  return window.atob(padded)
}

export const useBracket = () => {
  const results = useState<BracketResultRecord>('bracket-results', () => ({}))

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
        result.winnerSlot !== null ? participants[result.winnerSlot] ?? null : null
      const loser =
        result.winnerSlot !== null
          ? participants[result.winnerSlot === 0 ? 1 : 0] ?? null
          : null

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

  const setMatchResult = (matchId: string, data: Partial<MatchResult>) => {
    const current = readResult(matchId)
    const merged: MatchResult = {
      winnerSlot:
        typeof data.winnerSlot === 'number' ? data.winnerSlot : current.winnerSlot,
      score: (data.score ?? current.score).map(value =>
        value === null || value === undefined
          ? null
          : Math.max(0, Math.min(4, Number(value)))
      ) as [number | null, number | null],
      updatedAt: Date.now()
    }

    results.value = {
      ...results.value,
      [matchId]: merged
    }
  }

  const clearMatchResult = (matchId: string) => {
    if (results.value[matchId]) {
      const { [matchId]: _, ...rest } = results.value
      results.value = rest
    }
  }

  const resetBracket = () => {
    results.value = {}
  }

  const encodeBracketState = () => {
    const compactEntries = Object.entries(results.value).filter(([, result]) => {
      return (
        result.winnerSlot !== null ||
        result.score.some(value => value !== null && value !== undefined)
      )
    })
    if (!compactEntries.length) return ''
    const payload = Object.fromEntries(compactEntries)
    return base64urlEncode(JSON.stringify(payload))
  }

  const decodeBracketState = (token: string) => {
    try {
      const json = base64urlDecode(token)
      const parsed = JSON.parse(json) as BracketResultRecord
      results.value = Object.fromEntries(
        Object.entries(parsed).map(([matchId, value]) => [
          matchId,
          {
            winnerSlot:
              value.winnerSlot === 0 || value.winnerSlot === 1 ? value.winnerSlot : null,
            score: Array.isArray(value.score) ? value.score : [null, null],
            updatedAt: Date.now()
          }
        ])
      )
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
    results,
    setMatchResult,
    clearMatchResult,
    resetBracket,
    encodeBracketState,
    decodeBracketState
  }
}

