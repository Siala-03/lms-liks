import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle2Icon,
  ChevronLeftIcon,
  CircleIcon,
  FileTextIcon,
  FileIcon,
  HelpCircleIcon,
  PlayCircleIcon } from
'lucide-react';
import { Panel, PanelHeader } from '../../components/ui/Panel';
import { Tabs } from '../../components/ui/Tabs';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useDataStore } from '../../data/store';
import { cn } from '../../utils/cn';
import type { Lesson } from '../../types';

const TABS = ['Overview', 'Lessons', 'Assignments', 'Quizzes', 'Discussions'];

const LESSON_ICON: Record<Lesson['type'], React.ComponentType<{className?: string;}>> = {
  text: FileTextIcon,
  video: PlayCircleIcon,
  pdf: FileIcon,
  quiz: HelpCircleIcon
};

export function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, discussions, assignments, quizzes } = useDataStore();
  const course = courses.find((c) => c.id === courseId) ?? courses[0];
  const [tab, setTab] = useState('Lessons');
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const [activeLesson, setActiveLesson] = useState(allLessons.find((l) => !l.completed) ?? allLessons[0]);

  const courseAssignments = assignments.filter((a) => a.courseId === course.id);
  const courseQuizzes = quizzes.filter((q) => q.course === course.code);
  const courseThreads = discussions.filter((d) => d.course === course.code);

  return (
    <>
      <Link
        to="/student/courses"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors duration-150 ease-smooth hover:text-primary">
        
        <ChevronLeftIcon className="h-4 w-4" />
        Back to catalog
      </Link>

      <header className="mb-6 flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {course.code}
            </span>
            <Badge tone={statusTone(course.status)}>
              {course.status === 'completed' ? 'Completed' : 'In progress'}
            </Badge>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.01em] text-ink">{course.title}</h1>
          <p className="mt-1 text-sm text-muted">
            {course.instructor} · {course.department} · {course.duration}
          </p>
        </div>
        <div className="w-full max-w-xs">
          <ProgressBar
            value={course.progress}
            label={`${course.lessonsCompleted} of ${course.lessonsTotal} lessons complete`}
            showValue />
          
        </div>
      </header>

      <Tabs tabs={TABS} active={tab} onChange={setTab} className="mb-6" />

      {tab === 'Lessons' ?
      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <Panel className="h-fit">
            <PanelHeader title="Course content" subtitle={`${course.modules.length} modules`} />
            <div className="max-h-[620px] overflow-y-auto py-2">
              {course.modules.map((module, mi) =>
            <div key={module.id} className="mb-2 last:mb-0">
                  <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Module {mi + 1} · {module.title}
                  </p>
                  <ul>
                    {module.lessons.map((lesson) => {
                  const Icon = LESSON_ICON[lesson.type];
                  const isActive = lesson.id === activeLesson.id;
                  return (
                    <li key={lesson.id}>
                          <button
                        type="button"
                        onClick={() => setActiveLesson(lesson)}
                        className={cn(
                          'flex w-full items-start gap-2.5 px-4 py-2.5 text-left transition-colors duration-150 ease-smooth',
                          isActive ? 'bg-primary-light' : 'hover:bg-surface-secondary'
                        )}>
                        
                            {lesson.completed ?
                        <CheckCircle2Icon className="mt-0.5 h-4 w-4 shrink-0 text-success" /> :

                        <CircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-line" />
                        }
                            <span className="min-w-0">
                              <span
                            className={cn(
                              'block text-[13px] font-medium leading-snug',
                              isActive ? 'text-primary-dark' : 'text-ink'
                            )}>
                            
                                {lesson.title}
                              </span>
                              <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                                <Icon className="h-3 w-3" />
                                {lesson.duration}
                              </span>
                            </span>
                          </button>
                        </li>);

                })}
                  </ul>
                </div>
            )}
            </div>
          </Panel>

          <Panel>
            <PanelHeader
            title={activeLesson.title}
            subtitle={`${activeLesson.type.toUpperCase()} · ${activeLesson.duration}`}
            action={
            <Button size="sm" variant={activeLesson.completed ? 'secondary' : 'primary'}>
                  {activeLesson.completed ? 'Completed' : 'Mark complete'}
                </Button>
            } />
          
            <div className="px-6 py-6">
              {activeLesson.type === 'video' ?
            <div className="mb-6 flex aspect-video items-center justify-center rounded-lg bg-[#3C4043]">
                  <PlayCircleIcon className="h-14 w-14 text-white/90" />
                </div> :
            null}

              <div className="max-w-2xl space-y-4 text-[15px] leading-7 text-ink">
                <p>
                  Consistency is the whole point of the classical cuts. A brunoise is not a small dice
                  because tradition says so — it is a small dice because every cube in the pan needs to
                  finish cooking at the same moment.
                </p>
                <p>
                  Work from a squared-off block. Every irregular face you leave in place multiplies into
                  irregular cuts further down the sequence, and no amount of speed recovers it.
                </p>
                <h3 className="pt-2 text-base font-semibold">What you will be assessed on</h3>
                <ul className="list-disc space-y-1.5 pl-5 text-[15px]">
                  <li>Uniformity of cut across a 200 g sample</li>
                  <li>Board and station discipline throughout</li>
                  <li>Yield — waste above 15% costs marks</li>
                  <li>Completion inside the twelve-minute window</li>
                </ul>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                <Button variant="secondary" size="sm">
                  Previous lesson
                </Button>
                <Button size="sm">Next lesson</Button>
              </div>
            </div>
          </Panel>
        </div> :
      null}

      {tab === 'Overview' ?
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Panel className="p-6">
            <h2 className="text-base font-semibold text-ink">About this course</h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-ink">{course.description}</p>
            <h3 className="mt-6 text-sm font-semibold text-ink">Learning outcomes</h3>
            <ul className="mt-2 max-w-2xl list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-ink">
              <li>Run a station to professional hygiene and safety standard</li>
              <li>Execute the classical cuts consistently under time pressure</li>
              <li>Produce and correct the five mother sauces</li>
              <li>Document and diagnose technical failures in your own work</li>
            </ul>
          </Panel>
          <Panel className="h-fit p-5">
            <h2 className="text-sm font-semibold text-ink">At a glance</h2>
            <dl className="mt-3 space-y-3 text-[13px]">
              {[
            ['Instructor', course.instructor],
            ['Department', course.department],
            ['Duration', course.duration],
            ['Lessons', String(course.lessonsTotal)],
            ['Students enrolled', String(course.enrolled)],
            ['Assessments', String(courseAssignments.length + courseQuizzes.length)]].
            map(([k, v]) =>
            <div key={k} className="flex justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
            )}
            </dl>
          </Panel>
        </div> :
      null}

      {tab === 'Assignments' ?
      <Panel>
          <PanelHeader title="Assignments" subtitle={`${courseAssignments.length} in this course`} />
          <ul className="divide-y divide-line">
            {courseAssignments.map((a) =>
          <li key={a.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                <div>
                  <Link
                to={`/student/assignments/${a.id}`}
                className="text-sm font-medium text-ink transition-colors duration-150 ease-smooth hover:text-primary">
                
                    {a.title}
                  </Link>
                  <p className="mt-0.5 text-[13px] text-muted">
                    Due {a.dueDate} · {a.points} points
                  </p>
                </div>
                <Badge tone={statusTone(a.status)}>{a.status}</Badge>
              </li>
          )}
          </ul>
        </Panel> :
      null}

      {tab === 'Quizzes' ?
      <Panel>
          <PanelHeader title="Quizzes" subtitle={`${courseQuizzes.length} in this course`} />
          <ul className="divide-y divide-line">
            {courseQuizzes.map((q) =>
          <li key={q.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-ink">{q.title}</p>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {q.questions} questions · {q.timeLimitMins} min · {q.attemptsAllowed} attempt(s)
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {q.score !== undefined ?
              <span className="text-sm font-semibold text-ink">{q.score}%</span> :
              null}
                  <Button
                size="sm"
                variant={q.status === 'available' ? 'primary' : 'secondary'}
                disabled={q.status === 'locked'}
                onClick={() => q.status === 'available' && navigate(`/student/quizzes/${q.id}`)}>

                    {q.status === 'available' ? 'Start' : q.status === 'completed' ? 'Review' : 'Locked'}
                  </Button>
                </div>
              </li>
          )}
          </ul>
        </Panel> :
      null}

      {tab === 'Discussions' ?
      <Panel>
          <PanelHeader
          title="Course discussions"
          subtitle={`${courseThreads.length} threads`}
          action={
          <Link to="/student/discussions">
                <Button size="sm" variant="secondary">
                  Open forum
                </Button>
              </Link>
          } />
        
          <ul className="divide-y divide-line">
            {courseThreads.map((t) =>
          <li key={t.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{t.title}</p>
                    <p className="mt-0.5 text-[13px] text-muted">
                      {t.author} · {t.createdAt}
                    </p>
                  </div>
                  <span className="shrink-0 text-[13px] text-muted">{t.replies.length} replies</span>
                </div>
              </li>
          )}
          </ul>
        </Panel> :
      null}
    </>);

}