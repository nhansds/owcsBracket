import type { MatchDefinition } from '~/types/bracket'

const matches: MatchDefinition[] = [
  {
    id: 'UBR1-A',
    label: 'Upper Round 1 · Match 1',
    stage: 'upper',
    roundLabel: 'Upper Round 1',
    bestOf: 'FT2',
    slots: [
      { type: 'team', teamId: 'spacestation' },
      { type: 'team', teamId: 'team-peps' }
    ]
  },
  {
    id: 'UBR1-B',
    label: 'Upper Round 1 · Match 2',
    stage: 'upper',
    roundLabel: 'Upper Round 1',
    bestOf: 'FT2',
    slots: [
      { type: 'team', teamId: 'al-qadsiah' },
      { type: 'team', teamId: 'geekay' }
    ]
  },
  {
    id: 'UBR1-C',
    label: 'Upper Round 1 · Match 3',
    stage: 'upper',
    roundLabel: 'Upper Round 1',
    bestOf: 'FT2',
    slots: [
      { type: 'team', teamId: 'team-cc' },
      { type: 'team', teamId: 't1' }
    ]
  },
  {
    id: 'UBR1-D',
    label: 'Upper Round 1 · Match 4',
    stage: 'upper',
    roundLabel: 'Upper Round 1',
    bestOf: 'FT2',
    slots: [
      { type: 'team', teamId: 'team-falcons' },
      { type: 'team', teamId: 'varrel' }
    ]
  },
  {
    id: 'UBQ-A',
    label: 'Upper Quarterfinal · Match 1',
    stage: 'upper',
    roundLabel: 'Upper Quarterfinals',
    bestOf: 'FT3',
    slots: [
      { type: 'team', teamId: 'crazy-raccoon' },
      { type: 'winner', matchId: 'UBR1-A' }
    ]
  },
  {
    id: 'UBQ-B',
    label: 'Upper Quarterfinal · Match 2',
    stage: 'upper',
    roundLabel: 'Upper Quarterfinals',
    bestOf: 'FT3',
    slots: [
      { type: 'team', teamId: 'weibo-gaming' },
      { type: 'winner', matchId: 'UBR1-B' }
    ]
  },
  {
    id: 'UBQ-C',
    label: 'Upper Quarterfinal · Match 3',
    stage: 'upper',
    roundLabel: 'Upper Quarterfinals',
    bestOf: 'FT3',
    slots: [
      { type: 'team', teamId: 'twisted-minds' },
      { type: 'winner', matchId: 'UBR1-C' }
    ]
  },
  {
    id: 'UBQ-D',
    label: 'Upper Quarterfinal · Match 4',
    stage: 'upper',
    roundLabel: 'Upper Quarterfinals',
    bestOf: 'FT3',
    slots: [
      { type: 'team', teamId: 'team-liquid' },
      { type: 'winner', matchId: 'UBR1-D' }
    ]
  },
  {
    id: 'LBR1-A',
    label: 'Lower Round 1 · Match 1',
    stage: 'lower',
    roundLabel: 'Lower Round 1',
    bestOf: 'FT2',
    slots: [
      { type: 'loser', matchId: 'UBQ-A' },
      { type: 'loser', matchId: 'UBR1-B' }
    ]
  },
  {
    id: 'LBR1-B',
    label: 'Lower Round 1 · Match 2',
    stage: 'lower',
    roundLabel: 'Lower Round 1',
    bestOf: 'FT2',
    slots: [
      { type: 'loser', matchId: 'UBQ-B' },
      { type: 'loser', matchId: 'UBR1-A' }
    ]
  },
  {
    id: 'LBR1-C',
    label: 'Lower Round 1 · Match 3',
    stage: 'lower',
    roundLabel: 'Lower Round 1',
    bestOf: 'FT2',
    slots: [
      { type: 'loser', matchId: 'UBQ-C' },
      { type: 'loser', matchId: 'UBR1-D' }
    ]
  },
  {
    id: 'LBR1-D',
    label: 'Lower Round 1 · Match 4',
    stage: 'lower',
    roundLabel: 'Lower Round 1',
    bestOf: 'FT2',
    slots: [
      { type: 'loser', matchId: 'UBQ-D' },
      { type: 'loser', matchId: 'UBR1-C' }
    ]
  },
  {
    id: 'LBR2-A',
    label: 'Lower Round 2 · Match 1',
    stage: 'lower',
    roundLabel: 'Lower Round 2',
    bestOf: 'FT3',
    slots: [
      { type: 'winner', matchId: 'LBR1-A' },
      { type: 'winner', matchId: 'LBR1-B' }
    ]
  },
  {
    id: 'LBR2-B',
    label: 'Lower Round 2 · Match 2',
    stage: 'lower',
    roundLabel: 'Lower Round 2',
    bestOf: 'FT3',
    slots: [
      { type: 'winner', matchId: 'LBR1-C' },
      { type: 'winner', matchId: 'LBR1-D' }
    ]
  },
  {
    id: 'UBS-A',
    label: 'Upper Semifinal · Match 1',
    stage: 'upper',
    roundLabel: 'Upper Semifinals',
    bestOf: 'FT3',
    slots: [
      { type: 'winner', matchId: 'UBQ-A' },
      { type: 'winner', matchId: 'UBQ-B' }
    ]
  },
  {
    id: 'UBS-B',
    label: 'Upper Semifinal · Match 2',
    stage: 'upper',
    roundLabel: 'Upper Semifinals',
    bestOf: 'FT3',
    slots: [
      { type: 'winner', matchId: 'UBQ-C' },
      { type: 'winner', matchId: 'UBQ-D' }
    ]
  },
  {
    id: 'LBQ-A',
    label: 'Lower Quarterfinal · Match 1',
    stage: 'lower',
    roundLabel: 'Lower Quarterfinals',
    bestOf: 'FT3',
    slots: [
      { type: 'loser', matchId: 'UBS-A' },
      { type: 'winner', matchId: 'LBR2-A' }
    ]
  },
  {
    id: 'LBQ-B',
    label: 'Lower Quarterfinal · Match 2',
    stage: 'lower',
    roundLabel: 'Lower Quarterfinals',
    bestOf: 'FT3',
    slots: [
      { type: 'loser', matchId: 'UBS-B' },
      { type: 'winner', matchId: 'LBR2-B' }
    ]
  },
  {
    id: 'UBF',
    label: 'Upper Bracket Final',
    stage: 'upper',
    roundLabel: 'Upper Final',
    bestOf: 'FT3',
    slots: [
      { type: 'winner', matchId: 'UBS-A' },
      { type: 'winner', matchId: 'UBS-B' }
    ]
  },
  {
    id: 'LBS',
    label: 'Lower Bracket Semifinal',
    stage: 'lower',
    roundLabel: 'Lower Semifinal',
    bestOf: 'FT3',
    slots: [
      { type: 'winner', matchId: 'LBQ-A' },
      { type: 'winner', matchId: 'LBQ-B' }
    ]
  },
  {
    id: 'LBF',
    label: 'Lower Bracket Final',
    stage: 'lower',
    roundLabel: 'Lower Final',
    bestOf: 'FT3',
    slots: [
      { type: 'winner', matchId: 'LBS' },
      { type: 'loser', matchId: 'UBF' }
    ]
  },
  {
    id: 'GF',
    label: 'Grand Final',
    stage: 'final',
    roundLabel: 'Grand Final',
    bestOf: 'FT4',
    slots: [
      { type: 'winner', matchId: 'UBF' },
      { type: 'winner', matchId: 'LBF' }
    ]
  }
]

export default matches

