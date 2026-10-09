import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, InboxIcon, SendIcon, UserPlusIcon, UsersIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { KpiCard } from '../../components/ui/KpiCard';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { applications, recentEnrollments, students } from '../../data/people';
import { courses } from '../../data/courses';

export function AdminDashboard() {
  const pending = applications.filter((a) => a.status === 'pending');
  const running = courses.filter((c) => c.status !== 'archived');

  return (
    <>
      <PageHeader
        title="Admissions & operations"
        subtitle={`${pending.length} applications are waiting on a decision. Two have been open more than five days.`}
        actions={
        <>
            <Link to="/admin/notifications">
              <Button variant="secondary" icon={SendIcon}>
                Send notice
              </Button>
            </Link>
            <Link to="/admin/applications">
              <Button icon={InboxIcon}>Review applications</Button>
            </Link>
          </>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={InboxIcon}
          value={String(pending.length)}
          label="Pending applications"
          emphasis
          trendLabel="Target: decision within 3 days" />
        
        <KpiCard icon={UsersIcon} value="241" label="Students enrolled" trend={12} />
        <KpiCard icon={BookOpenIcon} value={String(running.length)} label="Active courses" trend={2} />
        <KpiCard icon={UserPlusIcon} value="18" label="Enrollments this week" trend={7} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Panel>
            <PanelHeader
              title="Applications needing a decision"
              subtitle="Oldest first"
              action={
              <Link to="/admin/applications" className="text-[13px] font-medium text-primary hover:underline">
                  View all
                </Link>
              } />
            
            <ul className="divide-y divide-line">
              {pending.map((a) =>
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <Link
                    to={`/admin/applications/${a.id}`}
                    className="text-sm font-medium text-ink transition-colors duration-150 ease-smooth hover:text-primary">
                    
                      {a.applicant}
                    </Link>
                    <p className="mt-0.5 text-[13px] text-muted">{a.course}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-muted">{a.appliedOn}</span>
                    <Link to={`/admin/applications/${a.id}`}>
                      <Button size="sm" variant="secondary">
                        Open
                      </Button>
                    </Link>
                  </div>
                </li>
              )}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title="Recent enrollments" subtitle="Last five confirmed placements" />
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-secondary">
                  {['Student', 'Course', 'Cohort', 'Date'].map((h) =>
                  <th
                    key={h}
                    scope="col"
                    className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                    
                      {h}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {recentEnrollments.map((e) =>
                <tr key={e.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-medium text-ink">{e.student}</td>
                    <td className="px-5 py-3 text-[13px] text-muted">{e.course}</td>
                    <td className="px-5 py-3 text-[13px]">{e.cohort}</td>
                    <td className="px-5 py-3 text-[13px] text-muted">{e.date}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Applications by status" />
            <ul className="divide-y divide-line">
              {(['pending', 'approved', 'rejected'] as const).map((s) =>
              <li key={s} className="flex items-center justify-between px-5 py-3.5">
                  <Badge tone={statusTone(s)}>{s}</Badge>
                  <span className="text-sm font-semibold text-ink">
                    {applications.filter((a) => a.status === s).length}
                  </span>
                </li>
              )}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title="Students on hold" subtitle="Attendance or payment flags" />
            <ul className="divide-y divide-line">
              {students.
              filter((s) => s.status === 'on-hold').
              map((s) =>
              <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <div>
                      <p className="text-[13px] font-medium text-ink">{s.name}</p>
                      <p className="text-xs text-muted">
                        Attendance {s.attendance}% · Average {s.average}%
                      </p>
                    </div>
                    <Badge tone="warning">On hold</Badge>
                  </li>
              )}
            </ul>
            <div className="border-t border-line px-5 py-3">
              <Link to="/admin/students" className="text-[13px] font-medium text-primary hover:underline">
                Manage students
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </>);

}