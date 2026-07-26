import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { DailyForecast, TemperatureUnit } from '../types';
import { getWeatherCodeInfo } from '../utils/weatherCodes';
import { TrendingUp, BarChart2 } from 'lucide-react';

interface WeatherChartProps {
  dailyForecasts: DailyForecast[];
  unit: TemperatureUnit;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ dailyForecasts, unit }) => {
  const [showPrecipitation, setShowPrecipitation] = useState(true);

  if (!dailyForecasts || dailyForecasts.length === 0) return null;

  // Transform data for chart
  const chartData = dailyForecasts.map((day, idx) => {
    const dateObj = new Date(day.date + 'T00:00:00');
    const dayLabel =
      idx === 0
        ? 'Today'
        : idx === 1
        ? 'Tomorrow'
        : dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    const maxTemp = unit === 'fahrenheit' ? Math.round((day.tempMax * 9) / 5 + 32) : Math.round(day.tempMax);
    const minTemp = unit === 'fahrenheit' ? Math.round((day.tempMin * 9) / 5 + 32) : Math.round(day.tempMin);
    const precip = unit === 'fahrenheit' ? Number((day.precipitationSum * 0.0393701).toFixed(2)) : Number(day.precipitationSum.toFixed(1));

    const info = getWeatherCodeInfo(day.weatherCode);

    return {
      date: day.date,
      dayLabel,
      maxTemp,
      minTemp,
      precipitation: precip,
      weatherCondition: info.label,
    };
  });

  const tempUnitLabel = unit === 'fahrenheit' ? '°F' : '°C';
  const precipUnitLabel = unit === 'fahrenheit' ? 'in' : 'mm';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 z-50">
          <div className="font-bold border-b border-slate-700/80 pb-1 text-sky-300">
            {data.dayLabel} ({data.date})
          </div>
          <div className="text-slate-300 font-medium">{data.weatherCondition}</div>
          <div className="flex items-center justify-between gap-4 text-red-400 font-semibold">
            <span>High Temp:</span>
            <span>{data.maxTemp}{tempUnitLabel}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sky-400 font-semibold">
            <span>Low Temp:</span>
            <span>{data.minTemp}{tempUnitLabel}</span>
          </div>
          {data.precipitation > 0 && (
            <div className="flex items-center justify-between gap-4 text-cyan-300">
              <span>Rainfall:</span>
              <span>{data.precipitation} {precipUnitLabel}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-white/80 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl text-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            7-Day Temperature & Rain Trend
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Compare daily high/low temperatures ({tempUnitLabel}) and precipitation ({precipUnitLabel})
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowPrecipitation(!showPrecipitation)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
            showPrecipitation
              ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm'
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          <span>{showPrecipitation ? 'Hide Rain Bar' : 'Show Rain Bar'}</span>
        </button>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.8} />
            <XAxis
              dataKey="dayLabel"
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="temp"
              orientation="left"
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
              unit={tempUnitLabel}
            />
            {showPrecipitation && (
              <YAxis
                yAxisId="precip"
                orientation="right"
                tick={{ fill: '#0284c7', fontSize: 11, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
                unit={` ${precipUnitLabel}`}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: '15px', fontSize: '12px' }}
              formatter={(value) => <span className="text-slate-800 font-bold">{value}</span>}
            />

            {showPrecipitation && (
              <Bar
                yAxisId="precip"
                dataKey="precipitation"
                name={`Precipitation (${precipUnitLabel})`}
                fill="#38bdf8"
                radius={[8, 8, 0, 0]}
                barSize={22}
                opacity={0.8}
              />
            )}

            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="maxTemp"
              name={`Max Temp (${tempUnitLabel})`}
              stroke="#ea580c"
              strokeWidth={3.5}
              dot={{ r: 5, fill: '#ea580c' }}
              activeDot={{ r: 7 }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="minTemp"
              name={`Min Temp (${tempUnitLabel})`}
              stroke="#4f46e5"
              strokeWidth={3.5}
              dot={{ r: 5, fill: '#4f46e5' }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
