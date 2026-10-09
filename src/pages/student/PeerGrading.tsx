import React, { useState } from 'react';
import { FileIcon, ShieldCheckIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Field, TextArea } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';
import { peerSubmission, rubric } from '../../data/academics';

export function PeerGrading() {
  const { notify } = useToast();
  const [scores, setScores] = useState<Record<string, string>>({});
  const [comment, setComment] = useState('');

  const total = rubric.reduce((sum, c) => sum + (Number(scores[c.id]) || 0), 0);
  const maxTotal = rubric.reduce((sum, c) => sum + c.max, 0);
  const complete = rubric.every((c) => scores[c.id] !== undefined && scores[c.id] !== '');

  const submit = () => {
    notify({
      tone: 'success',
      title: 'Peer review submitted',
      message: `You scored this submission ${total}/${maxTotal}. Your review stays anonymous.`
    });
    setScores({});
    setComment('');
  };

  return (
    <>
      <PageHeader
        title="Peer grading"
        subtitle="One submission is assigned to you. Score against the rubric and leave specific, actionable comments." />
      

      <div className="mb-6 flex items-start gap-3 rounded-lg border border-primary/25 bg-primary-light px-4 py-3">
        <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-dark" />
        <p className="text-[13px] text-primary-dark">
          Reviews are double-blind. The author cannot see who graded them, and your own score is judged on
          the quality of your reasoning — not on how generous you are.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <Panel>
          <PanelHeader title={peerSubmission.anonymousLabel} subtitle={peerSubmission.course} />
          <div className="px-6 py-5">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge tone="grey">{peerSubmission.assignment}</Badge>
              <span className="text-[13px] text-muted">Submitted {peerSubmission.submittedOn}</span>
            </div>
            <div className="space-y-4 text-[15px] leading-7 text-ink">
              {peerSubmission.body.split('\n\n').map((para) =>
              <p key={para.slice(0, 24)}>{para}</p>
              )}
            </div>
            <div className="mt-6 border-t border-line pt-4">
              <p className="mb-2 text-[13px] font-medium text-ink">Attachments</p>
              <ul className="space-y-2">
                {peerSubmission.attachments.map((f) =>
                <li
                  key={f}
                  className="flex items-center justify-between rounded-md border border-line px-3 py-2 text-[13px]">
                  
                    <span className="inline-flex items-center gap-2 text-ink">
                      <FileIcon className="h-3.5 w-3.5 text-muted" />
                      {f}
                    </span>
                    <button type="button" className="text-xs font-medium text-primary hover:underline">
                      Open
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Rubric" subtitle={`Score each criterion · ${maxTotal} points total`} />
            <div className="overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-surface-secondary">
                    <th scope="col" className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                      Criterion
                    </th>
                    <th scope="col" className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-muted">
                      Score
                    </th>
                  </tr>
                </thead>
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
                          onChange={(e) =>
                          setScores((prev) => ({ ...prev, [c.id]: e.target.value }))
                          }
                          className="h-9 w-16 rounded-md border border-line px-2 text-right text-sm tabular-nums transition-colors duration-150 ease-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        
                          <span className="text-[13px] text-muted">/ {c.max}</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  <tr className="bg-surface-secondary">
                    <td className="px-4 py-3 text-[13px] font-semibold text-ink">Total</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-ink">
                      {total} / {maxTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel>
            <PanelHeader title="Comments to the author" />
            <div className="px-5 py-5">
              <Field
                label="Written feedback"
                htmlFor="peer-comment"
                hint="Name one thing that worked and one specific change you would make.">
                
                <TextArea
                  id="peer-comment"
                  rows={6}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Your diagnosis of the broken batch was specific and well evidenced…" />
                
              </Field>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-secondary px-5 py-3.5">
              <p className="text-[13px] text-muted">Closes Friday, 26 Sep</p>
              <Button onClick={submit} disabled={!complete || comment.trim().length < 10}>
                Submit review
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </>);

}