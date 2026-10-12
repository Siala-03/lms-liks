export type Role = 'student' | 'instructor' | 'admin' | 'management';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarInitials: string;
  title: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'text' | 'video' | 'pdf' | 'quiz';
  duration: string;
  completed: boolean;
}

export interface Module {
  id: string;
  title: string;
  published: boolean;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  department: string;
  duration: string;
  lessonsTotal: number;
  lessonsCompleted: number;
  progress: number;
  status: 'in-progress' | 'not-started' | 'completed' | 'archived';
  enrolled: number;
  thumbnailTone: 'blue' | 'slate' | 'teal' | 'amber';
  description: string;
  modules: Module[];
}

export interface AssignmentQuestion {
  id: string;
  prompt: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  courseId: string;
  dueDate: string;
  dueIn: string;
  status: 'submitted' | 'pending' | 'graded' | 'late';
  points: number;
  score?: number;
  feedback?: string;
  brief: string;
  questions?: AssignmentQuestion[];
  attachments?: string[];
}

export interface Quiz {
  id: string;
  title: string;
  course: string;
  questions: number;
  timeLimitMins: number;
  attemptsAllowed: number;
  status: 'available' | 'completed' | 'locked';
  score?: number;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  prompt: string;
  type: 'multiple-choice' | 'short-answer';
  options?: string[];
  correctAnswer?: string;
}

export interface GradeRow {
  id: string;
  assessment: string;
  course: string;
  type: 'Assignment' | 'Quiz' | 'Practical' | 'Peer Review';
  submitted: string;
  score: number | null;
  outOf: number;
  status: 'graded' | 'pending' | 'late';
  feedback: string;
  assignmentId?: string;
  quizId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  cohort: string;
  courses: number;
  attendance: number;
  average: number;
  status: 'active' | 'on-hold' | 'graduated';
}

export interface Application {
  id: string;
  applicant: string;
  email: string;
  phone: string;
  course: string;
  appliedOn: string;
  status: 'pending' | 'approved' | 'rejected';
  education: string;
  experience: string;
  note: string;
}

export interface DiscussionThread {
  id: string;
  title: string;
  course: string;
  author: string;
  authorInitials: string;
  createdAt: string;
  replies: DiscussionReply[];
  pinned: boolean;
}

export interface DiscussionReply {
  id: string;
  author: string;
  authorInitials: string;
  role: string;
  createdAt: string;
  body: string;
}

export interface Certificate {
  id: string;
  course: string;
  issuedOn: string;
  credentialId: string;
  grade: string;
  hours: number;
}

export interface Notification {
  id: string;
  type: 'deadline' | 'grade' | 'announcement' | 'discussion';
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late';
}

export interface RubricCriterion {
  id: string;
  criterion: string;
  description: string;
  max: number;
}

export interface NavItem {
  label: string;
  to: string;
  icon: string;
}