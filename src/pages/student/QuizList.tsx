import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, RepeatIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { quizzes } from '../../data/academics';

export function QuizList() {
  const available = quizzes.filter((q) => q.status === 'available');
  const rest = quizzes.filter((q) => q.status !== 'available');

  return (
    <>
      <PageHeader
        title="Quizzes"
        subtitle="Timed knowledge checks. Once you start, the clock does not pause." />
      

      <div className="mb-6 grid gap-5 md:grid-cols-2">
        {available.map((q) =>
        <Panel key={q.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {q.course}
                </span>
                <h2 className="mt-1.5 text-base font-semibold leading-snug text-ink">{q.title}</h2>
              </div>
              <Badge tone="blue">Available</Badge>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon className="h-3.5 w-3.5" />
                {q.timeLimitMins} minutes
              </span>
              <span>{q.questions} questions</span>
              <span className="inline-flex items-center gap-1.5">
                <RepeatIcon className="h-3.5 w-3.5" />
                {q.attemptsAllowed} attempt{q.attemptsAllowed > 1 ? 's' : ''}
              </span>
            </div>
            <div className="mt-5">
              <Link to={`/student/quizzes/${q.id}`}>
                <Button>Start quiz</Button>
              </Link>
            </div>
          </Panel>
        )}
      </div>

      <Panel>
        <PanelHeader title="All quizzes" subtitle="Completed and upcoming assessments" />
        <ul className="divide-y divide-line">
          {rest.map((q) =>
          <li key={q.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-ink">{q.title}</p>
                <p className="mt-0.5 text-[13px] text-muted">
                  {q.course} · {q.questions} questions · {q.timeLimitMins} min
                </p>
              </div>
              <div className="flex items-center gap-4">
                {q.score !== undefined ?
              <span className="text-sm font-semibold text-ink">{q.score}%</span> :
              null}
                <Badge tone={statusTone(q.status)}>{q.status}</Badge>
                <Button size="sm" variant="secondary" disabled={q.status === 'locked'}>
                  {q.status === 'completed' ? 'Review answers' : 'Locked'}
                </Button>
              </div>
            </li>
          )}
        </ul>
      </Panel>
    </>);

}