import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { testCenters, type TestCenter, type Route } from "@/data/testCenters";
import MapView from "@/components/MapView";
import SearchBar from "@/components/SearchBar";
import RightSidePanel from "@/components/RightSidePanel";
import TestCenterList from "@/components/TestCenterList";
import RouteList from "@/components/RouteList";
import RouteDetail from "@/components/RouteDetail";

type View = "list" | "routes" | "detail";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<View>("list");
  const [selectedCenter, setSelectedCenter] = useState<TestCenter | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [isPracticeMode, setIsPracticeMode] = useState(false);

  // Initialize from URL
  useEffect(() => {
    const routeId = searchParams.get('route');
    if (routeId) {
      for (const center of testCenters) {
        const route = center.routes.find((r) => r.id === routeId);
        if (route) {
          setSelectedCenter(center);
          setSelectedRoute(route);
          setView("detail");
          return;
        }
      }
    }
  }, []); // Only run once on mount

  const handleSelectCenter = useCallback((center: TestCenter) => {
    setSelectedCenter(center);
    setSelectedRoute(null);
    setView("routes");
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const handleSelectRoute = useCallback((route: Route) => {
    setSelectedRoute(route);
    setView("detail");
    setSearchParams({ route: route.id });
  }, [setSearchParams]);

  const handleBack = useCallback(() => {
    if (view === "detail") {
      setIsPracticeMode(false);
      setSelectedRoute(null);
      setView("routes");
      setSearchParams(new URLSearchParams());
    } else if (view === "routes") {
      setSelectedCenter(null);
      setView("list");
      setSearchParams(new URLSearchParams());
    }
  }, [view, setSearchParams]);

  const handleTogglePractice = useCallback(() => {
    setIsPracticeMode((prev) => !prev);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MapView
        centers={testCenters}
        selectedRoute={selectedRoute}
        selectedCenter={selectedCenter}
        onCenterClick={handleSelectCenter}
        isPracticeMode={isPracticeMode}
      />

      <SearchBar centers={testCenters} onSelect={handleSelectCenter} />

      <RightSidePanel>
        {view === "list" && (
          <TestCenterList centers={testCenters} onSelect={handleSelectCenter} />
        )}
        {view === "routes" && selectedCenter && (
          <RouteList
            center={selectedCenter}
            onSelectRoute={handleSelectRoute}
            onBack={handleBack}
          />
        )}
        {view === "detail" && selectedRoute && selectedCenter && (
          <RouteDetail
            route={selectedRoute}
            center={selectedCenter}
            onBack={handleBack}
            isPracticeMode={isPracticeMode}
            onTogglePractice={handleTogglePractice}
          />
        )}
      </RightSidePanel>
    </div>
  );
};

export default Index;
