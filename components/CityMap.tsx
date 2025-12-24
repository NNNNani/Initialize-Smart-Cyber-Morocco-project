/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { City } from '../types';
import { MapPin } from 'lucide-react';

interface CityMapProps {
  cities: City[];
  onCitySelect: (city: City) => void;
}

const CityMap: React.FC<CityMapProps> = ({ cities, onCitySelect }) => {
  return (
    <div className="relative w-full h-full bg-slate-900/50 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center">
      {/* Visual placeholder for the map of Morocco */}
      <div className="relative w-[600px] h-[500px]">
        {/* Stylized Moroccan Map Shape using CSS/SVG */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800 fill-current drop-shadow-[0_0_30px_rgba(30,41,59,0.5)]">
          <path d="M40,5 L55,10 L65,5 L80,10 L90,20 L95,40 L85,60 L75,85 L60,95 L40,90 L20,70 L15,50 L25,20 Z" />
        </svg>

        {/* City Nodes */}
        {cities.map((city) => (
          <button
            key={city.id}
            onClick={() => onCitySelect(city)}
            className="absolute group flex flex-col items-center transition-all duration-300 hover:scale-110"
            style={{ left: `${city.coordinates.x}%`, top: `${city.coordinates.y}%` }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20 group-hover:opacity-40" />
              <div className="relative p-2 bg-slate-950 rounded-full border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:bg-cyan-500 group-hover:border-white transition-colors">
                <MapPin className="w-5 h-5 text-cyan-400 group-hover:text-white" />
              </div>
            </div>
            <div className="mt-2 px-3 py-1 bg-slate-950/80 backdrop-blur-sm border border-slate-700 rounded-full text-xs font-bold text-white shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {city.name}
            </div>
          </button>
        ))}

        {/* Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      <div className="absolute bottom-6 left-6 flex gap-4 text-xs font-mono text-slate-500 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" /> Secure Hub
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Threat Detected
        </div>
      </div>
    </div>
  );
};

export default CityMap;
