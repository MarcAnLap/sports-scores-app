// components/LiveUpdater.tsx
// "use client";

// import { useEffect, useState } from "react";
// import moment from 'moment-timezone';
// import Banner300x250 from "./Banner300x250";

// type Game = {
//   id: number;
//   gameState: "LIVE" | "FINAL" | "FUT" | "PRE" | "OFF";
//   startTimeUTC?: string;
//   period?: number;
//   clock?: {
//     timeRemaining: string;
//   };
//   homeTeam: {
//     abbrev: string;
//     score?: number;
//     name?: string;
//   };
//   awayTeam: {
//     abbrev: string;
//     score?: number;
//     name?: string;
//   };
// };

// // Couleurs des équipes NHL
// const teamColors: Record<string, { primary: string; secondary: string; text: string }> = {
//   MTL: { primary: "#AF1E2D", secondary: "#192168", text: "white" },
//   TOR: { primary: "#00205B", secondary: "#FFFFFF", text: "white" },
//   BOS: { primary: "#FFB81C", secondary: "#000000", text: "black" },
//   OTT: { primary: "#E31837", secondary: "#C69214", text: "white" },
//   TB: { primary: "#00205B", secondary: "#FFFFFF", text: "white" },
//   FLA: { primary: "#C8102E", secondary: "#041E42", text: "white" },
//   DET: { primary: "#CE1126", secondary: "#FFFFFF", text: "white" },
//   BUF: { primary: "#002654", secondary: "#FFB81C", text: "white" },
//   NYR: { primary: "#0038A8", secondary: "#CE1126", text: "white" },
//   NYI: { primary: "#00539B", secondary: "#F26926", text: "white" },
//   NJ: { primary: "#CE1126", secondary: "#000000", text: "white" },
//   PIT: { primary: "#000000", secondary: "#FCB514", text: "white" },
//   PHI: { primary: "#F74902", secondary: "#000000", text: "white" },
//   WSH: { primary: "#041E42", secondary: "#C8102E", text: "white" },
//   CAR: { primary: "#CC0000", secondary: "#000000", text: "white" },
//   CBJ: { primary: "#002654", secondary: "#CE1126", text: "white" },
//   EDM: { primary: "#041E42", secondary: "#FF4C00", text: "white" },
//   CGY: { primary: "#C8102E", secondary: "#F1BE48", text: "white" },
//   VAN: { primary: "#00205B", secondary: "#008852", text: "white" },
//   SEA: { primary: "#001628", secondary: "#99D9D9", text: "white" },
//   LA: { primary: "#000000", secondary: "#A2AAAD", text: "white" },
//   SJ: { primary: "#006272", secondary: "#EA7200", text: "white" },
//   ANA: { primary: "#F47A38", secondary: "#000000", text: "black" },
//   VGK: { primary: "#B4975A", secondary: "#333333", text: "white" },
//   COL: { primary: "#6F263D", secondary: "#236192", text: "white" },
//   DAL: { primary: "#006847", secondary: "#8F8F8F", text: "white" },
//   MIN: { primary: "#154734", secondary: "#A6192E", text: "white" },
//   WPG: { primary: "#041E42", secondary: "#AC162C", text: "white" },
//   NSH: { primary: "#FFB81C", secondary: "#041E42", text: "black" },
//   STL: { primary: "#002F87", secondary: "#FFB81C", text: "white" },
//   CHI: { primary: "#CE1126", secondary: "#000000", text: "white" },
//   UTA: { primary: "#6F263D", secondary: "#236192", text: "white" },
// };

// // Emojis des équipes
// const teamEmojis: Record<string, string> = {
//   MTL: "🔵⚪🔴", TOR: "🔵⚪", BOS: "🟡⚫", OTT: "🔴⚫", TB: "🔵⚪",
//   FLA: "🔴🔵", DET: "🔴⚪", BUF: "🔵🟡", NYR: "🔵🔴", NYI: "🔵🟠",
//   NJ: "🔴⚫", PIT: "⚫🟡", PHI: "🟠⚫", WSH: "🔴🔵", CAR: "🔴⚫",
//   CBJ: "🔴🔵", EDM: "🔵🟠", CGY: "🔴🟡", VAN: "🔵🟢", SEA: "🔵🩵",
//   LA: "⚫⚪", SJ: "🟢🟠", ANA: "🟠⚫", VGK: "🟡⚫", COL: "🔴🔵",
//   DAL: "🟢⚫", MIN: "🟢🔴", WPG: "🔵🔴", NSH: "🟡🔵", STL: "🔵🟡",
//   CHI: "🔴⚫", UTA: "🔵🟡",
// };

// export default function LiveUpdater({ initialGames }: { initialGames: Game[] }) {
//   const [games, setGames] = useState<Game[]>(initialGames);
//   const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
//   // Initialiser mounted à true directement (pas besoin de useEffect)
//   const [mounted] = useState(true);

//   const fetchLive = async () => {
//     try {
//       const res = await fetch("https://api-web.nhle.com/v1/schedule/now");
//       const data = await res.json();
//       const games = data.gameWeek?.[0]?.games || [];
//       setGames(games);
//       setLastUpdate(new Date());
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(fetchLive, 40000);
//     return () => clearInterval(interval);
//   }, []);

//   const getGameStatus = (game: Game) => {
//     if (game.gameState === "LIVE") return { label: "EN DIRECT", color: "text-red-500", icon: "🔴" };
//     if (game.gameState === "FINAL") return { label: "TERMINÉ", color: "text-gray-400", icon: "🏁" };
//     if (["PRE", "FUT"].includes(game.gameState)) return { label: "À VENIR", color: "text-blue-400", icon: "⏰" };
//     return { label: game.gameState, color: "text-gray-500", icon: "⏸" };
//   };

//   // Statistiques pour mobile/tablet
//   const stats = {
//     live: games.filter(g => g.gameState === "LIVE").length,
//     final: games.filter(g => g.gameState === "FINAL").length,
//     upcoming: games.filter(g => ["PRE", "FUT"].includes(g.gameState)).length,
//   };

//   // Formatage de l'heure avec moment-timezone
//   const formattedTime = moment(lastUpdate).tz('America/Toronto').format('HH:mm:ss');

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       {/* Barre d'info responsive */}
//       <div className="flex flex-wrap justify-between items-center mb-6 text-xs text-gray-500 gap-2">
//         <div className="flex gap-3">
//           <span>📊 {games.length} match{games.length > 1 ? 's' : ''}</span>
//           {stats.live > 0 && <span className="text-red-500">🔴 {stats.live} live</span>}
//           {stats.final > 0 && <span>🏁 {stats.final} finis</span>}
//           {stats.upcoming > 0 && <span>⏰ {stats.upcoming} à venir</span>}
//         </div>
//         {mounted && (
//           <span suppressHydrationWarning>Dernière mise à jour 🔄 {formattedTime}</span>
//         )}
//       </div>

//       <div className="grid gap-4 md:gap-6">
//         {games.map((game) => {
//           const status = getGameStatus(game);
//           const isLive = game.gameState === "LIVE";
//           const isFinal = game.gameState === "FINAL";
//           const isUpcoming = ["PRE", "FUT"].includes(game.gameState);
          
//           const gameTime = game.startTimeUTC
//             ? new Date(game.startTimeUTC).toLocaleTimeString("fr-CA", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 timeZone: "America/Toronto",
//               })
//             : "À venir";

//           const awayColor = teamColors[game.awayTeam.abbrev] || { primary: "#374151", secondary: "#1F2937", text: "white" };
//           const homeColor = teamColors[game.homeTeam.abbrev] || { primary: "#374151", secondary: "#1F2937", text: "white" };
//           const awayEmojis = teamEmojis[game.awayTeam.abbrev] || "🏒";
//           const homeEmojis = teamEmojis[game.homeTeam.abbrev] || "🏒";

//           return (
//             <div
//               key={game.id}
//               className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
//               {isLive && <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none animate-pulse" />}
              
//               <div className="relative p-4 md:p-6">
//                 {/* Status Badge */}
//                 <div className="flex justify-between items-center mb-4">
//                   <div className={`text-xs font-bold px-3 py-1 rounded-full ${status.color} bg-gray-900/50 backdrop-blur-sm`}>
//                     <span className="inline-block mr-1">{status.icon}</span>
//                     {status.label}
//                   </div>
//                   {isLive && (
//                     <div className="flex gap-1">
//                       <span className="relative flex h-2 w-2">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
//                       </span>
//                       <span className="text-xs text-red-500">LIVE</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Teams */}
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//                   {/* Away Team */}
//                   <div className="flex-1 text-center md:text-right">
//                     <div className="flex flex-col items-center md:items-end gap-1">
//                       <div 
//                         className="inline-block px-4 py-2 rounded-xl font-bold text-lg md:text-2xl transition-all duration-300 hover:scale-105"
//                         style={{ 
//                           backgroundColor: awayColor.primary,
//                           color: awayColor.text,
//                           boxShadow: `0 4px 6px rgba(0,0,0,0.1)`,
//                           border: awayColor.secondary ? `2px solid ${awayColor.secondary}` : 'none'
//                         }}
//                       >
//                         {game.awayTeam.abbrev}
//                       </div>
//                       <div className="text-xs opacity-80">{awayEmojis}</div>
//                     </div>
//                     <div className="text-3xl md:text-4xl font-black mt-3">
//                       {game.awayTeam.score ?? "-"}
//                     </div>
//                   </div>

//                   {/* VS / Score separator */}
//                   <div className="text-gray-500 font-bold text-xl px-4">
//                     {isLive || isFinal ? (
//                       <span className="text-2xl animate-pulse">:</span>
//                     ) : (
//                       <span className="text-sm">VS</span>
//                     )}
//                   </div>

//                   {/* Home Team */}
//                   <div className="flex-1 text-center md:text-left">
//                     <div className="flex flex-col items-center md:items-start gap-1">
//                       <div 
//                         className="inline-block px-4 py-2 rounded-xl font-bold text-lg md:text-2xl transition-all duration-300 hover:scale-105"
//                         style={{ 
//                           backgroundColor: homeColor.primary,
//                           color: homeColor.text,
//                           boxShadow: `0 4px 6px rgba(0,0,0,0.1)`,
//                           border: homeColor.secondary ? `2px solid ${homeColor.secondary}` : 'none'
//                         }}
//                       >
//                         {game.homeTeam.abbrev}
//                       </div>
//                       <div className="text-xs opacity-80">{homeEmojis}</div>
//                     </div>
//                     <div className="text-3xl md:text-4xl font-black mt-3">
//                       {game.homeTeam.score ?? "-"}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Game Info */}
//                 {isLive && game.clock && (
//                   <div className="mt-4 text-center">
//                     <div className="inline-flex items-center gap-2 bg-gray-900/50 rounded-full px-4 py-2">
//                       <span className="text-green-400 animate-pulse">⏱️</span>
//                       <span className="font-mono text-lg font-bold text-green-400">
//                         {game.clock.timeRemaining}
//                       </span>
//                       <span className="text-sm text-gray-400">
//                         Période {game.period}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {isUpcoming && (
//                   <div className="mt-4 text-center">
//                     <div className="inline-flex items-center gap-2 bg-gray-900/50 rounded-full px-4 py-2">
//                       <span className="text-blue-400">🕒</span>
//                       <span className="text-sm text-gray-300">
//                         Début à {gameTime}
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {isFinal && (
//                   <div className="mt-4 text-center text-sm text-gray-500">
//                     Match terminé
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {games.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-6xl mb-4">🏒</div>
//           <p className="text-gray-400">Aucun match programmé pour le moment</p>
//         </div>
//       )}

//       <Banner300x250
//           id="ad-bottom"
//           width={300}
//           height={250}
//           format="iframe"
//           className="my-4"
//         />

//     </div>
//   );
// }

// components/LiveUpdater.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import moment from "moment-timezone";
import Banner300x250 from "./Banner300x250";

type GameState = "LIVE" | "FINAL" | "FUT" | "PRE" | "OFF" | "CRIT";

type Game = {
  id: number;
  gameState: GameState;
  startTimeUTC?: string;
  period?: number;
  clock?: {
    timeRemaining?: string;
  };
  homeTeam: {
    abbrev: string;
    score?: number;
    name?: string;
  };
  awayTeam: {
    abbrev: string;
    score?: number;
    name?: string;
  };
};

const teamColors: Record<
  string,
  { primary: string; secondary: string; text: string }
> = {
  MTL: { primary: "#AF1E2D", secondary: "#192168", text: "white" },
  TOR: { primary: "#00205B", secondary: "#FFFFFF", text: "white" },
  BOS: { primary: "#FFB81C", secondary: "#000000", text: "black" },
  OTT: { primary: "#E31837", secondary: "#C69214", text: "white" },
  TB: { primary: "#00205B", secondary: "#FFFFFF", text: "white" },
  FLA: { primary: "#C8102E", secondary: "#041E42", text: "white" },
  DET: { primary: "#CE1126", secondary: "#FFFFFF", text: "white" },
  BUF: { primary: "#002654", secondary: "#FFB81C", text: "white" },
  NYR: { primary: "#0038A8", secondary: "#CE1126", text: "white" },
  NYI: { primary: "#00539B", secondary: "#F26926", text: "white" },
  NJ: { primary: "#CE1126", secondary: "#000000", text: "white" },
  PIT: { primary: "#000000", secondary: "#FCB514", text: "white" },
  PHI: { primary: "#F74902", secondary: "#000000", text: "white" },
  WSH: { primary: "#041E42", secondary: "#C8102E", text: "white" },
  CAR: { primary: "#CC0000", secondary: "#000000", text: "white" },
  CBJ: { primary: "#002654", secondary: "#CE1126", text: "white" },
  EDM: { primary: "#041E42", secondary: "#FF4C00", text: "white" },
  CGY: { primary: "#C8102E", secondary: "#F1BE48", text: "white" },
  VAN: { primary: "#00205B", secondary: "#008852", text: "white" },
  SEA: { primary: "#001628", secondary: "#99D9D9", text: "white" },
  LA: { primary: "#000000", secondary: "#A2AAAD", text: "white" },
  LAK: { primary: "#000000", secondary: "#A2AAAD", text: "white" },
  SJ: { primary: "#006272", secondary: "#EA7200", text: "white" },
  ANA: { primary: "#F47A38", secondary: "#000000", text: "black" },
  VGK: { primary: "#B4975A", secondary: "#333333", text: "white" },
  COL: { primary: "#6F263D", secondary: "#236192", text: "white" },
  DAL: { primary: "#006847", secondary: "#8F8F8F", text: "white" },
  MIN: { primary: "#154734", secondary: "#A6192E", text: "white" },
  WPG: { primary: "#041E42", secondary: "#AC162C", text: "white" },
  NSH: { primary: "#FFB81C", secondary: "#041E42", text: "black" },
  STL: { primary: "#002F87", secondary: "#FFB81C", text: "white" },
  CHI: { primary: "#CE1126", secondary: "#000000", text: "white" },
  UTA: { primary: "#6F263D", secondary: "#236192", text: "white" },
};

const teamEmojis: Record<string, string> = {
  MTL: "🔵⚪🔴",
  TOR: "🔵⚪",
  BOS: "🟡⚫",
  OTT: "🔴⚫",
  TB: "🔵⚪",
  FLA: "🔴🔵",
  DET: "🔴⚪",
  BUF: "🔵🟡",
  NYR: "🔵🔴",
  NYI: "🔵🟠",
  NJ: "🔴⚫",
  PIT: "⚫🟡",
  PHI: "🟠⚫",
  WSH: "🔴🔵",
  CAR: "🔴⚫",
  CBJ: "🔴🔵",
  EDM: "🔵🟠",
  CGY: "🔴🟡",
  VAN: "🔵🟢",
  SEA: "🔵🩵",
  LA: "⚫⚪",
  LAK: "⚫⚪",
  SJ: "🟢🟠",
  ANA: "🟠⚫",
  VGK: "🟡⚫",
  COL: "🔴🔵",
  DAL: "🟢⚫",
  MIN: "🟢🔴",
  WPG: "🔵🔴",
  NSH: "🟡🔵",
  STL: "🔵🟡",
  CHI: "🔴⚫",
  UTA: "🔵🟡",
};

const ACTIVE_LIVE_STATES: readonly GameState[] = ["LIVE", "CRIT"];
const UPCOMING_STATES: readonly GameState[] = ["PRE", "FUT"];
const FINISHED_STATES: readonly GameState[] = ["FINAL", "OFF"];

function formatGameTime(startTimeUTC?: string): string {
  if (!startTimeUTC) return "À venir";
  return moment(startTimeUTC).tz("America/Toronto").format("HH:mm");
}

function sortByStartTimeAsc(a: Game, b: Game): number {
  const aTime = a.startTimeUTC ? moment(a.startTimeUTC).valueOf() : 0;
  const bTime = b.startTimeUTC ? moment(b.startTimeUTC).valueOf() : 0;
  return aTime - bTime;
}

function sortByStartTimeDesc(a: Game, b: Game): number {
  const aTime = a.startTimeUTC ? moment(a.startTimeUTC).valueOf() : 0;
  const bTime = b.startTimeUTC ? moment(b.startTimeUTC).valueOf() : 0;
  return bTime - aTime;
}

function getGameStatus(game: Game) {
  if (ACTIVE_LIVE_STATES.includes(game.gameState)) {
    return { label: "EN DIRECT", color: "text-red-500", icon: "🔴" };
  }

  if (FINISHED_STATES.includes(game.gameState)) {
    return { label: "TERMINÉ", color: "text-gray-400", icon: "🏁" };
  }

  if (UPCOMING_STATES.includes(game.gameState)) {
    return { label: "À VENIR", color: "text-blue-400", icon: "⏰" };
  }

  return { label: game.gameState, color: "text-gray-500", icon: "⏸" };
}

function getPeriodLabel(game: Game): string | null {
  if (!ACTIVE_LIVE_STATES.includes(game.gameState)) return null;

  const timeRemaining = game.clock?.timeRemaining?.trim() ?? "";
  const period = game.period ?? 0;

  if (!timeRemaining) {
    return period > 0 ? `Période ${period}` : "En cours";
  }

  if (timeRemaining === "00:00") {
    return period > 0 ? `Fin de la période ${period}` : "Fin de période";
  }

  return `Période ${period}`;
}

function getClockDisplay(game: Game): string | null {
  if (!ACTIVE_LIVE_STATES.includes(game.gameState)) return null;

  const timeRemaining = game.clock?.timeRemaining?.trim() ?? "";
  if (!timeRemaining) return null;
  if (timeRemaining === "00:00") return "Pause / entracte";

  return timeRemaining;
}

// function SectionTitle({
//   title,
//   count,
//   icon,
// }: {
//   title: string;
//   count: number;
//   icon: string;
// }) {
//   return (
//     <div className="flex items-center gap-2 mb-4 mt-8 first:mt-0">
//       <span className="text-xl">{icon}</span>
//       <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
//       <span className="text-sm text-gray-400">({count})</span>
//     </div>
//   );
// }

//section title plus stylé et varianté
function SectionTitle({
  title,
  count,
  icon,
  variant = "default",
}: {
  title: string;
  count: number;
  icon: string;
  variant?: "live" | "upcoming" | "recent" | "default";
}) {
  const styles = {
    live: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      text: "text-red-400",
      line: "from-red-500/70",
      glow: "shadow-red-500/20",
      badge: "bg-red-500",
    },
    upcoming: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      line: "from-blue-500/70",
      glow: "shadow-blue-500/20",
      badge: "bg-blue-500",
    },
    recent: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      line: "from-emerald-500/70",
      glow: "shadow-emerald-500/20",
      badge: "bg-emerald-500",
    },
    default: {
      border: "border-gray-700",
      bg: "bg-gray-800/60",
      text: "text-white",
      line: "from-gray-500/70",
      glow: "",
      badge: "bg-gray-500",
    },
  }[variant];

  // Correction: Éviter setState dans useEffect pour les valeurs statiques
  // Utiliser directement useMemo ou calculer la valeur sans état
  const getTimeUntilFirstGame = () => {
    if (variant !== "upcoming") return null;
    // Tu peux calculer dynamiquement ici plus tard
    return "dans moins de 2h";
  };

  const timeUntilFirstGame = getTimeUntilFirstGame();

  return (
    <div className="mt-10 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Badge principal avec effet glassmorphisme */}
        <div
          className={`relative flex items-center gap-3 rounded-2xl border ${styles.border} ${styles.bg} px-5 py-3.5 shadow-xl ${styles.glow} backdrop-blur-sm overflow-hidden group`}
        >
          {/* Animation de fond au hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          
          {/* Icône animée */}
          <div className={`text-3xl transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300`}>
            {icon}
          </div>

          <div>
            <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${styles.text}`}>
              {title}
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-2 h-2 rounded-full ${styles.badge} animate-pulse`} />
              <p className="text-sm font-medium text-gray-300">
                {count} match{count > 1 ? "s" : ""} au programme
              </p>
            </div>
          </div>

          {/* Compteur pour upcoming */}
          {variant === "upcoming" && timeUntilFirstGame && (
            <div className="ml-2 block">
              <div className="flex items-center gap-1.5 bg-black/30 rounded-full px-3 py-1.5">
                <span className="text-yellow-400 text-sm">⚡</span>
                <span className="text-xs font-mono font-bold text-yellow-400">
                  {timeUntilFirstGame}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Ligne décorative avec étoiles */}
        <div className={`hidden sm:flex items-center gap-2 flex-1`}>
          <div className={`h-px flex-1 bg-gradient-to-r ${styles.line} to-transparent`} />
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${styles.text.replace('text-', 'bg-')} opacity-40`}
              />
            ))}
          </div>
        </div>

        {/* Call to action pour upcoming */}
        {variant === "upcoming" && count > 0 && (
          <div className="hidden lg:block">
            <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/30 rounded-full px-3 py-1.5">
              <span>🔔</span>
              <span>Ne ratez aucun but! 🏒</span>
              {/* <span className="text-blue-400">→</span> */}
            </div>
          </div>
        )}
      </div>

      {/* Sous-titre descriptif pour upcoming */}
      {variant === "upcoming" && count > 0 && (
        <div className="mt-3 ml-1">
          <p className="text-xs text-gray-500 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            {/* Cliquez sur un match pour voir les détails
            <span className="text-blue-400/50 text-lg">·</span> */}
            <span>Tous les horaires en HE</span>
          </p>
        </div>
      )}
    </div>
  );
}

// Version alternative corrigée pour UpcomingSectionTitle
function UpcomingSectionTitle({ count, games }: { count: number; games?: Game[] }) {
  // Calculer l'heure du premier match réellement
  const getFirstGameInfo = () => {
    if (!games || games.length === 0) return null;
    
    const firstGame = games[0];
    const gameTime = firstGame.startTimeUTC 
      ? moment(firstGame.startTimeUTC).tz("America/Toronto")
      : null;
    
    if (!gameTime) return null;
    
    const now = moment().tz("America/Toronto");
    const diffMinutes = gameTime.diff(now, 'minutes');
    
    if (diffMinutes <= 0) return { time: gameTime.format("HH:mm"), remaining: "Commencé" };
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return {
      time: gameTime.format("HH:mm"),
      remaining: hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`
    };
  };

  const firstGameInfo = getFirstGameInfo();

  return (
    <div className="mt-10 mb-6 relative">
      {/* Background gradient animé */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent rounded-2xl blur-xl" />
      
      <div className="relative bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-transparent rounded-2xl border border-blue-500/30 p-4 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Partie gauche avec icône et titre */}
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-bounce">⏰</div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Prochains matchs
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-blue-400">
                  {count} match{count > 1 ? "s" : ""}
                </span>
                 <span className="text-xs text-gray-500">aujourd&apos;hui</span>
              </div>
            </div>
          </div>

          {/* Partie centrale - timer avec données réelles */}
          {firstGameInfo && (
            <div className="flex items-center gap-4">
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-400 font-mono">
                    {firstGameInfo.time}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Premier match
                  </div>
                </div>
                <div className="text-yellow-400 text-xl">⚡</div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Dans</div>
                  <div className="text-sm font-bold text-yellow-400 font-mono">
                    {firstGameInfo.remaining}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Partie droite - badge reminder */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                // Ajouter la logique de notification ici
                if ("Notification" in window && Notification.permission === "granted") {
                  new Notification("Rappel match NHL", {
                    body: "Les matchs du jour commencent bientôt !",
                    icon: "/nhl-logo.png"
                  });
                } else if ("Notification" in window) {
                  Notification.requestPermission();
                }
              }}
              className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 transition-colors rounded-full px-3 py-1.5 text-xs font-medium text-blue-300 border border-blue-500/30"
            >
              <span>🔔</span>
              <span>Me rappeler</span>
            </button>
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-xs text-gray-500">🔥</span>
              <span className="text-xs text-gray-500">
                {firstGameInfo ? firstGameInfo.remaining : "Bientôt"}
              </span>
            </div>
          </div>
        </div>

        {/* Barre de progression stylisée */}
        {firstGameInfo && (
          <div className="mt-3 h-1 bg-blue-950/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full animate-pulse"
              style={{ width: firstGameInfo.remaining === "Commencé" ? "100%" : "15%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// function SectionTitle({
//   title,
//   count,
//   icon,
//   variant = "default",
// }: {
//   title: string;
//   count: number;
//   icon: string;
//   variant?: "live" | "upcoming" | "recent" | "default";
// }) {
//   const styles = {
//     live: {
//       border: "border-red-500/30",
//       bg: "bg-red-500/10",
//       text: "text-red-400",
//       line: "from-red-500/70",
//     },
//     upcoming: {
//       border: "border-blue-500/30",
//       bg: "bg-blue-500/10",
//       text: "text-blue-400",
//       line: "from-blue-500/70",
//     },
//     recent: {
//       border: "border-emerald-500/30",
//       bg: "bg-emerald-500/10",
//       text: "text-emerald-400",
//       line: "from-emerald-500/70",
//     },
//     default: {
//       border: "border-gray-700",
//       bg: "bg-gray-800/60",
//       text: "text-white",
//       line: "from-gray-500/70",
//     },
//   }[variant];

//   return (
//     <div className="mt-10 mb-5">
//       <div className="flex items-center gap-3">
//         <div
//           className={`flex items-center gap-2 rounded-2xl border ${styles.border} ${styles.bg} px-4 py-3 shadow-lg`}
//         >
//           <span className="text-2xl">{icon}</span>

//           <div>
//             <h2 className={`text-xl md:text-2xl font-black ${styles.text}`}>
//               {title}
//             </h2>
//             <p className="text-xs text-gray-400">
//               {count} match{count > 1 ? "s" : ""}
//             </p>
//           </div>
//         </div>

//         <div
//           className={`hidden sm:block h-px flex-1 bg-gradient-to-r ${styles.line} to-transparent`}
//         />
//       </div>
//     </div>
//   );
// }

function GameCard({ game }: { game: Game }) {
  const status = getGameStatus(game);
  const isLive = ACTIVE_LIVE_STATES.includes(game.gameState);
  const isFinished = FINISHED_STATES.includes(game.gameState);
  const isUpcoming = UPCOMING_STATES.includes(game.gameState);

  const gameTime = formatGameTime(game.startTimeUTC);
  const periodLabel = getPeriodLabel(game);
  const clockDisplay = getClockDisplay(game);

  const awayColor = teamColors[game.awayTeam.abbrev] || {
    primary: "#374151",
    secondary: "#1F2937",
    text: "white",
  };

  const homeColor = teamColors[game.homeTeam.abbrev] || {
    primary: "#374151",
    secondary: "#1F2937",
    text: "white",
  };

  const awayEmojis = teamEmojis[game.awayTeam.abbrev] || "🏒";
  const homeEmojis = teamEmojis[game.homeTeam.abbrev] || "🏒";

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
      {isLive && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none animate-pulse" />
      )}

      <div className="relative p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <div
            className={`text-xs font-bold px-3 py-1 rounded-full ${status.color} bg-gray-900/50 backdrop-blur-sm`}
          >
            <span className="inline-block mr-1">{status.icon}</span>
            {status.label}
          </div>

          {isLive && (
            <div className="flex gap-1 items-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs text-red-500">LIVE</span>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center md:text-right">
            <div className="flex flex-col items-center md:items-end gap-1">
              <div
                className="inline-block px-4 py-2 rounded-xl font-bold text-lg md:text-2xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: awayColor.primary,
                  color: awayColor.text,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: awayColor.secondary
                    ? `2px solid ${awayColor.secondary}`
                    : "none",
                }}
              >
                {game.awayTeam.abbrev}
              </div>
              <div className="text-xs opacity-80">{awayEmojis}</div>
            </div>

            <div className="text-3xl md:text-4xl font-black mt-3">
              {isUpcoming ? "-" : game.awayTeam.score ?? "-"}
            </div>
          </div>

          <div className="text-gray-500 font-bold text-xl px-4">
            {isLive || isFinished ? (
              <span className="text-2xl animate-pulse">:</span>
            ) : (
              <span className="text-sm">VS</span>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div
                className="inline-block px-4 py-2 rounded-xl font-bold text-lg md:text-2xl transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: homeColor.primary,
                  color: homeColor.text,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  border: homeColor.secondary
                    ? `2px solid ${homeColor.secondary}`
                    : "none",
                }}
              >
                {game.homeTeam.abbrev}
              </div>
              <div className="text-xs opacity-80">{homeEmojis}</div>
            </div>

            <div className="text-3xl md:text-4xl font-black mt-3">
              {isUpcoming ? "-" : game.homeTeam.score ?? "-"}
            </div>
          </div>
        </div>

        {isLive && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-gray-900/50 rounded-full px-4 py-2">
              <span className="text-green-400 animate-pulse">⏱️</span>
              <span className="font-mono text-lg font-bold text-green-400">
                {clockDisplay ?? "En cours"}
              </span>
              {periodLabel && (
                <span className="text-sm text-gray-400">{periodLabel}</span>
              )}
            </div>
          </div>
        )}

        {isUpcoming && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-gray-900/50 rounded-full px-4 py-2">
              <span className="text-blue-400">🕒</span>
              <span className="text-sm text-gray-300">
                Début à {gameTime}
              </span>
            </div>
          </div>
        )}

        {isFinished && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Match terminé
          </div>
        )}
      </div>
    </div>
  );
}

export default function LiveUpdater({
  initialGames,
}: {
  initialGames: Game[];
}) {
  const [scheduleGames, setScheduleGames] = useState<Game[]>(initialGames);
  const [scoreNowGames, setScoreNowGames] = useState<Game[]>([]);
  const [scoreYesterdayGames, setScoreYesterdayGames] = useState<Game[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchGames = async (): Promise<{
    scheduleGames: Game[];
    scoreNowGames: Game[];
    scoreYesterdayGames: Game[];
  }> => {
    const res = await fetch("/api/nhl-scoreboard", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Erreur API locale ${res.status}`);
    }

    const data = await res.json();

    console.log("DEBUG NHL API:", data.debug);

    return {
      scheduleGames: data.scheduleGames || [],
      scoreNowGames: data.scoreNowGames || [],
      scoreYesterdayGames: data.scoreYesterdayGames || [],
    };
  };

  useEffect(() => {
    let isMounted = true;

    const refreshGames = async () => {
      try {
        const { scheduleGames, scoreNowGames, scoreYesterdayGames } =
          await fetchGames();

        if (!isMounted) return;

        setScheduleGames(scheduleGames);
        setScoreNowGames(scoreNowGames);
        setScoreYesterdayGames(scoreYesterdayGames);
        setLastUpdate(new Date());
      } catch (err) {
        console.error("Erreur fetch NHL:", err);
      }
    };

    const timeout = setTimeout(() => {
      void refreshGames();
    }, 0);

    const interval = setInterval(() => {
      void refreshGames();
    }, 40000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const { liveGames, upcomingGames, recentFinalGames } = useMemo(() => {
  const nowToronto = moment().tz("America/Toronto");
  const todayToronto = nowToronto.format("YYYY-MM-DD");
  const yesterdayToronto = nowToronto.clone().subtract(1, "day").format("YYYY-MM-DD");

  const mergedById = new Map<number, Game>();

  for (const game of scheduleGames) {
    mergedById.set(game.id, game);
  }

  for (const game of scoreNowGames) {
    const existing = mergedById.get(game.id);
    mergedById.set(game.id, {
      ...existing,
      ...game,
      awayTeam: {
        ...existing?.awayTeam,
        ...game.awayTeam,
      },
      homeTeam: {
        ...existing?.homeTeam,
        ...game.homeTeam,
      },
      clock: {
        ...existing?.clock,
        ...game.clock,
      },
    });
  }

  for (const game of scoreYesterdayGames) {
    const existing = mergedById.get(game.id);
    mergedById.set(game.id, {
      ...existing,
      ...game,
      awayTeam: {
        ...existing?.awayTeam,
        ...game.awayTeam,
      },
      homeTeam: {
        ...existing?.homeTeam,
        ...game.homeTeam,
      },
      clock: {
        ...existing?.clock,
        ...game.clock,
      },
    });
  }

  const mergedGames = Array.from(mergedById.values());

  console.log(
    "MERGED STATES:",
    mergedGames.map((g) => ({
      id: g.id,
      away: g.awayTeam.abbrev,
      home: g.homeTeam.abbrev,
      state: g.gameState,
      localDate: g.startTimeUTC
        ? moment(g.startTimeUTC).tz("America/Toronto").format("YYYY-MM-DD HH:mm")
        : null,
    }))
  );

  const liveGames = mergedGames
    .filter((game) => ACTIVE_LIVE_STATES.includes(game.gameState))
    .sort(sortByStartTimeAsc);

  const recentFinalGames = mergedGames
    .filter((game) => {
      if (!FINISHED_STATES.includes(game.gameState)) return false;
      if (!game.startTimeUTC) return false;

      const localDate = moment(game.startTimeUTC)
        .tz("America/Toronto")
        .format("YYYY-MM-DD");

      return localDate === todayToronto || localDate === yesterdayToronto;
    })
    .sort(sortByStartTimeDesc);

  const hiddenIds = new Set([
    ...liveGames.map((g) => g.id),
    ...recentFinalGames.map((g) => g.id),
  ]);

  const upcomingGames = mergedGames
    .filter((game) => {
      if (hiddenIds.has(game.id)) return false;
      if (!UPCOMING_STATES.includes(game.gameState)) return false;
      if (!game.startTimeUTC) return false;

      const localDate = moment(game.startTimeUTC)
        .tz("America/Toronto")
        .format("YYYY-MM-DD");

      return localDate === todayToronto;
    })
    .sort(sortByStartTimeAsc);

  return { liveGames, upcomingGames, recentFinalGames };
}, [scheduleGames, scoreNowGames, scoreYesterdayGames]);

  const stats = {
    live: liveGames.length,
    final: recentFinalGames.length,
    upcoming: upcomingGames.length,
    total: liveGames.length + upcomingGames.length + recentFinalGames.length,
  };

  const formattedTime = moment(lastUpdate)
    .tz("America/Toronto")
    .format("HH:mm:ss");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-between items-center mb-6 text-xs text-gray-500 gap-2">
        <div className="flex gap-3 flex-wrap">
          <span>📊 {stats.total} match{stats.total > 1 ? "s" : ""}</span>
          {stats.live > 0 && (
            <span className="text-red-500">🔴 {stats.live} en direct</span>
          )}
          {stats.final > 0 && <span>🏁 {stats.final} récents</span>}
          {stats.upcoming > 0 && <span>⏰ {stats.upcoming} à venir</span>}
        </div>

        <span suppressHydrationWarning>
          Dernière mise à jour 🔄 {formattedTime}
        </span>
      </div>

      {liveGames.length > 0 && (
        <section className="mb-8">
          {/* <SectionTitle
            title="En direct maintenant"
            count={liveGames.length}
            icon="🔴"
          /> */}
          <SectionTitle
  title="En direct maintenant"
  count={liveGames.length}
  icon="🔴"
  variant="live"
/>
          <div className="grid gap-4 md:gap-6">
            {liveGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

{upcomingGames.length > 0 && (
  <section className="mb-8">
    {/* <SectionTitle
      title="Prochains matchs aujourd’hui"
      count={upcomingGames.length}
      icon="⏰"
    /> */}
    <SectionTitle
  title="Prochains matchs aujourd’hui"
  count={upcomingGames.length}
  icon="⏰"
  variant="upcoming"
/>
    <div className="grid gap-4 md:gap-6">
      {upcomingGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </section>
)}

{recentFinalGames.length > 0 && (
  <section className="mb-8">
    {/* <SectionTitle
      title="Résultats récents"
      count={recentFinalGames.length}
      icon="🏁"
    /> */}
    <SectionTitle
  title="Résultats récents"
  count={recentFinalGames.length}
  icon="🏁"
  variant="recent"
/>
    <div className="grid gap-4 md:gap-6">
      {recentFinalGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  </section>
)}

      {stats.total === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏒</div>
          <p className="text-gray-400">Aucun match programmé pour le moment</p>
        </div>
      )}

      <Banner300x250
        id="ad-bottom"
        width={300}
        height={250}
        format="iframe"
        className="my-4"
      />
    </div>
  );
}