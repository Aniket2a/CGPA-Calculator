import React, { useState } from 'react';
import { useCGPA } from '../context/CGPAContext';
import { calculatePercentageFromCGPA, calculateCGPA } from '../utils/gradeCalculator';
import { Percent, ArrowRightLeft, Sparkles, Calculator, CheckCircle2 } from 'lucide-react';

export const PercentageScreen: React.FC = () => {
  const { semesters } = useCGPA();

  const currentCGPA = calculateCGPA(semesters);

  const [inputCGPA, setInputCGPA] = useState<string>(
    currentCGPA > 0 ? currentCGPA.toString() : '8.50'
  );

  const numCGPA = parseFloat(inputCGPA);
  const isValidCGPA = !isNaN(numCGPA) && numCGPA >= 0 && numCGPA <= 10;
  const convertedPercentage = isValidCGPA ? calculatePercentageFromCGPA(numCGPA) : 0;

  // Reverse calculator state (Percentage to CGPA)
  const [inputPct, setInputPct] = useState<string>('77.5');
  const numPct = parseFloat(inputPct);
  const isValidPct = !isNaN(numPct) && numPct >= 0 && numPct <= 100;
  // Percentage = (CGPA - 0.75) * 10 => CGPA = (Percentage / 10) + 0.75
  const reverseCGPA = isValidPct ? Number(((numPct / 10) + 0.75).toFixed(2)) : 0;

  return (
    <div className="space-y-6 md:space-y-8 pb-28 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Percent className="w-6 h-6 text-[#7C3AED] dark:text-purple-400" />
          B.Tech Percentage Converter
        </h2>
        <p className="text-xs text-slate-500 dark:text-[#9CA3AF] mt-1 leading-relaxed">
          Standard AICTE / University B.Tech conversion formula:
          <br />
          <code className="text-[#7C3AED] dark:text-purple-400 font-mono text-[12px] font-bold">
            Percentage (%) = (CGPA - 0.75) × 10
          </code>
        </p>
      </div>

      {/* Main Converter Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Forward Converter: CGPA -> Percentage */}
        <div className="rounded-3xl bg-gradient-to-br from-[#151D33] via-slate-900 to-[#1e1438] border border-slate-800 text-white p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold mb-3 text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CGPA to Percentage</span>
            </div>

            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Enter CGPA (0.00 - 10.00):
            </label>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={inputCGPA}
                onChange={(e) => setInputCGPA(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white font-black text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {currentCGPA > 0 && (
                <button
                  onClick={() => setInputCGPA(currentCGPA.toFixed(2))}
                  className="px-3 py-3 rounded-2xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-700/50 text-xs font-bold whitespace-nowrap transition-all active:scale-95"
                  title="Use calculated CGPA"
                >
                  Use My CGPA ({currentCGPA.toFixed(2)})
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-center mt-4">
            <span className="text-xs text-purple-300 uppercase tracking-wider font-semibold">
              Equivalent Percentage
            </span>
            <div className="text-4xl font-black text-emerald-400 mt-1">
              {isValidCGPA ? `${convertedPercentage.toFixed(2)}%` : 'Invalid Input'}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              ({isValidCGPA ? `${numCGPA} - 0.75` : '0'} × 10)
            </p>
          </div>
        </div>

        {/* Reverse Converter: Percentage -> CGPA */}
        <div className="rounded-3xl bg-gradient-to-br from-[#151D33] via-slate-900 to-[#1b233a] border border-slate-800 text-white p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold mb-3 text-blue-300">
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-300" />
              <span>Percentage to CGPA</span>
            </div>

            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Enter Percentage (0% - 100%):
            </label>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={inputPct}
                onChange={(e) => setInputPct(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-white font-black text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-center mt-4">
            <span className="text-xs text-blue-300 uppercase tracking-wider font-semibold">
              Estimated Equivalent CGPA
            </span>
            <div className="text-4xl font-black text-[#A855F7] mt-1">
              {isValidPct ? reverseCGPA.toFixed(2) : 'Invalid Input'}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              ({isValidPct ? `${numPct} / 10` : '0'} + 0.75)
            </p>
          </div>
        </div>
      </div>

      {/* Quick Conversion Lookup Reference Table */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#7C3AED] dark:text-purple-400" />
          Quick CGPA to Percentage Reference Chart
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[10.0, 9.5, 9.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5].map((val) => {
            const pct = calculatePercentageFromCGPA(val);
            const isMatch = currentCGPA > 0 && Math.abs(currentCGPA - val) < 0.25;
            return (
              <div
                key={val}
                className={`p-3 rounded-2xl border transition-all ${
                  isMatch
                    ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800 ring-2 ring-purple-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {val.toFixed(1)} CGPA
                  </span>
                  {isMatch && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <span className="text-[#7C3AED] dark:text-purple-400 font-bold text-sm block mt-1">
                  {pct.toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
