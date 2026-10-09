import React, { useState } from 'react';
import { DownloadIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Form';
import { StackedBars } from '../../components/ui/Charts';
import { useToast } from '../../components/ui/Toast';
import { gradeDistribution, studentPerformanceRows } from '../../data/analytics';

type Row = (typeof studentPerformanceRows)[number];

export function PerformanceReport() {
  const { notify } = useToast();
  const [course, setCourse] = useState('All courses');

  const rows = studentPerformanceRows.filter((r) => course === 'All courses' || r.course === course);
  const average = Math.round(
    studentPerformanceRows.reduce((s, r) => s + r.average, 0) / studentPerformanceRows.length
  );
  const declining = studentPerformanceRows.filter((r) => r.trend < 0).length;

  const columns: Array<Column<Row>> = [
  {
    key: 'student',
    header: 'Student',
    sortable: true,
    sortValue: (r) => r.student,
    render: (r) => <span className="font-medium text-ink">{r.student}</span>
  },
  { key: 'course', header: 'Course', sortable: true, sortValue: (r) => r.course, render: (r) => <span className="text-[13px]">{r.course}</span> },
  {
    key: 'average',
    header: 'Average',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.average,
    render: (r) => <span className="font-semibold tabular-nums text-ink">{r.average}%</span>
  },
  {
    key: 'trend',
    header: 'Trend',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.trend,
    render: (r) =>
    <span
      className={`inline-flex items-center gap-1 text-[13px] font-medium ${
      r.trend >= 0 ? 'text-success' : 'text-error'}`
      }>
      
          {r.trend >= 0 ?
      <TrendingUpIcon className="h-3.5 w-3.5" /> :

      <TrendingDownIcon className="h-3.5 w-3.5" />
      }
          {r.trend > 0 ? '+' : ''}
          {r.trend}
        </span>

  },
  {
    key: 'band',
    header: 'Band',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.band,
    render: (r) =>
    <Badge
      tone={
      r.band === 'Distinction' ?
      'success' :
      r.band === 'Merit' ?
      'blue' :
      r.band === 'Credit' ?
      'grey' :
      r.band === 'Pass' ?
      'warning' :
      'error'
      }>
      
          {r.band}
        </Badge>

  }];


  return (
    <>
      <PageHeader
        title="Student performance report"
        subtitle="Grade distribution per course and the students whose results are moving."
        actions={
        <>
            <Select
            aria-label="Filter by course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-44">
            
              {['All courses', ...Array.from(new Set(studentPerformanceRows.map((r) => r.course)))].map(
              (c) =>
              <option key={c}>{c}</option>

            )}
            </Select>
            <Button
            variant="secondary"
            icon={DownloadIcon}
            onClick={() =>
            notify({ tone: 'success', title: 'Export ready', message: 'performance-report.csv' })
            }>
            
              Export CSV
            </Button>
          </>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        <Panel className="border-primary/30 p-5 ring-1 ring-primary/10">
          <p className="text-[13px] text-muted">Academy grade average</p>
          <p className="mt-1.5 text-4xl font-semibold tracking-[-0.02em] text-ink">{average}%</p>
          <p className="mt-1 text-xs text-muted">Merit band overall</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Students trending down</p>
          <p className="mt-1.5 text-3xl font-semibold text-ink">{declining}</p>
          <p className="mt-1 text-xs text-muted">Compared with the previous assessment cycle</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Distinction rate</p>
          <p className="mt-1.5 text-3xl font-semibold text-ink">18%</p>
          <p className="mt-1 text-xs text-muted">29 students scoring 90% or above</p>
        </Panel>
      </div>

      <Panel className="mb-6">
        <PanelHeader title="Grade distribution by course" subtitle="Number of students in each band" />
        <div className="px-5 py-5">
          <StackedBars rows={gradeDistribution} series={['CUL-101', 'HSP-210', 'FNB-150']} />
        </div>
      </Panel>

      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} pageSize={10} />
    </>);

}