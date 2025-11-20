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
      { name: 'LIP', role: 'damage', country: 'South Korea' },
      { name: 'HeeSang', role: 'damage', country: 'South Korea' },
      { name: 'SP1NT', role: 'damage', country: 'South Korea' },
      { name: 'JunBin', role: 'tank', country: 'South Korea' },
      { name: 'MAX', role: 'tank', country: 'South Korea' },
      { name: 'CH0R0NG', role: 'support', country: 'South Korea' },
      { name: 'Shu', role: 'support', country: 'South Korea' }
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
      { name: 'Proper', role: 'damage', country: 'South Korea' },
      { name: 'MER1T', role: 'damage', country: 'South Korea' },
      { name: 'SOMEONE', role: 'tank', country: 'South Korea' },
      { name: 'Hanbin', role: 'tank', country: 'South Korea' },
      { name: 'ChiYo', role: 'support', country: 'South Korea' },
      { name: 'Fielder', role: 'support', country: 'South Korea' }
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
      { name: 'Proud', role: 'damage', country: 'South Korea' },
      { name: 'Viper', role: 'damage', country: 'South Korea' },
      { name: 'ZEST', role: 'damage', country: 'South Korea' },
      { name: 'DONGHAK', role: 'tank', country: 'South Korea' },
      { name: 'Jasm1ne', role: 'tank', country: 'South Korea' },
      { name: 'skewed', role: 'support', country: 'South Korea' },
      { name: 'vigilante', role: 'support', country: 'South Korea' }
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
      { name: 'Nico', role: 'support', country: 'Japan' },
      { name: 'qki', role: 'damage', country: 'Japan' },
      { name: 'TOPDRAGON', role: 'damage', country: 'South Korea' },
      { name: 'KSG', role: 'tank', country: 'Japan' },
      { name: 'Qloud', role: 'support', country: 'Japan' },
      { name: 'Mimoza', role: 'support', country: 'Japan' },
      { name: 'Sley', role: 'support', country: 'South Korea' }
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
      { name: 'TR33', role: 'damage', country: 'United States' },
      { name: 'zeruhh', role: 'damage', country: 'United States' },
      { name: 'Infekted', role: 'tank', country: 'United States' },
      { name: 'Rupal', role: 'support', country: 'United States' },
      { name: 'Vega', role: 'support', country: 'United States' }
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
      { name: 'sugarfree', role: 'damage', country: 'United States' },
      { name: 'Kronik', role: 'damage', country: 'United States' },
      { name: 'Hawk', role: 'tank', country: 'United States' },
      { name: 'cjay', role: 'support', country: 'United States' },
      { name: 'Lep', role: 'support', country: 'United States' }
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
      { name: 'Lethal', role: 'damage', country: 'Turkey' },
      { name: 'WMaimone', role: 'damage', country: 'Wales' },
      { name: 'cuFFa', role: 'tank', country: 'Australia' },
      { name: 'UltraViolet', role: 'support', country: 'United States' },
      { name: 'Admiral', role: 'support', country: 'Estonia' }
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
      { name: 'Quartz', role: 'damage', country: 'Saudi Arabia' },
      { name: 'Youbi', role: 'damage', country: 'Saudi Arabia' },
      { name: 'Seicoe', role: 'damage', country: 'Austria' },
      { name: 'KSAA', role: 'tank', country: 'Saudi Arabia' },
      { name: 'TVNT', role: 'tank', country: 'Saudi Arabia' },
      { name: 'FunnyAstro', role: 'support', country: 'United Kingdom' },
      { name: 'Simple', role: 'support', country: 'South Korea' }
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
      { name: 'LBBD7', role: 'damage', country: 'Saudi Arabia' },
      { name: 'CheckMate', role: 'damage', country: 'South Korea' },
      { name: 'ZIYAD', role: 'tank', country: 'Saudi Arabia' },
      { name: 'Chase', role: 'tank', country: 'Ukraine' },
      { name: 'Haku', role: 'support', country: 'Saudi Arabia' },
      { name: 'Landon', role: 'support', country: 'United States' },
      { name: 'Kellex', role: 'support', country: 'Denmark' }
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
      { name: 'SoOn', role: 'damage', country: 'France' },
      { name: 'Zorrow', role: 'damage', country: 'Sweden' },
      { name: 'Dip', role: 'damage', country: 'France' },
      { name: 'WillyS', role: 'tank', country: 'Sweden' },
      { name: 'Xeriongdh', role: 'support', country: 'France' },
      { name: 'FDGod 🐸', role: 'support', country: 'France' }
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
      { name: 'Leave', role: 'damage', country: 'China' },
      { name: 'shy', role: 'damage', country: 'China' },
      { name: 'Apr1ta', role: 'damage', country: 'China' },
      { name: 'guxue', role: 'tank', country: 'China' },
      { name: 'Mew', role: 'support', country: 'China' },
      { name: 'Mmonk', role: 'support', country: 'China' }
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
      { name: 'Kaneki', role: 'damage', country: 'China' },
      { name: 'Pineapple', role: 'damage', country: 'China' },
      { name: 'GAGA', role: 'tank', country: 'China' },
      { name: 'BILIDENG', role: 'tank', country: 'China' },
      { name: 'Farway2025', role: 'support', country: 'China' },
      { name: 'HaoYoQian', role: 'support', country: 'China' }
    ]
  }
]

export default teams

