import type { ComponentType } from 'react';
import {
  AwardIcon,
  BarChart3Icon,
  BellIcon,
  BookOpenIcon,
  CalendarCheckIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  FileBarChart2Icon,
  FileTextIcon,
  GaugeCircleIcon,
  GraduationCapIcon,
  HammerIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  MessageSquareIcon,
  SendIcon,
  ShieldCheckIcon,
  TableIcon,
  TrendingUpIcon,
  UserCheckIcon,
  UsersIcon } from
'lucide-react';
import type { Role } from '../../types';

export interface SidebarLink {
  label: string;
  to: string;
  icon: ComponentType<{className?: string;}>;
  end?: boolean;
}

export interface SidebarGroup {
  heading: string;
  links: SidebarLink[];
}

export const NAV: Record<Role, SidebarGroup[]> = {
  student: [
  {
    heading: 'Learning',
    links: [
    { label: 'Dashboard', to: '/student', icon: LayoutDashboardIcon, end: true },
    { label: 'My Courses', to: '/student/courses', icon: BookOpenIcon },
    { label: 'Assignments', to: '/student/assignments', icon: ClipboardListIcon },
    { label: 'Quizzes', to: '/student/quizzes', icon: ClipboardCheckIcon },
    { label: 'Peer Grading', to: '/student/peer-grading', icon: UserCheckIcon }]

  },
  {
    heading: 'My record',
    links: [
    { label: 'Grades', to: '/student/grades', icon: TableIcon },
    { label: 'Progress', to: '/student/progress', icon: GaugeCircleIcon },
    { label: 'Certificates', to: '/student/certificates', icon: AwardIcon }]

  },
  {
    heading: 'Community',
    links: [
    { label: 'Discussions', to: '/student/discussions', icon: MessageSquareIcon },
    { label: 'Notifications', to: '/student/notifications', icon: BellIcon }]

  }],

  instructor: [
  {
    heading: 'Teaching',
    links: [
    { label: 'Dashboard', to: '/instructor', icon: LayoutDashboardIcon, end: true },
    { label: 'My Courses', to: '/instructor/courses', icon: BookOpenIcon },
    { label: 'Course Builder', to: '/instructor/builder', icon: HammerIcon }]

  },
  {
    heading: 'Assessment',
    links: [
    { label: 'Assignments', to: '/instructor/assignments', icon: ClipboardListIcon },
    { label: 'Grade Book', to: '/instructor/gradebook', icon: TableIcon },
    { label: 'Attendance', to: '/instructor/attendance', icon: CalendarCheckIcon },
    { label: 'Surveys', to: '/instructor/surveys', icon: FileBarChart2Icon }]

  },
  {
    heading: 'People',
    links: [{ label: 'Student List', to: '/instructor/students', icon: UsersIcon }]
  }],

  admin: [
  {
    heading: 'Admissions',
    links: [
    { label: 'Dashboard', to: '/admin', icon: LayoutDashboardIcon, end: true },
    { label: 'Applications', to: '/admin/applications', icon: InboxIcon },
    { label: 'Enrollment', to: '/admin/enrollment', icon: GraduationCapIcon }]

  },
  {
    heading: 'Academy',
    links: [
    { label: 'Student Management', to: '/admin/students', icon: UsersIcon },
    { label: 'Course Management', to: '/admin/courses', icon: LibraryIcon }]

  },
  {
    heading: 'Communication',
    links: [
    { label: 'Notifications', to: '/admin/notifications', icon: SendIcon },
    { label: 'Reports', to: '/admin/reports', icon: FileTextIcon }]

  }],

  management: [
  {
    heading: 'Insight',
    links: [
    { label: 'Overview', to: '/management', icon: LayoutDashboardIcon, end: true },
    { label: 'Reports', to: '/management/reports', icon: FileTextIcon }]

  },
  {
    heading: 'Analytics',
    links: [
    { label: 'Course Quality', to: '/management/course-quality', icon: ShieldCheckIcon },
    { label: 'Student Performance', to: '/management/performance', icon: TrendingUpIcon },
    { label: 'Attendance Analytics', to: '/management/attendance', icon: BarChart3Icon }]

  }]

};