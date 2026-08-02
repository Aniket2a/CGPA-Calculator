import React, { createContext, useContext, useState, useEffect } from 'react';
import { SemesterResult, StudentProfile, ScreenTab, Subject } from '../types';
import {
  loadStoredSemesters,
  saveStoredSemesters,
  loadStoredProfile,
  saveStoredProfile,
  loadStoredTheme,
  saveStoredTheme,
  clearAllData,
} from '../database/storage';
import { ALL_SEMESTER_TEMPLATES } from '../data/curriculum';
import { calculateSemesterGPA, calculateSubjectGrade } from '../utils/gradeCalculator';

interface CGPAContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentTab: ScreenTab;
  setCurrentTab: (tab: ScreenTab) => void;
  selectedSemesterNum: number;
  setSelectedSemesterNum: (num: number) => void;
  draftSubjects: Subject[];
  setDraftSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  updateDraftSubjectMarks: (id: string, marks: number | null) => void;
  updateDraftSubjectMeta: (id: string, name: string, credits: number, maxMarks: number) => void;
  addCustomSubjectToDraft: () => void;
  removeSubjectFromDraft: (id: string) => void;
  semesters: SemesterResult[];
  saveCurrentSemester: () => void;
  deleteSemester: (semNum: number) => void;
  resetSemesterMarks: () => void;
  resetAllAppData: () => void;
  profile: StudentProfile;
  updateProfile: (prof: StudentProfile) => void;
  deviceFrame: boolean;
  setDeviceFrame: (val: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CGPAContext = createContext<CGPAContextType | undefined>(undefined);

export const CGPAPROVIDER_NAME = 'CGPAProvider';

export const CGPAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => loadStoredTheme());
  const [currentTab, setCurrentTab] = useState<ScreenTab>('home');
  const [selectedSemesterNum, setSelectedSemesterNum] = useState<number>(3);
  const [semesters, setSemesters] = useState<SemesterResult[]>(() => loadStoredSemesters());
  const [profile, setProfile] = useState<StudentProfile>(() => loadStoredProfile());
  const [deviceFrame, setDeviceFrame] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize draft subjects for selected semester from saved semesters or default template
  const [draftSubjects, setDraftSubjects] = useState<Subject[]>(() => {
    const existing = loadStoredSemesters().find((s) => s.semesterNumber === 3);
    if (existing && existing.subjects && existing.subjects.length > 0) {
      return existing.subjects;
    }
    return ALL_SEMESTER_TEMPLATES[3] || [];
  });

  // Keep dark/light theme class synchronized on html document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveStoredTheme(theme);
  }, [theme]);

  // When selected semester changes, update draft subjects
  useEffect(() => {
    const existing = semesters.find((s) => s.semesterNumber === selectedSemesterNum);
    if (existing && existing.subjects && existing.subjects.length > 0) {
      setDraftSubjects(existing.subjects);
    } else {
      const template = ALL_SEMESTER_TEMPLATES[selectedSemesterNum] || [
        {
          id: `sem${selectedSemesterNum}_sub1`,
          name: 'Subject 1',
          credits: 3,
          maxMarks: 100,
          obtainedMarks: null,
        },
      ];
      setDraftSubjects(template.map((s) => ({ ...s })));
    }
  }, [selectedSemesterNum, semesters]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateDraftSubjectMarks = (id: string, marks: number | null) => {
    setDraftSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const validMarks = marks !== null ? Math.min(sub.maxMarks, Math.max(0, marks)) : null;
          let grade: string | undefined = undefined;
          let gradePoint: number | undefined = undefined;
          let percentage: number | undefined = undefined;

          if (validMarks !== null) {
            const res = calculateSubjectGrade(validMarks, sub.maxMarks);
            grade = res.grade;
            gradePoint = res.gradePoint;
            percentage = res.percentage;
          }

          return {
            ...sub,
            obtainedMarks: validMarks,
            grade,
            gradePoint,
            percentage,
          };
        }
        return sub;
      })
    );
  };

  const updateDraftSubjectMeta = (id: string, name: string, credits: number, maxMarks: number) => {
    setDraftSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id === id) {
          const updatedSub = { ...sub, name, credits, maxMarks };
          if (updatedSub.obtainedMarks !== null) {
            const res = calculateSubjectGrade(updatedSub.obtainedMarks, maxMarks);
            updatedSub.grade = res.grade;
            updatedSub.gradePoint = res.gradePoint;
            updatedSub.percentage = res.percentage;
          }
          return updatedSub;
        }
        return sub;
      })
    );
  };

  const addCustomSubjectToDraft = () => {
    const newId = `custom_${Date.now()}`;
    const newSub: Subject = {
      id: newId,
      name: `Elective / Subject ${draftSubjects.length + 1}`,
      credits: 3,
      maxMarks: 100,
      obtainedMarks: null,
    };
    setDraftSubjects((prev) => [...prev, newSub]);
    showToast('New subject added');
  };

  const removeSubjectFromDraft = (id: string) => {
    if (draftSubjects.length <= 1) {
      showToast('Semester must have at least one subject');
      return;
    }
    setDraftSubjects((prev) => prev.filter((s) => s.id !== id));
    showToast('Subject removed');
  };

  const saveCurrentSemester = () => {
    const calc = calculateSemesterGPA(draftSubjects);
    const semResult: SemesterResult = {
      semesterNumber: selectedSemesterNum,
      semesterName: `Semester ${getRomanNumeral(selectedSemesterNum)}`,
      subjects: draftSubjects,
      gpa: calc.gpa,
      totalCredits: calc.totalCredits,
      weightedPoints: calc.weightedPoints,
      grade: calc.grade,
      percentage: calc.percentage,
      savedAt: new Date().toISOString(),
    };

    setSemesters((prev) => {
      const filtered = prev.filter((s) => s.semesterNumber !== selectedSemesterNum);
      const updated = [...filtered, semResult].sort((a, b) => a.semesterNumber - b.semesterNumber);
      saveStoredSemesters(updated);
      return updated;
    });

    showToast(`Saved Result for Semester ${selectedSemesterNum} (GPA: ${calc.gpa})`);
  };

  const deleteSemester = (semNum: number) => {
    setSemesters((prev) => {
      const updated = prev.filter((s) => s.semesterNumber !== semNum);
      saveStoredSemesters(updated);
      return updated;
    });
    showToast(`Deleted Semester ${semNum} record`);
  };

  const resetSemesterMarks = () => {
    setDraftSubjects((prev) =>
      prev.map((sub) => ({
        ...sub,
        obtainedMarks: null,
        grade: undefined,
        gradePoint: undefined,
        percentage: undefined,
      }))
    );
    showToast('Cleared marks for current semester');
  };

  const resetAllAppData = () => {
    clearAllData();
    setSemesters([]);
    const defaultSem3 = ALL_SEMESTER_TEMPLATES[3];
    setSelectedSemesterNum(3);
    setDraftSubjects(defaultSem3);
    showToast('All saved data has been reset');
  };

  const updateProfile = (prof: StudentProfile) => {
    setProfile(prof);
    saveStoredProfile(prof);
    showToast('Profile updated');
  };

  return (
    <CGPAContext.Provider
      value={{
        theme,
        toggleTheme,
        currentTab,
        setCurrentTab,
        selectedSemesterNum,
        setSelectedSemesterNum,
        draftSubjects,
        setDraftSubjects,
        updateDraftSubjectMarks,
        updateDraftSubjectMeta,
        addCustomSubjectToDraft,
        removeSubjectFromDraft,
        semesters,
        saveCurrentSemester,
        deleteSemester,
        resetSemesterMarks,
        resetAllAppData,
        profile,
        updateProfile,
        deviceFrame,
        setDeviceFrame,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CGPAContext.Provider>
  );
};

export const useCGPA = () => {
  const context = useContext(CGPAContext);
  if (!context) {
    throw new Error('useCGPA must be used within CGPAProvider');
  }
  return context;
};

function getRomanNumeral(num: number): string {
  const romans: Record<number, string> = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
    5: 'V',
    6: 'VI',
    7: 'VII',
    8: 'VIII',
  };
  return romans[num] || String(num);
}
