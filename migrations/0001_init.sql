-- DriveTest Routes Canada - Initial Schema
-- Tables: test_centers, routes, speed_zones, hazards

CREATE TABLE IF NOT EXISTS test_centers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  address TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS routes (
  id TEXT PRIMARY KEY,
  center_id TEXT NOT NULL,
  name TEXT NOT NULL,
  test_type TEXT NOT NULL CHECK(test_type IN ('G2', 'G')),
  description TEXT,
  contributor_github_id TEXT,
  distance_km REAL,
  estimated_minutes INTEGER,
  coordinates TEXT NOT NULL,
  tips TEXT,
  FOREIGN KEY (center_id) REFERENCES test_centers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS speed_zones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  route_id TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  speed INTEGER NOT NULL,
  label TEXT,
  FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hazards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  route_id TEXT NOT NULL,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  type TEXT NOT NULL CHECK(type IN (
    'stop_sign','blind_spot','school_zone','merge','pedestrian',
    'yield_sign','lane_forced_turn','parked_cars','following_distance','right_on_red'
  )),
  description TEXT,
  FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_routes_center_id ON routes(center_id);
CREATE INDEX IF NOT EXISTS idx_speed_zones_route_id ON speed_zones(route_id);
CREATE INDEX IF NOT EXISTS idx_hazards_route_id ON hazards(route_id);
CREATE INDEX IF NOT EXISTS idx_test_centers_province ON test_centers(province);
