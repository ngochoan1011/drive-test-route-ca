-- Migration: Add new hazard types for richer route data
-- New types: yield_sign, lane_forced_turn, parked_cars, following_distance, right_on_red

-- D1 does not support ALTER TABLE ... ALTER COLUMN with CHECK constraints.
-- We need to recreate the table with the expanded CHECK constraint.

-- Step 1: Rename old table
ALTER TABLE hazards RENAME TO hazards_old;

-- Step 2: Create new table with expanded hazard types
CREATE TABLE hazards (
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

-- Step 3: Copy data from old table
INSERT INTO hazards (id, route_id, lat, lng, type, description)
  SELECT id, route_id, lat, lng, type, description FROM hazards_old;

-- Step 4: Drop old table
DROP TABLE hazards_old;

-- Step 5: Recreate index
CREATE INDEX IF NOT EXISTS idx_hazards_route_id ON hazards(route_id);

-- Step 6: Add tips column to routes table
ALTER TABLE routes ADD COLUMN tips TEXT;
