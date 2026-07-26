import React from 'react';
import { AlertTriangle, RefreshCw, XCircle, SearchX } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  type?: 'not_found' | 'network' | 'validation';
  onRetry?: () => void;
  onClear?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  type = 'network',
  onRetry,
  onClear,
}) => {
  if (!message) return null;

  const isNotFound = type === 'not_found' || message.toLowerCase().includes('not found');

  return (
    <div
      className={`p-5 rounded-2xl border transition-all animate-fadeIn ${
        isNotFound
          ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
          : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 shrink-0 shadow-sm">
          {isNotFound ? (
            <SearchX className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          )}
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="font-bold text-sm">
            {isNotFound ? 'City Not Found' : 'Weather Data Request Failed'}
          </h3>
          <p className="text-xs leading-relaxed opacity-90">{message}</p>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry Request
              </button>
            )}

            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="px-3 py-1.5 rounded-lg text-xs font-medium hover:underline opacity-80 hover:opacity-100"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
