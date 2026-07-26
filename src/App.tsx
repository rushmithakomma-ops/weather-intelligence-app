import React, { useState, useEffect, useCallback } from 'react';
import { GeoLocation, WeatherData, TemperatureUnit } from './types';
import { searchCity, fetchWeatherForLocation } from './api/openMeteo';
import { generatePlanningRecommendations } from './utils/recommendations';
import { Header } from './components/Header';
import { LocationPickerModal } from './components/LocationPickerModal';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastCards } from './components/ForecastCards';
import { WeatherChart } from './components/WeatherChart';
import { RecommendationsPanel } from './components/RecommendationsPanel';
import { ErrorAlert } from './components/ErrorAlert';
import { Footer } from './components/Footer';
import { Loader2, Sparkles, MapPin } from 'lucide-react';

const DEFAULT_CITY = 'Tokyo';
const RECENT_SEARCHES_KEY = 'weather_recent_searches_v1';
const UNIT_KEY = 'weather_unit_v1';

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'not_found' | 'network' | 'validation'>('network');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Disambiguation location choices modal
  const [locationChoices, setLocationChoices] = useState<GeoLocation[]>([]);
  const [pendingQuery, setPendingQuery] = useState<string>('');

  // Unit toggle (°C / °F)
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem(UNIT_KEY);
    return (saved as TemperatureUnit) || 'celsius';
  });

  // Recent searches list
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected day for detailed recommendation focus
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Save recent search city
  const addRecentSearch = (cityName: string) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
      const updated = [cityName, ...filtered].slice(0, 5);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle temperature unit
  const handleToggleUnit = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    localStorage.setItem(UNIT_KEY, newUnit);
  };

  // Update URL share link parameter
  const updateUrlCityParam = (cityName: string) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('city', cityName);
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      // Ignore if URL modification is restricted
    }
  };

  // Main weather loader for a chosen GeoLocation
  const loadWeatherForLocation = useCallback(async (location: GeoLocation) => {
    setIsLoading(true);
    setErrorMessage(null);
    setValidationError(null);
    setLocationChoices([]);

    try {
      const data = await fetchWeatherForLocation(location);
      setWeatherData(data);
      addRecentSearch(location.name);
      updateUrlCityParam(location.name);
    } catch (err: any) {
      setErrorType('network');
      setErrorMessage(err.message || 'Failed to fetch weather data. Please check your network connection.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handler for city search submit
  const handleSearchSubmit = async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setValidationError('Please enter a city name to search.');
      return;
    }

    setValidationError(null);
    setErrorMessage(null);
    setIsLoading(true);
    setPendingQuery(trimmed);

    try {
      const matches = await searchCity(trimmed);

      if (matches.length === 0) {
        setIsLoading(false);
        setErrorType('not_found');
        setErrorMessage('City not found — please check the spelling and try again.');
        return;
      }

      if (matches.length === 1) {
        await loadWeatherForLocation(matches[0]);
      } else {
        // Multiple matches -> show location picker modal
        setIsLoading(false);
        setLocationChoices(matches);
      }
    } catch (err: any) {
      setIsLoading(false);
      setErrorType('network');
      setErrorMessage(err.message || 'Error searching for city. Please try again.');
    }
  };

  // Select location from picker modal
  const handleSelectDisambiguatedLocation = (loc: GeoLocation) => {
    setLocationChoices([]);
    loadWeatherForLocation(loc);
  };

  // Initial load on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialCity = urlParams.get('city') || DEFAULT_CITY;
    handleSearchSubmit(initialCity);
  }, []);

  // Generate recommendations from current weatherData
  const recommendations = weatherData
    ? generatePlanningRecommendations(weatherData.daily)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-indigo-600 to-indigo-800 text-slate-900 font-sans transition-colors selection:bg-amber-400 selection:text-slate-900">
      
      {/* Header with Search and Navigation */}
      <Header
        onSearchSubmit={handleSearchSubmit}
        isLoading={isLoading}
        unit={unit}
        onToggleUnit={handleToggleUnit}
        onSelectPopularCity={(city) => handleSearchSubmit(city)}
        recentSearches={recentSearches}
        onRefresh={() => {
          if (weatherData) {
            loadWeatherForLocation(weatherData.location);
          } else {
            handleSearchSubmit(DEFAULT_CITY);
          }
        }}
        validationError={validationError}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Disambiguation Location Picker Modal */}
        {locationChoices.length > 0 && (
          <LocationPickerModal
            locations={locationChoices}
            searchQuery={pendingQuery}
            onSelectLocation={handleSelectDisambiguatedLocation}
            onClose={() => setLocationChoices([])}
          />
        )}

        {/* Error Alert Display */}
        {errorMessage && (
          <ErrorAlert
            message={errorMessage}
            type={errorType}
            onRetry={() => {
              if (weatherData) {
                loadWeatherForLocation(weatherData.location);
              } else {
                handleSearchSubmit(pendingQuery || DEFAULT_CITY);
              }
            }}
            onClear={() => setErrorMessage(null)}
          />
        )}

        {/* Loading Spinner Skeleton */}
        {isLoading && !weatherData && (
          <div className="p-16 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
            <Loader2 className="w-10 h-10 text-sky-500 animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Fetching Live Weather Data...
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connecting to public Open-Meteo Geocoding & Forecast endpoints
              </p>
            </div>
          </div>
        )}

        {/* Weather Dashboard */}
        {weatherData && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* 1. Current Weather Panel */}
            <CurrentWeather weatherData={weatherData} unit={unit} />

            {/* 2. 7-Day Forecast Cards */}
            <ForecastCards
              dailyForecasts={weatherData.daily}
              unit={unit}
              selectedDate={selectedDate}
              onSelectDay={(date) => {
                setSelectedDate(selectedDate === date ? null : date);
              }}
            />

            {/* 3. Temperature & Rain Chart */}
            <WeatherChart dailyForecasts={weatherData.daily} unit={unit} />

            {/* 4. Planning Recommendations Panel */}
            <RecommendationsPanel
              recommendations={recommendations}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

          </div>
        )}

      </main>

      {/* Footer with Open-Meteo credit and threshold info */}
      <Footer />
    </div>
  );
}
