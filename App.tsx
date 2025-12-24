/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { AppState, City, CITIES } from './types';
import CityMap from './components/CityMap';
import CityDashboard from './components/CityDashboard';
import { ShieldAlert, ShieldCheck, Info } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.MAP);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setAppState(AppState.CITY_DETAIL);
  };

  const handleBackToMap = () => {
    setAppState(AppState.MAP);
    setSelectedCity(null);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <header className="relative z-10 py-6 px-8 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            SMART CYBER MOROCCO
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400 font-medium">
          <span className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Secure
          </span>
          <button className="hover:text-white transition-colors flex items-center gap-1">
            <Info className="w-4 h-4" />
            Learning Guide
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto p-6 md:p-10 h-[calc(100vh-85px)]">
        {appState === AppState.MAP ? (
          <div className="h-full flex flex-col">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-4xl font-extrabold text-white mb-4">Explore the Digital Kingdom</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Choose a strategic hub to investigate its cyber infrastructure. Learn how Morocco protects its smart cities from digital threats.
              </p>
            </div>
            <div className="flex-grow">
              <CityMap cities={CITIES} onCitySelect={handleCitySelect} />
            </div>
          </div>
        ) : (
          selectedCity && (
            <CityDashboard city={selectedCity} onBack={handleBackToMap} />
          )
        )}
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-0 w-full p-4 text-center text-xs text-slate-600 bg-slate-950/80 backdrop-blur-sm">
        &copy; 2025 Smart Cyber Morocco Project • Powered by Gemini AI Intelligence
      </footer>
    </div>
  );
};

export default App;
