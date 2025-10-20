"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import courtsData from "@/data/courts.sample.json";
import { haversineKm } from "@/lib/geo";

const Map = dynamic(() => import("./sections/Map"), { ssr: false });

type Court = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  city: string;
  surface: string;
  indoor: boolean;
  lights: boolean;
  fee_type: string;
  booking: string;
  phones: string[];
  links: string[];
  notes?: string;
  updated_at: string;
};

export default function CourtsPage() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loc, setLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    const custom = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("courts_custom") || "[]") : [];
    setCourts([...(courtsData as Court[]), ...custom]);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setLoc({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => {},
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 8000 }
      );
    }
  }, []);

  const view = useMemo(() => {
    const arr = courts.filter((c) => {
      const k = q.trim().toLowerCase();
      if (!k) return true;
      return (
        c.name.toLowerCase().includes(k) ||
        c.address.toLowerCase().includes(k) ||
        c.city.toLowerCase().includes(k)
      );
    });
    if (loc) {
      return arr
        .map((c) => ({ ...c, _dist: Number(haversineKm(loc, { lat: c.lat, lng: c.lng }).toFixed(2)) }))
        .sort((a: any, b: any) => (a._dist ?? 999) - (b._dist ?? 999));
    }
    return arr;
  }, [courts, loc, q]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2">
        <input
          placeholder="지역/코트명 검색"
          className="border rounded px-3 py-2 w-full"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="border rounded px-3 py-2" onClick={() => setQ("")}>초기화</button>
      </div>

      <div className="grid md:grid-cols-5 gap-4">
        <div className="md:col-span-3 border rounded h-[520px] overflow-hidden">
          <Map courts={view} userLoc={loc} />
        </div>
        <div className="md:col-span-2 border rounded p-3 h-[520px] overflow-auto">
          <ul className="divide-y">
            {view.map((c: any) => (
              <li key={c.id} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <a href={`/courts/${c.id}`} className="font-semibold hover:underline">{c.name}</a>
                    <div className="text-xs text-gray-600">{c.address}</div>
                    <div className="text-xs mt-1">
                      {c.surface} · {c.indoor ? "실내" : "실외"} · {c.lights ? "조명" : "무조명"} · {c.fee_type === "free" ? "무료" : "유료"}
                    </div>
                  </div>
                  <div className="text-xs text-right whitespace-nowrap">
                    {typeof c._dist === "number" ? `${c._dist} km` : ""}
                    <div className="mt-2">
                      <a
                        className="underline"
                        target="_blank"
                        href={`https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`}
                      >
                        길찾기
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {view.length === 0 && (
              <li className="py-12 text-center text-gray-500">검색 결과가 없습니다.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}


