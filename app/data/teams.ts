import type { Team } from '~/types/bracket'

const teams: Team[] = [
  {
    id: 'crazy-raccoon',
    name: 'Crazy Raccoon',
    shortName: 'CR',
    region: 'OWCS Asia - Korea',
    placement: 'Asia #1 Seed',
    seed: 1,
    accent: '#ff5470',
    logo: 'teams/38px-Crazy_Raccoon_2021_allmode.png',
    roster: [
      { name: 'LIP', role: 'damage' },
      { name: 'HeeSang', role: 'damage' },
      { name: 'SP1NT', role: 'damage' },
      { name: 'JunBin', role: 'tank' },
      { name: 'MAX', role: 'tank' },
      { name: 'CH0R0NG', role: 'support' },
      { name: 'Shu', role: 'support' }
    ]
  },
  {
    id: 'team-falcons',
    name: 'Team Falcons',
    shortName: 'TF',
    region: 'OWCS Asia - Korea',
    placement: 'Asia #2 Seed',
    seed: 5,
    accent: '#3b82f6',
    logo: 'teams/41px-Team_Falcons_2022_allmode.png',
    roster: [
      { name: 'Proper', role: 'damage' },
      { name: 'MER1T', role: 'damage' },
      { name: 'SOMEONE', role: 'tank' },
      { name: 'Hanbin', role: 'tank' },
      { name: 'ChiYo', role: 'support' },
      { name: 'Fielder', role: 'support' }
    ]
  },
  {
    id: 't1',
    name: 'T1',
    shortName: 'T1',
    region: 'OWCS Asia - Korea',
    placement: 'Asia #3 Seed',
    seed: 7,
    accent: '#f97316',
    logo: 'teams/100px-T1_2019_allmode.png',
    roster: [
      { name: 'Proud', role: 'damage' },
      { name: 'Viper', role: 'damage' },
      { name: 'ZEST', role: 'damage' },
      { name: 'DONGHAK', role: 'tank' },
      { name: 'Jasm1ne', role: 'tank' },
      { name: 'skewed', role: 'support' },
      { name: 'vigilante', role: 'support' }
    ]
  },
  {
    id: 'varrel',
    name: 'VARREL',
    shortName: 'VRL',
    region: 'OWCS Asia - Japan/Pacific',
    placement: 'Asia Pacific Champion',
    seed: 6,
    accent: '#8b5cf6',
    logo: 'teams/61px-VARREL_darkmode.png',
    roster: [
      { name: 'Nico', role: 'support' },
      { name: 'qki', role: 'damage' },
      { name: 'TOPDRAGON', role: 'damage' },
      { name: 'KSG', role: 'tank' },
      { name: 'Qloud', role: 'support' },
      { name: 'Mimoza', role: 'support' },
      { name: 'Sley', role: 'support' }
    ]
  },
  {
    id: 'team-liquid',
    name: 'Team Liquid',
    shortName: 'TL',
    region: 'OWCS North America',
    placement: 'NA #1 Seed',
    seed: 2,
    accent: '#06b6d4',
    logo: 'teams/44px-Team_Liquid_2024_darkmode.png',
    roster: [
      { name: 'TR33', role: 'damage' },
      { name: 'zeruhh', role: 'damage' },
      { name: 'Infekted', role: 'tank' },
      { name: 'Rupal', role: 'support' },
      { name: 'Vega', role: 'support' }
    ]
  },
  {
    id: 'spacestation',
    name: 'Spacestation Gaming',
    shortName: 'SSG',
    region: 'OWCS North America',
    placement: 'NA #2 Seed',
    seed: 9,
    accent: '#fbbf24',
    logo: 'teams/41px-Spacestation_Gaming_2021_allmode.png',
    roster: [
      { name: 'sugarfree', role: 'damage' },
      { name: 'Kronik', role: 'damage' },
      { name: 'Hawk', role: 'tank' },
      { name: 'cjay', role: 'support' },
      { name: 'Lep', role: 'support' }
    ]
  },
  {
    id: 'geekay',
    name: 'Geekay Esports',
    shortName: 'GK',
    region: 'OWCS North America',
    placement: 'NA #3 Seed',
    seed: 12,
    accent: '#10b981',
    logo: 'teams/67px-Geekay_Esports_2023_allmode.png',
    roster: [
      { name: 'Lethal', role: 'damage' },
      { name: 'WMaimone', role: 'damage' },
      { name: 'cuFFa', role: 'tank' },
      { name: 'UltraViolet', role: 'support' },
      { name: 'Admiral', role: 'support' }
    ]
  },
  {
    id: 'twisted-minds',
    name: 'Twisted Minds',
    shortName: 'TM',
    region: 'OWCS EMEA',
    placement: 'EMEA #1 Seed',
    seed: 3,
    accent: '#14b8a6',
    logo: 'teams/71px-Twisted_Minds_2023_allmode.png',
    roster: [
      { name: 'Quartz', role: 'damage' },
      { name: 'Youbi', role: 'damage' },
      { name: 'Seicoe', role: 'damage' },
      { name: 'KSAA', role: 'tank' },
      { name: 'TVNT', role: 'tank' },
      { name: 'FunnyAstro', role: 'support' },
      { name: 'Simple', role: 'support' }
    ]
  },
  {
    id: 'al-qadsiah',
    name: 'Al Qadsiah Esports',
    shortName: 'AQE',
    region: 'OWCS EMEA',
    placement: 'EMEA #2 Seed',
    seed: 11,
    accent: '#f59e0b',
    logo: 'teams/22px-Al-Qadsiah_2024_allmode.png',
    roster: [
      { name: 'LBBD7', role: 'damage' },
      { name: 'CheckMate', role: 'damage' },
      { name: 'ZIYAD', role: 'tank' },
      { name: 'Chase', role: 'tank' },
      { name: 'Haku', role: 'support' },
      { name: 'Landon', role: 'support' },
      { name: 'Kellex', role: 'support' }
    ]
  },
  {
    id: 'team-peps',
    name: 'Team Peps',
    shortName: 'Peps',
    region: 'OWCS EMEA',
    placement: 'EMEA #3 Seed',
    seed: 10,
    accent: '#ec4899',
    logo: 'teams/41px-Team_Peps_July_2022_allmode.png',
    roster: [
      { name: 'SoOn', role: 'damage' },
      { name: 'Zorrow', role: 'damage' },
      { name: 'Dip', role: 'damage' },
      { name: 'WillyS', role: 'tank' },
      { name: 'Xeriongdh', role: 'support' },
      { name: 'FDGod 🐸', role: 'support' }
    ]
  },
  {
    id: 'weibo-gaming',
    name: 'Weibo Gaming',
    shortName: 'WBG',
    region: 'OWCS China',
    placement: 'China #1 Seed',
    seed: 4,
    accent: '#dc2626',
    logo: 'teams/62px-Weibo_allmode.png',
    roster: [
      { name: 'Leave', role: 'damage' },
      { name: 'shy', role: 'damage' },
      { name: 'Apr1ta', role: 'damage' },
      { name: 'guxue', role: 'tank' },
      { name: 'Mew', role: 'support' },
      { name: 'Mmonk', role: 'support' }
    ]
  },
  {
    id: 'team-cc',
    name: 'Team CC',
    shortName: 'TCC',
    region: 'OWCS China',
    placement: 'China #2 Seed',
    seed: 8,
    accent: '#a855f7',
    logo: 'teams/53px-Team_CC_August_2025_allmode.png',
    roster: [
      { name: 'Kaneki', role: 'damage' },
      { name: 'Pineapple', role: 'damage' },
      { name: 'GAGA', role: 'tank' },
      { name: 'BILIDENG', role: 'tank' },
      { name: 'Farway2025', role: 'support' },
      { name: 'HaoYoQian', role: 'support' }
    ]
  }
]

export default teams

