/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { City } from '../types';
import { getCyberAdvice } from '../services/geminiService';
import { 
  ArrowLeft, 
  Activity, 
  Zap, 
  Terminal, 
  ShieldAlert, 
  UserCircle,
  BrainCircuit,
  Lock
} from 'lucide-react';

interface CityDashboardProps {
  city: City;
  onBack: () => void;
}

const CityDashboard: React.FC<CityDashboardProps> = ({ city, onBack }) => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [mentorText, setMentorText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cityHealth, setCityHealth] = useState(city.health);

  const triggerScenario = async (scenario: string) => {
    setActiveScenario(scenario);
    setIsLoading(true);
    setCityHealth(prev => Math.max(prev - 20, 20));
    
    try {
      const advice = await getCyberAdvice(city.name, scenario);
      setMentorText(advice);
    } catch (err) {
      setMentorText("Connection interrupted. Cyber Mentor offline.");
    } finally {
      setIsLoading(false);
    }
  };

  const resolveThreat = () => {
    setActiveScenario(null);
    setMentorText(null);
    setCityHealth(city.health);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Left Panel: City Stats */}
      <div className="lg:col-span-1 flex flex-col gap-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group mb-2"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Kingdom Map
        </button>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-3xl font-black text-white mb-2">{city.name}</h3>
          <p className="text-slate-400 text-sm mb-6">{city.description}</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">System Integrity</span>
                <span className={`text-sm font-bold ${cityHealth > 70 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {cityHealth}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${cityHealth > 70 ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${cityHealth}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {city.systems.map(sys => (
                <div key={sys} className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs text-slate-300 truncate">{sys}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex-grow shadow-xl">
          <h4 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Threat Simulation
          </h4>
          <div className="flex flex-col gap-3">
            <button 
              disabled={!!activeScenario}
              onClick={() => triggerScenario('DDoS Attack on Hub')}
              className="p-3 text-left bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium transition-colors disabled:opacity-50"
            >
              Simulate DDoS Attack
            </button>
            <button 
              disabled={!!activeScenario}
              onClick={() => triggerScenario('Social Engineering Attempt')}
              className="p-3 text-left bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded-xl text-orange-400 text-sm font-medium transition-colors disabled:opacity-50"
            >
              Simulate Phishing Trial
            </button>
          </div>
        </div>
      </div>

      {/* Center & Right Panel: Cyber Mentor & Interaction */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="flex-grow bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col relative shadow-inner">
          {/* Dashboard Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-xs font-mono text-cyan-500 tracking-tighter uppercase">Live Network Feed</span>
            </div>
            <Terminal className="w-4 h-4 text-slate-500" />
          </div>

          {/* Interaction Area */}
          <div className="flex-grow p-8 flex flex-col items-center justify-center text-center">
            {!activeScenario ? (
              <div className="max-w-md">
                <div className="p-6 bg-cyan-500/10 rounded-full inline-block mb-6 border border-cyan-500/20">
                  <Activity className="w-12 h-12 text-cyan-400 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Systems Operational</h3>
                <p className="text-slate-400">Everything is normal in {city.name}. Use the side panel to simulate a threat and learn how to defend the city.</p>
              </div>
            ) : (
              <div className="w-full max-w-2xl space-y-6 animate-in zoom-in-95 duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20 shrink-0">
                    <BrainCircuit className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-left relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                    <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                      Cyber Mentor Protocol
                    </h4>
                    {isLoading ? (
                      <div className="flex items-center gap-3 text-slate-500">
                        <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                        Analyzing threat vectors...
                      </div>
                    ) : (
                      <div className="text-slate-200 leading-relaxed text-lg italic font-medium">
                        "{mentorText}"
                      </div>
                    )}
                  </div>
                </div>

                {!isLoading && (
                  <div className="flex justify-center gap-4 pt-4">
                    <button 
                      onClick={resolveThreat}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
                    >
                      <Lock className="w-5 h-5" />
                      Apply Defense Protocol
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* User Input Area (Static Placeholder) */}
          <div className="p-6 border-t border-slate-800 bg-slate-900/50">
             <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3">
                <UserCircle className="w-6 h-6 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Ask the Cyber Mentor a question..." 
                  className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 w-full"
                />
                <button className="text-xs font-bold text-slate-600 uppercase hover:text-cyan-500 transition-colors">
                  Send
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDashboard;
