import { MapPin, ChevronRight } from "lucide-react";
import type { TestCenter } from "@/data/testCenters";

interface TestCenterListProps {
  centers: TestCenter[];
  onSelect: (center: TestCenter) => void;
}

import { useNavigate } from "react-router-dom";

const TestCenterList = ({ centers, onSelect }: TestCenterListProps) => {
  const navigate = useNavigate();

  // Group by region
  const grouped = centers.reduce<Record<string, TestCenter[]>>((acc, c) => {
    const groupKey = c.region || "Other Region";
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(c);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">Test Centres</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Ontario • {centers.length} locations</p>
      </div>
      {Object.entries(grouped).map(([region, regionCenters]) => (
        <div key={region}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{region}</h3>
          <div className="space-y-1.5">
            {regionCenters.map((center) => {
              const routeCount = center.routes?.length || 0;
              return (
              <button
                key={center.id}
                onClick={() => {
                  if (routeCount > 0) {
                    onSelect(center);
                  } else {
                    navigate(`/request-route?centerId=${center.id}`);
                  }
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-accent transition-colors text-left min-h-[52px]"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{center.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {routeCount > 0 
                      ? `${routeCount} route${routeCount !== 1 ? "s" : ""}` 
                      : "Route data not available"}
                  </p>
                  {center.testsOffered && (
                    <div className="flex gap-1 mt-1">
                      {center.testsOffered.map(test => (
                        <span key={test} className="inline-block px-1.5 py-0.5 rounded-full bg-secondary text-[10px] font-medium text-secondary-foreground">
                          {test}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </button>
            )})}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestCenterList;
