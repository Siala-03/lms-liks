import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  BellIcon,
  CalendarClockIcon,
  CheckCircle2Icon,
  MessageSquareIcon } from
'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { courses } from '../../data/courses';
import { assignments, grades, notifications } from '../../data/academics';
import { useAuth } from '../../contexts/AuthContext';

export function StudentDashboard() {
  const { user } = useAuth();
  const active = courses.filter((c) => c.status === 'in-progress' || c.status === 'completed');
  const upcoming = assignments.filter((a) => a.status === 'pending' || a.status === 'late');
  const recentGrades = grades.filter((g) => g.status === 'graded').slice(0, 4);
  const unread = notifications.filter((n) => n.unread);

  const overall = Math.round(active.reduce((s, c) => s + c.progress, 0) / active.length);

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user?.name.split(' ')[0]}`}
        subtitle="You have two submissions due this week. Your timed practical is the one that counts most."
        actions={
        <Button variant="secondary" icon={CalendarClockIcon} size="md">
            September schedule
          </Button>
        } />
      

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line px-6 py-5">
              <div>
                <p className="text-[13px] text-muted">Term progress across active courses</p>
                <p className="mt-1 text-4xl font-semibold tracking-[-0.02em] text-ink">{overall}%</p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-semibold text-ink">{active.length}</p>
                  <p className="text-[13px] text-muted">Active courses</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-ink">
                    {active.reduce((s, c) => s + c.lessonsCompleted, 0)}
                  </p>
                  <p className="text-[13px] text-muted">Lessons completed</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-ink">94%</p>
                  <p className="text-[13px] text-muted">Attendance</p>
                </div>
              </div>
            </div>

            <ul className="divide-y divide-line">
              {active.map((course) =>
              <li key={course.id} className="px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                      to={`/student/courses/${course.id}`}
                      className="text-sm font-semibold text-ink transition-colors duration-150 ease-smooth hover:text-primary">
                      
                        {course.title}
                      </Link>
                      <p className="mt-0.5 text-[13px] text-muted">
                        {course.code} · {course.instructor}
                      </p>
                    </div>
                    <Badge tone={statusTone(course.status)}>
                      {course.status === 'completed' ? 'Completed' : 'In progress'}
                    </Badge>
                  </div>
                  <ProgressBar
                  className="mt-3"
                  value={course.progress}
                  size="sm"
                  label={`${course.lessonsCompleted} of ${course.lessonsTotal} lessons`}
                  showValue />
                
                </li>
              )}
            </ul>
            <div className="border-t border-line px-6 py-3">
              <Link
                to="/student/courses"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline">
                
                Browse the full catalog
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Recent grades"
              subtitle="Last four assessments returned to you"
              action={
              <Link to="/student/grades" className="text-[13px] font-medium text-primary hover:underline">
                  All grades
                </Link>
              } />
            
            <ul className="divide-y divide-line">
              {recentGrades.map((g) =>
              <li key={g.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{g.assessment}</p>
                    <p className="text-[13px] text-muted">
                      {g.course} · {g.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-ink">
                      {g.score}
                      <span className="text-muted">/{g.outOf}</span>
                    </span>
                    <CheckCircle2Icon className="h-4 w-4 text-success" />
                  </div>
                </li>
              )}
            </ul>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Upcoming deadlines" subtitle={`${upcoming.length} open submissions`} />
            <ul className="divide-y divide-line">
              {upcoming.map((a) =>
              <li key={a.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13px] font-semibold leading-snug text-ink">{a.title}</p>
                    <Badge tone={a.status === 'late' ? 'error' : 'warning'}>
                      {a.status === 'late' ? 'Overdue' : a.dueIn}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted">{a.course}</p>
                  <p className="mt-2 text-xs text-muted">Due {a.dueDate}</p>
                  <Link
                  to={`/student/assignments/${a.id}`}
                  className="mt-2.5 inline-block text-[13px] font-medium text-primary hover:underline">
                  
                    Open submission
                  </Link>
                </li>
              )}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader
              title="Notifications"
              subtitle={`${unread.length} unread`}
              action={
              <Link
                to="/student/notifications"
                aria-label="Open notifications"
                className="text-muted transition-colors duration-150 ease-smooth hover:text-primary">
                
                  <BellIcon className="h-4 w-4" />
                </Link>
              } />
            
            <ul className="divide-y divide-line">
              {unread.map((n) =>
              <li key={n.id} className="flex gap-3 px-5 py-3.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="text-[13px] font-medium leading-snug text-ink">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{n.timestamp}</p>
                  </div>
                </li>
              )}
            </ul>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <MessageSquareIcon className="h-[18px] w-[18px] text-primary" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-ink">Peer review waiting</h2>
                <p className="mt-1 text-[13px] text-muted">
                  One anonymous submission is assigned to you. Reviews close Friday.
                </p>
                <Link
                  to="/student/peer-grading"
                  className="mt-3 inline-block text-[13px] font-medium text-primary hover:underline">
                  
                  Start reviewing
                </Link>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>);

}