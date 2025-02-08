

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChartSkeleton() {
  return (
    <Card className="w-full px-4">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Loading Chart...</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="relative h-[250px] w-full">
          <div className="absolute inset-0 flex items-end gap-2 justify-around">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-full w-4 rounded bg-muted animate-pulse"
                style={{
                  height: `${Math.random() * 60 + 40}%`, // Random bar heights
                }}
              ></div>
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white via-white to-transparent"></div>
        </div>
      </CardContent>
    </Card>
  );
}
