import ScoreBoard from "../components/ScoreBoard";
import Link from "next/link";


export const metadata = {
  title: "Scores NHL en direct | Découvrez aussi NBA et MLB sur Fan de Sport",
  description:
    "Consultez les scores NHL en direct. Découvrez également Fan de Sport pour suivre les scores NBA, MLB et les résultats sportifs en temps réel.",
  keywords: [
    "NHL scores en direct",
    "résultats NHL",
    "match hockey aujourd'hui",
    "score hockey en direct",
    "NHL Canada",
  ],
  openGraph: {
    title: "Scores NHL en direct | Découvrez aussi NBA et MLB sur Fan de Sport",
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
    title: "Scores NHL en direct | Découvrez aussi NBA et MLB sur Fan de Sport",
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
    <main className="min-h-screen bg-black text-white max-w-6xl mx-auto">
      {/* Bannière simple mais efficace */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-xl p-5 my-6 text-center shadow-lg">
        <div className="inline-flex items-center gap-1 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-3">
          <span>🎯</span> NOUVEAU
        </div>
        {/* <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          Fan de Sport ⚡
        </h2>
        <p className="text-white/90 text-sm max-w-lg mx-auto mb-4">
          NHL • NBA • MLB — Scores en temps réel
        </p> */}
        {/* Titre avec icône */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white flex items-center justify-center gap-3 flex-wrap">
            <span>🚀</span>
            Découvrez Fan de Sport
            <span className="text-yellow-400">⭐</span>
          </h2>

          {/* Description claire avec puces visuelles */}
          <div className="max-w-3xl mx-auto mb-6">
            <p className="text-white/90 text-lg mb-4">
              La nouvelle plateforme tout-en-un pour suivre vos sports préférés !
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                🏒 <strong>NHL</strong>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                🏀 <strong>NBA</strong>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                ⚾ <strong>MLB</strong>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                ⚡ <strong>Temps réel</strong>
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                📊 <strong>Statistiques</strong>
              </span>
            </div>
          </div>

          {/* Bouton CTA principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Link
              href="https://v0-fan-de-sport-scores.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity"></span>
              <span>🎯</span>
              Accéder à Fan de Sport - Version améliorée du site
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>

            {/* Bouton secondaire "En savoir plus" */}
            {/* <Link
              href="#"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              <span>ℹ️</span>
              En savoir plus
            </Link> */}
          </div>

        {/* <Link
          href="https://v0-fan-de-sport-scores.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-2.5 rounded-lg font-semibold hover:shadow-xl transition-all duration-200"
        >
          Voir les scores en direct →
        </Link> */}
      </div>
      <ScoreBoard />
    </main>
  );
}