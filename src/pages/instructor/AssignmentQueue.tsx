import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { PageHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { Field, FileUpload, Select, TextArea, TextInput } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { useDataStore } from '../../data/store';
import type { AssignmentQuestion } from '../../types';

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
  const [newBrief, setNewBrief] = useState('');
  const [newQuestions, setNewQuestions] = useState<AssignmentQuestion[]>([]);
  const [newAttachments, setNewAttachments] = useState<string[]>([]);

  const addQuestion = () =>
  setNewQuestions((prev) => [...prev, { id: `q-${Date.now()}`, prompt: '' }]);

  const updateQuestion = (id: string, prompt: string) =>
  setNewQuestions((prev) => prev.map((q) => q.id === id ? { ...q, prompt } : q));

  const removeQuestion = (id: string) =>
  setNewQuestions((prev) => prev.filter((q) => q.id !== id));

  const resetForm = () => {
    setNewTitle('');
    setNewDueDate('2026-09-30');
    setNewPoints('100');
    setNewBrief('');
    setNewQuestions([]);
    setNewAttachments([]);
  };

  const createAssignment = () => {
    const course = courses.find((c) => c.id === newCourseId);
    if (!newTitle.trim() || !course || !newBrief.trim()) return;

    const due = new Date(`${newDueDate}T17:00:00`);
    const dayMs = 86_400_000;
    const daysLeft = Math.round((due.getTime() - REFERENCE_DATE.getTime()) / dayMs);
    const dueIn = daysLeft <= 0 ? 'Closed' : daysLeft === 1 ? '1 day' : `${daysLeft} days`;
    const dueDateLabel = due.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const questions = newQuestions.filter((q) => q.prompt.trim());

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
      points: Number(newPoints) || 100,
      brief: newBrief.trim(),
      questions: questions.length > 0 ? questions : undefined,
      attachments: newAttachments.length > 0 ? newAttachments : undefined
    }]
    );
    notify({ tone: 'success', title: 'Assignment created', message: `${newTitle.trim()} is now visible to students.` });
    setCreateOpen(false);
    resetForm();
  };

  const toGrade = assignments.filter((a) => a.status === 'submitted');

  const queueColumns: Array<Column<(typeof assignments)[number]>> = [
  {
    key: 'assignment',
    header: 'Assignment',
    sortable: true,
    sortValue: (r) => r.title,
    render: (r) =>
    <div>
          <p className="text-[13px] font-medium text-ink">{r.title}</p>
          <p className="mt-0.5 text-[13px] text-muted">{r.course}</p>
        </div>

  },
  {
    key: 'due',
    header: 'Due',
    sortable: true,
    sortValue: (r) => r.dueDate,
    render: (r) => <span className="text-[13px] text-muted">{r.dueDate}</span>
  },
  {
    key: 'points',
    header: 'Points',
    align: 'right',
    render: (r) => <span className="text-[13px]">{r.points}</span>
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
        Submissions to grade ({toGrade.length})
      </h2>
      <DataTable
        columns={queueColumns}
        rows={toGrade}
        rowKey={(r) => r.id}
        pageSize={8}
        emptyMessage="Nothing waiting on you right now." />

      <Modal
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
          resetForm();
        }}
        title="Create an assignment"
        description="Students in the selected course will see this on their assignments list immediately."
        width="max-w-2xl"
        footer={
        <>
            <Button
            variant="secondary"
            onClick={() => {
              setCreateOpen(false);
              resetForm();
            }}>

              Cancel
            </Button>
            <Button onClick={createAssignment} disabled={!newTitle.trim() || !newCourseId || !newBrief.trim()}>
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
          <Field
            label="Brief / instructions"
            htmlFor="as-brief"
            required
            hint="Shown to students on their submission page.">

            <TextArea
              id="as-brief"
              rows={6}
              value={newBrief}
              onChange={(e) => setNewBrief(e.target.value)}
              placeholder="Describe what students need to do and submit…" />

          </Field>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[13px] font-medium text-ink">Questions (optional)</label>
              <Button type="button" size="sm" variant="ghost" icon={PlusIcon} onClick={addQuestion}>
                Add question
              </Button>
            </div>
            {newQuestions.length === 0 ?
            <p className="text-[13px] text-muted">
                No questions added. Students will respond with a written reflection and file upload instead.
              </p> :

            <ul className="space-y-2">
                {newQuestions.map((q, i) =>
              <li key={q.id} className="flex items-start gap-2">
                    <span className="mt-2.5 w-5 shrink-0 text-[13px] text-muted">{i + 1}.</span>
                    <TextInput
                  aria-label={`Question ${i + 1}`}
                  value={q.prompt}
                  onChange={(e) => updateQuestion(q.id, e.target.value)}
                  placeholder="e.g. What would you do differently on a second attempt?" />

                    <button
                  type="button"
                  onClick={() => removeQuestion(q.id)}
                  aria-label={`Remove question ${i + 1}`}
                  className="mt-2 shrink-0 text-muted transition-colors duration-150 ease-smooth hover:text-error">

                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </li>
              )}
              </ul>
            }
          </div>

          <Field label="Reference materials (optional)" hint="Shown to students alongside the brief.">
            <FileUpload
              files={newAttachments}
              onAdd={() => setNewAttachments((prev) => [...prev, `reference-doc-0${prev.length + 1}.pdf`])}
              onRemove={(name) => setNewAttachments((prev) => prev.filter((f) => f !== name))}
              hint="PDF, DOCX, JPG or PNG up to 25 MB" />

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