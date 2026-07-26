export interface GeocodingResponse {
  results?: GeoLocation[];
  generationtime_ms?: number;
}

export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1?: string;
  admin2?: string;
  country?: string;
  timezone?: string;
  population?: number;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature?: number;
  windSpeed: number;
  windDirection?: number;
  weatherCode: number;
  isDay?: number;
  relativeHumidity?: number;
  surfacePressure?: number;
  time: string;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  apparentTempMax?: number;
  apparentTempMin?: number;
  windSpeedMax?: number;
  uvIndexMax?: number;
}

export interface WeatherData {
  location: GeoLocation;
  current: CurrentWeather;
  daily: DailyForecast[];
  timezone: string;
  elevation?: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherRecommendation {
  id: string;
  type: 'umbrella' | 'hot' | 'cold' | 'freezing' | 'pleasant' | 'wind' | 'uv';
  severity: 'info' | 'warning' | 'alert' | 'success';
  title: string;
  description: string;
  date?: string;
  dayName?: string;
  iconName: string;
}
