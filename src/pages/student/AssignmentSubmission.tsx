import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangleIcon, ChevronLeftIcon, ClockIcon } from 'lucide-react';
import { Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Field, FileUpload, TextArea } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { Badge, statusTone } from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';
import { rubric } from '../../data/academics';
import { useDataStore } from '../../data/store';

const DEADLINE = new Date('2026-09-24T17:00:00');

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date('2026-09-22T09:14:00'));
  useEffect(() => {
    const id = window.setInterval(() => setNow((prev) => new Date(prev.getTime() + 1000)), 1000);
    return () => window.clearInterval(id);
  }, []);
  const ms = Math.max(0, target.getTime() - now.getTime());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms % 86_400_000 / 3_600_000),
    minutes: Math.floor(ms % 3_600_000 / 60_000),
    seconds: Math.floor(ms % 60_000 / 1000)
  };
}

export function AssignmentSubmission() {
  const { assignmentId } = useParams();
  const { assignments, setAssignments, grades, setGrades } = useDataStore();
  const assignment = useMemo(
    () => assignments.find((a) => a.id === assignmentId) ?? assignments[0],
    [assignmentId, assignments]
  );
  const { notify } = useToast();
  const countdown = useCountdown(DEADLINE);
  const [files, setFiles] = useState<string[]>(['brunoise-station-01.jpg']);
  const [text, setText] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const alreadySubmitted = assignment.status === 'submitted' || assignment.status === 'graded';

  const submit = () => {
    setAssignments((prev) =>
    prev.map((a) => a.id === assignment.id ? { ...a, status: 'submitted' } : a)
    );
    setGrades((prev) => {
      const existingIndex = prev.findIndex((g) => g.assignmentId === assignment.id);
      if (existingIndex === -1) return prev;
      const copy = [...prev];
      copy[existingIndex] = {
        ...copy[existingIndex],
        submitted: '22 Sep 2026',
        status: 'pending',
        feedback: 'Awaiting instructor review.'
      };
      return copy;
    });
    setConfirmOpen(false);
    notify({
      tone: 'success',
      title: 'Submission received',
      message: `${assignment.title} was submitted for grading.`
    });
  };

  return (
    <>
      <Link
        to="/student/assignments"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors duration-150 ease-smooth hover:text-primary">
        
        <ChevronLeftIcon className="h-4 w-4" />
        All assignments
      </Link>

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {assignment.course}
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.01em] text-ink">{assignment.title}</h1>
          <p className="mt-1 text-sm text-muted">
            {assignment.points} points · Due {assignment.dueDate}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={statusTone(assignment.status)}>{assignment.status}</Badge>
          {assignment.status === 'graded' && assignment.score !== undefined ?
          <span className="text-lg font-semibold text-ink">
              {assignment.score}
              <span className="text-sm font-normal text-muted">/{assignment.points}</span>
            </span> :
          null}
        </div>
      </header>

      {assignment.status === 'graded' && assignment.feedback ?
      <Panel className="mb-6 p-5">
          <h2 className="text-sm font-semibold text-ink">Instructor feedback</h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink">{assignment.feedback}</p>
        </Panel> :
      null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Brief" />
            <div className="max-w-2xl space-y-4 px-5 py-5 text-[15px] leading-7 text-ink">
              <p>
                Produce a 200 g brunoise inside the twelve-minute window and document your station at four
                stages: setup, squared block, mid-cut, and finished yield.
              </p>
              <p>
                Upload one photograph per stage and write a short reflection covering what slowed you down
                and what you would change on a second attempt.
              </p>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Your submission" subtitle="Attach evidence, then write your reflection" />
            <div className="space-y-5 px-5 py-5">
              <Field label="Stage photographs" hint="Four images expected · JPG or PNG up to 25 MB each">
                <FileUpload
                  files={files}
                  onAdd={() => setFiles((prev) => [...prev, `station-photo-0${prev.length + 1}.jpg`])}
                  onRemove={(name) => setFiles((prev) => prev.filter((f) => f !== name))}
                  hint="JPG or PNG up to 25 MB each" />
                
              </Field>

              <Field
                label="Written reflection"
                htmlFor="reflection"
                hint={`${text.trim() ? text.trim().split(/\s+/).length : 0} of 300 words minimum`}>
                
                <TextArea
                  id="reflection"
                  rows={8}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What slowed you down, and what would you change on a second attempt?" />
                
              </Field>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-secondary px-5 py-3.5">
              <p className="text-[13px] text-muted">
                {alreadySubmitted ? 'This assignment has already been submitted.' : 'Draft saved automatically · 2 min ago'}
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={alreadySubmitted}>
                  Save draft
                </Button>
                <Button onClick={() => setConfirmOpen(true)} disabled={alreadySubmitted}>
                  Submit assignment
                </Button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-ink">Time remaining</h2>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
              [countdown.days, 'days'],
              [countdown.hours, 'hrs'],
              [countdown.minutes, 'min'],
              [countdown.seconds, 'sec']].
              map(([v, l]) =>
              <div key={l as string} className="rounded-lg bg-primary-light px-1 py-2.5">
                  <p className="text-xl font-semibold tabular-nums text-primary-dark">{v as number}</p>
                  <p className="text-[11px] uppercase tracking-wide text-primary-dark/70">{l as string}</p>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-md bg-warning/15 px-3 py-2.5">
              <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#8A6100]" />
              <p className="text-xs text-[#8A6100]">
                Submissions after the deadline carry a 10% penalty per 24 hours.
              </p>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="How this is marked" subtitle="Rubric · 100 points" />
            <ul className="divide-y divide-line">
              {rubric.map((c) =>
              <li key={c.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13px] font-medium text-ink">{c.criterion}</p>
                    <Badge tone="grey">{c.max} pts</Badge>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{c.description}</p>
                </li>
              )}
            </ul>
          </Panel>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Submit this assignment?"
        description="You have one submission attempt. Your instructor will be notified immediately."
        footer={
        <>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              Keep editing
            </Button>
            <Button onClick={submit}>Submit now</Button>
          </>
        }>
        
        <ul className="space-y-2 text-[13px] text-ink">
          <li className="flex justify-between border-b border-line pb-2">
            <span className="text-muted">Files attached</span>
            <span className="font-medium">{files.length}</span>
          </li>
          <li className="flex justify-between border-b border-line pb-2">
            <span className="text-muted">Reflection length</span>
            <span className="font-medium">
              {text.trim() ? text.trim().split(/\s+/).length : 0} words
            </span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted">Submitting</span>
            <span className="font-medium">2 days before deadline</span>
          </li>
        </ul>
      </Modal>
    </>);

}