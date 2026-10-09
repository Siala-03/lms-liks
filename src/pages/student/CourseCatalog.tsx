import React, { useMemo, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/Panel';
import { CourseCard } from '../../components/CourseCard';
import { Select, TextInput } from '../../components/ui/Form';
import { courses } from '../../data/courses';
import { cn } from '../../utils/cn';

const FILTERS = ['All courses', 'In progress', 'Not started', 'Completed'] as const;

export function CourseCatalog() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All courses');
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All departments');

  const departments = useMemo(
    () => ['All departments', ...Array.from(new Set(courses.map((c) => c.department)))],
    []
  );

  const visible = courses.filter((c) => {
    if (c.status === 'archived') return false;
    if (filter === 'In progress' && c.status !== 'in-progress') return false;
    if (filter === 'Not started' && c.status !== 'not-started') return false;
    if (filter === 'Completed' && c.status !== 'completed') return false;
    if (department !== 'All departments' && c.department !== department) return false;
    if (query && !`${c.title} ${c.code} ${c.instructor}`.toLowerCase().includes(query.toLowerCase()))
    return false;
    return true;
  });

  return (
    <>
      <PageHeader
        title="Course catalog"
        subtitle="Every programme you are enrolled in, plus courses open to your cohort." />
      

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) =>
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ease-smooth',
              filter === f ?
              'border-primary bg-primary-light text-primary-dark' :
              'border-line bg-white text-muted hover:bg-surface-secondary'
            )}>
            
              {f}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted" />
            <TextInput
              aria-label="Search courses"
              placeholder="Search courses"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-60 pl-9" />
            
          </div>
          <Select
            aria-label="Filter by department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-52">
            
            {departments.map((d) =>
            <option key={d}>{d}</option>
            )}
          </Select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((course) =>
        <CourseCard key={course.id} course={course} to={`/student/courses/${course.id}`} />
        )}
      </div>

      {visible.length === 0 ?
      <p className="rounded-xl border border-line bg-white px-6 py-14 text-center text-sm text-muted">
          No courses match those filters.
        </p> :
      null}
    </>);

}