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
