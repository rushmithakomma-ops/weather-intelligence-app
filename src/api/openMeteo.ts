import { GeocodingResponse, GeoLocation, WeatherData } from '../types';

/**
 * Searches for a city name using Open-Meteo Geocoding API.
 * Returns array of matches or empty array if not found.
 */
export async function searchCity(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error('Please enter a city name to search.');
  }

  const encoded = encodeURIComponent(trimmed);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encoded}&count=5&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding server error (${response.status}). Please try again later.`);
    }

    const data: GeocodingResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results;
  } catch (err: any) {
    if (err.message && err.message.includes('Please enter')) {
      throw err;
    }
    throw new Error(
      err.message || 'Unable to connect to Geocoding service. Please check your network connection.'
    );
  }
}

/**
 * Fetches current weather and 7-day forecast for given latitude and longitude.
 */
export async function fetchWeatherForLocation(location: GeoLocation): Promise<WeatherData> {
  const { latitude, longitude } = location;

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current_weather: 'true',
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m',
    daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,apparent_temperature_max,apparent_temperature_min,uv_index_max',
    timezone: location.timezone || 'auto',
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather service returned error ${response.status}.`);
    }

    const data = await response.json();

    // Map current weather
    const currentWeatherRaw = data.current || data.current_weather || {};
    const currentTemp = currentWeatherRaw.temperature_2m ?? currentWeatherRaw.temperature ?? 0;
    const currentWind = currentWeatherRaw.wind_speed_10m ?? currentWeatherRaw.windspeed ?? 0;
    const currentCode = currentWeatherRaw.weather_code ?? currentWeatherRaw.weathercode ?? 0;

    const current = {
      temperature: currentTemp,
      apparentTemperature: currentWeatherRaw.apparent_temperature ?? currentTemp,
      windSpeed: currentWind,
      windDirection: currentWeatherRaw.wind_direction_10m ?? currentWeatherRaw.winddirection ?? 0,
      weatherCode: currentCode,
      isDay: currentWeatherRaw.is_day ?? 1,
      relativeHumidity: currentWeatherRaw.relative_humidity_2m ?? 65,
      surfacePressure: currentWeatherRaw.surface_pressure ?? 1013,
      time: currentWeatherRaw.time || new Date().toISOString(),
    };

    // Map daily forecast
    const dailyRaw = data.daily || {};
    const dates: string[] = dailyRaw.time || [];
    const codes: number[] = dailyRaw.weathercode || dailyRaw.weather_code || [];
    const tempMaxs: number[] = dailyRaw.temperature_2m_max || [];
    const tempMins: number[] = dailyRaw.temperature_2m_min || [];
    const precipSums: number[] = dailyRaw.precipitation_sum || [];
    const windSpeedMaxs: number[] = dailyRaw.windspeed_10m_max || [];
    const uvIndexMaxs: number[] = dailyRaw.uv_index_max || [];
    const apparentMaxs: number[] = dailyRaw.apparent_temperature_max || [];
    const apparentMins: number[] = dailyRaw.apparent_temperature_min || [];

    const daily = dates.map((date, idx) => ({
      date,
      weatherCode: codes[idx] ?? 0,
      tempMax: tempMaxs[idx] ?? 0,
      tempMin: tempMins[idx] ?? 0,
      precipitationSum: precipSums[idx] ?? 0,
      windSpeedMax: windSpeedMaxs[idx] ?? 0,
      uvIndexMax: uvIndexMaxs[idx] ?? 0,
      apparentTempMax: apparentMaxs[idx],
      apparentTempMin: apparentMins[idx],
    }));

    return {
      location,
      current,
      daily,
      timezone: data.timezone || location.timezone || 'UTC',
      elevation: data.elevation,
    };
  } catch (err: any) {
    throw new Error(
      err.message || 'Failed to retrieve weather data from Open-Meteo. Please try again.'
    );
  }
}
