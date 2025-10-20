"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ courts, userLoc }: { courts: any[]; userLoc: { lat: number; lng: number } | null }) {
  const center = userLoc ?? { lat: 37.5665, lng: 126.978 };
  const AnyMap = MapContainer as any;
  const AnyTile = TileLayer as any;
  return (
    <AnyMap center={[center.lat, center.lng] as [number, number]} zoom={12} style={{ height: "100%", width: "100%" }}>
      <AnyTile attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {userLoc && (
        <Marker position={[userLoc.lat, userLoc.lng]}>
          <Popup>내 위치</Popup>
        </Marker>
      )}
      {courts.map((c) => (
        <Marker key={c.id} position={[c.lat, c.lng]}>
          <Popup>
            <div className="space-y-1">
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-gray-600">{c.address}</div>
              <a className="underline text-xs" href={`/courts/${c.id}`}>상세 보기</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </AnyMap>
  );
}


