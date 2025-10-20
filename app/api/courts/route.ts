import { NextRequest, NextResponse } from "next/server";
import data from "@/data/courts.sample.json";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");
  const q = (searchParams.get("q") || "").toLowerCase();
  const city = (searchParams.get("city") || "").toLowerCase();
  const surface = searchParams.get("surface");
  const indoor = searchParams.get("indoor");
  const lights = searchParams.get("lights");
  const fee = searchParams.get("fee");
  const booking = searchParams.get("booking");

  let rows = (data as any[]).filter((c) => {
    if (q && !(`${c.name}`.toLowerCase().includes(q) || `${c.address}`.toLowerCase().includes(q) || `${c.city}`.toLowerCase().includes(q))) return false;
    if (city && `${c.city}`.toLowerCase() !== city) return false;
    if (surface && c.surface !== surface) return false;
    if (indoor && String(c.indoor) !== indoor) return false;
    if (lights && String(c.lights) !== lights) return false;
    if (fee && c.fee_type !== fee) return false;
    if (booking && c.booking !== booking) return false;
    return true;
  });

  if (format === "geojson") {
    const fc = {
      type: "FeatureCollection",
      features: rows.map((c) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [c.lng, c.lat] },
        properties: { ...c },
      })),
    };
    return NextResponse.json(fc);
  }

  return NextResponse.json({ data: rows });
}


