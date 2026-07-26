import React from 'react';
import { Cloud, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/20 bg-white/10 backdrop-blur-md mt-12 py-8 text-blue-100/80 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-amber-300" />
            <span className="font-extrabold text-white">
              Weather Intelligence App
            </span>
            <span className="text-blue-100/70">— Everyday weather insights & daily planning recommendations.</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
            >
              <span>Powered by Open-Meteo API</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-white/15 text-[11px] text-blue-100/60">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Public Open-Meteo APIs • Zero Secrets Required • Production-Ready</span>
          </div>
          <div>
            Build Command: <code className="bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">npm run build</code> (output: <code className="bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">dist</code>)
          </div>
        </div>
      </div>
    </footer>
  );
};
