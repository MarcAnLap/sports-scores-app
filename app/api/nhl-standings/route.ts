// app/api/nhl-standings/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api-web.nhle.com/v1/standings/now", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Erreur API standings: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur fetch standings:", error);
    return NextResponse.json(
      { error: "Failed to fetch standings" },
      { status: 500 }
    );
  }
}