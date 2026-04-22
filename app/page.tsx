import ScoreBoard from "../components/ScoreBoard";

export const metadata = {
  title: "Scores NHL en direct | Résultats hockey en temps réel",
  description:
    "Suivez les scores NHL en direct, les résultats des matchs, les rencontres en cours et les mises à jour en temps réel au Canada.",
  keywords: [
    "NHL scores en direct",
    "résultats NHL",
    "match hockey aujourd'hui",
    "score hockey en direct",
    "NHL Canada",
  ],
  openGraph: {
    title: "Scores NHL en direct",
    description:
      "Tous les matchs NHL en direct avec mises à jour rapides et fiables.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white max-w-3xl mx-auto">
      <ScoreBoard />
    </main>
  );
}