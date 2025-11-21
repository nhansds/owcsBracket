import type { MatchDefinition } from '~/types/bracket'

const roundKey = (key: string) => `bracket.rounds.${key}`
const matchLabelKey = (id: string) => `bracket.matches.${id}.label`
const matchScheduleKey = (id: string) => `bracket.matches.${id}.schedule`

const matches: MatchDefinition[] = [
  {
    id: 'M1',
    labelKey: matchLabelKey('M1'),
    stage: 'upper',
    roundLabelKey: roundKey('upperRound1'),
    bestOf: 'FT2',
    scheduleLabelKey: matchScheduleKey('M1'),
    matchNumber: 'M1',
    slots: [
      { type: 'team', teamId: 'team-cc' },
      { type: 'team', teamId: 't1' }
    ]
  },
  {
    id: 'M2',
    labelKey: matchLabelKey('M2'),
    stage: 'upper',
    roundLabelKey: roundKey('upperRound1'),
    bestOf: 'FT2',
    scheduleLabelKey: matchScheduleKey('M2'),
    matchNumber: 'M2',
    slots: [
      { type: 'team', teamId: 'team-falcons' },
      { type: 'team', teamId: 'varrel' }
    ]
  },
  {
    id: 'M3',
    labelKey: matchLabelKey('M3'),
    stage: 'upper',
    roundLabelKey: roundKey('upperRound1'),
    bestOf: 'FT2',
    scheduleLabelKey: matchScheduleKey('M3'),
    matchNumber: 'M3',
    slots: [
      { type: 'team', teamId: 'al-qadsiah' },
      { type: 'team', teamId: 'geekay' }
    ]
  },
  {
    id: 'M4',
    labelKey: matchLabelKey('M4'),
    stage: 'upper',
    roundLabelKey: roundKey('upperRound1'),
    bestOf: 'FT2',
    scheduleLabelKey: matchScheduleKey('M4'),
    matchNumber: 'M4',
    slots: [
      { type: 'team', teamId: 'spacestation' },
      { type: 'team', teamId: 'team-peps' }
    ]
  },
  {
    id: 'M5',
    labelKey: matchLabelKey('M5'),
    stage: 'upper',
    roundLabelKey: roundKey('upperRound2'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M5'),
    matchNumber: 'M5',
    slots: [
      { type: 'team', teamId: 'crazy-raccoon' },
      { type: 'winner', matchId: 'M4' }
    ]
  },
  {
    id: 'M6',
    labelKey: matchLabelKey('M6'),
    stage: 'upper',
    roundLabelKey: roundKey('upperRound2'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M6'),
    matchNumber: 'M6',
    slots: [
      { type: 'team', teamId: 'weibo-gaming' },
      { type: 'winner', matchId: 'M3' }
    ]
  },
  {
    id: 'M7',
    labelKey: matchLabelKey('M7'),
    stage: 'upper',
    roundLabelKey: roundKey('upperRound2'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M7'),
    matchNumber: 'M7',
    slots: [
      { type: 'team', teamId: 'twisted-minds' },
      { type: 'winner', matchId: 'M1' }
    ]
  },
  {
    id: 'M8',
    labelKey: matchLabelKey('M8'),
    stage: 'upper',
    roundLabelKey: roundKey('upperRound2'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M8'),
    matchNumber: 'M8',
    slots: [
      { type: 'team', teamId: 'team-liquid' },
      { type: 'winner', matchId: 'M2' }
    ]
  },
  {
    id: 'M9',
    labelKey: matchLabelKey('M9'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerRound1'),
    bestOf: 'FT2',
    scheduleLabelKey: matchScheduleKey('M9'),
    matchNumber: 'M9',
    slots: [
      { type: 'loser', matchId: 'M8' },
      { type: 'loser', matchId: 'M4' }
    ]
  },
  {
    id: 'M10',
    labelKey: matchLabelKey('M10'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerRound1'),
    bestOf: 'FT2',
    scheduleLabelKey: matchScheduleKey('M10'),
    matchNumber: 'M10',
    slots: [
      { type: 'loser', matchId: 'M7' },
      { type: 'loser', matchId: 'M3' }
    ]
  },
  {
    id: 'M11',
    labelKey: matchLabelKey('M11'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerRound1'),
    bestOf: 'FT2',
    scheduleLabelKey: matchScheduleKey('M11'),
    matchNumber: 'M11',
    slots: [
      { type: 'loser', matchId: 'M6' },
      { type: 'loser', matchId: 'M1' }
    ]
  },
  {
    id: 'M12',
    labelKey: matchLabelKey('M12'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerRound1'),
    bestOf: 'FT2',
    scheduleLabelKey: matchScheduleKey('M12'),
    matchNumber: 'M12',
    slots: [
      { type: 'loser', matchId: 'M5' },
      { type: 'loser', matchId: 'M2' }
    ]
  },
  {
    id: 'M13',
    labelKey: matchLabelKey('M13'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerRound2'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M13'),
    matchNumber: 'M13',
    slots: [
      { type: 'winner', matchId: 'M9' },
      { type: 'winner', matchId: 'M10' }
    ]
  },
  {
    id: 'M14',
    labelKey: matchLabelKey('M14'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerRound2'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M14'),
    matchNumber: 'M14',
    slots: [
      { type: 'winner', matchId: 'M11' },
      { type: 'winner', matchId: 'M12' }
    ]
  },
  {
    id: 'M15',
    labelKey: matchLabelKey('M15'),
    stage: 'upper',
    roundLabelKey: roundKey('upperSemifinals'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M15'),
    matchNumber: 'M15',
    slots: [
      { type: 'winner', matchId: 'M5' },
      { type: 'winner', matchId: 'M6' }
    ]
  },
  {
    id: 'M16',
    labelKey: matchLabelKey('M16'),
    stage: 'upper',
    roundLabelKey: roundKey('upperSemifinals'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M16'),
    matchNumber: 'M16',
    slots: [
      { type: 'winner', matchId: 'M7' },
      { type: 'winner', matchId: 'M8' }
    ]
  },
  {
    id: 'M17',
    labelKey: matchLabelKey('M17'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerRound3'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M17'),
    matchNumber: 'M17',
    slots: [
      { type: 'loser', matchId: 'M15' },
      { type: 'winner', matchId: 'M13' }
    ]
  },
  {
    id: 'M18',
    labelKey: matchLabelKey('M18'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerRound3'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M18'),
    matchNumber: 'M18',
    slots: [
      { type: 'loser', matchId: 'M16' },
      { type: 'winner', matchId: 'M14' }
    ]
  },
  {
    id: 'M19',
    labelKey: matchLabelKey('M19'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerSemifinal'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('M19'),
    matchNumber: 'M19',
    slots: [
      { type: 'winner', matchId: 'M17' },
      { type: 'winner', matchId: 'M18' }
    ]
  },
  {
    id: 'UBF',
    labelKey: matchLabelKey('UBF'),
    stage: 'upper',
    roundLabelKey: roundKey('upperFinal'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('UBF'),
    matchNumber: 'UBF',
    slots: [
      { type: 'winner', matchId: 'M15' },
      { type: 'winner', matchId: 'M16' }
    ]
  },
  {
    id: 'LBF',
    labelKey: matchLabelKey('LBF'),
    stage: 'lower',
    roundLabelKey: roundKey('lowerFinal'),
    bestOf: 'FT3',
    scheduleLabelKey: matchScheduleKey('LBF'),
    matchNumber: 'LBF',
    slots: [
      { type: 'loser', matchId: 'UBF' },
      { type: 'winner', matchId: 'M19' }
    ]
  },
  {
    id: 'FINALS',
    labelKey: matchLabelKey('FINALS'),
    stage: 'final',
    roundLabelKey: roundKey('grandFinal'),
    bestOf: 'FT4',
    scheduleLabelKey: matchScheduleKey('FINALS'),
    matchNumber: 'FINALS',
    slots: [
      { type: 'winner', matchId: 'UBF' },
      { type: 'winner', matchId: 'LBF' }
    ]
  }
]

export default matches
