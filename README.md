# DriveTest Routes Canada 🚗🇨🇦

**DriveTest Routes Canada** is an open-source Progressive Web App (PWA) designed to help learner drivers find, view, and practice G2 and G road test routes across Canada (starting with Ontario). The application provides interactive maps with speed limits, hazard markers, and a mock-test navigation mode.

## 🌟 Core Features
- **Interactive Map Navigation:** View test centers, search for locations and routes, and see GeoJSON route data with custom speed limit and hazard markers.
- **Real-time Mock Test Mode:** Uses the browser's Geolocation API to track your live position against a selected route.
- **Offline Route Access (PWA):** Download specific test center routes and map tiles for practice without an active internet connection.
- **Community Contributions:** "Data as Code" architecture allows the community to contribute routes via Git PRs.
- **Modern UI/UX:** Built with React, Tailwind CSS, and shadcn/ui.

## 🛠 Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Maps:** Leaflet / React-Leaflet
- **Infrastructure & Hosting:** Cloudflare Pages
- **Database:** Cloudflare D1 (SQLite at the edge)
- **CI/CD:** GitHub Actions

---

## 🚀 Deployment & Infrastructure Setup (Cloudflare)

This project is configured for a **GitOps / "Data as Code"** workflow. Route data is stored in static JSON files within the repository (`/data`) and automatically synchronized to a production Cloudflare D1 database whenever PRs are merged to `main`.

### Architecture & Data Flow
1. **Source of Truth:** All test centers and routes exist as JSON files in `data/<province>/<city>/...`. 
2. **CI/CD Pipeline:** On every push to `main`, GitHub Actions:
   - Builds the production React SPA.
   - Deploys the static assets to **Cloudflare Pages**.
   - Runs D1 schema migrations (`migrations/0001_init.sql`).
   - Uses `scripts/sync-to-d1.js` to parse the `/data` directory and sync all routes into the **Cloudflare D1** database.

### Initializing the Project

If you are setting this up for the first time, here is what is included:

| File / Folder | Purpose |
|---|---|
| `wrangler.toml` | Cloudflare CLI configuration with D1 database binding (`drivetest-db`). |
| `migrations/0001_init.sql` | The D1 relational schema (tables: `test_centers`, `routes`, `speed_zones`, `hazards`). |
| `scripts/sync-to-d1.js` | Node.js script that converts JSON files into SQL `INSERT OR REPLACE` transactions. |
| `.github/workflows/deploy.yml` | The automated CI/CD pipeline triggered on pushes to `main`. |
| `public/_redirects` | Ensures Cloudflare Pages correctly routes all traffic back to `index.html` (for the SPA). |
| `data/` | The GitOps folder holding all community-submitted GeoJSON route files. |

### Development & Local Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Local Development Server:**
   ```bash
   npm run dev
   ```

3. **Test D1 Migrations Locally:**
   ```bash
   npx wrangler d1 execute drivetest-db --local --file=migrations/0001_init.sql
   ```

4. **Sync Data to Local Database:**
   ```bash
   node scripts/sync-to-d1.js > /tmp/sync.sql
   npx wrangler d1 execute drivetest-db --local --file=/tmp/sync.sql
   ```

---

## 🔐 For Maintainers: Production Setup

To successfully deploy via GitHub Actions, the following environment secrets MUST be configured in your GitHub repository (**Settings → Environments → PROD → Environment Secrets**):

- `CLOUDFLARE_API_TOKEN`: Needs `Cloudflare D1: Edit` and `Cloudflare Pages: Edit` permissions.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.

Note: The CI/CD workflow `.github/workflows/deploy.yml` is configured to use the `PROD` environment context for accessing these secrets.
