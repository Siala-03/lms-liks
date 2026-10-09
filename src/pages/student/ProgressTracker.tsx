import React from 'react';
import { AwardIcon, BookOpenIcon, ClockIcon, LockIcon, TargetIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { KpiCard } from '../../components/ui/KpiCard';
import { badges } from '../../data/academics';
import { useDataStore } from '../../data/store';
import { cn } from '../../utils/cn';

export function ProgressTracker() {
  const { courses } = useDataStore();
  const active = courses.filter((c) => c.status !== 'archived');
  const totalLessons = active.reduce((s, c) => s + c.lessonsTotal, 0);
  const doneLessons = active.reduce((s, c) => s + c.lessonsCompleted, 0);
  const overall = Math.round(doneLessons / totalLessons * 100);

  return (
    <>
      <PageHeader
        title="Progress"
        subtitle="Where you stand against the programme, course by course." />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={TargetIcon}
          value={`${overall}%`}
          label="Programme completion"
          trend={6}
          trendLabel="vs. last month"
          emphasis />
        
        <KpiCard icon={BookOpenIcon} value={`${doneLessons}/${totalLessons}`} label="Lessons completed" />
        <KpiCard icon={ClockIcon} value="112 hrs" label="Time spent learning" trend={9} />
        <KpiCard
          icon={AwardIcon}
          value={`${badges.filter((b) => b.earned).length}/${badges.length}`}
          label="Badges earned" />
        
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Panel>
          <PanelHeader title="Course by course" subtitle="Lessons completed and time invested" />
          <ul className="divide-y divide-line">
            {active.map((c) =>
            <li key={c.id} className="px-5 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-ink">{c.title}</p>
                    <p className="mt-0.5 text-[13px] text-muted">
                      {c.code} · {c.instructor}
                    </p>
                  </div>
                  <p className="text-[13px] text-muted">
                    {c.lessonsCompleted}/{c.lessonsTotal} lessons
                  </p>
                </div>
                <ProgressBar className="mt-3" value={c.progress} showValue />
              </li>
            )}
          </ul>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Badges" subtitle={`${badges.filter((b) => b.earned).length} earned`} />
            <ul className="divide-y divide-line">
              {badges.map((b) =>
              <li key={b.id} className="flex items-center gap-3 px-5 py-3.5">
                  <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                    b.earned ? 'bg-primary-light' : 'bg-surface-secondary'
                  )}>
                  
                    {b.earned ?
                  <AwardIcon className="h-[18px] w-[18px] text-primary" /> :

                  <LockIcon className="h-4 w-4 text-muted" />
                  }
                  </span>
                  <div>
                    <p className={cn('text-[13px] font-medium', b.earned ? 'text-ink' : 'text-muted')}>
                      {b.label}
                    </p>
                    <p className="text-xs text-muted">{b.detail}</p>
                  </div>
                </li>
              )}
            </ul>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-sm font-semibold text-ink">Weekly study time</h2>
            <div className="mt-4 flex h-32 items-end gap-2">
              {[6, 9, 4, 11, 8, 13, 7].map((h, i) =>
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                  className="w-full rounded-t-sm bg-primary"
                  style={{ height: `${h / 13 * 100}%` }} />
                
                  <span className="text-[11px] text-muted">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                </div>
              )}
            </div>
            <p className="mt-3 text-xs text-muted">58 hours this month · 12% above your cohort median</p>
          </Panel>
        </div>
      </div>
    </>);

}