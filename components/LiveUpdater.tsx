"use client";

import { useEffect, useState } from "react";

// type Team = {
//   abbrev: string;
//   score: number;
// };

// type Game = {
//   id: number;
//   gameState: string;
//   period?: number;
//   clock?: { timeRemaining: string };
//   homeTeam: Team;
//   awayTeam: Team;
// };

type Game = {
  id: number;
  gameState: "LIVE" | "FINAL" | "FUT" | "PRE";
  startTimeUTC?: string;
  period?: number;
  clock?: {
    timeRemaining: string;
  };
  homeTeam: {
    abbrev: string;
    score?: number;
  };
  awayTeam: {
    abbrev: string;
    score?: number;
  };
};

export default function LiveUpdater({
  initialGames,
}: {
  initialGames: Game[];
}) {
  const [games, setGames] = useState<Game[]>(initialGames);

  const fetchLive = async () => {
    try {
      const res = await fetch("https://api-web.nhle.com/v1/schedule/now");
      const data = await res.json();

    //   setGames(data.games || []);
    const games = data.gameWeek?.[0]?.games || [];
    setGames(games);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // const hasLive = games.some((g) => g.gameState === "LIVE");

    // const interval = setInterval(fetchLive, hasLive ? 30000 : 90000);
    const interval = setInterval(fetchLive, 60000); // 1 min safe

    return () => clearInterval(interval);
  }, [games]);

  return (
    <div className="grid gap-4">
  {games.map((game) => {
    // console.log(JSON.stringify(game, null, 2));
    // console.log("GAME:", game.id, game.gameState);
    const isLive = game.gameState === "LIVE";
    const isFinal = game.gameState === "FINAL";
    // const isPre = game.gameState === "PRE" || game.gameState === "FUT";
    const isUpcoming = ["PRE", "FUT"].includes(game.gameState);

    const gameTime = game.startTimeUTC
  ? new Date(game.startTimeUTC).toLocaleTimeString("fr-CA", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Toronto", // 🔥 IMPORTANT POUR CANADA
    })
  : "À venir";

    return (
      <div
        key={game.id}
        className="p-4 rounded-xl bg-zinc-900 text-white shadow-lg"
      >
        {/* Teams */}
        <div className="flex justify-between text-lg font-semibold">
          <span>{game.awayTeam.abbrev}</span>
          <span>{game.homeTeam.abbrev}</span>
        </div>

        {/* PRE MATCH */}
        {/* {isPre && (
          <div className="text-center text-gray-400 mt-2">
            🕒 Début du match à {gameTime}
          </div>
        )} */}
        {isUpcoming && (
  <div className="text-center text-gray-400 mt-2">
    🕒 Début du match à {gameTime}
  </div>
)}

        {/* LIVE */}
        {isLive && (
          <>
            <div className="text-2xl text-center my-2 font-bold">
              {game.awayTeam.score} - {game.homeTeam.score}
            </div>

            {game.clock && (
              <div className="text-center text-green-400">
                ⏱ {game.clock.timeRemaining} (Période {game.period})
              </div>
            )}

            <div className="text-center text-red-500 font-bold mt-1">
              🔴 EN DIRECT
            </div>
          </>
        )}

        {/* FINAL */}
        {isFinal && (
          <div className="text-2xl text-center my-2 font-bold">
            {game.awayTeam.score} - {game.homeTeam.score}

            <div className="text-sm text-gray-400 mt-1">
              Match terminé
            </div>
          </div>
        )}
      </div>
    );
  })}
</div>
  );
}