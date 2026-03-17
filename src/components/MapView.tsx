import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { TestCenter, Route } from "@/data/testCenters";

// Fix Leaflet default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  centers: TestCenter[];
  selectedRoute: Route | null;
  selectedCenter: TestCenter | null;
  onCenterClick: (center: TestCenter) => void;
}

const MapView = ({ centers, selectedRoute, selectedCenter, onCenterClick }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: false,
    }).setView([43.85, -79.8], 9);

    L.control.zoom({ position: "topright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    layersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers and route
  useEffect(() => {
    const map = mapRef.current;
    const layers = layersRef.current;
    if (!map || !layers) return;

    layers.clearLayers();

    if (selectedRoute && selectedCenter) {
      // Draw route polyline
      const polyline = L.polyline(selectedRoute.coordinates, {
        color: "#2563EB",
        weight: 5,
        opacity: 0.85,
      });
      layers.addLayer(polyline);

      // Start marker
      const startIcon = L.divIcon({
        className: "",
        html: `<div style="background:#2563EB;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);">S</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      L.marker(selectedRoute.coordinates[0], { icon: startIcon })
        .bindPopup(`<strong>${selectedCenter.name}</strong><br/>Start`)
        .addTo(layers);

      // Speed zone markers
      selectedRoute.speedZones.forEach((zone) => {
        const icon = L.divIcon({
          className: "",
          html: `<div class="speed-marker">${zone.speed}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });
        L.marker([zone.lat, zone.lng], { icon })
          .bindPopup(`<strong>${zone.speed} km/h</strong>${zone.label ? `<br/>${zone.label}` : ""}`)
          .addTo(layers);
      });

      // Hazard markers
      selectedRoute.hazards.forEach((hazard) => {
        const icon = L.divIcon({
          className: "",
          html: `<div class="hazard-marker">!</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });
        L.marker([hazard.lat, hazard.lng], { icon })
          .bindPopup(`<strong>${hazard.type.replace("_", " ").toUpperCase()}</strong><br/>${hazard.description}`)
          .addTo(layers);
      });

      map.fitBounds(polyline.getBounds(), { padding: [60, 60] });
    } else {
      // Show all test center markers
      centers.forEach((center) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:#2563EB;color:white;border-radius:8px;padding:4px 10px;font-weight:600;font-size:12px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.15);border:2px solid white;font-family:Inter,sans-serif;">${center.city}</div>`,
          iconAnchor: [40, 14],
        });
        L.marker([center.lat, center.lng], { icon })
          .on("click", () => onCenterClick(center))
          .addTo(layers);
      });
    }
  }, [centers, selectedRoute, selectedCenter, onCenterClick]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default MapView;
