/**
 * Mapping des noms de pays vers leurs codes ISO
 */
const countryToCode: Record<string, string> = {
  'South Korea': 'KR',
  'China': 'CN',
  'United States': 'US',
  'Saudi Arabia': 'SA',
  'Japan': 'JP',
  'France': 'FR',
  'Sweden': 'SE',
  'Australia': 'AU',
  'Austria': 'AT',
  'Denmark': 'DK',
  'Estonia': 'EE',
  'Turkey': 'TR',
  'Ukraine': 'UA',
  'United Kingdom': 'GB',
  'Wales': 'GB' // Le Pays de Galles utilise le même code que le Royaume-Uni
}

/**
 * Convertit un code pays ISO (2 lettres) en URL d'image de drapeau SVG
 * @param countryCode - Code pays ISO à 2 lettres (ex: "FR", "US", "KR")
 * @returns URL de l'image du drapeau SVG
 */
export function getCountryFlagUrl(countryCode: string): string {
  if (!countryCode?.length || countryCode.length !== 2) {
    return ''
  }

  const code = countryCode.toUpperCase()
  // Utilise flagcdn.com pour les drapeaux SVG (gratuit et fiable)
  return `https://flagcdn.com/w20/${code.toLowerCase()}.png`
}

/**
 * Convertit un nom de pays en URL d'image de drapeau
 * @param countryName - Nom complet du pays (ex: "France", "South Korea")
 * @returns URL de l'image du drapeau SVG
 */
export function getFlagUrlFromCountryName(countryName: string): string {
  const code = countryToCode[countryName]
  if (!code) {
    return ''
  }
  return getCountryFlagUrl(code)
}

/**
 * Convertit un code pays ISO (2 lettres) en drapeau emoji Unicode (fallback)
 * @param countryCode - Code pays ISO à 2 lettres (ex: "FR", "US", "KR")
 * @returns Drapeau emoji Unicode
 */
export function getCountryFlagEmoji(countryCode: string): string {
  if (!countryCode?.length || countryCode.length !== 2) {
    return ''
  }

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + (char.codePointAt(0) ?? 0)) // 0x1F1E6 (A) = 127462, donc 127397 + 65 = 127462

  return String.fromCodePoint(...codePoints)
}

/**
 * Convertit un nom de pays en drapeau emoji (fallback)
 * @param countryName - Nom complet du pays (ex: "France", "South Korea")
 * @returns Drapeau emoji Unicode
 */
export function getFlagEmojiFromCountryName(countryName: string): string {
  const code = countryToCode[countryName]
  if (!code) {
    return ''
  }
  return getCountryFlagEmoji(code)
}

