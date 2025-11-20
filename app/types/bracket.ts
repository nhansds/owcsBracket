export type SeriesFormat = 'FT2' | 'FT3' | 'FT4'

export type MatchStage = 'upper' | 'lower' | 'final'

export type PlayerRole = 'tank' | 'damage' | 'support'

export interface Player {
  name: string
  role: PlayerRole
}

export interface Team {
  id: string
  name: string
  shortName: string
  region: string
  placement: string
  seed: number
  accent: string
  logo: string
  roster: Player[]
}

export type MatchSlotSource =
  | { type: 'team'; teamId: Team['id'] }
  | { type: 'winner'; matchId: string }
  | { type: 'loser'; matchId: string }

export interface MatchDefinition {
  id: string
  label: string
  stage: MatchStage
  roundLabel: string
  bestOf: SeriesFormat
  slots: [MatchSlotSource, MatchSlotSource]
  matchNumber?: string
}

export interface MatchResult {
  winnerSlot: 0 | 1 | null
  score: [number | null, number | null]
  updatedAt?: number
}

export interface HydratedMatch extends MatchDefinition {
  participants: [Team | null, Team | null]
  result: MatchResult
  winner: Team | null
  loser: Team | null
  targetScore: number
}

export type BracketResultRecord = Record<string, MatchResult>

