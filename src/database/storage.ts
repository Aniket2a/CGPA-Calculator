import { SemesterResult, StudentProfile } from '../types';
import { ALL_SEMESTER_TEMPLATES } from '../data/curriculum';
import { calculateSemesterGPA } from '../utils/gradeCalculator';

const SEMESTERS_STORAGE_KEY = 'cgpa_calculator_semesters_v1';
const PROFILE_STORAGE_KEY = 'cgpa_calculator_profile_v1';
const THEME_STORAGE_KEY = 'cgpa_calculator_theme_v1';

export const DEFAULT_PROFILE: StudentProfile = {
  studentName: 'B.Tech Student',
  rollNumber: '21BTECH001',
  branch: 'Computer Science & Engineering',
  college: 'Institute of Technology',
};

// Initial sample data for Semester 3 pre-filled with high marks so user sees real results
export function getInitialSampleData(): SemesterResult[] {
  const sem3Subjects = ALL_SEMESTER_TEMPLATES[3].map((s) => {
    let obtained = 0;
    if (s.name.includes('Data Structures')) obtained = 138;
    else if (s.name.includes('Digital Logic')) obtained = 132;
    else if (s.name.includes('Discrete')) obtained = 88;
    else if (s.name.includes('Multi-Disciplinary')) obtained = 85;
    else if (s.name.includes('Open Elective')) obtained = 135;
    else if (s.name.includes('EEM')) obtained = 44;
    else if (s.name.includes('Value Education')) obtained = 45;
    else if (s.name.includes('Community Engagement')) obtained = 46;
    return { ...s, obtainedMarks: obtained };
  });

  const sem3Calc = calculateSemesterGPA(sem3Subjects);

  return [
    {
      semesterNumber: 3,
      semesterName: 'Semester III',
      subjects: sem3Subjects,
      gpa: sem3Calc.gpa,
      totalCredits: sem3Calc.totalCredits,
      weightedPoints: sem3Calc.weightedPoints,
      grade: sem3Calc.grade,
      percentage: sem3Calc.percentage,
      savedAt: new Date().toISOString(),
    },
  ];
}

export function loadStoredSemesters(): SemesterResult[] {
  try {
    const raw = localStorage.getItem(SEMESTERS_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialSampleData();
      saveStoredSemesters(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load semesters from storage', err);
    return [];
  }
}

export function saveStoredSemesters(semesters: SemesterResult[]): void {
  try {
    localStorage.setItem(SEMESTERS_STORAGE_KEY, JSON.stringify(semesters));
  } catch (err) {
    console.error('Failed to save semesters to storage', err);
  }
}

export function loadStoredProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: StudentProfile): void {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save profile', err);
  }
}

export function loadStoredTheme(): 'light' | 'dark' {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === 'light' || raw === 'dark') return raw;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (err) {
    return 'dark';
  }
}

export function saveStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.error('Failed to save theme', err);
  }
}

export function clearAllData(): void {
  localStorage.removeItem(SEMESTERS_STORAGE_KEY);
  localStorage.removeItem(PROFILE_STORAGE_KEY);
}
