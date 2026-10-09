import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckIcon, SearchIcon, XIcon } from 'lucide-react';
import { PageHeader } from '../../components/ui/Panel';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Select, TextInput } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { applications } from '../../data/people';
import type { Application } from '../../types';

export function Applications() {
  const navigate = useNavigate();
  const { notify } = useToast();
  const [status, setStatus] = useState('All statuses');
  const [query, setQuery] = useState('');
  const [decision, setDecision] = useState<{app: Application;approve: boolean;} | null>(null);

  const rows = applications.filter((a) => {
    if (status !== 'All statuses' && a.status !== status.toLowerCase()) return false;
    if (query && !`${a.applicant} ${a.course}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const columns: Array<Column<Application>> = [
  {
    key: 'applicant',
    header: 'Applicant',
    sortable: true,
    sortValue: (r) => r.applicant,
    render: (r) =>
    <div>
          <Link
        to={`/admin/applications/${r.id}`}
        className="font-medium text-ink transition-colors duration-150 ease-smooth hover:text-primary">
        
            {r.applicant}
          </Link>
          <p className="mt-0.5 text-[13px] text-muted">{r.email}</p>
        </div>

  },
  {
    key: 'course',
    header: 'Course applied for',
    sortable: true,
    sortValue: (r) => r.course,
    render: (r) => <span className="text-[13px]">{r.course}</span>
  },
  {
    key: 'appliedOn',
    header: 'Applied',
    sortable: true,
    sortValue: (r) => r.appliedOn,
    render: (r) => <span className="text-[13px] text-muted">{r.appliedOn}</span>
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
    r.status === 'pending' ?
    <div className="flex justify-end gap-2">
            <Button
        size="sm"
        variant="secondary"
        icon={XIcon}
        onClick={() => setDecision({ app: r, approve: false })}>
        
              Reject
            </Button>
            <Button size="sm" icon={CheckIcon} onClick={() => setDecision({ app: r, approve: true })}>
              Approve
            </Button>
          </div> :

    <Button size="sm" variant="secondary" onClick={() => navigate(`/admin/applications/${r.id}`)}>
            View
          </Button>

  }];


  return (
    <>
      <PageHeader
        title="Applications"
        subtitle="Incoming applications across all programmes."
        actions={
        <>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted" />
              <TextInput
              aria-label="Search applications"
              placeholder="Search applicant or course"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64 pl-9" />
            
            </div>
            <Select
            aria-label="Filter by status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-40">
            
              {['All statuses', 'Pending', 'Approved', 'Rejected'].map((s) =>
            <option key={s}>{s}</option>
            )}
            </Select>
          </>
        } />
      

      <DataTable columns={columns} rows={rows} rowKey={(r) => r.id} pageSize={8} />

      <Modal
        open={decision !== null}
        onClose={() => setDecision(null)}
        title={decision?.approve ? 'Approve this application?' : 'Reject this application?'}
        description={
        decision?.approve ?
        'The applicant will be enrolled and sent onboarding instructions.' :
        'The applicant will be notified that their application was unsuccessful.'
        }
        footer={
        <>
            <Button variant="secondary" onClick={() => setDecision(null)}>
              Cancel
            </Button>
            <Button
            variant={decision?.approve ? 'primary' : 'danger'}
            onClick={() => {
              if (!decision) return;
              notify({
                tone: decision.approve ? 'success' : 'info',
                title: decision.approve ? 'Application approved' : 'Application rejected',
                message: `${decision.app.applicant} has been notified by email.`
              });
              setDecision(null);
            }}>
            
              {decision?.approve ? 'Approve and enroll' : 'Reject application'}
            </Button>
          </>
        }>
        
        {decision ?
        <dl className="space-y-2.5 text-[13px]">
            {[
          ['Applicant', decision.app.applicant],
          ['Course', decision.app.course],
          ['Applied', decision.app.appliedOn]].
          map(([k, v]) =>
          <div key={k} className="flex justify-between border-b border-line pb-2.5 last:border-0 last:pb-0">
                <dt className="text-muted">{k}</dt>
                <dd className="font-medium text-ink">{v}</dd>
              </div>
          )}
          </dl> :
        null}
      </Modal>
    </>);

}