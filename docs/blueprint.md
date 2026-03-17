# **App Name**: DriveTest Routes Canada

## Core Features:

- Interactive Map Navigation: Display test centers, provide search functionality for locations and routes, and render GeoJSON route data with custom speed limit and hazard markers on an interactive map interface.
- Real-time Mock Test Mode: Utilize the browser's Geolocation API to track the user's live position against a selected route, offering real-time feedback on adherence to speed limits and highlighting hazards.
- Offline Route Access: Allow users to download specific test center routes and associated map tiles for seamless practice and navigation without an active internet connection, leveraging PWA service worker capabilities.
- Community Route Submission Tool: An in-app tool enabling users to draw new routes and mark specific points (speed limits, hazards) on a map. This tool will then automatically generate and submit a structured GeoJSON file and a Pull Request to the GitHub repository.
- Contributor Showcase: Parse and display the original contributor's GitHub username and avatar directly within the route details UI, acknowledging their open-source contributions.
- Git-powered Data Synchronization: An automated CI/CD process via GitHub Actions that parses .json and .geojson files from the /data directory in the repository and synchronizes them as an optimized read-replica into the Cloudflare D1 database.

## Style Guidelines:

- Primary color: A confident, professional medium-dark blue (#2962AA), symbolizing reliability and clarity, serving as the main brand accent and interactive element color.
- Background color: A very light, desaturated blue-gray (#F2F5F8), promoting a clean and unobstructed visual experience suitable for a modern PWA, harmonizing with the primary blue.
- Accent color: A bright, clear sky-blue/cyan (#4BC2E5), providing a vibrant contrast to highlight key information, CTAs, and add a dynamic touch to map elements, derived from an analogous hue to the primary color.
- Headline font: 'Space Grotesk' (sans-serif) for its modern, slightly techy appeal, well-suited for titles and prominent text.
- Body font: 'Inter' (sans-serif) for its neutrality, excellent legibility across various screen sizes, and suitability for longer blocks of informational text.
- Code font: 'Source Code Pro' (monospace sans-serif) for any technical code snippets or data displays, ensuring clarity and consistent character width.
- Utilize a suite of clear, functional, and vector-based icons that intuitively represent map markers (speed limits, hazards), navigation controls, and PWA download/offline functionalities, potentially drawing subtle inspiration from Canadian road sign aesthetics for clarity without literal reproduction.
- Implement a clean, spatially-aware responsive layout that prioritizes map display and route information. Navigation elements should be easily accessible, with minimal clutter, optimized for interaction during a driving test scenario on mobile devices, ensuring full PWA usability.
- Subtle, purpose-driven animations should be employed for map interactions (zooming, panning, route drawing transitions), PWA loading states, and form submissions to provide user feedback without being distracting. Animations should feel fluid and functional, supporting the user's practical task of learning routes.


## Prompt

Here is a comprehensive "Master Prompt" tailored specifically for an AI coding assistant (like Cursor, Windsurf, or an advanced LLM). It is structured to give the AI complete context, from the tech stack and architecture to the specific GitOps workflow you want to implement. 

You can copy and paste the blockquote below directly into your AI agent to kick off the project.

***

> # Project Context & Overview
> Act as a Senior Full-Stack Engineer and System Architect. We are building an open-source Progressive Web App (PWA) called "DriveTest Routes Canada". 
> 
> The application helps users (learner drivers) find, view, and practice G2 and G road test routes across Canada (specifically starting with Ontario drive test centers like Vaughan, Orangeville, etc.). The app will display routes on an interactive map with speed limits, hazard markers, and offer a mock-test navigation mode.
> 
> # Tech Stack
> * **Frontend:** React (Next.js or Vite) configured strictly as a PWA (manifest, service workers for offline caching).
> * **Styling:** Tailwind CSS + shadcn/ui.
> * **Backend/API:** Cloudflare Workers.
> * **Database:** Cloudflare D1 (SQLite).
> * **Map Integration:** Mapbox GL JS (or Leaflet with OpenStreetMap) for rendering routes and custom markers.
> * **Hosting & CI/CD:** Cloudflare Pages + GitHub Actions.
> 
> # Core Architecture: GitOps & "Data as Code"
> The application relies heavily on community contributions. **Do not build a traditional CMS admin panel for database entry.**
> 
> 1.  **Source of Truth:** All route data must be stored as static `.json` and `.geojson` files within the GitHub repository (e.g., under `/data/ontario/orangeville/routes/`).
> 2.  **Database Sync (CI/CD):** The Cloudflare D1 database acts purely as an optimized read-replica for the edge API. We need a Node.js/Python script that runs via GitHub Actions on every `push` or `merge` to the `main` branch. This script must parse the `/data` directory and execute the necessary `INSERT/UPDATE/DELETE` commands against the production Cloudflare D1 database.
> 
> # Core Features to Implement
> 
> ## 1. Interactive Map & Route Display
> * List view of test centers grouped by province/city.
> * Search bar with fuzzy matching for cities or test centers.
> * Clicking a test center shows available routes (e.g., "Orangeville Route 1 - G Test").
> * Selecting a route renders a map drawing the exact path using GeoJSON.
> * Overlay custom map markers for: Speed limits (e.g., 40km/h school zones), hazard traps (blind spots, hidden stop signs), and standard maneuvers (parallel parking spots).
> 
> ## 2. Practice & Offline Modes (PWA Core)
> * **Offline Mode:** Users must be able to download a specific test center's routes and map tiles to view them without an internet connection.
> * **Mock Test (GPS Tracking):** Utilize the browser's Geolocation API to track the user's position on the drawn map route in real-time. 
> 
> ## 3. Community & Open Source Integration
> * **In-App Contribution Flow:** Create a `/contribute` page featuring an interactive map where users (e.g., driving instructors) can draw a route, add speed limits, and submit it. Upon submission, the backend should hit the GitHub API to automatically generate a Pull Request with the generated `.geojson` file on the user's behalf.
> * **Contributor Acknowledgment:** The UI must parse the `contributor_github_id` from the route's JSON file and display the contributor's avatar and username on the route details page.
> 
> # Execution Plan & First Steps
> Please acknowledge these instructions and begin by outputting the following:
> 
> 1.  **Project Structure:** A standard directory tree showing how you will organize the frontend, backend (Workers), and the `/data` GitOps directory.
> 2.  **Database Schema:** The initial SQL schema for Cloudflare D1 (tables for `test_centers`, `routes`, `waypoints/hazards`) optimized for the edge.
> 3.  **CI/CD Sync Script Outline:** A brief overview of how the GitHub Action script will handle syncing the GeoJSON files to the D1 database without data duplication.
> 
> Wait for my approval on the schema and structure before writing the actual code.

