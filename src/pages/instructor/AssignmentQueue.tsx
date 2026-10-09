import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { gradingQueue } from '../../data/academics';

type Row = (typeof gradingQueue)[number];

export function AssignmentQueue() {
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


  return (
    <>
      <PageHeader
        title="Assignments to grade"
        subtitle={`${gradingQueue.length} submissions waiting. Two have been open longer than the five-day return target.`} />
      
      <DataTable columns={columns} rows={gradingQueue} rowKey={(r) => r.id} pageSize={8} />
    </>);

}