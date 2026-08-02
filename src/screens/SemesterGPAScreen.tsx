import React, { useState } from 'react';
import { useCGPA } from '../context/CGPAContext';
import { calculateSemesterGPA } from '../utils/gradeCalculator';
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Sparkles,
  Info,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Star,
} from 'lucide-react';
import { ALL_SEMESTER_TEMPLATES } from '../data/curriculum';

export const SemesterGPAScreen: React.FC = () => {
  const {
    selectedSemesterNum,
    setSelectedSemesterNum,
    draftSubjects,
    updateDraftSubjectMarks,
    updateDraftSubjectMeta,
    addCustomSubjectToDraft,
    removeSubjectFromDraft,
    saveCurrentSemester,
    resetSemesterMarks,
    setDraftSubjects,
  } = useCGPA();

  const [activeTab, setActiveTab] = useState<'input' | 'grade_table'>('input');

  const result = calculateSemesterGPA(draftSubjects);

  const handleSemesterSelect = (num: number) => {
    setSelectedSemesterNum(num);
  };

  const loadDefaultCurriculum = () => {
    const template = ALL_SEMESTER_TEMPLATES[selectedSemesterNum] || [];
    setDraftSubjects(template.map((s) => ({ ...s })));
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-28 animate-fadeIn">
      {/* Semester Header & Selector */}
      <div className="rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 p-5 md:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Semester GPA Calculator
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-[#9CA3AF] mt-1">
              Select your semester, review subjects, and enter marks obtained
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Clear Marks: Gray Outline */}
            <button
              onClick={resetSemesterMarks}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-[#9CA3AF] flex items-center gap-1.5 transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Marks</span>
            </button>
            {/* Save Result: Purple Gradient Primary Button */}
            <button
              onClick={saveCurrentSemester}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#A855F7] hover:opacity-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-500/25 transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Result</span>
            </button>
          </div>
        </div>

        {/* Semester Buttons Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
            const isSelected = selectedSemesterNum === num;
            return (
              <button
                key={num}
                onClick={() => handleSemesterSelect(num)}
                className={`py-2.5 px-2 rounded-2xl text-xs font-bold transition-all active:scale-95 relative ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#6D28D9] to-[#A855F7] text-white shadow-lg shadow-purple-500/30 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-[#9CA3AF] hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Sem {num}
                {num === 3 && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedSemesterNum === 3 && (
          <div className="mt-4 p-3 rounded-2xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-300 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span>
              <strong>Semester III B.Tech Curriculum</strong> loaded automatically (5 subjects, 20 credits).
            </span>
          </div>
        )}
      </div>

      {/* Calculated Result Live Summary Banner with Tiny Outline Icons */}
      <div className="rounded-3xl bg-gradient-to-br from-[#151D33] via-slate-900 to-[#1e1438] text-white p-6 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-semibold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              GPA
            </span>
            <div className="text-3xl font-black text-white mt-1">
              {result.gpa.toFixed(2)}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Out of 10.0 scale
            </p>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-semibold text-blue-300 flex items-center gap-1.5 uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-blue-400" />
              Credits
            </span>
            <div className="text-3xl font-black text-white mt-1">
              {result.totalCredits}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Credits Evaluated
            </p>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Star className="w-4 h-4 text-amber-400" />
              Grade
            </span>
            <div className="text-3xl font-black text-amber-400 mt-1">
              {result.grade}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Grade Letter
            </p>
          </div>

          <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50">
            <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Percentage
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {result.percentage.toFixed(1)}%
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Equivalent Marks %
            </p>
          </div>
        </div>
      </div>

      {/* Subjects Input List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">
            Semester {selectedSemesterNum} Subjects ({draftSubjects.length})
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={loadDefaultCurriculum}
              className="text-xs font-semibold text-slate-500 dark:text-[#9CA3AF] hover:text-[#7C3AED] dark:hover:text-purple-400 transition-colors"
            >
              Reset Curriculum
            </button>
            <button
              onClick={addCustomSubjectToDraft}
              className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-[#7C3AED] dark:text-purple-300 font-semibold text-xs flex items-center gap-1 transition-all active:scale-95 border border-purple-200/50 dark:border-purple-800/50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Subject</span>
            </button>
          </div>
        </div>

        <div className="space-y-3.5">
          {draftSubjects.map((sub, index) => {
            const hasValue = sub.obtainedMarks !== null;
            const pct =
              sub.obtainedMarks !== null
                ? Math.min(100, Math.max(0, (sub.obtainedMarks / sub.maxMarks) * 100))
                : 0;

            // Grade badge color mappings
            const getGradeBadgeStyle = (grade?: string) => {
              if (grade === 'O' || grade === 'A+')
                return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
              if (grade === 'A')
                return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
              if (grade === 'B+')
                return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
              if (grade === 'B')
                return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
              if (grade === 'C' || grade === 'P')
                return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
              if (grade === 'F')
                return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
              return 'bg-slate-800/40 border-slate-700/50 text-slate-400';
            };

            return (
              <div
                key={sub.id || index}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-4 md:p-5 shadow-sm hover:border-purple-500/50 transition-all space-y-3"
              >
                {/* 1. Subject Name */}
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={sub.name}
                    onChange={(e) =>
                      updateDraftSubjectMeta(sub.id, e.target.value, sub.credits, sub.maxMarks)
                    }
                    className="w-full font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-purple-500 focus:outline-none py-0.5 text-base"
                    placeholder="Subject Name"
                  />
                  <button
                    onClick={() => removeSubjectFromDraft(sub.id)}
                    className="text-slate-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Remove Subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 2. Credits & Max Marks Info Row */}
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-[#9CA3AF]">
                  <label className="flex items-center gap-1.5">
                    <span className="font-medium">Credits:</span>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={sub.credits}
                      onChange={(e) =>
                        updateDraftSubjectMeta(
                          sub.id,
                          sub.name,
                          Number(e.target.value) || 1,
                          sub.maxMarks
                        )
                      }
                      className="w-12 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-center"
                    />
                  </label>

                  <span className="text-slate-300 dark:text-slate-700">•</span>

                  <label className="flex items-center gap-1.5">
                    <span className="font-medium">Max Marks:</span>
                    <input
                      type="number"
                      min="10"
                      max="500"
                      value={sub.maxMarks}
                      onChange={(e) =>
                        updateDraftSubjectMeta(
                          sub.id,
                          sub.name,
                          sub.credits,
                          Number(e.target.value) || 100
                        )
                      }
                      className="w-16 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-center"
                    />
                  </label>
                </div>

                {/* 3. Marks Input & 4. Grade Badge */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-[#9CA3AF] font-medium hidden sm:inline">
                      Obtained:
                    </span>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="0"
                        max={sub.maxMarks}
                        value={sub.obtainedMarks !== null ? sub.obtainedMarks : ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? null : Number(e.target.value);
                          updateDraftSubjectMarks(sub.id, val);
                        }}
                        placeholder="0"
                        className="w-24 sm:w-28 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      />
                      <span className="ml-2 text-xs text-slate-400 font-semibold">
                        / {sub.maxMarks}
                      </span>
                    </div>
                  </div>

                  {/* Grade Badge */}
                  <div
                    className={`px-3.5 py-1.5 rounded-xl border text-center font-bold text-xs flex items-center gap-2 ${getGradeBadgeStyle(
                      sub.grade
                    )}`}
                  >
                    <span>Grade: {sub.grade || '-'}</span>
                    <span className="opacity-75 text-[10px]">
                      ({sub.gradePoint !== undefined ? `${sub.gradePoint} pts` : '-'})
                    </span>
                  </div>
                </div>

                {/* Progress bar (Increased thickness 8-10px with rounded ends) */}
                <div className="w-full bg-slate-100 dark:bg-slate-800/80 h-2.5 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      pct >= 80
                        ? 'bg-emerald-400'
                        : pct >= 60
                        ? 'bg-purple-500'
                        : pct >= 40
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grading Scale Info Modal / Guide */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-5">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-purple-400" />
          University Grading Scale Reference
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-bold text-emerald-500">90-100% = O</span>
            <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">10 Grade Points</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-bold text-blue-400">80-89% = A+</span>
            <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">9 Grade Points</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-bold text-indigo-400">70-79% = A</span>
            <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">8 Grade Points</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-bold text-purple-400">60-69% = B+</span>
            <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">7 Grade Points</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-bold text-amber-400">50-59% = B</span>
            <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">6 Grade Points</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-bold text-yellow-400">45-49% = C</span>
            <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">5 Grade Points</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-bold text-teal-400">40-44% = P</span>
            <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">4 Grade Points</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-bold text-rose-500">&lt; 40% = F</span>
            <p className="text-[10px] text-slate-500 dark:text-[#9CA3AF]">0 Grade Points</p>
          </div>
        </div>
      </div>
    </div>
  );
};
