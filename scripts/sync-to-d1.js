/**
 * sync-to-d1.js
 * 
 * Scans the /data directory for test center and route JSON files,
 * then generates SQL INSERT OR REPLACE statements for the D1 database.
 * 
 * Usage: node scripts/sync-to-d1.js > sync.sql
 * 
 * Directory structure expected:
 *   data/<province>/<city>/center.json
 *   data/<province>/<city>/routes/<route-id>.json
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = join(__dirname, '..', 'data');

function escapeSQL(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

function generateSQL() {
  const statements = [];

  // Clear existing data (full sync approach)
  statements.push('DELETE FROM hazards;');
  statements.push('DELETE FROM speed_zones;');
  statements.push('DELETE FROM routes;');
  statements.push('DELETE FROM test_centers;');

  if (!existsSync(dataDir)) {
    console.error('Error: /data directory not found');
    process.exit(1);
  }

  // Scan provinces
  const provinces = readdirSync(dataDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const province of provinces) {
    const provincePath = join(dataDir, province);
    const cities = readdirSync(provincePath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    for (const city of cities) {
      const cityPath = join(provincePath, city);
      const centerFile = join(cityPath, 'center.json');

      if (!existsSync(centerFile)) {
        console.error(`Warning: No center.json found in ${cityPath}, skipping...`);
        continue;
      }

      // Parse center
      const center = JSON.parse(readFileSync(centerFile, 'utf8'));
      statements.push(
        `INSERT OR REPLACE INTO test_centers (id, name, city, province, address, lat, lng) VALUES (${escapeSQL(center.id)}, ${escapeSQL(center.name)}, ${escapeSQL(center.city)}, ${escapeSQL(center.province)}, ${escapeSQL(center.address)}, ${center.lat}, ${center.lng});`
      );

      // Parse routes
      const routesDir = join(cityPath, 'routes');
      if (!existsSync(routesDir)) continue;

      const routeFiles = readdirSync(routesDir)
        .filter(f => f.endsWith('.json'));

      for (const routeFile of routeFiles) {
        const route = JSON.parse(readFileSync(join(routesDir, routeFile), 'utf8'));

        statements.push(
          `INSERT OR REPLACE INTO routes (id, center_id, name, test_type, description, contributor_github_id, distance_km, estimated_minutes, coordinates, tips) VALUES (${escapeSQL(route.id)}, ${escapeSQL(center.id)}, ${escapeSQL(route.name)}, ${escapeSQL(route.testType)}, ${escapeSQL(route.description)}, ${escapeSQL(route.contributor_github_id)}, ${route.distance_km}, ${route.estimated_minutes}, ${escapeSQL(JSON.stringify(route.coordinates))}, ${route.tips ? escapeSQL(route.tips) : 'NULL'});`
        );

        // Speed zones
        if (route.speedZones) {
          for (const zone of route.speedZones) {
            statements.push(
              `INSERT INTO speed_zones (route_id, lat, lng, speed, label) VALUES (${escapeSQL(route.id)}, ${zone.lat}, ${zone.lng}, ${zone.speed}, ${zone.label ? escapeSQL(zone.label) : 'NULL'});`
            );
          }
        }

        // Hazards
        if (route.hazards) {
          for (const hazard of route.hazards) {
            statements.push(
              `INSERT INTO hazards (route_id, lat, lng, type, description) VALUES (${escapeSQL(route.id)}, ${hazard.lat}, ${hazard.lng}, ${escapeSQL(hazard.type)}, ${escapeSQL(hazard.description)});`
            );
          }
        }
      }
    }
  }

  return statements.join('\n');
}

console.log(generateSQL());
