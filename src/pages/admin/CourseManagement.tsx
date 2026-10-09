import React, { useState } from 'react';
import { ArchiveIcon, PencilIcon, PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Field, Select, TextInput } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { courses } from '../../data/courses';
import type { Course } from '../../types';

export function CourseManagement() {
  const { notify } = useToast();
  const [createOpen, setCreateOpen] = useState(false);
  const [archive, setArchive] = useState<Course | null>(null);

  const columns: Array<Column<Course>> = [
  {
    key: 'title',
    header: 'Course',
    sortable: true,
    sortValue: (r) => r.title,
    render: (r) =>
    <div>
          <p className="font-medium text-ink">{r.title}</p>
          <p className="mt-0.5 text-[13px] text-muted">
            {r.code} · {r.department}
          </p>
        </div>

  },
  {
    key: 'instructor',
    header: 'Instructor',
    sortable: true,
    sortValue: (r) => r.instructor,
    render: (r) => <span className="text-[13px]">{r.instructor}</span>
  },
  {
    key: 'duration',
    header: 'Duration',
    sortable: true,
    sortValue: (r) => r.duration,
    render: (r) => <span className="text-[13px] text-muted">{r.duration}</span>
  },
  {
    key: 'enrolled',
    header: 'Enrolled',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.enrolled,
    render: (r) => <span className="text-[13px] tabular-nums">{r.enrolled}</span>
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (r) => r.status,
    render: (r) =>
    <Badge tone={statusTone(r.status)}>
          {r.status === 'not-started' ? 'draft' : r.status === 'in-progress' ? 'running' : r.status}
        </Badge>

  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: (r) =>
    <div className="flex justify-end gap-2">
          <Button size="sm" variant="secondary" icon={PencilIcon}>
            Edit
          </Button>
          <Button
        size="sm"
        variant="secondary"
        icon={ArchiveIcon}
        disabled={r.status === 'archived'}
        onClick={() => setArchive(r)}>
        
            Archive
          </Button>
        </div>

  }];


  return (
    <>
      <PageHeader
        title="Course management"
        subtitle="Every course in the catalog, including drafts and archived programmes."
        actions={
        <Button icon={PlusIcon} onClick={() => setCreateOpen(true)}>
            Create course
          </Button>
        } />
      

      <DataTable columns={columns} rows={courses} rowKey={(r) => r.id} pageSize={8} />

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create a course"
        description="The assigned instructor builds out modules and lessons after creation."
        footer={
        <>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
            onClick={() => {
              setCreateOpen(false);
              notify({
                tone: 'success',
                title: 'Course created',
                message: 'The course is in draft until the instructor publishes it.'
              });
            }}>
            
              Create course
            </Button>
          </>
        }>
        
        <div className="space-y-4">
          <Field label="Course title" htmlFor="c-title" required>
            <TextInput id="c-title" placeholder="e.g. Pastry & Baking Fundamentals" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Course code" htmlFor="c-code" required>
              <TextInput id="c-code" placeholder="PAS-130" />
            </Field>
            <Field label="Duration" htmlFor="c-duration" required>
              <TextInput id="c-duration" placeholder="8 weeks" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Department" htmlFor="c-dept" required>
              <Select id="c-dept">
                {Array.from(new Set(courses.map((c) => c.department))).map((d) =>
                <option key={d}>{d}</option>
                )}
              </Select>
            </Field>
            <Field label="Instructor" htmlFor="c-instructor" required>
              <Select id="c-instructor">
                {Array.from(new Set(courses.map((c) => c.instructor))).map((i) =>
                <option key={i}>{i}</option>
                )}
              </Select>
            </Field>
          </div>
        </div>
      </Modal>

      <Modal
        open={archive !== null}
        onClose={() => setArchive(null)}
        title="Archive this course?"
        description="Archived courses disappear from the catalog. Enrolled students keep access to their records."
        footer={
        <>
            <Button variant="secondary" onClick={() => setArchive(null)}>
              Cancel
            </Button>
            <Button
            variant="danger"
            onClick={() => {
              notify({
                tone: 'info',
                title: 'Course archived',
                message: `${archive?.title} is no longer accepting enrollments.`
              });
              setArchive(null);
            }}>
            
              Archive course
            </Button>
          </>
        }>
        
        {archive ?
        <p className="text-[13px] text-ink">
            <span className="font-medium">{archive.title}</span> currently has{' '}
            <span className="font-medium">{archive.enrolled} enrolled students</span>. They will finish the
            course as normal.
          </p> :
        null}
      </Modal>
    </>);

}