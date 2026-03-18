import { ArrowLeft, Play, AlertTriangle, Gauge, Share2 } from "lucide-react";
import { toast } from "sonner";
import type { Route, TestCenter } from "@/data/testCenters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RouteDetailProps {
  route: Route;
  center: TestCenter;
  onBack: () => void;
}

const RouteDetail = ({ route, center, onBack }: RouteDetailProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-accent transition-colors min-h-[44px] min-w-[44px]"
        >
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground truncate">{route.name}</h2>
            <Badge
              variant={route.testType === "G2" ? "default" : "secondary"}
              className="text-[10px] px-1.5 py-0 flex-shrink-0"
            >
              {route.testType}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{center.city} • {route.distance_km} km • ~{route.estimated_minutes} min</p>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
          }}
          className="h-9 w-9 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors min-h-[44px] min-w-[44px]"
          aria-label="Share route"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground">{route.description}</p>

      <Button className="w-full h-12 rounded-xl font-semibold text-sm gap-2">
        <Play className="h-4 w-4" />
        Start Practice Mode
      </Button>

      {/* Legend */}
      <div className="rounded-xl bg-card p-3 space-y-2">
        <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Map Legend</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-caution flex items-center justify-center">
              <Gauge className="h-3 w-3 text-caution-foreground" />
            </div>
            Speed limit
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-hazard flex items-center justify-center">
              <AlertTriangle className="h-3 w-3 text-hazard-foreground" />
            </div>
            Hazard
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-1 rounded bg-primary" />
            Route path
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">S</div>
            Start
          </div>
        </div>
      </div>

      {/* Hazards list */}
      {route.hazards.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">Hazards & Notes</h3>
          {route.hazards.map((hazard, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-hazard/5 border border-hazard/10">
              <AlertTriangle className="h-4 w-4 text-hazard flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground capitalize">{hazard.type.replace(/_/g, " ")}</p>
                <p className="text-xs text-muted-foreground">{hazard.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contributor */}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        <img
          src={`https://github.com/${route.contributor_github_id}.png?size=32`}
          alt={route.contributor_github_id}
          className="w-6 h-6 rounded-full"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <span className="text-xs text-muted-foreground">
          Contributed by <span className="font-semibold text-foreground">@{route.contributor_github_id}</span>
        </span>
      </div>
    </div>
  );
};

export default RouteDetail;
