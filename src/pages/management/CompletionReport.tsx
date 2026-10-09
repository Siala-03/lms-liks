import React from 'react';
import { DownloadIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { BarChart } from '../../components/ui/Charts';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useToast } from '../../components/ui/Toast';
import { completionByCourse } from '../../data/analytics';

type Row = (typeof completionByCourse)[number];

export function CompletionReport() {
  const { notify } = useToast();
  const overall = Math.round(
    completionByCourse.reduce((s, c) => s + c.completed, 0) /
    completionByCourse.reduce((s, c) => s + c.enrolled, 0) *
    100
  );
  const best = completionByCourse.reduce((max, c) => c.rate > max.rate ? c : max, completionByCourse[0]);
  const worst = completionByCourse.reduce((min, c) => c.rate < min.rate ? c : min, completionByCourse[0]);

  const columns: Array<Column<Row>> = [
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
    key: 'enrolled',
    header: 'Enrolled',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.enrolled,
    render: (r) => <span className="text-[13px] tabular-nums">{r.enrolled}</span>
  },
  {
    key: 'completed',
    header: 'Completed',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.completed,
    render: (r) => <span className="text-[13px] tabular-nums">{r.completed}</span>
  },
  {
    key: 'rate',
    header: 'Completion rate',
    sortable: true,
    sortValue: (r) => r.rate,
    render: (r) => <ProgressBar value={r.rate} size="sm" showValue className="w-40" />
  },
  {
    key: 'avgDays',
    header: 'Avg. days to complete',
    align: 'right',
    sortable: true,
    sortValue: (r) => r.avgDays,
    render: (r) => <span className="text-[13px] tabular-nums text-muted">{r.avgDays}</span>
  },
  {
    key: 'band',
    header: 'Quality band',
    align: 'right',
    render: (r) =>
    <Badge tone={r.rate >= 85 ? 'success' : r.rate >= 70 ? 'blue' : 'warning'}>
          {r.rate >= 85 ? 'Strong' : r.rate >= 70 ? 'On target' : 'Review'}
        </Badge>

  }];


  return (
    <>
      <PageHeader
        title="Course completion & quality"
        subtitle="Completion rates per course, with the courses that need intervention flagged."
        actions={
        <Button
          variant="secondary"
          icon={DownloadIcon}
          onClick={() =>
          notify({ tone: 'success', title: 'Export ready', message: 'completion-report.csv' })
          }>
          
            Export CSV
          </Button>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-3">
        <Panel className="border-primary/30 p-5 ring-1 ring-primary/10">
          <p className="text-[13px] text-muted">Academy completion rate</p>
          <p className="mt-1.5 text-4xl font-semibold tracking-[-0.02em] text-ink">{overall}%</p>
          <p className="mt-1 text-xs text-muted">Across all six programmes</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Strongest course</p>
          <p className="mt-1.5 text-2xl font-semibold text-ink">{best.rate}%</p>
          <p className="mt-1 text-xs text-muted">{best.course}</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Needs review</p>
          <p className="mt-1.5 text-2xl font-semibold text-ink">{worst.rate}%</p>
          <p className="mt-1 text-xs text-muted">{worst.course}</p>
        </Panel>
      </div>

      <Panel className="mb-6">
        <PanelHeader title="Completion rate by course" subtitle="Percentage of enrolled students who finished" />
        <div className="px-5 py-5">
          <BarChart data={completionByCourse.map((c) => ({ label: c.code, value: c.rate }))} />
        </div>
      </Panel>

      <DataTable columns={columns} rows={completionByCourse} rowKey={(r) => r.code} pageSize={8} />
    </>);

}