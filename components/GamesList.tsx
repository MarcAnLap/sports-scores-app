import LiveUpdater from "./LiveUpdater";

async function getGames() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("https://api-web.nhle.com/v1/schedule/now", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.gameWeek?.[0]?.games || [];
}

export default async function GamesList() {
  const games = await getGames();

  return <LiveUpdater initialGames={games} />;
}