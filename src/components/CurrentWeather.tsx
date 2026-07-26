import React from 'react';
import { WeatherData, TemperatureUnit } from '../types';
import { getWeatherCodeInfo, formatTemp, formatWind } from '../utils/weatherCodes';
import { MapPin, Wind, Droplets, Gauge, Thermometer, Calendar } from 'lucide-react';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  unit: TemperatureUnit;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData, unit }) => {
  const { location, current, timezone } = weatherData;
  const weatherInfo = getWeatherCodeInfo(current.weatherCode);
  const IconComponent = weatherInfo.icon;

  // Format resolved location string
  const adminPart = location.admin1 ? `${location.admin1}, ` : '';
  const countryPart = location.country || location.country_code || '';
  const locationSubtitle = `${adminPart}${countryPart}`;

  // Local observation time calculation
  const observationTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // Calculate apparent temp comparison label
  const actualTemp = current.temperature;
  const apparentTemp = current.apparentTemperature ?? actualTemp;
  const tempDiff = Math.abs(apparentTemp - actualTemp);

  let feelsLikeSummary = 'Matches air temperature';
  if (apparentTemp > actualTemp + 1) {
    feelsLikeSummary = 'Feels warmer due to humidity/sun';
  } else if (apparentTemp < actualTemp - 1) {
    feelsLikeSummary = 'Feels cooler due to wind chill';
  }

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-white/60 p-6 sm:p-8 shadow-2xl transition-all text-slate-800">
      {/* Yellow glow accent from Vibrant Palette */}
      <div className="w-32 h-32 bg-amber-400 rounded-full blur-3xl opacity-35 absolute -top-4 -right-4 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left Column: Location & Main Temp */}
        <div className="space-y-4">
          
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80 shadow-sm text-xs font-bold text-slate-700">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="truncate max-w-xs sm:max-w-md font-extrabold text-slate-900">
              {location.name}
            </span>
            {locationSubtitle && (
              <span className="text-slate-500 font-medium">
                ({locationSubtitle})
              </span>
            )}
          </div>

          {/* Temperature & Big Weather Icon */}
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-3xl bg-indigo-50 border border-indigo-100/80 shadow-inner">
              <IconComponent className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-600 animate-pulse" />
            </div>

            <div>
              <div className="text-7xl sm:text-8xl font-black text-slate-900 tracking-tighter">
                {formatTemp(current.temperature, unit)}
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${weatherInfo.badgeBg} ${weatherInfo.badgeText} shadow-sm`}>
                  {weatherInfo.label}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {weatherInfo.description}
                </span>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium pt-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{todayDate}</span>
            <span>•</span>
            <span>{observationTime}</span>
            <span>•</span>
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">{timezone}</span>
          </div>
        </div>

        {/* Right Column: Detailed Weather Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3 min-w-[280px]">
          
          {/* Feels Like Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
              <Thermometer className="w-4 h-4 text-amber-500" />
              <span>Feels Like</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              {formatTemp(current.apparentTemperature ?? current.temperature, unit)}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5 truncate" title={feelsLikeSummary}>
              {feelsLikeSummary}
            </div>
          </div>

          {/* Wind Speed Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
              <Wind className="w-4 h-4 text-indigo-500" />
              <span>Wind Speed</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              {formatWind(current.windSpeed, unit)}
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Direction: {current.windDirection ?? 0}°
            </div>
          </div>

          {/* Humidity Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Humidity</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              {current.relativeHumidity}%
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              {current.relativeHumidity && current.relativeHumidity > 70 ? 'High moisture' : 'Normal comfort'}
            </div>
          </div>

          {/* Pressure Card */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold mb-1">
              <Gauge className="w-4 h-4 text-emerald-500" />
              <span>Pressure</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">
              {Math.round(current.surfacePressure || 1013)} hPa
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Atmospheric level
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
