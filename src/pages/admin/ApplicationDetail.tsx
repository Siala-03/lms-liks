import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CheckIcon, ChevronLeftIcon, MailIcon, PhoneIcon, XIcon } from 'lucide-react';
import { Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Field, Select, TextArea } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { applicationById, applications } from '../../data/people';
import { courses } from '../../data/courses';

export function ApplicationDetail() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { notify } = useToast();
  const app = applicationById(applicationId ?? '') ?? applications[0];
  const [note, setNote] = useState(app.note);
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);

  const confirm = () => {
    const approved = decision === 'approve';
    setDecision(null);
    notify({
      tone: approved ? 'success' : 'info',
      title: approved ? 'Application approved' : 'Application rejected',
      message: `${app.applicant} has been notified by email.`
    });
    navigate('/admin/applications');
  };

  return (
    <>
      <Link
        to="/admin/applications"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors duration-150 ease-smooth hover:text-primary">
        
        <ChevronLeftIcon className="h-4 w-4" />
        All applications
      </Link>

      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-lg font-semibold text-primary-dark">
            {app.applicant.
            split(' ').
            map((p) => p[0]).
            join('')}
          </span>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-[-0.01em] text-ink">{app.applicant}</h1>
              <Badge tone={statusTone(app.status)}>{app.status}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted">
              Application {app.id.toUpperCase()} · received {app.appliedOn}
            </p>
          </div>
        </div>
        {app.status === 'pending' ?
        <div className="flex gap-2">
            <Button variant="danger" icon={XIcon} onClick={() => setDecision('reject')}>
              Reject
            </Button>
            <Button icon={CheckIcon} onClick={() => setDecision('approve')}>
              Approve and enroll
            </Button>
          </div> :
        null}
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Applicant profile" />
            <dl className="divide-y divide-line">
              {[
              ['Full name', app.applicant],
              ['Email', app.email],
              ['Phone', app.phone],
              ['Course applied for', app.course],
              ['Highest education', app.education],
              ['Relevant experience', app.experience]].
              map(([k, v]) =>
              <div key={k} className="grid grid-cols-[200px_minmax(0,1fr)] gap-4 px-5 py-3.5">
                  <dt className="text-[13px] text-muted">{k}</dt>
                  <dd className="text-[13px] font-medium text-ink">{v}</dd>
                </div>
              )}
            </dl>
          </Panel>

          <Panel>
            <PanelHeader title="Internal note" subtitle="Visible to admissions staff only" />
            <div className="px-5 py-5">
              <Field label="Decision note" htmlFor="app-note">
                <TextArea
                  id="app-note"
                  rows={5}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Interview impressions, placement recommendation, outstanding documents…" />
                
              </Field>
            </div>
            <div className="flex justify-end border-t border-line bg-surface-secondary px-5 py-3.5">
              <Button
                variant="secondary"
                onClick={() => notify({ tone: 'success', title: 'Note saved' })}>
                
                Save note
              </Button>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Placement" subtitle="Applies on approval" />
            <div className="space-y-4 px-5 py-5">
              <Field label="Course" htmlFor="place-course">
                <Select id="place-course" defaultValue={app.course}>
                  {courses.map((c) =>
                  <option key={c.id}>{c.title}</option>
                  )}
                </Select>
              </Field>
              <Field label="Cohort" htmlFor="place-cohort">
                <Select id="place-cohort" defaultValue="24C">
                  <option>24C</option>
                  <option>24D</option>
                  <option>25A</option>
                </Select>
              </Field>
            </div>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-sm font-semibold text-ink">Contact applicant</h2>
            <div className="mt-3 space-y-2">
              <a
                href={`mailto:${app.email}`}
                className="flex items-center gap-2.5 rounded-md border border-line px-3 py-2.5 text-[13px] text-ink transition-colors duration-150 ease-smooth hover:bg-surface-secondary">
                
                <MailIcon className="h-4 w-4 text-muted" />
                {app.email}
              </a>
              <a
                href={`tel:${app.phone}`}
                className="flex items-center gap-2.5 rounded-md border border-line px-3 py-2.5 text-[13px] text-ink transition-colors duration-150 ease-smooth hover:bg-surface-secondary">
                
                <PhoneIcon className="h-4 w-4 text-muted" />
                {app.phone}
              </a>
            </div>
          </Panel>
        </div>
      </div>

      <Modal
        open={decision !== null}
        onClose={() => setDecision(null)}
        title={decision === 'approve' ? 'Approve and enroll?' : 'Reject this application?'}
        description={
        decision === 'approve' ?
        'The applicant will be enrolled in the selected course and cohort, and sent onboarding instructions.' :
        'The applicant will be notified. You can include the note below in the email.'
        }
        footer={
        <>
            <Button variant="secondary" onClick={() => setDecision(null)}>
              Cancel
            </Button>
            <Button variant={decision === 'approve' ? 'primary' : 'danger'} onClick={confirm}>
              {decision === 'approve' ? 'Approve and enroll' : 'Reject application'}
            </Button>
          </>
        }>
        
        <Field label="Optional note to applicant" htmlFor="decision-note">
          <TextArea id="decision-note" rows={4} placeholder="Add context for this decision…" />
        </Field>
      </Modal>
    </>);

}