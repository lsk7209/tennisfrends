"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResultCardProps } from "@/lib/types";

export default function ResultCardNew({ icon, title, items, color }: ResultCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div style={{ color }}>{icon}</div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-[#0BA360] mt-1">•</span>
              <span className="text-[#334155]">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
