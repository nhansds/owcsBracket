import type { MatchDefinition } from '~/types/bracket'

const matches: MatchDefinition[] = [
  {
    id: 'M1',
    label: 'Upper Round 1 · Match 1',
    stage: 'upper',
    roundLabel: 'Upper Round 1',
    bestOf: 'FT2',
    matchNumber: 'M1',
    slots: [
      { type: 'team', teamId: 'team-cc' },
      { type: 'team', teamId: 't1' }
    ]
  },
  {
    id: 'M2',
    label: 'Upper Round 1 · Match 2',
    stage: 'upper',
    roundLabel: 'Upper Round 1',
    bestOf: 'FT2',
    matchNumber: 'M2',
    slots: [
      { type: 'team', teamId: 'team-falcons' },
      { type: 'team', teamId: 'varrel' }
    ]
  },
  {
    id: 'M3',
    label: 'Upper Round 1 · Match 3',
    stage: 'upper',
    roundLabel: 'Upper Round 1',
    bestOf: 'FT2',
    matchNumber: 'M3',
    slots: [
      { type: 'team', teamId: 'al-qadsiah' },
      { type: 'team', teamId: 'geekay' }
    ]
  },
  {
    id: 'M4',
    label: 'Upper Round 1 · Match 4',
    stage: 'upper',
    roundLabel: 'Upper Round 1',
    bestOf: 'FT2',
    matchNumber: 'M4',
    slots: [
      { type: 'team', teamId: 'spacestation' },
      { type: 'team', teamId: 'team-peps' }
    ]
  },
  {
    id: 'M5',
    label: 'Upper Round 2 · Match 1',
    stage: 'upper',
    roundLabel: 'Upper Round 2',
    bestOf: 'FT3',
    matchNumber: 'M5',
    slots: [
      { type: 'team', teamId: 'crazy-raccoon' },
      { type: 'winner', matchId: 'M4' }
    ]
  },
  {
    id: 'M6',
    label: 'Upper Round 2 · Match 2',
    stage: 'upper',
    roundLabel: 'Upper Round 2',
    bestOf: 'FT3',
    matchNumber: 'M6',
    slots: [
      { type: 'team', teamId: 'weibo-gaming' },
      { type: 'winner', matchId: 'M3' }
    ]
  },
  {
    id: 'M7',
    label: 'Upper Round 2 · Match 3',
    stage: 'upper',
    roundLabel: 'Upper Round 2',
    bestOf: 'FT3',
    matchNumber: 'M7',
    slots: [
      { type: 'team', teamId: 'twisted-minds' },
      { type: 'winner', matchId: 'M1' }
    ]
  },
  {
    id: 'M8',
    label: 'Upper Round 2 · Match 4',
    stage: 'upper',
    roundLabel: 'Upper Round 2',
    bestOf: 'FT3',
    matchNumber: 'M8',
    slots: [
      { type: 'team', teamId: 'team-liquid' },
      { type: 'winner', matchId: 'M2' }
    ]
  },
  {
    id: 'M9',
    label: 'Lower Round 1 · Match 1',
    stage: 'lower',
    roundLabel: 'Lower Round 1',
    bestOf: 'FT2',
    matchNumber: 'M9',
    slots: [
      { type: 'loser', matchId: 'M8' },
      { type: 'loser', matchId: 'M4' }
    ]
  },
  {
    id: 'M10',
    label: 'Lower Round 1 · Match 2',
    stage: 'lower',
    roundLabel: 'Lower Round 1',
    bestOf: 'FT2',
    matchNumber: 'M10',
    slots: [
      { type: 'loser', matchId: 'M7' },
      { type: 'loser', matchId: 'M3' }
    ]
  },
  {
    id: 'M11',
    label: 'Lower Round 1 · Match 3',
    stage: 'lower',
    roundLabel: 'Lower Round 1',
    bestOf: 'FT2',
    matchNumber: 'M11',
    slots: [
      { type: 'loser', matchId: 'M6' },
      { type: 'loser', matchId: 'M1' }
    ]
  },
  {
    id: 'M12',
    label: 'Lower Round 1 · Match 4',
    stage: 'lower',
    roundLabel: 'Lower Round 1',
    bestOf: 'FT2',
    matchNumber: 'M12',
    slots: [
      { type: 'loser', matchId: 'M5' },
      { type: 'loser', matchId: 'M2' }
    ]
  },
  {
    id: 'M13',
    label: 'Lower Round 2 · Match 1',
    stage: 'lower',
    roundLabel: 'Lower Round 2',
    bestOf: 'FT3',
    matchNumber: 'M13',
    slots: [
      { type: 'winner', matchId: 'M9' },
      { type: 'winner', matchId: 'M10' }
    ]
  },
  {
    id: 'M14',
    label: 'Lower Round 2 · Match 2',
    stage: 'lower',
    roundLabel: 'Lower Round 2',
    bestOf: 'FT3',
    matchNumber: 'M14',
    slots: [
      { type: 'winner', matchId: 'M11' },
      { type: 'winner', matchId: 'M12' }
    ]
  },
  {
    id: 'M15',
    label: 'Upper Semifinal · Match 1',
    stage: 'upper',
    roundLabel: 'Upper Semifinals',
    bestOf: 'FT3',
    matchNumber: 'M15',
    slots: [
      { type: 'winner', matchId: 'M5' },
      { type: 'winner', matchId: 'M6' }
    ]
  },
  {
    id: 'M16',
    label: 'Upper Semifinal · Match 2',
    stage: 'upper',
    roundLabel: 'Upper Semifinals',
    bestOf: 'FT3',
    matchNumber: 'M16',
    slots: [
      { type: 'winner', matchId: 'M7' },
      { type: 'winner', matchId: 'M8' }
    ]
  },
  {
    id: 'M17',
    label: 'Lower Round 3 · Match 1',
    stage: 'lower',
    roundLabel: 'Lower Round 3',
    bestOf: 'FT3',
    matchNumber: 'M17',
    slots: [
      { type: 'loser', matchId: 'M15' },
      { type: 'winner', matchId: 'M13' }
    ]
  },
  {
    id: 'M18',
    label: 'Lower Round 3 · Match 2',
    stage: 'lower',
    roundLabel: 'Lower Round 3',
    bestOf: 'FT3',
    matchNumber: 'M18',
    slots: [
      { type: 'loser', matchId: 'M16' },
      { type: 'winner', matchId: 'M14' }
    ]
  },
  {
    id: 'M19',
    label: 'Lower Semifinal',
    stage: 'lower',
    roundLabel: 'Lower Semifinal',
    bestOf: 'FT3',
    matchNumber: 'M19',
    slots: [
      { type: 'winner', matchId: 'M17' },
      { type: 'winner', matchId: 'M18' }
    ]
  },
  {
    id: 'UBF',
    label: 'Upper Bracket Final',
    stage: 'upper',
    roundLabel: 'Upper Final',
    bestOf: 'FT3',
    matchNumber: 'UBF',
    slots: [
      { type: 'winner', matchId: 'M15' },
      { type: 'winner', matchId: 'M16' }
    ]
  },
  {
    id: 'LBF',
    label: 'Lower Bracket Final',
    stage: 'lower',
    roundLabel: 'Lower Final',
    bestOf: 'FT3',
    matchNumber: 'LBF',
    slots: [
      { type: 'loser', matchId: 'UBF' },
      { type: 'winner', matchId: 'M19' }
    ]
  },
  {
    id: 'FINALS',
    label: 'Grand Final',
    stage: 'final',
    roundLabel: 'Grand Final',
    bestOf: 'FT4',
    matchNumber: 'FINALS',
    slots: [
      { type: 'winner', matchId: 'UBF' },
      { type: 'winner', matchId: 'LBF' }
    ]
  }
]

export default matches
