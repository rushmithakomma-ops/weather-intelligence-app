import React, { useState } from 'react';
import { WeatherRecommendation } from '../types';
import { RECOMMENDATION_THRESHOLDS } from '../utils/recommendations';
import {
  Sparkles,
  Umbrella,
  SunMedium,
  Snowflake,
  ThermometerSnowflake,
  Smile,
  Wind,
  SunDim,
  Info,
  Filter,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
} from 'lucide-react';

interface RecommendationsPanelProps {
  recommendations: WeatherRecommendation[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

export const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({
  recommendations,
  selectedDate,
  onSelectDate,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'umbrella' | 'temp' | 'other'>('all');
  const [showThresholdsModal, setShowThresholdsModal] = useState(false);

  if (!recommendations) return null;

  // Filter recommendations based on selected date & category
  let filtered = recommendations;
  if (selectedDate) {
    filtered = filtered.filter((r) => r.date === selectedDate);
  }

  if (categoryFilter === 'umbrella') {
    filtered = filtered.filter((r) => r.type === 'umbrella');
  } else if (categoryFilter === 'temp') {
    filtered = filtered.filter((r) => ['hot', 'cold', 'freezing', 'pleasant'].includes(r.type));
  } else if (categoryFilter === 'other') {
    filtered = filtered.filter((r) => ['wind', 'uv'].includes(r.type));
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Umbrella':
        return <Umbrella className="w-5 h-5 text-blue-500" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5 text-amber-500" />;
      case 'Snowflake':
        return <Snowflake className="w-5 h-5 text-cyan-500" />;
      case 'ThermometerSnowflake':
        return <ThermometerSnowflake className="w-5 h-5 text-blue-400" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-emerald-500" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-indigo-500" />;
      case 'SunDim':
      case 'SunRisk':
        return <SunDim className="w-5 h-5 text-orange-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-sky-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'alert':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> High Alert
          </span>
        );
      case 'warning':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Advisory
          </span>
        );
      case 'success':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ideal Weather
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 flex items-center gap-1">
            <Info className="w-3 h-3" /> Info
          </span>
        );
    }
  };

  return (
    <div className="bg-amber-50/95 border-2 border-amber-200/80 rounded-[2.5rem] p-6 shadow-xl space-y-6 text-slate-800">
      
      {/* Header & Threshold Disclosure */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200/60">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-400 text-slate-900 shadow-lg shadow-amber-300/50 font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Daily Planning Recommendations
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Rule-based practical advice generated directly from live Open-Meteo forecast parameters.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowThresholdsModal(!showThresholdsModal)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-200/80 hover:bg-amber-300/80 text-amber-900 text-xs font-bold transition-all self-start sm:self-auto shadow-sm"
        >
          <Info className="w-3.5 h-3.5 text-amber-900" />
          <span>View Rule Thresholds</span>
        </button>
      </div>

      {/* Threshold Rules Info Box */}
      {showThresholdsModal && (
        <div className="p-4 rounded-2xl bg-white/90 border border-amber-200 text-xs text-slate-700 space-y-2 animate-fadeIn shadow-sm">
          <div className="font-bold text-amber-900 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-amber-600" />
            Transparent Decision Rule Thresholds:
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 pl-2">
            <li>• <strong>Umbrella Advisory:</strong> Precipitation ≥ {RECOMMENDATION_THRESHOLDS.PRECIPITATION_UMBRELLA_MM} mm</li>
            <li>• <strong>Hot Day Advisory:</strong> Max Temp ≥ {RECOMMENDATION_THRESHOLDS.HOT_DAY_CELSIUS}°C (32°C)</li>
            <li>• <strong>Cold Day Advisory:</strong> Min Temp ≤ {RECOMMENDATION_THRESHOLDS.COLD_DAY_CELSIUS}°C (10°C)</li>
            <li>• <strong>Freezing Warning:</strong> Min Temp ≤ {RECOMMENDATION_THRESHOLDS.FREEZING_CELSIUS}°C (0°C)</li>
            <li>• <strong>Pleasant Day:</strong> Max Temp 18–28°C and No Rain</li>
            <li>• <strong>Wind Advisory:</strong> Wind Speed ≥ {RECOMMENDATION_THRESHOLDS.WINDY_KMH} km/h</li>
            <li>• <strong>High UV Advisory:</strong> UV Index ≥ {RECOMMENDATION_THRESHOLDS.HIGH_UV_INDEX}</li>
          </ul>
        </div>
      )}

      {/* Category & Date Filters */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1 bg-amber-200/50 p-1 rounded-full border border-amber-300/50">
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1 rounded-full font-bold transition-all ${
              categoryFilter === 'all'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'text-amber-900 hover:text-slate-900'
            }`}
          >
            All Advisories ({recommendations.length})
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('umbrella')}
            className={`px-3.5 py-1 rounded-full font-bold transition-all ${
              categoryFilter === 'umbrella'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'text-amber-900 hover:text-slate-900'
            }`}
          >
            Rain / Umbrella
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('temp')}
            className={`px-3.5 py-1 rounded-full font-bold transition-all ${
              categoryFilter === 'temp'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'text-amber-900 hover:text-slate-900'
            }`}
          >
            Temperature
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('other')}
            className={`px-3.5 py-1 rounded-full font-bold transition-all ${
              categoryFilter === 'other'
                ? 'bg-amber-400 text-slate-900 shadow-sm'
                : 'text-amber-900 hover:text-slate-900'
            }`}
          >
            Wind & UV
          </button>
        </div>

        {selectedDate && (
          <button
            type="button"
            onClick={() => onSelectDate(null)}
            className="text-xs text-amber-900 hover:underline font-bold flex items-center gap-1"
          >
            Show All Days (Filtered by {selectedDate})
          </button>
        )}
      </div>

      {/* Recommendations Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-white/80 rounded-3xl border border-dashed border-amber-300">
          <Smile className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <div className="font-bold text-slate-800 text-sm">
            No specific weather advisories for this selection
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Weather conditions are generally mild and clear with no rain or extreme temperature alerts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-3xl bg-white/95 border border-amber-200/80 hover:border-amber-400 transition-all shadow-sm space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-200 shadow-sm">
                      {getIcon(rec.iconName)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">
                        {rec.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {rec.dayName} ({rec.date})
                      </span>
                    </div>
                  </div>

                  {getSeverityBadge(rec.severity)}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed pl-1">
                  {rec.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
