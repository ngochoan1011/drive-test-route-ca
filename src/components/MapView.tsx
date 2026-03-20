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
  isPracticeMode: boolean;
}

/** Calculate bearing between two [lat, lng] points in degrees */
function getBearing(from: [number, number], to: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const toDeg = (r: number) => (r * 180) / Math.PI;
  const dLng = toRad(to[1] - from[1]);
  const lat1 = toRad(from[0]);
  const lat2 = toRad(to[0]);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** Create a directional arrow icon rotated to the given bearing */
function createArrowIcon(bearing: number): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(${bearing - 90}deg);
      filter: drop-shadow(0 0 6px rgba(0, 229, 255, 0.8));
    ">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 5l7 7-7 7" stroke="#00E5FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

/** Create a pulsing head marker */
function createHeadIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `<div class="practice-head-marker"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

const MapView = ({ centers, selectedRoute, selectedCenter, onCenterClick, isPracticeMode }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const practiceLayersRef = useRef<L.LayerGroup | null>(null);
  const animationRef = useRef<number | null>(null);
  const headMarkerRef = useRef<L.Marker | null>(null);

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
    practiceLayersRef.current = L.layerGroup().addTo(map);
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
        if (center.lat === undefined || center.lng === undefined) return;
        const icon = L.divIcon({
          className: "",
          html: `<div style="background:#2563EB;color:white;border-radius:8px;padding:4px 10px;font-weight:600;font-size:12px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.15);border:2px solid white;font-family:Inter,sans-serif;">${center.city || center.name}</div>`,
          iconAnchor: [40, 14],
        });
        L.marker([center.lat, center.lng], { icon })
          .on("click", () => onCenterClick(center))
          .addTo(layers);
      });
    }
  }, [centers, selectedRoute, selectedCenter, onCenterClick]);

  // Practice mode animation
  useEffect(() => {
    const map = mapRef.current;
    const practiceLayers = practiceLayersRef.current;
    if (!map || !practiceLayers) return;

    // Cleanup function
    const cleanup = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      practiceLayers.clearLayers();
      headMarkerRef.current = null;
    };

    if (!isPracticeMode || !selectedRoute) {
      cleanup();
      return;
    }

    // Start practice mode animation
    cleanup();
    const coords = selectedRoute.coordinates;
    if (coords.length < 2) return;

    // Fit the map to show the whole route
    const bounds = L.latLngBounds(coords.map((c) => L.latLng(c[0], c[1])));
    map.fitBounds(bounds, { padding: [80, 80] });

    // Create the dim background path (ghosted full route)
    const ghostLine = L.polyline(coords, {
      color: "#2563EB",
      weight: 3,
      opacity: 0.15,
      dashArray: "8, 12",
    });
    practiceLayers.addLayer(ghostLine);

    // Animation state
    let currentSegment = 0;
    let segmentProgress = 0;
    const SEGMENT_DURATION_MS = 800; // ms per segment
    let lastTimestamp: number | null = null;

    // Glow polyline (wider, behind)
    const glowLine = L.polyline([], {
      color: "#00E5FF",
      weight: 14,
      opacity: 0.25,
      lineCap: "round",
      lineJoin: "round",
    });
    practiceLayers.addLayer(glowLine);

    // Bright polyline (narrower, on top)
    const brightLine = L.polyline([], {
      color: "#00E5FF",
      weight: 5,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round",
    });
    practiceLayers.addLayer(brightLine);

    // Head marker (pulsing dot)
    const headMarker = L.marker(coords[0], { icon: createHeadIcon(), zIndexOffset: 1000 });
    practiceLayers.addLayer(headMarker);
    headMarkerRef.current = headMarker;

    // Start arrow on first point
    const firstBearing = getBearing(coords[0], coords[1]);
    const startArrow = L.marker(coords[0], { icon: createArrowIcon(firstBearing), zIndexOffset: 500 });
    practiceLayers.addLayer(startArrow);

    // Completed points that already have arrows placed
    const drawnPoints: L.LatLng[] = [L.latLng(coords[0][0], coords[0][1])];

    function animate(timestamp: number) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      segmentProgress += dt / SEGMENT_DURATION_MS;

      if (segmentProgress >= 1) {
        // Complete current segment
        segmentProgress = 0;
        drawnPoints.push(L.latLng(coords[currentSegment + 1][0], coords[currentSegment + 1][1]));

        // Place arrow at end of completed segment
        if (currentSegment + 2 < coords.length) {
          const bearing = getBearing(coords[currentSegment + 1], coords[currentSegment + 2]);
          const arrow = L.marker(coords[currentSegment + 1], {
            icon: createArrowIcon(bearing),
            zIndexOffset: 500,
          });
          practiceLayers.addLayer(arrow);
        }

        currentSegment++;

        if (currentSegment >= coords.length - 1) {
          // Animation complete — push last point
          const lastPt = coords[coords.length - 1];
          drawnPoints.push(L.latLng(lastPt[0], lastPt[1]));
          glowLine.setLatLngs(drawnPoints);
          brightLine.setLatLngs(drawnPoints);
          headMarker.setLatLng(L.latLng(lastPt[0], lastPt[1]));

          // Place finish marker
          const finishIcon = L.divIcon({
            className: "",
            html: `<div style="background:#10B981;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.2);">✓</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          });
          L.marker(lastPt, { icon: finishIcon, zIndexOffset: 1100 }).addTo(practiceLayers);
          return; // Stop animation
        }
      }

      // Interpolate current position within the segment
      const from = coords[currentSegment];
      const to = coords[currentSegment + 1];
      const lat = from[0] + (to[0] - from[0]) * segmentProgress;
      const lng = from[1] + (to[1] - from[1]) * segmentProgress;
      const currentPoint = L.latLng(lat, lng);

      // Update polylines
      const linePoints = [...drawnPoints, currentPoint];
      glowLine.setLatLngs(linePoints);
      brightLine.setLatLngs(linePoints);

      // Update head marker position
      headMarker.setLatLng(currentPoint);

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    return cleanup;
  }, [isPracticeMode, selectedRoute]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default MapView;
