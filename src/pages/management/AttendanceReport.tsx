import React, { useState } from 'react';
import { DownloadIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Form';
import { BarChart } from '../../components/ui/Charts';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useToast } from '../../components/ui/Toast';
import { attendanceByCourse } from '../../data/analytics';
import { useDataStore } from '../../data/store';
import type { Student } from '../../types';

export function AttendanceReport() {
  const { notify } = useToast();
  const { students } = useDataStore();
  const [view, setView] = useState<'By course' | 'By student'>('By course');

  const courseColumns: Array<Column<(typeof attendanceByCourse)[number]>> = [
  {
    key: 'course',
    header: 'Course',
    sortable: true,
    sortValue: (r) => r.course,
    render: (r) =>
    <div>
          <p className="font-medium text-ink">{r.course}</p>
          <p className="text-[13px] text-muted">{r.code}</p>
        </div>

  },
  {
    key: 'sessions',
    header: 'Sessions',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.sessions,
    render: (r) => <span className="text-[13px] tabular-nums">{r.sessions}</span>
  },
  {
    key: 'avg',
    header: 'Average attendance',
    sortable: true,
    sortValue: (r) => r.avgAttendance,
    render: (r) => <ProgressBar value={r.avgAttendance} size="sm" showValue className="w-40" />
  },
  {
    key: 'below',
    header: 'Below 80%',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.belowThreshold,
    render: (r) =>
    <Badge tone={r.belowThreshold > 6 ? 'error' : r.belowThreshold > 3 ? 'warning' : 'success'}>
          {r.belowThreshold} students
        </Badge>

  }];


  const studentColumns: Array<Column<Student>> = [
  {
    key: 'name',
    header: 'Student',
    sortable: true,
    sortValue: (r) => r.name,
    render: (r) =>
    <div>
          <p className="font-medium text-ink">{r.name}</p>
          <p className="text-[13px] text-muted">Cohort {r.cohort}</p>
        </div>

  },
  {
    key: 'attendance',
    header: 'Attendance',
    sortable: true,
    sortValue: (r) => r.attendance,
    render: (r) => <ProgressBar value={r.attendance} size="sm" showValue className="w-40" />
  },
  {
    key: 'flag',
    header: 'Flag',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.attendance,
    render: (r) =>
    <Badge tone={r.attendance >= 90 ? 'success' : r.attendance >= 80 ? 'blue' : 'error'}>
          {r.attendance >= 90 ? 'Good' : r.attendance >= 80 ? 'Acceptable' : 'Below threshold'}
        </Badge>

  }];


  return (
    <>
      <PageHeader
        title="Attendance report"
        subtitle="Attendance by course and by student, against the 80% policy threshold."
        actions={
        <>
            <Select
            aria-label="Report view"
            value={view}
            onChange={(e) => setView(e.target.value as typeof view)}
            className="w-44">
            
              <option>By course</option>
              <option>By student</option>
            </Select>
            <Button
            variant="secondary"
            icon={DownloadIcon}
            onClick={() =>
            notify({ tone: 'success', title: 'Export ready', message: 'attendance-report.csv' })
            }>
            
              Export CSV
            </Button>
          </>
        } />
      

      <Panel className="mb-6">
        <PanelHeader title="Average attendance by course" subtitle="All sessions this term" />
        <div className="px-5 py-5">
          <BarChart data={attendanceByCourse.map((a) => ({ label: a.code, value: a.avgAttendance }))} />
        </div>
      </Panel>

      {view === 'By course' ?
      <DataTable columns={courseColumns} rows={attendanceByCourse} rowKey={(r) => r.code} pageSize={8} /> :

      <DataTable columns={studentColumns} rows={students} rowKey={(r) => r.id} pageSize={10} />
      }
    </>);

}