import React, { useState } from 'react';
import { useCGPA } from '../context/CGPAContext';
import {
  Settings,
  User,
  Moon,
  Sun,
  Trash2,
  FileText,
  Smartphone,
  Download,
  Info,
  ShieldCheck,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { generatePDFReport } from '../services/pdfGenerator';

export const SettingsScreen: React.FC = () => {
  const {
    profile,
    updateProfile,
    theme,
    toggleTheme,
    resetAllAppData,
    semesters,
    showToast,
    deviceFrame,
    setDeviceFrame,
  } = useCGPA();

  const [studentName, setStudentName] = useState(profile.studentName || '');
  const [rollNumber, setRollNumber] = useState(profile.rollNumber || '');
  const [branch, setBranch] = useState(profile.branch || '');
  const [college, setCollege] = useState(profile.college || '');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      studentName,
      rollNumber,
      branch,
      college,
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-28 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl bg-white dark:bg-[#151D33] border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#7C3AED] dark:text-purple-400" />
          Settings & Student Profile
        </h2>
        <p className="text-xs text-slate-500 dark:text-[#9CA3AF] mt-1">
          Configure profile details, theme appearance, PDF export, and local data backups
        </p>
      </div>

      {/* Student Profile Settings Card */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <User className="w-5 h-5 text-[#7C3AED] dark:text-purple-400" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Student Academic Profile
          </h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Student Full Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g., Alex Johnson"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Roll / Registration Number
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g., 21BTECH001"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Engineering Branch / Specialization
              </label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="e.g., Computer Science & Engineering"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                College / University Name
              </label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g., Institute of Technology"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#A855F7] hover:opacity-95 text-white font-bold text-xs transition-all shadow-md shadow-purple-500/20 active:scale-95"
            >
              Save Profile Info
            </button>
          </div>
        </form>
      </div>

      {/* Preferences & Theme Controls */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/80 pb-3">
          App Customization
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {/* Theme Toggle Row */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white text-xs">
                Color Mode
              </span>
              <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                Switch between Material Dark and Light mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Dark Theme</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-purple-600" />
                  <span>Light Theme</span>
                </>
              )}
            </button>
          </div>

          {/* Device Frame View Toggle */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-900 dark:text-white text-xs">
                Android Phone Frame Mode
              </span>
              <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                Simulate native Android Material 3 app frame container
              </p>
            </div>
            <button
              onClick={() => setDeviceFrame(!deviceFrame)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all active:scale-95 ${
                deviceFrame
                  ? 'bg-gradient-to-r from-[#6D28D9] to-[#A855F7] text-white shadow-md shadow-purple-500/20'
                  : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{deviceFrame ? 'Frame Enabled' : 'Full Screen'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export & PDF Report */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#151D33] p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base border-b border-slate-100 dark:border-slate-800/80 pb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#7C3AED] dark:text-purple-400" />
          Academic Reports & PDF Export
        </h3>

        <p className="text-xs text-slate-500 dark:text-[#9CA3AF] leading-relaxed">
          Generate an official print-formatted PDF transcript containing your student profile, semester GPA breakdowns, subject credits, obtained marks, and CGPA evaluation.
        </p>

        <button
          onClick={() => generatePDFReport(semesters, profile)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#A855F7] hover:opacity-95 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-purple-500/20 transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Generate & Print PDF Report</span>
        </button>
      </div>

      {/* Reset & Privacy Data Management */}
      <div className="rounded-3xl border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-rose-200/60 dark:border-rose-900/50 pb-3">
          <Trash2 className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h3 className="font-bold text-rose-900 dark:text-rose-200 text-base">
            Data & Offline Storage Management
          </h3>
        </div>

        <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
          All CGPA scores, custom subjects, and profile information are stored strictly locally inside your browser / device sandbox. Clearing data will erase all stored semester records.
        </p>

        <button
          onClick={() => {
            if (
              window.confirm(
                'Are you sure you want to reset all saved semester GPAs and profile data?'
              )
            ) {
              resetAllAppData();
            }
          }}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All App Data</span>
        </button>
      </div>
    </div>
  );
};
