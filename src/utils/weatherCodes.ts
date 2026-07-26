import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudLightning,
  LucideIcon,
  Eye,
  Umbrella,
  Wind
} from 'lucide-react';

export interface WeatherCodeInfo {
  label: string;
  description: string;
  icon: LucideIcon;
  category: 'clear' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'thunderstorm';
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
}

export const WMO_WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: {
    label: 'Clear Sky',
    description: 'Completely clear skies with bright sunshine',
    icon: Sun,
    category: 'clear',
    bgGradient: 'from-amber-500/10 via-sky-500/10 to-indigo-500/10',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/30',
    badgeText: 'text-amber-700 dark:text-amber-300',
  },
  1: {
    label: 'Mainly Clear',
    description: 'Mostly sunny with scattered light clouds',
    icon: CloudSun,
    category: 'clear',
    bgGradient: 'from-sky-500/10 to-blue-500/10',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/30',
    badgeText: 'text-sky-700 dark:text-sky-300',
  },
  2: {
    label: 'Partly Cloudy',
    description: 'Sun alternating with visible cloud cover',
    icon: CloudSun,
    category: 'cloudy',
    bgGradient: 'from-sky-500/10 via-slate-500/10 to-blue-500/10',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/30',
    badgeText: 'text-sky-800 dark:text-sky-200',
  },
  3: {
    label: 'Overcast',
    description: 'Dense cloud layer obscuring the sun',
    icon: Cloud,
    category: 'cloudy',
    bgGradient: 'from-slate-500/10 to-gray-600/10',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-700 dark:text-slate-300',
  },
  45: {
    label: 'Foggy',
    description: 'Reduced visibility due to ground-level fog',
    icon: CloudFog,
    category: 'fog',
    bgGradient: 'from-zinc-500/10 to-slate-500/10',
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800',
    badgeText: 'text-zinc-700 dark:text-zinc-300',
  },
  48: {
    label: 'Depositing Rime Fog',
    description: 'Freezing fog leaving ice crystals on surfaces',
    icon: CloudFog,
    category: 'fog',
    bgGradient: 'from-cyan-500/10 to-slate-500/10',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950',
    badgeText: 'text-cyan-800 dark:text-cyan-200',
  },
  51: {
    label: 'Light Drizzle',
    description: 'Fine, gentle mist drops falling lightly',
    icon: CloudDrizzle,
    category: 'rain',
    bgGradient: 'from-blue-500/10 to-sky-500/10',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/30',
    badgeText: 'text-blue-700 dark:text-blue-300',
  },
  53: {
    label: 'Moderate Drizzle',
    description: 'Steady light rain droplets',
    icon: CloudDrizzle,
    category: 'rain',
    bgGradient: 'from-blue-500/10 to-indigo-500/10',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/30',
    badgeText: 'text-blue-700 dark:text-blue-300',
  },
  55: {
    label: 'Dense Drizzle',
    description: 'Heavy drizzle with frequent damp drops',
    icon: CloudDrizzle,
    category: 'rain',
    bgGradient: 'from-blue-600/10 to-indigo-600/10',
    badgeBg: 'bg-blue-200 dark:bg-blue-900/50',
    badgeText: 'text-blue-800 dark:text-blue-200',
  },
  56: {
    label: 'Light Freezing Drizzle',
    description: 'Supercooled drizzle freezing on impact',
    icon: CloudSnow,
    category: 'snow',
    bgGradient: 'from-cyan-500/10 to-blue-600/10',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
  },
  57: {
    label: 'Dense Freezing Drizzle',
    description: 'Heavy freezing drizzle causing icy glaze',
    icon: CloudSnow,
    category: 'snow',
    bgGradient: 'from-cyan-600/10 to-blue-700/10',
    badgeBg: 'bg-cyan-200 dark:bg-cyan-900/50',
    badgeText: 'text-cyan-800 dark:text-cyan-200',
  },
  61: {
    label: 'Slight Rain',
    description: 'Light rainfall with occasional dry spells',
    icon: CloudRain,
    category: 'rain',
    bgGradient: 'from-blue-500/10 to-cyan-500/10',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/30',
    badgeText: 'text-blue-700 dark:text-blue-300',
  },
  63: {
    label: 'Moderate Rain',
    description: 'Continuous steady rain shower',
    icon: CloudRain,
    category: 'rain',
    bgGradient: 'from-blue-600/10 to-indigo-500/10',
    badgeBg: 'bg-blue-200 dark:bg-blue-900/50',
    badgeText: 'text-blue-800 dark:text-blue-200',
  },
  65: {
    label: 'Heavy Rain',
    description: 'Torrential downpour with high accumulation',
    icon: CloudRain,
    category: 'rain',
    bgGradient: 'from-blue-700/10 to-slate-700/10',
    badgeBg: 'bg-blue-300 dark:bg-blue-900/80',
    badgeText: 'text-blue-900 dark:text-blue-100',
  },
  66: {
    label: 'Light Freezing Rain',
    description: 'Raindrops freezing into clear ice layers',
    icon: CloudSnow,
    category: 'snow',
    bgGradient: 'from-teal-500/10 to-blue-600/10',
    badgeBg: 'bg-teal-100 dark:bg-teal-900/30',
    badgeText: 'text-teal-700 dark:text-teal-300',
  },
  67: {
    label: 'Heavy Freezing Rain',
    description: 'Severe freezing rain hazard',
    icon: CloudSnow,
    category: 'snow',
    bgGradient: 'from-teal-600/10 to-cyan-700/10',
    badgeBg: 'bg-teal-200 dark:bg-teal-900/60',
    badgeText: 'text-teal-800 dark:text-teal-200',
  },
  71: {
    label: 'Slight Snow Fall',
    description: 'Gentle snowflakes fluttering down',
    icon: Snowflake,
    category: 'snow',
    bgGradient: 'from-sky-400/10 via-indigo-400/10 to-slate-400/10',
    badgeBg: 'bg-sky-100 dark:bg-sky-900/30',
    badgeText: 'text-sky-700 dark:text-sky-300',
  },
  73: {
    label: 'Moderate Snow Fall',
    description: 'Steady snow creating fresh ground cover',
    icon: Snowflake,
    category: 'snow',
    bgGradient: 'from-sky-500/10 to-indigo-500/10',
    badgeBg: 'bg-sky-200 dark:bg-sky-900/50',
    badgeText: 'text-sky-800 dark:text-sky-200',
  },
  75: {
    label: 'Heavy Snow Fall',
    description: 'Heavy blizzard conditions with low visibility',
    icon: Snowflake,
    category: 'snow',
    bgGradient: 'from-slate-400/10 to-sky-600/10',
    badgeBg: 'bg-sky-300 dark:bg-sky-800',
    badgeText: 'text-sky-900 dark:text-sky-100',
  },
  77: {
    label: 'Snow Grains',
    description: 'Tiny opaque ice grains bouncing on surfaces',
    icon: Snowflake,
    category: 'snow',
    bgGradient: 'from-zinc-400/10 to-blue-400/10',
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800',
    badgeText: 'text-zinc-700 dark:text-zinc-300',
  },
  80: {
    label: 'Slight Rain Showers',
    description: 'Passing localized rain showers',
    icon: CloudRain,
    category: 'rain',
    bgGradient: 'from-blue-500/10 to-sky-400/10',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/30',
    badgeText: 'text-blue-700 dark:text-blue-300',
  },
  81: {
    label: 'Moderate Rain Showers',
    description: 'Brisk showers with variable intensity',
    icon: CloudRain,
    category: 'rain',
    bgGradient: 'from-blue-600/10 to-indigo-500/10',
    badgeBg: 'bg-blue-200 dark:bg-blue-900/50',
    badgeText: 'text-blue-800 dark:text-blue-200',
  },
  82: {
    label: 'Violent Rain Showers',
    description: 'Heavy bursts of rain with gusty winds',
    icon: CloudRain,
    category: 'rain',
    bgGradient: 'from-indigo-700/10 to-blue-800/10',
    badgeBg: 'bg-indigo-300 dark:bg-indigo-900/80',
    badgeText: 'text-indigo-900 dark:text-indigo-100',
  },
  85: {
    label: 'Slight Snow Showers',
    description: 'Short bursts of snow showers',
    icon: Snowflake,
    category: 'snow',
    bgGradient: 'from-cyan-400/10 to-blue-500/10',
    badgeBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
  },
  86: {
    label: 'Heavy Snow Showers',
    description: 'Intense snow squalls with sudden accumulation',
    icon: Snowflake,
    category: 'snow',
    bgGradient: 'from-cyan-600/10 to-slate-600/10',
    badgeBg: 'bg-cyan-200 dark:bg-cyan-900/60',
    badgeText: 'text-cyan-800 dark:text-cyan-200',
  },
  95: {
    label: 'Thunderstorm',
    description: 'Lightning and thunder with moderate rainfall',
    icon: CloudLightning,
    category: 'thunderstorm',
    bgGradient: 'from-purple-900/10 via-slate-800/10 to-indigo-900/10',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/40',
    badgeText: 'text-purple-800 dark:text-purple-200',
  },
  96: {
    label: 'Thunderstorm with Hail',
    description: 'Thunderstorm accompanied by small hail',
    icon: CloudLightning,
    category: 'thunderstorm',
    bgGradient: 'from-purple-950/10 to-slate-900/10',
    badgeBg: 'bg-purple-200 dark:bg-purple-900/60',
    badgeText: 'text-purple-900 dark:text-purple-100',
  },
  99: {
    label: 'Severe Thunderstorm with Hail',
    description: 'Dangerous storm with destructive hail and high winds',
    icon: CloudLightning,
    category: 'thunderstorm',
    bgGradient: 'from-purple-950/15 via-red-950/10 to-slate-900/15',
    badgeBg: 'bg-red-200 dark:bg-red-900/60',
    badgeText: 'text-red-900 dark:text-red-100',
  },
};

export function getWeatherCodeInfo(code: number): WeatherCodeInfo {
  return WMO_WEATHER_CODES[code] || {
    label: 'Variable Weather',
    description: 'Unspecified weather conditions',
    icon: Cloud,
    category: 'cloudy',
    bgGradient: 'from-slate-500/10 to-gray-500/10',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-700 dark:text-slate-300',
  };
}

export function formatTemp(celsius: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    const f = (celsius * 9) / 5 + 32;
    return `${Math.round(f)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function formatPrecipitation(mm: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    const inches = mm * 0.0393701;
    return `${inches.toFixed(2)} in`;
  }
  return `${mm.toFixed(1)} mm`;
}

export function formatWind(kmh: number, unit: 'celsius' | 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    const mph = kmh * 0.621371;
    return `${Math.round(mph)} mph`;
  }
  return `${Math.round(kmh)} km/h`;
}
