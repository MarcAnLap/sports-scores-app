import { NextResponse } from "next/server";

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

function formatDateUTC(date: Date) {
  return date.toISOString().split("T")[0];
}

export async function GET() {
  try {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    const yesterdayDate = formatDateUTC(yesterday);

    const [scheduleRes, scoreNowRes, scoreYesterdayRes] = await Promise.all([
      fetch("https://api-web.nhle.com/v1/schedule/now", {
        cache: "no-store",
      }),
      fetch("https://api-web.nhle.com/v1/score/now", {
        cache: "no-store",
      }),
      fetch(`https://api-web.nhle.com/v1/score/${yesterdayDate}`, {
        cache: "no-store",
      }),
    ]);

    if (!scheduleRes.ok || !scoreNowRes.ok || !scoreYesterdayRes.ok) {
      return NextResponse.json(
        {
          error: "Erreur lors du fetch NHL",
          scheduleStatus: scheduleRes.status,
          scoreNowStatus: scoreNowRes.status,
          scoreYesterdayStatus: scoreYesterdayRes.status,
        },
        { status: 500 }
      );
    }

    const scheduleData = await scheduleRes.json();
    const scoreNowData = await scoreNowRes.json();
    const scoreYesterdayData = await scoreYesterdayRes.json();

    const scheduleGames: Game[] =
      scheduleData.gameWeek?.flatMap((day: { games?: Game[] }) => day.games || []) || [];

    const scoreNowGames: Game[] = scoreNowData.games || [];
    const scoreYesterdayGames: Game[] = scoreYesterdayData.games || [];

    return NextResponse.json({
      scheduleGames,
      scoreNowGames,
      scoreYesterdayGames,
      debug: {
        scheduleCount: scheduleGames.length,
        scoreNowCount: scoreNowGames.length,
        scoreYesterdayCount: scoreYesterdayGames.length,
        yesterdayDate,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur serveur NHL",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}