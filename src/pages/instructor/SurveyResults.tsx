import React from 'react';
import { DownloadIcon, MessageSquareQuoteIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { surveyComments, surveyResults } from '../../data/academics';
import { cn } from '../../utils/cn';

const LABELS = ['1', '2', '3', '4', '5'];

export function SurveyResults() {
  const responses = surveyResults[0].distribution.reduce((a, b) => a + b, 0);
  const overall = (
  surveyResults.reduce((s, q) => s + q.average, 0) / surveyResults.length).
  toFixed(1);
  const weakest = surveyResults.reduce((min, q) => q.average < min.average ? q : min, surveyResults[0]);

  return (
    <>
      <PageHeader
        title="Survey results"
        subtitle="End-of-module feedback for CUL-101, cohort 24B."
        actions={
        <>
            <Select aria-label="Select survey" defaultValue="CUL-101 · Module 2" className="w-56">
              <option>CUL-101 · Module 2</option>
              <option>CUL-101 · Module 1</option>
              <option>HSP-210 · Module 1</option>
            </Select>
            <Button variant="secondary" icon={DownloadIcon}>
              Export
            </Button>
          </>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        <Panel className="border-primary/30 p-5 ring-1 ring-primary/10">
          <p className="text-[13px] text-muted">Overall satisfaction</p>
          <p className="mt-1.5 text-4xl font-semibold tracking-[-0.02em] text-ink">{overall}</p>
          <p className="mt-1 text-xs text-muted">Mean across four questions, out of 5</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Responses</p>
          <p className="mt-1.5 text-3xl font-semibold text-ink">{responses}</p>
          <p className="mt-1 text-xs text-muted">From 48 enrolled — 88% response rate</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Weakest area</p>
          <p className="mt-1.5 text-3xl font-semibold text-ink">{weakest.average}</p>
          <p className="mt-1 text-xs text-muted">{weakest.question}</p>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <Panel>
          <PanelHeader title="Rating by question" subtitle="Count of responses at each rating" />
          <ul className="divide-y divide-line">
            {surveyResults.map((q) => {
              const max = Math.max(...q.distribution);
              return (
                <li key={q.id} className="px-5 py-5">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                    <p className="max-w-lg text-[13px] font-medium text-ink">{q.question}</p>
                    <Badge tone={q.average >= 4.5 ? 'success' : q.average >= 4 ? 'blue' : 'warning'}>
                      {q.average} avg
                    </Badge>
                  </div>
                  <div className="flex h-28 items-end gap-3">
                    {q.distribution.map((count, i) =>
                    <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-ink">{count}</span>
                        <div
                        className={cn(
                          'w-full rounded-t-sm',
                          i >= 3 ? 'bg-primary' : i === 2 ? 'bg-primary/55' : 'bg-primary/30'
                        )}
                        style={{ height: `${Math.max(3, count / max * 100)}%` }} />
                      
                        <span className="text-[11px] text-muted">{LABELS[i]}</span>
                      </div>
                    )}
                  </div>
                </li>);

            })}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title="Written responses" subtitle={`${surveyComments.length} comments`} />
          <ul className="divide-y divide-line">
            {surveyComments.map((c) =>
            <li key={c.id} className="flex gap-3 px-5 py-4">
                <MessageSquareQuoteIcon className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                <div>
                  <p className="text-[15px] leading-7 text-ink">{c.body}</p>
                  <p className="mt-1.5 text-xs text-muted">{c.author}</p>
                </div>
              </li>
            )}
          </ul>
        </Panel>
      </div>
    </>);

}