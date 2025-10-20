import Papa from "papaparse";

export const csvHeaders = [
  "played_at", "location", "court_surface", "indoor", "opponent_name", "opponent_level", "format", "result", "scoreline",
  "total_games_for", "total_games_against", "winners", "unforced_errors", "double_faults", "aces",
  "first_serve_in", "first_serve_total", "first_serve_points_won", "second_serve_points_won",
  "return_points_won", "break_points_won", "break_points_total", "avg_rally_length", "max_rally_length", "notes"
];

export function parseCSV(file: File) {
  return new Promise<any[]>((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res.data),
      error: reject
    });
  });
}

export function serializeCSV(rows: any[]) {
  return Papa.unparse({ fields: csvHeaders, data: rows.map(r => csvHeaders.map(h => r[h] ?? "")) });
}
