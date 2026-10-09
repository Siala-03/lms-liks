import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Field, Select, TextInput } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { gradingQueue } from '../../data/academics';
import { useDataStore } from '../../data/store';

type Row = (typeof gradingQueue)[number];

const REFERENCE_DATE = new Date('2026-09-22T00:00:00');

export function AssignmentQueue() {
  const { notify } = useToast();
  const { courses, assignments, setAssignments } = useDataStore();
  const activeCourses = courses.filter((c) => c.status !== 'archived');
  const [createOpen, setCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourseId, setNewCourseId] = useState(activeCourses[0]?.id ?? '');
  const [newDueDate, setNewDueDate] = useState('2026-09-30');
  const [newPoints, setNewPoints] = useState('100');

  const createAssignment = () => {
    const course = courses.find((c) => c.id === newCourseId);
    if (!newTitle.trim() || !course) return;

    const due = new Date(`${newDueDate}T17:00:00`);
    const dayMs = 86_400_000;
    const daysLeft = Math.round((due.getTime() - REFERENCE_DATE.getTime()) / dayMs);
    const dueIn = daysLeft <= 0 ? 'Closed' : daysLeft === 1 ? '1 day' : `${daysLeft} days`;
    const dueDateLabel = due.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    setAssignments((prev) => [
    ...prev,
    {
      id: `as-${Date.now()}`,
      title: newTitle.trim(),
      course: course.title,
      courseId: course.id,
      dueDate: `${dueDateLabel}, 17:00`,
      dueIn,
      status: 'pending',
      points: Number(newPoints) || 100
    }]
    );
    notify({ tone: 'success', title: 'Assignment created', message: `${newTitle.trim()} is now visible to students.` });
    setCreateOpen(false);
    setNewTitle('');
    setNewDueDate('2026-09-30');
    setNewPoints('100');
  };

  const columns: Array<Column<Row>> = [
  {
    key: 'student',
    header: 'Student',
    sortable: true,
    sortValue: (r) => r.student,
    render: (r) => <span className="font-medium text-ink">{r.student}</span>
  },
  {
    key: 'assignment',
    header: 'Assignment',
    sortable: true,
    sortValue: (r) => r.assignment,
    render: (r) =>
    <div>
          <p className="text-[13px] text-ink">{r.assignment}</p>
          <p className="mt-0.5 text-[13px] text-muted">{r.course}</p>
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
    key: 'flag',
    header: 'Flag',
    render: (r) => r.late ? <Badge tone="error">Late</Badge> : <Badge tone="grey">On time</Badge>
  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: (r) =>
    <Link to={`/instructor/assignments/${r.id}`}>
          <Button size="sm">Grade</Button>
        </Link>

  }];


  const assignmentColumns: Array<Column<(typeof assignments)[number]>> = [
  {
    key: 'title',
    header: 'Assignment',
    sortable: true,
    sortValue: (r) => r.title,
    render: (r) =>
    <div>
          <p className="font-medium text-ink">{r.title}</p>
          <p className="mt-0.5 text-[13px] text-muted">{r.course}</p>
        </div>

  },
  {
    key: 'dueDate',
    header: 'Due',
    sortable: true,
    sortValue: (r) => r.dueDate,
    render: (r) => <span className="text-[13px] text-muted">{r.dueDate}</span>
  },
  {
    key: 'points',
    header: 'Points',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.points,
    render: (r) => <span className="text-[13px]">{r.points}</span>
  }];


  return (
    <>
      <PageHeader
        title="Assignments"
        subtitle="Create new assignments for your courses and track what is waiting to be graded."
        actions={
        <Button icon={PlusIcon} onClick={() => setCreateOpen(true)}>
            New assignment
          </Button>
        } />


      <DataTable
        columns={assignmentColumns}
        rows={assignments}
        rowKey={(r) => r.id}
        pageSize={5}
        emptyMessage="No assignments created yet." />


      <h2 className="mb-3 mt-8 text-sm font-semibold text-ink">
        Submissions to grade ({gradingQueue.length})
      </h2>
      <DataTable columns={columns} rows={gradingQueue} rowKey={(r) => r.id} pageSize={8} />

      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create an assignment"
        description="Students in the selected course will see this on their assignments list immediately."
        footer={
        <>
            <Button variant="secondary" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createAssignment} disabled={!newTitle.trim() || !newCourseId}>
              Create assignment
            </Button>
          </>
        }>

        <div className="space-y-4">
          <Field label="Title" htmlFor="as-title" required>
            <TextInput
              id="as-title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Knife Skills Timed Practical" />

          </Field>
          <Field label="Course" htmlFor="as-course" required>
            <Select id="as-course" value={newCourseId} onChange={(e) => setNewCourseId(e.target.value)}>
              {activeCourses.map((c) =>
              <option key={c.id} value={c.id}>
                  {c.code} · {c.title}
                </option>
              )}
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Due date" htmlFor="as-due">
              <TextInput
                id="as-due"
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)} />

            </Field>
            <Field label="Points" htmlFor="as-points">
              <TextInput
                id="as-points"
                type="number"
                min={0}
                value={newPoints}
                onChange={(e) => setNewPoints(e.target.value)} />

            </Field>
          </div>
        </div>
      </Modal>
    </>);

}