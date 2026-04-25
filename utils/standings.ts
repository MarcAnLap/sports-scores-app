// utils/standings.ts

export type Standing = {
  teamAbbrev: { default: string };
  conferenceName: string;
  divisionName: string;
  conferenceSequence: number;
  divisionSequence: number;
  wildcardSequence: number;
  clinchIndicator: string; // "p", "x", "y", "z", "e"
  points: number;
  regulationWins: number;
  streakCode: string;
  streakCount: number;
  placeName: { default: string };
};

export type StandingsResponse = {
  wildCardIndicator: boolean;
  standingsDateTimeUtc: string;
  standings: Standing[];
};

// Créer une map des standings par équipe
export const createStandingsMap = (standingsData: StandingsResponse) => {
  const map = new Map<string, Standing>();
  standingsData.standings.forEach((standing) => {
    const abbrev = standing.teamAbbrev.default;
    map.set(abbrev, standing);
  });
  return map;
};

// Obtenir le statut de qualification
export const getClinchingStatus = (standing: Standing | undefined) => {
  if (!standing) return null;

  const indicators: Record<
    string,
    { label: string; color: string; icon: string }
  > = {
    p: { label: "Champion Conférence", color: "text-yellow-400", icon: "🏆" },
    y: { label: "Champion Division", color: "text-yellow-500", icon: "⭐" },
    x: { label: "Qualifié", color: "text-green-400", icon: "✅" },
    z: { label: "Qualifié", color: "text-green-400", icon: "✅" },
    e: { label: "Éliminé", color: "text-red-400", icon: "❌" },
  };

  return indicators[standing.clinchIndicator] || null;
};

// Obtenir la position dans la conférence/division
export const getPositionLabel = (standing: Standing | undefined) => {
  if (!standing) return null;

  const isWildcard = standing.wildcardSequence > 0;
  const conference = standing.conferenceName === "Eastern" ? "E" : "O";

  let positionText = "";
  if (isWildcard) {
    positionText = `WC${standing.wildcardSequence}`;
  } else {
    positionText = `${standing.divisionSequence}e`;
  }

  return {
    text: `${conference}${positionText}`,
    tooltip: `${standing.placeName.default} - ${standing.points} pts`,
    isWildcard,
  };
};

// Obtenir le streak (série en cours)
export const getStreakText = (standing: Standing | undefined) => {
  if (!standing) return null;

  const streakMap: Record<string, string> = {
    W: "victoires",
    L: "défaites",
    OT: "défaites en prolongation",
  };

  const streakType = streakMap[standing.streakCode] || "matchs sans défaite";

  if (standing.streakCode === "W") {
    return `🔥 ${standing.streakCount} ${streakType} consécutives`;
  } else if (standing.streakCode === "L") {
    return `❌ ${standing.streakCount} ${streakType} consécutives`;
  }

  return null;
};