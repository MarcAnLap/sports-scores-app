
// components/LiveUpdater.tsx
// "use client";

// import { useEffect, useState } from "react";

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

// export default function LiveUpdater({ initialGames }: { initialGames: Game[] }) {
//   const [games, setGames] = useState<Game[]>(initialGames);
//   const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

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
//     const interval = setInterval(fetchLive, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const getGameStatus = (game: Game) => {
//     if (game.gameState === "LIVE") return { label: "EN DIRECT", color: "text-red-500", icon: "🔴" };
//     if (game.gameState === "FINAL") return { label: "TERMINÉ", color: "text-gray-400", icon: "🏁" };
//     if (["PRE", "FUT"].includes(game.gameState)) return { label: "À VENIR", color: "text-blue-400", icon: "⏰" };
//     return { label: game.gameState, color: "text-gray-500", icon: "⏸" };
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
//         <span>📊 {games.length} match{games.length > 1 ? 's' : ''}</span>
//         <span>🔄 Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-CA')}</span>
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

//           return (
//             <div
//               key={game.id}
//               className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
//             >
//               {/* Background gradient */}
//               <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none"></div>
              
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
//                     <div 
//                       className="inline-block px-4 py-2 rounded-xl font-bold text-lg md:text-2xl"
//                       style={{ 
//                         backgroundColor: awayColor.primary,
//                         color: awayColor.text,
//                         boxShadow: `0 4px 6px rgba(0,0,0,0.1)`
//                       }}
//                     >
//                       {game.awayTeam.abbrev}
//                     </div>
//                     <div className="text-3xl md:text-4xl font-black mt-3">
//                       {game.awayTeam.score ?? "-"}
//                     </div>
//                   </div>

//                   {/* VS / Score separator */}
//                   <div className="text-gray-500 font-bold text-xl px-4">
//                     {isLive || isFinal ? (
//                       <span className="text-2xl">:</span>
//                     ) : (
//                       <span className="text-sm">VS</span>
//                     )}
//                   </div>

//                   {/* Home Team */}
//                   <div className="flex-1 text-center md:text-left">
//                     <div 
//                       className="inline-block px-4 py-2 rounded-xl font-bold text-lg md:text-2xl"
//                       style={{ 
//                         backgroundColor: homeColor.primary,
//                         color: homeColor.text,
//                         boxShadow: `0 4px 6px rgba(0,0,0,0.1)`
//                       }}
//                     >
//                       {game.homeTeam.abbrev}
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
//     </div>
//   );
// }

// components/LiveUpdater.tsx
"use client";

import { useEffect, useState } from "react";

type Game = {
  id: number;
  gameState: "LIVE" | "FINAL" | "FUT" | "PRE" | "OFF";
  startTimeUTC?: string;
  period?: number;
  clock?: {
    timeRemaining: string;
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

// Couleurs des équipes NHL
const teamColors: Record<string, { primary: string; secondary: string; text: string }> = {
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

// Emojis des équipes
const teamEmojis: Record<string, string> = {
  MTL: "🔵⚪🔴", TOR: "🔵⚪", BOS: "🟡⚫", OTT: "🔴⚫", TB: "🔵⚪",
  FLA: "🔴🔵", DET: "🔴⚪", BUF: "🔵🟡", NYR: "🔵🔴", NYI: "🔵🟠",
  NJ: "🔴⚫", PIT: "⚫🟡", PHI: "🟠⚫", WSH: "🔴🔵", CAR: "🔴⚫",
  CBJ: "🔴🔵", EDM: "🔵🟠", CGY: "🔴🟡", VAN: "🔵🟢", SEA: "🔵🩵",
  LA: "⚫⚪", SJ: "🟢🟠", ANA: "🟠⚫", VGK: "🟡⚫", COL: "🔴🔵",
  DAL: "🟢⚫", MIN: "🟢🔴", WPG: "🔵🔴", NSH: "🟡🔵", STL: "🔵🟡",
  CHI: "🔴⚫", UTA: "🔵🟡",
};

export default function LiveUpdater({ initialGames }: { initialGames: Game[] }) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchLive = async () => {
    try {
      const res = await fetch("https://api-web.nhle.com/v1/schedule/now");
      const data = await res.json();
      const games = data.gameWeek?.[0]?.games || [];
      setGames(games);
      setLastUpdate(new Date());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchLive, 60000);
    return () => clearInterval(interval);
  }, []);

  const getGameStatus = (game: Game) => {
    if (game.gameState === "LIVE") return { label: "EN DIRECT", color: "text-red-500", icon: "🔴" };
    if (game.gameState === "FINAL") return { label: "TERMINÉ", color: "text-gray-400", icon: "🏁" };
    if (["PRE", "FUT"].includes(game.gameState)) return { label: "À VENIR", color: "text-blue-400", icon: "⏰" };
    return { label: game.gameState, color: "text-gray-500", icon: "⏸" };
  };

  // Statistiques pour mobile/tablet
  const stats = {
    live: games.filter(g => g.gameState === "LIVE").length,
    final: games.filter(g => g.gameState === "FINAL").length,
    upcoming: games.filter(g => ["PRE", "FUT"].includes(g.gameState)).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Barre d'info responsive */}
      <div className="flex flex-wrap justify-between items-center mb-6 text-xs text-gray-500 gap-2">
        <div className="flex gap-3">
          <span>📊 {games.length} match{games.length > 1 ? 's' : ''}</span>
          {stats.live > 0 && <span className="text-red-500">🔴 {stats.live} live</span>}
          {stats.final > 0 && <span>🏁 {stats.final} finis</span>}
          {stats.upcoming > 0 && <span>⏰ {stats.upcoming} à venir</span>}
        </div>
        <span suppressHydrationWarning>🔄 {lastUpdate.toLocaleTimeString('fr-CA')}</span>
      </div>

      <div className="grid gap-4 md:gap-6">
        {games.map((game) => {
          const status = getGameStatus(game);
          const isLive = game.gameState === "LIVE";
          const isFinal = game.gameState === "FINAL";
          const isUpcoming = ["PRE", "FUT"].includes(game.gameState);
          
          const gameTime = game.startTimeUTC
            ? new Date(game.startTimeUTC).toLocaleTimeString("fr-CA", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "America/Toronto",
              })
            : "À venir";

          const awayColor = teamColors[game.awayTeam.abbrev] || { primary: "#374151", secondary: "#1F2937", text: "white" };
          const homeColor = teamColors[game.homeTeam.abbrev] || { primary: "#374151", secondary: "#1F2937", text: "white" };
          const awayEmojis = teamEmojis[game.awayTeam.abbrev] || "🏒";
          const homeEmojis = teamEmojis[game.homeTeam.abbrev] || "🏒";

          return (
            <div
              key={game.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
              {isLive && <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none animate-pulse" />}
              
              <div className="relative p-4 md:p-6">
                {/* Status Badge */}
                <div className="flex justify-between items-center mb-4">
                  <div className={`text-xs font-bold px-3 py-1 rounded-full ${status.color} bg-gray-900/50 backdrop-blur-sm`}>
                    <span className="inline-block mr-1">{status.icon}</span>
                    {status.label}
                  </div>
                  {isLive && (
                    <div className="flex gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      <span className="text-xs text-red-500">LIVE</span>
                    </div>
                  )}
                </div>

                {/* Teams */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  {/* Away Team */}
                  <div className="flex-1 text-center md:text-right">
                    <div className="flex flex-col items-center md:items-end gap-1">
                      <div 
                        className="inline-block px-4 py-2 rounded-xl font-bold text-lg md:text-2xl transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: awayColor.primary,
                          color: awayColor.text,
                          boxShadow: `0 4px 6px rgba(0,0,0,0.1)`,
                          border: awayColor.secondary ? `2px solid ${awayColor.secondary}` : 'none'
                        }}
                      >
                        {game.awayTeam.abbrev}
                      </div>
                      <div className="text-xs opacity-80">{awayEmojis}</div>
                    </div>
                    <div className="text-3xl md:text-4xl font-black mt-3">
                      {game.awayTeam.score ?? "-"}
                    </div>
                  </div>

                  {/* VS / Score separator */}
                  <div className="text-gray-500 font-bold text-xl px-4">
                    {isLive || isFinal ? (
                      <span className="text-2xl animate-pulse">:</span>
                    ) : (
                      <span className="text-sm">VS</span>
                    )}
                  </div>

                  {/* Home Team */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-1">
                      <div 
                        className="inline-block px-4 py-2 rounded-xl font-bold text-lg md:text-2xl transition-all duration-300 hover:scale-105"
                        style={{ 
                          backgroundColor: homeColor.primary,
                          color: homeColor.text,
                          boxShadow: `0 4px 6px rgba(0,0,0,0.1)`,
                          border: homeColor.secondary ? `2px solid ${homeColor.secondary}` : 'none'
                        }}
                      >
                        {game.homeTeam.abbrev}
                      </div>
                      <div className="text-xs opacity-80">{homeEmojis}</div>
                    </div>
                    <div className="text-3xl md:text-4xl font-black mt-3">
                      {game.homeTeam.score ?? "-"}
                    </div>
                  </div>
                </div>

                {/* Game Info */}
                {isLive && game.clock && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-gray-900/50 rounded-full px-4 py-2">
                      <span className="text-green-400 animate-pulse">⏱️</span>
                      <span className="font-mono text-lg font-bold text-green-400">
                        {game.clock.timeRemaining}
                      </span>
                      <span className="text-sm text-gray-400">
                        Période {game.period}
                      </span>
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

                {isFinal && (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    Match terminé
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {games.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏒</div>
          <p className="text-gray-400">Aucun match programmé pour le moment</p>
        </div>
      )}
    </div>
  );
}