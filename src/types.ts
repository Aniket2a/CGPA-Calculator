export interface Subject {
  id: string;
  name: string;
  credits: number;
  maxMarks: number;
  obtainedMarks: number | null;
  grade?: string;
  gradePoint?: number;
  percentage?: number;
}

export interface SemesterResult {
  semesterNumber: number;
  semesterName: string;
  subjects: Subject[];
  gpa: number;
  totalCredits: number;
  weightedPoints: number;
  grade: string;
  percentage: number;
  savedAt: string;
}

export interface StudentProfile {
  studentName: string;
  rollNumber: string;
  branch: string;
  college: string;
}

export type ScreenTab =
  | 'home'
  | 'semester_gpa'
  | 'cgpa'
  | 'percentage'
  | 'performance'
  | 'settings';

export interface GradingScaleItem {
  minPercentage: number;
  maxPercentage: number;
  grade: string;
  gradePoint: number;
  description: string;
  color: string;
}
