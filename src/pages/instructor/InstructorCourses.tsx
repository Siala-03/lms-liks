import React from 'react';
import { Link } from 'react-router-dom';
import { HammerIcon, PlusIcon, UsersIcon } from 'lucide-react';
import { PageHeader, Panel } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Badge, statusTone } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { courses } from '../../data/courses';

export function InstructorCourses() {
  const teaching = courses.filter((c) => c.status !== 'archived').slice(0, 4);

  return (
    <>
      <PageHeader
        title="My courses"
        subtitle="Courses you deliver this term, with enrollment and delivery progress."
        actions={
        <Link to="/instructor/builder">
            <Button icon={PlusIcon}>New course</Button>
          </Link>
        } />
      

      <div className="space-y-4">
        {teaching.map((c) =>
        <Panel key={c.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0 max-w-2xl">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {c.code}
                  </span>
                  <Badge tone={statusTone(c.status)}>
                    {c.status === 'completed' ? 'Completed' : c.status === 'not-started' ? 'Draft' : 'Running'}
                  </Badge>
                </div>
                <h2 className="mt-1.5 text-base font-semibold text-ink">{c.title}</h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <UsersIcon className="h-3.5 w-3.5" />
                    {c.enrolled} enrolled
                  </span>
                  <span>{c.modules.length} modules</span>
                  <span>{c.lessonsTotal} lessons</span>
                  <span>{c.duration}</span>
                </div>
              </div>

              <div className="w-full max-w-[260px] shrink-0">
                <ProgressBar value={c.progress} label="Syllabus delivered" showValue />
                <div className="mt-4 flex gap-2">
                  <Link to="/instructor/builder" className="flex-1">
                    <Button size="sm" variant="secondary" icon={HammerIcon} className="w-full">
                      Edit content
                    </Button>
                  </Link>
                  <Link to="/instructor/gradebook" className="flex-1">
                    <Button size="sm" className="w-full">
                      Grade book
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Panel>
        )}
      </div>
    </>);

}