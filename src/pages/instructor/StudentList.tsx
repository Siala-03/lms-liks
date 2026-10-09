import React, { useState } from 'react';
import { MailIcon, SearchIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { TextInput } from '../../components/ui/Form';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Modal } from '../../components/ui/Modal';
import { useDataStore } from '../../data/store';
import type { Student } from '../../types';

export function StudentList() {
  const { students } = useDataStore();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Student | null>(null);

  const rows = students.filter((s) =>
  `${s.name} ${s.email} ${s.cohort}`.toLowerCase().includes(query.toLowerCase())
  );

  const columns: Array<Column<Student>> = [
  {
    key: 'name',
    header: 'Student',
    sortable: true,
    sortValue: (r) => r.name,
    render: (r) =>
    <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-[11px] font-semibold text-primary-dark">
            {r.name.
        split(' ').
        map((p) => p[0]).
        join('')}
          </span>
          <div>
            <p className="font-medium text-ink">{r.name}</p>
            <p className="text-[13px] text-muted">{r.email}</p>
          </div>
        </div>

  },
  { key: 'cohort', header: 'Cohort', sortable: true, sortValue: (r) => r.cohort, render: (r) => <span className="text-[13px]">{r.cohort}</span> },
  {
    key: 'attendance',
    header: 'Attendance',
    sortable: true,
    sortValue: (r) => r.attendance,
    render: (r) => <ProgressBar value={r.attendance} size="sm" showValue className="w-32" />
  },
  {
    key: 'average',
    header: 'Average',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.average,
    render: (r) =>
    <Badge tone={r.average >= 80 ? 'success' : r.average >= 70 ? 'blue' : r.average >= 60 ? 'warning' : 'error'}>
          {r.average}%
        </Badge>

  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (r) => r.status,
    render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge>
  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: (r) =>
    <Button size="sm" variant="secondary" onClick={() => setSelected(r)}>
          Details
        </Button>

  }];


  return (
    <>
      <PageHeader
        title="Student list"
        subtitle="Everyone enrolled in your courses this term."
        actions={
        <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted" />
            <TextInput
            aria-label="Search students"
            placeholder="Search by name or cohort"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 pl-9" />
          
          </div>
        } />
      

      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} pageSize={10} />

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        description={selected?.email}
        footer={
        <>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Close
            </Button>
            <Button icon={MailIcon}>Message student</Button>
          </>
        }>
        
        {selected ?
        <dl className="space-y-3 text-[13px]">
            {[
          ['Cohort', selected.cohort],
          ['Courses enrolled', String(selected.courses)],
          ['Attendance', `${selected.attendance}%`],
          ['Grade average', `${selected.average}%`],
          ['Status', selected.status]].
          map(([k, v]) =>
          <div key={k} className="flex justify-between border-b border-line pb-2.5 last:border-0 last:pb-0">
                <dt className="text-muted">{k}</dt>
                <dd className="font-medium text-ink">{v}</dd>
              </div>
          )}
          </dl> :
        null}
      </Modal>
    </>);

}