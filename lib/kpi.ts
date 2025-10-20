// KPI 계산 유틸
export type MatchRow = {
  result: string;
  played_at: string;
  court_surface: string;
  indoor: boolean;
  total_games_for: number;
  total_games_against: number;
  winners: number;
  unforced_errors: number;
  double_faults: number;
  aces: number;
  first_serve_in: number;
  first_serve_total: number;
  first_serve_points_won: number;
  second_serve_points_won: number;
  return_points_won: number;
  break_points_won: number;
  break_points_total: number;
  avg_rally_length: number;
  max_rally_length: number;
  opponent_level: string;
  format: string;
};

export function calcKPIs(rows: MatchRow[]) {
  const gamesFor = rows.reduce((s, r) => s + (r.total_games_for || 0), 0);
  const gamesAg = rows.reduce((s, r) => s + (r.total_games_against || 0), 0);
  const wins = rows.filter(r => r.result === "win").length;
  const losses = rows.filter(r => r.result === "loss").length;
  const matchCount = rows.length;
  const winRate = matchCount ? Math.round((wins / matchCount) * 100) : 0;

  const fsTotal = rows.reduce((s, r) => s + (r.first_serve_total || 0), 0);
  const fsIn = rows.reduce((s, r) => s + (r.first_serve_in || 0), 0);
  const fsInRate = fsTotal ? Math.round((fsIn / fsTotal) * 100) : 0;

  const fsWon = rows.reduce((s, r) => s + (r.first_serve_points_won || 0), 0);
  const ssWon = rows.reduce((s, r) => s + (r.second_serve_points_won || 0), 0);
  const srvPointsWon = fsWon + ssWon;

  const retWon = rows.reduce((s, r) => s + (r.return_points_won || 0), 0);

  const bpTot = rows.reduce((s, r) => s + (r.break_points_total || 0), 0);
  const bpWon = rows.reduce((s, r) => s + (r.break_points_won || 0), 0);
  const bpRate = bpTot ? Math.round((bpWon / bpTot) * 100) : 0;

  const winners = rows.reduce((s, r) => s + (r.winners || 0), 0);
  const ue = rows.reduce((s, r) => s + (r.unforced_errors || 0), 0);
  const wueRatio = ue ? (winners / ue).toFixed(2) : (winners ? "∞" : "0");

  const avgRally = rows.length ? Number((rows.reduce((s, r) => s + (r.avg_rally_length || 0), 0) / rows.length).toFixed(1)) : 0;
  const maxRally = rows.reduce((m, r) => Math.max(m, r.max_rally_length || 0), 0);

  return {
    matchCount,
    wins,
    losses,
    winRate,
    gamesFor,
    gamesAg,
    gameDiff: gamesFor - gamesAg,
    fsInRate,
    srvPointsWon,
    retWon,
    bpRate,
    winners,
    ue,
    wueRatio,
    avgRally,
    maxRally
  };
}
