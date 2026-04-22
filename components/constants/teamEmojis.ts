// components/constants/teamEmojis.ts
export const TEAM_EMOJIS: Record<string, string> = {
  MTL: "🔵⚪🔴",     // Canadiens - Bleu, Blanc, Rouge
  TOR: "🔵⚪",        // Maple Leafs - Bleu, Blanc
  BOS: "🟡⚫",        // Bruins - Jaune, Noir
  OTT: "🔴⚫",        // Senators - Rouge, Noir
  TB: "🔵⚪",         // Lightning - Bleu, Blanc
  FLA: "🔴🔵",        // Panthers - Rouge, Bleu
  DET: "🔴⚪",        // Red Wings - Rouge, Blanc
  BUF: "🔵🟡",        // Sabres - Bleu, Or
  NYR: "🔵🔴",        // Rangers - Bleu, Rouge
  NYI: "🔵🟠",        // Islanders - Bleu, Orange
  NJ: "🔴⚫",         // Devils - Rouge, Noir
  PIT: "⚫🟡",        // Penguins - Noir, Or
  PHI: "🟠⚫",        // Flyers - Orange, Noir
  WSH: "🔴🔵",        // Capitals - Rouge, Bleu
  CAR: "🔴⚫",        // Hurricanes - Rouge, Noir
  CBJ: "🔴🔵",        // Blue Jackets - Rouge, Bleu
  EDM: "🔵🟠",        // Oilers - Bleu, Orange
  CGY: "🔴🟡",        // Flames - Rouge, Jaune
  VAN: "🔵🟢",        // Canucks - Bleu, Vert
  SEA: "🔵🩵",        // Kraken - Bleu, Bleu clair
  LA: "⚫⚪",         // Kings - Noir, Blanc
  SJ: "🟢🟠",         // Sharks - Vert, Orange
  ANA: "🟠⚫",        // Ducks - Orange, Noir
  VGK: "🟡⚫",        // Golden Knights - Or, Noir
  COL: "🔴🔵",        // Avalanche - Rouge, Bleu
  DAL: "🟢⚫",        // Stars - Vert, Noir
  MIN: "🟢🔴",        // Wild - Vert, Rouge
  WPG: "🔵🔴",        // Jets - Bleu, Rouge
  NSH: "🟡🔵",        // Predators - Or, Bleu
  STL: "🔵🟡",        // Blues - Bleu, Or
  CHI: "🔴⚫",        // Blackhawks - Rouge, Noir
  UTA: "🔵🟡",        // Utah - Bleu, Jaune
};

// Fonction pour obtenir les emojis d'une équipe
export const getTeamEmojis = (abbrev: string): string => {
  return TEAM_EMOJIS[abbrev] || "🏒";
};