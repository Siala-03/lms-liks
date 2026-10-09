import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { assignments } from '../../data/academics';
import type { Assignment } from '../../types';

export function AssignmentList() {
  const columns: Array<Column<Assignment>> = [
  {
    key: 'title',
    header: 'Assignment',
    sortable: true,
    sortValue: (r) => r.title,
    render: (r) =>
    <div>
          <Link
        to={`/student/assignments/${r.id}`}
        className="font-medium text-ink transition-colors duration-150 ease-smooth hover:text-primary">
        
            {r.title}
          </Link>
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
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    sortValue: (r) => r.status,
    render: (r) => <Badge tone={statusTone(r.status)}>{r.status}</Badge>
  },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: (r) =>
    <Link to={`/student/assignments/${r.id}`}>
          <Button size="sm" variant={r.status === 'pending' ? 'primary' : 'secondary'}>
            {r.status === 'pending' ? 'Submit' : 'View'}
          </Button>
        </Link>

  }];


  return (
    <>
      <PageHeader
        title="Assignments"
        subtitle="Everything set across your active courses, newest deadline first." />
      
      <DataTable columns={columns} rows={assignments} rowKey={(r) => r.id} pageSize={8} />
    </>);

}