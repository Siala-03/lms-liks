import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeftIcon, FileIcon } from 'lucide-react';
import { Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Field, TextArea } from '../../components/ui/Form';
import { useToast } from '../../components/ui/Toast';
import { gradingQueue, peerSubmission, rubric } from '../../data/academics';

export function AssignmentReview() {
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const { notify } = useToast();
  const item = gradingQueue.find((g) => g.id === submissionId) ?? gradingQueue[0];

  const [scores, setScores] = useState<Record<string, string>>({ 'r-1': '26', 'r-2': '21' });
  const [feedback, setFeedback] = useState('');

  const total = rubric.reduce((sum, c) => sum + (Number(scores[c.id]) || 0), 0);
  const maxTotal = rubric.reduce((sum, c) => sum + c.max, 0);

  const release = () => {
    notify({
      tone: 'success',
      title: 'Grade released',
      message: `${item.student} scored ${total}/${maxTotal} and has been notified.`
    });
    navigate('/instructor/assignments');
  };

  return (
    <>
      <Link
        to="/instructor/assignments"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors duration-150 ease-smooth hover:text-primary">
        
        <ChevronLeftIcon className="h-4 w-4" />
        Back to queue
      </Link>

      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {item.course}
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.01em] text-ink">{item.assignment}</h1>
          <p className="mt-1 text-sm text-muted">
            {item.student} · submitted {item.submitted}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {item.late ? <Badge tone="error">Late submission</Badge> : <Badge tone="grey">On time</Badge>}
          <Button variant="secondary" size="sm">
            Previous
          </Button>
          <Button variant="secondary" size="sm">
            Next submission
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <Panel>
          <PanelHeader title="Submission" subtitle={`Attachments and written response`} />
          <div className="px-6 py-5">
            <ul className="mb-5 grid gap-2 sm:grid-cols-2">
              {peerSubmission.attachments.map((f) =>
              <li
                key={f}
                className="flex items-center justify-between rounded-md border border-line px-3 py-2.5 text-[13px]">
                
                  <span className="inline-flex items-center gap-2 truncate text-ink">
                    <FileIcon className="h-3.5 w-3.5 shrink-0 text-muted" />
                    {f}
                  </span>
                  <button type="button" className="shrink-0 text-xs font-medium text-primary hover:underline">
                    Open
                  </button>
                </li>
              )}
            </ul>
            <div className="space-y-4 text-[15px] leading-7 text-ink">
              {peerSubmission.body.split('\n\n').map((para) =>
              <p key={para.slice(0, 24)}>{para}</p>
              )}
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Rubric scoring" subtitle={`${maxTotal} points total`} />
            <table className="w-full text-sm">
              <tbody>
                {rubric.map((c) =>
                <tr key={c.id} className="border-b border-line">
                    <td className="px-4 py-3">
                      <p className="text-[13px] font-medium text-ink">{c.criterion}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{c.description}</p>
                    </td>
                    <td className="px-4 py-3 text-right align-top">
                      <div className="inline-flex items-center gap-1.5">
                        <input
                        type="number"
                        min={0}
                        max={c.max}
                        aria-label={`Score for ${c.criterion}`}
                        value={scores[c.id] ?? ''}
                        onChange={(e) => setScores((prev) => ({ ...prev, [c.id]: e.target.value }))}
                        className="h-9 w-16 rounded-md border border-line px-2 text-right text-sm tabular-nums transition-colors duration-150 ease-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                      
                        <span className="text-[13px] text-muted">/ {c.max}</span>
                      </div>
                    </td>
                  </tr>
                )}
                <tr className="bg-surface-secondary">
                  <td className="px-4 py-3 text-[13px] font-semibold text-ink">Total score</td>
                  <td className="px-4 py-3 text-right text-base font-semibold tabular-nums text-ink">
                    {total} / {maxTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </Panel>

          <Panel>
            <PanelHeader title="Written feedback" subtitle="Shown to the student with their grade" />
            <div className="px-5 py-5">
              <Field label="Feedback" htmlFor="instructor-feedback">
                <TextArea
                  id="instructor-feedback"
                  rows={7}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Strong diagnosis of the broken batch. Next time, record pan surface temperature…" />
                
              </Field>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-secondary px-5 py-3.5">
              <Button variant="secondary">Save draft</Button>
              <Button onClick={release} disabled={feedback.trim().length < 5}>
                Release grade
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </>);

}