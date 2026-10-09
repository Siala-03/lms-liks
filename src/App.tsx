import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataStoreProvider } from './data/store';
import { ToastProvider } from './components/ui/Toast';
import { AppLayout } from './components/layout/AppLayout';
import { Login } from './pages/Login';

import { StudentDashboard } from './pages/student/StudentDashboard';
import { CourseCatalog } from './pages/student/CourseCatalog';
import { CourseDetail } from './pages/student/CourseDetail';
import { AssignmentList } from './pages/student/AssignmentList';
import { AssignmentSubmission } from './pages/student/AssignmentSubmission';
import { QuizList } from './pages/student/QuizList';
import { QuizPlayer } from './pages/student/QuizPlayer';
import { PeerGrading } from './pages/student/PeerGrading';
import { MyGrades } from './pages/student/MyGrades';
import { ProgressTracker } from './pages/student/ProgressTracker';
import { Discussions } from './pages/student/Discussions';
import { Certificates } from './pages/student/Certificates';
import { NotificationsPage } from './pages/student/NotificationsPage';

import { InstructorDashboard } from './pages/instructor/InstructorDashboard';
import { InstructorCourses } from './pages/instructor/InstructorCourses';
import { CourseBuilder } from './pages/instructor/CourseBuilder';
import { GradeBook } from './pages/instructor/GradeBook';
import { AssignmentQueue } from './pages/instructor/AssignmentQueue';
import { AssignmentReview } from './pages/instructor/AssignmentReview';
import { Attendance } from './pages/instructor/Attendance';
import { SurveyResults } from './pages/instructor/SurveyResults';
import { StudentList } from './pages/instructor/StudentList';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { Applications } from './pages/admin/Applications';
import { ApplicationDetail } from './pages/admin/ApplicationDetail';
import { EnrollmentManagement } from './pages/admin/EnrollmentManagement';
import { StudentManagement } from './pages/admin/StudentManagement';
import { CourseManagement } from './pages/admin/CourseManagement';
import { NotificationComposer } from './pages/admin/NotificationComposer';

import { ManagementOverview } from './pages/management/ManagementOverview';
import { EnrollmentReport } from './pages/management/EnrollmentReport';
import { AttendanceReport } from './pages/management/AttendanceReport';
import { CompletionReport } from './pages/management/CompletionReport';
import { PerformanceReport } from './pages/management/PerformanceReport';

export function App() {
  return (
    <AuthProvider>
      <DataStoreProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route path="/student" element={<AppLayout role="student" />}>
              <Route index element={<StudentDashboard />} />
              <Route path="courses" element={<CourseCatalog />} />
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route path="assignments" element={<AssignmentList />} />
              <Route path="assignments/:assignmentId" element={<AssignmentSubmission />} />
              <Route path="quizzes" element={<QuizList />} />
              <Route path="quizzes/:quizId" element={<QuizPlayer />} />
              <Route path="peer-grading" element={<PeerGrading />} />
              <Route path="grades" element={<MyGrades />} />
              <Route path="progress" element={<ProgressTracker />} />
              <Route path="discussions" element={<Discussions />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="notifications" element={<NotificationsPage />} />
            </Route>

            <Route path="/instructor" element={<AppLayout role="instructor" />}>
              <Route index element={<InstructorDashboard />} />
              <Route path="courses" element={<InstructorCourses />} />
              <Route path="builder" element={<CourseBuilder />} />
              <Route path="assignments" element={<AssignmentQueue />} />
              <Route path="assignments/:submissionId" element={<AssignmentReview />} />
              <Route path="gradebook" element={<GradeBook />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="surveys" element={<SurveyResults />} />
              <Route path="students" element={<StudentList />} />
            </Route>

            <Route path="/admin" element={<AppLayout role="admin" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="applications" element={<Applications />} />
              <Route path="applications/:applicationId" element={<ApplicationDetail />} />
              <Route path="enrollment" element={<EnrollmentManagement />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="notifications" element={<NotificationComposer />} />
              <Route path="reports" element={<EnrollmentReport />} />
            </Route>

            <Route path="/management" element={<AppLayout role="management" />}>
              <Route index element={<ManagementOverview />} />
              <Route path="reports" element={<EnrollmentReport />} />
              <Route path="course-quality" element={<CompletionReport />} />
              <Route path="performance" element={<PerformanceReport />} />
              <Route path="attendance" element={<AttendanceReport />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
      </DataStoreProvider>
    </AuthProvider>);

}