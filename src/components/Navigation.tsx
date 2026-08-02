import React from 'react';
import { useCGPA } from '../context/CGPAContext';
import {
  Home,
  Calculator,
  Award,
  Percent,
  TrendingUp,
  Settings,
  Moon,
  Sun,
  Smartphone,
  GraduationCap,
} from 'lucide-react';
import { ScreenTab } from '../types';

export const Header: React.FC = () => {
  const { theme, toggleTheme, currentTab, setCurrentTab, deviceFrame, setDeviceFrame } = useCGPA();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-[#151D33]/90 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6D28D9] to-[#A855F7] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight bg-gradient-to-r from-[#7C3AED] via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              CGPA Calculator
            </h1>
            <p className="text-xs text-slate-500 dark:text-[#9CA3AF] font-medium">
              B.Tech Academic Portal
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Frame Toggle */}
          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            title={deviceFrame ? 'Switch to Full Web View' : 'Preview in Android Phone Frame'}
            className={`p-2 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 active:scale-95 ${
              deviceFrame
                ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800 text-[#7C3AED] dark:text-purple-300'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-[#9CA3AF] hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">{deviceFrame ? 'Phone View' : 'Full View'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-[#9CA3AF] hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#7C3AED]" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export const NavigationBar: React.FC = () => {
  const { currentTab, setCurrentTab } = useCGPA();

  const navItems: { id: ScreenTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'semester_gpa', label: 'GPA Calc', icon: <Calculator className="w-5 h-5" /> },
    { id: 'cgpa', label: 'CGPA', icon: <Award className="w-5 h-5" /> },
    { id: 'percentage', label: 'Percentage', icon: <Percent className="w-5 h-5" /> },
    { id: 'performance', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#151D33]/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-2">
      <div className="max-w-xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 relative ${
                isActive
                  ? 'text-[#7C3AED] dark:text-purple-400 font-bold scale-105'
                  : 'text-slate-500 dark:text-[#9CA3AF] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#6D28D9] to-[#A855F7] text-white shadow-lg shadow-purple-500/30'
                    : 'bg-transparent text-slate-500 dark:text-[#9CA3AF]'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] tracking-tight mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
