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
    images: [
      {
        url: "https://images.unsplash.com/photo-1516226415502-d6624544376b?q=80&w=1139&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Match NHL en direct - Hockey sur glace",
      },
    ],
    siteName: "NHL Live Scores",
    locale: "fr_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scores NHL en direct",
    description: "Tous les matchs NHL en direct avec mises à jour rapides et fiables.",
    images: [
      "https://images.unsplash.com/photo-1516226415502-d6624544376b?q=80&w=1139&auto=format&fit=crop",
    ],
    site: "@nhlscores", // Remplacez par votre handle Twitter si vous en avez un
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    // <main className="min-h-screen bg-black text-white max-w-3xl mx-auto">
    <main className="min-h-screen bg-black text-white max-w-screen mx-auto">
      <ScoreBoard />
    </main>
  );
}