// components/GameCard.tsx
"use client";

import { memo } from "react";
import TeamBadge from "./TeamBadge";
import GameStatus from "./GameStatus";

interface GameCardProps {
  game: {
    id: number;
    gameState: "LIVE" | "FINAL" | "FUT" | "PRE" | "OFF";
    startTimeUTC?: string;
    period?: number;
    clock?: { timeRemaining: string };
    homeTeam: { abbrev: string; score?: number; name?: string };
    awayTeam: { abbrev: string; score?: number; name?: string };
  };
  index: number;
}

function GameCardComponent({ game, index }: GameCardProps) {
  const isLiveOrFinal = game.gameState === "LIVE" || game.gameState === "FINAL";
  const isLive = game.gameState === "LIVE";
  
  return (
    <div 
      className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-fadeIn"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Glass morphism effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />
      
      {/* Live glow effect */}
      {isLive && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none animate-pulse" />
      )}
      
      <div className="relative p-5 md:p-7 lg:p-8">
        {/* Status Section - Responsive */}
        <div className="mb-5">
          <GameStatus 
            gameState={game.gameState}
            period={game.period}
            clock={game.clock}
            startTimeUTC={game.startTimeUTC}
          />
        </div>

        {/* Score Section - Layout adaptatif */}
        <div className="grid grid-cols-[1fr,auto,1fr] gap-3 md:gap-6 items-center">
          {/* Away Team */}
          <div className="text-center md:text-right space-y-3 md:space-y-4">
            <div className="flex justify-center md:justify-end">
              <TeamBadge abbrev={game.awayTeam.abbrev} size="lg" showEmojis={true} />
            </div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {game.awayTeam.score ?? "-"}
            </div>
            {game.awayTeam.name && (
              <div className="hidden md:block text-xs text-gray-500">
                {game.awayTeam.name}
              </div>
            )}
          </div>

          {/* VS / Score separator */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-gray-500 font-black text-xl md:text-2xl lg:text-3xl">
              {isLiveOrFinal ? (
                <span className="animate-pulse">:</span>
              ) : (
                <span className="text-sm md:text-base">VS</span>
              )}
            </div>
            {isLiveOrFinal && (
              <div className="hidden lg:block text-xs text-gray-600">
                {game.gameState === "LIVE" ? "LIVE" : "FINAL"}
              </div>
            )}
          </div>

          {/* Home Team */}
          <div className="text-center md:text-left space-y-3 md:space-y-4">
            <div className="flex justify-center md:justify-start">
              <TeamBadge abbrev={game.homeTeam.abbrev} size="lg" showEmojis={true} />
            </div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {game.homeTeam.score ?? "-"}
            </div>
            {game.homeTeam.name && (
              <div className="hidden md:block text-xs text-gray-500">
                {game.homeTeam.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// CHANGEMENT IMPORTANT: Export par défaut au lieu de nommé
export default memo(GameCardComponent);