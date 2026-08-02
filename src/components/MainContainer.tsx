import React from 'react';
import { useCGPA } from '../context/CGPAContext';
import { Header, NavigationBar } from '../components/Navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { SemesterGPAScreen } from '../screens/SemesterGPAScreen';
import { CGPAScreen } from '../screens/CGPAScreen';
import { PercentageScreen } from '../screens/PercentageScreen';
import { PerformanceScreen } from '../screens/PerformanceScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { CheckCircle2, WifiOff } from 'lucide-react';

export const MainContainer: React.FC = () => {
  const { currentTab, deviceFrame, toastMessage } = useCGPA();

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />;
      case 'semester_gpa':
        return <SemesterGPAScreen />;
      case 'cgpa':
        return <CGPAScreen />;
      case 'percentage':
        return <PercentageScreen />;
      case 'performance':
        return <PerformanceScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const appContent = (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 relative flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 pt-4 pb-20">
        {renderActiveScreen()}
      </main>

      <NavigationBar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-2xl flex items-center gap-2 border border-slate-700/50 dark:border-slate-300/50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );

  if (deviceFrame) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-2 sm:p-6">
        {/* Android Phone Frame Mockup */}
        <div className="w-full max-w-[420px] h-[840px] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800 relative flex flex-col overflow-hidden border-4 border-slate-800">
          {/* Top Speaker / Camera Punch Hole */}
          <div className="w-28 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-800" />
          </div>

          <div className="flex-1 bg-slate-50 dark:bg-slate-950 rounded-[36px] overflow-y-auto relative flex flex-col scrollbar-thin">
            {appContent}
          </div>
        </div>
      </div>
    );
  }

  return appContent;
};
