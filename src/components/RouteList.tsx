import { ArrowLeft, Route as RouteIcon, Clock, Ruler } from "lucide-react";
import type { TestCenter, Route } from "@/data/testCenters";
import { Badge } from "@/components/ui/badge";

interface RouteListProps {
  center: TestCenter;
  onSelectRoute: (route: Route) => void;
  onBack: () => void;
}

const RouteList = ({ center, onSelectRoute, onBack }: RouteListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-accent transition-colors min-h-[44px] min-w-[44px]"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div>
          <h2 className="text-lg font-bold text-foreground">{center.city}</h2>
          <p className="text-xs text-muted-foreground">{center.address}</p>
        </div>
      </div>

      <div className="space-y-2">
        {center.routes.map((route) => (
          <button
            key={route.id}
            onClick={() => onSelectRoute(route)}
            className="w-full p-4 rounded-xl bg-card hover:bg-accent transition-colors text-left min-h-[52px]"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                <RouteIcon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-foreground">{route.name}</p>
                  <Badge
                    variant={route.testType === "G2" ? "default" : "secondary"}
                    className="text-[10px] px-1.5 py-0"
                  >
                    {route.testType}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{route.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Ruler className="h-3 w-3" />
                    {route.distance_km} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    ~{route.estimated_minutes} min
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RouteList;
