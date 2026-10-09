import React, { useState } from 'react';
import { MessageSquareIcon } from 'lucide-react';
import { PageHeader, Panel } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Form';
import { grades } from '../../data/academics';
import type { GradeRow } from '../../types';

export function MyGrades() {
  const [course, setCourse] = useState('All courses');
  const [open, setOpen] = useState<GradeRow | null>(null);

  const courseOptions = ['All courses', ...Array.from(new Set(grades.map((g) => g.course)))];
  const rows = grades.filter((g) => course === 'All courses' || g.course === course);

  const gradedRows = grades.filter((g) => g.score !== null);
  const average = Math.round(
    gradedRows.reduce((s, g) => s + g.score! / g.outOf * 100, 0) / gradedRows.length
  );

  const columns: Array<Column<GradeRow>> = [
  {
    key: 'assessment',
    header: 'Assessment',
    sortable: true,
    sortValue: (r) => r.assessment,
    render: (r) =>
    <div>
          <p className="font-medium text-ink">{r.assessment}</p>
          <p className="mt-0.5 text-[13px] text-muted">
            {r.course} · {r.type}
          </p>
        </div>

  },
  {
    key: 'submitted',
    header: 'Submitted',
    sortable: true,
    sortValue: (r) => r.submitted,
    render: (r) => <span className="text-[13px] text-muted">{r.submitted}</span>
  },
  {
    key: 'score',
    header: 'Score',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.score ?? -1,
    render: (r) =>
    r.score === null ?
    <span className="text-[13px] text-muted">—</span> :

    <span className="font-semibold tabular-nums text-ink">
            {r.score}
            <span className="font-normal text-muted">/{r.outOf}</span>
          </span>

  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (r) => r.status,
    render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge>
  },
  {
    key: 'feedback',
    header: '',
    align: 'right',
    render: (r) =>
    <Button size="sm" variant="ghost" icon={MessageSquareIcon} onClick={() => setOpen(r)}>
          Feedback
        </Button>

  }];


  return (
    <>
      <PageHeader
        title="My grades"
        subtitle="Every assessment across your courses, with the feedback attached to each one."
        actions={
        <Select
          aria-label="Filter by course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-48">
          
            {courseOptions.map((c) =>
          <option key={c}>{c}</option>
          )}
          </Select>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Weighted average</p>
          <p className="mt-1.5 text-3xl font-semibold tracking-[-0.02em] text-ink">{average}%</p>
          <p className="mt-1 text-xs text-muted">Across {gradedRows.length} graded assessments</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Awaiting grading</p>
          <p className="mt-1.5 text-3xl font-semibold tracking-[-0.02em] text-ink">
            {grades.filter((g) => g.status === 'pending').length}
          </p>
          <p className="mt-1 text-xs text-muted">Typically returned within five working days</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Standing</p>
          <p className="mt-1.5 text-3xl font-semibold tracking-[-0.02em] text-ink">Merit</p>
          <p className="mt-1 text-xs text-muted">Distinction requires a 90% average</p>
        </Panel>
      </div>

      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} pageSize={8} />

      <Modal
        open={open !== null}
        onClose={() => setOpen(null)}
        title={open?.assessment ?? ''}
        description={open ? `${open.course} · ${open.type}` : undefined}
        footer={
        <Button variant="secondary" onClick={() => setOpen(null)}>
            Close
          </Button>
        }>
        
        {open ?
        <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="text-2xl font-semibold text-ink">
                {open.score === null ? '—' : `${open.score}/${open.outOf}`}
              </span>
              <Badge tone={statusTone(open.status)}>{open.status}</Badge>
            </div>
            <p className="text-[15px] leading-7 text-ink">{open.feedback}</p>
          </div> :
        null}
      </Modal>
    </>);

}