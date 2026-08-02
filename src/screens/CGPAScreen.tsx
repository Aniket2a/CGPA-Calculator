import React, { useState } from 'react';
import { useCGPA } from '../context/CGPAContext';
import { calculateCGPA, calculatePercentageFromCGPA } from '../utils/gradeCalculator';
import {
  Award,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const CGPAScreen: React.FC = () => {
  const {
    semesters,
    deleteSemester,
    setSelectedSemesterNum,
    setCurrentTab,
    showToast,
  } = useCGPA();

  const [manualSemesters, setManualSemesters] = useState<
    { id: string; semName: string; gpa: number }[]
  >([]);

  const [customSemName, setCustomSemName] = useState('Semester I');
  const [customGPA, setCustomGPA] = useState('');

  const cumulativeCGPA = calculateCGPA(semesters);
  const percentage = calculatePercentageFromCGPA(cumulativeCGPA);

  const handleAddManualSem = () => {
    const val = parseFloat(customGPA);
    if (isNaN(val) || val < 0 || val > 10) {
      showToast('Please enter a valid GPA between 0.00 and 10.00');
      return;
    }
    setManualSemesters((prev) => [
      ...prev,
      { id: Date.now().toString(), semName: customSemName, gpa: val },
    ]);
    setCustomGPA('');
    showToast('Semester added');
  };

  const handleRemoveManual = (id: string) => {
    setManualSemesters((prev) => prev.filter((s) => s.id !== id));
  };

  // Combine saved semesters and manual entries for real-time CGPA preview if needed
  const totalSems = semesters.length + manualSemesters.length;
  const sumOfAllGPAs =
    semesters.reduce((a, b) => a + b.gpa, 0) +
    manualSemesters.reduce((a, b) => a + b.gpa, 0);

  const combinedCGPA = totalSems > 0 ? Number((sumOfAllGPAs / totalSems).toFixed(2)) : 0;
  const combinedPct = calculatePercentageFromCGPA(combinedCGPA);

  return (
    <div className="space-y-6 md:space-y-8 pb-28 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-[#7C3AED] dark:text-purple-400" />
          Cumulative GPA (CGPA) Calculator
        </h2>
        <p className="text-xs text-slate-500 dark:text-[#9CA3AF] mt-1 leading-relaxed">
          CGPA is evaluated as the arithmetic mean of all completed semester GPAs:
          <br />
          <code className="text-[#7C3AED] dark:text-purple-400 font-mono text-[11px] font-bold">
            CGPA = Σ(Semester GPAs) ÷ Total Number of Semesters
          </code>
        </p>
      </div>

      {/* Main Result Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#151D33] via-slate-900 to-[#1e1438] border border-slate-800 text-white p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
              Cumulative CGPA
            </span>
            <div className="text-4xl md:text-5xl font-black text-white mt-1">
              {combinedCGPA.toFixed(2)}
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Equivalent Percentage: <strong className="text-emerald-400">{combinedPct.toFixed(2)}%</strong>
            </p>
          </div>

          <div className="flex flex-col gap-2 bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60">
            <div className="text-xs text-slate-300">
              Recorded Semesters: <strong className="text-white">{totalSems}</strong>
            </div>
            <div className="text-xs text-slate-300">
              Sum of GPAs: <strong className="text-white">{sumOfAllGPAs.toFixed(2)}</strong>
            </div>
            <div className="text-xs text-slate-300">
              Formula Status: <span className="text-emerald-400 font-bold">Valid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Semesters List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Saved Semester Records ({semesters.length})
          </h3>
          <button
            onClick={() => {
              setSelectedSemesterNum(semesters.length + 1 > 8 ? 8 : semesters.length + 1);
              setCurrentTab('semester_gpa');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#7C3AED] dark:text-purple-300 border border-purple-200/50 dark:border-purple-800/50 font-semibold text-xs flex items-center gap-1 hover:bg-purple-100 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Semester</span>
          </button>
        </div>

        {semesters.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center bg-slate-50/50 dark:bg-[#151D33]">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              No saved semesters yet.
            </p>
            <p className="text-xs text-slate-400 dark:text-[#9CA3AF] mt-1">
              Calculate and save semester GPAs in the Semester GPA tab to see your CGPA.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {semesters.map((sem) => (
              <div
                key={sem.semesterNumber}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-4 shadow-sm flex items-center justify-between hover:border-purple-500/50 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {sem.semesterName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-[10px] font-bold">
                      Grade: {sem.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-[#9CA3AF] mt-1">
                    Credits: {sem.totalCredits} • Subjects: {sem.subjects.length}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-[#7C3AED] dark:text-purple-400">
                      {sem.gpa.toFixed(2)}
                    </div>
                    <span className="text-[10px] text-slate-400">GPA</span>
                  </div>

                  <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-2">
                    <button
                      onClick={() => {
                        setSelectedSemesterNum(sem.semesterNumber);
                        setCurrentTab('semester_gpa');
                      }}
                      title="Edit Semester"
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-[#7C3AED] active:scale-95"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteSemester(sem.semesterNumber)}
                      title="Delete Record"
                      className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-400 hover:text-rose-500 active:scale-95"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Add GPA Widget */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-5 space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Quick Add Previous Semester GPA (Manual Entry)
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={customSemName}
            onChange={(e) => setCustomSemName(e.target.value)}
            placeholder="Semester Name (e.g., Sem I)"
            className="w-full sm:w-1/2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={customGPA}
            onChange={(e) => setCustomGPA(e.target.value)}
            placeholder="GPA (0.00 - 10.00)"
            className="w-full sm:w-1/3 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAddManualSem}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#A855F7] hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {manualSemesters.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-[#9CA3AF] font-semibold">Temporary Manual Entries:</span>
            <div className="flex flex-wrap gap-2">
              {manualSemesters.map((m) => (
                <div
                  key={m.id}
                  className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2"
                >
                  <span>
                    {m.semName}: <strong>{m.gpa.toFixed(2)}</strong>
                  </span>
                  <button
                    onClick={() => handleRemoveManual(m.id)}
                    className="hover:text-rose-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
