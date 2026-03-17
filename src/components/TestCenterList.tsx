import { MapPin, ChevronRight } from "lucide-react";
import type { TestCenter } from "@/data/testCenters";

interface TestCenterListProps {
  centers: TestCenter[];
  onSelect: (center: TestCenter) => void;
}

const TestCenterList = ({ centers, onSelect }: TestCenterListProps) => {
  // Group by city
  const grouped = centers.reduce<Record<string, TestCenter[]>>((acc, c) => {
    acc[c.city] = acc[c.city] || [];
    acc[c.city].push(c);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-foreground">Test Centres</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Ontario • {centers.length} locations</p>
      </div>
      {Object.entries(grouped).map(([city, cityCenters]) => (
        <div key={city}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{city}</h3>
          <div className="space-y-1.5">
            {cityCenters.map((center) => (
              <button
                key={center.id}
                onClick={() => onSelect(center)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-accent transition-colors text-left min-h-[52px]"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{center.name}</p>
                  <p className="text-xs text-muted-foreground">{center.routes.length} route{center.routes.length !== 1 ? "s" : ""}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestCenterList;
