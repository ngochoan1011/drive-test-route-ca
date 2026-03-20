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
        id: "orangeville-g2-1",
        name: "Orangeville G2 Route 1",
        testType: "G2",
        description: "Standard G2 test route covering residential streets and Broadway intersection. Includes parallel parking near Town Hall.",
        contributor_github_id: "drivetest-community",
        distance_km: 8.2,
        estimated_minutes: 15,
        coordinates: [
          [43.9201, -80.0943],
          [43.9215, -80.0930],
          [43.9230, -80.0910],
          [43.9245, -80.0885],
          [43.9260, -80.0870],
          [43.9275, -80.0855],
          [43.9260, -80.0830],
          [43.9240, -80.0810],
          [43.9220, -80.0830],
          [43.9210, -80.0860],
          [43.9200, -80.0890],
          [43.9195, -80.0920],
          [43.9201, -80.0943],
        ],
        speedZones: [
          { lat: 43.9215, lng: -80.0930, speed: 40, label: "School Zone" },
          { lat: 43.9260, lng: -80.0870, speed: 50 },
          { lat: 43.9240, lng: -80.0810, speed: 60 },
        ],
        hazards: [
          { lat: 43.9230, lng: -80.0910, type: "stop_sign", description: "Hidden stop sign behind tree" },
          { lat: 43.9275, lng: -80.0855, type: "blind_spot", description: "Blind corner at Broadway & First" },
          { lat: 43.9220, lng: -80.0830, type: "pedestrian", description: "Heavy pedestrian traffic near park" },
        ],
      },
      {
        id: "orangeville-g-1",
        name: "Orangeville G Route 1",
        testType: "G",
        description: "Full G test route including highway merge onto Hwy 10 and residential streets.",
        contributor_github_id: "ontario-drivers",
        distance_km: 15.4,
        estimated_minutes: 25,
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
          { lat: 43.9150, lng: -80.0990, speed: 80, label: "Hwy 10" },
          { lat: 43.9050, lng: -80.1100, speed: 80 },
          { lat: 43.9080, lng: -80.1000, speed: 50 },
        ],
        hazards: [
          { lat: 43.9120, lng: -80.1020, type: "merge", description: "Highway merge — check blind spot" },
          { lat: 43.9050, lng: -80.1040, type: "stop_sign", description: "Stop sign at rural intersection" },
        ],
      },
    ],
  },
  {
    id: "vaughan",
    name: "Vaughan DriveTest Centre",
    city: "Vaughan",
    province: "Ontario",
    address: "3300 Rutherford Rd, Vaughan, ON L4K 5Z2",
    lat: 43.8361,
    lng: -79.5430,
    routes: [
      {
        id: "vaughan-g2-1",
        name: "Vaughan G2 Route 1",
        testType: "G2",
        description: "Popular G2 route through residential Vaughan. Covers Rutherford Rd, Weston Rd, and local side streets.",
        contributor_github_id: "vaughan-driver",
        distance_km: 9.1,
        estimated_minutes: 18,
        coordinates: [
          [43.8361, -79.5430],
          [43.8375, -79.5410],
          [43.8390, -79.5380],
          [43.8405, -79.5350],
          [43.8420, -79.5320],
          [43.8435, -79.5290],
          [43.8420, -79.5260],
          [43.8400, -79.5280],
          [43.8380, -79.5310],
          [43.8365, -79.5350],
          [43.8355, -79.5390],
          [43.8361, -79.5430],
        ],
        speedZones: [
          { lat: 43.8375, lng: -79.5410, speed: 50 },
          { lat: 43.8420, lng: -79.5320, speed: 40, label: "School Zone" },
          { lat: 43.8380, lng: -79.5310, speed: 60 },
        ],
        hazards: [
          { lat: 43.8390, lng: -79.5380, type: "stop_sign", description: "4-way stop — often missed" },
          { lat: 43.8435, lng: -79.5290, type: "blind_spot", description: "Blind driveway exit on right" },
          { lat: 43.8400, lng: -79.5280, type: "school_zone", description: "School zone — watch for children" },
        ],
      },
    ],
  },
  {
    id: "downsview",
    name: "Downsview DriveTest Centre",
    city: "Toronto",
    province: "Ontario",
    address: "1 Sheppard Ave E, Toronto, ON M2N 5Y7",
    lat: 43.7615,
    lng: -79.4111,
    routes: [
      {
        id: "downsview-g2-1",
        name: "Downsview G2 Route 1",
        testType: "G2",
        description: "Urban G2 route through North York residential area. Includes tight turns and busy intersections.",
        contributor_github_id: "gta-routes",
        distance_km: 7.8,
        estimated_minutes: 16,
        coordinates: [
          [43.7615, -79.4111],
          [43.7630, -79.4090],
          [43.7645, -79.4060],
          [43.7660, -79.4030],
          [43.7650, -79.4000],
          [43.7635, -79.3980],
          [43.7620, -79.4010],
          [43.7610, -79.4050],
          [43.7605, -79.4080],
          [43.7615, -79.4111],
        ],
        speedZones: [
          { lat: 43.7630, lng: -79.4090, speed: 40 },
          { lat: 43.7660, lng: -79.4030, speed: 50 },
        ],
        hazards: [
          { lat: 43.7645, lng: -79.4060, type: "pedestrian", description: "Busy pedestrian crossing" },
          { lat: 43.7635, lng: -79.3980, type: "stop_sign", description: "Partially hidden stop sign" },
        ],
      },
    ],
  },
];
