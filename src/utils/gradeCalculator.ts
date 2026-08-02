import { Subject, SemesterResult, GradingScaleItem } from '../types';

export const GRADING_SCALE: GradingScaleItem[] = [
  { minPercentage: 90, maxPercentage: 100, grade: 'O', gradePoint: 10, description: 'Outstanding', color: '#10B981' },
  { minPercentage: 80, maxPercentage: 89.99, grade: 'A+', gradePoint: 9, description: 'Excellent', color: '#0EA5E9' },
  { minPercentage: 70, maxPercentage: 79.99, grade: 'A', gradePoint: 8, description: 'Very Good', color: '#6366F1' },
  { minPercentage: 60, maxPercentage: 69.99, grade: 'B+', gradePoint: 7, description: 'Good', color: '#8B5CF6' },
  { minPercentage: 50, maxPercentage: 59.99, grade: 'B', gradePoint: 6, description: 'Above Average', color: '#F59E0B' },
  { minPercentage: 45, maxPercentage: 49.99, grade: 'C', gradePoint: 5, description: 'Average', color: '#EAB308' },
  { minPercentage: 40, maxPercentage: 44.99, grade: 'P', gradePoint: 4, description: 'Pass', color: '#14B8A6' },
  { minPercentage: 0, maxPercentage: 39.99, grade: 'F', gradePoint: 0, description: 'Fail', color: '#EF4444' },
];

export function calculateSubjectGrade(obtainedMarks: number, maxMarks: number): {
  percentage: number;
  grade: string;
  gradePoint: number;
} {
  if (maxMarks <= 0) return { percentage: 0, grade: 'F', gradePoint: 0 };
  const percentage = Math.min(100, Math.max(0, (obtainedMarks / maxMarks) * 100));

  let grade = 'F';
  let gradePoint = 0;

  if (percentage >= 90) {
    grade = 'O';
    gradePoint = 10;
  } else if (percentage >= 80) {
    grade = 'A+';
    gradePoint = 9;
  } else if (percentage >= 70) {
    grade = 'A';
    gradePoint = 8;
  } else if (percentage >= 60) {
    grade = 'B+';
    gradePoint = 7;
  } else if (percentage >= 50) {
    grade = 'B';
    gradePoint = 6;
  } else if (percentage >= 45) {
    grade = 'C';
    gradePoint = 5;
  } else if (percentage >= 40) {
    grade = 'P';
    gradePoint = 4;
  } else {
    grade = 'F';
    gradePoint = 0;
  }

  return { percentage, grade, gradePoint };
}

export function calculateSemesterGPA(subjects: Subject[]): {
  gpa: number;
  totalCredits: number;
  weightedPoints: number;
  grade: string;
  percentage: number;
} {
  let totalCredits = 0;
  let weightedPoints = 0;

  subjects.forEach((sub) => {
    if (sub.obtainedMarks !== null && !isNaN(sub.obtainedMarks)) {
      const { gradePoint } = calculateSubjectGrade(sub.obtainedMarks, sub.maxMarks);
      totalCredits += sub.credits;
      weightedPoints += sub.credits * gradePoint;
    }
  });

  const gpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;
  const percentage = calculatePercentageFromCGPA(gpa);

  let overallGrade = 'F';
  if (gpa >= 9.0) overallGrade = 'O';
  else if (gpa >= 8.0) overallGrade = 'A+';
  else if (gpa >= 7.0) overallGrade = 'A';
  else if (gpa >= 6.0) overallGrade = 'B+';
  else if (gpa >= 5.0) overallGrade = 'B';
  else if (gpa >= 4.5) overallGrade = 'C';
  else if (gpa >= 4.0) overallGrade = 'P';

  return {
    gpa: Number(gpa.toFixed(2)),
    totalCredits,
    weightedPoints: Number(weightedPoints.toFixed(2)),
    grade: overallGrade,
    percentage: Number(percentage.toFixed(2)),
  };
}

export function calculateCGPA(semesters: SemesterResult[]): number {
  if (!semesters || semesters.length === 0) return 0;
  const validSems = semesters.filter((s) => s.gpa > 0);
  if (validSems.length === 0) return 0;
  const sumGPA = validSems.reduce((acc, curr) => acc + curr.gpa, 0);
  return Number((sumGPA / validSems.length).toFixed(2));
}

export function calculatePercentageFromCGPA(cgpa: number): number {
  if (cgpa <= 0) return 0;
  const pct = (cgpa - 0.75) * 10;
  return Number(Math.max(0, pct).toFixed(2));
}
