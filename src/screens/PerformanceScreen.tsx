import React from 'react';
import { useCGPA } from '../context/CGPAContext';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import {
  TrendingUp,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export const PerformanceScreen: React.FC = () => {
  const { semesters, theme } = useCGPA();

  // Sort semesters by semesterNumber
  const sortedSemesters = [...semesters].sort((a, b) => a.semesterNumber - b.semesterNumber);

  const gpaValues = sortedSemesters.map((s) => s.gpa);
  const highestGPA = gpaValues.length > 0 ? Math.max(...gpaValues) : 0;
  const lowestGPA = gpaValues.length > 0 ? Math.min(...gpaValues) : 0;
  const averageGPA =
    gpaValues.length > 0
      ? Number((gpaValues.reduce((a, b) => a + b, 0) / gpaValues.length).toFixed(2))
      : 0;

  // Compute cumulative CGPA growth step by step
  let runningSum = 0;
  const chartData = sortedSemesters.map((s, index) => {
    runningSum += s.gpa;
    const cgpaTillNow = Number((runningSum / (index + 1)).toFixed(2));
    return {
      name: `Sem ${s.semesterNumber}`,
      SGPA: s.gpa,
      CGPA: cgpaTillNow,
      Credits: s.totalCredits,
    };
  });

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#1E293B' : '#E2E8F0';
  const textColor = isDark ? '#9CA3AF' : '#64748B';

  return (
    <div className="space-y-6 md:space-y-8 pb-28 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#7C3AED] dark:text-purple-400" />
          Academic Performance Analytics
        </h2>
        <p className="text-xs text-slate-500 dark:text-[#9CA3AF] mt-1">
          Visual analysis of semester GPA trends, cumulative growth, and score distribution
        </p>
      </div>

      {/* Hero Performance Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Highest GPA */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Highest GPA
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {highestGPA > 0 ? highestGPA.toFixed(2) : 'N/A'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" /> Best Semester
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Lowest GPA */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Lowest GPA
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {lowestGPA > 0 ? lowestGPA.toFixed(2) : 'N/A'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-1 flex items-center gap-1">
              <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" /> Minimum Score
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <TrendingUp className="w-6 h-6 rotate-180" />
          </div>
        </div>

        {/* Average GPA */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#7C3AED] dark:text-purple-400 uppercase tracking-wider">
              Average GPA
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {averageGPA > 0 ? averageGPA.toFixed(2) : 'N/A'}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-1">Mean of Semesters</p>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-[#7C3AED] dark:text-purple-400">
            <BarChart3 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Semesters */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Evaluated Sems
            </span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {sortedSemesters.length}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF] mt-1">Total Tracked</p>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main SGPA vs CGPA Growth Line Chart */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Semester GPA & CGPA Growth Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#9CA3AF]">
              Comparing individual semester scores (SGPA) with cumulative progress (CGPA)
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#7C3AED] inline-block" />
              <span className="text-slate-700 dark:text-slate-300">SGPA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#A855F7] inline-block" />
              <span className="text-slate-700 dark:text-slate-300">CGPA</span>
            </div>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-xs">
            No semester data to plot graphs. Add semester results first.
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sgpaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="cgpaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} />
                <YAxis domain={[0, 10]} stroke={textColor} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#151D33' : '#FFFFFF',
                    borderColor: isDark ? '#334155' : '#E2E8F0',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="SGPA"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#sgpaGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="CGPA"
                  stroke="#A855F7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#cgpaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Credit Distribution Bar Chart */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
          Credits Evaluated Per Semester
        </h3>
        <p className="text-xs text-slate-500 dark:text-[#9CA3AF] mb-4">
          Total academic weight (credits) per semester
        </p>

        {chartData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-slate-400 text-xs">
            No semester data available
          </div>
        ) : (
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} />
                <YAxis stroke={textColor} fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#151D33' : '#FFFFFF',
                    borderColor: isDark ? '#334155' : '#E2E8F0',
                    borderRadius: '12px',
                    color: isDark ? '#FFFFFF' : '#0F172A',
                  }}
                />
                <Bar dataKey="Credits" fill="#34D399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
