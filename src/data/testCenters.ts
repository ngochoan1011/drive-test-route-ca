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
  address: string;
  region?: string;
  testsOffered?: string[];
  city?: string;
  province?: string;
  lat?: number;
  lng?: number;
  routes?: Route[];
}

export const testCenters: TestCenter[] = [
  {
    id: "orangeville",
    name: "Orangeville DriveTest Centre",
    region: "Central",
    address: "50 Fourth Ave, Orangeville, ON L9W 4P1",
    testsOffered: ["G2", "G", "M2"],
    city: "Orangeville",
    province: "Ontario",
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
          { lat: 43.9213868, lng: -80.0979417, speed: 40, label: "Second Avenue (Residential Zone)" },
          { lat: 43.9262667, lng: -80.0943851, speed: 40, label: "" },
          { lat: 43.9222601, lng: -80.0837475, speed: 50, label: "Broadway (Downtown)" },
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
  {
    id: "brampton",
    name: "Brampton DriveTest Centre",
    region: "Central",
    address: "59 First Gulf Blvd, Unit 9, Brampton, ON L6W 4P9",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "mississauga",
    name: "Mississauga DriveTest Centre",
    region: "Central",
    address: "255 Longside Drive, Mississauga, ON L5W 1L8",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "toronto-downsview",
    name: "Toronto Downsview DriveTest Centre",
    region: "Central",
    address: "Downsview Park, 37 Carl Hall Rd, Toronto, ON M3K 2E2",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "toronto-etobicoke",
    name: "Toronto Etobicoke DriveTest Centre",
    region: "Central",
    address: "Centennial Park Plaza, 5555 Eglinton Ave W, Unit E120-124, Etobicoke, ON M9C 5M1",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "toronto-metro-east",
    name: "Toronto Metro East DriveTest Centre",
    region: "Central",
    address: "Victoria Terrace Plaza, 1448 Lawrence Ave E, Unit 15, North York, ON M4A 2V6",
    testsOffered: ["G2", "G"]
  },
  {
    id: "toronto-port-union",
    name: "Toronto Port Union DriveTest Centre",
    region: "Central",
    address: "The Village of Abbey Lane, 91 Rylander Blvd, Unit 109A, Scarborough, ON M1B 5M5",
    testsOffered: ["G2", "G"]
  },
  {
    id: "newmarket",
    name: "Newmarket DriveTest Centre",
    region: "Central",
    address: "320 Harry Walker Parkway S, Newmarket, ON L3Y 7B4",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "oakville",
    name: "Oakville DriveTest Centre",
    region: "Central",
    address: "2370 Wyecroft Rd, Oakville, ON L6L 5L7",
    testsOffered: ["G2", "G"]
  },
  {
    id: "burlington",
    name: "Burlington DriveTest Centre",
    region: "Central",
    address: "Burlington Power Centre, 1250 Brant St, Unit 2, Burlington, ON L7P 1X8",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "oshawa",
    name: "Oshawa DriveTest Centre",
    region: "Central",
    address: "Midtown Mall, 200 John St W, Oshawa, ON L1J 2B4",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "barrie",
    name: "Barrie DriveTest Centre",
    region: "Central",
    address: "520 Bryne Dr, Unit 7, Barrie, ON L4N 9P6",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "ottawa-walkley",
    name: "Ottawa Walkley DriveTest Centre",
    region: "Eastern",
    address: "1570 Walkley Rd, Ottawa, ON K1V 6P5",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "ottawa-canotek",
    name: "Ottawa Canotek DriveTest Centre",
    region: "Eastern",
    address: "5303 Canotek Rd, Unit 14, Ottawa, ON K1J 9M1",
    testsOffered: ["G2", "G"]
  },
  {
    id: "kingston",
    name: "Kingston DriveTest Centre",
    region: "Eastern",
    address: "1525 Centennial Drive, Kingston, ON K7P 0K4",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "london",
    name: "London DriveTest Centre",
    region: "Western",
    address: "4380 Wellington Rd S, London, ON N6E 2Z6",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "brantford",
    name: "Brantford DriveTest Centre",
    region: "Western",
    address: "41 Morton Ave E, Unit 2, Brantford, ON N3R 2N6",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  },
  {
    id: "kitchener",
    name: "Kitchener DriveTest Centre",
    region: "Western",
    address: "1405 Ottawa St N, Kitchener, ON N2A 3Z1",
    testsOffered: ["G2", "G", "M2", "Commercial"]
  }
];
