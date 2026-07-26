# Weather Intelligence App

A visual, self-explanatory weather intelligence web application designed for everyday users to check current weather conditions, 7-day forecasts, temperature trends, and practical planning recommendations for any city globally.

---

## Data Source & APIs Used

The application relies exclusively on public, free **Open-Meteo REST APIs** without requiring API keys or secret credentials:

1. **Geocoding API**: Converts city name search queries into latitude and longitude coordinates.
   - `GET https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en&format=json`
   - Handles multi-location disambiguation when multiple matching places exist.
   - Handles empty queries and zero-match "City not found" cases gracefully.

2. **Forecast API**: Fetches live current weather and 7-day forecast parameters.
   - `GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,uv_index_max&timezone=auto`

---

## Key Features

- **City Search & Disambiguation**: Search box with inline validation, zero-match error handling, and a location picker modal when multiple cities match.
- **Current Weather Panel**: Displays live temperature, "feels like" status, wind speed, relative humidity, surface pressure, weather condition badge, and resolved place name.
- **7-Day Forecast Cards**: Interactive daily weather cards highlighting date, weather condition icon, max/min temperatures, and precipitation sum.
- **Interactive Temperature & Rain Trend Chart**: Built with `recharts` for visual comparison of daily high/low temperature trends and daily precipitation bars.
- **Daily Planning Recommendation Panel**: Transparent, rule-based advisories derived from live forecast data without external AI calls.
- **Unit Selector & Share Link**: Toggle between Metric (°C, km/h, mm) and Imperial (°F, mph, in) units and copy shareable URLs with `?city=...`.

---

## Transparent Rule Thresholds

Planning recommendations are generated using simple, transparent threshold rules:

- **Umbrella Advisory**: `precipitation_sum >= 1.0 mm`
- **Heavy Rain Warning**: `precipitation_sum >= 10.0 mm`
- **Hot Day Advisory**: `temperature_2m_max >= 32.0°C` (Stay hydrated, wear sunscreen)
- **Cold Day Advisory**: `temperature_2m_min <= 10.0°C` (Dress warmly in layers)
- **Freezing Warning**: `temperature_2m_min <= 0.0°C` (Frost hazard, wear thermal gear)
- **Great Outdoor Day**: `18°C <= max <= 28°C` and no rain (Ideal for outdoor activities)
- **High Wind Advisory**: `windspeed_10m_max >= 35.0 km/h`
- **High UV Advisory**: `uv_index_max >= 6.0`

---

## Build & Deployment Instructions (Cloudflare Pages)

This app is built as a **Vite single-page React application**.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Build Command**:
   ```bash
   npm run build
   ```

3. **Output Directory**:
   `dist`

To deploy on **Cloudflare Pages**:
- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`

---

## Deployment Workflow: Google AI Studio → GitHub → Cloudflare Pages

### 1. Google AI Studio → GitHub

The app was generated in **Google AI Studio App Build** from a specification prompt describing the Weather Intelligence App (city search, current weather, 7-day forecast, chart, rule-based recommendations). It was pushed to GitHub using AI Studio's **direct "Save to GitHub" connection** (not a manual export/upload):

1. Opened the generated app in AI Studio App Build.
2. Used the built-in "Save to GitHub" option and authorized GitHub access.
3. Created the repository `weather-intelligence-app` directly from AI Studio.
4. Confirmed the push succeeded and verified `package.json`, `src/`, and `README.md` were present in the new repo.

Repository: https://github.com/rushmithakomma-ops/weather-intelligence-app

No Secrets, API integration, or Publish features were used — only the public Open-Meteo APIs, which require no keys.

### 2. GitHub → Cloudflare Pages

1. In the Cloudflare dashboard, opened **Workers & Pages**.
2. Note: newer Cloudflare accounts may not show a separate **Pages** tab (Cloudflare has been consolidating Pages into Workers). If no Pages tab is visible, use the direct link `https://dash.cloudflare.com/?to=/:account/pages/new/provider/github` to reach the Pages project creation flow.
3. Chose **Connect to Git** and selected the `weather-intelligence-app` GitHub repository.
4. Set the **Framework preset** to **Vite** — not "VitePress" (a different, docs-focused static site generator that Cloudflare also lists; picking it auto-fills the wrong build command/output directory).
5. Configured:
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. Saved and deployed; confirmed the build log completed successfully.
7. Live app URL: **https://weather-intelligence-app-2nh.pages.dev/**

### 3. Validation

- Verified the built JS/CSS assets are served with HTTP 200 from the pages.dev URL.
- In-browser testing confirmed:
  - Valid city search (e.g. Chennai, London) → current weather, 7-day forecast, chart, and recommendations render correctly.
  - Invalid city search → graceful "city not found" message, no crash.
  - Browser refresh → app reloads correctly.
  - Window resize → layout remains usable.

### Troubleshooting Notes

- **`workers.dev` instead of `pages.dev`**: An early deployment attempt landed on a `workers.dev` URL because Cloudflare's "Workers & Pages" section defaulted to creating a Workers project. Fix: explicitly use the Pages project-creation flow (via the direct link above if the tab isn't visible in the sidebar).
- **Wrong build settings from "VitePress" preset**: Selecting the wrong framework preset auto-filled `npx vitepress build` / `.vitepress/dist`, which do not apply to this Vite+React app. Fix: set framework preset to Vite and manually confirm `npm run build` / `dist`.
- **Blank-looking page during automated checks**: Because this is a client-side rendered Vite/React SPA, tools that fetch raw HTML without executing JavaScript (e.g. simple HTTP fetchers) will show only the `<title>` and an empty `<div id="root">`. This is expected and is not a bug — the app must be checked in an actual browser with JavaScript enabled.

