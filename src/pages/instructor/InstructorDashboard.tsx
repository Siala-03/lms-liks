import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircleIcon,
  CalendarCheckIcon,
  ClipboardListIcon,
  UsersIcon } from
'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { KpiCard } from '../../components/ui/KpiCard';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { BarChart } from '../../components/ui/Charts';
import { gradingQueue } from '../../data/academics';
import { courses } from '../../data/courses';
import { gradeBookStudents } from '../../data/analytics';
import { useAuth } from '../../contexts/AuthContext';

export function InstructorDashboard() {
  const { user } = useAuth();
  const myCourses = courses.filter((c) => c.instructor === user?.name || c.code === 'CUL-101');
  const atRisk = gradeBookStudents.filter((s) => {
    const values = Object.values(s.scores).filter((v): v is number => v !== null);
    return values.reduce((a, b) => a + b, 0) / values.length < 70;
  });

  const cohortDistribution = [
  { label: '90–100', value: 2 },
  { label: '80–89', value: 4 },
  { label: '70–79', value: 2 },
  { label: '60–69', value: 1 },
  { label: '< 60', value: 1 }];


  return (
    <>
      <PageHeader
        title="Teaching overview"
        subtitle={`${gradingQueue.length} submissions are waiting on you — two are already overdue for return.`}
        actions={
        <Link to="/instructor/assignments">
            <Button icon={ClipboardListIcon}>Start grading</Button>
          </Link>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={ClipboardListIcon}
          value={String(gradingQueue.length)}
          label="Submissions to grade"
          emphasis />
        
        <KpiCard icon={UsersIcon} value="110" label="Students taught this term" trend={4} />
        <KpiCard icon={CalendarCheckIcon} value="92%" label="Average attendance" trend={2} />
        <KpiCard icon={AlertCircleIcon} value={String(atRisk.length)} label="Students at risk" trend={-1} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Panel>
            <PanelHeader
              title="Grading queue"
              subtitle="Oldest submissions first — return within five working days"
              action={
              <Link
                to="/instructor/assignments"
                className="text-[13px] font-medium text-primary hover:underline">
                
                  View all
                </Link>
              } />
            
            <ul className="divide-y divide-line">
              {gradingQueue.slice(0, 5).map((g) =>
              <li key={g.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink">{g.student}</p>
                    <p className="mt-0.5 text-[13px] text-muted">
                      {g.assignment} · {g.course}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {g.late ? <Badge tone="error">Late</Badge> : null}
                    <span className="text-[13px] text-muted">{g.submitted}</span>
                    <Link to={`/instructor/assignments/${g.id}`}>
                      <Button size="sm" variant="secondary">
                        Review
                      </Button>
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title="Active courses" subtitle="Cohort progress against the syllabus" />
            <ul className="divide-y divide-line">
              {myCourses.map((c) =>
              <li key={c.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-ink">{c.title}</p>
                      <p className="mt-0.5 text-[13px] text-muted">
                        {c.code} · {c.enrolled} students
                      </p>
                    </div>
                    <p className="text-[13px] text-muted">{c.duration}</p>
                  </div>
                  <ProgressBar className="mt-3" value={c.progress} size="sm" showValue label="Syllabus delivered" />
                </li>
              )}
            </ul>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-sm font-semibold text-ink">Cohort grade spread</h2>
            <p className="mt-0.5 text-[13px] text-muted">CUL-101 · 10 students</p>
            <div className="mt-5">
              <BarChart data={cohortDistribution} unit="" max={5} />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Students needing attention" subtitle="Below 70% average" />
            <ul className="divide-y divide-line">
              {atRisk.map((s) => {
                const values = Object.values(s.scores).filter((v): v is number => v !== null);
                const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
                return (
                  <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <div>
                      <p className="text-[13px] font-medium text-ink">{s.name}</p>
                      <p className="text-xs text-muted">Average {avg}%</p>
                    </div>
                    <Badge tone={avg < 60 ? 'error' : 'warning'}>{avg < 60 ? 'At risk' : 'Watch'}</Badge>
                  </li>);

              })}
            </ul>
            <div className="border-t border-line px-5 py-3">
              <Link
                to="/instructor/students"
                className="text-[13px] font-medium text-primary hover:underline">
                
                Open student list
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </>);

}