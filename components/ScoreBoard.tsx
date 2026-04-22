// components/ScoreBoard.tsx

import { Suspense } from "react";
import LiveUpdater from "./LiveUpdater";
// import SkeletonCard from "./SkeletonCard";
// import GamesList from "./GamesList";

async function getGames() {
  const res = await fetch("https://api-web.nhle.com/v1/score/now", {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data.games || [];
}

export default async function ScoreBoard() {
  // export default function ScoreBoard() {
  const games = await getGames();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">
        🏒 Scores en direct NHL
      </h1>

      <Suspense
        // fallback={
        //   <div className="grid gap-4">
        //     {Array.from({ length: 5 }).map((_, i) => (
        //       <SkeletonCard key={i} />
        //     ))}
        //   </div>
        // }
        fallback={<div className="text-gray-400">Chargement...</div>}
      >
        <LiveUpdater initialGames={games} />
        {/* <GamesList /> */}
      </Suspense>
    </div>
  );
}
