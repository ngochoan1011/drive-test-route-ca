export interface SpeedZone {
  lat: number;
  lng: number;
  speed: number;
  label?: string;
}

export interface HazardMarker {
  lat: number;
  lng: number;
  type: "stop_sign" | "blind_spot" | "school_zone" | "merge" | "pedestrian";
  description: string;
}

export interface Route {
  id: string;
  name: string;
  testType: "G2" | "G";
  description: string;
  contributor_github_id: string;
  distance_km: number;
  estimated_minutes: number;
  coordinates: [number, number][]; // [lat, lng]
  speedZones: SpeedZone[];
  hazards: HazardMarker[];
}

export interface TestCenter {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  lat: number;
  lng: number;
  routes: Route[];
}

export const testCenters: TestCenter[] = [
  {
    id: "orangeville",
    name: "Orangeville DriveTest Centre",
    city: "Orangeville",
    province: "Ontario",
    address: "75 Fifth Ave, Orangeville, ON L9W 1G1",
    lat: 43.9201,
    lng: -80.0943,
    routes: [
      {
        id: "orangeville-g-1",
        name: "Orangeville G Route 1",
        testType: "G",
        description: "Full G road test route through Orangeville combining plaza exit, Highway 10 bypass (80 km/h), downtown Broadway (50 km/h), and residential streets with school zones (40 km/h). Includes highway lane changes, yield sign exit, downtown right-on-red traps, and three consecutive 4-way stops in residential area.",
        contributor_github_id: "ngochoan1011",
        distance_km: 12.5,
        estimated_minutes: 20,
        coordinates: [
          [43.9247866, -80.0909235],
          [43.9248628, -80.0913243],
          [43.9267426, -80.0921098],
          [43.9275515, -80.0893881],
          [43.9278297, -80.0892969],
          [43.9339125, -80.1000124],
          [43.9330394, -80.10086],
          [43.9308373, -80.1003665],
          [43.9275611, -80.0995832],
          [43.9284497, -80.0952381],
          [43.9288824, -80.0943261],
          [43.9305514, -80.0930494],
          [43.9222601, -80.0837475],
          [43.9217191, -80.0841015],
          [43.9216805, -80.0858825],
          [43.9204904, -80.091998],
          [43.9193003, -80.0973946],
          [43.9213868, -80.0979417],
          [43.9224996, -80.0928563],
          [43.9262667, -80.0943851],
          [43.9267426, -80.0921098],
          [43.9246691, -80.0912389]
        ],
        speedZones: [
          { lat: 43.9247866, lng: -80.0909235, speed: 15, label: "Plaza / Internal Road" },
          { lat: 43.9339125, lng: -80.1000124, speed: 80, label: "Highway 10 Bypass (Southbound)" },
          { lat: 43.9308373, lng: -80.1003665, speed: 50, label: "First Street & Broadway (Downtown)" },
          { lat: 43.9284497, lng: -80.0952381, speed: 40, label: "Fifth Avenue (School/Residential Zone)" },
          { lat: 43.9213868, lng: -80.0979417, speed: 40, label: "" },
          { lat: 43.9262667, lng: -80.0943851, speed: 50, label: "Broadway (Downtown)" },
          { lat: 43.9222601, lng: -80.0837475, speed: 40, label: "Second Avenue (Residential Zone)" },
        ],
        hazards: [
          { lat: 43.9262667, lng: -80.0943851, type: "merge", description: "Broadway exit — Yield sign. Check pedestrians and traffic from left before merging." },
          { lat: 43.9267426, lng: -80.0921098, type: "blind_spot", description: "TRAP: Right lane becomes right-turn-only on Broadway. Must signal and move to left lane." },
          { lat: 43.9305514, lng: -80.0930494, type: "pedestrian", description: "TRAP: When turning right on red downtown, must come to COMPLETE stop." },
          { lat: 43.9217191, lng: -80.0841015, type: "blind_spot", description: "TRAP: Cars parked on Second Ave — maintain at least 1 meter clearance." },
          { lat: 43.9339125, lng: -80.1000124, type: "merge", description: "TRAP: When stopped at red on highway, stop far enough behind to see rear tires." },
          { lat: 43.9216805, lng: -80.0858825, type: "stop_sign", description: "All-way stop #1 — full stop required" },
          { lat: 43.9204904, lng: -80.091998, type: "stop_sign", description: "All-way stop #2 — full stop, then turn left" },
          { lat: 43.9193003, lng: -80.0973946, type: "stop_sign", description: "All-way stop #3 — full stop, then turn right" },
        ],
      },
    ],
  },
];

