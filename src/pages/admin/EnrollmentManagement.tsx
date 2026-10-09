import React, { useState } from 'react';
import { SearchIcon, UserPlusIcon } from 'lucide-react';
import { PageHeader, Panel } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Field, Select, TextInput } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { students } from '../../data/people';
import { courses } from '../../data/courses';
import type { Student } from '../../types';

export function EnrollmentManagement() {
  const { notify } = useToast();
  const [query, setQuery] = useState('');
  const [cohort, setCohort] = useState('All cohorts');
  const [assign, setAssign] = useState<Student | null>(null);
  const [enrollOpen, setEnrollOpen] = useState(false);

  const cohorts = ['All cohorts', ...Array.from(new Set(students.map((s) => s.cohort)))];
  const rows = students.filter((s) => {
    if (cohort !== 'All cohorts' && s.cohort !== cohort) return false;
    if (query && !`${s.name} ${s.email}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const columns: Array<Column<Student>> = [
  {
    key: 'name',
    header: 'Student',
    sortable: true,
    sortValue: (r) => r.name,
    render: (r) =>
    <div>
          <p className="font-medium text-ink">{r.name}</p>
          <p className="mt-0.5 text-[13px] text-muted">{r.email}</p>
        </div>

  },
  { key: 'cohort', header: 'Cohort', sortable: true, sortValue: (r) => r.cohort, render: (r) => <span className="text-[13px]">{r.cohort}</span> },
  {
    key: 'courses',
    header: 'Courses',
    align: 'center',
    sortable: true,
    sortValue: (r) => r.courses,
    render: (r) => <span className="text-[13px]">{r.courses}</span>
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
    <Button size="sm" variant="secondary" onClick={() => setAssign(r)}>
          Assign course
        </Button>

  }];


  return (
    <>
      <PageHeader
        title="Enrollment management"
        subtitle="Active students, their cohort, and the courses assigned to them."
        actions={
        <>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <TextInput
              aria-label="Search students"
              placeholder="Search students"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-60 pl-9" />
            
            </div>
            <Select
            aria-label="Filter by cohort"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
            className="w-40">
            
              {cohorts.map((c) =>
            <option key={c}>{c}</option>
            )}
            </Select>
            <Button icon={UserPlusIcon} onClick={() => setEnrollOpen(true)}>
              Enroll student
            </Button>
          </>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Active students</p>
          <p className="mt-1.5 text-3xl font-semibold text-ink">
            {students.filter((s) => s.status === 'active').length}
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">On hold</p>
          <p className="mt-1.5 text-3xl font-semibold text-ink">
            {students.filter((s) => s.status === 'on-hold').length}
          </p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Course placements</p>
          <p className="mt-1.5 text-3xl font-semibold text-ink">
            {students.reduce((s, st) => s + st.courses, 0)}
          </p>
        </Panel>
      </div>

      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} pageSize={10} />

      <Modal
        open={assign !== null}
        onClose={() => setAssign(null)}
        title="Assign a course"
        description={assign ? `Add a course placement for ${assign.name}.` : undefined}
        footer={
        <>
            <Button variant="secondary" onClick={() => setAssign(null)}>
              Cancel
            </Button>
            <Button
            onClick={() => {
              notify({
                tone: 'success',
                title: 'Course assigned',
                message: `${assign?.name} has been added to the course roster.`
              });
              setAssign(null);
            }}>
            
              Assign course
            </Button>
          </>
        }>
        
        <div className="space-y-4">
          <Field label="Course" htmlFor="assign-course" required>
            <Select id="assign-course">
              {courses.
              filter((c) => c.status !== 'archived').
              map((c) =>
              <option key={c.id}>
                    {c.code} · {c.title}
                  </option>
              )}
            </Select>
          </Field>
          <Field label="Start date" htmlFor="assign-date">
            <TextInput id="assign-date" type="date" defaultValue="2026-10-05" />
          </Field>
        </div>
      </Modal>

      <Modal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        title="Enroll a student"
        description="Create a student record and place them in a cohort."
        footer={
        <>
            <Button variant="secondary" onClick={() => setEnrollOpen(false)}>
              Cancel
            </Button>
            <Button
            onClick={() => {
              setEnrollOpen(false);
              notify({ tone: 'success', title: 'Student enrolled', message: 'Welcome email sent.' });
            }}>
            
              Create and enroll
            </Button>
          </>
        }>
        
        <div className="space-y-4">
          <Field label="Full name" htmlFor="new-name" required>
            <TextInput id="new-name" placeholder="e.g. Nneka Obi" />
          </Field>
          <Field label="Email" htmlFor="new-email" required>
            <TextInput id="new-email" type="email" placeholder="name@example.com" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Course" htmlFor="new-course" required>
              <Select id="new-course">
                {courses.
                filter((c) => c.status !== 'archived').
                map((c) =>
                <option key={c.id}>{c.code}</option>
                )}
              </Select>
            </Field>
            <Field label="Cohort" htmlFor="new-cohort" required>
              <Select id="new-cohort">
                <option>24C</option>
                <option>24D</option>
                <option>25A</option>
              </Select>
            </Field>
          </div>
        </div>
      </Modal>
    </>);

}