import React, { createContext, useContext, useMemo } from 'react';
import { usePersistentState } from '../utils/usePersistentState';
import { courses as initialCourses } from './courses';
import { students as initialStudents, applications as initialApplications } from './people';
import {
  assignments as initialAssignments,
  attendanceRoster as initialAttendanceRoster,
  discussions as initialDiscussions,
  grades as initialGrades,
  notifications as initialNotifications,
  quizzes as initialQuizzes } from
'./academics';
import { gradeBookStudents } from './analytics';
import type {
  Application,
  Assignment,
  AttendanceRecord,
  Course,
  DiscussionThread,
  GradeRow,
  Notification,
  Quiz,
  Student } from
'../types';

type GradeBookScores = Record<string, Record<string, number | null>>;

const initialGradeBookScores: GradeBookScores = gradeBookStudents.reduce<GradeBookScores>((acc, s) => {
  acc[s.id] = { ...s.scores };
  return acc;
}, {});

export interface PeerReviewRecord {
  score: number;
  maxScore: number;
  comment: string;
  submittedAt: string;
}

interface DataStoreValue {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  grades: GradeRow[];
  setGrades: React.Dispatch<React.SetStateAction<GradeRow[]>>;
  peerReview: PeerReviewRecord | null;
  setPeerReview: React.Dispatch<React.SetStateAction<PeerReviewRecord | null>>;
  gradeBookScores: GradeBookScores;
  setGradeBookScores: React.Dispatch<React.SetStateAction<GradeBookScores>>;
  attendanceRoster: AttendanceRecord[];
  setAttendanceRoster: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  discussions: DiscussionThread[];
  setDiscussions: React.Dispatch<React.SetStateAction<DiscussionThread[]>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

const DataStoreContext = createContext<DataStoreValue | undefined>(undefined);

export function DataStoreProvider({ children }: {children: React.ReactNode;}) {
  const [courses, setCourses] = usePersistentState('courses', initialCourses);
  const [students, setStudents] = usePersistentState('students', initialStudents);
  const [applications, setApplications] = usePersistentState('applications', initialApplications);
  const [assignments, setAssignments] = usePersistentState('assignments', initialAssignments);
  const [quizzes, setQuizzes] = usePersistentState('quizzes', initialQuizzes);
  const [grades, setGrades] = usePersistentState('grades', initialGrades);
  const [peerReview, setPeerReview] = usePersistentState<PeerReviewRecord | null>('peer-review', null);
  const [gradeBookScores, setGradeBookScores] = usePersistentState('gradebook-scores', initialGradeBookScores);
  const [attendanceRoster, setAttendanceRoster] = usePersistentState(
    'attendance-roster',
    initialAttendanceRoster
  );
  const [discussions, setDiscussions] = usePersistentState('discussions', initialDiscussions);
  const [notifications, setNotifications] = usePersistentState('notifications', initialNotifications);

  const value = useMemo<DataStoreValue>(
    () => ({
      courses,
      setCourses,
      students,
      setStudents,
      applications,
      setApplications,
      assignments,
      setAssignments,
      quizzes,
      setQuizzes,
      grades,
      setGrades,
      peerReview,
      setPeerReview,
      gradeBookScores,
      setGradeBookScores,
      attendanceRoster,
      setAttendanceRoster,
      discussions,
      setDiscussions,
      notifications,
      setNotifications
    }),
    [
    courses,
    students,
    applications,
    assignments,
    quizzes,
    grades,
    peerReview,
    gradeBookScores,
    attendanceRoster,
    discussions,
    notifications]


  );

  return <DataStoreContext.Provider value={value}>{children}</DataStoreContext.Provider>;
}

export function useDataStore(): DataStoreValue {
  const ctx = useContext(DataStoreContext);
  if (!ctx) throw new Error('useDataStore must be used within DataStoreProvider');
  return ctx;
}
