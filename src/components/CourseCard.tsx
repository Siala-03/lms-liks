import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon, UserIcon } from 'lucide-react';
import { Badge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';
import type { Course } from '../types';

const TONES: Record<Course['thumbnailTone'], string> = {
  blue: 'bg-primary',
  slate: 'bg-[#3C4043]',
  teal: 'bg-[#0F7B6C]',
  amber: 'bg-[#B06000]'
};

const STATUS_LABEL: Record<Course['status'], string> = {
  'in-progress': 'In progress',
  'not-started': 'Not started',
  completed: 'Completed',
  archived: 'Archived'
};

export function CourseCard({ course, to }: {course: Course;to: string;}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-shadow duration-200 ease-smooth hover:shadow-card">
      <div className={`relative flex h-28 items-end p-4 ${TONES[course.thumbnailTone]}`}>
        <span className="absolute right-3 top-3">
          <Badge
            tone={course.status === 'completed' ? 'success' : course.status === 'archived' ? 'grey' : 'blue'}>
            
            {STATUS_LABEL[course.status]}
          </Badge>
        </span>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/85">{course.code}</p>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-semibold leading-snug text-ink">
          <Link to={to} className="transition-colors duration-150 ease-smooth hover:text-primary">
            {course.title}
          </Link>
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <UserIcon className="h-3.5 w-3.5" />
            {course.instructor}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {course.duration}
          </span>
        </div>

        <div className="mt-auto pt-5">
          <ProgressBar
            value={course.progress}
            size="sm"
            label={`${course.lessonsCompleted} of ${course.lessonsTotal} lessons`}
            showValue />
          
        </div>
      </div>
    </article>);

}