import React from 'react';
import { GeoLocation } from '../types';
import { MapPin, Globe, ChevronRight, X } from 'lucide-react';

interface LocationPickerModalProps {
  locations: GeoLocation[];
  searchQuery: string;
  onSelectLocation: (location: GeoLocation) => void;
  onClose: () => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  locations,
  searchQuery,
  onSelectLocation,
  onClose,
}) => {
  if (!locations || locations.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-300">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Multiple Locations Found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Matches for &ldquo;<span className="font-semibold text-slate-800 dark:text-slate-200">{searchQuery}</span>&rdquo;. Please select your target city:
            </p>
          </div>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {locations.map((loc) => {
            const adminRegion = loc.admin1 ? `${loc.admin1}, ` : '';
            const countryStr = loc.country || loc.country_code || 'Unknown Region';
            const locationSubtitle = `${adminRegion}${countryStr}`;

            return (
              <button
                key={loc.id || `${loc.latitude}-${loc.longitude}`}
                onClick={() => onSelectLocation(loc)}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 hover:bg-sky-50/50 dark:hover:bg-sky-950/30 transition-all flex items-center justify-between group"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400">
                      {loc.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {locationSubtitle}
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-mono">
                      {loc.latitude.toFixed(2)}°N, {loc.longitude.toFixed(2)}°E {loc.elevation ? `• ${loc.elevation}m elev.` : ''}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
              </button>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
