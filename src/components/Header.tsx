import React, { useState } from 'react';
import { Search, MapPin, Compass, Thermometer, Share2, Check, RefreshCw } from 'lucide-react';
import { TemperatureUnit } from '../types';

interface HeaderProps {
  onSearchSubmit: (query: string) => void;
  isLoading: boolean;
  unit: TemperatureUnit;
  onToggleUnit: (unit: TemperatureUnit) => void;
  onSelectPopularCity: (cityName: string) => void;
  recentSearches: string[];
  onRefresh: () => void;
  validationError?: string | null;
}

const POPULAR_CITIES = ['London', 'Tokyo', 'New York', 'Paris', 'Sydney', 'Cairo', 'Mumbai'];

export const Header: React.FC<HeaderProps> = ({
  onSearchSubmit,
  isLoading,
  unit,
  onToggleUnit,
  onSelectPopularCity,
  recentSearches,
  onRefresh,
  validationError,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setLocalError('Please enter a city name to search.');
      return;
    }
    setLocalError(null);
    onSearchSubmit(query.trim());
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="bg-white/15 backdrop-blur-md border-b border-white/20 sticky top-0 z-30 transition-colors text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & App Title */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  Weather Intelligence
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-400 text-slate-900 shadow-sm">
                    Live
                  </span>
                </h1>
                <p className="text-xs text-blue-100/80">
                  Global weather insights & smart planning recommendations
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={onRefresh}
                disabled={isLoading}
                title="Refresh Weather"
                className="p-2 rounded-xl text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                title="Copy Shareable Link"
                className="p-2 rounded-xl text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm"
              >
                {copied ? <Check className="w-4 h-4 text-amber-300" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Search Bar Form */}
          <div className="w-full md:max-w-md">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center">
                <MapPin className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (localError) setLocalError(null);
                  }}
                  placeholder="Search city (e.g. London, Tokyo)..."
                  className={`w-full pl-11 pr-24 py-3 bg-white/95 text-slate-800 rounded-full border-0 shadow-lg ${
                    localError || validationError
                      ? 'ring-2 ring-red-400'
                      : 'focus:ring-4 focus:ring-amber-400'
                  } text-sm focus:outline-none transition-all placeholder:text-slate-400`}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-slate-300 text-white font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-md"
                >
                  {isLoading ? (
                    <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                  Search
                </button>
              </div>

              {/* Inline Validation Error */}
              {(localError || validationError) && (
                <p className="absolute -bottom-5 left-4 text-xs text-amber-200 font-semibold animate-fadeIn">
                  {localError || validationError}
                </p>
              )}
            </form>
          </div>

          {/* Desktop Controls: °C/°F, Refresh, Share */}
          <div className="hidden md:flex items-center gap-3">
            {/* Unit Toggle */}
            <div className="flex items-center bg-white/20 backdrop-blur-sm p-1 rounded-full border border-white/20">
              <button
                type="button"
                onClick={() => onToggleUnit('celsius')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  unit === 'celsius'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => onToggleUnit('fahrenheit')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  unit === 'fahrenheit'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                °F
              </button>
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              title="Refresh weather data"
              className="p-2.5 rounded-full text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Share Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-amber-300 font-bold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Popular Cities & Recent Searches Chips */}
        <div className="mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-blue-100/70 font-medium shrink-0">Popular:</span>
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onSelectPopularCity(city)}
              className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/30 text-white border border-white/20 backdrop-blur-sm transition-colors shrink-0 font-medium"
            >
              {city}
            </button>
          ))}

          {recentSearches.length > 0 && (
            <>
              <span className="text-white/30 shrink-0">|</span>
              <span className="text-blue-100/70 font-medium shrink-0">Recent:</span>
              {recentSearches.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onSelectPopularCity(city)}
                  className="px-3 py-1 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/30 backdrop-blur-sm transition-colors shrink-0 font-medium"
                >
                  {city}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
