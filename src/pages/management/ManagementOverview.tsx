import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, CalendarCheckIcon, GraduationCapIcon, UsersIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { KpiCard } from '../../components/ui/KpiCard';
import { BarChart, LineChart } from '../../components/ui/Charts';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  attendanceByCourse,
  completionByCourse,
  coursePerformance,
  enrollmentTrend } from
'../../data/analytics';

export function ManagementOverview() {
  const weakest = completionByCourse.reduce((min, c) => c.rate < min.rate ? c : min, completionByCourse[0]);

  return (
    <>
      <PageHeader
        title="Academy overview"
        subtitle="September 2026 · all departments"
        actions={
        <Link to="/management/reports">
            <Button variant="secondary">Open reports</Button>
          </Link>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard icon={UsersIcon} value="241" label="Total students" trend={12} trendLabel="vs. August" emphasis />
        <KpiCard icon={BookOpenIcon} value="5" label="Courses running" trend={2} />
        <KpiCard icon={GraduationCapIcon} value="76%" label="Completion rate" trend={3} />
        <KpiCard icon={CalendarCheckIcon} value="88%" label="Attendance rate" trend={-2} />
      </div>

      <div className="mb-6 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Panel>
          <PanelHeader
            title="Enrollment trend"
            subtitle="New enrollments per month · last six months"
            action={<Badge tone="success">+88% since April</Badge>} />
          
          <div className="px-5 py-5">
            <LineChart data={enrollmentTrend} />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Course performance" subtitle="Average student score per course" />
          <div className="px-5 py-5">
            <BarChart data={coursePerformance} />
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Panel className="min-w-0">
          <PanelHeader
            title="Completion by course"
            subtitle="Students who finished against those enrolled"
            action={
            <Link
              to="/management/course-quality"
              className="text-[13px] font-medium text-primary hover:underline">
              
                Full report
              </Link>
            } />
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-secondary">
                  {['Course', 'Enrolled', 'Completed', 'Rate'].map((h, i) =>
                  <th
                    key={h}
                    scope="col"
                    className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted ${
                    i === 0 ? 'text-left' : 'text-right'}`
                    }>

                      {h}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {completionByCourse.map((c) =>
                <tr key={c.code} className="border-b border-line last:border-0">
                    <td className="px-5 py-3">
                      <p className="font-medium text-ink">{c.course}</p>
                      <p className="text-[13px] text-muted">{c.code}</p>
                    </td>
                    <td className="px-5 py-3 text-right tabular-nums">{c.enrolled}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{c.completed}</td>
                    <td className="px-5 py-3 text-right">
                      <Badge tone={c.rate >= 80 ? 'success' : c.rate >= 70 ? 'blue' : 'warning'}>
                        {c.rate}%
                      </Badge>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="text-sm font-semibold text-ink">Needs attention</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
              <span className="font-medium text-ink">{weakest.course}</span> has the lowest completion rate
              at {weakest.rate}%, and nine of its students sit below the 80% attendance threshold.
            </p>
            <Link
              to="/management/attendance"
              className="mt-3 inline-block text-[13px] font-medium text-primary hover:underline">
              
              Review attendance analytics
            </Link>
          </Panel>

          <Panel>
            <PanelHeader title="Attendance by course" subtitle="Average across all sessions" />
            <ul className="divide-y divide-line">
              {attendanceByCourse.map((a) =>
              <li key={a.code} className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <div>
                    <p className="text-[13px] font-medium text-ink">{a.code}</p>
                    <p className="text-xs text-muted">{a.sessions} sessions</p>
                  </div>
                  <Badge tone={a.avgAttendance >= 90 ? 'success' : a.avgAttendance >= 85 ? 'blue' : 'warning'}>
                    {a.avgAttendance}%
                  </Badge>
                </li>
              )}
            </ul>
          </Panel>
        </div>
      </div>
    </>);

}