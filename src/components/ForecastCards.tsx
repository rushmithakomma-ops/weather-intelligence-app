import React from 'react';
import { DailyForecast, TemperatureUnit } from '../types';
import { getWeatherCodeInfo, formatTemp, formatPrecipitation } from '../utils/weatherCodes';
import { Calendar, Umbrella, ArrowUp, ArrowDown } from 'lucide-react';

interface ForecastCardsProps {
  dailyForecasts: DailyForecast[];
  unit: TemperatureUnit;
  selectedDate: string | null;
  onSelectDay: (date: string) => void;
}

export const ForecastCards: React.FC<ForecastCardsProps> = ({
  dailyForecasts,
  unit,
  selectedDate,
  onSelectDay,
}) => {
  if (!dailyForecasts || dailyForecasts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-white flex items-center gap-2 drop-shadow-sm">
          <Calendar className="w-5 h-5 text-amber-300" />
          7-Day Forecast
        </h2>
        <span className="text-xs text-blue-100/80 font-medium">
          Click any day to view detailed recommendations
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {dailyForecasts.map((day, idx) => {
          const weatherInfo = getWeatherCodeInfo(day.weatherCode);
          const IconComponent = weatherInfo.icon;
          const isSelected = selectedDate === day.date;

          const dateObj = new Date(day.date + 'T00:00:00');
          const dayName =
            idx === 0
              ? 'Today'
              : idx === 1
              ? 'Tomorrow'
              : dateObj.toLocaleDateString('en-US', { weekday: 'short' });

          const monthDay = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });

          const hasRain = day.precipitationSum > 0;

          return (
            <button
              key={day.date}
              type="button"
              onClick={() => onSelectDay(day.date)}
              className={`p-4 rounded-3xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-2xl scale-[1.03] ring-4 ring-amber-400/50'
                  : 'bg-white/90 backdrop-blur-md border-white/80 text-slate-800 hover:bg-white hover:shadow-xl hover:scale-[1.02]'
              }`}
            >
              {/* Day Header */}
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`font-black text-sm ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {dayName}
                  </span>
                  <span
                    className={`text-[11px] font-bold ${
                      isSelected ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {monthDay}
                  </span>
                </div>

                {/* Weather Icon & Label */}
                <div className="my-3 flex flex-col items-center text-center">
                  <div
                    className={`p-3 rounded-2xl my-1 transition-transform group-hover:scale-110 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <span
                    className={`text-xs font-bold mt-1 line-clamp-1 ${
                      isSelected ? 'text-white' : 'text-slate-800'
                    }`}
                    title={weatherInfo.label}
                  >
                    {weatherInfo.label}
                  </span>
                </div>
              </div>

              {/* Temperatures & Rain */}
              <div className={`mt-2 pt-2 border-t ${isSelected ? 'border-indigo-500' : 'border-slate-100'}`}>
                <div className="flex items-center justify-between text-xs font-black">
                  <span
                    className={`flex items-center ${
                      isSelected ? 'text-amber-300' : 'text-slate-900'
                    }`}
                  >
                    <ArrowUp className="w-3 h-3 text-red-500 mr-0.5 inline" />
                    {formatTemp(day.tempMax, unit)}
                  </span>
                  <span
                    className={`flex items-center font-semibold ${
                      isSelected ? 'text-indigo-200' : 'text-slate-500'
                    }`}
                  >
                    <ArrowDown className="w-3 h-3 text-blue-500 mr-0.5 inline" />
                    {formatTemp(day.tempMin, unit)}
                  </span>
                </div>

                {/* Precipitation indicator */}
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span
                    className={`flex items-center gap-1 ${
                      hasRain
                        ? isSelected
                          ? 'text-amber-200 font-bold'
                          : 'text-indigo-600 font-bold'
                        : isSelected
                        ? 'text-indigo-200/60'
                        : 'text-slate-400'
                    }`}
                  >
                    <Umbrella className="w-3 h-3" />
                    {hasRain ? formatPrecipitation(day.precipitationSum, unit) : 'Dry'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
