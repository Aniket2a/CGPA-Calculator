import React from 'react';
import { useCGPA } from '../context/CGPAContext';
import { calculateCGPA, calculatePercentageFromCGPA } from '../utils/gradeCalculator';
import {
  Calculator,
  Award,
  Percent,
  TrendingUp,
  Settings,
  PlusCircle,
  Sparkles,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Download,
  Share2,
} from 'lucide-react';
import { generatePDFReport } from '../services/pdfGenerator';

export const HomeScreen: React.FC = () => {
  const {
    semesters,
    setCurrentTab,
    setSelectedSemesterNum,
    profile,
    showToast,
  } = useCGPA();

  const currentCGPA = calculateCGPA(semesters);
  const currentPercentage = calculatePercentageFromCGPA(currentCGPA);

  // Find latest GPA
  const latestSem = semesters.length > 0 ? semesters[semesters.length - 1] : null;

  const quickActions = [
    {
      id: 'semester_gpa',
      title: 'Semester GPA Calculator',
      description: 'Calculate GPA with subject credits & marks',
      icon: <Calculator className="w-6 h-6 text-purple-400" />,
      gradient: 'from-purple-500/10 via-indigo-500/5 to-purple-500/10 border-purple-200/50 dark:border-purple-800/40',
      tab: 'semester_gpa' as const,
    },
    {
      id: 'cgpa',
      title: 'CGPA Calculator',
      description: 'Cumulative GPA across all completed semesters',
      icon: <Award className="w-6 h-6 text-indigo-400" />,
      gradient: 'from-indigo-500/10 via-purple-500/5 to-indigo-500/10 border-indigo-200/50 dark:border-indigo-800/40',
      tab: 'cgpa' as const,
    },
    {
      id: 'percentage',
      title: 'Percentage Calculator',
      description: 'Convert CGPA to percentage using (CGPA - 0.75) × 10',
      icon: <Percent className="w-6 h-6 text-emerald-400" />,
      gradient: 'from-emerald-500/10 via-teal-500/5 to-emerald-500/10 border-emerald-200/50 dark:border-emerald-800/40',
      tab: 'percentage' as const,
    },
    {
      id: 'performance',
      title: 'Performance Graph',
      description: 'Visual growth trends, highest, lowest & average GPA',
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      gradient: 'from-blue-500/10 via-sky-500/5 to-blue-500/10 border-blue-200/50 dark:border-blue-800/40',
      tab: 'performance' as const,
    },
    {
      id: 'settings',
      title: 'App Settings & Profile',
      description: 'Theme preferences, data backup & reset options',
      icon: <Settings className="w-6 h-6 text-amber-400" />,
      gradient: 'from-amber-500/10 via-orange-500/5 to-amber-500/10 border-amber-200/50 dark:border-amber-800/40',
      tab: 'settings' as const,
    },
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'My B.Tech CGPA Report',
          text: `My current B.Tech CGPA is ${currentCGPA.toFixed(2)} (${currentPercentage.toFixed(2)}%). Calculated via CGPA Calculator.`,
        })
        .then(() => showToast('Shared successfully'))
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `My current B.Tech CGPA is ${currentCGPA.toFixed(2)} (${currentPercentage.toFixed(2)}%).`
      );
      showToast('Result copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-24 animate-fadeIn">
      {/* Student Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6D28D9] to-[#A855F7] p-6 text-white shadow-xl shadow-purple-500/20">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>B.Tech Academic Portal</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Hello, {profile.studentName || 'B.Tech Scholar'} 👋
            </h2>
            <p className="text-sm text-purple-100 font-medium mt-1">
              {profile.branch} • {profile.rollNumber || 'Roll No: 21BTECH001'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => generatePDFReport(semesters, profile)}
              className="px-3.5 py-2 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-2xl bg-white text-purple-900 hover:bg-purple-50 font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main CGPA Hero Metrics Dashboard Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-[#7C3AED] dark:text-purple-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Academic Summary
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#9CA3AF]">
                Calculated from {semesters.length} saved semester(s)
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentTab('cgpa')}
            className="text-xs font-semibold text-[#7C3AED] dark:text-purple-400 hover:underline flex items-center gap-1"
          >
            Details <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* CGPA */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-purple-50/80 to-purple-100/30 dark:from-purple-950/40 dark:to-[#151D33] border border-purple-100 dark:border-purple-900/50">
            <span className="text-xs font-semibold text-[#7C3AED] dark:text-purple-400 uppercase tracking-wider">
              Current CGPA
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {currentCGPA > 0 ? currentCGPA.toFixed(2) : '0.00'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-1">
              Out of 10.0 scale
            </p>
          </div>

          {/* Percentage */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-indigo-50/80 to-indigo-100/30 dark:from-indigo-950/40 dark:to-[#151D33] border border-indigo-100 dark:border-indigo-900/50">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Percentage
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {currentPercentage > 0 ? `${currentPercentage.toFixed(1)}%` : '0.0%'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-1">
              (CGPA - 0.75) × 10
            </p>
          </div>

          {/* Latest Semester GPA */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-emerald-50/80 to-emerald-100/30 dark:from-emerald-950/40 dark:to-[#151D33] border border-emerald-100 dark:border-emerald-900/50">
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Latest SGPA
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {latestSem ? latestSem.gpa.toFixed(2) : 'N/A'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-1">
              {latestSem ? latestSem.semesterName : 'No data yet'}
            </p>
          </div>

          {/* Total Semesters Recorded */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50/80 to-amber-100/30 dark:from-amber-950/40 dark:to-[#151D33] border border-amber-100 dark:border-amber-900/50">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Recorded Sems
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {semesters.length} / 8
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-1">
              B.Tech Curriculum
            </p>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
          Calculator Suite
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              onClick={() => setCurrentTab(action.tab)}
              className={`group cursor-pointer rounded-2xl p-5 border bg-gradient-to-br ${action.gradient} bg-white dark:bg-[#151D33] hover:shadow-md transition-all duration-200 relative flex items-start gap-4 active:scale-95`}
            >
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm border border-slate-100 dark:border-slate-700/60 group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-purple-400 transition-colors">
                    {action.title}
                  </h4>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-xs text-slate-600 dark:text-[#9CA3AF] mt-1 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Semester Selection Bar */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#7C3AED] dark:text-purple-400" />
            Quick Calculate by Semester
          </h3>
          <span className="text-xs text-slate-500 dark:text-[#9CA3AF]">Sem 3 Pre-loaded</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
            const hasData = semesters.some((s) => s.semesterNumber === semNum);
            return (
              <button
                key={semNum}
                onClick={() => {
                  setSelectedSemesterNum(semNum);
                  setCurrentTab('semester_gpa');
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all active:scale-95 relative flex flex-col items-center justify-center gap-1 ${
                  hasData
                    ? 'bg-gradient-to-r from-[#6D28D9] to-[#A855F7] text-white shadow-md shadow-purple-500/20'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-[#9CA3AF] hover:bg-purple-50 dark:hover:bg-purple-950/50'
                }`}
              >
                <span>Sem {semNum}</span>
                {hasData && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
