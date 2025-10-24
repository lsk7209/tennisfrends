type RankingRow = {
  tour: "ATP" | "WTA";
  rank: number;
  player_id: string;
  player_name: string;
  country_code: string;
  age: number | null;
  points: number;
  tournaments: number | null;
  movement: number | null;
  protected: boolean | null;
  as_of: string;
};

export async function fetchRankings(tour: "ATP" | "WTA"): Promise<RankingRow[]> {
  const url = tour === "ATP" ? process.env.RANKINGS_API_MEN : process.env.RANKINGS_API_WOMEN;

  // 1) ENV API 우선 (응답 JSON은 RankingRow[] 스키마로 가정/매핑)
  if (url) {
    try {
      const r = await fetch(url, { next: { revalidate: 3600 } });
      if (r.ok) {
        const data = await r.json();
        if (Array.isArray(data) && data.length) return normalize(data, tour);
      }
    } catch {}
  }

  // 2) Local seed fallback
  const seedUrl = tour === "ATP" ? "/api/seed?tour=ATP" : "/api/seed?tour=WTA";
  const r2 = await fetch(seedUrl, { cache: "force-cache" });
  const seed = await r2.json();
  return normalize(seed, tour);
}

function normalize(rows: any[], tour: "ATP" | "WTA"): RankingRow[] {
  return rows
    .map((r: any) => ({
      tour,
      rank: Number(r.rank),
      player_id: String(r.player_id || slugify(r.player_name)),
      player_name: r.player_name,
      country_code: r.country_code || "UNK",
      age: r.age ?? null,
      points: Number(r.points || 0),
      tournaments: r.tournaments ? Number(r.tournaments) : null,
      movement: typeof r.movement === "number" ? r.movement : r.movement ? Number(r.movement) : null,
      protected: !!r.protected,
      as_of: r.as_of || new Date().toISOString().slice(0, 10)
    }))
    .sort((a, b) => a.rank - b.rank);
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
