import { useState, useCallback } from "react";
import { testCenters, type TestCenter, type Route } from "@/data/testCenters";
import MapView from "@/components/MapView";
import SearchBar from "@/components/SearchBar";
import BottomSheet from "@/components/BottomSheet";
import TestCenterList from "@/components/TestCenterList";
import RouteList from "@/components/RouteList";
import RouteDetail from "@/components/RouteDetail";

type View = "list" | "routes" | "detail";

const Index = () => {
  const [view, setView] = useState<View>("list");
  const [selectedCenter, setSelectedCenter] = useState<TestCenter | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const handleSelectCenter = useCallback((center: TestCenter) => {
    setSelectedCenter(center);
    setSelectedRoute(null);
    setView("routes");
  }, []);

  const handleSelectRoute = useCallback((route: Route) => {
    setSelectedRoute(route);
    setView("detail");
  }, []);

  const handleBack = useCallback(() => {
    if (view === "detail") {
      setSelectedRoute(null);
      setView("routes");
    } else if (view === "routes") {
      setSelectedCenter(null);
      setView("list");
    }
  }, [view]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <MapView
        centers={testCenters}
        selectedRoute={selectedRoute}
        selectedCenter={selectedCenter}
        onCenterClick={handleSelectCenter}
      />

      <SearchBar centers={testCenters} onSelect={handleSelectCenter} />

      <BottomSheet>
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
          />
        )}
      </BottomSheet>
    </div>
  );
};

export default Index;
