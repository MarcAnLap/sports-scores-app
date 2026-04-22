// components/GameStatus.tsx
"use client";

interface GameStatusProps {
  gameState: "LIVE" | "FINAL" | "FUT" | "PRE" | "OFF";
  period?: number;
  clock?: { timeRemaining: string };
  startTimeUTC?: string;
}

export default function GameStatus({ gameState, period, clock, startTimeUTC }: GameStatusProps) {
  const getStatusConfig = () => {
    switch (gameState) {
      case "LIVE":
        return {
          label: "EN DIRECT",
          color: "text-red-500",
          bg: "bg-red-500/10",
          icon: "🔴",
          isAnimated: true
        };
      case "FINAL":
        return {
          label: "TERMINÉ",
          color: "text-gray-400",
          bg: "bg-gray-500/10",
          icon: "🏁",
          isAnimated: false
        };
      case "PRE":
      case "FUT":
        return {
          label: "À VENIR",
          color: "text-blue-400",
          bg: "bg-blue-500/10",
          icon: "⏰",
          isAnimated: false
        };
      default:
        return {
          label: gameState,
          color: "text-gray-500",
          bg: "bg-gray-500/10",
          icon: "⏸",
          isAnimated: false
        };
    }
  };

  const config = getStatusConfig();
  
  const gameTime = startTimeUTC && gameState !== "LIVE"
    ? new Date(startTimeUTC).toLocaleTimeString("fr-CA", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Toronto",
      })
    : null;

  return (
    <div className="flex flex-col gap-2">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${config.color} text-xs font-bold backdrop-blur-sm`}>
        <span className={config.isAnimated ? "animate-pulse" : ""}>{config.icon}</span>
        <span>{config.label}</span>
        {config.isAnimated && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        )}
      </div>
      
      {config.label === "EN DIRECT" && clock && (
        <div className="text-green-400 font-mono text-sm">
          ⏱️ {clock.timeRemaining} (P{period})
        </div>
      )}
      
      {config.label === "À VENIR" && gameTime && (
        <div className="text-gray-400 text-sm">
          🕒 {gameTime}
        </div>
      )}
    </div>
  );
}
