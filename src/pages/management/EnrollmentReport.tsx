import React, { useState } from 'react';
import { DownloadIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { DateInput, Field, Select } from '../../components/ui/Form';
import { LineChart } from '../../components/ui/Charts';
import { useToast } from '../../components/ui/Toast';
import { enrollmentReportRows, enrollmentTrend } from '../../data/analytics';

type Row = (typeof enrollmentReportRows)[number];

export function EnrollmentReport() {
  const { notify } = useToast();
  const [course, setCourse] = useState('All courses');
  const [status, setStatus] = useState('All statuses');

  const rows = enrollmentReportRows.filter((r) => {
    if (course !== 'All courses' && r.course !== course) return false;
    if (status !== 'All statuses' && r.status !== status) return false;
    return true;
  });

  const columns: Array<Column<Row>> = [
  {
    key: 'student',
    header: 'Student',
    sortable: true,
    sortValue: (r) => r.student,
    render: (r) => <span className="font-medium text-ink">{r.student}</span>
  },
  { key: 'course', header: 'Course', sortable: true, sortValue: (r) => r.course, render: (r) => <span className="text-[13px]">{r.course}</span> },
  { key: 'cohort', header: 'Cohort', sortable: true, sortValue: (r) => r.cohort, render: (r) => <span className="text-[13px]">{r.cohort}</span> },
  {
    key: 'enrolledOn',
    header: 'Enrolled on',
    sortable: true,
    sortValue: (r) => r.enrolledOn,
    render: (r) => <span className="text-[13px] text-muted">{r.enrolledOn}</span>
  },
  {
    key: 'channel',
    header: 'Channel',
    sortable: true,
    sortValue: (r) => r.channel,
    render: (r) => <Badge tone="grey">{r.channel}</Badge>
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (r) => r.status,
    render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge>
  }];


  return (
    <>
      <PageHeader
        title="Enrollment report"
        subtitle="Filter enrollments by course, date range and status."
        actions={
        <Button
          variant="secondary"
          icon={DownloadIcon}
          onClick={() =>
          notify({ tone: 'success', title: 'Export ready', message: 'enrollment-report.csv' })
          }>
          
            Export CSV
          </Button>
        } />
      

      <Panel className="mb-6 p-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Field label="Course" htmlFor="er-course">
            <Select id="er-course" value={course} onChange={(e) => setCourse(e.target.value)}>
              {['All courses', ...Array.from(new Set(enrollmentReportRows.map((r) => r.course)))].map(
                (c) =>
                <option key={c}>{c}</option>

              )}
            </Select>
          </Field>
          <Field label="Status" htmlFor="er-status">
            <Select id="er-status" value={status} onChange={(e) => setStatus(e.target.value)}>
              {['All statuses', 'Active', 'On hold', 'Completed'].map((s) =>
              <option key={s}>{s}</option>
              )}
            </Select>
          </Field>
          <Field label="From" htmlFor="er-from">
            <DateInput id="er-from" defaultValue="2026-09-01" />
          </Field>
          <Field label="To" htmlFor="er-to">
            <DateInput id="er-to" defaultValue="2026-09-30" />
          </Field>
        </div>
      </Panel>

      <Panel className="mb-6">
        <PanelHeader title="Enrollments over time" subtitle="Monthly totals, last six months" />
        <div className="px-5 py-5">
          <LineChart data={enrollmentTrend} />
        </div>
      </Panel>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        pageSize={8}
        emptyMessage="No enrollments match those filters." />
      
    </>);

}