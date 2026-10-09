import React, { useState } from 'react';
import {
  FileIcon,
  FileTextIcon,
  GripVerticalIcon,
  HelpCircleIcon,
  PlayCircleIcon,
  PlusIcon,
  Trash2Icon } from
'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Field, Select, TextInput, Toggle } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { courses } from '../../data/courses';
import { cn } from '../../utils/cn';
import type { Lesson, Module } from '../../types';

const TYPE_ICON: Record<Lesson['type'], React.ComponentType<{className?: string;}>> = {
  text: FileTextIcon,
  video: PlayCircleIcon,
  pdf: FileIcon,
  quiz: HelpCircleIcon
};

const TYPE_LABEL: Record<Lesson['type'], string> = {
  text: 'Text lesson',
  video: 'Video link',
  pdf: 'PDF resource',
  quiz: 'Quiz'
};

export function CourseBuilder() {
  const { notify } = useToast();
  const [modules, setModules] = useState<Module[]>(() =>
  courses[0].modules.map((m) => ({ ...m, lessons: [...m.lessons] }))
  );
  const [dragging, setDragging] = useState<{moduleId: string;lessonId: string;} | null>(null);
  const [addOpen, setAddOpen] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<Lesson['type']>('text');
  const [published, setPublished] = useState(false);

  const drop = (moduleId: string, targetLessonId: string) => {
    if (!dragging) return;
    setModules((prev) =>
    prev.map((m) => {
      if (m.id !== moduleId) return m;
      const from = m.lessons.findIndex((l) => l.id === dragging.lessonId);
      const to = m.lessons.findIndex((l) => l.id === targetLessonId);
      if (from === -1 || to === -1) return m;
      const lessons = [...m.lessons];
      const [moved] = lessons.splice(from, 1);
      lessons.splice(to, 0, moved);
      return { ...m, lessons };
    })
    );
    setDragging(null);
  };

  const addLesson = () => {
    if (!addOpen || !newTitle.trim()) return;
    setModules((prev) =>
    prev.map((m) =>
    m.id === addOpen ?
    {
      ...m,
      lessons: [
      ...m.lessons,
      {
        id: `new-${Date.now()}`,
        title: newTitle.trim(),
        type: newType,
        duration: '15 min',
        completed: false
      }]

    } :
    m
    )
    );
    notify({ tone: 'success', title: 'Content added', message: `${newTitle.trim()} added to the module.` });
    setAddOpen(null);
    setNewTitle('');
    setNewType('text');
  };

  const addModule = () => {
    setModules((prev) => [
    ...prev,
    { id: `mod-${Date.now()}`, title: `Untitled module ${prev.length + 1}`, published: false, lessons: [] }]
    );
  };

  const toggleModule = (id: string) =>
  setModules((prev) => prev.map((m) => m.id === id ? { ...m, published: !m.published } : m));

  const removeLesson = (moduleId: string, lessonId: string) =>
  setModules((prev) =>
  prev.map((m) =>
  m.id === moduleId ? { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) } : m
  )
  );

  return (
    <>
      <PageHeader
        title="Course builder"
        subtitle="CUL-101 · Professional Culinary Foundations. Drag lessons to reorder within a module."
        actions={
        <>
            <Button variant="secondary">Preview as student</Button>
            <Button
            onClick={() =>
            notify({ tone: 'success', title: 'Changes saved', message: 'Course structure updated.' })
            }>
            
              Save changes
            </Button>
          </>
        } />
      

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {modules.map((module, mi) =>
          <Panel key={module.id}>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4">
                <div className="flex items-center gap-3">
                  <GripVerticalIcon className="h-4 w-4 cursor-grab text-muted" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Module {mi + 1}
                    </p>
                    <h2 className="text-[15px] font-semibold text-ink">{module.title}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge tone={module.published ? 'success' : 'grey'}>
                    {module.published ? 'Published' : 'Draft'}
                  </Badge>
                  <button
                  type="button"
                  role="switch"
                  aria-checked={module.published}
                  aria-label={`Publish ${module.title}`}
                  onClick={() => toggleModule(module.id)}
                  className={cn(
                    'relative h-6 w-11 rounded-full transition-colors duration-150 ease-smooth',
                    module.published ? 'bg-primary' : 'bg-line'
                  )}>
                  
                    <span
                    className={cn(
                      'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ease-smooth',
                      module.published ? 'translate-x-[22px]' : 'translate-x-0.5'
                    )} />
                  
                  </button>
                </div>
              </div>

              <ul className="p-2">
                {module.lessons.map((lesson) => {
                const Icon = TYPE_ICON[lesson.type];
                const isDragging = dragging?.lessonId === lesson.id;
                return (
                  <li
                    key={lesson.id}
                    draggable
                    onDragStart={() => setDragging({ moduleId: module.id, lessonId: lesson.id })}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => drop(module.id, lesson.id)}
                    onDragEnd={() => setDragging(null)}
                    className={cn(
                      'group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 ease-smooth',
                      isDragging ? 'bg-primary-light opacity-70' : 'hover:bg-surface-secondary'
                    )}>
                    
                      <GripVerticalIcon className="h-4 w-4 cursor-grab text-line group-hover:text-muted" />
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-light">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink">
                          {lesson.title}
                        </span>
                        <span className="block text-xs text-muted">
                          {TYPE_LABEL[lesson.type]} · {lesson.duration}
                        </span>
                      </span>
                      <button
                      type="button"
                      onClick={() => removeLesson(module.id, lesson.id)}
                      aria-label={`Remove ${lesson.title}`}
                      className="text-muted opacity-0 transition-opacity duration-150 ease-smooth hover:text-error group-hover:opacity-100">
                      
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </li>);

              })}
                {module.lessons.length === 0 ?
              <li className="px-3 py-6 text-center text-[13px] text-muted">
                    No content yet — add a lesson, resource or quiz.
                  </li> :
              null}
              </ul>

              <div className="border-t border-line px-5 py-3">
                <Button size="sm" variant="ghost" icon={PlusIcon} onClick={() => setAddOpen(module.id)}>
                  Add content
                </Button>
              </div>
            </Panel>
          )}

          <Button variant="secondary" icon={PlusIcon} onClick={addModule}>
            Add module
          </Button>
        </div>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Course settings" />
            <div className="space-y-4 px-5 py-5">
              <Field label="Course title" htmlFor="cb-title">
                <TextInput id="cb-title" defaultValue={courses[0].title} />
              </Field>
              <Field label="Department" htmlFor="cb-dept">
                <Select id="cb-dept" defaultValue={courses[0].department}>
                  {Array.from(new Set(courses.map((c) => c.department))).map((d) =>
                  <option key={d}>{d}</option>
                  )}
                </Select>
              </Field>
              <Field label="Duration" htmlFor="cb-duration">
                <TextInput id="cb-duration" defaultValue={courses[0].duration} />
              </Field>
              <div className="border-t border-line pt-4">
                <Toggle
                  checked={published}
                  onChange={setPublished}
                  label="Publish course"
                  description="Students see the course as soon as this is on." />
                
              </div>
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-sm font-semibold text-ink">Structure summary</h2>
            <dl className="mt-3 space-y-2.5 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-muted">Modules</dt>
                <dd className="font-medium text-ink">{modules.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Lessons</dt>
                <dd className="font-medium text-ink">
                  {modules.reduce((s, m) => s + m.lessons.length, 0)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Published modules</dt>
                <dd className="font-medium text-ink">{modules.filter((m) => m.published).length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Quizzes</dt>
                <dd className="font-medium text-ink">
                  {modules.reduce((s, m) => s + m.lessons.filter((l) => l.type === 'quiz').length, 0)}
                </dd>
              </div>
            </dl>
          </Panel>
        </div>
      </div>

      <Modal
        open={addOpen !== null}
        onClose={() => setAddOpen(null)}
        title="Add content"
        description="Pick a content type and give it a title. You can upload the material after."
        footer={
        <>
            <Button variant="secondary" onClick={() => setAddOpen(null)}>
              Cancel
            </Button>
            <Button onClick={addLesson} disabled={!newTitle.trim()}>
              Add to module
            </Button>
          </>
        }>
        
        <div className="space-y-4">
          <Field label="Content type" htmlFor="content-type" required>
            <Select
              id="content-type"
              value={newType}
              onChange={(e) => setNewType(e.target.value as Lesson['type'])}>
              
              <option value="text">Text lesson</option>
              <option value="video">Video link</option>
              <option value="pdf">PDF resource</option>
              <option value="quiz">Quiz</option>
            </Select>
          </Field>
          <Field label="Title" htmlFor="content-title" required>
            <TextInput
              id="content-title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Hollandaise correction walkthrough" />
            
          </Field>
        </div>
      </Modal>
    </>);

}