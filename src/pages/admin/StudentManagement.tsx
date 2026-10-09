import React, { useState } from 'react';
import { DownloadIcon, SearchIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select, TextInput } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useDataStore } from '../../data/store';
import type { Student } from '../../types';

export function StudentManagement() {
  const { notify } = useToast();
  const { students, setStudents } = useDataStore();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [edit, setEdit] = useState<Student | null>(null);

  const saveEdit = () => {
    if (!edit) return;
    setStudents((prev) => prev.map((s) => s.id === edit.id ? edit : s));
    notify({ tone: 'success', title: 'Student updated' });
    setEdit(null);
  };

  const rows = students.filter((s) => {
    if (status !== 'All statuses' && s.status !== status.toLowerCase().replace(' ', '-')) return false;
    if (query && !`${s.name} ${s.email} ${s.cohort}`.toLowerCase().includes(query.toLowerCase()))
    return false;
    return true;
  });

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
    render: (r) => <span className="font-medium tabular-nums text-ink">{r.average}%</span>
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
    <Button size="sm" variant="secondary" onClick={() => setEdit(r)}>
          Edit
        </Button>

  }];


  return (
    <>
      <PageHeader
        title="Student management"
        subtitle="The full student register, including students on hold and graduates."
        actions={
        <>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <TextInput
              aria-label="Search students"
              placeholder="Search register"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-60 pl-9" />
            
            </div>
            <Select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-40">
            
              {['All statuses', 'Active', 'On hold', 'Graduated'].map((s) =>
            <option key={s}>{s}</option>
            )}
            </Select>
            <Button variant="secondary" icon={DownloadIcon}>
              Export
            </Button>
          </>
        } />
      

      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} pageSize={10} />

      <Modal
        open={edit !== null}
        onClose={() => setEdit(null)}
        title={`Edit ${edit?.name ?? 'student'}`}
        description="Changes take effect immediately across the academy."
        footer={
        <>
            <Button variant="secondary" onClick={() => setEdit(null)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save changes</Button>
          </>
        }>

        {edit ?
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-cohort" className="text-[13px] font-medium text-ink">
                  Cohort
                </label>
                <Select
                id="edit-cohort"
                value={edit.cohort}
                onChange={(e) => setEdit((prev) => prev && { ...prev, cohort: e.target.value })}>

                  {['24A', '24B', '24C'].map((c) =>
                <option key={c}>{c}</option>
                )}
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-status" className="text-[13px] font-medium text-ink">
                  Status
                </label>
                <Select
                id="edit-status"
                value={edit.status}
                onChange={(e) =>
                setEdit((prev) => prev && { ...prev, status: e.target.value as Student['status'] })
                }>

                  <option value="active">active</option>
                  <option value="on-hold">on-hold</option>
                  <option value="graduated">graduated</option>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-email" className="text-[13px] font-medium text-ink">
                Email
              </label>
              <TextInput
              id="edit-email"
              value={edit.email}
              onChange={(e) => setEdit((prev) => prev && { ...prev, email: e.target.value })} />

            </div>
          </div> :
        null}
      </Modal>
    </>);

}